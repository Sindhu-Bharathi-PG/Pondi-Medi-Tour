"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';
import {
      Globe, Heart, Sparkles, Leaf, DollarSign, Award, Clock, Shield,
      Users, Plane, ChevronRight, ArrowRight, CheckCircle, TrendingUp,
      Building2, Star, Play
} from 'lucide-react';

// Treatment Categories
const treatmentCategories = [
      {
            icon: Heart,
            title: 'Curative / Restorative',
            description: 'Advanced procedures to treat serious medical conditions',
            examples: ['Cardiac surgery', 'Organ transplant', 'Joint replacement', 'Cancer treatment', 'Spine surgery'],
            why: 'Advanced procedures, shorter wait times, specialist access',
            recovery: '2-12 weeks',
            color: 'from-red-500 to-pink-500',
      },
      {
            icon: Sparkles,
            title: 'Rejuvenation & Aesthetic',
            description: 'Cosmetic and beauty enhancement procedures',
            examples: ['Cosmetic surgery', 'Hair transplant', 'Spa treatments', 'Dental cosmetics'],
            why: 'Expert surgeons, affordability, privacy, combined wellness',
            recovery: '1-4 weeks',
            color: 'from-purple-500 to-pink-500',
      },
      {
            icon: Leaf,
            title: 'Traditional Medicine / AYUSH',
            description: 'Ancient healing wisdom for holistic wellness',
            examples: ['Ayurvedic treatment', 'Yoga therapy', 'Naturopathy', 'Meditation programs'],
            why: 'Ancient wisdom, holistic healing, no side effects',
            recovery: '7-30 days',
            color: 'from-green-500 to-emerald-500',
      },
];

// Global Market Data
const topDestinations = [
      { country: 'Thailand', patients: '3M+', flag: '🇹🇭' },
      { country: 'Mexico', patients: '2M+', flag: '🇲🇽' },
      { country: 'Singapore', patients: '1M+', flag: '🇸🇬' },
      { country: 'India', patients: '700K+', flag: '🇮🇳' },
      { country: 'Malaysia', patients: '800K', flag: '🇲🇾' },
];

// Source Countries
const sourceCountries = [
      { country: 'USA', reason: 'Cost savings + diaspora', volume: '2,000+/year', flag: '🇺🇸' },
      { country: 'UK', reason: 'NABH/JCI accreditation', volume: '1,500+/year', flag: '🇬🇧' },
      { country: 'Australia', reason: 'Proximity (shorter flight)', volume: '1,200+/year', flag: '🇦🇺' },
      { country: 'Middle East', reason: 'Affordable excellence', volume: '3,000+/year', flag: '🇦🇪' },
      { country: 'Canada', reason: 'High wait times at home', volume: '800+/year', flag: '🇨🇦' },
      { country: 'NRI Diaspora', reason: 'Home + treatment', volume: '5,000+/year', flag: '🇮🇳' },
];

// Success Rates
const successRates = [
      { procedure: 'Cardiac surgery', rate: '98.5%', detail: 'success, <1% mortality' },
      { procedure: 'Joint replacement', rate: '95%+', detail: 'satisfaction at 5 years' },
      { procedure: 'IVF', rate: '40-50%', detail: 'live birth (age <35)' },
      { procedure: 'Cataract surgery', rate: '99%+', detail: 'vision improvement' },
];

// Cost Savings Examples
const costSavings = [
      { procedure: 'Hip Replacement', usPrice: 35000, pondyPrice: 8500, saving: 26500 },
      { procedure: 'Cardiac Surgery', usPrice: 50000, pondyPrice: 12000, saving: 38000 },
      { procedure: 'IVF Cycle', usPrice: 18000, pondyPrice: 3500, saving: 14500 },
      { procedure: 'Dental Implants', usPrice: 40000, pondyPrice: 8000, saving: 32000 },
];

