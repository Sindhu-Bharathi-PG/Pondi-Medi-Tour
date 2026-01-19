import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const url = `${BACKEND_URL}/api/inquiries/${params.id}`;
        console.log(`[Proxy] PUT Inquiry ${params.id} -> ${url}`);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        console.log(`[Proxy] Response status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Proxy] Backend Error: ${response.status} - ${errorText}`);
            throw new Error(`Backend request failed: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating inquiry:', error);
        return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
    }
}
