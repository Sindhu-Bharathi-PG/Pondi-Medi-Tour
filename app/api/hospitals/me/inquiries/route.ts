import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// GET /api/hospitals/me/inquiries - Get inquiries for logged-in hospital
export async function GET(request: NextRequest) {
    try {
        console.log('[Hospital Inquiries API] Starting request...');
        console.log('[Hospital Inquiries API] BACKEND_URL:', BACKEND_URL);

        let session;
        try {
            session = await getServerSession(authOptions);
        } catch (sessionError) {
            console.error('[Hospital Inquiries API] Session error:', sessionError);
            return NextResponse.json({ error: 'Session error', details: String(sessionError) }, { status: 500 });
        }

        if (!session) {
            console.log('[Hospital Inquiries API] No session found');
            return NextResponse.json({ error: 'Unauthorized - Please login' }, { status: 401 });
        }

        console.log('[Hospital Inquiries API] User:', session.user?.email);
        console.log('[Hospital Inquiries API] Token exists:', !!session.accessToken);

        if (!session.accessToken) {
            console.log('[Hospital Inquiries API] No access token in session');
            return NextResponse.json({ error: 'No access token' }, { status: 401 });
        }

        const backendUrl = `${BACKEND_URL}/api/hospitals/me/inquiries`;
        console.log('[Hospital Inquiries API] Calling backend:', backendUrl);

        let response;
        try {
            response = await fetch(backendUrl, {
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (fetchError) {
            console.error('[Hospital Inquiries API] Fetch error:', fetchError);
            return NextResponse.json(
                { error: 'Cannot connect to backend server', details: String(fetchError) },
                { status: 503 }
            );
        }

        console.log('[Hospital Inquiries API] Backend response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error');
            console.error('[Hospital Inquiries API] Backend error:', errorText);
            return NextResponse.json(
                { error: 'Backend error', details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('[Hospital Inquiries API] Success! Fetched', Array.isArray(data) ? data.length : 0, 'inquiries');

        return NextResponse.json(data);
    } catch (error) {
        console.error('[Hospital Inquiries API] Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: String(error) },
            { status: 500 }
        );
    }
}

// PUT /api/hospitals/me/inquiries - Update inquiry (with ID in body)
export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'Inquiry ID required' }, { status: 400 });
        }

        const response = await fetch(`${BACKEND_URL}/api/hospitals/me/inquiries/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to update inquiry' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[Hospital Inquiries API] Update error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
