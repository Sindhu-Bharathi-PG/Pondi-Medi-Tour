"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Sun, Utensils, Camera, Waves, TreePine, Building2, Sparkles, Heart, Star, Calendar, Clock, Plane, Hotel, Car, ChevronRight, Globe, Award } from 'lucide-react';
import { Header, Footer } from '@/app/components/common';
import { useScrolled } from '@/app/hooks';

const DestinationPage = () => {
      const scrolled = useScrolled(50);

      const attractions = [
            {
                  name: 'Auroville - City of Dawn',
                  image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
                  category: 'Spiritual',
                  description: 'Explore the experimental township and the magnificent Matrimandir golden dome.',
                  distance: '12 km from city'
            },
            {
                  name: 'French Quarter (White Town)',
                  image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
                  category: 'Heritage',
                  description: 'Stroll through charming colonial streets with French architecture and boutique cafes.',
                  distance: 'City center'
            },
            {
                  name: 'Promenade Beach',
                  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                  category: 'Beach',
                  description: 'Sunrise walks along the 1.5km stretch with stunning Bay of Bengal views.',
                  distance: 'City center'
            },
            {
                  name: 'Paradise Beach',
                  image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
                  category: 'Beach',
                  description: 'Pristine golden sands accessible only by boat - perfect for peaceful recovery.',
                  distance: '8 km from city'
            },
            {
                  name: 'Sri Aurobindo Ashram',
                  image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
                  category: 'Spiritual',
                  description: 'Find inner peace at one of India\'s most renowned spiritual centers.',
                  distance: 'City center'
            },
            {
                  name: 'Botanical Garden',
                  image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
                  category: 'Nature',
                  description: '22-acre garden with exotic plants, perfect for healing walks.',
                  distance: '4 km from city'
            }
      ];

      const cuisine = [
            { name: 'French Cuisine', desc: 'Authentic French restaurants in White Town' },
            { name: 'Tamil Delicacies', desc: 'Traditional South Indian flavors' },
            { name: 'Fusion Dining', desc: 'Unique Indo-French culinary experiences' },
            { name: 'Health Food', desc: 'Organic cafes near Auroville' }
      ];

      const accommodations = [
            {
                  name: 'Heritage Boutique Hotels',
                  type: 'Luxury',
                  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
                  priceRange: '$150-400/night',
                  features: ['French Colonial Style', 'Private Gardens', 'Fine Dining']
            },
            {
                  name: 'Beach Resorts',
                  type: 'Premium',
                  image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600',
                  priceRange: '$100-250/night',
                  features: ['Ocean Views', 'Pools', 'Spa Services']
            },
            {
                  name: 'Recovery Retreats',
                  type: 'Wellness',
                  image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
                  priceRange: '$80-180/night',
                  features: ['Medical Support', 'Healthy Cuisine', 'Therapy Sessions']
            }
      ];

      return (
            <div className="min-h-screen bg-white">
                  <Header scrolled={scrolled} />

                  {/* Hero Section */}
                  <section className="relative h-screen min-h-[700px] flex items-center">
                        <div className="absolute inset-0">
                              <Image
                                    src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920"
                                    alt="Pondicherry"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                        </div>

                        <div className="relative container mx-auto px-4">
                              <div className="max-w-3xl">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <MapPin className="w-5 h-5 text-amber-400" />
                                          <span className="text-white text-sm font-medium">French Riviera of the East</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                          Discover
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                                                Pondicherry
                                          </span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 max-w-2xl">
                                          Where French colonial charm meets serene beaches, ancient spirituality, and world-class healthcare.
                                          The perfect destination for medical tourism and holistic healing.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                          <Link href="/booking" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                                                Plan Your Journey
                                                <ChevronRight className="w-5 h-5" />
                                          </Link>
                                          <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2">
                                                <Camera className="w-5 h-5" />
                                                View Gallery
                                          </button>
                                    </div>
                              </div>
                        </div>

                        {/* Floating Stats */}
                        <div className="absolute bottom-8 left-0 right-0">
                              <div className="container mx-auto px-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                          {[
                                                { icon: Sun, value: '300+', label: 'Sunny Days/Year' },
                                                { icon: Waves, value: '35 km', label: 'Pristine Coastline' },
                                                { icon: Building2, value: '18th C', label: 'French Heritage' },
                                                { icon: Heart, value: '50+', label: 'NABH Hospitals' }
                                          ].map((stat, i) => (
                                                <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white text-center">
                                                      <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                                                      <div className="text-2xl font-bold">{stat.value}</div>
                                                      <div className="text-sm text-gray-300">{stat.label}</div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Why Pondicherry for Medical Tourism */}
                  <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-6">
                                          <Globe className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Why Choose Pondicherry</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          The Perfect Medical Tourism Destination
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          Pondicherry uniquely combines world-class healthcare with a healing environment you won&apos;t find anywhere else.
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                          {
                                                icon: Award,
                                                title: 'World-Class Healthcare',
                                                points: ['NABH & JCI accredited hospitals', 'Internationally trained specialists', 'Latest medical technology', '60-80% cost savings']
                                          },
                                          {
                                                icon: Sparkles,
                                                title: 'Unique Healing Environment',
                                                points: ['Tranquil beaches for recovery', 'Spiritual retreat centers', 'Year-round pleasant climate', 'Low pollution, clean air']
                                          },
                                          {
                                                icon: MapPin,
                                                title: 'Rich Cultural Experience',
                                                points: ['French colonial heritage', 'Authentic local cuisine', 'Auroville spiritual community', 'Safe & welcoming locals']
                                          }
                                    ].map((item, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
                                                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                                                      <item.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                                                <ul className="space-y-3">
                                                      {item.points.map((point, j) => (
                                                            <li key={j} className="flex items-center gap-3 text-gray-600">
                                                                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                                                  {point}
                                                            </li>
                                                      ))}
                                                </ul>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Attractions */}
                  <section className="py-24 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Explore During Your Recovery
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Turn your medical journey into a memorable experience with these nearby attractions
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {attractions.map((place, i) => (
                                          <div key={i} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
                                                <div className="relative h-56 overflow-hidden">
                                                      <Image
                                                            src={place.image}
                                                            alt={place.name}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                      <div className="absolute top-4 left-4">
                                                            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                                  {place.category}
                                                            </span>
                                                      </div>
                                                      <div className="absolute bottom-4 left-4 right-4 text-white">
                                                            <h3 className="text-xl font-bold mb-1">{place.name}</h3>
                                                            <div className="flex items-center gap-1 text-sm text-gray-200">
                                                                  <MapPin className="w-4 h-4" />
                                                                  {place.distance}
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="p-5">
                                                      <p className="text-gray-600">{place.description}</p>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Cuisine */}
                  <section className="py-24 bg-gradient-to-r from-amber-600 to-orange-500 text-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-16 items-center">
                                    <div>
                                          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                                                <Utensils className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Culinary Delights</span>
                                          </div>
                                          <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                                Savor Unique Indo-French Flavors
                                          </h2>
                                          <p className="text-xl text-amber-100 mb-8">
                                                Pondicherry&apos;s cuisine is as unique as its heritage - a delicious blend of French and Tamil culinary traditions.
                                          </p>
                                          <div className="grid grid-cols-2 gap-4">
                                                {cuisine.map((item, i) => (
                                                      <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                                                            <h4 className="font-bold mb-1">{item.name}</h4>
                                                            <p className="text-sm text-amber-100">{item.desc}</p>
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
                                                className="rounded-2xl shadow-2xl"
                                          />
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Accommodations */}
                  <section className="py-24 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Recovery Accommodations
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          From heritage villas to beachfront resorts - find the perfect place to heal and rejuvenate
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-3 gap-8">
                                    {accommodations.map((acc, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                                                <div className="relative h-56">
                                                      <Image
                                                            src={acc.image}
                                                            alt={acc.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                      />
                                                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-amber-600">
                                                            {acc.type}
                                                      </div>
                                                </div>
                                                <div className="p-6">
                                                      <h3 className="text-xl font-bold text-gray-800 mb-2">{acc.name}</h3>
                                                      <div className="text-2xl font-bold text-amber-600 mb-4">{acc.priceRange}</div>
                                                      <div className="flex flex-wrap gap-2">
                                                            {acc.features.map((f, j) => (
                                                                  <span key={j} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
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

                  {/* Travel Info */}
                  <section className="py-24 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Getting Here</h2>
                                    <p className="text-xl text-gray-600">We make your travel seamless and stress-free</p>
                              </div>

                              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                    {[
                                          { icon: Plane, title: 'By Air', desc: 'Chennai Airport (2.5 hrs) or upcoming Puducherry Airport. We arrange airport pickup.' },
                                          { icon: Hotel, title: 'Visa Assistance', desc: 'We provide medical visa invitation letters and complete documentation support.' },
                                          { icon: Car, title: 'Local Transport', desc: 'Dedicated vehicle and driver throughout your stay for hospital visits and sightseeing.' }
                                    ].map((item, i) => (
                                          <div key={i} className="text-center">
                                                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                                      <item.icon className="w-10 h-10 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                                <p className="text-gray-600">{item.desc}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Ready to Experience Pondicherry?
                              </h2>
                              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Combine your medical treatment with an unforgettable journey. Let us plan your complete experience.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/booking" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all">
                                          Plan My Journey
                                    </Link>
                                    <Link href="/wellness" className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all">
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
