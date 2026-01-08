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

        // Return mock data for top hospitals (can be enhanced with real data later)
        return NextResponse.json({
            success: true,
            data: [
                { name: 'Apollo Specialty Hospital', inquiries: 45, rating: 4.8, growth: 12 },
                { name: 'MGMCRI', inquiries: 38, rating: 4.6, growth: 8 },
                { name: 'Sri Venkateshwaraa Hospital', inquiries: 32, rating: 4.5, growth: 15 },
                { name: 'SMVMCH', inquiries: 28, rating: 4.4, growth: 5 },
            ]
        });
    } catch (error) {
        console.error('Error fetching top hospitals:', error);
        return NextResponse.json({ success: true, data: [] });
    }
}
