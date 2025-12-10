"use client";

import { motion } from 'framer-motion';
import React, { useEffect, useState, useMemo } from 'react';

interface WaveTransitionProps {
      isActive: boolean;
      onComplete: () => void;
}

const WaveTransition: React.FC<WaveTransitionProps> = ({ isActive, onComplete }) => {
      const [phase, setPhase] = useState<'splash' | 'reveal' | 'exit'>('splash');

      useEffect(() => {
            if (isActive) {
                  const splashTimer = setTimeout(() => setPhase('reveal'), 1000);
                  const exitTimer = setTimeout(() => setPhase('exit'), 2500);
                  const completeTimer = setTimeout(() => onComplete(), 3200);

                  return () => {
                        clearTimeout(splashTimer);
                        clearTimeout(exitTimer);
                        clearTimeout(completeTimer);
                  };
            }
      }, [isActive, onComplete]);

      if (!isActive) return null;

      // Generate particles with random values once, memoized
      const particles = useMemo(() => {
            return [...Array(30)].map((_, i) => ({
                  id: i,
                  left: Math.random() * 100,
                  top: Math.random() * 100,
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  duration: 2 + Math.random() * 2,
                  delay: 1 + Math.random() * 1,
                  repeatDelay: Math.random() * 1,
            }));
      }, []);

      return (
            <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-black">
                  {/* Liquid blob morphing effect */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
                                    <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#e11d48" stopOpacity="1" />
                              </linearGradient>
                              <filter id="goo">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
                                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                              </filter>
                        </defs>
                        <g filter="url(#goo)">
                              {/* Main morphing blob */}
                              <motion.ellipse
                                    cx="50"
                                    cy="50"
                                    fill="url(#grad1)"
                                    initial={{ rx: 0, ry: 0 }}
                                    animate={{
                                          rx: phase === 'exit' ? 0 : [0, 30, 35, 80],
                                          ry: phase === 'exit' ? 0 : [0, 25, 30, 70],
                                    }}
                                    transition={{
                                          duration: phase === 'exit' ? 0.7 : 1.2,
                                          ease: [0.6, 0.01, 0.05, 0.95],
                                          times: [0, 0.3, 0.6, 1]
                                    }}
                              />
                              {/* Secondary blobs for gooey effect */}
                              {[...Array(8)].map((_, i) => {
                                    const angle = (i * 45 * Math.PI) / 180;
                                    const distance = 25;
                                    return (
                                          <motion.circle
                                                key={i}
                                                cx={50 + Math.cos(angle) * distance}
                                                cy={50 + Math.sin(angle) * distance}
                                                fill="url(#grad1)"
                                                initial={{ r: 0 }}
                                                animate={{
                                                      r: phase === 'exit' ? 0 : [0, 8, 12],
                                                      cx: phase === 'exit' ? 50 : 50 + Math.cos(angle) * distance,
                                                      cy: phase === 'exit' ? 50 : 50 + Math.sin(angle) * distance,
                                                }}
                                                transition={{
                                                      duration: phase === 'exit' ? 0.6 : 1,
                                                      delay: i * 0.05,
                                                      ease: "easeOut"
                                                }}
                                          />
                                    );
                              })}
                        </g>
                  </svg>

                  {/* Background */}
                  <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === 'exit' ? 0 : 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                  />

                  {/* Content */}
                  <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                        animate={{
                              opacity: phase === 'exit' ? 0 : phase === 'reveal' ? 1 : 0,
                              scale: phase === 'exit' ? 0.5 : phase === 'reveal' ? 1 : 0.5,
                              rotateY: phase === 'exit' ? 180 : phase === 'reveal' ? 0 : -180
                        }}
                        transition={{
                              duration: 0.8,
                              delay: phase === 'reveal' ? 0.4 : 0,
                              ease: [0.43, 0.13, 0.23, 0.96]
                        }}
                        style={{ perspective: 1000 }}
                  >
                        <div className="text-center text-white px-6 max-w-5xl">
                              <motion.div
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-rose-500/20 backdrop-blur-xl px-6 py-3 rounded-full mb-8 border-2 border-white/30 shadow-2xl"
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1.2, duration: 0.6, type: "spring", bounce: 0.4 }}
                              >
                                    <span className="text-2xl">🌿</span>
                                    <span className="text-base font-semibold tracking-wide">Holistic Healing Destination</span>
                              </motion.div>

                              <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.4, duration: 0.8 }}
                              >
                                    <h1 className="text-7xl md:text-8xl font-black mb-8 leading-none">
                                          <motion.div
                                                className="overflow-hidden"
                                                initial={{ y: 100 }}
                                                animate={{ y: 0 }}
                                                transition={{ delay: 1.5, duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }}
                                          >
                                                <span className="block bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                                                      Heal Your Body
                                                </span>
                                          </motion.div>
                                          <motion.div
                                                className="overflow-hidden mt-4"
                                                initial={{ y: 100 }}
                                                animate={{ y: 0 }}
                                                transition={{ delay: 1.7, duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }}
                                          >
                                                <span className="block bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                                                      Nurture Your Soul
                                                </span>
                                          </motion.div>
                                    </h1>
                              </motion.div>

                              <motion.p
                                    className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.9, duration: 0.8 }}
                              >
                                    Experience the perfect blend of <span className="font-semibold text-amber-200">world-class recovery care</span> and <span className="font-semibold text-amber-200">ancient healing traditions</span> in the serene coastal paradise of Pondicherry.
                              </motion.p>

                              <motion.div
                                    className="mt-10 flex justify-center gap-3"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 2.1, duration: 0.5, type: "spring" }}
                              >
                                    <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full" />
                              </motion.div>
                        </div>
                  </motion.div>

                  {/* Shimmer overlay */}
                  <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                        initial={{ x: '-100%', skewX: -20 }}
                        animate={{ x: phase === 'reveal' ? '200%' : '-100%' }}
                        transition={{ duration: 1.5, delay: 1.3, ease: "easeInOut" }}
                        style={{ width: '50%' }}
                  />

                  {/* Glowing particles */}
                  {particles.map((particle) => (
                        <motion.div
                              key={particle.id}
                              className="absolute rounded-full bg-amber-300"
                              style={{
                                    left: `${particle.left}%`,
                                    top: `${particle.top}%`,
                                    width: particle.width,
                                    height: particle.height,
                              }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{
                                    opacity: phase === 'exit' ? 0 : [0, 0.8, 0],
                                    scale: phase === 'exit' ? 0 : [0, 1.5, 0],
                                    y: [0, -100],
                              }}
                              transition={{
                                    duration: particle.duration,
                                    delay: particle.delay,
                                    repeat: phase === 'exit' ? 0 : Infinity,
                                    repeatDelay: particle.repeatDelay
                              }}
                        />
                  ))}
            </div>
      );
};

export default WaveTransition;