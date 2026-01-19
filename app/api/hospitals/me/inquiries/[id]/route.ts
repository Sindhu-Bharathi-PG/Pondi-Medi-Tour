import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// PUT /api/hospitals/me/inquiries/[id] - Update a specific inquiry
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!session.accessToken) {
            return NextResponse.json({ error: 'No access token' }, { status: 401 });
        }

        // Await params in Next.js 13+ App Router
        const { id: inquiryId } = await context.params;
        const body = await request.json();

        console.log('[Inquiry Update API] Updating inquiry:', inquiryId);
        console.log('[Inquiry Update API] Update data:', body);

        // Call backend API
        const response = await fetch(`${BACKEND_URL}/api/hospitals/me/inquiries/${inquiryId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        console.log('[Inquiry Update API] Backend response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error');
            console.error('[Inquiry Update API] Backend error:', errorText);
            return NextResponse.json(
                { error: 'Failed to update inquiry', details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[Inquiry Update API] Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: String(error) },
            { status: 500 }
        );
    }
}

// GET /api/hospitals/me/inquiries/[id] - Get a specific inquiry
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.accessToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id: inquiryId } = await context.params;

        const response = await fetch(`${BACKEND_URL}/api/hospitals/me/inquiries/${inquiryId}`, {
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch inquiry' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[Inquiry API] Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
