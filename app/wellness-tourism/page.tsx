"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';
import {
      Leaf, Sun, Heart, Brain, Users, TreePine, Globe, Sparkles,
      ChevronRight, ArrowRight, CheckCircle, Star, Waves, Moon,
      Wind, Droplets, Mountain, Flower
} from 'lucide-react';

// Five Dimensions of Wellness
const wellnessDimensions = [
      { icon: Heart, title: 'Physical', desc: 'Fitness, nutrition, sleep optimization, recovery', examples: ['Yoga', 'Hiking', 'Spa', 'Massage'], color: 'from-red-500 to-pink-500' },
      { icon: Brain, title: 'Mental', desc: 'Stress reduction, cognitive enhancement, emotional resilience', examples: ['Meditation', 'Mindfulness', 'Therapy'], color: 'from-purple-500 to-indigo-500' },
      { icon: Sun, title: 'Spiritual', desc: 'Meditation, contemplation, sacred journeys', examples: ['Ashrams', 'Temples', 'Philosophy'], color: 'from-amber-500 to-orange-500' },
      { icon: Users, title: 'Social', desc: 'Community engagement, cultural exchange', examples: ['Auroville', 'Workshops', 'Retreats'], color: 'from-blue-500 to-cyan-500' },
      { icon: TreePine, title: 'Environmental', desc: 'Nature immersion, sustainability practices', examples: ['Forest bathing', 'Eco-lodges', 'Organic farms'], color: 'from-green-500 to-emerald-500' },
];

