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

        // Admin needs to see ALL packages (active & inactive)
        // The backend `getAllPackages` filters out inactive by default unless active='false' is passed
        if (!searchParams.has('active')) {
            searchParams.set('active', 'false');
        }

        const queryString = searchParams.toString();

        try {
            const fetchUrl = `${BACKEND_URL}/api/admin/packages${queryString ? `?${queryString}` : ''}`;
            console.log(`[Admin Packages API] Fetching from backend: ${fetchUrl}`);

            const response = await fetch(fetchUrl, {
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                },
                cache: 'no-store'
            });

            console.log(`[Admin Packages API] Backend response status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                const rawPackages = data.packages || data || [];

                // Map backend data to frontend interface
                const mappedPackages = rawPackages.map((pkg: any) => ({
                    ...pkg,
                    // Construct duration string
                    duration: pkg.duration || (pkg.durationDays ? `${pkg.durationDays} Days${pkg.durationNights ? ` / ${pkg.durationNights} Nights` : ''}` : 'N/A'),
                    // Map isFeatured to isPopular
                    isPopular: pkg.isFeatured,
                    // Ensure active status exists
                    isActive: pkg.isActive !== false
                }));

                return NextResponse.json({ packages: mappedPackages });
            }
        } catch (backendError) {
            console.log('Backend not available, returning mock data');
        }

        // Return mock data if backend is not available
        return NextResponse.json({
            packages: [
                {
                    id: 1,
                    name: "Complete Health Checkup",
                    category: "Preventive Care",
                    price: 15000,
                    discountedPrice: 12000,
                    duration: "1 Day",
                    hospitalId: 1,
                    hospitalName: "Apollo Hospital",
                    isActive: true,
                    isPopular: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: "Cardiac Surgery Package",
                    category: "Cardiology",
                    price: 350000,
                    duration: "7 Days",
                    hospitalId: 1,
                    hospitalName: "Apollo Hospital",
                    isActive: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    name: "Knee Replacement Package",
                    category: "Orthopedics",
                    price: 275000,
                    discountedPrice: 250000,
                    duration: "5 Days",
                    hospitalId: 2,
                    hospitalName: "Fortis Hospital",
                    isActive: false,
                    createdAt: new Date().toISOString()
                }
            ]
        });
    } catch (error) {
        console.error('Error fetching packages:', error);
        return NextResponse.json({ error: 'Failed to fetch packages', packages: [] }, { status: 500 });
    }
}
