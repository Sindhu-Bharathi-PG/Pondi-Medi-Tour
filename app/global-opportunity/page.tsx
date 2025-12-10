"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';
import {
      TrendingUp, Users, Heart, Globe, Clock, DollarSign, Award, Leaf,
      Building2, Star, ChevronRight, ArrowRight, CheckCircle, Target,
      Briefcase, Plane, Shield
} from 'lucide-react';

// Market Growth Drivers
const growthDrivers = [
      { icon: Users, title: 'Aging Populations', desc: 'US 50+ growing at 2.5%/year, Europe avg age 43-45, Japan 25%+ over 65', opportunity: 'High demand for orthopedic/cardiac procedures' },
      { icon: Heart, title: 'Rising Lifestyle Diseases', desc: 'Diabetes, hypertension, obesity increasing 5-10%/year globally', opportunity: 'Preventive wellness + Ayurvedic management' },
      { icon: Clock, title: 'Healthcare Wait Times', desc: 'UK/Canada: 6-12 month waits, Germany: 8-week specialist waits', opportunity: 'Same-week scheduling in Pondicherry' },
      { icon: DollarSign, title: 'Rising Healthcare Costs', desc: 'US costs 2x Europe, 3-4x India. Insurance deductibles increasing', opportunity: 'Cost savings primary driver for patients' },
      { icon: Globe, title: 'Indian Diaspora', desc: '18+ million worldwide, aging diaspora parents 50-65 years', opportunity: 'Combine medical care with family visits' },
      { icon: TrendingUp, title: 'Post-COVID Wellness Surge', desc: '+40% wellness bookings 2021-2024, longer retreat stays', opportunity: 'Telemedicine + in-person hybrid model' },
];

// India's Competitive Advantages
const advantages = [
      { title: 'Medical Excellence + Affordability', desc: 'World-class care at 40-70% lower cost - only India offers this at scale' },
      { title: 'AYUSH Uniqueness', desc: 'Only India offers authentic Ayurveda, yoga at scale - strategic differentiation' },
      { title: 'English-Fluent Workforce', desc: 'Doctors, nurses, staff all English-speaking - global patient comfort' },
      { title: 'Scale & Capacity', desc: 'Thousands of JCI/NABH hospitals, 50+ specialists per city' },
      { title: 'Regulatory Support', desc: 'e-Medical Visa, Government backing, AYUSH promotion' },
];

// Pondicherry Positioning
const positioningVsOthers = [
      { compare: 'vs Metro Centers (Delhi, Mumbai)', points: ['Less crowded, peaceful recovery', 'Coastal therapeutic benefits', 'Spiritual/wellness integration', 'Lower living costs for recovery'] },
      { compare: 'vs International (Thailand, Singapore)', points: ['20-30% lower than Singapore', 'Deeper AYUSH authenticity', 'Unique diaspora connection'] },
      { compare: 'vs Other Indian Cities', points: ['Best wellness ecosystem (Auroville, ashrams)', 'Coastal recovery advantage', 'International spiritual reputation'] },
];

// Future Projections
const projections = [
      { year: 'Current', patients: '50,000', revenue: '$150-200M', jobs: '5,000' },
      { year: '2027', patients: '100,000+', revenue: '$250-300M', jobs: '10,000+' },
      { year: '2030', patients: '200,000+', revenue: '$400-500M', jobs: '15,000+' },
];

