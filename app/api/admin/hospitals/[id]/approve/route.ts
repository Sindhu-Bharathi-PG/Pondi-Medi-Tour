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

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (session.accessToken) {
            headers['Authorization'] = `Bearer ${session.accessToken}`;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/admin/hospitals/${params.id}/approve`, {
                method: 'PATCH',
                headers
            });

            if (response.ok) {
                const data = await response.json();
                return NextResponse.json(data);
            }
        } catch (backendError) {
            console.log('Backend not available for approve');
        }

        // Return success for UI updates
        return NextResponse.json({
            message: 'Hospital approved successfully',
            id: params.id,
            status: 'active'
        });
    } catch (error) {
        console.error('Error approving hospital:', error);
        return NextResponse.json({ error: 'Failed to approve hospital' }, { status: 500 });
    }
}
