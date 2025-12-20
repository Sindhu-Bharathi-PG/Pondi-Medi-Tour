import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        // Make request to backend with the session info
        // Since we're in a server component, we call the backend directly
        const email = session.user.email;

        // First, login to get a token
        const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password: 'dummy' // We need to rethink this - using session-based approach instead
            })
        });

        // Alternative: Call dashboard with a server-side request using internal APIs
        // For now, let's fetch stats directly from database

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        // Get hospital ID from session/user
        // Since we don't have the token, we'll create a simple API that accepts user email

        return NextResponse.json({
            message: 'Dashboard API needs token-based auth implementation',
            user: session.user
        });

    } catch (error) {
        console.error('Dashboard API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
