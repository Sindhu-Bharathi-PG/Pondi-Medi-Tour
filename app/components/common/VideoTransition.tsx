"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Leaf, Stethoscope, Heart, Sun, Waves } from 'lucide-react';

interface VideoTransitionProps {
      isActive: boolean;
      targetMode: 'medical' | 'wellness';
      onComplete: () => void;
}

// Free stock video URLs (these are real working video URLs)
const TRANSITION_VIDEOS = {
      wellness: [
            // Ocean waves hitting shore - multiple options
            'https://videos.pexels.com/video-files/1093662/1093662-uhd_2560_1440_30fps.mp4',
            'https://videos.pexels.com/video-files/857251/857251-hd_1280_720_25fps.mp4',
      ],
      medical: [
            // Hospital/medical themed videos
            'https://videos.pexels.com/video-files/4173251/4173251-uhd_2560_1440_25fps.mp4',
            'https://videos.pexels.com/video-files/6823980/6823980-uhd_2560_1440_25fps.mp4',
      ]
};

// Fallback video URLs (smaller file size)
const FALLBACK_VIDEOS = {
      wellness: 'https://videos.pexels.com/video-files/1918465/1918465-hd_1920_1080_24fps.mp4',
      medical: 'https://videos.pexels.com/video-files/3993949/3993949-hd_1920_1080_30fps.mp4',
};

const VideoTransition: React.FC<VideoTransitionProps> = ({ isActive, targetMode, onComplete }) => {
      const [phase, setPhase] = useState<'idle' | 'entering' | 'playing' | 'exiting'>('idle');
      const [videoLoaded, setVideoLoaded] = useState(false);
      const videoRef = useRef<HTMLVideoElement>(null);

      useEffect(() => {
            let enterTimer: NodeJS.Timeout;
            let exitTimer: NodeJS.Timeout;
            let completeTimer: NodeJS.Timeout;

            if (isActive && phase === 'idle') {
                  // Use setTimeout to avoid synchronous setState in effect
                  setTimeout(() => setPhase('entering'), 0);

                  // Start playing video
                  enterTimer = setTimeout(() => {
                        setPhase('playing');
                        if (videoRef.current) {
                              videoRef.current.currentTime = 0;
                              videoRef.current.play().catch(console.error);
                        }
                  }, 300);

                  // Begin exit
                  exitTimer = setTimeout(() => {
                        setPhase('exiting');
                  }, 2500);

                  // Complete transition
                  completeTimer = setTimeout(() => {
                        setPhase('idle');
                        setVideoLoaded(false);
                        onComplete();
                  }, 3200);

                  return () => {
                        clearTimeout(enterTimer);
                        clearTimeout(exitTimer);
                        clearTimeout(completeTimer);
                  };
            }
      }, [isActive, phase, onComplete]);

      // Reset when not active
      useEffect(() => {
            if (!isActive && phase !== 'idle') {
                  setPhase('idle');
            }
      }, [isActive, phase]);

      const handleVideoError = () => {
            // Use fallback on error
            if (videoRef.current) {
                  videoRef.current.src = FALLBACK_VIDEOS[targetMode];
            }
      };

      if (phase === 'idle') return null;

      const isWellness = targetMode === 'wellness';

      return (
            <div
                  className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${phase === 'entering' ? 'opacity-0' : phase === 'exiting' ? 'opacity-0' : 'opacity-100'
                        }`}
            >
                  {/* Video Background */}
                  <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        playsInline
                        preload="auto"
                        onLoadedData={() => setVideoLoaded(true)}
                        onError={handleVideoError}
                  >
                        <source src={TRANSITION_VIDEOS[targetMode][0]} type="video/mp4" />
                  </video>

                  {/* Gradient Overlay */}
                  <div
                        className={`absolute inset-0 ${isWellness
                              ? 'bg-gradient-to-b from-amber-900/70 via-transparent to-cyan-900/70'
                              : 'bg-gradient-to-b from-emerald-900/70 via-transparent to-teal-900/70'
                              }`}
                  />

                  {/* Animated vignette */}
                  <div
                        className="absolute inset-0"
                        style={{
                              background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 100%)'
                        }}
                  />

                  {/* Center Content */}
                  <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${phase === 'playing' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                              }`}
                  >
                        {/* Icon */}
                        <div className={`mb-6 p-6 rounded-full ${isWellness
                              ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                              : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                              } shadow-2xl`}>
                              {isWellness ? (
                                    <div className="relative">
                                          <Waves className="w-16 h-16 text-white" />
                                          <Sun className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 animate-pulse" />
                                    </div>
                              ) : (
                                    <div className="relative">
                                          <Heart className="w-16 h-16 text-white animate-pulse" />
                                          <Stethoscope className="absolute -bottom-2 -right-2 w-8 h-8 text-white" />
                                    </div>
                              )}
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-4 drop-shadow-2xl">
                              {isWellness ? (
                                    <>
                                          <span className="block">Discover</span>
                                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                                                Wellness
                                          </span>
                                    </>
                              ) : (
                                    <>
                                          <span className="block">World-Class</span>
                                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                                                Healthcare
                                          </span>
                                    </>
                              )}
                        </h1>

                        {/* Tagline */}
                        <p className={`text-xl md:text-2xl text-center max-w-md ${isWellness ? 'text-amber-100' : 'text-emerald-100'
                              }`}>
                              {isWellness
                                    ? 'Experience serenity in Pondicherry'
                                    : 'Save up to 70% on medical care'
                              }
                        </p>

                        {/* Decorative elements */}
                        <div className="flex gap-2 mt-8">
                              {[...Array(3)].map((_, i) => (
                                    <div
                                          key={i}
                                          className={`w-2 h-2 rounded-full ${isWellness ? 'bg-amber-400' : 'bg-emerald-400'
                                                } animate-bounce`}
                                          style={{ animationDelay: `${i * 0.15}s` }}
                                    />
                              ))}
                        </div>
                  </div>

                  {/* Corner Branding */}
                  <div className="absolute bottom-8 left-8 text-white/80">
                        <div className="flex items-center gap-2">
                              {isWellness ? (
                                    <Leaf className="w-6 h-6 text-amber-400" />
                              ) : (
                                    <Stethoscope className="w-6 h-6 text-emerald-400" />
                              )}
                              <span className="font-semibold">
                                    {isWellness ? 'Pondy Wellness' : 'Pondy HealthPort'}
                              </span>
                        </div>
                  </div>

                  {/* Loading indicator if video not loaded */}
                  {!videoLoaded && (phase === 'entering' || phase === 'playing' || phase === 'exiting') && (
                        <div className="absolute bottom-8 right-8">
                              <div className={`w-6 h-6 border-2 border-t-transparent rounded-full animate-spin ${isWellness ? 'border-amber-400' : 'border-emerald-400'
                                    }`} />
                        </div>
                  )}
            </div>
      );
};

export default VideoTransition;
