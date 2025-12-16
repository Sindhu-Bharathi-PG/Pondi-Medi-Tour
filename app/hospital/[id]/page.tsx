"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowLeft, Building2, Calendar, Camera, CheckCircle, ChevronRight, Clock, Heart, MapPin, Microscope, Phone, Quote, Star, Stethoscope, TrendingUp, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../../components/common';

// This would ideally come from a database or API
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
    // Optional fields for legacy support or future expansion
    rating?: number;
    nearbyHospitals?: any[];
    touristPlaces?: any[];
}

export default function HospitalDetailPage() {
    const params = useParams();
    const hospitalId = params?.id as string;
    const [hospital, setHospital] = useState<HospitalProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedDept, setSelectedDept] = useState<any | null>(null);
    const [filterRating, setFilterRating] = useState<number | 'all'>('all');
    const [counts, setCounts] = useState<Record<number, number>>({});

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/hospitals/${hospitalId}`);
                if (!response.ok) throw new Error('Hospital not found');
                const data = await response.json();

                // Transform API data to match UI needs if necessary, otherwise use directly
                // Assuming API returns data matching the interface roughly
                setHospital(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (hospitalId) fetchHospital();
    }, [hospitalId]);

    // Derived stats for UI
    const stats = hospital ? [
        { value: `${new Date().getFullYear() - (hospital.establishmentYear || 2000)}+`, label: 'Years of Excellence', icon: Building2 },
        { value: `${hospital.beds}+`, label: 'Beds', icon: Activity },
        { value: '15000+', label: 'Procedures/Year', icon: TrendingUp },
        { value: '4.9/5', label: 'Patient Rating', icon: Star }
    ] : [];

    useEffect(() => {
        if (hospital) {
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
        }
    }, [hospital]);

    const filteredReviews = hospital?.reviews?.filter((r: any) =>
        filterRating === 'all' || r.rating === filterRating
    ) || [];

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;

    if (error || !hospital) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{error || 'Hospital Not Found'}</h1>
                    <p className="text-gray-600 mb-8">The hospital you're looking for doesn't exist.</p>
                    <Link href="/hospital" className="text-blue-600 hover:underline">← Back to Hospitals</Link>
                </div>
                <Footer />
            </div>
        );
    }

    // Helper to get image URL properly
    const getMainImage = () => {
        if (hospital.photos && hospital.photos.length > 0) return hospital.photos[0];
        return 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200'; // Fallback
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
                                {/* Calculate average rating if needed, or use specific field if added */}
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
                                href="/booking"
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
                            <Link
                                href="/cost-calculator"
                                className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2"
                            >
                                Get Cost Estimate
                            </Link>
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

            {/* Department Details Modal */}
            <AnimatePresence>
                {selectedDept && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedDept(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-48">
                                <Image
                                    src={selectedDept.image}
                                    alt={selectedDept.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-4 left-6">
                                    <h3 className="text-3xl font-bold text-white">{selectedDept.name}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedDept(null)}
                                    className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/40 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6">
                                <p className="text-lg text-gray-700 leading-relaxed mb-6">{selectedDept.description}</p>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <User className="w-6 h-6 text-blue-600" />
                                            <h4 className="font-bold text-gray-800">Head of Department</h4>
                                        </div>
                                        <p className="text-gray-700">{selectedDept.head}</p>
                                    </div>
                                    <div className="bg-indigo-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Microscope className="w-6 h-6 text-indigo-600" />
                                            <h4 className="font-bold text-gray-800">Key Procedures</h4>
                                        </div>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                            {selectedDept.commonProcedures?.map((proc: string, i: number) => (
                                                <li key={i}>{proc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-sm text-gray-500 pt-6 border-t">
                                    <div className="flex items-center gap-2">
                                        <Stethoscope className="w-4 h-4" />
                                        <span>{selectedDept.doctors} Specialized Doctors</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4" />
                                        <span>{selectedDept.procedures}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
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

                                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Highlights</h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {hospital.highlights?.map((highlight: string, i: number) => (
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

                            {/* Related Treatments - Links to Services */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-[var(--medical-navy)] to-[var(--medical-dark-teal)] rounded-2xl shadow-lg p-8 text-white"
                            >
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Stethoscope className="w-6 h-6" />
                                    Explore Treatments at {hospital.name}
                                </h2>
                                <p className="text-white/80 mb-6">
                                    View detailed information about procedures, costs, and recovery times for treatments available at this hospital.
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {[
                                        { name: 'Orthopedics', slug: 'orthopedics' },
                                        { name: 'Cardiology', slug: 'cardiology' },
                                        { name: 'Neurology', slug: 'neurology' },
                                        { name: 'Oncology', slug: 'oncology' },
                                        { name: 'IVF & Fertility', slug: 'ivf' },
                                        { name: 'Eye Surgery', slug: 'ophthalmology' },
                                    ].filter(t => hospital.specialties.some((s: string) =>
                                        s.toLowerCase().includes(t.name.toLowerCase().split(' ')[0]) ||
                                        t.name.toLowerCase().includes(s.toLowerCase().split(' ')[0])
                                    )).slice(0, 6).map((treatment, i) => (
                                        <Link
                                            key={i}
                                            href={`/services/${treatment.slug}`}
                                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg text-center font-medium transition-all hover:scale-105"
                                        >
                                            {treatment.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/services"
                                        className="bg-[var(--medical-gold)] text-[var(--medical-navy)] px-4 py-3 rounded-lg text-center font-bold transition-all hover:scale-105 col-span-2 md:col-span-1"
                                    >
                                        View All Treatments →
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Departments with Images */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">Departments & Expertise</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {hospital.departments.map((dept: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ y: -5 }}
                                            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                                            onClick={() => setSelectedDept(dept)}
                                        >
                                            <div className="relative h-32">
                                                <Image
                                                    src={dept.image}
                                                    alt={dept.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                                <h3 className="text-lg font-bold">{dept.name}</h3>
                                                <div className="flex gap-3 text-xs mt-1">
                                                    <span>{dept.doctors} Doctors</span>
                                                    <span>•</span>
                                                    <span>{dept.procedures}</span>
                                                </div>
                                            </div>
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full">View Details</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Reviews Section */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b pb-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                                            <Quote className="w-7 h-7 text-blue-600" />
                                            Patient Reviews
                                        </h2>
                                        <div className="flex items-center gap-3">
                                            <span className="text-4xl font-bold text-gray-900">4.9</span>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-5 h-5 ${i < Math.floor(4.9) ? 'text-yellow-400 fill-current' : 'text-gray-200 fill-current'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-gray-500 text-sm">{hospital.reviews?.length || 0} total reviews</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { label: 'All', value: 'all' },
                                            { label: '5 ★', value: 5 },
                                            { label: '4 ★', value: 4 },
                                            { label: '3 ★', value: 3 },
                                            { label: '2 ★', value: 2 },
                                            { label: '1 ★', value: 1 }
                                        ].map((option) => (
                                            <button
                                                key={option.label}
                                                onClick={() => setFilterRating(option.value as number | 'all')}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filterRating === option.value
                                                    ? 'bg-blue-600 text-white shadow-md scale-105'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-1 gap-4">
                                    <AnimatePresence mode="popLayout">
                                        {filteredReviews.length > 0 ? (
                                            filteredReviews.map((review: any) => (
                                                <motion.div
                                                    key={review.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    layout
                                                    className="bg-gray-50 rounded-xl p-6 relative group hover:shadow-md transition-shadow"
                                                >
                                                    <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200 group-hover:text-blue-100 transition-colors" />
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-lg flex-shrink-0">
                                                            {review.user.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                <h4 className="font-bold text-gray-800">{review.user}</h4>
                                                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{review.origin}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                                <div className="flex items-center gap-0.5">
                                                                    {[...Array(5)].map((_, starIndex) => (
                                                                        <Star
                                                                            key={starIndex}
                                                                            className={`w-3 h-3 ${starIndex < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span>•</span>
                                                                <span>{review.date}</span>
                                                            </div>
                                                            <p className="text-gray-600 italic">"{review.comment}"</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center py-8 text-gray-500"
                                            >
                                                No reviews found for this rating.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Equipment & Technology */}
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

                            {/* Facilities */}
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
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6 lg:sticky lg:top-4 lg:self-start">
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
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Website</div>
                                        <a href={hospital.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                            Visit Website →
                                        </a>
                                    </div>
                                    <div className="pt-4 border-t">
                                        <div className="text-sm text-gray-500 mb-1">Address</div>
                                        <p className="text-gray-700">{hospital.location?.address}</p>
                                    </div>
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6 pt-6 border-t">
                                    <Link
                                        href="/booking"
                                        className="w-full bg-gradient-to-r from-[var(--medical-teal)] to-[var(--medical-dark-teal)] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-center block"
                                    >
                                        Book Consultation
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="bg-gradient-to-br from-[var(--medical-teal)] to-[var(--medical-dark-teal)] rounded-2xl shadow-lg p-6 text-white"
                            >
                                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-blue-100">Established</span>
                                        <span className="font-bold">{hospital.establishmentYear}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-100">Total Beds</span>
                                        <span className="font-bold">{hospital.beds}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-100">Specialties</span>
                                        <span className="font-bold">{hospital.specialties.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-100">Rating</span>
                                        <span className="font-bold flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-current" />
                                            {hospital.rating}/5
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Nearby Hospitals */}
                            {hospital.nearbyHospitals && hospital.nearbyHospitals.length > 0 && (
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-blue-600" />
                                        Nearby Hospitals
                                    </h3>
                                    <div className="space-y-3">
                                        {hospital.nearbyHospitals.map((nearby: any, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.8 + i * 0.1 }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <Link
                                                    href={`/hospital/${nearby.id}`}
                                                    className="block p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                                {nearby.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-500">{nearby.specialty}</p>
                                                        </div>
                                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <MapPin className="w-3 h-3 text-gray-400" />
                                                        <span className="text-xs text-gray-500">{nearby.distance} away</span>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Tourist Places */}
                            {hospital.touristPlaces && hospital.touristPlaces.length > 0 && (
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Camera className="w-5 h-5 text-blue-600" />
                                        Nearby Attractions
                                    </h3>
                                    <div className="space-y-3">
                                        {hospital.touristPlaces.slice(0, 4).map((place: any, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 1.0 + i * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="group cursor-pointer"
                                            >
                                                <div className="relative h-24 rounded-lg overflow-hidden mb-2">
                                                    <Image
                                                        src={place.image}
                                                        alt={place.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    <div className="absolute bottom-2 left-2 right-2">
                                                        <h4 className="font-semibold text-white text-sm">{place.name}</h4>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <MapPin className="w-3 h-3 text-white/80" />
                                                            <span className="text-xs text-white/80">{place.distance} away</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Location and Attractions */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                        <MapPin className="w-7 h-7 text-blue-600" />
                        Location & Nearby Attractions
                    </h2>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-1 h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <iframe
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(hospital.name + ' ' + hospital.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </motion.div>

                        {/* Attractions Grid */}
                        <div className="lg:col-span-2">
                            <div className="grid md:grid-cols-2 gap-4">
                                {hospital.touristPlaces?.map((place: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                            <Image
                                                src={place.image}
                                                alt={place.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">{place.name}</h4>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <MapPin className="w-4 h-4 text-blue-500" />
                                                <span>{place.distance} away</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
