"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowLeft, Building2, Calendar, Camera, CheckCircle, Clock, Heart, MapPin, Phone, Star, Stethoscope, TrendingUp, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../../components/common';
import { useQuote } from '../../context/QuoteContext';

interface Review {
    id: number;
    user: string;
    rating: number;
    date: string;
    comment: string;
    origin: string;
}

interface HospitalProfile {
    id: number;
    name: string;
    type: string;
    establishmentYear: number;
    accreditations: string[];
    beds: number;
    patientCount: any;
    location: {
        address: string;
        coordinates?: { lat: number; lng: number };
    };
    contact: {
        phone: string;
        emergency: string;
        email: string;
        website: string;
    };
    description: {
        short: string;
        long: string;
    };
    departments: any[];
    specialties: string[];
    equipment: string[];
    facilities: string[];
    doctors: any[];
    treatments: any[];
    packages: any[];
    photos: string[];
    reviews: Review[];
    logo?: string;
    highlights?: string[];
    rating?: number;
    nearbyHospitals?: any[];
    touristPlaces?: any[];
}

interface HospitalDetailClientProps {
    hospital: HospitalProfile;
}

export function HospitalDetailClient({ hospital }: HospitalDetailClientProps) {
    const { openQuoteWidget } = useQuote();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedDept, setSelectedDept] = useState<any | null>(null);
    const [filterRating, setFilterRating] = useState<number | 'all'>('all');
    const [counts, setCounts] = useState<Record<number, number>>({});

    // Derived stats for UI
    const stats = [
        { value: `${new Date().getFullYear() - (hospital.establishmentYear || 2000)}+`, label: 'Years of Excellence', icon: Building2 },
        { value: `${hospital.beds}+`, label: 'Beds', icon: Activity },
        { value: '15000+', label: 'Procedures/Year', icon: TrendingUp },
        { value: '4.9/5', label: 'Patient Rating', icon: Star }
    ];

    // Animated counter effect
    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];
        stats.forEach((stat: any, index: number) => {
            const targetValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
            if (!isNaN(targetValue)) {
                let current = 0;
                const increment = Math.max(1, targetValue / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetValue) {
                        setCounts(prev => ({ ...prev, [index]: targetValue }));
                        clearInterval(timer);
                    } else {
                        setCounts(prev => ({ ...prev, [index]: Math.floor(current) }));
                    }
                }, 30);
                timers.push(timer);
            }
        });
        return () => timers.forEach(timer => clearInterval(timer));
    }, [hospital]);

    const filteredReviews = hospital?.reviews?.filter((r: any) =>
        filterRating === 'all' || r.rating === filterRating
    ) || [];

    // Helper to get main image
    const getMainImage = () => {
        if (hospital.photos && hospital.photos.length > 0 && hospital.photos[0]) return hospital.photos[0];
        return 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section with Parallax */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative pt-32 pb-20 overflow-hidden"
            >
                <div className="absolute inset-0">
                    <Image
                        src={getMainImage()}
                        alt={hospital.name}
                        fill
                        sizes="100vw"
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-transparent" />
                </div>

                <div className="relative container mx-auto px-4">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/hospital" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Hospitals
                        </Link>
                    </motion.div>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-2 mb-4"
                        >
                            {hospital.accreditations.map((acc: string, i: number) => (
                                <span key={i} className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                                    {acc} Accredited
                                </span>
                            ))}
                            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                                {hospital.type} Hospital
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
                        >
                            {hospital.name}
                        </motion.h1>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl text-blue-100 mb-6"
                        >
                            {hospital.description?.short || ''}
                        </motion.p>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg text-white/90 mb-8 max-w-3xl"
                        >
                            {hospital.description?.long?.substring(0, 200)}...
                        </motion.p>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap items-center gap-6 text-white"
                        >
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                <span className="font-bold">4.9</span>
                                <span className="text-white/70">({hospital.reviews?.length || 0} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{hospital.location?.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                <span>{hospital.beds} Beds</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>Est. {hospital.establishmentYear}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Animated Stats Bar */}
            <section className="bg-white shadow-lg relative z-10 -mt-4">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                className="text-center group hover:scale-105 transition-transform"
                            >
                                <stat.icon className="w-10 h-10 mx-auto mb-2 text-blue-600 group-hover:text-blue-700 transition-colors" />
                                <div className="text-3xl font-bold text-gray-800">
                                    {stat.value.includes('/') ? stat.value : (counts[i] || 0) + (stat.value.includes('+') ? '+' : '')}
                                </div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href={`/booking?hospitalId=${hospital.id}&hospitalName=${encodeURIComponent(hospital.name)}&type=hospital`}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                            >
                                <Calendar className="w-5 h-5" />
                                Book Appointment
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a
                                href={`tel:${hospital.contact.phone}`}
                                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button
                                onClick={() => openQuoteWidget({
                                    hospitalId: hospital.id,
                                    hospitalName: hospital.name,
                                    source: 'hospital-detail'
                                })}
                                className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2"
                            >
                                Get Cost Estimate
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Image Gallery */}
            {hospital.photos && hospital.photos.length > 0 && (
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Camera className="w-7 h-7 text-blue-600" />
                            Photo Gallery
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {hospital.photos.map((img: string, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="relative h-48 rounded-xl overflow-hidden cursor-pointer group"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <Image
                                        src={img}
                                        alt={`${hospital.name} gallery ${i + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                        <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-4xl w-full h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Hospital image"
                                fill
                                sizes="(max-width: 1200px) 100vw, 1200px"
                                className="object-contain"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content - Simplified version */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Heart className="w-7 h-7 text-blue-600" />
                                    About {hospital.name}
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">{hospital.description?.long}</p>

                                {hospital.highlights && hospital.highlights.length > 0 && (
                                    <>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Key Highlights</h3>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {hospital.highlights.map((highlight: string, i: number) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ x: -20, opacity: 0 }}
                                                    whileInView={{ x: 0, opacity: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="flex items-start gap-2"
                                                >
                                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700">{highlight}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </motion.div>

                            {/* Specialties */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <Stethoscope className="w-7 h-7 text-blue-600" />
                                    Medical Specialties
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {hospital.specialties.map((specialty: string, i: number) => (
                                        <motion.span
                                            key={i}
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ scale: 1.1 }}
                                            className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-blue-100 transition-colors"
                                        >
                                            {specialty}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Equipment & Facilities */}
                            {hospital.equipment && hospital.equipment.length > 0 && (
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl shadow-lg p-8"
                                >
                                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Advanced Equipment</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {hospital.equipment.map((item: string, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{ x: -20, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                            >
                                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                                <span className="text-gray-700">{item}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {hospital.facilities && hospital.facilities.length > 0 && (
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl shadow-lg p-8"
                                >
                                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Hospital Facilities</h2>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {hospital.facilities.map((facility: string, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.03 }}
                                                className="flex items-center gap-2"
                                            >
                                                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                <span className="text-gray-700">{facility}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
                            {/* Contact Information */}
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">General Enquiries</div>
                                        <a href={`tel:${hospital.contact.phone}`} className="text-blue-600 font-semibold hover:underline">
                                            {hospital.contact.phone}
                                        </a>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Emergency</div>
                                        <a href={`tel:${hospital.contact.emergency}`} className="text-red-600 font-semibold hover:underline">
                                            {hospital.contact.emergency}
                                        </a>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Email</div>
                                        <a href={`mailto:${hospital.contact.email}`} className="text-blue-600 hover:underline break-all">
                                            {hospital.contact.email}
                                        </a>
                                    </div>
                                    {hospital.contact.website && (
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Website</div>
                                            <a href={hospital.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                                {hospital.contact.website}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
