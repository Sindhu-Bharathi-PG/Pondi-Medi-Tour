"use client";

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Wave from 'react-wavify';

interface WaveTransitionProps {
    isActive: boolean;
    targetMode: 'medical' | 'wellness';
    onComplete: () => void;
}

const WaveTransition: React.FC<WaveTransitionProps> = ({ isActive, targetMode, onComplete }) => {
    const [animationPhase, setAnimationPhase] = useState<'rising' | 'covering' | 'complete'>('rising');

    const isMedical = targetMode === 'medical';

    // Theme configuration based on target mode
    const theme = isMedical
        ? {
            background: 'from-emerald-800 via-teal-700 to-cyan-700',
            backgroundImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600', // Hospital/medical image
            badge: '🏥 World-Class Healthcare',
            title: 'Expert Medical Care',
            titleAccent: 'At Your Fingertips',
            accentGradient: 'from-emerald-300 to-teal-200',
            description: 'Access top-tier hospitals, renowned specialists, and advanced treatments in the healing haven of Pondicherry.',
            wave1: 'rgb(16, 185, 129)',   // emerald-500
            wave2: 'rgb(20, 184, 166)',   // teal-500
            wave3: 'rgb(6, 182, 212)',    // cyan-500
        }
        : {
            background: 'from-amber-800 via-orange-700 to-rose-700',
            backgroundImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600', // Wellness image
            badge: '🌿 Holistic Healing Destination',
            title: 'Heal Your Body',
            titleAccent: 'Nurture Your Soul',
            accentGradient: 'from-yellow-300 to-amber-200',
            description: 'Experience the perfect blend of world-class recovery care and ancient healing traditions in the serene coastal paradise of Pondicherry.',
            wave1: 'rgb(225, 29, 72)',    // rose-600
            wave2: 'rgb(249, 115, 22)',   // orange-500
            wave3: 'rgb(251, 191, 36)',   // amber-400
        };

    useEffect(() => {
        if (isActive) {
            // Phase 1: Waves cascade down with content (1200ms)
            const cascadeTimer = setTimeout(() => {
                setAnimationPhase('covering');
            }, 1200);

            // Phase 2: Waves exit (1500ms)
            const exitTimer = setTimeout(() => {
                setAnimationPhase('complete');
            }, 2000);

            // Phase 3: Navigate after animation fully completes (2500ms)
            const navigateTimer = setTimeout(() => {
                onComplete();
            }, 2500);

            return () => {
                clearTimeout(cascadeTimer);
                clearTimeout(exitTimer);
                clearTimeout(navigateTimer);
            };
        }
    }, [isActive, onComplete]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Page background - stays visible */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${theme.background}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {/* Background texture */}
                <div className="absolute inset-0 opacity-30">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${theme.backgroundImage}')` }}
                    />
                </div>
            </motion.div>

            {/* Content riding on top of the wave - stays visible */}
            <motion.div
                className="absolute inset-x-0 top-0 flex items-start justify-center pt-32"
                initial={{ y: '-150%' }}
                animate={{ y: '0%' }}
                transition={{
                    duration: 1.2,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
                style={{ zIndex: 60 }}
            >
                <div className="text-center text-white px-4 max-w-4xl">
                    <motion.div
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-6 border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <span className="text-sm font-medium">{theme.badge}</span>
                    </motion.div>
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.7 }}
                    >
                        {theme.title}
                        <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient} mt-2`}>
                            {theme.titleAccent}
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.7 }}
                    >
                        {theme.description}
                    </motion.p>
                </div>
            </motion.div>

            {/* Wave 3: Background layer */}
            <motion.div
                className="absolute inset-x-0 top-0 pointer-events-none"
                initial={{ height: 0 }}
                animate={{
                    height: animationPhase === 'complete' ? 0 : '120vh'
                }}
                transition={{
                    duration: animationPhase === 'complete' ? 0.8 : 1.2,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
                style={{ opacity: 0.6 }}
            >
                <Wave
                    fill={theme.wave3}
                    paused={false}
                    style={{ display: 'flex', height: '100%', transform: 'rotate(180deg)' }}
                    options={{
                        height: 35,
                        amplitude: 28,
                        speed: 0.2,
                        points: 4
                    }}
                />
            </motion.div>

            {/* Wave 2: Mid layer */}
            <motion.div
                className="absolute inset-x-0 top-0 pointer-events-none"
                initial={{ height: 0 }}
                animate={{
                    height: animationPhase === 'complete' ? 0 : '120vh'
                }}
                transition={{
                    duration: animationPhase === 'complete' ? 0.8 : 1.2,
                    delay: animationPhase === 'complete' ? 0 : 0.1,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
                style={{ opacity: 0.75 }}
            >
                <Wave
                    fill={theme.wave2}
                    paused={false}
                    style={{ display: 'flex', height: '100%', transform: 'rotate(180deg)' }}
                    options={{
                        height: 42,
                        amplitude: 32,
                        speed: 0.25,
                        points: 5
                    }}
                />
            </motion.div>

            {/* Wave 1: Foreground layer */}
            <motion.div
                className="absolute inset-x-0 top-0 pointer-events-none"
                initial={{ height: 0 }}
                animate={{
                    height: animationPhase === 'complete' ? 0 : '120vh'
                }}
                transition={{
                    duration: animationPhase === 'complete' ? 0.8 : 1.2,
                    delay: animationPhase === 'complete' ? 0 : 0.2,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
                style={{ opacity: 0.85 }}
            >
                <Wave
                    fill={theme.wave1}
                    paused={false}
                    style={{ display: 'flex', height: '100%', transform: 'rotate(180deg)' }}
                    options={{
                        height: 50,
                        amplitude: 38,
                        speed: 0.3,
                        points: 6
                    }}
                />
            </motion.div>
        </div>
    );
};

export default WaveTransition;
