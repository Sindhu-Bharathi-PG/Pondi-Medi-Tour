"use client";

import { HowItWorksSectionConfig } from '@/app/types/homeConfig.types';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRef } from 'react';

interface DynamicHowItWorksProps {
    config: HowItWorksSectionConfig;
    mode: 'medical' | 'wellness';
}

export default function DynamicHowItWorks({ config, mode }: DynamicHowItWorksProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Theme colors based on mode
    const themeColors = mode === 'medical'
        ? {
            stepBg: 'from-emerald-500 to-teal-500',
            stepShadow: 'shadow-emerald-500/30',
            lineBg: 'bg-gradient-to-r from-emerald-300 to-teal-300',
            accentText: 'text-emerald-600',
            checkColor: 'text-emerald-500',
        }
        : {
            stepBg: 'from-amber-500 to-orange-500',
            stepShadow: 'shadow-amber-500/30',
            lineBg: 'bg-gradient-to-r from-amber-300 to-orange-300',
            accentText: 'text-amber-600',
            checkColor: 'text-amber-500',
        };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const stepVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.15,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const lineVariants = {
        hidden: { scaleX: 0, originX: 0 },
        visible: (i: number) => ({
            scaleX: 1,
            transition: {
                delay: 0.3 + i * 0.15,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };

    return (
        <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial ${mode === 'medical' ? 'from-emerald-50' : 'from-amber-50'} to-transparent rounded-full opacity-50`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className={`inline-flex items-center gap-2 ${mode === 'medical' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'} px-4 py-2 rounded-full mb-6`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-semibold">Simple Process</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{config.content.title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{config.content.subtitle}</p>
                </motion.div>

                {/* Steps */}
                <motion.div
                    className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto relative"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {config.steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            className="text-center relative group"
                            custom={i}
                            variants={stepVariants}
                        >
                            {/* Step Number */}
                            <motion.div
                                className={`w-20 h-20 bg-gradient-to-br ${themeColors.stepBg} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-xl ${themeColors.stepShadow} relative overflow-hidden`}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                            >
                                <span className="relative z-10">{step.step}</span>
                                {/* Shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-white/30"
                                    initial={{ x: '-100%', rotate: -45 }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6 }}
                                />
                            </motion.div>

                            {/* Content */}
                            <motion.h3
                                className="text-xl font-bold text-gray-800 mb-3"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.3 + i * 0.1 }}
                            >
                                {step.title}
                            </motion.h3>
                            <motion.p
                                className="text-gray-600"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.4 + i * 0.1 }}
                            >
                                {step.description}
                            </motion.p>

                            {/* Connecting line (animated) */}
                            {i < config.steps.length - 1 && (
                                <motion.div
                                    className={`hidden md:block absolute top-10 left-[60%] h-0.5 ${themeColors.lineBg}`}
                                    style={{ width: 'calc(100% - 5rem)' }}
                                    custom={i}
                                    variants={lineVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                >
                                    {/* Animated arrow on line */}
                                    <motion.div
                                        className="absolute right-0 top-1/2 -translate-y-1/2"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className={`w-4 h-4 ${themeColors.accentText}`} />
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Mobile connecting indicator */}
                            {i < config.steps.length - 1 && (
                                <motion.div
                                    className="md:hidden flex justify-center py-4"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <motion.div
                                        animate={{ y: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className={`w-6 h-6 ${themeColors.accentText} rotate-90`} />
                                    </motion.div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
