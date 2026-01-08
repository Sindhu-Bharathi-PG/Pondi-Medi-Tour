import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(
    request: NextRequest,
    { params }: { params: { type: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.userType !== 'superadmin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') || 'published';

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (session.accessToken) {
            headers['Authorization'] = `Bearer ${session.accessToken}`;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/cms/pages/${params.type}?status=${status}`, {
                headers,
                cache: 'no-store'
            });

            if (response.ok) {
                const data = await response.json();
                return NextResponse.json(data);
            } else if (response.status === 404) {
                // Return empty config if new
                return NextResponse.json({ config: null, source: 'new' });
            }
        } catch (error) {
            console.log('Backend cms unavailable');
        }

        return NextResponse.json({ error: 'Failed to fetch page config' }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { type: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.userType !== 'superadmin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (session.accessToken) {
            headers['Authorization'] = `Bearer ${session.accessToken}`;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/cms/pages/${params.type}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const data = await response.json();
                return NextResponse.json(data);
            }
        } catch (error) {
            console.log('Backend cms unavailable');
        }

        return NextResponse.json({ error: 'Failed to save page config' }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
