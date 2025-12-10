"use client";

import EditableText from '@/app/components/admin/EditableText';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { CTASectionConfig } from '@/app/types/homeConfig.types';
import { getIcon } from '@/app/utils/iconMap';
import Link from 'next/link';
import { useMemo } from 'react';

interface DynamicCTAProps {
    config: CTASectionConfig;
    mode: 'medical' | 'wellness';
}

export default function DynamicCTA({ config, mode }: DynamicCTAProps) {
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
            buttonGradient: 'from-emerald-500 to-teal-500',
            buttonShadow: 'hover:shadow-emerald-500/30',
        }
        : {
            buttonGradient: 'from-amber-500 to-orange-500',
            buttonShadow: 'hover:shadow-amber-500/30',
        };

    // Memoize icon component to avoid recreating during render
    const ButtonIcon = useMemo(() => {
        return config.content.buttonIcon ? getIcon(config.content.buttonIcon) : null;
    }, [config.content.buttonIcon]);

    return (
        <section className={`py-24 bg-gradient-to-r ${config.content.gradientColors} text-white`}>
            <div className="container mx-auto px-4 text-center">
                <EditableText
                    value={config.content.title}
                    onSave={(v) => handleContentUpdate('content.title', v)}
                    isEditing={isEditing}
                    className="text-4xl md:text-5xl font-bold mb-6"
                    as="h2"
                />
                <EditableText
                    value={config.content.subtitle}
                    onSave={(v) => handleContentUpdate('content.subtitle', v)}
                    isEditing={isEditing}
                    className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                    as="p"
                />
                <Link
                    href={config.content.buttonLink}
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${themeColors.buttonGradient} text-white px-10 py-5 rounded-full font-semibold text-xl hover:shadow-2xl ${themeColors.buttonShadow} transition-all`}
                >
                    {config.content.buttonText}
                    {ButtonIcon && <ButtonIcon className="w-6 h-6" />}
                </Link>
            </div>
        </section>
    );
}
