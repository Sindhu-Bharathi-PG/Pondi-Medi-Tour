import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user.userType !== 'admin' && session.user.userType !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const response = await fetch(`${BACKEND_URL}/admin/stats`, {
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Backend request failed');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
