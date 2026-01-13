"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight, Sparkles, Star, Zap } from "lucide-react";
import { useState } from "react";

// Package interface for the carousel
interface CarouselPackage {
    id: string;
    name: string;
    tagline: string;
    basePrice: number;
    duration: string;
    features: string[];
    color: string;
    popular?: boolean;
}

// Fallback static packages if none provided
const fallbackPackages: CarouselPackage[] = [
    {
        id: "essential",
        name: "Essential Care",
        tagline: "Quality treatment, smart savings",
        basePrice: 4999,
        duration: "7-10 days",
        features: ["NABH-accredited Hospital", "Standard Private Room", "3-Star Hotel Stay", "Airport Transfers", "Basic Translator"],
        color: "from-sky-500 via-blue-500 to-indigo-600",
    },
    {
        id: "premium",
        name: "Premium Wellness",
        tagline: "Complete care with luxury",
        basePrice: 8999,
        duration: "14-18 days",
        features: ["Top-tier Hospital", "Deluxe Private Suite", "4-Star Wellness Retreat", "Private Transfers", "Dedicated Coordinator"],
        color: "from-emerald-500 via-teal-500 to-cyan-600",
        popular: true,
    },
    {
        id: "luxury",
        name: "Luxury Journey",
        tagline: "World-class, unmatched luxury",
        basePrice: 15999,
        duration: "21-28 days",
        features: ["VIP Hospital Services", "Presidential Suite", "5-Star Heritage Hotel", "Luxury Vehicle + Driver", "24/7 Personal Concierge"],
        color: "from-amber-500 via-orange-500 to-rose-600",
    },
];

const getIcon = (index: number) => {
    const icons = [Star, Sparkles, Zap];
    return icons[index % 3];
};

const getShadowColor = (color: string) => {
    if (color.includes('blue') || color.includes('sky') || color.includes('indigo')) return 'shadow-blue-500/25';
    if (color.includes('emerald') || color.includes('teal')) return 'shadow-emerald-500/25';
    if (color.includes('amber') || color.includes('orange')) return 'shadow-amber-500/25';
    return 'shadow-gray-500/25';
};

