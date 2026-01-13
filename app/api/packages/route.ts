import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const hospitalId = searchParams.get('hospitalId');
        const featured = searchParams.get('featured');
        const limit = searchParams.get('limit');

        // Build backend URL
        const backendParams = new URLSearchParams();
        if (hospitalId) backendParams.set('hospitalId', hospitalId);
        if (featured) backendParams.set('featured', featured);
        if (limit) backendParams.set('limit', limit);

        const response = await fetch(
            `${BACKEND_URL}/api/packages${backendParams.toString() ? `?${backendParams}` : ''}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                next: {
                    revalidate: 3600, // 1 hour
                    tags: ['packages'],
                },
            }
        );

        if (!response.ok) {
            console.error('Backend error:', response.status, response.statusText);
            return NextResponse.json(
                { error: 'Failed to fetch packages', packages: [] },
                { status: response.status }
            );
        }

        const data = await response.json();
        const packages = Array.isArray(data) ? data : (data.packages || []);

        // Set caching headers
        return NextResponse.json(packages, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
                'CDN-Cache-Control': 'public, s-maxage=3600',
                'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
            },
        });
    } catch (error) {
        console.error('Error fetching packages:', error);
        return NextResponse.json(
            { error: 'Internal server error', packages: [] },
            { status: 500 }
        );
    }
}
