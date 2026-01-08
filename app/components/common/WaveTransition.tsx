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
            backgroundImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600',
            badge: '🏥 World-Class Healthcare',
            title: 'Expert Medical Care',
            titleAccent: 'At Your Fingertips',
            accentGradient: 'from-emerald-300 to-teal-200',
            description: 'Access top-tier hospitals, renowned specialists, and advanced treatments in the healing haven of Pondicherry.',
            wave1: 'rgb(16, 185, 129)',   // emerald-500
            wave2: 'rgb(20, 184, 166)',   // teal-500
            wave3: 'rgb(6, 182, 212)',    // cyan-500
            outline1: 'rgba(167, 243, 208, 0.8)',  // emerald-200
            outline2: 'rgba(153, 246, 228, 0.7)',  // teal-200
            outline3: 'rgba(165, 243, 252, 0.6)',  // cyan-200
            foam: 'rgba(255, 255, 255, 0.5)',
        }
        : {
            background: 'from-amber-800 via-orange-700 to-rose-700',
            backgroundImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600',
            badge: '🌿 Holistic Healing Destination',
            title: 'Heal Your Body',
            titleAccent: 'Nurture Your Soul',
            accentGradient: 'from-yellow-300 to-amber-200',
            description: 'Experience the perfect blend of world-class recovery care and ancient healing traditions in the serene coastal paradise of Pondicherry.',
            wave1: 'rgb(225, 29, 72)',    // rose-600
            wave2: 'rgb(249, 115, 22)',   // orange-500
            wave3: 'rgb(251, 191, 36)',   // amber-400
            outline1: 'rgba(254, 205, 211, 0.8)',  // rose-200
            outline2: 'rgba(254, 215, 170, 0.7)',  // orange-200
            outline3: 'rgba(253, 230, 138, 0.6)',  // amber-200
            foam: 'rgba(255, 255, 255, 0.5)',
        };

    useEffect(() => {
        if (isActive) {
            const cascadeTimer = setTimeout(() => {
                setAnimationPhase('covering');
            }, 1200);

            const exitTimer = setTimeout(() => {
                setAnimationPhase('complete');
            }, 2000);

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
            {/* Page background */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${theme.background}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="absolute inset-0 opacity-30">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${theme.backgroundImage}')` }}
                    />
                </div>
            </motion.div>

            {/* Content */}
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

            {/* Wave 3: Background layer with outline */}
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
                {/* Outline wave (slightly ahead) */}
                <div className="absolute inset-0" style={{ transform: 'translateY(-4px)' }}>
                    <Wave
                        fill="transparent"
                        paused={false}
                        style={{
                            display: 'flex',
                            height: '100%',
                            transform: 'rotate(180deg)',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                        }}
                        options={{
                            height: 35,
                            amplitude: 28,
                            speed: 0.2,
                            points: 4
                        }}
                    />
                </div>
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
                {/* Foam highlight */}
                <div
                    className="absolute inset-x-0 bottom-0 h-2"
                    style={{
                        background: `linear-gradient(to right, transparent, ${theme.outline3}, transparent)`,
                        transform: 'translateY(-35px) rotate(180deg)'
                    }}
                />
            </motion.div>

            {/* Wave 2: Mid layer with enhanced outline */}
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
                    style={{
                        display: 'flex',
                        height: '100%',
                        transform: 'rotate(180deg)',
                        filter: 'drop-shadow(0 -3px 0 ' + theme.outline2 + ')'
                    }}
                    options={{
                        height: 42,
                        amplitude: 32,
                        speed: 0.25,
                        points: 5
                    }}
                />
                {/* Glowing outline effect */}
                <div
                    className="absolute inset-x-0 h-3 blur-sm"
                    style={{
                        background: theme.outline2,
                        bottom: 'calc(100% - 42px)',
                        transform: 'rotate(180deg)'
                    }}
                />
            </motion.div>

            {/* Wave 1: Foreground layer with foam and outline */}
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
                    style={{
                        display: 'flex',
                        height: '100%',
                        transform: 'rotate(180deg)',
                        filter: 'drop-shadow(0 -4px 0 ' + theme.outline1 + ') drop-shadow(0 -8px 4px rgba(255,255,255,0.2))'
                    }}
                    options={{
                        height: 50,
                        amplitude: 38,
                        speed: 0.3,
                        points: 6
                    }}
                />
                {/* Bright foam line */}
                <div
                    className="absolute inset-x-0 h-1"
                    style={{
                        background: `linear-gradient(90deg, transparent 0%, ${theme.foam} 20%, white 50%, ${theme.foam} 80%, transparent 100%)`,
                        bottom: 'calc(100% - 52px)',
                        transform: 'rotate(180deg)',
                        boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                    }}
                />
                {/* Secondary foam dots */}
                <div
                    className="absolute inset-x-0 h-0.5"
                    style={{
                        background: `repeating-linear-gradient(90deg, transparent, transparent 20px, ${theme.foam} 20px, ${theme.foam} 25px)`,
                        bottom: 'calc(100% - 58px)',
                        transform: 'rotate(180deg)',
                        opacity: 0.6
                    }}
                />
            </motion.div>

            {/* Floating foam particles */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: animationPhase === 'covering' ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/40"
                        initial={{
                            x: Math.random() * 100 + '%',
                            y: '120%',
                            scale: 0.5 + Math.random() * 0.5
                        }}
                        animate={{
                            y: 20 + Math.random() * 60 + '%',
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 1.5 + Math.random(),
                            delay: i * 0.1,
                            ease: 'easeOut'
                        }}
                        style={{
                            width: 4 + Math.random() * 8 + 'px',
                            height: 4 + Math.random() * 8 + 'px',
                            boxShadow: '0 0 6px rgba(255,255,255,0.4)',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default WaveTransition;
