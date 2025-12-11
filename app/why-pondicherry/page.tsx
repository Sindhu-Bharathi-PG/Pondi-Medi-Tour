"use client";

import {
      ArrowRight,
      Award,
      Building2,
      CheckCircle,
      ChevronRight,
      DollarSign,
      FileCheck,
      Globe,
      Heart,
      Leaf,
      Plane, Shield,
      Star,
      Stethoscope,
      Users,
      Waves
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../components/common';
import { ConvertedPrice } from '../components/common/ConvertedPrice';
import { useScrolled } from '../hooks';

// Data
const costData = [
      { procedure: 'Hip Replacement', pondicherry: 710000, delhi: 835000, mumbai: 1002000, singapore: 2087500, us: 2922500 },
      { procedure: 'Cardiac Bypass', pondicherry: 1002000, delhi: 1169000, mumbai: 1336000, singapore: 2505000, us: 4175000 },
      { procedure: 'IVF Cycle', pondicherry: 292250, delhi: 334000, mumbai: 417500, singapore: 1252500, us: 1503000 },
      { procedure: 'Dental Implant', pondicherry: 50100, delhi: 58450, mumbai: 66800, singapore: 208750, us: 334000 },
];

const hospitals = [
      { name: 'JIPMER', type: 'Government (AIIMS-equivalent)', beds: '1,100+', accreditation: 'NABH', highlight: 'World-class research', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600' },
      { name: 'Apollo Pondicherry', type: 'Private Multi-Specialty', beds: '300+', accreditation: 'JCI', highlight: 'Advanced diagnostics', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600' },
      { name: 'MGMCRI', type: 'Private Teaching Hospital', beds: '900+', accreditation: 'NABH', highlight: 'State-of-the-art', image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600' },
];

const specialists = [
      { specialty: 'Cardiologists', count: '50+', credential: 'MRCP/FACS' },
      { specialty: 'Orthopedic Surgeons', count: '40+', credential: 'MS Ortho' },
      { specialty: 'IVF Specialists', count: '35+', credential: 'Fellowship' },
      { specialty: 'Oncologists', count: '30+', credential: 'DM Oncology' },
];

const metrics = [
      { procedure: 'Cardiac Surgery', rate: '98.5%', note: 'Mortality <1%' },
      { procedure: 'Joint Replacement', rate: '95%+', note: '5-year satisfaction' },
      { procedure: 'IVF', rate: '45%+', note: 'Live birth (age <35)' },
      { procedure: 'Dental Implants', rate: '98%+', note: '10-year survival' },
];

const testimonials = [
      { name: 'Robert Mitchell', country: 'USA', procedure: 'Hip Replacement', saved: 2213500, spent: 751500, result: 'Walking 5 miles daily', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
      { name: 'Sarah Thompson', country: 'UK', procedure: 'Cardiac Bypass', saved: 3173000, spent: 1002000, result: 'Full recovery in 8 weeks', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
      { name: 'Michael Chen', country: 'Australia', procedure: 'IVF Treatment', saved: 1210750, spent: 292250, result: 'Successful first cycle', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
];

export default function WhyPondicherryPage() {
      const scrolled = useScrolled(50);
      const [isVisible, setIsVisible] = useState(false);
      const [activeTestimonial, setActiveTestimonial] = useState(0);

      useEffect(() => {
            const visibilityTimer = setTimeout(() => setIsVisible(true), 0);
            const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 6000);
            return () => {
                  clearTimeout(visibilityTimer);
                  clearInterval(timer);
            };
      }, []);

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero */}
                  <section className="relative pt-24 pb-20 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 overflow-hidden">
                        <div className="absolute inset-0">
                              <Image src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920" alt="Medical" fill className="object-cover opacity-20" priority />
                        </div>
                        <div className="relative container mx-auto px-4 pt-16">
                              <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <Globe className="w-4 h-4 text-emerald-300" />
                                          <span className="text-emerald-100 text-sm font-medium">India&apos;s Premier Medical Tourism Destination</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                          Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Pondicherry</span>
                                    </h1>
                                    <p className="text-xl text-emerald-100 mb-10 max-w-3xl mx-auto">
                                          World-class care at 40-60% lower cost than India&apos;s metros, and 70% less than developed countries.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                          <Link href="/booking" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all inline-flex items-center gap-2">
                                                Schedule Free Consultation <ArrowRight className="w-5 h-5" />
                                          </Link>
                                    </div>
                              </div>
                              {/* Stats */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
                                    {[
                                          { value: '70%', label: 'Cost Savings', icon: DollarSign },
                                          { value: '50+', label: 'NABH Hospitals', icon: Building2 },
                                          { value: '500+', label: 'Specialists', icon: Stethoscope },
                                          { value: '98%', label: 'Success Rate', icon: Award },
                                    ].map((stat, i) => (
                                          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                                                <stat.icon className="w-8 h-8 text-emerald-300 mx-auto mb-2" />
                                                <div className="text-3xl font-bold text-white">{stat.value}</div>
                                                <div className="text-emerald-200 text-sm">{stat.label}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Cost Comparison */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4">
                                          <DollarSign className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Cost Advantage</span>
                                    </div>
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Transparent Pricing Comparison</h2>
                              </div>
                              <div className="overflow-x-auto">
                                    <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                                          <thead>
                                                <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                                                      <th className="px-6 py-4 text-left">Procedure</th>
                                                      <th className="px-6 py-4 text-center">Pondicherry ⭐</th>
                                                      <th className="px-6 py-4 text-center">Delhi</th>
                                                      <th className="px-6 py-4 text-center">Mumbai</th>
                                                      <th className="px-6 py-4 text-center">Singapore</th>
                                                      <th className="px-6 py-4 text-center">USA</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {costData.map((row, i) => (
                                                      <tr key={i} className={`border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-emerald-50`}>
                                                            <td className="px-6 py-4 font-medium">{row.procedure}</td>
                                                            <td className="px-6 py-4 text-center"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold"><ConvertedPrice amount={row.pondicherry} fromCurrency="INR" /></span></td>
                                                            <td className="px-6 py-4 text-center text-gray-600"><ConvertedPrice amount={row.delhi} fromCurrency="INR" /></td>
                                                            <td className="px-6 py-4 text-center text-gray-600"><ConvertedPrice amount={row.mumbai} fromCurrency="INR" /></td>
                                                            <td className="px-6 py-4 text-center text-gray-600"><ConvertedPrice amount={row.singapore} fromCurrency="INR" /></td>
                                                            <td className="px-6 py-4 text-center text-gray-600"><ConvertedPrice amount={row.us} fromCurrency="INR" /></td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </section>

                  {/* Hospitals */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">World-Class Hospitals</h2>
                                    <p className="text-xl text-gray-600">NABH and JCI accredited facilities</p>
                              </div>
                              <div className="grid md:grid-cols-3 gap-8">
                                    {hospitals.map((h, i) => (
                                          <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                                                <div className="relative h-48">
                                                      <Image src={h.image} alt={h.name} fill className="object-cover" />
                                                      <div className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">{h.accreditation}</div>
                                                </div>
                                                <div className="p-6">
                                                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{h.name}</h3>
                                                      <p className="text-gray-500 text-sm mb-4">{h.type}</p>
                                                      <div className="flex justify-between text-sm mb-4">
                                                            <span className="text-gray-500">Beds:</span>
                                                            <span className="font-medium">{h.beds}</span>
                                                      </div>
                                                      <div className="flex items-center gap-2 text-emerald-600">
                                                            <CheckCircle className="w-4 h-4" />
                                                            <span className="text-sm font-medium">{h.highlight}</span>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                              <div className="mt-12 text-center">
                                    <Link href="/hospital" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all">
                                          View All Hospitals <ChevronRight className="w-5 h-5" />
                                    </Link>
                              </div>
                        </div>
                  </section>

                  {/* Medical Expertise */}
                  <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                          <h2 className="text-4xl font-bold mb-6">Internationally Trained Specialists</h2>
                                          <p className="text-xl text-emerald-100 mb-8">Our doctors hold credentials from top institutions worldwide.</p>
                                          <div className="space-y-4">
                                                {specialists.map((s, i) => (
                                                      <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex justify-between items-center">
                                                            <div>
                                                                  <h4 className="font-semibold">{s.specialty}</h4>
                                                                  <p className="text-emerald-200 text-sm">{s.credential}</p>
                                                            </div>
                                                            <div className="text-2xl font-bold">{s.count}</div>
                                                      </div>
                                                ))}
                                          </div>
                                          <Link href="/doctor" className="mt-8 inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold">
                                                Browse Doctors <ChevronRight className="w-5 h-5" />
                                          </Link>
                                    </div>
                                    <div className="relative hidden md:block">
                                          <Image src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600" alt="Specialists" width={600} height={500} className="rounded-3xl shadow-2xl" />
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Quality Metrics */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Published Success Metrics</h2>
                              </div>
                              <div className="grid md:grid-cols-4 gap-6">
                                    {metrics.map((m, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl">
                                                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                                                <h3 className="font-bold text-gray-800 mb-2">{m.procedure}</h3>
                                                <div className="text-4xl font-bold text-emerald-600 mb-2">{m.rate}</div>
                                                <p className="text-gray-500 text-sm">{m.note}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* AYUSH Advantage */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div className="relative">
                                          <Image src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600" alt="Ayurveda" width={600} height={500} className="rounded-3xl shadow-2xl" />
                                    </div>
                                    <div>
                                          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-6">
                                                <Leaf className="w-4 h-4" />
                                                <span className="text-sm font-semibold">AYUSH Advantage</span>
                                          </div>
                                          <h2 className="text-4xl font-bold text-gray-800 mb-6">Modern + Traditional Medicine Fusion</h2>
                                          <p className="text-xl text-gray-600 mb-8">Combine world-class surgery with authentic Ayurvedic recovery.</p>
                                          <div className="space-y-4">
                                                {['Ayurveda Clinics - Licensed Vaidyas', 'Yoga Studios - 200-hour certified', 'Naturopathy Centers', 'Hybrid Treatment Plans'].map((item, i) => (
                                                      <div key={i} className="flex items-center gap-3 bg-amber-50 rounded-xl p-4">
                                                            <CheckCircle className="w-5 h-5 text-amber-600" />
                                                            <span className="text-gray-700">{item}</span>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Coastal Healing */}
                  <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold mb-4">Recover by the Sea</h2>
                                    <p className="text-xl text-cyan-100">Therapeutic benefits of Pondicherry&apos;s pristine coastline</p>
                              </div>
                              <div className="grid md:grid-cols-4 gap-6">
                                    {[
                                          { icon: Waves, title: 'Sea Salt Air', desc: 'Aids respiratory healing' },
                                          { icon: Heart, title: 'Sunrise Yoga', desc: 'Mental wellness' },
                                          { icon: Shield, title: 'Peaceful Environment', desc: 'Non-chaotic recovery' },
                                          { icon: Users, title: 'Beach Walks', desc: 'Post-op mobility' },
                                    ].map((item, i) => (
                                          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                                                <item.icon className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
                                                <h3 className="font-bold mb-2">{item.title}</h3>
                                                <p className="text-cyan-100 text-sm">{item.desc}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Travel Support */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Seamless Travel Support</h2>
                              </div>
                              <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                          { icon: FileCheck, title: 'Visa Process', items: ['e-Medical Visa (5-7 days)', 'Auto-generated invitation letter', 'Country-specific guides'] },
                                          { icon: Plane, title: 'Air Connectivity', items: ['Direct flights from major cities', 'International via Chennai', 'Partner airline discounts'] },
                                          { icon: Users, title: 'Airport Support', items: ['Dedicated helpdesk', 'Pre-arranged transport', 'Welcome orientation'] },
                                    ].map((card, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-lg p-8">
                                                <card.icon className="w-12 h-12 text-indigo-600 mb-4" />
                                                <h3 className="text-xl font-bold text-gray-800 mb-4">{card.title}</h3>
                                                <ul className="space-y-2">
                                                      {card.items.map((item, j) => (
                                                            <li key={j} className="flex items-center gap-2 text-gray-600">
                                                                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                                  {item}
                                                            </li>
                                                      ))}
                                                </ul>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Testimonials */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Patient Success Stories</h2>
                              </div>
                              <div className="max-w-4xl mx-auto">
                                    {testimonials.map((t, i) => (
                                          <div key={i} className={`bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 transition-all ${activeTestimonial === i ? 'block' : 'hidden'}`}>
                                                <div className="flex flex-col md:flex-row items-center gap-8">
                                                      <Image src={t.image} alt={t.name} width={100} height={100} className="rounded-full border-4 border-emerald-300" />
                                                      <div className="flex-1">
                                                            <div className="flex items-center gap-1 mb-2">
                                                                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />)}
                                                            </div>
                                                            <h3 className="text-xl font-bold text-gray-800">{t.name}</h3>
                                                            <p className="text-gray-500 mb-4">{t.country} • {t.procedure}</p>
                                                            <p className="text-gray-700 mb-4">&quot;{t.result}&quot;</p>
                                                            <div className="flex gap-4">
                                                                  <div className="bg-white rounded-xl p-3">
                                                                        <span className="text-sm text-gray-500 block">Spent</span>
                                                                        <span className="text-xl font-bold"><ConvertedPrice amount={t.spent} fromCurrency="INR" /></span>
                                                                  </div>
                                                                  <div className="bg-emerald-600 text-white rounded-xl p-3">
                                                                        <span className="text-sm text-emerald-100 block">Saved</span>
                                                                        <span className="text-xl font-bold"><ConvertedPrice amount={t.saved} fromCurrency="INR" /></span>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                                    <div className="flex justify-center gap-2 mt-8">
                                          {testimonials.map((_, i) => (
                                                <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === i ? 'bg-emerald-500 w-8' : 'bg-gray-300'}`} />
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Healing Journey Today</h2>
                              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join thousands of patients who chose Pondicherry.</p>
                              <Link href="/booking" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-full font-semibold text-xl hover:shadow-2xl transition-all">
                                    Schedule Free Consultation <ArrowRight className="w-6 h-6" />
                              </Link>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
