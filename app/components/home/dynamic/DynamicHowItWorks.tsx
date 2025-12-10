"use client";

import EditableText from '@/app/components/admin/EditableText';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { HowItWorksSectionConfig } from '@/app/types/homeConfig.types';

interface DynamicHowItWorksProps {
    config: HowItWorksSectionConfig;
    mode: 'medical' | 'wellness';
}

export default function DynamicHowItWorks({ config, mode }: DynamicHowItWorksProps) {
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
            stepBg: 'from-emerald-500 to-teal-500',
            lineBg: 'bg-emerald-200',
        }
        : {
            stepBg: 'from-amber-500 to-orange-500',
            lineBg: 'bg-amber-200',
        };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <EditableText
                        value={config.content.title}
                        onSave={(v) => handleContentUpdate('content.title', v)}
                        isEditing={isEditing}
                        className="text-4xl font-bold text-gray-800 mb-4"
                        as="h2"
                    />
                    <EditableText
                        value={config.content.subtitle}
                        onSave={(v) => handleContentUpdate('content.subtitle', v)}
                        isEditing={isEditing}
                        className="text-xl text-gray-600"
                        as="p"
                    />
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    {config.steps.map((step, i) => (
                        <div key={step.id} className="text-center relative">
                            <div className={`w-16 h-16 bg-gradient-to-br ${themeColors.stepBg} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold`}>
                                {step.step}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm">{step.description}</p>

                            {/* Connecting line */}
                            {i < config.steps.length - 1 && (
                                <div
                                    className={`hidden md:block absolute top-8 left-full w-full h-px ${themeColors.lineBg}`}
                                    style={{ width: 'calc(100% - 4rem)', marginLeft: '2rem' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
