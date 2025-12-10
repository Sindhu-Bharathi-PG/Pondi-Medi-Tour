"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Leaf, Stethoscope, Heart, Sun, Waves, Sparkles } from 'lucide-react';

interface SmoothTransitionProps {
      isActive: boolean;
      targetMode: 'medical' | 'wellness';
      onComplete: () => void;
}

// Preloaded background images (these load instantly from Unsplash CDN)
const TRANSITION_IMAGES = {
      wellness: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
      medical: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920&q=80',
};

const SmoothTransition: React.FC<SmoothTransitionProps> = ({ isActive, targetMode, onComplete }) => {
      const [phase, setPhase] = useState<'hidden' | 'entering' | 'visible' | 'exiting'>('hidden');

      useEffect(() => {
            if (isActive && phase === 'hidden') {
                  // Fast, smooth transition sequence
                  setPhase('entering');

                  setTimeout(() => setPhase('visible'), 100);
                  setTimeout(() => setPhase('exiting'), 1500);
                  setTimeout(() => {
                        setPhase('hidden');
                        onComplete();
                  }, 2000);
            }
      }, [isActive, phase, onComplete]);

      useEffect(() => {
            if (!isActive && phase !== 'hidden') {
                  setPhase('hidden');
            }
      }, [isActive, phase]);

      if (phase === 'hidden') return null;

      const isWellness = targetMode === 'wellness';

      return (
            <div
                  className={`fixed inset-0 z-[9999] transition-all duration-300 ease-out ${phase === 'entering' ? 'opacity-0 scale-110' :
                              phase === 'exiting' ? 'opacity-0 scale-95' :
                                    'opacity-100 scale-100'
                        }`}
            >
                  {/* Background Image with Ken Burns effect */}
                  <div className="absolute inset-0 overflow-hidden">
                        <Image
                              src={TRANSITION_IMAGES[targetMode]}
                              alt="Transition"
                              fill
                              className={`object-cover transition-transform duration-[2000ms] ease-out ${phase === 'visible' ? 'scale-110' : 'scale-100'
                                    }`}
                              priority
                        />
                  </div>

                  {/* Animated Gradient Overlay */}
                  <div
                        className={`absolute inset-0 transition-opacity duration-500 ${isWellness
                                    ? 'bg-gradient-to-br from-amber-600/90 via-orange-500/70 to-cyan-600/80'
                                    : 'bg-gradient-to-br from-emerald-600/90 via-teal-500/70 to-blue-600/80'
                              }`}
                  />

                  {/* Animated circles/particles */}
                  <div className="absolute inset-0 overflow-hidden">
                        {[...Array(8)].map((_, i) => {
                              const randomLeft = Math.random() * 100;
                              const randomTop = Math.random() * 100;
                              return (
                                    <div
                                          key={i}
                                          className={`absolute rounded-full ${isWellness ? 'bg-amber-300/20' : 'bg-emerald-300/20'
                                                }`}
                                          style={{
                                                width: `${80 + i * 40}px`,
                                                height: `${80 + i * 40}px`,
                                                left: `${randomLeft}%`,
                                                top: `${randomTop}%`,
                                                animation: `pulse ${1 + i * 0.2}s ease-in-out infinite`,
                                                animationDelay: `${i * 0.1}s`,
                                          }}
                                    />
                              );
                        })}
                  </div>

                  {/* Center Content */}
                  <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${phase === 'visible' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                              }`}
                  >
                        {/* Animated Icon Circle */}
                        <div
                              className={`relative mb-8 p-8 rounded-full shadow-2xl transition-all duration-500 ${isWellness
                                          ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                                          : 'bg-gradient-to-br from-emerald-400 to-teal-500'
                                    } ${phase === 'visible' ? 'scale-100 rotate-0' : 'scale-50 rotate-180'}`}
                        >
                              {/* Inner glow */}
                              <div className={`absolute inset-0 rounded-full animate-ping ${isWellness ? 'bg-amber-400/50' : 'bg-emerald-400/50'
                                    }`} />

                              {isWellness ? (
                                    <div className="relative z-10">
                                          <Waves className="w-16 h-16 text-white" />
                                    </div>
                              ) : (
                                    <div className="relative z-10">
                                          <Heart className="w-16 h-16 text-white" />
                                    </div>
                              )}
                        </div>

                        {/* Title with stagger effect */}
                        <h1 className="text-center mb-4">
                              <span
                                    className={`block text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg transition-all duration-300 ${phase === 'visible' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                          }`}
                                    style={{ transitionDelay: '100ms' }}
                              >
                                    {isWellness ? 'Welcome to' : 'Entering'}
                              </span>
                              <span
                                    className={`block text-5xl md:text-7xl lg:text-8xl font-bold drop-shadow-lg transition-all duration-300 ${isWellness
                                                ? 'text-amber-200'
                                                : 'text-emerald-200'
                                          } ${phase === 'visible' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                                    style={{ transitionDelay: '200ms' }}
                              >
                                    {isWellness ? 'Wellness' : 'Healthcare'}
                              </span>
                        </h1>

                        {/* Tagline */}
                        <p
                              className={`text-lg md:text-xl text-white/90 text-center max-w-md transition-all duration-300 ${phase === 'visible' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}
                              style={{ transitionDelay: '300ms' }}
                        >
                              {isWellness
                                    ? '🌊 Sea, Serenity & Self-Discovery'
                                    : '🏥 World-Class Care, Incredible Savings'
                              }
                        </p>

                        {/* Decorative line */}
                        <div
                              className={`mt-8 h-1 rounded-full transition-all duration-500 ${isWellness ? 'bg-amber-300' : 'bg-emerald-300'
                                    } ${phase === 'visible' ? 'w-32' : 'w-0'}`}
                              style={{ transitionDelay: '400ms' }}
                        />
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute top-8 left-8 flex items-center gap-3 text-white/80">
                        {isWellness ? (
                              <>
                                    <Sun className="w-6 h-6 text-amber-300 animate-pulse" />
                                    <Leaf className="w-6 h-6 text-green-300" />
                              </>
                        ) : (
                              <>
                                    <Stethoscope className="w-6 h-6 text-emerald-300" />
                                    <Sparkles className="w-6 h-6 text-teal-300 animate-pulse" />
                              </>
                        )}
                  </div>

                  <div className="absolute bottom-8 right-8 text-white/60 text-sm font-medium">
                        {isWellness ? 'Pondy Wellness' : 'Pondy HealthPort'}
                  </div>
            </div>
      );
};

export default SmoothTransition;
