"use client";

import EditableText from '@/app/components/admin/EditableText';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { TreatmentsSectionConfig } from '@/app/types/homeConfig.types';
import { getIcon } from '@/app/utils/iconMap';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DynamicTreatmentsProps {
    config: TreatmentsSectionConfig;
    mode: 'medical' | 'wellness';
}

export default function DynamicTreatments({ config, mode }: DynamicTreatmentsProps) {
    const homeConfig = useHomeConfigOptional();
    const isEditing = homeConfig?.isEditing ?? false;

    const handleContentUpdate = (path: string, value: string) => {
        if (homeConfig) {
            homeConfig.updateSectionContent(config.id, path, value);
        }
    };

    // Theme colors based on mode
    const themeColors = mode === 'medical'
        ? {
            badgeBg: 'bg-emerald-100',
            badgeText: 'text-emerald-700',
            linkColor: 'text-emerald-600',
            sectionBg: 'bg-gradient-to-b from-gray-50 to-white',
        }
        : {
            badgeBg: 'bg-amber-100',
            badgeText: 'text-amber-700',
            linkColor: 'text-amber-600',
            sectionBg: 'bg-gradient-to-b from-amber-50 to-white',
        };

    const BadgeIcon = getIcon(config.content.badge.icon);

    return (
        <section className={`py-24 ${themeColors.sectionBg}`}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className={`inline-flex items-center gap-2 ${themeColors.badgeBg} ${themeColors.badgeText} px-4 py-2 rounded-full mb-6`}>
                        {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
                        <EditableText
                            value={config.content.badge.text}
                            onSave={(v) => handleContentUpdate('content.badge.text', v)}
                            isEditing={isEditing}
                            className="text-sm font-semibold"
                            as="span"
                        />
                    </div>
                    <EditableText
                        value={config.content.title}
                        onSave={(v) => handleContentUpdate('content.title', v)}
                        isEditing={isEditing}
                        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                        as="h2"
                    />
                    <EditableText
                        value={config.content.subtitle}
                        onSave={(v) => handleContentUpdate('content.subtitle', v)}
                        isEditing={isEditing}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                        as="p"
                    />
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {config.items.map((item, i) => {
                        const ItemIcon = getIcon(item.icon);

                        // Medical style card (simple with savings)
                        if (mode === 'medical') {
                            return (
                                <Link
                                    key={item.id}
                                    href={config.content.viewAllLink}
                                    className="group bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                                        {ItemIcon && <ItemIcon className="w-7 h-7 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                                    {item.savings && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-2xl font-bold text-emerald-600">{item.savings}</span>
                                            <span className="text-gray-500 text-sm">savings</span>
                                        </div>
                                    )}
                                    {item.procedures && (
                                        <div className="flex flex-wrap gap-2">
                                            {item.procedures.map((p, j) => (
                                                <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{p}</span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            );
                        }

                        // Wellness style card (with image overlay)
                        return (
                            <Link
                                key={item.id}
                                href={item.link || config.content.viewAllLink}
                                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    {item.image && (
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    )}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                        {ItemIcon && <ItemIcon className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />}
                                        <h3 className="text-xl font-bold text-center">{item.title}</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600 text-center">{item.description}</p>
                                    <div className="mt-4 text-center">
                                        <span className={`inline-flex items-center gap-1 ${themeColors.linkColor} font-semibold group-hover:gap-2 transition-all`}>
                                            Explore <ChevronRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
                    <Link
                        href={config.content.viewAllLink}
                        className={`inline-flex items-center gap-2 ${themeColors.linkColor} font-semibold hover:gap-3 transition-all`}
                    >
                        {config.content.viewAllText} <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
