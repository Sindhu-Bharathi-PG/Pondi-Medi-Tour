"use client";

import { motion } from 'framer-motion';
import { Building2, ChevronRight, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Hospital {
    id: number;
    name: string;
    slug: string;
    image: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
    accreditation: string[];
    location: string;
    beds: number;
    type: string;
    tagline: string;
    [key: string]: any;
}

interface HospitalGridProps {
    hospitals: Hospital[];
    loading?: boolean;
}

export function HospitalGrid({ hospitals, loading = false }: HospitalGridProps) {
    if (loading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100/50 animate-pulse">
                        <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300" />
                        <div className="p-7 pt-5">
                            <div className="mb-4">
                                <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-2" />
                                <div className="h-4 bg-gray-100 rounded w-1/2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="h-16 bg-gray-100 rounded-2xl" />
                                <div className="h-16 bg-gray-100 rounded-2xl" />
                            </div>
                            <div className="flex gap-2 mb-6">
                                <div className="h-8 bg-gray-100 rounded-lg w-20" />
                                <div className="h-8 bg-gray-100 rounded-lg w-24" />
                                <div className="h-8 bg-gray-100 rounded-lg w-16" />
                            </div>
                            <div className="pt-6 border-t border-gray-100">
                                <div className="h-8 bg-gray-100 rounded-lg w-32 ml-auto" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (hospitals.length === 0) {
        return (
            <div className="text-center py-20">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--medical-navy)] mb-2">No hospitals found</h3>
                <p className="text-[var(--medical-slate)]">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospitals.map((hospital, index) => (
                <motion.div
                    key={hospital.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                >
                    <Link href={`/hospital/${hospital.slug || hospital.id}`} className="block">
                        {/* Image Section */}
                        <div className="relative">
                            <div className="h-64 relative overflow-hidden">
                                {hospital.image && hospital.image.trim() !== "" ? (
                                    <Image
                                        src={hospital.image}
                                        alt={hospital.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                                        <Building2 className="w-20 h-20 text-blue-300" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            {/* Top Badges */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                <div className="flex flex-col gap-2">
                                    {hospital.accreditation.slice(0, 2).map((acc, i) => (
                                        <span key={i} className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                            {acc}
                                        </span>
                                    ))}
                                </div>
                                <span className="bg-white/90 backdrop-blur-md text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                                    {hospital.type}
                                </span>
                            </div>

                            {/* Hospital Name Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-xl font-bold">{hospital.name}</h3>
                                <p className="text-blue-300 text-sm">{hospital.tagline}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                    <span className="font-bold text-gray-800">{hospital.rating.toFixed(1)}</span>
                                    <span className="text-gray-500 text-sm">({hospital.reviewCount})</span>
                                </div>
                                <span className="text-gray-300">|</span>
                                <span className="text-blue-600 font-medium">{hospital.beds} Beds</span>
                            </div>

                            <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                                <MapPin className="w-4 h-4" />
                                <span>{hospital.location}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {hospital.specialties.slice(0, 3).map((spec, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                        {spec}
                                    </span>
                                ))}
                                {hospital.specialties.length > 3 && (
                                    <span className="text-gray-400 text-xs self-center">
                                        +{hospital.specialties.length - 3} more
                                    </span>
                                )}
                            </div>

                            <div className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
                                View Details
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
