"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
      Sparkles, Droplets, Heart, Moon, Sun, Clock, Star, ChevronRight,
      CheckCircle, MapPin, Gem, Flower2, Waves, Wind
} from 'lucide-react';
import { Header, Footer } from '@/app/components/common';
import { ConvertedPrice } from '@/app/components/common/ConvertedPrice';

// Signature Treatments
const signatureTreatments = [
      {
            name: 'Abhyanga Royal Massage',
            duration: '90 min',
            price: 120,
            image: '/images/generated/package_ayurveda_detox_massage_1765430995885.png',
            description: 'Full body Ayurvedic massage with warm herbal oils tailored to your dosha. Includes steam therapy.',
            benefits: ['Deep relaxation', 'Improved circulation', 'Toxin release', 'Muscle relief'],
            category: 'Ayurvedic',
      },
      {
            name: 'Shirodhara Bliss',
            duration: '60 min',
            price: 85,
            image: '/images/generated/ayush_grid_ayurveda_treatment_1765431192823.png',
            description: 'Continuous flow of warm medicated oil on the forehead. Ultimate stress relief and mental calm.',
            benefits: ['Stress relief', 'Better sleep', 'Mental clarity', 'Anxiety reduction'],
            category: 'Ayurvedic',
      },
      {
            name: 'Hot Stone Therapy',
            duration: '75 min',
            price: 95,
            image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800',
            description: 'Heated volcanic stones placed on key energy points combined with massage therapy.',
            benefits: ['Muscle relaxation', 'Pain relief', 'Energy balance', 'Deep warmth'],
            category: 'Western',
      },
      {
            name: 'Ocean Detox Body Wrap',
            duration: '90 min',
            price: 110,
            image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800',
            description: 'Mineral-rich seaweed and marine mud wrap for detoxification and skin rejuvenation.',
            benefits: ['Detoxification', 'Skin toning', 'Mineral absorption', 'Slimming effect'],
            category: 'Marine',
      },
      {
            name: 'Anti-Aging Facial',
            duration: '75 min',
            price: 90,
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
            description: 'Premium facial with collagen-boosting serums, massage, and LED light therapy.',
            benefits: ['Fine line reduction', 'Skin firming', 'Radiant glow', 'Hydration'],
            category: 'Beauty',
      },
      {
            name: 'Thai Aromatherapy',
            duration: '90 min',
            price: 100,
            image: '/images/generated/ayush_hero_traditional_healing_1765431175455.png',
            description: 'Traditional Thai massage techniques with essential oil aromatherapy.',
            benefits: ['Flexibility', 'Energy flow', 'Stress relief', 'Muscle stretch'],
            category: 'Eastern',
      },
];

// Day Spa Packages
const dayPackages = [
      {
            name: 'Half Day Escape',
            duration: '4 hours',
            price: 250,
            includes: ['Welcome drink', '60-min massage', 'Facial', 'Lunch', 'Pool access'],
            popular: false,
      },
      {
            name: 'Full Day Bliss',
            duration: '8 hours',
            price: 450,
            includes: ['Breakfast', 'Body scrub', 'Massage', 'Facial', 'Lunch', 'Manicure/Pedicure', 'Pool & sauna'],
            popular: true,
      },
      {
            name: 'Couples Retreat',
            duration: '4 hours',
            price: 400,
            includes: ['Couples massage', 'Private jacuzzi', 'Champagne', 'Chocolate treats', 'Garden setting'],
            popular: false,
      },
];

