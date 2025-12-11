"use client";

import EditableText from '@/app/components/admin/EditableText';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { HeroSectionConfig } from '@/app/types/homeConfig.types';
import { getIcon } from '@/app/utils/iconMap';
import { Phone, Search, Star } from 'lucide-react';
import Image from 'next/image';
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
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Use setTimeout to defer state update to avoid hydration issues
        const visibilityTimer = setTimeout(() => setIsVisible(true), 0);

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
                clearInterval(timer);
            };
        }

        return () => clearTimeout(visibilityTimer);
    }, [config.stats]);

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
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src={config.content.backgroundImage}
                    alt={mode === 'medical' ? 'Medical Tourism' : 'Wellness in Pondicherry'}
                    fill
                    className="object-cover brightness-90"
                    priority
                    quality={100}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${config.content.gradientColors} opacity-70`} />

                {/* Animated elements */}
                {mode === 'medical' ? (
                    <div className="absolute right-[10%] lg:right-[15%] top-1/2 transform -translate-y-1/2 hidden md:block">
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
                    <div className="absolute inset-0 overflow-hidden">
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
                <div className="max-w-3xl pr-4 md:pr-0 ">
                    {/* Badge */}
                    <div
                        className={`inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-5 mt-25 rounded-full mb-8 transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                            }`}
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
                        className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
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
                        className={`transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                    >
                        <EditableText
                            value={config.content.subtitle}
                            onSave={(v) => handleContentUpdate('content.subtitle', v)}
                            isEditing={isEditing}
                            className={`text-lg md:text-xl ${themeColors.accentBg} leading-relaxed mb-8 max-w-2xl`}
                            as="p"
                            multiline
                        />
                    </div>

                    {/* Search Bar */}
                    <div
                        className={`max-w-2xl transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                            <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl border border-white/20">
                                <Search className={`w-6 h-6 ${mode === 'medical' ? 'text-emerald-500' : 'text-amber-500'} flex-shrink-0`} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={mode === 'medical' ? 'Search treatments, hospitals, doctors...' : 'Search wellness programs, therapies...'}
                                    className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-base md:text-lg outline-none"
                                />
                                <button
                                    onClick={() => {
                                        if (searchQuery) {
                                            console.log('Searching for:', searchQuery);
                                            // Add search logic here
                                        }
                                    }}
                                    className={`px-6 py-2.5 bg-gradient-to-r ${themeColors.buttonGradient} text-white rounded-xl font-semibold text-sm hover:shadow-lg ${themeColors.buttonShadow} transition-all duration-300 flex-shrink-0`}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Helpline (Medical mode) */}
                    {config.content.helpline && (
                        <div
                            className={`mt-8 inline-flex items-center gap-4 bg-white/15 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 transition-all duration-700 delay-900 hover:bg-white/20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                        >
                            <div className={`w-14 h-14 bg-gradient-to-br ${themeColors.buttonGradient} rounded-full flex items-center justify-center shadow-lg`}>
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-white">
                                <div className={`text-sm font-medium ${themeColors.accentBg} mb-1`}>{config.content.helpline.label}</div>
                                <div className="text-2xl font-bold tracking-wide">{config.content.helpline.number}</div>
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
                            className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
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
