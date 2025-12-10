"use client";

// Simplified WhyPondicherry: render static content
import { WhyPondicherrySectionConfig } from '@/app/types/homeConfig.types';
import { getIcon } from '@/app/utils/iconMap';
import Image from 'next/image';

interface DynamicWhyPondicherryProps {
    config: WhyPondicherrySectionConfig;
}

export default function DynamicWhyPondicherry({ config }: DynamicWhyPondicherryProps) {

    return (
        <section className="py-24 bg-gradient-to-r from-amber-600 to-orange-500 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">{config.content.title}</h2>
                        <p className="text-xl text-amber-100 mb-8">{config.content.subtitle}</p>

                        {/* Features List */}
                        <div className="space-y-4">
                            {config.features.map((feature) => {
                                const FeatureIcon = getIcon(feature.icon);
                                return (
                                    <div key={feature.id} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                        {FeatureIcon && <FeatureIcon className="w-6 h-6 text-amber-200" />}
                                        <span className="font-medium">{feature.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Images Grid */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            {config.images.map((image, i) => (
                                <Image
                                    key={i}
                                    src={image}
                                    alt={`Pondicherry ${i + 1}`}
                                    width={250}
                                    height={300}
                                    className={`rounded-2xl shadow-2xl ${i === 1 ? 'mt-8' : ''}`}
                                />
                            ))}
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white text-gray-800 rounded-2xl shadow-xl p-6">
                            <div className="text-4xl font-bold text-amber-600">{config.rating.value}</div>
                            <div className="text-gray-500">{config.rating.label}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
