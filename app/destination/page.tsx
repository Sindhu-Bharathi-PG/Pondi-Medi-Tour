"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
      MapPin, Sun, Utensils, Camera, Waves, TreePine, Building2,
      Heart, Calendar, Plane, Hotel, Car, ChevronRight, Globe,
      Clock, ThermometerSun, Languages, CreditCard
} from 'lucide-react';
import { Header, Footer } from '@/app/components/common';

// Key attractions by category
const attractions = {
      heritage: [
            {
                  name: 'French Quarter (White Town)',
                  image: '/images/generated/dest_hero_french_quarters_1765431332425.png',
                  description: 'Colonial-era streets with mustard-yellow buildings, bougainvillea-draped walls, and charming cafes.',
                  highlights: ['Walking tours', 'Boutique shopping', 'French restaurants', 'Art galleries'],
                  distance: 'City center',
            },
            {
                  name: 'Basilica of the Sacred Heart',
                  image: '/images/generated/dest_basilica_sacred_heart_1765431348324.png',
                  description: 'Stunning Gothic church with stained glass windows depicting the life of Jesus.',
                  highlights: ['Gothic architecture', 'Religious art', 'Peaceful gardens'],
                  distance: 'South Boulevard',
            },
      ],
      spiritual: [
            {
                  name: 'Auroville - City of Dawn',
                  image: '/images/generated/dest_auroville_matrimandir_view_1765431367218.png',
                  description: 'UNESCO-recognized experimental township dedicated to human unity. Home to the golden Matrimandir.',
                  highlights: ['Matrimandir meditation', 'Organic farms', 'Sustainable living', 'International community'],
                  distance: '12 km from city',
            },
            {
                  name: 'Sri Aurobindo Ashram',
                  image: '/images/generated/dest_ashram_flower_decoration_1765431383474.png',
                  description: 'World-famous spiritual center for meditation and integral yoga founded in 1926.',
                  highlights: ['Morning meditation', 'Library', 'Samadhi', 'Guest house'],
                  distance: 'White Town',
            },
      ],
      beaches: [
            {
                  name: 'Promenade Beach',
                  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                  description: '1.5 km stretch along the Bay of Bengal. Perfect for sunrise walks and evening strolls.',
                  highlights: ['Sunrise yoga', 'Gandhi statue', 'War memorial', 'Street food'],
                  distance: 'City center',
            },
            {
                  name: 'Paradise Beach',
                  image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
                  description: 'Pristine golden sand beach accessible only by boat. Serene and uncrowded.',
                  highlights: ['Boat ride', 'Swimming', 'Beach huts', 'Seafood'],
                  distance: '8 km (by boat)',
            },
            {
                  name: 'Serenity Beach',
                  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                  description: 'Surfer-friendly beach with waves, beach shacks, and a bohemian vibe.',
                  highlights: ['Surfing lessons', 'Cafes', 'Yoga shalas'],
                  distance: '10 km north',
            },
      ],
};

// Cuisine highlights
const cuisineTypes = [
      { name: 'French', desc: 'Authentic croissants, crêpes, and fine dining in White Town', icon: '🥐' },
      { name: 'Tamil', desc: 'Traditional dosas, filter coffee, and banana leaf meals', icon: '🍛' },
      { name: 'Indo-French Fusion', desc: 'Unique blend found only in Pondicherry', icon: '🍽️' },
      { name: 'Seafood', desc: 'Fresh catch from the Bay of Bengal', icon: '🦐' },
];

// Travel essentials
const travelInfo = [
      { icon: Plane, title: 'Getting Here', items: ['Chennai Airport (150 km, 2.5 hrs)', 'Bengaluru Airport (310 km, 5 hrs)', 'Puducherry Airport (domestic)'] },
      { icon: Languages, title: 'Languages', items: ['Tamil (local)', 'English (widely spoken)', 'French (some areas)', 'Hindi (common)'] },
      { icon: CreditCard, title: 'Currency', items: ['Indian Rupee (INR)', 'Cards widely accepted', 'ATMs available', 'USD/EUR exchange easy'] },
      { icon: ThermometerSun, title: 'Best Time', items: ['October to March (ideal)', 'April-June (hot summer)', 'July-September (monsoon)'] },
];

