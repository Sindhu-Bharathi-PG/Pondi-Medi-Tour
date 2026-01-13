import { fetchHospitalById } from '@/app/lib/fetchHelpers';
import { notFound } from 'next/navigation';
import { HospitalDetailClient } from './HospitalDetailClient';

// Enable ISR with 1-hour revalidation
export const revalidate = 3600;

// Generate static params for popular hospitals
export async function generateStaticParams() {
    // In production, fetch a list of hospital IDs/slugs to pre-render
    // For now, return empty array (all pages will be generated on-demand)
    return [];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const hospital = await fetchHospitalById(id);

        return {
            title: `${hospital.name} | Medical Tourism in Pondicherry`,
            description: hospital.description?.short || hospital.description?.long?.substring(0, 160),
            openGraph: {
                title: hospital.name,
                description: hospital.description?.short,
                images: [hospital.photos?.[0] || ''],
            },
        };
    } catch {
        return {
            title: 'Hospital Not Found',
        };
    }
}

// Server Component - fetch data on server
export default async function HospitalDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let hospital;

    try {
        hospital = await fetchHospitalById(id);
    } catch (error) {
        console.error('Failed to fetch hospital:', error);
        notFound();
    }

    if (!hospital) {
        notFound();
    }

    // Pass server-fetched data to client component for interactivity
    return <HospitalDetailClient hospital={hospital} />;
}

