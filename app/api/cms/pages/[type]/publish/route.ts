import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function POST(
    request: NextRequest,
    { params }: { params: { type: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.userType !== 'superadmin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (session.accessToken) {
            headers['Authorization'] = `Bearer ${session.accessToken}`;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/cms/pages/${params.type}/publish`, {
                method: 'POST',
                headers
            });

            if (response.ok) {
                const data = await response.json();
                return NextResponse.json(data);
            }
        } catch (error) {
            console.log('Backend cms unavailable');
        }

        return NextResponse.json({ error: 'Failed to publish page' }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
