"use client";

import { ConvertedPrice } from '@/app/components/common/ConvertedPrice';
import Packages3DAnimation from '@/app/components/packages/Packages3DAnimation';
import { useQuote } from '@/app/context/QuoteContext';
import { Building2, CheckCircle, ChevronRight, Globe, Plane, Sparkles, Users } from 'lucide-react';
import Image from 'next/image';

interface Package {
    id: string;
    hospitalId?: number;
    hospitalName?: string;
    name: string;
    tagline: string;
    basePrice: number;
    duration: string;
    image: string;
    color: string;
    features: string[];
    includes: { flights: boolean; visa: boolean; insurance: boolean };
    popular: boolean;
}

interface PackagesClientProps {
    initialPackages: Package[];
}

export function PackagesClient({ initialPackages }: PackagesClientProps) {
    const { openQuoteWidget } = useQuote();

    const addons = [
        { icon: Users, name: 'Companion Package', priceAmount: 1500, desc: 'Accommodation & meals for 1 companion' },
        { icon: Plane, name: 'Business Class Upgrade', priceAmount: 2000, desc: 'Comfortable long-haul travel' },
        { icon: Sparkles, name: 'Extended Wellness', priceAmount: 800, desc: '7-day spa & yoga retreat' },
        { icon: Globe, name: 'Medical Tourism Visa', priceText: 'Included', desc: 'Complete documentation support' }
    ];

    return (
        <>
            {/* 3D Animation Showcase */}
            <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <Packages3DAnimation
                        packages={initialPackages}
                        onGetQuote={(pkg) => openQuoteWidget({
                            hospitalId: (pkg as any).hospitalId,
                            hospitalName: (pkg as any).hospitalName,
                            packageName: pkg.name,
                            treatmentType: pkg.name,
                            source: 'packages-3d-carousel'
                        })}
                    />
                </div>
            </section>

            {/* Packages Grid */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block text-emerald-600 font-semibold tracking-widest uppercase text-xs mb-3 bg-emerald-50 px-4 py-1.5 rounded-full">
                            Complete Packages
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">All Available Packages</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Browse our complete selection of medical tourism packages, each designed to provide comprehensive care
                        </p>
                    </div>

                    {initialPackages.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No packages available at the moment. Please check back later.</p>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {initialPackages.map((pkg, index) => (
                                <div
                                    key={pkg.id}
                                    className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${pkg.popular
                                        ? 'shadow-2xl shadow-emerald-500/20 ring-2 ring-emerald-500'
                                        : 'shadow-xl hover:shadow-2xl'
                                        }`}
                                >
                                    {/* Duration badge - top left */}
                                    <div className="absolute top-4 left-4 z-10 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        {pkg.duration}
                                    </div>

                                    {/* Popular badge - top right */}
                                    {pkg.popular && (
                                        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                            ⭐ Popular
                                        </div>
                                    )}

                                    {/* Header image with gradient overlay */}
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={pkg.image}
                                            alt={pkg.name}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-85`} />

                                        {/* Floating content - at bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                            <h3 className="text-xl font-bold tracking-tight mb-1">{pkg.name}</h3>
                                            <p className="text-white/80 text-sm line-clamp-2">{pkg.tagline}</p>
                                            {pkg.hospitalName && (
                                                <div className="flex items-center gap-1.5 mt-2 text-white/70 text-xs">
                                                    <Building2 className="w-3.5 h-3.5" />
                                                    <span className="truncate">{pkg.hospitalName}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                    </div>

                                    {/* Body */}
                                    <div className="p-6 pt-5">
                                        {/* Price row */}
                                        <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
                                            <div>
                                                <span className="text-gray-400 text-sm">From</span>
                                                <div className="text-3xl font-extrabold text-gray-900">
                                                    <ConvertedPrice amount={pkg.basePrice} fromCurrency="USD" />
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 justify-end max-w-[140px]">
                                                {pkg.includes.flights && (
                                                    <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-medium">
                                                        ✈️ Flights
                                                    </span>
                                                )}
                                                {pkg.includes.visa && (
                                                    <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-medium">
                                                        📄 Visa
                                                    </span>
                                                )}
                                                {pkg.includes.insurance && (
                                                    <span className="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-full text-xs font-medium">
                                                        🛡️ Insurance
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-3 mb-6">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center shrink-0`}>
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-gray-600 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA */}
                                        <button
                                            onClick={() => openQuoteWidget({
                                                hospitalId: pkg.hospitalId,
                                                hospitalName: pkg.hospitalName,
                                                packageName: pkg.name,
                                                treatmentType: pkg.name,
                                                source: 'packages-page'
                                            })}
                                            className={`w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${pkg.color} flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]`}
                                        >
                                            Get Quote
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Add-ons */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Customize Your Package</h2>
                        <p className="text-gray-600">Add these optional services to enhance your experience</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {addons.map((addon, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors">
                                <addon.icon className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
                                <h4 className="font-bold text-gray-800 mb-1">{addon.name}</h4>
                                <div className="text-emerald-600 font-semibold mb-2">
                                    {addon.priceAmount ? (
                                        <>+<ConvertedPrice amount={addon.priceAmount} fromCurrency="USD" /></>
                                    ) : (
                                        addon.priceText
                                    )}
                                </div>
                                <p className="text-gray-500 text-sm">{addon.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
