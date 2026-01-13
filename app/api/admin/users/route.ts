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

        const { searchParams } = new URL(request.url);

        // Set a higher default limit to show more users
        if (!searchParams.has('limit')) {
            searchParams.set('limit', '100');
        }

        const queryString = searchParams.toString();

        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };

            // Forward the JWT token if available
            if (session.accessToken) {
                headers['Authorization'] = `Bearer ${session.accessToken}`;
            }

            const fetchUrl = `${BACKEND_URL}/api/admin/users${queryString ? `?${queryString}` : ''}`;
            console.log(`[Admin Users API] Fetching from backend: ${fetchUrl}`);
            console.log(`[Admin Users API] Auth Header Present: ${!!headers['Authorization']}`);

            const response = await fetch(fetchUrl, {
                headers,
                cache: 'no-store'
            });

            console.log(`[Admin Users API] Backend response status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                console.log(`[Admin Users API] Success! Received ${data.users?.length || 0} users`);

                // The backend already returns properly formatted data
                // Just pass it through directly
                return NextResponse.json({
                    users: data.users || [],
                    pagination: data.pagination
                });
            } else {
                console.error(`[Admin Users API] Backend error: ${response.status} ${response.statusText}`);
                const errorText = await response.text();
                console.error(`[Admin Users API] Error details: ${errorText}`);
            }
        } catch (backendError) {
            console.error('[Admin Users API] Connection failed:', backendError);
        }

        console.warn('[Admin Users API] Falling back to mock data');
        // Return mock data if backend is not available
        return NextResponse.json({
            users: [
                { id: '1', name: 'Admin User', email: 'admin@pondimeditour.com', role: 'admin', status: 'active', lastLogin: new Date().toISOString(), joinedDate: '2024-01-01' },
                { id: '2', name: 'Super Admin', email: 'superadmin@pondimeditour.com', role: 'superadmin', status: 'active', lastLogin: new Date().toISOString(), joinedDate: '2024-01-01' },
                { id: '3', name: 'Hospital Admin', email: 'hospital@pondimeditour.com', role: 'hospital', status: 'active', lastLogin: new Date().toISOString(), joinedDate: '2024-02-15' },
                { id: '4', name: 'Test Patient', email: 'patient@test.com', role: 'patient', status: 'active', lastLogin: new Date().toISOString(), joinedDate: '2024-03-01' }
            ]
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users', users: [] }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user.userType !== 'admin' && session.user.userType !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.accessToken}`
                },
                body: JSON.stringify({ name, email, password, userType: role || 'admin' })
            });

            if (response.ok) {
                const data = await response.json();
                return NextResponse.json({ success: true, user: data.user });
            } else {
                const errorData = await response.json();
                return NextResponse.json({ error: errorData.message || 'Failed to create user' }, { status: response.status });
            }
        } catch (backendError) {
            console.error('Backend error:', backendError);
            return NextResponse.json({ error: 'Backend service unavailable' }, { status: 503 });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
