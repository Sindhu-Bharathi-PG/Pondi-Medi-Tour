"use client";

import EditableText from '@/app/components/admin/EditableText';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { HeroSectionConfig } from '@/app/types/homeConfig.types';
import { getIcon } from '@/app/utils/iconMap';
import { Phone, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DynamicHeroProps {
    config: HeroSectionConfig;
    mode: 'medical' | 'wellness';
}

export default function DynamicHero({ config, mode }: DynamicHeroProps) {
    const homeConfig = useHomeConfigOptional();
    const isEditing = homeConfig?.isEditing ?? false;

    const [isVisible, setIsVisible] = useState(false);
    const [countUp, setCountUp] = useState<Record<string, number>>({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideAnimating, setSlideAnimating] = useState(false);

    // Image slider configuration
    const sliderImages = mode === 'medical' ? [
        {
            src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920',
            alt: 'Modern Hospital Facilities'
        },
        {
            src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920',
            alt: 'Advanced Medical Technology'
        },
        {
            src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920',
            alt: 'Expert Medical Team'
        },
        {
            src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920',
            alt: 'Pondicherry Beach'
        }
    ] : [
        {
            src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920',
            alt: 'Yoga & Meditation'
        },
        {
            src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920',
            alt: 'Wellness Retreat'
        },
        {
            src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920',
            alt: 'Ayurvedic Spa'
        },
        {
            src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920',
            alt: 'Auroville Meditation'
        }
    ];

    const nextSlide = () => {
        setSlideAnimating(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
            setSlideAnimating(false);
        }, 300);
    };

    const prevSlide = () => {
        setSlideAnimating(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
            setSlideAnimating(false);
        }, 300);
    };

    useEffect(() => {
        // Use setTimeout to defer state update to avoid hydration issues
        const visibilityTimer = setTimeout(() => setIsVisible(true), 0);

        // Auto-advance slider every 5 seconds
        const sliderTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);

        // Keyboard navigation
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        // Count up animation for stats
        if (config.stats) {
            const duration = 2000;
            const steps = 50;
            const interval = duration / steps;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                const progress = step / steps;
                const newValues: Record<string, number> = {};

                config.stats?.forEach(stat => {
                    if (stat.animateValue) {
                        newValues[stat.label] = Math.floor(stat.animateValue * progress);
                    }
                });

                setCountUp(newValues);
                if (step >= steps) clearInterval(timer);
            }, interval);

            return () => {
                clearTimeout(visibilityTimer);
                clearInterval(sliderTimer);
                clearInterval(timer);
                window.removeEventListener('keydown', handleKeyPress);
            };
        }

        return () => {
            clearTimeout(visibilityTimer);
            clearInterval(sliderTimer);
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [config.stats, sliderImages.length, nextSlide, prevSlide]);

    const handleContentUpdate = (path: string, value: string) => {
        if (homeConfig) {
            homeConfig.updateSectionContent(config.id, path, value);
        }
    };

    const BadgeIcon = getIcon(config.content.badge.icon);
    const PrimaryCTAIcon = config.content.primaryCTA.icon ? getIcon(config.content.primaryCTA.icon) : null;
    const SecondaryCTAIcon = config.content.secondaryCTA.icon ? getIcon(config.content.secondaryCTA.icon) : null;

    // Theme colors based on mode
    const themeColors = mode === 'medical'
        ? {
            accent: 'emerald',
            gradient: 'from-emerald-300 via-teal-300 to-cyan-300',
            buttonGradient: 'from-emerald-500 to-teal-500',
            buttonShadow: 'hover:shadow-emerald-500/30',
            accentText: 'text-emerald-400',
            accentBg: 'text-emerald-200',
        }
        : {
            accent: 'amber',
            gradient: 'from-amber-300 via-orange-300 to-yellow-300',
            buttonGradient: 'from-amber-500 to-orange-500',
            buttonShadow: 'hover:shadow-amber-500/30',
            accentText: 'text-amber-400',
            accentBg: 'text-amber-200',
        };

    return (
        <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
            {/* Background Image Slider */}
            <div className="absolute inset-0">
                {sliderImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className={`object-cover transition-transform duration-[8000ms] ${
                                index === currentSlide ? 'scale-105' : 'scale-100'
                            }`}
                            priority={index === 0}
                        />
                    </div>
                ))}
                <div className={`absolute inset-0 bg-gradient-to-r ${config.content.gradientColors}`} />

                {/* Slider Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-8 z-10">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Slider Indicators with Caption */}
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`text-white text-center mb-3 transition-opacity duration-500 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`}>
                        <p className="text-sm font-medium bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full inline-block">
                            {sliderImages[currentSlide].alt}
                        </p>
                    </div>
                    <div className="flex gap-2 justify-center">
                        {sliderImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`transition-all ${
                                    index === currentSlide
                                        ? 'w-8 h-2 bg-white'
                                        : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                                } rounded-full`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Animated elements */}
                {mode === 'medical' ? (
                    <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                        <div className="relative">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-64 h-64 border-2 border-emerald-400/30 rounded-full"
                                    style={{
                                        animation: `pulse 2s ease-out infinite`,
                                        animationDelay: `${i * 0.5}s`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                            ))}
                            <div className="w-32 h-32 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                {BadgeIcon && <BadgeIcon className="w-16 h-16 text-emerald-400 animate-pulse" />}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-amber-300/30 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `floatUp ${3 + Math.random() * 2}s ease-in-out infinite`,
                                    animationDelay: `${Math.random() * 2}s`,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="relative container mx-auto px-4">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <div
                        className={`inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full mb-8 transition-all duration-500 ${
                            slideAnimating 
                                ? 'translate-x-10 opacity-0' 
                                : isVisible 
                                    ? 'translate-x-0 opacity-100' 
                                    : '-translate-x-10 opacity-0'
                        }`}
                        style={{ transitionDelay: slideAnimating ? '0ms' : '200ms' }}
                    >
                        {BadgeIcon && <BadgeIcon className={`w-5 h-5 ${themeColors.accentText}`} />}
                        <EditableText
                            value={config.content.badge.text}
                            onSave={(v) => handleContentUpdate('content.badge.text', v)}
                            isEditing={isEditing}
                            className="text-white text-sm font-medium"
                        />
                        {config.content.badge.rating && (
                            <>
                                <div className="w-px h-4 bg-white/30" />
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-white text-sm">{config.content.badge.rating}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h1
                        className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight transition-all duration-500 ${
                            slideAnimating 
                                ? 'translate-y-10 opacity-0' 
                                : isVisible 
                                    ? 'translate-y-0 opacity-100' 
                                    : 'translate-y-10 opacity-0'
                        }`}
                        style={{ transitionDelay: slideAnimating ? '0ms' : '300ms' }}
                    >
                        <EditableText
                            value={config.content.title.line1}
                            onSave={(v) => handleContentUpdate('content.title.line1', v)}
                            isEditing={isEditing}
                            className="block"
                            as="span"
                        />
                        <EditableText
                            value={config.content.title.line2}
                            onSave={(v) => handleContentUpdate('content.title.line2', v)}
                            isEditing={isEditing}
                            className={`block text-transparent bg-clip-text bg-gradient-to-r ${themeColors.gradient}`}
                            as="span"
                        />
                    </h1>

                    {/* Subtitle */}
                    <div
                        className={`transition-all duration-500 ${
                            slideAnimating 
                                ? 'translate-y-10 opacity-0' 
                                : isVisible 
                                    ? 'translate-y-0 opacity-100' 
                                    : 'translate-y-10 opacity-0'
                        }`}
                        style={{ transitionDelay: slideAnimating ? '0ms' : '500ms' }}
                    >
                        <EditableText
                            value={config.content.subtitle}
                            onSave={(v) => handleContentUpdate('content.subtitle', v)}
                            isEditing={isEditing}
                            className={`text-xl md:text-2xl ${themeColors.accentBg} leading-relaxed mb-10 max-w-2xl`}
                            as="p"
                            multiline
                        />
                    </div>

                    {/* CTAs */}
                    <div
                        className={`flex flex-wrap gap-4 transition-all duration-500 ${
                            slideAnimating 
                                ? 'translate-y-10 opacity-0' 
                                : isVisible 
                                    ? 'translate-y-0 opacity-100' 
                                    : 'translate-y-10 opacity-0'
                        }`}
                        style={{ transitionDelay: slideAnimating ? '0ms' : '700ms' }}
                    >
                        <Link
                            href={config.content.primaryCTA.link}
                            className={`group bg-gradient-to-r ${themeColors.buttonGradient} text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl ${themeColors.buttonShadow} transition-all duration-300 inline-flex items-center gap-2`}
                        >
                            {config.content.primaryCTA.text}
                            {PrimaryCTAIcon && <PrimaryCTAIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </Link>
                        <Link
                            href={config.content.secondaryCTA.link}
                            className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2"
                        >
                            {SecondaryCTAIcon && <SecondaryCTAIcon className="w-5 h-5" />}
                            {config.content.secondaryCTA.text}
                        </Link>
                    </div>

                    {/* Helpline (Medical mode) */}
                    {config.content.helpline && (
                        <div
                            className={`mt-10 flex items-center gap-6 transition-all duration-500 ${
                                slideAnimating 
                                    ? 'translate-y-10 opacity-0' 
                                    : isVisible 
                                        ? 'translate-y-0 opacity-100' 
                                        : 'translate-y-10 opacity-0'
                            }`}
                            style={{ transitionDelay: slideAnimating ? '0ms' : '900ms' }}
                        >
                            <div className="flex items-center gap-3 text-white">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className={`text-xs ${themeColors.accentBg}`}>{config.content.helpline.label}</div>
                                    <div className="font-semibold">{config.content.helpline.number}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Bar (Medical) or Highlights (Wellness in hero config) */}
            {config.stats && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md">
                    <div className="container mx-auto px-4 py-6">
                        <div
                            className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-500 ${
                                slideAnimating 
                                    ? 'translate-y-10 opacity-0' 
                                    : isVisible 
                                        ? 'translate-y-0 opacity-100' 
                                        : 'translate-y-10 opacity-0'
                            }`}
                            style={{ transitionDelay: slideAnimating ? '0ms' : '1000ms' }}
                        >
                            {config.stats.map((stat, i) => {
                                const StatIcon = getIcon(stat.icon);
                                const displayValue = stat.animateValue
                                    ? `${(countUp[stat.label] || 0).toLocaleString()}${stat.value.includes('+') ? '+' : ''}${stat.value.includes('%') ? '%' : ''}`
                                    : stat.value;

                                return (
                                    <div key={i} className="text-center text-white">
                                        {StatIcon && <StatIcon className={`w-6 h-6 mx-auto mb-2 ${themeColors.accentText}`} />}
                                        <div className="text-3xl font-bold">{displayValue}</div>
                                        <div className={`text-sm ${themeColors.accentBg}`}>{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
