import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Support field selection to reduce payload size
        const fields = searchParams.get('fields')?.split(',');
        const status = searchParams.get('status') || 'active';
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');

        // Build backend URL
        const backendParams = new URLSearchParams();
        if (status) backendParams.set('status', status);
        if (limit) backendParams.set('limit', limit);
        if (offset) backendParams.set('offset', offset);

        const response = await fetch(
            `${BACKEND_URL}/api/hospitals${backendParams.toString() ? `?${backendParams}` : ''}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                next: {
                    revalidate: 300, // 5 minutes
                    tags: ['hospitals'],
                },
            }
        );

        if (!response.ok) {
            console.error('Backend error:', response.status, response.statusText);
            return NextResponse.json(
                { error: 'Failed to fetch hospitals', hospitals: [] },
                { status: response.status }
            );
        }

        let data = await response.json();
        const hospitals = Array.isArray(data) ? data : (data.hospitals || []);

        // Filter fields if requested
        let filteredHospitals = hospitals;
        if (fields && fields.length > 0) {
            filteredHospitals = hospitals.map((hospital: any) => {
                const filtered: any = {};
                fields.forEach(field => {
                    if (hospital[field] !== undefined) {
                        filtered[field] = hospital[field];
                    }
                });
                return filtered;
            });
        }

        // Set aggressive caching headers
        return NextResponse.json(filteredHospitals, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
                'CDN-Cache-Control': 'public, s-maxage=300',
                'Vercel-CDN-Cache-Control': 'public, s-maxage=300',
            },
        });
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        return NextResponse.json(
            { error: 'Internal server error', hospitals: [] },
            { status: 500 }
        );
    }
}
