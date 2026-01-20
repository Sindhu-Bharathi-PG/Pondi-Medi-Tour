"use client";

import { API_BASE } from '@/app/hooks/useApi';
import { HospitalsSectionConfig } from '@/app/types/homeConfig.types';
import { motion, useInView } from 'framer-motion';
import { Award, Building2, ChevronRight, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Hospital {
    id: number;
    name: string;
    type: string;
    status: string;
    photos?: string[];
    coverUrl?: string;
    logoUrl?: string;
    accreditations?: (string | { name: string; logo?: string; year?: number })[];
    location?: { city?: string };
    rating?: number;
    reviewCount?: number;
}

interface DynamicHospitalsProps {
    config: HospitalsSectionConfig;
    mode: 'medical' | 'wellness';
}

export default function DynamicHospitals({ config, mode }: DynamicHospitalsProps) {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Refs for smooth parallax
    const targetOffsetRef = useRef(0);
    const currentOffsetRef = useRef(-75);
    const rafIdRef = useRef<number | null>(null);

    // Background image for hospitals section
    const backgroundImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920";

    // Smooth parallax with lerp interpolation
    const updateParallax = useCallback(() => {
        if (!sectionRef.current || !bgRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Only apply parallax when section is in view
        if (rect.top < windowHeight && rect.bottom > 0) {
            // Lerp - high factor (0.25) for fast catch-up
            const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

            currentOffsetRef.current = lerp(currentOffsetRef.current, targetOffsetRef.current, 0.25);

            // Apply transform with scale 1.5 for complete coverage
            bgRef.current.style.transform = `translate3d(0, ${currentOffsetRef.current}px, 0) scale(1.5)`;

            // Continue animation if not close enough to target
            if (Math.abs(targetOffsetRef.current - currentOffsetRef.current) > 0.5) {
                rafIdRef.current = requestAnimationFrame(updateParallax);
            } else {
                rafIdRef.current = null;
            }
        }
    }, []);

    const handleScroll = useCallback(() => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Only calculate when section is in view
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
            targetOffsetRef.current = scrollProgress * 150 - 75; // Max 150px movement

            // Start RAF loop if not already running
            if (rafIdRef.current === null) {
                rafIdRef.current = requestAnimationFrame(updateParallax);
            }
        }
    }, [updateParallax]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [handleScroll]);

    // Fetch real hospitals from database
    useEffect(() => {
        const fetchHospitals = async (retryCount = 0) => {
            try {
                const res = await fetch(`${API_BASE}/api/hospitals?limit=6`);
                if (res.ok) {
                    const data = await res.json();
                    const active = (data.hospitals || data || [])
                        .filter((h: Hospital) => h.status === 'active' || h.status === 'approved')
                        .slice(0, 6);
                    setHospitals(active);
                } else if (retryCount < 2) {
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
            sectionBg: 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700',
            buttonBg: 'bg-white text-emerald-600 hover:bg-emerald-50',
            subtitleColor: 'text-emerald-100',
            cardBg: 'bg-white/10 hover:bg-white/20',
            accentGlow: 'from-emerald-400/20',
        }
        : {
            sectionBg: 'bg-gradient-to-br from-amber-600 via-orange-500 to-red-500',
            buttonBg: 'bg-white text-amber-600 hover:bg-amber-50',
            subtitleColor: 'text-amber-100',
            cardBg: 'bg-white/10 hover:bg-white/20',
            accentGlow: 'from-amber-400/20',
        };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    return (
        <section ref={sectionRef} className={`py-24 text-white relative overflow-hidden`}>
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 bg-gray-900">
                <div
                    ref={bgRef}
                    className="absolute inset-[-25%] will-change-transform"
                    style={{
                        transform: 'translate3d(0, -75px, 0) scale(1.5)',
                        transformOrigin: 'center center'
                    }}
                >
                    <Image
                        src={backgroundImage}
                        alt="Hospital Partners Background"
                        fill
                        className="object-cover"
                        quality={85}
                        sizes="100vw"
                    />
                    {/* Gradient overlay based on mode */}
                    <div className={`absolute inset-0 ${mode === 'medical'
                        ? 'bg-gradient-to-br from-emerald-900/90 via-teal-800/85 to-cyan-900/90'
                        : 'bg-gradient-to-br from-amber-900/90 via-orange-800/85 to-red-900/90'
                        }`} />
                </div>
            </div>

            {/* Animated background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -45, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">Accredited Partners</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{config.content.title}</h2>
                    <p className={`text-xl ${themeColors.subtitleColor}`}>{config.content.subtitle}</p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <motion.div
                            className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <p className="mt-4 text-white/70">Loading hospitals...</p>
                    </div>
                )}

                {/* Hospitals Grid */}
                {!loading && hospitals.length > 0 && (
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {hospitals.map((hospital, index) => (
                            <motion.div
                                key={hospital.id}
                                custom={index}
                                variants={cardVariants}
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                                className="group"
                            >
                                <Link
                                    href={`/hospital/${hospital.id}`}
                                    className={`block ${themeColors.cardBg} backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 border border-white/10 hover:border-white/30 hover:shadow-2xl`}
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        {(hospital.coverUrl || hospital.photos?.[0]) ? (
                                            <motion.div
                                                className="absolute inset-0"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <Image
                                                    src={hospital.coverUrl || hospital.photos?.[0] || ''}
                                                    alt={hospital.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                <Building2 className="w-16 h-16 text-white/30" />
                                            </div>
                                        )}

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        {/* Accreditation badge */}
                                        {hospital.accreditations?.[0] && (
                                            <motion.div
                                                className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                                                initial={{ scale: 0 }}
                                                animate={isInView ? { scale: 1 } : {}}
                                                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                                            >
                                                {typeof hospital.accreditations[0] === 'string'
                                                    ? hospital.accreditations[0]
                                                    : hospital.accreditations[0].name}
                                            </motion.div>
                                        )}

                                        {/* Rating */}
                                        {hospital.rating && (
                                            <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-white text-sm font-medium">{hospital.rating}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-white/90 transition-colors">
                                            {hospital.name}
                                        </h3>
                                        <div className="flex items-center gap-2 flex-wrap">
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

                                        {/* View button */}
                                        <motion.div
                                            className="mt-4 flex items-center gap-2 text-white/70 group-hover:text-white transition-colors"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="text-sm font-medium">View Hospital</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </motion.div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Fallback to Static Config Items */}
                {!loading && hospitals.length === 0 && (
                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {config.items.map((hospital, index) => (
                            <motion.div
                                key={hospital.id}
                                custom={index}
                                variants={cardVariants}
                                whileHover={{ y: -10 }}
                                className={`${themeColors.cardBg} backdrop-blur-md rounded-2xl overflow-hidden transition-all group border border-white/10`}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Image
                                            src={hospital.image}
                                            alt={hospital.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                        {hospital.accreditation}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
                                    <p className={themeColors.subtitleColor}>{hospital.type} Hospital</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* View All Link */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        href={config.content.viewAllLink}
                        className={`inline-flex items-center gap-2 ${themeColors.buttonBg} px-8 py-4 rounded-full font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                    >
                        <span>{config.content.viewAllText}</span>
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
