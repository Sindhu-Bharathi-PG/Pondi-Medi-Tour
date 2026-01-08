import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user.userType !== 'admin' && session.user.userType !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { role } = body;

        const validRoles = ['patient', 'doctor', 'hospital', 'admin', 'superadmin'];
        if (!validRoles.includes(role)) {
            return NextResponse.json({
                error: 'Invalid role. Must be one of: ' + validRoles.join(', ')
            }, { status: 400 });
        }

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (session.accessToken) {
            headers['Authorization'] = `Bearer ${session.accessToken}`;
        }

        const response = await fetch(`${BACKEND_URL}/admin/users/${params.id}/role`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ role })
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to change role' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error changing user role:', error);
        return NextResponse.json({ error: 'Failed to change role' }, { status: 500 });
    }
}
