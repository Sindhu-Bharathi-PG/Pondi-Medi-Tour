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

            if (session.accessToken) {
                headers['Authorization'] = `Bearer ${session.accessToken}`;
            }

            const response = await fetch(`${BACKEND_URL}/admin/hospitals${queryString ? `?${queryString}` : ''}`, {
                headers,
                cache: 'no-store'
            });

            if (response.ok) {
                const data = await response.json();
                // Transform backend data to frontend format
                return NextResponse.json({
                    hospitals: (data.hospitals || []).map((hospital: {
                        id: string | number;
                        name?: string;
                        hospital_name?: string;
                        type?: string;
                        hospital_type?: string;
                        location?: string;
                        city?: string;
                        beds?: number;
                        total_beds?: number;
                        status?: string;
                        is_approved?: boolean;
                        created_at?: string;
                        email?: string;
                        contact_email?: string;
                        phone?: string;
                        contact_phone?: string;
                        doctors_count?: number;
                        specialties?: string[];
                    }) => ({
                        id: String(hospital.id),
                        name: hospital.name || hospital.hospital_name || 'Unknown Hospital',
                        type: hospital.type || hospital.hospital_type || 'General Hospital',
                        location: hospital.location || hospital.city || 'Unknown',
                        city: hospital.city || '',
                        beds: hospital.beds || hospital.total_beds || 0,
                        status: hospital.status || (hospital.is_approved === false ? 'pending' : 'active'),
                        submittedDate: hospital.created_at,
                        email: hospital.email || hospital.contact_email,
                        phone: hospital.phone || hospital.contact_phone,
                        doctors: hospital.doctors_count || 0,
                        specialties: hospital.specialties || []
                    }))
                });
            }
        } catch (backendError) {
            console.log('Backend not available, returning mock data');
        }

        // Return mock data if backend is not available
        return NextResponse.json({
            hospitals: [
                {
                    id: '1',
                    name: 'Apollo Specialty Hospital',
                    type: 'Multi-Specialty',
                    location: 'Puducherry',
                    city: 'Puducherry',
                    beds: 250,
                    status: 'active',
                    submittedDate: '2024-01-15',
                    email: 'contact@apollo.com',
                    phone: '+91 9876543210',
                    doctors: 45,
                    specialties: ['Cardiology', 'Neurology', 'Orthopedics']
                },
                {
                    id: '2',
                    name: 'JIPMER Hospital',
                    type: 'Government Hospital',
                    location: 'Puducherry',
                    city: 'Puducherry',
                    beds: 2000,
                    status: 'active',
                    submittedDate: '2024-02-10',
                    email: 'info@jipmer.edu.in',
                    phone: '+91 0413 2272380',
                    doctors: 300,
                    specialties: ['All Specialties']
                },
                {
                    id: '3',
                    name: 'Mahatma Gandhi Medical College',
                    type: 'Teaching Hospital',
                    location: 'Pillaiyarkuppam',
                    city: 'Puducherry',
                    beds: 800,
                    status: 'pending',
                    submittedDate: '2024-12-01',
                    email: 'mgmc@sbvu.ac.in',
                    phone: '+91 0413 2615449',
                    doctors: 120,
                    specialties: ['Medicine', 'Surgery', 'Pediatrics']
                },
                {
                    id: '4',
                    name: 'Sri Venkateshwaraa Hospital',
                    type: 'Super Specialty',
                    location: 'Ariyankuppam',
                    city: 'Puducherry',
                    beds: 150,
                    status: 'pending',
                    submittedDate: '2024-12-15',
                    email: 'svssh@email.com',
                    phone: '+91 9876543211',
                    doctors: 35,
                    specialties: ['Cardiology', 'Oncology']
                }
            ]
        });
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        return NextResponse.json({ error: 'Failed to fetch hospitals', hospitals: [] }, { status: 500 });
    }
}
