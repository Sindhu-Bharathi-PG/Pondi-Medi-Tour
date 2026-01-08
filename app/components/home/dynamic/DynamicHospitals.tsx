"use client";

import { API_BASE } from '@/app/hooks/useApi';
import { HospitalsSectionConfig } from '@/app/types/homeConfig.types';
import { Building2, ChevronRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Hospital {
    id: number;
    name: string;
    type: string;
    status: string;
    photos: string[];
    accreditations: string[];
    location: { city?: string };
}

interface DynamicHospitalsProps {
    config: HospitalsSectionConfig;
    mode: 'medical' | 'wellness';
}

export default function DynamicHospitals({ config, mode }: DynamicHospitalsProps) {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch real hospitals from database
    useEffect(() => {
        const fetchHospitals = async (retryCount = 0) => {
            try {
                const res = await fetch(`${API_BASE}/api/hospitals?limit=6`);
                if (res.ok) {
                    const data = await res.json();
                    // Filter active hospitals
                    const active = (data.hospitals || data || [])
                        .filter((h: Hospital) => h.status === 'active' || h.status === 'approved')
                        .slice(0, 6);
                    setHospitals(active);
                } else if (retryCount < 2) {
                    // Retry on failure
                    setTimeout(() => fetchHospitals(retryCount + 1), 1000);
                    return;
                }
            } catch (error) {
                console.error('Failed to fetch hospitals:', error);
                if (retryCount < 2) {
                    setTimeout(() => fetchHospitals(retryCount + 1), 1000);
                    return;
                }
            }
            setLoading(false);
        };
        fetchHospitals();
    }, []);

    // Theme colors based on mode
    const themeColors = mode === 'medical'
        ? {
            sectionBg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
            buttonBg: 'bg-white text-emerald-600',
            subtitleColor: 'text-emerald-100',
        }
        : {
            sectionBg: 'bg-gradient-to-r from-amber-600 to-orange-500',
            buttonBg: 'bg-white text-amber-600',
            subtitleColor: 'text-amber-100',
        };

    // Fall back to config items if no database hospitals
    const displayHospitals = hospitals.length > 0 ? hospitals : config.items;

    return (
        <section className={`py-24 ${themeColors.sectionBg} text-white`}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">{config.content.title}</h2>
                    <p className={`text-xl ${themeColors.subtitleColor}`}>{config.content.subtitle}</p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                    </div>
                )}

                {/* Hospitals Grid - Real Data */}
                {!loading && hospitals.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-8">
                        {hospitals.map((hospital) => (
                            <Link
                                key={hospital.id}
                                href={`/hospital/${hospital.id}`}
                                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/20 transition-all group"
                            >
                                <div className="relative h-48">
                                    {hospital.photos?.[0] ? (
                                        <Image
                                            src={hospital.photos[0]}
                                            alt={hospital.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                            <Building2 className="w-16 h-16 text-white/30" />
                                        </div>
                                    )}
                                    {hospital.accreditations?.[0] && (
                                        <div className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                                            {hospital.accreditations[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
                                    <div className="flex items-center gap-2">
                                        {hospital.location?.city && (
                                            <span className={`flex items-center gap-1 text-sm ${themeColors.subtitleColor}`}>
                                                <MapPin className="w-4 h-4" />
                                                {hospital.location.city}
                                            </span>
                                        )}
                                        <span className={`text-sm ${themeColors.subtitleColor}`}>
                                            {hospital.type || 'General'} Hospital
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Fallback to Static Config Items */}
                {!loading && hospitals.length === 0 && (
                    <div className="grid md:grid-cols-3 gap-8">
                        {config.items.map((hospital) => (
                            <div
                                key={hospital.id}
                                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/20 transition-all"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={hospital.image}
                                        alt={hospital.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                                        {hospital.accreditation}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
                                    <p className={themeColors.subtitleColor}>{hospital.type} Hospital</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* View All Link */}
                <div className="text-center mt-12">
                    <Link
                        href={config.content.viewAllLink}
                        className={`inline-flex items-center gap-2 ${themeColors.buttonBg} px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all`}
                    >
                        {config.content.viewAllText} <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