// 3D Tilt Card Component
function TiltCard({
    pkg,
    isCenter,
    offset,
    onClick,
    index
}: {
    pkg: CarouselPackage;
    isCenter: boolean;
    offset: number;
    onClick: () => void;
    index: number;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-150, 150], [10, -10]), { stiffness: 200, damping: 25 });
    const rotateY = useSpring(useTransform(x, [-150, 150], [-10, 10]), { stiffness: 200, damping: 25 });

    function handleMouseMove(e: React.MouseEvent) {
        if (!isCenter) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const Icon = getIcon(index);
    const shadowColor = getShadowColor(pkg.color);

    return (
        <motion.div
            className="absolute left-1/2 cursor-pointer"
            initial={false}
            animate={{
                x: `calc(-50% + ${offset * 340}px)`,
                scale: isCenter ? 1 : 0.88,
                zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                opacity: Math.abs(offset) > 1 ? 0.3 : isCenter ? 1 : 0.7,
                filter: isCenter ? "blur(0px)" : "blur(1px)",
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
            }}
            onClick={onClick}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                className={`relative w-[320px] rounded-3xl overflow-visible ${shadowColor}`}
                style={{
                    rotateX: isCenter ? rotateX : 0,
                    rotateY: offset * -8,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={isCenter ? { scale: 1.03 } : { scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                {/* Card with gradient border */}
                <div className={`relative bg-gradient-to-br ${pkg.color} p-[2px] rounded-3xl shadow-2xl ${shadowColor}`}>

                    {/* Popular badge */}
                    {pkg.popular && (
                        <motion.div
                            className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-5 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-amber-500/30"
                            initial={{ scale: 0, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            ⭐ MOST POPULAR
                        </motion.div>
                    )}

                    {/* Inner card */}
                    <div className="bg-gradient-to-b from-white to-gray-50 rounded-[22px] overflow-hidden">

                        {/* Header with gradient */}
                        <div className={`relative h-44 bg-gradient-to-br ${pkg.color} p-6 overflow-hidden`}>

                            {/* Animated background orb */}
                            <motion.div
                                className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/20 blur-2xl"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    x: [0, 20, 0],
                                    y: [0, -10, 0],
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Icon badge */}
                            <div className="absolute top-5 right-5 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                                <Icon className="w-7 h-7 text-white" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end text-white">
                                <span className="text-white/70 text-sm font-medium mb-1">{pkg.duration}</span>
                                <h3 className="text-2xl font-bold tracking-tight mb-1">{pkg.name}</h3>
                                <p className="text-white/80 text-sm">{pkg.tagline}</p>
                            </div>

                            {/* Shine sweep */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                                initial={{ x: "-150%" }}
                                animate={{ x: "150%" }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    repeatDelay: 4,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>

                        {/* Body */}
                        <div className="p-6 pt-5">

                            {/* Price */}
                            <div className="flex items-baseline gap-2 mb-5">
                                <span className="text-gray-400 text-sm">From</span>
                                <span className="text-4xl font-extrabold text-gray-900">
                                    ${pkg.basePrice.toLocaleString()}
                                </span>
                                <span className="text-gray-400 text-sm">USD</span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-2.5 mb-6">
                                {pkg.features.slice(0, 5).map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center shrink-0`}>
                                            <CheckCircle className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span className="text-gray-600 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <motion.button
                                className={`w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${pkg.color} shadow-lg ${shadowColor} relative overflow-hidden group`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10">Get Quote</span>
                                <motion.div
                                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* 3D depth effect */}
                <div
                    className={`absolute inset-2 bg-gradient-to-br ${pkg.color} rounded-3xl blur-xl opacity-40 -z-10`}
                    style={{ transform: "translateY(10px)" }}
                />
            </motion.div>
        </motion.div>
    );
}

// Main Component - now accepts packages from props
interface Packages3DAnimationProps {
    packages?: CarouselPackage[];
}

export default function Packages3DAnimation({ packages }: Packages3DAnimationProps) {
    const displayPackages = packages && packages.length >= 3 ? packages.slice(0, 3) : fallbackPackages;
    const [activeIndex, setActiveIndex] = useState(displayPackages.findIndex(p => p.popular) >= 0 ? displayPackages.findIndex(p => p.popular) : 1);

    const goNext = () => setActiveIndex((prev) => (prev + 1) % displayPackages.length);
    const goPrev = () => setActiveIndex((prev) => (prev - 1 + displayPackages.length) % displayPackages.length);

    return (
        <div className="relative w-full py-12 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50" />

            {/* Subtle ambient effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-100/50 rounded-full blur-[100px]" />

            {/* Title */}
            <div className="relative text-center mb-12">
                <motion.span
                    className="inline-block text-emerald-600 font-semibold tracking-widest uppercase text-xs mb-3 bg-emerald-50 px-4 py-1.5 rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    All-Inclusive Packages
                </motion.span>
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Choose Your Journey
                </motion.h2>
                <motion.p
                    className="text-gray-500 mt-3 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Explore our carefully curated medical tourism packages
                </motion.p>
            </div>

            {/* Carousel container */}
            <div
                className="relative h-[540px] flex items-center justify-center"
                style={{ perspective: 1200 }}
            >
                {/* Cards */}
                <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                    {displayPackages.map((pkg, index) => {
                        let offset = index - activeIndex;
                        if (offset > 1) offset -= displayPackages.length;
                        if (offset < -1) offset += displayPackages.length;

                        return (
                            <TiltCard
                                key={pkg.id}
                                pkg={pkg}
                                isCenter={index === activeIndex}
                                offset={offset}
                                onClick={() => setActiveIndex(index)}
                                index={index}
                            />
                        );
                    })}
                </div>

                {/* Navigation arrows */}
                <motion.button
                    className="absolute left-4 md:left-12 z-30 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:shadow-xl border border-gray-100 transition-all"
                    onClick={goPrev}
                    whileHover={{ scale: 1.1, x: -3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                    className="absolute right-4 md:right-12 z-30 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:shadow-xl border border-gray-100 transition-all"
                    onClick={goNext}
                    whileHover={{ scale: 1.1, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ChevronRight className="w-5 h-5" />
                </motion.button>
            </div>

            {/* Dots indicator */}
            <div className="relative flex justify-center gap-2 mt-6">
                {displayPackages.map((pkg, index) => (
                    <motion.button
                        key={pkg.id}
                        className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                            ? `w-8 bg-gradient-to-r ${pkg.color}`
                            : "w-2 bg-gray-300 hover:bg-gray-400"
                            }`}
                        onClick={() => setActiveIndex(index)}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>
        </div>
    );
}
