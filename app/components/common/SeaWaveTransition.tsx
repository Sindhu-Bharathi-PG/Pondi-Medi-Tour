"use client";

import { Heart, Leaf } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface SeaWaveTransitionProps {
      isActive: boolean;
      targetMode: 'medical' | 'wellness';
      onComplete: () => void;
}

const SeaWaveTransition: React.FC<SeaWaveTransitionProps> = ({
      isActive,
      targetMode,
      onComplete
}) => {
      const [phase, setPhase] = useState<'hidden' | 'rising' | 'peak' | 'receding'>('hidden');
      const onCompleteRef = useRef(onComplete);

      useEffect(() => {
            onCompleteRef.current = onComplete;
      }, [onComplete]);

      useEffect(() => {
            if (!isActive) {
                  setPhase('hidden');
                  return;
            }

            setPhase('rising');
            const peakTimer = setTimeout(() => setPhase('peak'), 400);
            const recedeTimer = setTimeout(() => setPhase('receding'), 800);
            const completeTimer = setTimeout(() => {
                  setPhase('hidden');
                  onCompleteRef.current();
            }, 1200);

            return () => {
                  clearTimeout(peakTimer);
                  clearTimeout(recedeTimer);
                  clearTimeout(completeTimer);
            };
      }, [isActive]);

      if (phase === 'hidden') return null;

      const isWellness = targetMode === 'wellness';

      // Rich color themes with gradients
      const colors = isWellness
            ? {
                  wave1: '#f59e0b', wave2: '#d97706', wave3: '#b45309', wave4: '#92400e',
                  outline1: '#fcd34d', outline2: '#fbbf24', outline3: '#f59e0b', outline4: '#d97706',
                  glow: '#fef3c7', foam: '#fffbeb', accent: 'from-amber-400 to-orange-500'
            }
            : {
                  wave1: '#14b8a6', wave2: '#0d9488', wave3: '#0f766e', wave4: '#115e59',
                  outline1: '#5eead4', outline2: '#2dd4bf', outline3: '#14b8a6', outline4: '#0d9488',
                  glow: '#ccfbf1', foam: '#f0fdfa', accent: 'from-teal-400 to-emerald-500'
            };

      const isRising = phase === 'rising';
      const isPeak = phase === 'peak';
      const isReceding = phase === 'receding';

      // Wave paths with realistic curves
      const wave1Path = "M0,100 C120,60 240,140 360,100 C480,60 600,140 720,100 C840,60 960,140 1080,100 C1200,60 1320,140 1440,100 L1440,400 L0,400 Z";
      const wave2Path = "M0,120 C100,80 200,160 300,120 C400,80 500,160 600,120 C700,80 800,160 900,120 C1000,80 1100,160 1200,120 C1300,80 1400,160 1440,140 L1440,400 L0,400 Z";
      const wave3Path = "M0,140 C80,100 160,180 240,140 C320,100 400,180 480,140 C560,100 640,180 720,140 C800,100 880,180 960,140 C1040,100 1120,180 1200,140 C1280,100 1360,180 1440,150 L1440,400 L0,400 Z";
      const wave4Path = "M0,160 C60,130 120,190 180,160 C240,130 300,190 360,160 C420,130 480,190 540,160 C600,130 660,190 720,160 C780,130 840,190 900,160 C960,130 1020,190 1080,160 C1140,130 1200,190 1260,160 C1320,130 1380,190 1440,170 L1440,400 L0,400 Z";

      // Outline paths (just the top edge)
      const outline1Path = "M0,100 C120,60 240,140 360,100 C480,60 600,140 720,100 C840,60 960,140 1080,100 C1200,60 1320,140 1440,100";
      const outline2Path = "M0,120 C100,80 200,160 300,120 C400,80 500,160 600,120 C700,80 800,160 900,120 C1000,80 1100,160 1200,120 C1300,80 1400,160 1440,140";
      const outline3Path = "M0,140 C80,100 160,180 240,140 C320,100 400,180 480,140 C560,100 640,180 720,140 C800,100 880,180 960,140 C1040,100 1120,180 1200,140 C1280,100 1360,180 1440,150";
      const outline4Path = "M0,160 C60,130 120,190 180,160 C240,130 300,190 360,160 C420,130 480,190 540,160 C600,130 660,190 720,160 C780,130 840,190 900,160 C960,130 1020,190 1080,160 C1140,130 1200,190 1260,160 C1320,130 1380,190 1440,170";

      const getTransform = (delay: number) => {
            const base = isRising ? 100 : isPeak ? 0 : -100;
            return `translateY(${base}%)`;
      };

      return (
            <div className="fixed inset-0 z-[9999] overflow-hidden">
                  {/* Background overlay */}
                  <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                              background: `linear-gradient(to bottom, ${colors.wave4}ee 0%, ${colors.wave3}dd 100%)`,
                              opacity: isPeak || isReceding ? 1 : 0.8,
                        }}
                  />

                  {/* Wave Layer 4 - Back (slowest) */}
                  <svg
                        className="absolute bottom-0 w-full"
                        style={{
                              height: '70vh',
                              transform: getTransform(0),
                              transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)',
                        }}
                        viewBox="0 0 1440 400"
                        preserveAspectRatio="none"
                  >
                        <path fill={colors.wave4} d={wave4Path} />
                        <path
                              d={outline4Path}
                              fill="none"
                              stroke={colors.outline4}
                              strokeWidth="3"
                              strokeLinecap="round"
                              opacity="0.8"
                        />
                        {/* Foam highlight */}
                        <path
                              d={outline4Path}
                              fill="none"
                              stroke={colors.foam}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              opacity="0.4"
                              strokeDasharray="20,30"
                        />
                  </svg>

                  {/* Wave Layer 3 */}
                  <svg
                        className="absolute bottom-0 w-full"
                        style={{
                              height: '60vh',
                              transform: getTransform(50),
                              transition: 'transform 0.45s cubic-bezier(0.33, 1, 0.68, 1)',
                              transitionDelay: '0.05s',
                        }}
                        viewBox="0 0 1440 400"
                        preserveAspectRatio="none"
                  >
                        <path fill={colors.wave3} d={wave3Path} />
                        <path
                              d={outline3Path}
                              fill="none"
                              stroke={colors.outline3}
                              strokeWidth="3"
                              strokeLinecap="round"
                              opacity="0.9"
                        />
                        <path
                              d={outline3Path}
                              fill="none"
                              stroke={colors.foam}
                              strokeWidth="2"
                              strokeLinecap="round"
                              opacity="0.5"
                              strokeDasharray="15,25"
                        />
                  </svg>

                  {/* Wave Layer 2 */}
                  <svg
                        className="absolute bottom-0 w-full"
                        style={{
                              height: '50vh',
                              transform: getTransform(100),
                              transition: 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
                              transitionDelay: '0.1s',
                        }}
                        viewBox="0 0 1440 400"
                        preserveAspectRatio="none"
                  >
                        <path fill={colors.wave2} d={wave2Path} />
                        <path
                              d={outline2Path}
                              fill="none"
                              stroke={colors.outline2}
                              strokeWidth="4"
                              strokeLinecap="round"
                        />
                        <path
                              d={outline2Path}
                              fill="none"
                              stroke={colors.foam}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              opacity="0.6"
                              strokeDasharray="10,20"
                        />
                  </svg>

                  {/* Wave Layer 1 - Front (fastest) */}
                  <svg
                        className="absolute bottom-0 w-full"
                        style={{
                              height: '40vh',
                              transform: getTransform(150),
                              transition: 'transform 0.35s cubic-bezier(0.33, 1, 0.68, 1)',
                              transitionDelay: '0.15s',
                        }}
                        viewBox="0 0 1440 400"
                        preserveAspectRatio="none"
                  >
                        {/* Glow effect behind the wave */}
                        <defs>
                              <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                          <feMergeNode in="coloredBlur" />
                                          <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                              </filter>
                        </defs>
                        <path fill={colors.wave1} d={wave1Path} />
                        {/* Main outline with glow */}
                        <path
                              d={outline1Path}
                              fill="none"
                              stroke={colors.outline1}
                              strokeWidth="5"
                              strokeLinecap="round"
                              filter="url(#glow)"
                        />
                        {/* White foam on top */}
                        <path
                              d={outline1Path}
                              fill="none"
                              stroke={colors.foam}
                              strokeWidth="3"
                              strokeLinecap="round"
                              opacity="0.7"
                        />
                        {/* Foam dots */}
                        <path
                              d={outline1Path}
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              opacity="0.5"
                              strokeDasharray="5,15"
                        />
                  </svg>

                  {/* Floating foam bubbles */}
                  <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ opacity: isPeak ? 1 : 0, transition: 'opacity 0.3s' }}
                  >
                        {[...Array(12)].map((_, i) => (
                              <div
                                    key={i}
                                    className="absolute rounded-full animate-bounce"
                                    style={{
                                          width: 4 + Math.random() * 8 + 'px',
                                          height: 4 + Math.random() * 8 + 'px',
                                          backgroundColor: colors.foam,
                                          border: `1px solid ${colors.outline1}`,
                                          left: 5 + i * 8 + '%',
                                          top: 30 + Math.random() * 30 + '%',
                                          opacity: 0.6 + Math.random() * 0.4,
                                          animationDelay: `${i * 0.1}s`,
                                          animationDuration: '1s',
                                    }}
                              />
                        ))}
                  </div>

                  {/* Center content */}
                  <div
                        className="absolute inset-0 flex flex-col items-center justify-center z-20"
                        style={{
                              opacity: isPeak ? 1 : 0,
                              transform: isPeak ? 'scale(1)' : 'scale(0.9)',
                              transition: 'all 0.3s ease-out',
                        }}
                  >
                        <div
                              className={`mb-4 p-5 rounded-full bg-gradient-to-br ${colors.accent} shadow-2xl`}
                              style={{
                                    boxShadow: `0 0 40px ${colors.glow}, 0 0 80px ${colors.wave1}44`,
                              }}
                        >
                              {isWellness ? (
                                    <Leaf className="w-10 h-10 text-white drop-shadow-lg" />
                              ) : (
                                    <Heart className="w-10 h-10 text-white drop-shadow-lg" />
                              )}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                              {isWellness ? 'Wellness Mode' : 'Medical Mode'}
                        </h2>
                        <p className="text-white/80 mt-2 text-lg">
                              {isWellness ? '🌿 Embrace holistic healing' : '🏥 World-class healthcare'}
                        </p>
                  </div>
            </div>
      );
};

export default SeaWaveTransition;
