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

        // Return default settings (can be stored in DB later)
        return NextResponse.json({
            success: true,
            data: {
                adminName: session.user.name || 'Admin',
                adminEmail: session.user.email || 'admin@pondimeditour.com',
                emailNotifications: true,
                inquiryAlerts: true,
                hospitalApprovalAlerts: true,
                weeklyReports: false,
                twoFactorAuth: false,
                sessionTimeout: 30,
                maintenanceMode: false,
                autoApproveHospitals: false,
            }
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user.userType !== 'admin' && session.user.userType !== 'superadmin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // In a real implementation, save settings to database
        console.log('Settings to save:', body);

        return NextResponse.json({
            success: true,
            message: 'Settings saved successfully'
        });
    } catch (error) {
        console.error('Error saving settings:', error);
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }
}
