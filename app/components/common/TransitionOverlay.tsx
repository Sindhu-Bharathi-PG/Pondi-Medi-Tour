"use client";

import React, { useEffect, useState } from 'react';
import { Heart, Stethoscope, Syringe, Activity, Leaf, Sun, Waves, Sparkles } from 'lucide-react';

interface TransitionOverlayProps {
      isActive: boolean;
      targetMode: 'medical' | 'wellness';
      onComplete: () => void;
}

const TransitionOverlay: React.FC<TransitionOverlayProps> = ({ isActive, targetMode, onComplete }) => {
      const [phase, setPhase] = useState<'idle' | 'entering' | 'showing' | 'exiting'>('idle');

      useEffect(() => {
            if (isActive) {
                  setPhase('entering');

                  // Phase timeline
                  const enterTimer = setTimeout(() => setPhase('showing'), 800);
                  const showTimer = setTimeout(() => setPhase('exiting'), 2000);
                  const exitTimer = setTimeout(() => {
                        setPhase('idle');
                        onComplete();
                  }, 2800);

                  return () => {
                        clearTimeout(enterTimer);
                        clearTimeout(showTimer);
                        clearTimeout(exitTimer);
                  };
            }
      }, [isActive, onComplete]);

      if (phase === 'idle') return null;

      return (
            <div className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden">
                  {targetMode === 'wellness' ? (
                        <WellnessTransition phase={phase} />
                  ) : (
                        <MedicalTransition phase={phase} />
                  )}
            </div>
      );
};

// Wellness Transition - Ocean Waves
const WellnessTransition: React.FC<{ phase: string }> = ({ phase }) => {
      return (
            <div className="relative w-full h-full">
                  {/* Sky gradient */}
                  <div
                        className={`absolute inset-0 transition-opacity duration-700 ${phase === 'entering' || phase === 'showing' ? 'opacity-100' : 'opacity-0'
                              }`}
                        style={{
                              background: 'linear-gradient(180deg, #0ea5e9 0%, #38bdf8 30%, #7dd3fc 60%, #f0f9ff 100%)'
                        }}
                  />

                  {/* Sun */}
                  <div
                        className={`absolute top-20 right-20 transition-all duration-1000 ${phase === 'entering' || phase === 'showing' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                              }`}
                  >
                        <div className="relative">
                              <div className="w-32 h-32 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full blur-sm" />
                              <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full" />
                              {/* Sun rays */}
                              {[...Array(12)].map((_, i) => (
                                    <div
                                          key={i}
                                          className="absolute w-1 h-16 bg-gradient-to-b from-amber-300 to-transparent"
                                          style={{
                                                top: '50%',
                                                left: '50%',
                                                transformOrigin: 'center -32px',
                                                transform: `rotate(${i * 30}deg) translateY(-100%)`,
                                                animation: `pulse 2s ease-in-out infinite`,
                                                animationDelay: `${i * 0.1}s`
                                          }}
                                    />
                              ))}
                        </div>
                  </div>

                  {/* Ocean waves - multiple layers */}
                  {[0, 1, 2, 3, 4].map((i) => (
                        <div
                              key={i}
                              className={`absolute left-0 right-0 transition-transform duration-1000 ease-out`}
                              style={{
                                    bottom: `${-100 + (phase !== 'idle' ? 100 - i * 5 : 0)}%`,
                                    height: '60%',
                                    transitionDelay: `${i * 150}ms`,
                                    transform: phase === 'exiting' ? `translateY(100vh)` : 'translateY(0)',
                              }}
                        >
                              <svg
                                    viewBox="0 0 1440 320"
                                    className="absolute bottom-0 w-full h-full"
                                    preserveAspectRatio="none"
                              >
                                    <path
                                          fill={`rgba(14, 165, 233, ${0.9 - i * 0.15})`}
                                          d={`M0,${160 + i * 20}L48,${170 + i * 15}C96,${180 + i * 10},192,${190 + i * 5},288,${176 + i * 10}C384,${160 + i * 15},480,${128 + i * 20},576,${138 + i * 15}C672,${149 + i * 10},768,${203 + i * 5},864,${197 + i * 10}C960,${192 + i * 5},1056,${128 + i * 10},1152,${122 + i * 15}C1248,${117 + i * 10},1344,${171 + i * 5},1392,${197 + i * 10}L1440,${224 + i * 5}L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z`}
                                    >
                                          <animate
                                                attributeName="d"
                                                dur={`${3 + i}s`}
                                                repeatCount="indefinite"
                                                values={`
                  M0,${160 + i * 20}L48,${170 + i * 15}C96,${180 + i * 10},192,${190 + i * 5},288,${176 + i * 10}C384,${160 + i * 15},480,${128 + i * 20},576,${138 + i * 15}C672,${149 + i * 10},768,${203 + i * 5},864,${197 + i * 10}C960,${192 + i * 5},1056,${128 + i * 10},1152,${122 + i * 15}C1248,${117 + i * 10},1344,${171 + i * 5},1392,${197 + i * 10}L1440,${224 + i * 5}L1440,320L0,320Z;
                  M0,${180 + i * 15}L48,${150 + i * 20}C96,${160 + i * 15},192,${200 + i * 5},288,${186 + i * 10}C384,${150 + i * 20},480,${148 + i * 15},576,${158 + i * 10}C672,${169 + i * 5},768,${183 + i * 10},864,${177 + i * 15}C960,${172 + i * 10},1056,${148 + i * 5},1152,${142 + i * 10}C1248,${137 + i * 15},1344,${191 + i * 10},1392,${177 + i * 5}L1440,${204 + i * 10}L1440,320L0,320Z;
                  M0,${160 + i * 20}L48,${170 + i * 15}C96,${180 + i * 10},192,${190 + i * 5},288,${176 + i * 10}C384,${160 + i * 15},480,${128 + i * 20},576,${138 + i * 15}C672,${149 + i * 10},768,${203 + i * 5},864,${197 + i * 10}C960,${192 + i * 5},1056,${128 + i * 10},1152,${122 + i * 15}C1248,${117 + i * 10},1344,${171 + i * 5},1392,${197 + i * 10}L1440,${224 + i * 5}L1440,320L0,320Z
                `}
                                          />
                                    </path>
                              </svg>
                        </div>
                  ))}

                  {/* Foam particles */}
                  <div className="absolute bottom-40 left-0 right-0 h-20">
                        {[...Array(30)].map((_, i) => (
                              <div
                                    key={i}
                                    className={`absolute w-2 h-2 bg-white rounded-full transition-all duration-500 ${phase === 'showing' ? 'opacity-80' : 'opacity-0'
                                          }`}
                                    style={{
                                          left: `${Math.random() * 100}%`,
                                          bottom: `${Math.random() * 100}%`,
                                          animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                                          animationDelay: `${Math.random() * 2}s`
                                    }}
                              />
                        ))}
                  </div>

                  {/* Beach sand */}
                  <div
                        className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-200 to-amber-100 transition-transform duration-700 ${phase === 'exiting' ? 'translate-y-full' : 'translate-y-0'
                              }`}
                  />

                  {/* Center content */}
                  <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${phase === 'showing' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                              }`}
                  >
                        <div className="flex items-center gap-4 mb-4">
                              <Waves className="w-12 h-12 text-white drop-shadow-lg" />
                              <Leaf className="w-12 h-12 text-white drop-shadow-lg" />
                              <Sun className="w-12 h-12 text-amber-300 drop-shadow-lg" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl text-center mb-4">
                              Wellness Mode
                        </h2>
                        <p className="text-xl text-white/90 drop-shadow-lg">Discover Inner Peace in Pondicherry</p>
                  </div>
            </div>
      );
};

