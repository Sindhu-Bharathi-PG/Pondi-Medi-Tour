"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Waves, Sparkles, Heart, Leaf } from 'lucide-react';

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
      const [phase, setPhase] = useState<'hidden' | 'waves-entering' | 'waves-peak' | 'waves-exiting'>('hidden');

      // Generate random foam particles once
      const foamParticles = useMemo(() =>
            [...Array(30)].map((_, i) => ({
                  id: i,
                  left: `${Math.random() * 100}%`,
                  delay: Math.random() * 0.5,
                  size: 4 + Math.random() * 8,
                  duration: 1 + Math.random() * 1.5,
            })), []
      );

      useEffect(() => {
            if (isActive && phase === 'hidden') {
                  // Wave animation sequence
                  setPhase('waves-entering');

                  // Waves reach peak
                  setTimeout(() => setPhase('waves-peak'), 600);

                  // Waves recede
                  setTimeout(() => setPhase('waves-exiting'), 1400);

                  // Complete transition
                  setTimeout(() => {
                        setPhase('hidden');
                        onComplete();
                  }, 2200);
            }
      }, [isActive, phase, onComplete]);

      useEffect(() => {
            if (!isActive && phase !== 'hidden') {
                  setPhase('hidden');
            }
      }, [isActive, phase]);

      if (phase === 'hidden') return null;

      const isWellness = targetMode === 'wellness';

      // Theme colors
      const colors = isWellness
            ? {
                  sky: 'from-orange-400 via-amber-500 to-yellow-400',
                  wave1: '#f59e0b', // amber-500
                  wave2: '#d97706', // amber-600
                  wave3: '#b45309', // amber-700
                  wave4: '#92400e', // amber-800
                  foam: 'rgba(255, 237, 213, 0.8)', // orange-100
                  accent: 'text-amber-200',
                  iconBg: 'from-amber-400 to-orange-500',
            }
            : {
                  sky: 'from-teal-400 via-cyan-500 to-blue-500',
                  wave1: '#14b8a6', // teal-500
                  wave2: '#0d9488', // teal-600
                  wave3: '#0f766e', // teal-700
                  wave4: '#115e59', // teal-800
                  foam: 'rgba(204, 251, 241, 0.8)', // teal-100
                  accent: 'text-teal-200',
                  iconBg: 'from-emerald-400 to-teal-500',
            };

      // Animation states
      const isEntering = phase === 'waves-entering';
      const isPeak = phase === 'waves-peak';
      const isExiting = phase === 'waves-exiting';

      return (
            <div className="fixed inset-0 z-[9999] overflow-hidden">
                  {/* Sky/Background gradient */}
                  <div
                        className={`absolute inset-0 bg-gradient-to-b ${colors.sky} transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'
                              }`}
                  />

                  {/* Animated sun/glow behind waves */}
                  <div
                        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl transition-all duration-700 ${isWellness ? 'bg-yellow-300/60' : 'bg-cyan-300/40'
                              } ${isPeak || isExiting ? 'scale-150 opacity-30' : 'scale-100 opacity-60'}`}
                  />

                  {/* Wave Layer 4 (Back - darkest) */}
                  <svg
                        className={`absolute bottom-0 w-full transition-transform duration-700 ease-out ${isEntering ? 'translate-y-full' :
                                    isExiting ? 'translate-y-full' : 'translate-y-0'
                              }`}
                        style={{ transitionDelay: isEntering ? '0ms' : '300ms', height: '70vh' }}
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                  >
                        <path
                              fill={colors.wave4}
                              d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,181.3C672,171,768,181,864,186.7C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                              className="wave-animate-slow"
                        />
                  </svg>

                  {/* Wave Layer 3 */}
                  <svg
                        className={`absolute bottom-0 w-full transition-transform duration-600 ease-out ${isEntering ? 'translate-y-full' :
                                    isExiting ? 'translate-y-full' : 'translate-y-0'
                              }`}
                        style={{ transitionDelay: isEntering ? '100ms' : '200ms', height: '60vh' }}
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                  >
                        <path
                              fill={colors.wave3}
                              d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,218.7C840,235,960,245,1080,234.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                              className="wave-animate-medium"
                        />
                  </svg>

                  {/* Wave Layer 2 */}
                  <svg
                        className={`absolute bottom-0 w-full transition-transform duration-500 ease-out ${isEntering ? 'translate-y-full' :
                                    isExiting ? 'translate-y-full' : 'translate-y-0'
                              }`}
                        style={{ transitionDelay: isEntering ? '200ms' : '100ms', height: '50vh' }}
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                  >
                        <path
                              fill={colors.wave2}
                              d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,224C672,224,768,256,864,261.3C960,267,1056,245,1152,234.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                              className="wave-animate-fast"
                        />
                  </svg>

                  {/* Wave Layer 1 (Front - lightest with foam) */}
                  <svg
                        className={`absolute bottom-0 w-full transition-transform duration-500 ease-out ${isEntering ? 'translate-y-full' :
                                    isExiting ? 'translate-y-full' : 'translate-y-0'
                              }`}
                        style={{ transitionDelay: isEntering ? '300ms' : '0ms', height: '40vh' }}
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                  >
                        <path
                              fill={colors.wave1}
                              d="M0,288L40,277.3C80,267,160,245,240,250.7C320,256,400,288,480,288C560,288,640,256,720,245.3C800,235,880,245,960,261.3C1040,277,1120,299,1200,293.3C1280,288,1360,256,1400,240L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                        />
                        {/* Foam effect on top of wave */}
                        <path
                              fill={colors.foam}
                              d="M0,288L40,277.3C80,267,160,245,240,250.7C320,256,400,288,480,288C560,288,640,256,720,245.3C800,235,880,245,960,261.3C1040,277,1120,299,1200,293.3C1280,288,1360,256,1400,240L1440,224L1440,234L1400,250C1360,266,1280,298,1200,303.3C1120,309,1040,287,960,271.3C880,255,800,245,720,255.3C640,266,560,298,480,298C400,298,320,266,240,260.7C160,255,80,277,40,287.3L0,298Z"
                              className="animate-pulse"
                              style={{ opacity: 0.6 }}
                        />
                  </svg>

                  {/* Foam particles/bubbles */}
                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isPeak ? 'opacity-100' : 'opacity-0'
                        }`}>
                        {foamParticles.map((particle) => (
                              <div
                                    key={particle.id}
                                    className="absolute rounded-full animate-bounce"
                                    style={{
                                          left: particle.left,
                                          bottom: `${30 + Math.random() * 20}%`,
                                          width: `${particle.size}px`,
                                          height: `${particle.size}px`,
                                          background: colors.foam,
                                          animationDelay: `${particle.delay}s`,
                                          animationDuration: `${particle.duration}s`,
                                          opacity: 0.7,
                                    }}
                              />
                        ))}
                  </div>

                  {/* Sparkle effects */}
                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isPeak ? 'opacity-100' : 'opacity-0'
                        }`}>
                        {[...Array(8)].map((_, i) => (
                              <Sparkles
                                    key={i}
                                    className={`absolute ${colors.accent} animate-ping`}
                                    style={{
                                          left: `${10 + Math.random() * 80}%`,
                                          top: `${20 + Math.random() * 40}%`,
                                          animationDelay: `${i * 0.15}s`,
                                          opacity: 0.6,
                                    }}
                                    size={16 + Math.random() * 16}
                              />
                        ))}
                  </div>

                  {/* Center Content */}
                  <div
                        className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-500 ${isPeak ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                              }`}
                  >
                        {/* Animated Icon */}
                        <div className={`relative mb-6 p-6 rounded-full bg-gradient-to-br ${colors.iconBg} shadow-2xl`}>
                              <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-white" />
                              {isWellness ? (
                                    <Leaf className="w-12 h-12 text-white relative z-10" />
                              ) : (
                                    <Heart className="w-12 h-12 text-white relative z-10 animate-pulse" />
                              )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg mb-3">
                              {isWellness ? 'Wellness Mode' : 'Medical Mode'}
                        </h1>

                        {/* Subtitle */}
                        <p className={`text-lg md:text-xl ${colors.accent} text-center max-w-md`}>
                              {isWellness
                                    ? '🌊 Ride the waves of serenity'
                                    : '🏥 Dive into world-class healthcare'
                              }
                        </p>

                        {/* Wave icon animation */}
                        <div className="mt-6 flex items-center gap-2">
                              <Waves className={`w-6 h-6 ${colors.accent} animate-bounce`} style={{ animationDelay: '0s' }} />
                              <Waves className={`w-8 h-8 ${colors.accent} animate-bounce`} style={{ animationDelay: '0.1s' }} />
                              <Waves className={`w-6 h-6 ${colors.accent} animate-bounce`} style={{ animationDelay: '0.2s' }} />
                        </div>
                  </div>

                  {/* Bottom gradient fade for smooth transition */}
                  <div
                        className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${isWellness ? 'from-amber-800' : 'from-teal-800'
                              } to-transparent transition-opacity duration-300 ${isExiting ? 'opacity-100' : 'opacity-0'
                              }`}
                  />
            </div>
      );
};

export default SeaWaveTransition;
