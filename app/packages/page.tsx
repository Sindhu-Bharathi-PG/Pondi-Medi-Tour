"use client";

import { Footer, Header } from '@/app/components/common';
import { ConvertedPrice } from '@/app/components/common/ConvertedPrice';
import { useScrolled } from '@/app/hooks';
import { Award, Calendar, Car, CheckCircle, ChevronRight, Globe, Heart, Hotel, Phone, Plane, Shield, Sparkles, Users, Utensils } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const PackagesPage = () => {
      const scrolled = useScrolled(50);
      const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

      const packages = [
            {
                  id: 'essential',
                  name: 'Essential Care',
                  tagline: 'Quality treatment, smart savings',
                  basePrice: 4999,
                  duration: '7-10 days',
                  image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
                  color: 'from-blue-600 to-cyan-500',
                  features: [
                        'NABH-accredited hospital',
                        'Standard private room',
                        '3-star hotel accommodation',
                        'Airport transfers',
                        'Basic translator service',
                        'Post-op check-up'
                  ],
                  includes: { flights: false, visa: true, insurance: false },
                  popular: false
            },
            {
                  id: 'premium',
                  name: 'Premium Wellness',
                  tagline: 'Complete care with luxury comfort',
                  basePrice: 8999,
                  duration: '14-18 days',
                  image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
                  color: 'from-emerald-600 to-teal-500',
                  features: [
                        'Top-tier hospital & surgeon',
                        'Deluxe private suite',
                        '4-star hotel + wellness retreat',
                        'Private airport transfers',
                        'Dedicated patient coordinator',
                        '3 post-op consultations',
                        'Physiotherapy sessions',
                        'City tour included'
                  ],
                  includes: { flights: false, visa: true, insurance: true },
                  popular: true
            },
            {
                  id: 'luxury',
                  name: 'Luxury Healing Journey',
                  tagline: 'World-class care, unmatched luxury',
                  basePrice: 15999,
                  duration: '21-28 days',
                  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                  color: 'from-amber-600 to-orange-500',
                  features: [
                        'VIP hospital services',
                        'Presidential suite',
                        '5-star heritage hotel',
                        'Luxury vehicle + driver',
                        '24/7 personal concierge',
                        'Unlimited consultations',
                        'Complete wellness program',
                        'Auroville & city tours',
                        'Companion accommodation',
                        'Return flight upgrade'
                  ],
                  includes: { flights: true, visa: true, insurance: true },
                  popular: false
            }
      ];

      const addons = [
            { icon: Users, name: 'Companion Package', priceAmount: 1500, desc: 'Accommodation & meals for 1 companion' },
            { icon: Plane, name: 'Business Class Upgrade', priceAmount: 2000, desc: 'Comfortable long-haul travel' },
            { icon: Sparkles, name: 'Extended Wellness', priceAmount: 800, desc: '7-day spa & yoga retreat' },
            { icon: Globe, name: 'Medical Tourism Visa', priceText: 'Included', desc: 'Complete documentation support' }
      ];

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* Hero - Unique: Complete Medical Care Packages */}
                  <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden hero-premium">
                        <div className="absolute inset-0 opacity-20">
                              <Image src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600" alt="Wellness" fill className="object-cover" />
                        </div>
                        <div className="relative container-premium">
                              {/* Breadcrumb */}
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <Link href="/">Home</Link>
                                    <span className="mx-2">/</span>
                                    <span className="text-white">Care Packages</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <div className="gov-seal mb-6">
                                          <span>All-Inclusive Transparent Pricing</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                                          Complete Care
                                          <span className="block text-[#bf9b30]">Packages</span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
                                          Simplify your medical journey with all-inclusive bundles. Surgery, hospital stay, accommodation, and transfers—no hidden fees, no surprises.
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* What's Included Overview */}
                  <section className="py-12 bg-white shadow-lg relative z-10 -mt-8">
                        <div className="container mx-auto px-4">
                              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                                    {[
                                          { icon: Heart, label: 'Medical Care' },
                                          { icon: Hotel, label: 'Accommodation' },
                                          { icon: Car, label: 'Transfers' },
                                          { icon: Utensils, label: 'Meals' },
                                          { icon: Shield, label: 'Insurance' },
                                          { icon: Users, label: 'Coordination' }
                                    ].map((item, i) => (
                                          <div key={i} className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                                      <item.icon className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <span className="font-medium text-gray-700">{item.label}</span>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Packages Grid */}
                  <section className="py-24">
                        <div className="container mx-auto px-4">
                              <div className="grid lg:grid-cols-3 gap-8">
                                    {packages.map((pkg) => (
                                          <div
                                                key={pkg.id}
                                                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 ${pkg.popular ? 'ring-4 ring-emerald-500 lg:scale-105' : ''}`}
                                          >
                                                {pkg.popular && (
                                                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center py-2 text-sm font-bold">
                                                            ⭐ MOST POPULAR
                                                      </div>
                                                )}
                                                <div className={`relative h-48 ${pkg.popular ? 'mt-8' : ''}`}>
                                                      <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                                                      <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-80`} />
                                                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                                            <h3 className="text-2xl font-bold">{pkg.name}</h3>
                                                            <p className="text-white/80">{pkg.tagline}</p>
                                                      </div>
                                                </div>

                                                <div className="p-6">
                                                      <div className="flex items-end justify-between mb-6">
                                                            <div>
                                                                  <div className="text-3xl font-bold text-gray-800">
                                                                        From <ConvertedPrice amount={pkg.basePrice} fromCurrency="USD" />
                                                                  </div>
                                                                  <div className="text-gray-500">{pkg.duration}</div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                  {pkg.includes.flights && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">✈️ Flights</span>}
                                                                  {pkg.includes.visa && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">📄 Visa</span>}
                                                                  {pkg.includes.insurance && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">🛡️ Insurance</span>}
                                                            </div>
                                                      </div>

                                                      <ul className="space-y-3 mb-6">
                                                            {pkg.features.map((feature, i) => (
                                                                  <li key={i} className="flex items-center gap-3 text-gray-600">
                                                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                                                        <span>{feature}</span>
                                                                  </li>
                                                            ))}
                                                      </ul>

                                                      <Link href="/booking" className={`w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${pkg.color} flex items-center justify-center gap-2 hover:shadow-lg transition-all`}>
                                                            Get Quote
                                                            <ChevronRight className="w-5 h-5" />
                                                      </Link>
                                                </div>
                                          </div>
                                    ))}
                              </div>
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

                  {/* Process */}
                  <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                                    <p className="text-emerald-100">Simple 5-step process from inquiry to recovery</p>
                              </div>
                              <div className="flex flex-wrap justify-center gap-8">
                                    {['Free Consultation', 'Custom Quote', 'Book & Plan', 'Treatment', 'Recover & Return'].map((step, i) => (
                                          <div key={i} className="text-center">
                                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">{i + 1}</div>
                                                <div className="font-medium">{step}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl font-bold text-gray-800 mb-6">Need a Custom Package?</h2>
                              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                    Our medical travel experts can create a tailored package based on your specific treatment and preferences.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/booking" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
                                          <Calendar className="w-5 h-5" /> Request Custom Quote
                                    </Link>
                                    <button className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all inline-flex items-center gap-2">
                                          <Phone className="w-5 h-5" /> Call Us Now
                                    </button>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default PackagesPage;
