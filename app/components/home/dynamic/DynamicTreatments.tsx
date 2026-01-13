"use client";

import EditableText from '@/app/components/admin/EditableText';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { TreatmentsSectionConfig } from '@/app/types/homeConfig.types';
import { getIcon } from '@/app/utils/iconMap';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef } from 'react';

interface DynamicTreatmentsProps {
    config: TreatmentsSectionConfig;
    mode: 'medical' | 'wellness';
}

export default function DynamicTreatments({ config, mode }: DynamicTreatmentsProps) {
    const homeConfig = useHomeConfigOptional();
    const isEditing = homeConfig?.isEditing ?? false;
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const handleContentUpdate = (path: string, value: string) => {
        if (homeConfig) {
            homeConfig.updateSectionContent(config.id, path, value);
        }
    };

    // Theme colors based on mode
    const themeColors = mode === 'medical'
        ? {
            badgeBg: 'bg-emerald-100',
            badgeText: 'text-emerald-700',
            linkColor: 'text-emerald-600',
            sectionBg: 'bg-gradient-to-b from-gray-50 via-white to-gray-50',
            glowColor: 'rgba(16, 185, 129, 0.3)',
            accentGradient: 'from-emerald-500 to-teal-500',
        }
        : {
            badgeBg: 'bg-amber-100',
            badgeText: 'text-amber-700',
            linkColor: 'text-amber-600',
            sectionBg: 'bg-gradient-to-b from-amber-50 via-white to-amber-50',
            glowColor: 'rgba(245, 158, 11, 0.3)',
            accentGradient: 'from-amber-500 to-orange-500',
        };

    // Memoize icon component
    const BadgeIcon = useMemo(() => {
        return getIcon(config.content.badge.icon);
    }, [config.content.badge.icon]);

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

    const headerVariants = {
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

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: 0.1 + i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    return (
        <section ref={sectionRef} className={`py-24 ${themeColors.sectionBg} relative overflow-hidden`}>
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${themeColors.accentGradient} rounded-full opacity-10 blur-3xl`}
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                />
                <motion.div
                    className={`absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr ${themeColors.accentGradient} rounded-full opacity-10 blur-3xl`}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.div
                        variants={headerVariants}
                        className={`inline-flex items-center gap-2 ${themeColors.badgeBg} ${themeColors.badgeText} px-4 py-2 rounded-full mb-6`}
                        whileHover={{ scale: 1.05 }}
                    >
                        {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
                        <EditableText
                            value={config.content.badge.text}
                            onSave={(v) => handleContentUpdate('content.badge.text', v)}
                            isEditing={isEditing}
                            className="text-sm font-semibold"
                            as="span"
                        />
                    </motion.div>
                    <motion.div variants={headerVariants}>
                        <EditableText
                            value={config.content.title}
                            onSave={(v) => handleContentUpdate('content.title', v)}
                            isEditing={isEditing}
                            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                            as="h2"
                        />
                    </motion.div>
                    <motion.div variants={headerVariants}>
                        <EditableText
                            value={config.content.subtitle}
                            onSave={(v) => handleContentUpdate('content.subtitle', v)}
                            isEditing={isEditing}
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
                            as="p"
                        />
                    </motion.div>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {config.items.map((item, i) => {
                        const ItemIcon = getIcon(item.icon);

                        // Medical style card
                        if (mode === 'medical') {
                            return (
                                <motion.div
                                    key={item.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    whileHover={{
                                        y: -12,
                                        transition: { duration: 0.3 }
                                    }}
                                    className="group"
                                >
                                    <Link
                                        href={config.content.viewAllLink}
                                        className="block bg-white rounded-2xl shadow-lg p-6 h-full relative overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
                                    >
                                        {/* Glow effect on hover */}
                                        <motion.div
                                            className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                                        />

                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100" />

                                        <div className="relative z-10">
                                            {/* Icon with animated background */}
                                            <motion.div
                                                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 relative overflow-hidden`}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                {ItemIcon && <ItemIcon className="w-7 h-7 text-white relative z-10" />}
                                                <motion.div
                                                    className="absolute inset-0 bg-white/20"
                                                    initial={{ x: '-100%' }}
                                                    whileHover={{ x: '100%' }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            </motion.div>

                                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                                            {item.savings && (
                                                <motion.div
                                                    className="flex items-center gap-2 mb-4"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                    transition={{ delay: 0.3 + i * 0.1 }}
                                                >
                                                    <Sparkles className="w-4 h-4 text-emerald-500" />
                                                    <span className="text-2xl font-bold text-emerald-600">{item.savings}</span>
                                                    <span className="text-gray-500 text-sm">savings</span>
                                                </motion.div>
                                            )}

                                            {item.procedures && (
                                                <div className="flex flex-wrap gap-2">
                                                    {item.procedures.map((p, j) => (
                                                        <motion.span
                                                            key={j}
                                                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-gray-200 transition-colors"
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                                            transition={{ delay: 0.4 + j * 0.05 }}
                                                        >
                                                            {p}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Arrow indicator */}
                                        <motion.div
                                            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                            initial={{ x: -10 }}
                                            whileHover={{ x: 0 }}
                                        >
                                            <ChevronRight className={`w-5 h-5 ${themeColors.linkColor}`} />
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            );
                        }

                        // Wellness style card
                        return (
                            <motion.div
                                key={item.id}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                whileHover={{
                                    y: -12,
                                    transition: { duration: 0.3 }
                                }}
                                className="group"
                            >
                                <Link
                                    href={item.link || config.content.viewAllLink}
                                    className="block bg-white rounded-3xl shadow-xl overflow-hidden h-full"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        {item.image && (
                                            <motion.div
                                                className="absolute inset-0"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </motion.div>
                                        )}
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-80`}
                                            whileHover={{ opacity: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                            {ItemIcon && (
                                                <motion.div
                                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <ItemIcon className="w-12 h-12 mb-4" />
                                                </motion.div>
                                            )}
                                            <h3 className="text-xl font-bold text-center">{item.title}</h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 text-center">{item.description}</p>
                                        <motion.div
                                            className="mt-4 text-center"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                        >
                                            <span className={`inline-flex items-center gap-1 ${themeColors.linkColor} font-semibold`}>
                                                Explore
                                                <motion.span
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </motion.span>
                                            </span>
                                        </motion.div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All Link */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        href={config.content.viewAllLink}
                        className={`inline-flex items-center gap-2 ${themeColors.linkColor} font-semibold text-lg group`}
                    >
                        <span className="underline-slide">{config.content.viewAllText}</span>
                        <motion.span
                            className="inline-block"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
