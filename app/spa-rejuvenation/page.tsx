"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Droplets, Heart, Moon, Sun, Leaf, Clock, Star, ChevronRight, CheckCircle, MapPin } from 'lucide-react';
import { Header, Footer } from '@/app/components/common';
import { useScrolled } from '@/app/hooks';

const SpaRejuvenationPage = () => {
      const scrolled = useScrolled(50);

      const treatments = [
            {
                  name: 'Signature Ayurvedic Spa',
                  duration: '90 min',
                  price: '$120',
                  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                  description: 'Full body Abhyanga massage with warm herbal oils followed by steam therapy.',
                  benefits: ['Deep relaxation', 'Toxin release', 'Improved circulation', 'Glowing skin']
            },
            {
                  name: 'Shirodhara Bliss',
                  duration: '60 min',
                  price: '$80',
                  image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800',
                  description: 'Continuous flow of warm oil on forehead for deep mental relaxation.',
                  benefits: ['Stress relief', 'Better sleep', 'Mental clarity', 'Hair nourishment']
            },
            {
                  name: 'Balinese Retreat',
                  duration: '120 min',
                  price: '$150',
                  image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
                  description: 'Combines deep tissue massage, aromatherapy, and hot stone therapy.',
                  benefits: ['Muscle tension relief', 'Energy balance', 'Aromatherapy benefits', 'Full relaxation']
            },
            {
                  name: 'Ocean Detox Wrap',
                  duration: '75 min',
                  price: '$95',
                  image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800',
                  description: 'Seaweed body wrap with mineral-rich ocean extracts for detoxification.',
                  benefits: ['Detoxification', 'Skin toning', 'Mineral absorption', 'Inch loss']
            },
      ];

      const packages = [
            { name: 'Half Day Escape', duration: '4 hours', price: '$250', treatments: 3 },
            { name: 'Full Day Bliss', duration: '8 hours', price: '$450', treatments: 5 },
            { name: 'Weekend Retreat', duration: '2 days', price: '$800', treatments: 8 },
      ];

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero */}
                  <section className="relative h-screen min-h-[700px] flex items-center">
                        <div className="absolute inset-0">
                              <Image src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920" alt="Spa" fill className="object-cover" priority />
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-800/70 to-transparent" />
                        </div>
                        <div className="relative container mx-auto px-4">
                              <div className="max-w-3xl">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <Sparkles className="w-5 h-5 text-pink-300" />
                                          <span className="text-white text-sm font-medium">Luxury Wellness • World-Class Spas</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                                          Spa &
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">Rejuvenation</span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl">
                                          Indulge in world-class spa treatments that blend ancient Ayurvedic wisdom with modern luxury.
                                          Your journey to complete relaxation begins here.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                          <Link href="/booking" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
                                                Book Spa Experience <ChevronRight className="w-5 h-5" />
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Benefits */}
                  <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-4 gap-6">
                                    {[
                                          { icon: Heart, title: 'Stress Relief', desc: 'Melt away tension' },
                                          { icon: Droplets, title: 'Detoxification', desc: 'Cleanse body & mind' },
                                          { icon: Moon, title: 'Better Sleep', desc: 'Deep relaxation' },
                                          { icon: Sparkles, title: 'Glowing Skin', desc: 'Natural radiance' },
                                    ].map((item, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all hover:-translate-y-2">
                                                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                      <item.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                                <p className="text-gray-600">{item.desc}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Treatments */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Signature Treatments</h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Curated experiences for ultimate relaxation</p>
                              </div>
                              <div className="grid md:grid-cols-2 gap-8">
                                    {treatments.map((treatment, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all flex">
                                                <div className="relative w-1/3 min-h-[250px]">
                                                      <Image src={treatment.image} alt={treatment.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 p-6">
                                                      <div className="flex items-center justify-between mb-2">
                                                            <h3 className="text-xl font-bold text-gray-800">{treatment.name}</h3>
                                                            <span className="text-2xl font-bold text-purple-600">{treatment.price}</span>
                                                      </div>
                                                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                                            <Clock className="w-4 h-4" />{treatment.duration}
                                                      </div>
                                                      <p className="text-gray-600 text-sm mb-4">{treatment.description}</p>
                                                      <div className="flex flex-wrap gap-2">
                                                            {treatment.benefits.map((b, j) => (
                                                                  <span key={j} className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">{b}</span>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Packages */}
                  <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold mb-4">Spa Packages</h2>
                                    <p className="text-purple-100 text-xl">Complete wellness experiences</p>
                              </div>
                              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                    {packages.map((pkg, i) => (
                                          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
                                                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                                                <div className="text-3xl font-bold text-pink-300 mb-2">{pkg.price}</div>
                                                <p className="text-purple-100 mb-4">{pkg.duration} • {pkg.treatments} treatments</p>
                                                <Link href="/booking" className="block w-full py-3 rounded-xl bg-white text-purple-600 font-semibold hover:shadow-lg transition-all">
                                                      Book Package
                                                </Link>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Rejuvenate?</h2>
                              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                    Book your spa experience and discover the ultimate relaxation in Pondicherry.
                              </p>
                              <Link href="/booking" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all">
                                    Book Spa Treatment
                              </Link>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default SpaRejuvenationPage;
