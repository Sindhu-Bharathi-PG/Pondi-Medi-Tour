"use client";

import EditableText from '@/app/components/admin/EditableText';
import SearchBar from '@/app/components/common/SearchBar';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { HeroSectionConfig } from '@/app/types/homeConfig.types';
import { getIcon } from '@/app/utils/iconMap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface DynamicHeroProps {
    config: HeroSectionConfig;
    mode: 'medical' | 'wellness';
}

// Floating particles component
const FloatingParticles = ({ mode }: { mode: 'medical' | 'wellness' }) => {
    const particles = useMemo(() =>
        Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 10,
            size: 2 + Math.random() * 4,
        })), []
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full ${mode === 'medical' ? 'bg-emerald-400/30' : 'bg-amber-400/30'}`}
                    style={{
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    initial={{ y: '100vh', opacity: 0 }}
                    animate={{
                        y: '-100vh',
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
};

// Animated gradient orbs
const GradientOrbs = ({ mode }: { mode: 'medical' | 'wellness' }) => {
    const colors = mode === 'medical'
        ? ['from-emerald-500/20', 'from-teal-500/20', 'from-cyan-500/20']
        : ['from-amber-500/20', 'from-orange-500/20', 'from-yellow-500/20'];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {colors.map((color, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-96 h-96 rounded-full bg-gradient-radial ${color} to-transparent blur-3xl`}
                    style={{
                        left: `${20 + i * 30}%`,
                        top: `${10 + i * 20}%`,
                    }}
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -30, 50, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 15 + i * 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