// Premium Spas
const premiumSpas = [
      {
            name: 'Ananda Spa Heritage',
            type: 'Luxury Heritage',
            rating: 4.9,
            image: '/images/generated/package_french_heritage_villa_1765431092375.png',
            location: 'White Town',
            specialty: 'Colonial luxury with Ayurvedic treatments',
            priceRange: '$$$$',
      },
      {
            name: 'Quiet Healing Centre',
            type: 'Wellness Resort',
            rating: 4.9,
            image: '/images/generated/package_auroville_eco_living_1765431070820.png',
            location: 'Auroville',
            specialty: 'Holistic treatments in nature setting',
            priceRange: '$$$',
      },
      {
            name: 'Ocean Breeze Spa',
            type: 'Beach Resort',
            rating: 4.8,
            image: '/images/generated/package_recovery_beach_resort_1765431053203.png',
            location: 'ECR Beach Road',
            specialty: 'Marine therapies with ocean views',
            priceRange: '$$$',
      },
      {
            name: 'Le Dupleix Spa',
            type: 'Boutique Hotel',
            rating: 4.8,
            image: '/images/generated/dest_hero_french_quarters_1765431332425.png',
            location: 'French Quarter',
            specialty: 'French-Indian fusion treatments',
            priceRange: '$$$$',
      },
];

// Benefits of Spa
const spabenefits = [
      { icon: Heart, title: 'Stress Relief', desc: 'Reduce cortisol and calm the nervous system' },
      { icon: Droplets, title: 'Detoxification', desc: 'Eliminate toxins through skin and lymph' },
      { icon: Moon, title: 'Better Sleep', desc: 'Deep relaxation promotes restful sleep' },
      { icon: Sparkles, title: 'Glowing Skin', desc: 'Nourish and rejuvenate skin health' },
];

// Treatment categories
const categories = ['All', 'Ayurvedic', 'Western', 'Marine', 'Beauty', 'Eastern'];

