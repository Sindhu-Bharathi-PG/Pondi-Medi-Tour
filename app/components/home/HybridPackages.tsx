"use client";

import { ConvertedPrice } from '@/app/components/common/ConvertedPrice';
import { useQuote } from '@/app/context/QuoteContext';
import { Award, Clock, MapPin, MessageCircle, Sparkles, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface PackageInclusions {
      accommodation: string | null;
      transport: string | null;
      meals: string | null;
      extraServices: string[];
}

interface Package {
      id: number;
      name: string;
      slug: string;
      category: string;
      price: number;
      discountedPrice: number | null;
      currency: string;
      durationDays: number;
      durationNights: number | null;
      inclusions: PackageInclusions;
      shortDescription: string;
      imageUrl: string | null;
      isActive: boolean;
      isFeatured: boolean;
      hospitalId: number;
      hospitalName: string | null;
      viewCount: number;
      inquiryCount: number;
      popularityScore: number;
}

// Fallback static data
const FALLBACK_PACKAGES: Package[] = [
      {
            id: 1,
            name: 'The Ortho-Rejuvenation Journey',
            slug: 'ortho-rejuvenation',
            category: 'Wellness',
            price: 8500,
            discountedPrice: 7500,
            currency: 'USD',
            durationDays: 14,
            durationNights: 13,
            inclusions: {
                  accommodation: '5-Star Resort',
                  transport: 'Airport Pickup & Drop',
                  meals: 'All Inclusive',
                  extraServices: ['Aquatic Physiotherapy', 'City Tour']
            },
            shortDescription: "Includes Total Knee Replacement, 14-day recovery at Auroville's Quiet Healing Centre, aquatic physiotherapy, and all transfers.",
            imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600',
            isActive: true,
            isFeatured: true,
            hospitalId: 1,
            hospitalName: 'POSH Hospital',
            viewCount: 150,
            inquiryCount: 25,
            popularityScore: 225
      },
      {
            id: 2,
            name: 'The Dental-Heritage Journey',
            slug: 'dental-heritage',
            category: 'Cosmetic',
            price: 6200,
            discountedPrice: 5800,
            currency: 'USD',
            durationDays: 7,
            durationNights: 6,
            inclusions: {
                  accommodation: 'Heritage Boutique Hotel',
                  transport: 'Private Car',
                  meals: 'Breakfast Included',
                  extraServices: ['Guided Tours', 'Spa Session']
            },
            shortDescription: 'Includes Full Mouth Implants, 7-day recuperation in a French heritage boutique hotel, and guided local tours.',
            imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600',
            isActive: true,
            isFeatured: true,
            hospitalId: 2,
            hospitalName: 'Dr. Dentsmile Clinic',
            viewCount: 120,
            inquiryCount: 18,
            popularityScore: 210
      }
];

const HybridPackages: React.FC = () => {
      const { openQuoteWidget } = useQuote();
      const [packages, setPackages] = useState<Package[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
            const fetchPackages = async () => {
                  try {
                        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                        const response = await fetch(`${apiUrl}/api/packages?featured=true&limit=4`);

                        if (!response.ok) {
                              throw new Error('Failed to fetch packages');
                        }

                        const data = await response.json();

                        if (data && data.length > 0) {
                              // Already sorted by popularityScore from backend
                              setPackages(data);
                        } else {
                              setPackages(FALLBACK_PACKAGES);
                        }
                  } catch (err) {
                        console.error('Error fetching packages:', err);
                        setPackages(FALLBACK_PACKAGES);
                        setError('Using cached data');
                  } finally {
                        setLoading(false);
                  }
            };

            fetchPackages();
      }, []);

      const getPopularityBadge = (pkg: Package, index: number) => {
            if (index === 0) {
                  return (
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                              <TrendingUp className="w-4 h-4" />
                              Most Popular
                        </div>
                  );
            }
            if (pkg.isFeatured) {
                  return (
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                              <Sparkles className="w-4 h-4" />
                              Featured
                        </div>
                  );
            }
            return null;
      };

      if (loading) {
            return (
                  <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-5xl font-bold mb-4 text-gray-800">Don&apos;t Just Get Treated. Heal.</h2>
                                    <p className="text-xl text-gray-600">Loading amazing packages...</p>
                              </div>
                              <div className="grid md:grid-cols-2 gap-8">
                                    {[1, 2].map((i) => (
                                          <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
                                                <div className="h-72 bg-gray-200"></div>
                                                <div className="p-8">
                                                      <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
                                                      <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                                                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>
            );
      }

      return (
            <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
                  <div className="container mx-auto px-4">
                        {/* Header */}
                        <div className="text-center mb-20">
                              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                    <Award className="w-4 h-4" />
                                    Premium Hybrid Packages
                              </div>
                              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 bg-clip-text text-transparent">
                                    Don&apos;t Just Get Treated. Heal.
                              </h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    Unique hybrid packages combining world-class medical excellence with rejuvenating wellness stays in the serene beauty of Pondicherry
                              </p>
                        </div>

                        {/* Package Cards Grid */}
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                              {packages.map((pkg, index) => (
                                    <div
                                          key={pkg.id}
                                          className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 ${index === 0
                                                ? 'shadow-2xl shadow-emerald-200/50 ring-2 ring-emerald-100'
                                                : 'shadow-xl hover:shadow-2xl'
                                                }`}
                                    >
                                          {/* Popularity Badge */}
                                          {getPopularityBadge(pkg, index)}

                                          {/* Image Section */}
                                          <div className="relative h-72 overflow-hidden">
                                                <Image
                                                      src={pkg.imageUrl || 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600'}
                                                      alt={pkg.name}
                                                      fill
                                                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                                {/* Category & Duration Overlay */}
                                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                                      <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                                            {pkg.category}
                                                      </span>
                                                      <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                                            <Clock className="w-4 h-4 text-emerald-600" />
                                                            {pkg.durationDays} Days {pkg.durationNights ? `/ ${pkg.durationNights} Nights` : ''}
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Content Section */}
                                          <div className="p-8">
                                                {/* Hospital Name */}
                                                {pkg.hospitalName && (
                                                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                                                            <MapPin className="w-4 h-4" />
                                                            {pkg.hospitalName}
                                                      </div>
                                                )}

                                                {/* Title */}
                                                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 group-hover:text-emerald-700 transition-colors">
                                                      {pkg.name}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                                                      {pkg.shortDescription}
                                                </p>

                                                {/* Inclusions Tags */}
                                                {pkg.inclusions && (
                                                      <div className="flex flex-wrap gap-2 mb-6">
                                                            {pkg.inclusions.accommodation && (
                                                                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                                                                        🏨 {pkg.inclusions.accommodation}
                                                                  </span>
                                                            )}
                                                            {pkg.inclusions.transport && (
                                                                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                                                        🚗 {pkg.inclusions.transport}
                                                                  </span>
                                                            )}
                                                            {pkg.inclusions.meals && (
                                                                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                                                                        🍽️ {pkg.inclusions.meals}
                                                                  </span>
                                                            )}
                                                      </div>
                                                )}

                                                {/* Price & CTA */}
                                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                                      <div>
                                                            <div className="text-sm text-gray-500 mb-1">Starting from</div>
                                                            <div className="flex items-baseline gap-2">
                                                                  {pkg.discountedPrice && pkg.discountedPrice < pkg.price ? (
                                                                        <>
                                                                              <span className="text-3xl font-bold text-emerald-600">
                                                                                    <ConvertedPrice amount={pkg.discountedPrice} fromCurrency={pkg.currency} />
                                                                              </span>
                                                                              <span className="text-lg text-gray-400 line-through">
                                                                                    <ConvertedPrice amount={pkg.price} fromCurrency={pkg.currency} />
                                                                              </span>
                                                                        </>
                                                                  ) : (
                                                                        <span className="text-3xl font-bold text-emerald-600">
                                                                              <ConvertedPrice amount={pkg.price} fromCurrency={pkg.currency} />
                                                                        </span>
                                                                  )}
                                                            </div>
                                                      </div>

                                                      <div className="flex items-center gap-2">
                                                            <button
                                                                  onClick={() => openQuoteWidget({
                                                                        hospitalId: pkg.hospitalId,
                                                                        hospitalName: pkg.hospitalName || undefined,
                                                                        packageId: pkg.id,
                                                                        packageName: pkg.name,
                                                                        treatmentType: pkg.category,
                                                                        source: 'home-packages'
                                                                  })}
                                                                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-200 hover:scale-105 transition-all duration-300"
                                                            >
                                                                  <MessageCircle className="w-4 h-4" />
                                                                  Get Quote
                                                            </button>
                                                            <Link
                                                                  href={`/packages/${pkg.slug || pkg.id}`}
                                                                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-full font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300"
                                                            >
                                                                  Details
                                                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                                  </svg>
                                                            </Link>
                                                      </div>
                                                </div>

                                                {/* Popularity Stats (Subtle) */}
                                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400">
                                                      <span className="flex items-center gap-1">
                                                            <Star className="w-3 h-3" /> {pkg.viewCount || 0} views
                                                      </span>
                                                      <span className="flex items-center gap-1">
                                                            <TrendingUp className="w-3 h-3" /> {pkg.inquiryCount || 0} inquiries
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        {/* CTA Button */}
                        <div className="text-center mt-16">
                              <Link
                                    href="/packages"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-emerald-200 hover:scale-105 transition-all duration-300"
                              >
                                    Explore All Packages
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                              </Link>
                        </div>
                  </div>
            </section>
      );
};

export default HybridPackages;