// Medical Transition - Hospital/Surgery Theme
const MedicalTransition: React.FC<{ phase: string }> = ({ phase }) => {
      return (
            <div className="relative w-full h-full bg-slate-900">
                  {/* Operating room lights effect */}
                  <div
                        className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${phase === 'entering' || phase === 'showing' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                              }`}
                  >
                        <div className="relative">
                              <div className="w-96 h-96 bg-gradient-radial from-cyan-400/50 via-cyan-500/20 to-transparent rounded-full blur-3xl" />
                              {/* Surgical light fixture */}
                              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-slate-700 rounded-full flex justify-around items-center px-4">
                                    {[...Array(5)].map((_, i) => (
                                          <div
                                                key={i}
                                                className="w-8 h-8 bg-gradient-to-b from-white to-cyan-200 rounded-full shadow-lg"
                                                style={{
                                                      animation: `pulse 1.5s ease-in-out infinite`,
                                                      animationDelay: `${i * 0.2}s`
                                                }}
                                          />
                                    ))}
                              </div>
                        </div>
                  </div>

                  {/* ECG Line */}
                  <div className={`absolute top-1/4 left-0 right-0 transition-opacity duration-500 ${phase === 'showing' ? 'opacity-100' : 'opacity-0'
                        }`}>
                        <svg viewBox="0 0 1200 100" className="w-full h-24">
                              <path
                                    d="M0,50 L100,50 L120,50 L140,20 L160,80 L180,10 L200,90 L220,50 L400,50 L420,50 L440,20 L460,80 L480,10 L500,90 L520,50 L700,50 L720,50 L740,20 L760,80 L780,10 L800,90 L820,50 L1000,50 L1020,50 L1040,20 L1060,80 L1080,10 L1100,90 L1120,50 L1200,50"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="3"
                                    className="drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                              >
                                    <animate
                                          attributeName="stroke-dasharray"
                                          from="0,2000"
                                          to="2000,0"
                                          dur="2s"
                                          fill="freeze"
                                    />
                              </path>
                        </svg>
                  </div>

                  {/* Floating medical icons */}
                  <div className="absolute inset-0 overflow-hidden">
                        {[
                              { Icon: Heart, color: 'text-red-500', x: 10, y: 20, delay: 0 },
                              { Icon: Stethoscope, color: 'text-emerald-400', x: 80, y: 30, delay: 0.2 },
                              { Icon: Syringe, color: 'text-blue-400', x: 20, y: 70, delay: 0.4 },
                              { Icon: Activity, color: 'text-green-400', x: 70, y: 60, delay: 0.6 },
                              { Icon: Heart, color: 'text-pink-400', x: 40, y: 40, delay: 0.8 },
                              { Icon: Stethoscope, color: 'text-teal-400', x: 60, y: 80, delay: 1 },
                        ].map(({ Icon, color, x, y, delay }, i) => (
                              <div
                                    key={i}
                                    className={`absolute transition-all duration-700 ${color} ${phase === 'showing' ? 'opacity-60' : 'opacity-0'
                                          }`}
                                    style={{
                                          left: `${x}%`,
                                          top: `${y}%`,
                                          transitionDelay: `${delay}s`,
                                          animation: phase === 'showing' ? `float 4s ease-in-out infinite` : 'none',
                                          animationDelay: `${delay}s`
                                    }}
                              >
                                    <Icon className="w-12 h-12 drop-shadow-2xl" />
                              </div>
                        ))}
                  </div>

                  {/* Surgical curtain wipe effect */}
                  <div className="absolute inset-0 flex">
                        <div
                              className={`flex-1 bg-emerald-700 transition-transform duration-700 origin-left ${phase === 'entering' ? 'scale-x-100' : phase === 'exiting' ? 'scale-x-0' : 'scale-x-100'
                                    }`}
                              style={{
                                    background: 'linear-gradient(90deg, #047857 0%, #059669 50%, #10b981 100%)'
                              }}
                        />
                        <div
                              className={`flex-1 bg-teal-700 transition-transform duration-700 origin-right ${phase === 'entering' ? 'scale-x-100' : phase === 'exiting' ? 'scale-x-0' : 'scale-x-100'
                                    }`}
                              style={{
                                    background: 'linear-gradient(270deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)',
                                    transitionDelay: '100ms'
                              }}
                        />
                  </div>

                  {/* Center content */}
                  <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 z-10 ${phase === 'showing' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                              }`}
                  >
                        {/* Heartbeat animation */}
                        <div className="relative mb-6">
                              <Heart
                                    className="w-24 h-24 text-white"
                                    style={{
                                          animation: 'heartbeat 1s ease-in-out infinite'
                                    }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 border-4 border-white/30 rounded-full animate-ping" />
                              </div>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl text-center mb-4">
                              Medical Mode
                        </h2>
                        <p className="text-xl text-emerald-200 drop-shadow-lg">World-Class Healthcare Awaits</p>

                        {/* Stats bar */}
                        <div className="flex gap-8 mt-8">
                              {[
                                    { value: '50+', label: 'Hospitals' },
                                    { value: '500+', label: 'Doctors' },
                                    { value: '70%', label: 'Savings' },
                              ].map((stat, i) => (
                                    <div
                                          key={i}
                                          className="text-center"
                                          style={{
                                                animation: `slideUp 0.5s ease-out forwards`,
                                                animationDelay: `${0.5 + i * 0.1}s`,
                                                opacity: 0
                                          }}
                                    >
                                          <div className="text-3xl font-bold text-white">{stat.value}</div>
                                          <div className="text-sm text-emerald-200">{stat.label}</div>
                                    </div>
                              ))}
                        </div>
                  </div>

                  {/* Corner details - surgical tools silhouettes */}
                  <div className={`absolute bottom-4 right-4 flex gap-2 transition-opacity duration-500 ${phase === 'showing' ? 'opacity-30' : 'opacity-0'
                        }`}>
                        <Stethoscope className="w-16 h-16 text-white/20" />
                        <Syringe className="w-16 h-16 text-white/20" />
                  </div>
            </div>
      );
};

// Add keyframes to head
if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.1); }
      50% { transform: scale(1); }
      75% { transform: scale(1.05); }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    
    .bg-gradient-radial {
      background: radial-gradient(circle, var(--tw-gradient-stops));
    }
  `;
      document.head.appendChild(style);
}

export default TransitionOverlay;