// AYUSH Offerings
const ayushOfferings = [
      { name: 'Ayurveda', age: '5,000+ years', desc: 'Science of life, balance of three doshas', treatments: ['Abhyanga', 'Panchakarma', 'Shirodhara'], conditions: 'Arthritis, diabetes, stress, skin', duration: '7-21 days', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400' },
      { name: 'Yoga', age: 'Ancient tradition', desc: 'Union of body, mind, spirit', treatments: ['Hatha', 'Vinyasa', 'Kundalini', 'Ashtanga'], conditions: 'Flexibility, strength, mental clarity', duration: '1 hour - 14 days', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400' },
      { name: 'Naturopathy', age: 'Natural healing', desc: 'Healing through natural elements', treatments: ['Mud therapy', 'Hydrotherapy', 'Herbal'], conditions: 'Detox, chronic disease, lifestyle', duration: '3-7 weeks', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400' },
      { name: 'Siddha Medicine', age: 'Tamil tradition', desc: 'Ancient Tamil healing with herbs & minerals', treatments: ['Herbal remedies', 'Pulse diagnosis'], conditions: 'Chronic illnesses', duration: 'As prescribed', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400' },
];

// Comparison: Medical vs Wellness
const comparisonData = [
      { aspect: 'Primary Goal', medical: 'Treat illness/procedure', wellness: 'Maintain/enhance health' },
      { aspect: 'Healthcare Component', medical: 'Doctor-guided treatment', wellness: 'Self-care + instructor-led' },
      { aspect: 'Duration', medical: '2-12 weeks', wellness: '3-30 days' },
      { aspect: 'Facilities', medical: 'Hospital + accommodation', wellness: 'Resorts, retreats, studios' },
      { aspect: 'Cost Range', medical: '$2K-$50K', wellness: '$1K-$10K' },
      { aspect: 'Insurance', medical: 'Often covered', wellness: 'Rarely covered' },
];

// Pondicherry Attractions
const pondicherryAttractions = [
      { name: 'Auroville', desc: 'UNESCO recognized spiritual community', icon: Sun, type: 'Spiritual' },
      { name: 'Sri Aurobindo Ashram', desc: 'World-famous meditation center', icon: Moon, type: 'Spiritual' },
      { name: 'Paradise Beach', desc: 'Pristine coastal wellness', icon: Waves, type: 'Nature' },
      { name: '50+ AYUSH Centers', desc: 'Certified wellness providers', icon: Leaf, type: 'Wellness' },
];

// Pre-built Packages
const packages = [
      { name: '7-Day Ayurvedic Detox', includes: ['Daily massage', 'Herbal treatments', 'Meditation', 'Sattvic diet'], price: '$1,200-1,500' },
      { name: '14-Day Yoga Immersion', includes: ['2hr morning yoga', '1hr evening yoga', 'Ashram meditation', 'Beach walks'], price: '$1,500-2,000' },
      { name: '21-Day Complete Rejuvenation', includes: ['Ayurveda + Yoga', 'Naturopathy', 'Intensive schedule', 'Lifestyle coaching'], price: '$2,500-3,500' },
];

// Destination Comparison
const destinationComparison = [
      { dest: 'Pondicherry', cost: '$100-200/day', authenticity: 'Highest', spiritual: 'Very High', beach: 'Yes', verdict: 'Best value + authentic' },
      { dest: 'Bali', cost: '$80-150/day', authenticity: 'Medium', spiritual: 'High', beach: 'Yes', verdict: 'Crowded' },
      { dest: 'Thailand', cost: '$60-100/day', authenticity: 'Medium', spiritual: 'Medium', beach: 'Yes', verdict: 'Party focus' },
      { dest: 'Costa Rica', cost: '$150-250/day', authenticity: 'Medium', spiritual: 'Low', beach: 'Yes', verdict: 'No AYUSH' },
];

export default function WellnessTourismPage() {
      const scrolled = useScrolled(50);
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
            setIsVisible(true);
      }, []);

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero */}
                  <section className="relative pt-24 pb-20 bg-gradient-to-br from-amber-800 via-orange-700 to-amber-800 overflow-hidden">
                        <div className="absolute inset-0">
                              <Image src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920" alt="Wellness" fill className="object-cover opacity-20" priority />
                        </div>
                        <div className="relative container mx-auto px-4 pt-16">
                              <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <Sparkles className="w-4 h-4 text-amber-300" />
                                          <span className="text-amber-100 text-sm font-medium">Holistic Healing Journey</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                          Understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300">Wellness Tourism</span>
                                    </h1>
                                    <p className="text-xl text-amber-100 mb-10 max-w-3xl mx-auto">
                                          India ranks 7th globally in wellness tourism with $16.3 billion annual revenue. Discover ancient healing traditions in the spiritual haven of Pondicherry.
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* Definition */}
                  <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 -mt-20 relative z-10 border-l-4 border-amber-500">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">What is Wellness Tourism?</h2>
                                    <p className="text-xl text-gray-600 leading-relaxed">
                                          <strong>Wellness Tourism</strong> is travel to maintain, enhance, or improve personal well-being through activities, services, and destinations focused on physical, mental, spiritual, social, and environmental wellness—whether as a primary or secondary purpose of the trip.
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* Five Dimensions */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Five Dimensions of Wellness</h2>
                                    <p className="text-xl text-gray-600">Holistic health encompasses all aspects of your being</p>
                              </div>
                              <div className="grid md:grid-cols-5 gap-6">
                                    {wellnessDimensions.map((dim, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-2">
                                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${dim.color} flex items-center justify-center mx-auto mb-4`}>
                                                      <dim.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-800 mb-2">{dim.title}</h3>
                                                <p className="text-gray-600 text-sm mb-4">{dim.desc}</p>
                                                <div className="flex flex-wrap justify-center gap-1">
                                                      {dim.examples.map((ex, j) => (
                                                            <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{ex}</span>
                                                      ))}
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Global Market */}
                  <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold mb-4">Global Market & India&apos;s Position</h2>
                              </div>
                              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                                    {[
                                          { value: '$639B', label: 'Global Market Size' },
                                          { value: '7th', label: 'India\'s Global Rank' },
                                          { value: '56M', label: 'Annual Wellness Trips (India)' },
                                          { value: '$16.3B', label: 'India\'s Annual Revenue' },
                                    ].map((stat, i) => (
                                          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                                <div className="text-amber-200 text-sm">{stat.label}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Medical vs Wellness */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Wellness vs Medical Tourism</h2>
                                    <p className="text-xl text-gray-600">Key differences to understand</p>
                              </div>
                              <div className="overflow-x-auto max-w-4xl mx-auto">
                                    <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                                          <thead>
                                                <tr className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                                                      <th className="px-6 py-4 text-left">Aspect</th>
                                                      <th className="px-6 py-4 text-center">Medical Tourism</th>
                                                      <th className="px-6 py-4 text-center">Wellness Tourism</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {comparisonData.map((row, i) => (
                                                      <tr key={i} className={`border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                                            <td className="px-6 py-4 font-medium text-gray-800">{row.aspect}</td>
                                                            <td className="px-6 py-4 text-center text-gray-600">{row.medical}</td>
                                                            <td className="px-6 py-4 text-center text-amber-700 font-medium">{row.wellness}</td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </section>

                  {/* AYUSH Offerings */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
                                          <Leaf className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Unique to India</span>
                                    </div>
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">AYUSH Wellness Offerings</h2>
                                    <p className="text-xl text-gray-600">Ancient healing systems only authentic in India</p>
                              </div>
                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {ayushOfferings.map((item, i) => (
                                          <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                                                <div className="relative h-40">
                                                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                      <div className="absolute bottom-4 left-4 text-white">
                                                            <h3 className="text-xl font-bold">{item.name}</h3>
                                                            <p className="text-xs text-amber-300">{item.age}</p>
                                                      </div>
                                                </div>
                                                <div className="p-5">
                                                      <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                                                      <div className="flex flex-wrap gap-1 mb-3">
                                                            {item.treatments.slice(0, 3).map((t, j) => (
                                                                  <span key={j} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">{t}</span>
                                                            ))}
                                                      </div>
                                                      <div className="text-sm text-gray-500">
                                                            <p><strong>Duration:</strong> {item.duration}</p>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Pondicherry Attractions */}
                  <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900 text-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold mb-4">Pondicherry-Specific Attractions</h2>
                              </div>
                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                                    {pondicherryAttractions.map((attr, i) => (
                                          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all">
                                                <attr.icon className="w-10 h-10 text-amber-300 mx-auto mb-4" />
                                                <h3 className="font-bold text-lg mb-2">{attr.name}</h3>
                                                <p className="text-purple-200 text-sm">{attr.desc}</p>
                                                <span className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full">{attr.type}</span>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Pre-built Packages */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Pre-Built Wellness Packages</h2>
                              </div>
                              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                    {packages.map((pkg, i) => (
                                          <div key={i} className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all">
                                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{pkg.name}</h3>
                                                <ul className="space-y-2 mb-6">
                                                      {pkg.includes.map((item, j) => (
                                                            <li key={j} className="flex items-center gap-2 text-gray-600">
                                                                  <CheckCircle className="w-4 h-4 text-amber-500" />
                                                                  {item}
                                                            </li>
                                                      ))}
                                                </ul>
                                                <div className="text-3xl font-bold text-amber-600 mb-4">{pkg.price}</div>
                                                <Link href="/packages" className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all">
                                                      View Details <ChevronRight className="w-5 h-5" />
                                                </Link>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Destination Comparison */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Pondicherry Over Others?</h2>
                              </div>
                              <div className="overflow-x-auto">
                                    <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
                                          <thead>
                                                <tr className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                                                      <th className="px-4 py-3 text-left">Destination</th>
                                                      <th className="px-4 py-3 text-center">Cost/Day</th>
                                                      <th className="px-4 py-3 text-center">Authenticity</th>
                                                      <th className="px-4 py-3 text-center">Spiritual</th>
                                                      <th className="px-4 py-3 text-center">Beach</th>
                                                      <th className="px-4 py-3 text-center">Verdict</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {destinationComparison.map((row, i) => (
                                                      <tr key={i} className={`border-b ${i === 0 ? 'bg-amber-50' : i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                                            <td className="px-4 py-3 font-medium">{row.dest} {i === 0 && <Star className="w-4 h-4 inline text-amber-500 fill-current" />}</td>
                                                            <td className="px-4 py-3 text-center">{row.cost}</td>
                                                            <td className="px-4 py-3 text-center">{row.authenticity}</td>
                                                            <td className="px-4 py-3 text-center">{row.spiritual}</td>
                                                            <td className="px-4 py-3 text-center">{row.beach}</td>
                                                            <td className="px-4 py-3 text-center text-sm">{row.verdict}</td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">Begin Your Wellness Journey</h2>
                              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                    Experience the transformative power of ancient healing in Pondicherry.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/wellness" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-10 py-5 rounded-full font-semibold text-xl hover:shadow-2xl transition-all">
                                          Browse Wellness Packages <ArrowRight className="w-6 h-6" />
                                    </Link>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