export default function DynamicHero({ config, mode }: DynamicHeroProps) {
    const homeConfig = useHomeConfigOptional();
    const isEditing = homeConfig?.isEditing ?? false;
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const targetOffsetRef = useRef(0);
    const currentOffsetRef = useRef(0);
    const rafIdRef = useRef<number | null>(null);

    const [countUp, setCountUp] = useState<Record<string, number>>({});

    // Smooth parallax with lerp interpolation for fluid scrolling
    const updateParallax = useCallback(() => {
        if (!bgRef.current) return;

        // Lerp (linear interpolation) for smooth animation
        const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

        currentOffsetRef.current = lerp(currentOffsetRef.current, targetOffsetRef.current, 0.1);

        // Apply transform
        bgRef.current.style.transform = `translate3d(0, ${currentOffsetRef.current}px, 0) scale(1.15)`;

        // Continue animation if not close enough to target
        if (Math.abs(targetOffsetRef.current - currentOffsetRef.current) > 0.5) {
            rafIdRef.current = requestAnimationFrame(updateParallax);
        } else {
            rafIdRef.current = null;
        }
    }, []);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.5;
        targetOffsetRef.current = scrollY * parallaxSpeed;

        // Start RAF loop if not already running
        if (rafIdRef.current === null) {
            rafIdRef.current = requestAnimationFrame(updateParallax);
        }
    }, [updateParallax]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [handleScroll]);

    // Framer Motion values for content animations
    const { scrollY } = useScroll();
    const contentY = useTransform(scrollY, [0, 600], [0, -80]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

    useEffect(() => {
        // Count up animation for stats
        if (config.stats) {
            const duration = 2000;
            const steps = 50;
            const interval = duration / steps;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                const progress = step / steps;
                const newValues: Record<string, number> = {};

                config.stats?.forEach(stat => {
                    if (stat.animateValue) {
                        newValues[stat.label] = Math.floor(stat.animateValue * progress);
                    }
                });

                setCountUp(newValues);
                if (step >= steps) clearInterval(timer);
            }, interval);

            return () => clearInterval(timer);
        }
    }, [config.stats]);

    const handleContentUpdate = (path: string, value: string) => {
        if (homeConfig) {
            homeConfig.updateSectionContent(config.id, path, value);
        }
    };

    const BadgeIcon = getIcon(config.content.badge.icon);

    // Theme colors based on mode
    const themeColors = mode === 'medical'
        ? {
            accent: 'emerald',
            gradient: 'from-emerald-300 via-teal-300 to-cyan-300',
            buttonGradient: 'from-emerald-500 to-teal-500',
            buttonShadow: 'shadow-emerald-500/30',
            accentText: 'text-emerald-400',
            accentBg: 'text-emerald-200',
            glowClass: 'glow-pulse-emerald',
        }
        : {
            accent: 'amber',
            gradient: 'from-amber-300 via-orange-300 to-yellow-300',
            buttonGradient: 'from-amber-500 to-orange-500',
            buttonShadow: 'shadow-amber-500/30',
            accentText: 'text-amber-400',
            accentBg: 'text-amber-200',
            glowClass: 'glow-pulse-amber',
        };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const statVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.8 + i * 0.1,
                duration: 0.5,
                ease: 'easeOut',
            },
        }),
    };

    return (
        <section ref={sectionRef} className="relative h-screen min-h-[800px] flex items-center overflow-hidden pb-32">
            {/* Background with Parallax - using native scroll listener for smooth effect */}
            <div
                ref={bgRef}
                className="absolute inset-0 will-change-transform"
                style={{
                    transform: 'translate3d(0, 0, 0) scale(1.15)',
                    transformOrigin: 'center top'
                }}
            >
                <Image
                    src={config.content.backgroundImage}
                    alt={mode === 'medical' ? 'Medical Tourism' : 'Wellness in Pondicherry'}
                    fill
                    className="object-cover brightness-90"
                    priority
                    quality={100}
                    sizes="100vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${config.content.gradientColors} opacity-80`} />

                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
            </div>

            {/* Floating Particles */}
            <FloatingParticles mode={mode} />

            {/* Gradient Orbs */}
            <GradientOrbs mode={mode} />

            {/* Animated Elements for Medical Mode */}
            {mode === 'medical' && (
                <div className="absolute right-[5%] lg:right-[10%] top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <motion.div
                        className="relative"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute w-64 h-64 border-2 border-emerald-400/20 rounded-full`}
                                style={{ transform: 'translate(-50%, -50%)' }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 0.1, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </motion.div>
                    <motion.div
                        className={`w-32 h-32 bg-emerald-500/20 backdrop-blur-md rounded-full flex items-center justify-center ${themeColors.glowClass}`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        {BadgeIcon && <BadgeIcon className="w-16 h-16 text-emerald-400" />}
                    </motion.div>
                </div>
            )}

            {/* Main Content */}
            <motion.div
                className="relative container mx-auto px-4"
                style={{ y: contentY, opacity }}
            >
                <motion.div
                    className="max-w-3xl pr-4 md:pr-0"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-3 glass-premium px-5 py-3 rounded-full mb-8"
                    >
                        <Sparkles className={`w-5 h-5 ${themeColors.accentText}`} />
                        <EditableText
                            value={config.content.badge.text}
                            onSave={(v) => handleContentUpdate('content.badge.text', v)}
                            isEditing={isEditing}
                            className="text-white text-sm font-medium"
                        />
                        {config.content.badge.rating && (
                            <>
                                <div className="w-px h-4 bg-white/30" />
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-white text-sm">{config.content.badge.rating}</span>
                                </div>
                            </>
                        )}
                    </motion.div>

                    {/* Title with Animated Gradient */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight"
                    >
                        <EditableText
                            value={config.content.title.line1}
                            onSave={(v) => handleContentUpdate('content.title.line1', v)}
                            isEditing={isEditing}
                            className="block"
                            as="span"
                        />
                        <motion.span
                            className={`block text-transparent bg-clip-text bg-gradient-to-r ${themeColors.gradient} bg-[length:200%_auto]`}
                            animate={{ backgroundPosition: ['0% center', '200% center'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        >
                            <EditableText
                                value={config.content.title.line2}
                                onSave={(v) => handleContentUpdate('content.title.line2', v)}
                                isEditing={isEditing}
                                as="span"
                            />
                        </motion.span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.div variants={itemVariants}>
                        <EditableText
                            value={config.content.subtitle}
                            onSave={(v) => handleContentUpdate('content.subtitle', v)}
                            isEditing={isEditing}
                            className={`text-lg md:text-xl ${themeColors.accentBg} leading-relaxed mb-8 max-w-2xl`}
                            as="p"
                            multiline
                        />
                    </motion.div>

                    {/* Search Bar with Glow */}
                    <motion.div
                        variants={itemVariants}
                        className="relative"
                    >
                        <div className={`absolute -inset-1 bg-gradient-to-r ${themeColors.buttonGradient} rounded-2xl blur-lg opacity-30`} />
                        <div className="relative">
                            <SearchBar mode={mode} />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Stats Bar with Glassmorphism */}
            {config.stats && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0 glass-dark z-20 border-t border-white/10"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {config.stats.map((stat, i) => {
                                const StatIcon = getIcon(stat.icon);
                                const displayValue = stat.animateValue
                                    ? `${(countUp[stat.label] || 0).toLocaleString()}${stat.value.includes('+') ? '+' : ''}${stat.value.includes('%') ? '%' : ''}`
                                    : stat.value;

                                return (
                                    <motion.div
                                        key={i}
                                        className="text-center text-white group"
                                        custom={i}
                                        variants={statVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {StatIcon && (
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <StatIcon className={`w-6 h-6 mx-auto mb-2 ${themeColors.accentText} group-hover:scale-110 transition-transform`} />
                                            </motion.div>
                                        )}
                                        <motion.div
                                            className="text-3xl font-bold"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            {displayValue}
                                        </motion.div>
                                        <div className={`text-sm ${themeColors.accentBg}`}>{stat.label}</div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </section>
    );
}
