"use client";

import { Footer, Header } from '@/app/components/common';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Compass,
    Globe, Heart,
    Leaf,
    Star,
    Sun,
    Users
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
};

// Auroville facts
const aurovilleFacts = [
    { label: "Founded", value: "1968", icon: Star },
    { label: "Countries", value: "60+", icon: Globe },
    { label: "Residents", value: "3,200+", icon: Users },
    { label: "Hectares", value: "2,100", icon: Leaf },
];

// Key places in Auroville
const places = [
    {
        name: "Matrimandir",
        tagline: "The Soul of Auroville",
        description: "A golden sphere of contemplation and inner silence, the spiritual heart of the township.",
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800",
    },
    {
        name: "Galaxy Garden",
        tagline: "Where Nature Speaks",
        description: "Twelve meditation gardens surrounding Matrimandir, each representing a quality of consciousness.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    },
    {
        name: "Visitors Center",
        tagline: "Your Gateway to Unity",
        description: "Begin your journey here - exhibitions, café, and boutique showcasing Auroville's vision.",
        image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
    },
];

// Founding principles
const principles = [
    "Belongs to nobody in particular",
    "Place of unending education",
    "Bridge between past and future",
    "Living research for human unity",
];

// Floating golden particles
const GoldenParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-amber-300 to-yellow-400"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                }}
                animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 4 + Math.random() * 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        ))}
    </div>
);

const AurovillePage = () => {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
    const [activeImage, setActiveImage] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200",
        "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <Header />

            {/* Hero Section - Majestic Golden Sphere */}
            <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
                <motion.div className="absolute inset-0" style={{ y: heroY }}>
                    <Image
                        src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920"
                        alt="Auroville Matrimandir"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-yellow-800/50 to-orange-700/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>

                <GoldenParticles />

                {/* Rotating sun rays */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                >
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-[50vh] bg-gradient-to-t from-amber-300 to-transparent"
                            style={{ transform: `rotate(${i * 30}deg)` }}
                        />
                    ))}
                </motion.div>

                <motion.div
                    className="relative container mx-auto px-6 lg:px-8 text-center"
                    style={{ opacity: heroOpacity }}
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-amber-300/30"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            >
                                <Sun className="w-6 h-6 text-amber-300" />
                            </motion.div>
                            <span className="text-white text-lg font-medium">
                                City of Dawn • Universal Township
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-7xl md:text-9xl font-black mb-8"
                        >
                            <motion.span
                                className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200"
                                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                style={{ backgroundSize: '200% auto' }}
                            >
                                AUROVILLE
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-2xl md:text-3xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed italic"
                        >
                            "A place where human beings could live freely as citizens of the world"
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg text-amber-200 mb-12"
                        >
                            — The Mother, Founder
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="#discover"
                                    className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-black px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-amber-500/50 transition-all inline-flex items-center gap-3"
                                >
                                    <Compass className="w-6 h-6" />
                                    Explore the Dream
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-8 h-12 border-2 border-amber-300/50 rounded-full flex justify-center pt-3">
                        <motion.div
                            className="w-2 h-4 bg-amber-300 rounded-full"
                            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Facts Bar */}
            <section className="py-12 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                />
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {aurovilleFacts.map((fact, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center text-white"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    className="w-14 h-14 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3"
                                >
                                    <fact.icon className="w-7 h-7" />
                                </motion.div>
                                <div className="text-4xl font-black">{fact.value}</div>
                                <div className="text-amber-100">{fact.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Gallery with Animation */}
            <section id="discover" className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.span
                            className="text-7xl mb-6 block"
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            🌅
                        </motion.span>
                        <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 mb-6">
                            Glimpses of Auroville
                        </h2>
                    </motion.div>

                    {/* Main Image Showcase */}
                    <div className="relative mb-8">
                        <motion.div
                            className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
                            layoutId="mainImage"
                        >
                            <Image
                                src={images[activeImage]}
                                alt="Auroville"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </motion.div>
                    </div>

                    {/* Thumbnail selector */}
                    <div className="flex justify-center gap-4">
                        {images.map((img, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg transition-all ${activeImage === i ? 'ring-4 ring-amber-500' : 'opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`View ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Places Section */}
            <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-6xl mb-6 block">🏛️</span>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-6">
                            Sacred
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500"> Spaces</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {places.map((place, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl mb-6">
                                    <Image
                                        src={place.image}
                                        alt={place.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-800/30 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <p className="text-amber-200 italic mb-2">"{place.tagline}"</p>
                                        <h3 className="text-2xl font-bold text-white">{place.name}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-center">{place.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Principles Quote Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 via-yellow-600 to-orange-600" />
                <GoldenParticles />

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="text-8xl mb-8"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            ☀️
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-12">
                            The Auroville Charter
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {principles.map((principle, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                                >
                                    <span className="text-2xl text-white font-medium">
                                        "{principle}"
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden bg-white">
                <div className="container mx-auto px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="text-8xl mb-8"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            🌍
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black text-gray-800 mb-6">
                            Experience
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Human Unity</span>
                        </h2>
                        <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
                            Visit Auroville and discover a place where dreams of a better world are being realized.
                        </p>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/destination"
                                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-12 py-6 rounded-full font-black text-2xl shadow-2xl hover:shadow-amber-500/30 transition-all inline-flex items-center gap-3"
                            >
                                <Heart className="w-8 h-8 fill-current" />
                                Plan Your Visit
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AurovillePage;
