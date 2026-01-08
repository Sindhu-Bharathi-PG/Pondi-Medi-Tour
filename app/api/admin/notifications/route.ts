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

        // Try to fetch from backend
        try {
            const response = await fetch(`${BACKEND_URL}/admin/notifications`, {
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return NextResponse.json({ success: true, data: data.notifications || [] });
            }
        } catch (backendError) {
            console.log('Backend not available, using mock data');
        }

        // Return mock data as fallback
        const mockNotifications = [
            {
                id: 1,
                userId: session.user.id,
                title: "New Hospital Registration",
                message: "A new hospital has submitted a registration request for approval",
                type: "approval",
                isRead: false,
                createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                linkUrl: "/dashboard/admin/approvals"
            },
            {
                id: 2,
                userId: session.user.id,
                title: "New Inquiry Received",
                message: "A patient has submitted a new inquiry about cardiac treatment",
                type: "inquiry",
                isRead: false,
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                linkUrl: "/dashboard/admin/inquiries"
            },
            {
                id: 3,
                userId: session.user.id,
                title: "Weekly Report Ready",
                message: "Your weekly platform analytics report is ready to view",
                type: "system",
                isRead: true,
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                linkUrl: "/dashboard/admin/analytics"
            },
            {
                id: 4,
                userId: session.user.id,
                title: "User Registration Spike",
                message: "15 new users registered in the last hour",
                type: "info",
                isRead: true,
                createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
                linkUrl: "/dashboard/admin/users"
            }
        ];

        return NextResponse.json({ success: true, data: mockNotifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }
}
