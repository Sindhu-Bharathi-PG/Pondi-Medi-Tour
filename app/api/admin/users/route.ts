import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user.userType !== 'admin' && session.user.userType !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const queryString = searchParams.toString();

        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };

            // Forward the JWT token if available
            if (session.accessToken) {
                headers['Authorization'] = `Bearer ${session.accessToken}`;
            }

            const response = await fetch(`${BACKEND_URL}/admin/users${queryString ? `?${queryString}` : ''}`, {
                headers,
                cache: 'no-store'
            });

            if (response.ok) {
                const data = await response.json();
                // Transform backend data to frontend format
                return NextResponse.json({
                    users: (data.users || []).map((user: { id: string | number; name?: string; email: string; user_type?: string; is_active?: boolean; last_login?: string; created_at?: string }) => ({
                        id: String(user.id),
                        name: user.name || 'N/A',
                        email: user.email,
                        role: user.user_type || 'patient',
                        status: user.is_active !== false ? 'active' : 'inactive',
                        lastLogin: user.last_login,
                        joinedDate: user.created_at
                    }))
                });
            }
        } catch (backendError) {
            console.log('Backend not available, returning mock data');
        }

        // Return mock data if backend is not available
        return NextResponse.json({
            users: [
                { id: '1', name: 'Admin User', email: 'admin@test.com', role: 'admin', status: 'active', lastLogin: new Date().toISOString(), joinedDate: '2024-01-01' },
                { id: '2', name: 'Super Admin', email: 'superadmin@test.com', role: 'superadmin', status: 'active', lastLogin: new Date().toISOString(), joinedDate: '2024-01-01' },
                { id: '3', name: 'Hospital Admin', email: 'hospital@test.com', role: 'hospital', status: 'active', lastLogin: new Date().toISOString(), joinedDate: '2024-02-15' },
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
            const response = await fetch(`${BACKEND_URL}/admin/users`, {
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