export default function GlobalOpportunityPage() {
      const scrolled = useScrolled(50);
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
            setIsVisible(true);
      }, []);

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero */}
                  <section className="relative pt-24 pb-20 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 overflow-hidden">
                        <div className="absolute inset-0">
                              <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920" alt="Global" fill className="object-cover opacity-20" priority />
                        </div>
                        <div className="relative container mx-auto px-4 pt-16">
                              <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <TrendingUp className="w-4 h-4 text-purple-300" />
                                          <span className="text-purple-100 text-sm font-medium">Market Analysis & Vision</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                          The Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Opportunity</span>
                                    </h1>
                                    <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
                                          Discover why Pondicherry is positioned to become Asia&apos;s most trusted, affordable, and holistic healing destination by 2030.
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* Market Size Stats */}
                  <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto -mt-16 relative z-10">
                                    {[
                                          { value: '$80B+', label: 'Global Market Size', icon: Globe },
                                          { value: '14M+', label: 'Annual Travelers', icon: Plane },
                                          { value: '$16.3B', label: 'India Revenue', icon: DollarSign },
                                          { value: '8-12%', label: 'Annual Growth', icon: TrendingUp },
                                    ].map((stat, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-xl p-6 text-center">
                                                <stat.icon className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                                                <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                                                <div className="text-gray-500 text-sm">{stat.label}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Market Growth Drivers */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Market Growth Drivers</h2>
                                    <p className="text-xl text-gray-600">Global trends creating opportunity for Pondicherry</p>
                              </div>
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {growthDrivers.map((driver, i) => (
                                          <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:bg-indigo-50 transition-all hover:-translate-y-1">
                                                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                                      <driver.icon className="w-7 h-7 text-indigo-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-3">{driver.title}</h3>
                                                <p className="text-gray-600 text-sm mb-4">{driver.desc}</p>
                                                <div className="flex items-start gap-2 text-sm">
                                                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                                                      <span className="text-emerald-700 font-medium">{driver.opportunity}</span>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* India's Competitive Advantage */}
                  <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-16 items-center">
                                    <div>
                                          <h2 className="text-4xl font-bold mb-8">India&apos;s Competitive Advantage</h2>
                                          <div className="space-y-6">
                                                {advantages.map((adv, i) => (
                                                      <div key={i} className="flex items-start gap-4">
                                                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                  <CheckCircle className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                  <h3 className="font-bold text-lg">{adv.title}</h3>
                                                                  <p className="text-indigo-200 text-sm">{adv.desc}</p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                                    <div className="relative hidden md:block">
                                          <Image src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600" alt="India Healthcare" width={600} height={500} className="rounded-3xl shadow-2xl" />
                                          <div className="absolute -bottom-6 -left-6 bg-white text-gray-800 rounded-2xl shadow-xl p-6">
                                                <div className="text-4xl font-bold text-indigo-600">10th</div>
                                                <div className="text-gray-500 text-sm">Global MTI Rank</div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Pondicherry's Positioning */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
                                          <Target className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Strategic Positioning</span>
                                    </div>
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">The Gateway to Healing and Holistic Wellness</h2>
                              </div>
                              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                    {positioningVsOthers.map((pos, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-lg p-8">
                                                <h3 className="text-lg font-bold text-indigo-600 mb-6">{pos.compare}</h3>
                                                <ul className="space-y-3">
                                                      {pos.points.map((point, j) => (
                                                            <li key={j} className="flex items-start gap-2 text-gray-600">
                                                                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                                                                  <span>{point}</span>
                                                            </li>
                                                      ))}
                                                </ul>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Future Projections */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Future Growth Projections</h2>
                                    <p className="text-xl text-gray-600">Conservative estimates for Pondicherry medical & wellness tourism</p>
                              </div>
                              <div className="overflow-x-auto max-w-4xl mx-auto">
                                    <table className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
                                          <thead>
                                                <tr className="text-white border-b border-white/20">
                                                      <th className="px-8 py-5 text-left">Timeline</th>
                                                      <th className="px-8 py-5 text-center">International Patients/Year</th>
                                                      <th className="px-8 py-5 text-center">Annual Revenue</th>
                                                      <th className="px-8 py-5 text-center">Jobs Created</th>
                                                </tr>
                                          </thead>
                                          <tbody className="text-white">
                                                {projections.map((row, i) => (
                                                      <tr key={i} className={`border-b border-white/10 ${i === 0 ? '' : i === projections.length - 1 ? 'bg-white/10' : ''}`}>
                                                            <td className="px-8 py-5 font-bold">{row.year}</td>
                                                            <td className="px-8 py-5 text-center text-2xl font-bold">{row.patients}</td>
                                                            <td className="px-8 py-5 text-center text-2xl font-bold">{row.revenue}</td>
                                                            <td className="px-8 py-5 text-center text-2xl font-bold">{row.jobs}</td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                              <div className="mt-8 text-center">
                                    <p className="text-gray-500">Aligned with "Heal in India" national initiative</p>
                              </div>
                        </div>
                  </section>

                  {/* National Vision Alignment */}
                  <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                                                <Award className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Government Initiative</span>
                                          </div>
                                          <h2 className="text-4xl font-bold mb-6">&quot;Heal in India&quot; Initiative</h2>
                                          <p className="text-xl text-emerald-100 mb-8">
                                                Government of India&apos;s brand umbrella for medical & wellness tourism, with Pondicherry positioned as a model state.
                                          </p>
                                          <div className="space-y-4">
                                                {[
                                                      'Model state for integrated medical + wellness tourism',
                                                      'Reference for other coastal Indian cities',
                                                      'Showcase of AYUSH-modern medicine integration',
                                                      'National Medical & Wellness Tourism Board support',
                                                ].map((item, i) => (
                                                      <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                                                            <CheckCircle className="w-5 h-5 text-emerald-300" />
                                                            <span>{item}</span>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                                    <div className="relative hidden md:block">
                                          <Image src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600" alt="Pondicherry" width={600} height={500} className="rounded-3xl shadow-2xl" />
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Vision Statement */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="max-w-4xl mx-auto text-center">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Our 2030 Vision</h2>
                                    <blockquote className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12">
                                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                                                <Target className="w-6 h-6 text-white" />
                                          </div>
                                          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic">
                                                &quot;By 2030, Pondicherry will be Asia&apos;s most trusted, affordable, and holistic healing destination, combining world-class modern medicine with ancient AYUSH wisdom, serving 200,000+ international patients annually and creating 15,000+ sustainable healthcare jobs.&quot;
                                          </p>
                                    </blockquote>
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Healing Revolution</h2>
                              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                    Be part of the future of healthcare. Start your healing journey in Pondicherry today.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/booking" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-full font-semibold text-xl hover:shadow-2xl transition-all">
                                          Book Your Consultation <ArrowRight className="w-6 h-6" />
                                    </Link>
                                    <Link href="/why-pondicherry" className="inline-flex items-center gap-2 bg-white/10 text-white px-10 py-5 rounded-full font-semibold text-xl hover:bg-white/20 transition-all">
                                          Learn More <ChevronRight className="w-6 h-6" />
                                    </Link>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