const SpaRejuvenationPage = () => {
      const [selectedCategory, setSelectedCategory] = useState('All');

      const filteredTreatments = selectedCategory === 'All'
            ? signatureTreatments
            : signatureTreatments.filter(t => t.category === selectedCategory);

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero Section - Luxury Aesthetic */}
                  <section className="relative min-h-[70vh] flex items-center pt-20">
                        <div className="absolute inset-0">
                              <Image
                                    src="/images/generated/wellness_page_hero_retreat_1765430977781.png"
                                    alt="Luxury Spa"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-purple-800/80 to-transparent" />
                        </div>

                        <div className="relative container mx-auto px-6 lg:px-8">
                              <div className="max-w-4xl">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                                          <Gem className="w-5 h-5 text-pink-300" />
                                          <span className="text-white text-sm font-medium">
                                                Luxury Spa & Rejuvenation
                                          </span>
                                    </div>

                                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                                          Indulge in
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                                                Pure Luxury
                                          </span>
                                    </h1>

                                    <p className="text-xl md:text-2xl text-purple-100 leading-relaxed mb-10 max-w-2xl">
                                          World-class spa treatments blending ancient Ayurvedic wisdom with modern luxury.
                                          Rejuvenate body, mind, and soul in Pondicherry&apos;s finest wellness sanctuaries.
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                          <Link
                                                href="#treatments"
                                                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                                          >
                                                View Treatments
                                                <ChevronRight className="w-5 h-5" />
                                          </Link>
                                          <Link
                                                href="#packages"
                                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                                          >
                                                Spa Packages
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Benefits Strip */}
                  <section className="py-10 bg-gradient-to-b from-purple-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {spabenefits.map((item, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                                                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                      <item.icon className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                                                <p className="text-gray-500 text-sm">{item.desc}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Signature Treatments */}
                  <section id="treatments" className="py-12 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Signature Treatments
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                                          Curated spa experiences for ultimate relaxation and rejuvenation
                                    </p>

                                    {/* Category Filter */}
                                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                                          {categories.map((cat) => (
                                                <button
                                                      key={cat}
                                                      onClick={() => setSelectedCategory(cat)}
                                                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                                            ? 'bg-purple-500 text-white'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                >
                                                      {cat}
                                                </button>
                                          ))}
                                    </div>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredTreatments.map((treatment, i) => (
                                          <div
                                                key={i}
                                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group border border-gray-100"
                                          >
                                                <div className="relative h-52">
                                                      <Image
                                                            src={treatment.image}
                                                            alt={treatment.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                      />
                                                      <div className="absolute top-4 left-4">
                                                            <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                                                                  {treatment.category}
                                                            </span>
                                                      </div>
                                                </div>

                                                <div className="p-6">
                                                      <div className="flex items-center justify-between mb-3">
                                                            <h3 className="text-xl font-bold text-gray-800">{treatment.name}</h3>
                                                            <div className="text-2xl font-bold text-purple-600">
                                                                  <ConvertedPrice amount={treatment.price} fromCurrency="USD" />
                                                            </div>
                                                      </div>

                                                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                                            <Clock className="w-4 h-4" />
                                                            {treatment.duration}
                                                      </div>

                                                      <p className="text-gray-600 text-sm mb-4">{treatment.description}</p>

                                                      <div className="flex flex-wrap gap-2">
                                                            {treatment.benefits.map((benefit, j) => (
                                                                  <span key={j} className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                                                                        {benefit}
                                                                  </span>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Day Spa Packages */}
                  <section id="packages" className="py-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Day Spa Packages</h2>
                                    <p className="text-xl text-purple-100">Complete spa experiences for ultimate pampering</p>
                              </div>

                              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                    {dayPackages.map((pkg, i) => (
                                          <div
                                                key={i}
                                                className={`bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 relative ${pkg.popular ? 'ring-2 ring-white scale-105' : ''
                                                      }`}
                                          >
                                                {pkg.popular && (
                                                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-purple-600 px-4 py-1 rounded-full text-sm font-bold">
                                                            Most Popular
                                                      </div>
                                                )}

                                                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                                                <div className="flex items-center gap-2 text-purple-200 mb-4">
                                                      <Clock className="w-4 h-4" />
                                                      {pkg.duration}
                                                </div>

                                                <div className="text-4xl font-bold mb-6">
                                                      <ConvertedPrice amount={pkg.price} fromCurrency="USD" />
                                                </div>

                                                <ul className="space-y-3 mb-8">
                                                      {pkg.includes.map((item, j) => (
                                                            <li key={j} className="flex items-center gap-2 text-purple-100">
                                                                  <CheckCircle className="w-5 h-5 text-pink-300 shrink-0" />
                                                                  {item}
                                                            </li>
                                                      ))}
                                                </ul>

                                                <Link
                                                      href="/booking"
                                                      className="block w-full text-center py-3 rounded-xl bg-white text-purple-600 font-semibold hover:shadow-lg transition-all"
                                                >
                                                      Book Package
                                                </Link>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Premium Spas */}
                  <section className="py-12 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
                                          <Flower2 className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Premium Partners</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Top-Rated Spas in Pondicherry
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Hand-picked luxury spa destinations for an unforgettable experience
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {premiumSpas.map((spa, i) => (
                                          <div
                                                key={i}
                                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                                          >
                                                <div className="relative h-48">
                                                      <Image
                                                            src={spa.image}
                                                            alt={spa.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                      />
                                                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                                                            <span className="font-bold text-sm">{spa.rating}</span>
                                                      </div>
                                                </div>

                                                <div className="p-5">
                                                      <div className="text-sm text-purple-600 font-medium mb-1">{spa.type}</div>
                                                      <h3 className="text-lg font-bold text-gray-800 mb-2">{spa.name}</h3>
                                                      <p className="text-gray-500 text-sm mb-3">{spa.specialty}</p>
                                                      <div className="flex items-center justify-between text-sm">
                                                            <div className="flex items-center gap-1 text-gray-500">
                                                                  <MapPin className="w-4 h-4" />
                                                                  {spa.location}
                                                            </div>
                                                            <span className="text-purple-600 font-medium">{spa.priceRange}</span>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-12 bg-gradient-to-b from-purple-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                    Ready to Rejuvenate?
                              </h2>
                              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                                    Book your spa experience and discover the ultimate relaxation in Pondicherry&apos;s finest wellness sanctuaries.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link
                                          href="/booking"
                                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                    >
                                          Book Spa Treatment
                                    </Link>
                                    <Link
                                          href="/wellness"
                                          className="bg-gray-100 text-gray-700 px-10 py-5 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300"
                                    >
                                          Multi-Day Retreats
                                    </Link>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default SpaRejuvenationPage;
