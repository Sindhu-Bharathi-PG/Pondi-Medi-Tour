"use client";

import EditableText from '@/app/components/admin/EditableText';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { CTASectionConfig } from '@/app/types/homeConfig.types';
import { getIcon } from '@/app/utils/iconMap';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useRef } from 'react';

interface DynamicCTAProps {
    config: CTASectionConfig;
    mode: 'medical' | 'wellness';
}

// Floating shapes component
const FloatingShapes = ({ mode }: { mode: 'medical' | 'wellness' }) => {
    const shapes = useMemo(() => [
        { size: 80, left: 10, top: 20, delay: 0, duration: 15 },
        { size: 120, left: 80, top: 60, delay: 2, duration: 18 },
        { size: 60, left: 25, top: 70, delay: 4, duration: 12 },
        { size: 100, left: 70, top: 15, delay: 1, duration: 20 },
        { size: 50, left: 50, top: 80, delay: 3, duration: 14 },
    ], []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${mode === 'medical' ? 'bg-emerald-400/10' : 'bg-amber-400/10'} blur-xl`}
                    style={{
                        width: shape.size,
                        height: shape.size,
                        left: `${shape.left}%`,
                        top: `${shape.top}%`,
                    }}
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -30, 20, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: shape.duration,
                        delay: shape.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

export default function DynamicCTA({ config, mode }: DynamicCTAProps) {
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
            buttonGradient: 'from-emerald-500 to-teal-500',
            buttonShadow: 'shadow-emerald-500/30',
            glowColor: 'rgba(16, 185, 129, 0.5)',
            ringColor: 'ring-emerald-400/50',
        }
        : {
            buttonGradient: 'from-amber-500 to-orange-500',
            buttonShadow: 'shadow-amber-500/30',
            glowColor: 'rgba(245, 158, 11, 0.5)',
            ringColor: 'ring-amber-400/50',
        };

    // Memoize icon component
    const ButtonIcon = useMemo(() => {
        return config.content.buttonIcon ? getIcon(config.content.buttonIcon) : null;
    }, [config.content.buttonIcon]);

    return (
        <section
            ref={sectionRef}
            className={`py-24 relative overflow-hidden`}
        >
            {/* Animated gradient background */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${config.content.gradientColors} gradient-bg-animated`}
                style={{ backgroundSize: '200% 200%' }}
            />

            {/* Floating shapes */}
            <FloatingShapes mode={mode} />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

            <div className="container mx-auto px-4 text-center relative z-10">
                {/* Badge */}
                <motion.div
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-white/90 text-sm font-medium">Get Started Today</span>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <EditableText
                        value={config.content.title}
                        onSave={(v) => handleContentUpdate('content.title', v)}
                        isEditing={isEditing}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
                        as="h2"
                    />
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <EditableText
                        value={config.content.subtitle}
                        onSave={(v) => handleContentUpdate('content.subtitle', v)}
                        isEditing={isEditing}
                        className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
                        as="p"
                    />
                </motion.div>

                {/* Button with glow effect */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative inline-block"
                >
                    {/* Pulsing glow behind button */}
                    <motion.div
                        className={`absolute -inset-4 bg-gradient-to-r ${themeColors.buttonGradient} rounded-full blur-xl opacity-50`}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <Link
                        href={config.content.buttonLink}
                        className={`relative inline-flex items-center gap-3 bg-gradient-to-r ${themeColors.buttonGradient} text-white px-10 py-5 rounded-full font-semibold text-xl shadow-2xl ${themeColors.buttonShadow} transition-all duration-300 hover:scale-105 ring-2 ${themeColors.ringColor} ring-offset-2 ring-offset-transparent`}
                    >
                        <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            {config.content.buttonText}
                        </motion.span>
                        {ButtonIcon && (
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ButtonIcon className="w-6 h-6" />
                            </motion.div>
                        )}
                    </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    className="mt-12 flex flex-wrap justify-center gap-6 text-white/60 text-sm"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>No Hidden Fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Free Consultation</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
