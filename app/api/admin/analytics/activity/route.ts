import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user.userType !== 'admin' && session.user.userType !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Return mock activity data (can be enhanced with real activity logs later)
        return NextResponse.json({
            success: true,
            data: [
                { targetType: 'user', actionType: 'create', description: 'New user registered', metadata: { targetName: 'john@example.com' }, createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
                { targetType: 'hospital', actionType: 'approve', description: 'Hospital approved', metadata: { targetName: 'Apollo Hospital' }, createdAt: new Date(Date.now() - 15 * 60000).toISOString() },
                { targetType: 'inquiry', actionType: 'create', description: 'New inquiry received', metadata: { targetName: 'Sarah Johnson' }, createdAt: new Date(Date.now() - 60 * 60000).toISOString() },
            ]
        });
    } catch (error) {
        console.error('Error fetching activity:', error);
        return NextResponse.json({ success: true, data: [] });
    }
}
