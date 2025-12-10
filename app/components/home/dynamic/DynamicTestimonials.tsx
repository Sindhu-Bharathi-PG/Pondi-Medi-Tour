"use client";

// Simplified Testimonials: render static content
import { TestimonialsSectionConfig } from '@/app/types/homeConfig.types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface DynamicTestimonialsProps {
    config: TestimonialsSectionConfig;
    mode: 'medical' | 'wellness';
}

export default function DynamicTestimonials({ config, mode }: DynamicTestimonialsProps) {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % config.items.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [config.items.length]);

    // Theme colors based on mode
    const themeColors = mode === 'medical'
        ? {
            cardBg: 'from-emerald-50 to-teal-50',
            borderColor: 'border-emerald-300',
            starColor: 'text-emerald-400',
            dotActive: 'bg-emerald-500',
        }
        : {
            cardBg: 'from-amber-50 to-orange-50',
            borderColor: 'border-amber-300',
            starColor: 'text-amber-400',
            dotActive: 'bg-amber-500',
        };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">{config.content.title}</h2>
                    <p className="text-xl text-gray-600">{config.content.subtitle}</p>
                </div>

                {/* Testimonials Carousel */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {config.items.map((testimonial, i) => (
                            <div
                                key={testimonial.id}
                                className={`bg-gradient-to-br ${themeColors.cardBg} rounded-3xl p-8 md:p-12 transition-all duration-500 ${activeTestimonial === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        width={120}
                                        height={120}
                                        className={`rounded-full border-4 ${themeColors.borderColor}`}
                                    />
                                    <div>
                                        <p className="text-2xl text-gray-700 italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-800">{testimonial.name}</span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-500">{testimonial.location}</span>
                                        </div>
                                        <div className="flex gap-1 mt-2">
                                            {[...Array(testimonial.rating || 5)].map((_, j) => (
                                                <Star key={j} className={`w-5 h-5 ${themeColors.starColor} fill-current`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-8">
                        {config.items.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === i ? `${themeColors.dotActive} w-8` : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
