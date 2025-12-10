"use client";

// Simplified hospitals: render content without admin hooks
import { HospitalsSectionConfig } from '@/app/types/homeConfig.types';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DynamicHospitalsProps {
    config: HospitalsSectionConfig;
    mode: 'medical' | 'wellness';
}

export default function DynamicHospitals({ config, mode }: DynamicHospitalsProps) {

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

    return (
        <section className={`py-24 ${themeColors.sectionBg} text-white`}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">{config.content.title}</h2>
                    <p className={`text-xl ${themeColors.subtitleColor}`}>{config.content.subtitle}</p>
                </div>

                {/* Hospitals Grid */}
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