export default function MedicalTourismPage() {
      const scrolled = useScrolled(50);
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
            const timer = setTimeout(() => setIsVisible(true), 0);
            return () => clearTimeout(timer);
      }, []);

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative pt-24 pb-20 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 overflow-hidden">
                        <div className="absolute inset-0">
                              <Image src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1920" alt="Medical Tourism" fill className="object-cover opacity-20" priority />
                        </div>
                        <div className="relative container mx-auto px-4 pt-16">
                              <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <Globe className="w-4 h-4 text-blue-300" />
                                          <span className="text-blue-100 text-sm font-medium">Global Healthcare Movement</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                          Understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Medical Tourism</span>
                                    </h1>
                                    <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                                          14+ million people cross borders annually for quality healthcare. Learn how you can access world-class treatment while saving up to 70%.
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* Definition Box */}
                  <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 -mt-20 relative z-10 border-l-4 border-blue-500">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">What is Medical Tourism?</h2>
                                    <p className="text-xl text-gray-600 leading-relaxed">
                                          <strong>Medical Tourism</strong> is travel to another country or region specifically to receive medical care,
                                          ranging from curative procedures to wellness enhancements. Patients combine quality healthcare with cost savings
                                          and recovery in a healing environment.
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* Three Categories */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Three Categories of Treatment</h2>
                                    <p className="text-xl text-gray-600">Choose the care that fits your needs</p>
                              </div>
                              <div className="grid md:grid-cols-3 gap-8">
                                    {treatmentCategories.map((cat, i) => (
                                          <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                                                <div className={`h-4 bg-gradient-to-r ${cat.color}`} />
                                                <div className="p-8">
                                                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-6`}>
                                                            <cat.icon className="w-8 h-8 text-white" />
                                                      </div>
                                                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{cat.title}</h3>
                                                      <p className="text-gray-600 mb-6">{cat.description}</p>
                                                      <div className="mb-6">
                                                            <h4 className="text-sm font-semibold text-gray-500 mb-2">EXAMPLES</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                  {cat.examples.map((ex, j) => (
                                                                        <span key={j} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{ex}</span>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      <div className="space-y-2 text-sm">
                                                            <div className="flex items-start gap-2">
                                                                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                                                                  <span className="text-gray-600">{cat.why}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-gray-500">
                                                                  <Clock className="w-4 h-4" />
                                                                  <span>Recovery: {cat.recovery}</span>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Global Market Context */}
                  <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-16 items-center">
                                    <div>
                                          <h2 className="text-4xl font-bold mb-6">Global Market Context</h2>
                                          <div className="space-y-6">
                                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                                                      <div className="flex items-center gap-4">
                                                            <TrendingUp className="w-10 h-10 text-blue-300" />
                                                            <div>
                                                                  <div className="text-3xl font-bold">$60-80 Billion</div>
                                                                  <div className="text-blue-200">Annual Market Size</div>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                                                      <div className="flex items-center gap-4">
                                                            <Users className="w-10 h-10 text-blue-300" />
                                                            <div>
                                                                  <div className="text-3xl font-bold">14+ Million</div>
                                                                  <div className="text-blue-200">Annual Medical Travelers</div>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                                                      <div className="flex items-center gap-4">
                                                            <Award className="w-10 h-10 text-yellow-300" />
                                                            <div>
                                                                  <div className="text-3xl font-bold">10th Globally</div>
                                                                  <div className="text-blue-200">India&apos;s Rank (MTI 2020-21)</div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                                    <div>
                                          <h3 className="text-2xl font-bold mb-6">Top Destinations by Volume</h3>
                                          <div className="space-y-4">
                                                {topDestinations.map((dest, i) => (
                                                      <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                  <span className="text-3xl">{dest.flag}</span>
                                                                  <span className="font-semibold">{dest.country}</span>
                                                            </div>
                                                            <span className="text-xl font-bold">{dest.patients}</span>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Why Patients Choose */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Patients Choose Medical Tourism</h2>
                              </div>
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[
                                          { icon: DollarSign, title: 'Cost Savings', desc: '30-70% reduction on procedures', highlight: 'Save $26,500 on hip replacement vs US', color: 'emerald' },
                                          { icon: Award, title: 'Quality of Care', desc: 'World-class infrastructure, same as developed countries', highlight: 'JIPMER matches AIIMS/top US hospitals', color: 'blue' },
                                          { icon: Clock, title: 'Shorter Wait Times', desc: 'Same-week scheduling vs 6-12 months in developed countries', highlight: 'Immediate emergency care availability', color: 'purple' },
                                          { icon: Leaf, title: 'Wellness Integration', desc: 'Combine surgery with Ayurvedic recovery', highlight: 'Mental & physical healing combined', color: 'amber' },
                                          { icon: Shield, title: 'Privacy & Discretion', desc: 'Confidential treatment away from home', highlight: 'Cultural sensitivity guaranteed', color: 'indigo' },
                                          { icon: Users, title: 'Diaspora Connection', desc: 'Combine care with visiting family', highlight: 'Language & cultural support', color: 'pink' },
                                    ].map((item, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                                                <div className={`w-14 h-14 rounded-xl bg-${item.color}-100 flex items-center justify-center mb-6`}>
                                                      <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                                <p className="text-gray-600 mb-4">{item.desc}</p>
                                                <div className="flex items-center gap-2 text-sm text-emerald-600">
                                                      <CheckCircle className="w-4 h-4" />
                                                      {item.highlight}
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Source Countries */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Source Countries to Pondicherry</h2>
                                    <p className="text-xl text-gray-600">International patients from around the world</p>
                              </div>
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                    {sourceCountries.map((src, i) => (
                                          <div key={i} className="bg-gray-50 rounded-2xl p-6 flex items-center gap-4 hover:bg-emerald-50 transition-all">
                                                <span className="text-4xl">{src.flag}</span>
                                                <div className="flex-1">
                                                      <h4 className="font-bold text-gray-800">{src.country}</h4>
                                                      <p className="text-sm text-gray-500">{src.reason}</p>
                                                </div>
                                                <div className="text-right">
                                                      <div className="text-lg font-bold text-emerald-600">{src.volume}</div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Success Rates & Savings */}
                  <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-16">
                                    {/* Success Rates */}
                                    <div>
                                          <h2 className="text-3xl font-bold mb-8">Success Rates (Pondicherry)</h2>
                                          <div className="space-y-4">
                                                {successRates.map((item, i) => (
                                                      <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-5 flex justify-between items-center">
                                                            <div>
                                                                  <h4 className="font-semibold">{item.procedure}</h4>
                                                                  <p className="text-emerald-200 text-sm">{item.detail}</p>
                                                            </div>
                                                            <div className="text-3xl font-bold">{item.rate}</div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                                    {/* Cost Savings */}
                                    <div>
                                          <h2 className="text-3xl font-bold mb-8">Cost Savings Examples</h2>
                                          <div className="space-y-4">
                                                {costSavings.map((item, i) => (
                                                      <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-5">
                                                            <h4 className="font-semibold mb-3">{item.procedure}</h4>
                                                            <div className="flex justify-between text-sm mb-2">
                                                                  <span className="text-emerald-200">US Price: ${item.usPrice.toLocaleString()}</span>
                                                                  <span className="text-emerald-200">Pondicherry: ${item.pondyPrice.toLocaleString()}</span>
                                                            </div>
                                                            <div className="bg-white/20 rounded-lg p-3 text-center">
                                                                  <span className="text-2xl font-bold">Save ${item.saving.toLocaleString()}</span>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Risk Mitigation */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="max-w-4xl mx-auto">
                                    <div className="text-center mb-12">
                                          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Medical Tourism is Increasingly Safe</h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                          {[
                                                { icon: Shield, title: 'Accreditation', desc: 'International standards (JCI, NABH, ISO)' },
                                                { icon: Globe, title: 'Telemedicine Follow-up', desc: 'Post-operative care via video consultation' },
                                                { icon: Building2, title: 'Insurance Coverage', desc: 'Growing international insurance inclusion' },
                                                { icon: Award, title: 'Legal Framework', desc: 'Clear contracts, transparent pricing, grievance redressal' },
                                          ].map((item, i) => (
                                                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4">
                                                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                            <item.icon className="w-6 h-6 text-emerald-600" />
                                                      </div>
                                                      <div>
                                                            <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">Explore Your Treatment Options</h2>
                              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                    Tell us your procedure need and get matched with specialists in Pondicherry.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/services" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-full font-semibold text-xl hover:shadow-2xl transition-all">
                                          Browse Treatments <ArrowRight className="w-6 h-6" />
                                    </Link>
                                    <Link href="/booking" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full font-semibold text-xl hover:bg-white/20 transition-all">
                                          Free Consultation <ChevronRight className="w-6 h-6" />
                                    </Link>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
