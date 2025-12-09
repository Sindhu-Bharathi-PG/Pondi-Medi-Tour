"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroSlide {
      image: string;
      title: string;
      subtitle: string;
}

interface HeroSectionProps {
      heroSlides: HeroSlide[];
      currentHeroSlide: number;
      setCurrentHeroSlide: (index: number) => void;
      highContrast: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
      heroSlides,
      currentHeroSlide,
      setCurrentHeroSlide,
      highContrast,
}) => {
      return (
            <section id="main-content" className="relative h-screen overflow-hidden" role="banner">
                  {heroSlides.map((slide, index) => (
                        <div
                              key={index}
                              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                              aria-hidden={index !== currentHeroSlide}
                        >
                              <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                    role="img"
                                    aria-label={slide.subtitle}
                              />
                              <div className={`absolute inset-0 ${highContrast ? 'bg-black/90' : 'bg-linear-to-r from-black/70 via-black/50 to-transparent'}`} />
                        </div>
                  ))}

                  <div className="relative h-full flex items-center">
                        <div className="container mx-auto px-4">
                              <div className="max-w-3xl text-white space-y-6 animate-fade-in">
                                    <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                                          World-Class Treatment.<br />
                                          <span className={`text-transparent bg-clip-text ${highContrast ? 'text-yellow-400' : 'bg-linear-to-r from-emerald-400 to-teal-300'}`}>
                                                Tranquil Recovery.
                                          </span>
                                    </h1>
                                    <p className={`text-xl md:text-2xl leading-relaxed ${highContrast ? 'text-yellow-400' : 'text-gray-200'}`}>
                                          Discover Pondicherry: The smart, serene alternative for your medical journey. World-class doctors, NABH-accredited hospitals, and a unique healing environment.
                                    </p>
                                    <div className="flex flex-wrap gap-4 pt-4">
                                          <button className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:shadow-2xl hover:scale-105'
                                                }`} aria-label="Get your free medical quote">
                                                Get My Free Quote
                                                <ChevronRight className="w-5 h-5" aria-hidden="true" />
                                          </button>
                                          <button className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border ${highContrast ? 'bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black' : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border-white/30'
                                                }`}>
                                                Book Local Appointment
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {heroSlides.map((_, index) => (
                              <button
                                    key={index}
                                    onClick={() => setCurrentHeroSlide(index)}
                                    className={`w-12 h-1 rounded transition-all ${index === currentHeroSlide ? 'bg-white w-16' : 'bg-white/50'
                                          }`}
                              />
                        ))}
                  </div>
            </section>
      );
};

export default HeroSection;
