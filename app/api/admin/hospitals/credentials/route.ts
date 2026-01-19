import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.accessToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is admin
        if (session.user?.userType !== 'admin' && session.user?.userType !== 'superadmin') {
            return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }

        const body = await request.json();
        const { email, password, hospitalId, hospitalName } = body;

        if (!email || !password || !hospitalId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const response = await fetch(`${BACKEND_URL}/api/auth/create-hospital-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({
                email,
                password,
                hospitalId: parseInt(hospitalId),
                hospitalName,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Create hospital credentials error:', error);
        return NextResponse.json({ error: 'Failed to create hospital credentials' }, { status: 500 });
    }
}