// Accommodation types
const accommodations = [
      {
            type: 'Heritage Boutiques',
            priceRange: '$80-300/night',
            image: '/images/generated/package_french_heritage_villa_1765431092375.png',
            description: 'Restored French colonial villas in White Town',
            features: ['Antique décor', 'Courtyard gardens', 'French Quarter location'],
      },
      {
            type: 'Beach Resorts',
            priceRange: '$60-200/night',
            image: '/images/generated/package_recovery_beach_resort_1765431053203.png',
            description: 'Oceanfront properties along ECR',
            features: ['Sea views', 'Pool access', 'Spa facilities'],
      },
      {
            type: 'Auroville Guesthouses',
            priceRange: '$30-100/night',
            image: '/images/generated/package_auroville_eco_living_1765431070820.png',
            description: 'Eco-friendly stays in the experimental township',
            features: ['Nature immersion', 'Community dining', 'Sustainable living'],
      },
];

// Quick facts
const quickFacts = [
      { label: 'Population', value: '244,000' },
      { label: 'Area', value: '293 sq km' },
      { label: 'Time Zone', value: 'IST (GMT+5:30)' },
      { label: 'French Rule', value: '1674-1954' },
];

const DestinationPage = () => {
      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative min-h-[70vh] flex items-center pt-20">
                        <div className="absolute inset-0">
                              <Image
                                    src="/images/generated/dest_hero_french_quarters_1765431332425.png"
                                    alt="Pondicherry"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
                        </div>

                        <div className="relative container mx-auto px-6 lg:px-8">
                              <div className="max-w-4xl">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                                          <MapPin className="w-5 h-5 text-amber-400" />
                                          <span className="text-white text-sm font-medium">
                                                French Riviera of the East
                                          </span>
                                    </div>

                                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                                          Discover
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                                                Pondicherry
                                          </span>
                                    </h1>

                                    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-10 max-w-2xl">
                                          Where French colonial charm meets Tamil heritage, spiritual communities,
                                          and pristine beaches. The perfect destination for wellness and cultural exploration.
                                    </p>

                                    {/* Quick Facts */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                          {quickFacts.map((fact, i) => (
                                                <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
                                                      <div className="text-3xl font-bold text-white">{fact.value}</div>
                                                      <div className="text-white/70 text-sm">{fact.label}</div>
                                                </div>
                                          ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                          <Link
                                                href="#explore"
                                                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                                          >
                                                Explore Places
                                                <ChevronRight className="w-5 h-5" />
                                          </Link>
                                          <Link
                                                href="#travel"
                                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                                          >
                                                Travel Info
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* French Heritage Section */}
                  <section id="explore" className="py-12 bg-gradient-to-b from-amber-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-4">
                                          <Building2 className="w-4 h-4" />
                                          <span className="text-sm font-semibold">French Heritage</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Colonial Charm & History
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          Explore 280 years of French influence in architecture, cuisine, and culture
                                    </p>
                              </div>

                              <div className="grid lg:grid-cols-2 gap-8">
                                    {attractions.heritage.map((place, i) => (
                                          <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                                                <div className="grid md:grid-cols-2">
                                                      <div className="relative h-64 md:h-auto">
                                                            <Image src={place.image} alt={place.name} fill className="object-cover" />
                                                      </div>
                                                      <div className="p-6 md:p-8">
                                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{place.name}</h3>
                                                            <div className="flex items-center gap-1 text-sm text-amber-600 mb-3">
                                                                  <MapPin className="w-4 h-4" />
                                                                  {place.distance}
                                                            </div>
                                                            <p className="text-gray-600 mb-4">{place.description}</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                  {place.highlights.map((h, j) => (
                                                                        <span key={j} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">
                                                                              {h}
                                                                        </span>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Spiritual Sites */}
                  <section className="py-12 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
                                          <Sun className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Spiritual Destinations</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Sacred Spaces & Communities
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          World-renowned spiritual centers for meditation and self-discovery
                                    </p>
                              </div>

                              <div className="grid lg:grid-cols-2 gap-8">
                                    {attractions.spiritual.map((place, i) => (
                                          <div key={i} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 hover:shadow-xl transition-all">
                                                <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                                                      <Image src={place.image} alt={place.name} fill className="object-cover" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{place.name}</h3>
                                                <div className="flex items-center gap-1 text-sm text-purple-600 mb-3">
                                                      <MapPin className="w-4 h-4" />
                                                      {place.distance}
                                                </div>
                                                <p className="text-gray-600 mb-4">{place.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                      {place.highlights.map((h, j) => (
                                                            <span key={j} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                                                  {h}
                                                            </span>
                                                      ))}
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Beaches */}
                  <section className="py-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
                                          <Waves className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Coastal Beauty</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                          Pristine Beaches
                                    </h2>
                                    <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
                                          35 km of serene coastline along the Bay of Bengal
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-3 gap-6">
                                    {attractions.beaches.map((beach, i) => (
                                          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:bg-white/20 transition-all">
                                                <div className="relative h-48">
                                                      <Image src={beach.image} alt={beach.name} fill className="object-cover" />
                                                </div>
                                                <div className="p-6">
                                                      <h3 className="text-xl font-bold mb-2">{beach.name}</h3>
                                                      <div className="flex items-center gap-1 text-sm text-cyan-200 mb-3">
                                                            <MapPin className="w-4 h-4" />
                                                            {beach.distance}
                                                      </div>
                                                      <p className="text-cyan-100 text-sm mb-4">{beach.description}</p>
                                                      <div className="flex flex-wrap gap-2">
                                                            {beach.highlights.map((h, j) => (
                                                                  <span key={j} className="bg-white/10 text-white px-3 py-1 rounded-full text-xs">
                                                                        {h}
                                                                  </span>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Cuisine */}
                  <section className="py-12 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    <div>
                                          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
                                                <Utensils className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Culinary Delights</span>
                                          </div>
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                                Unique Indo-French Cuisine
                                          </h2>
                                          <p className="text-xl text-gray-600 mb-8">
                                                Pondicherry&apos;s culinary scene is unlike anywhere else in India -
                                                a delicious fusion of French and Tamil traditions.
                                          </p>

                                          <div className="grid grid-cols-2 gap-4">
                                                {cuisineTypes.map((cuisine, i) => (
                                                      <div key={i} className="bg-orange-50 rounded-xl p-4">
                                                            <div className="text-3xl mb-2">{cuisine.icon}</div>
                                                            <h4 className="font-bold text-gray-800 mb-1">{cuisine.name}</h4>
                                                            <p className="text-gray-600 text-sm">{cuisine.desc}</p>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    <div className="relative">
                                          <Image
                                                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
                                                alt="Cuisine"
                                                width={600}
                                                height={500}
                                                className="rounded-3xl shadow-xl"
                                          />
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Travel Info */}
                  <section id="travel" className="py-12 bg-gradient-to-b from-gray-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Travel Essentials
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Everything you need to know for planning your visit
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                                    {travelInfo.map((info, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                                      <info.icon className="w-6 h-6 text-amber-600" />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-800 mb-3">{info.title}</h3>
                                                <ul className="space-y-2">
                                                      {info.items.map((item, j) => (
                                                            <li key={j} className="text-gray-600 text-sm flex items-start gap-2">
                                                                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                                                                  {item}
                                                            </li>
                                                      ))}
                                                </ul>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Accommodations */}
                  <section className="py-12 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
                                          <Hotel className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Where to Stay</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Accommodation Options
                                    </h2>
                              </div>

                              <div className="grid md:grid-cols-3 gap-8">
                                    {accommodations.map((acc, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                                                <div className="relative h-48">
                                                      <Image src={acc.image} alt={acc.type} fill className="object-cover" />
                                                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full font-bold text-green-600">
                                                            {acc.priceRange}
                                                      </div>
                                                </div>
                                                <div className="p-6">
                                                      <h3 className="text-xl font-bold text-gray-800 mb-2">{acc.type}</h3>
                                                      <p className="text-gray-600 text-sm mb-4">{acc.description}</p>
                                                      <div className="flex flex-wrap gap-2">
                                                            {acc.features.map((f, j) => (
                                                                  <span key={j} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                                                                        {f}
                                                                  </span>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <div className="container mx-auto px-6 lg:px-8 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Ready to Experience Pondicherry?
                              </h2>
                              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                    Combine your wellness journey with an unforgettable exploration of this unique destination.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link
                                          href="/booking"
                                          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                    >
                                          Plan My Visit
                                    </Link>
                                    <Link
                                          href="/wellness"
                                          className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                                    >
                                          View Wellness Packages
                                    </Link>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default DestinationPage;
