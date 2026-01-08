import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const response = await fetch(`${BACKEND_URL}/inquiries`, {
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // Return mock data if backend fails
            return NextResponse.json([
                {
                    id: 1,
                    patientName: "John Doe",
                    email: "john@example.com",
                    subject: "Cardiac Surgery Inquiry",
                    message: "I am interested in learning more about cardiac surgery options and pricing.",
                    status: 'pending',
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 2,
                    patientName: "Sarah Johnson",
                    email: "sarah.j@example.com",
                    subject: "Orthopedic Consultation",
                    message: "Need information about knee replacement surgery and recovery time.",
                    status: 'responded',
                    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
                }
            ]);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        // Return mock data on error
        return NextResponse.json([
            {
                id: 1,
                patientName: "John Doe",
                email: "john@example.com",
                subject: "Cardiac Surgery Inquiry",
                message: "I am interested in learning more about cardiac surgery options.",
                status: 'pending',
                createdAt: new Date().toISOString()
            }
        ]);
    }
}
