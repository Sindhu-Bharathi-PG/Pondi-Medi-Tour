"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Stethoscope, Shield, Award, MapPin, Star, ChevronRight, Users, Clock, DollarSign, ArrowRight, Play, CheckCircle, Phone, Building2 } from 'lucide-react';

const MedicalHome = () => {
      const [isVisible, setIsVisible] = useState(false);
      const [activeSlide, setActiveSlide] = useState(0);
      const [countUp, setCountUp] = useState({ patients: 0, savings: 0, hospitals: 0, doctors: 0 });

      useEffect(() => {
            setIsVisible(true);

            // Count up animation
            const duration = 2000;
            const steps = 50;
            const interval = duration / steps;
            let step = 0;

            const timer = setInterval(() => {
                  step++;
                  const progress = step / steps;
                  setCountUp({
                        patients: Math.floor(15000 * progress),
                        savings: Math.floor(70 * progress),
                        hospitals: Math.floor(50 * progress),
                        doctors: Math.floor(500 * progress),
                  });
                  if (step >= steps) clearInterval(timer);
            }, interval);

            // Auto slide
            const slideTimer = setInterval(() => {
                  setActiveSlide(prev => (prev + 1) % 3);
            }, 5000);

            return () => {
                  clearInterval(timer);
                  clearInterval(slideTimer);
            };
      }, []);

      const treatments = [
            {
                  icon: Heart,
                  title: 'Cardiac Care',
                  description: 'World-class heart surgery at 70% less cost',
                  savings: '70%',
                  procedures: ['Bypass Surgery', 'Angioplasty', 'Valve Replacement'],
                  color: 'from-red-500 to-pink-500'
            },
            {
                  icon: Building2,
                  title: 'Orthopedics',
                  description: 'Joint replacements with rapid recovery',
                  savings: '65%',
                  procedures: ['Knee Replacement', 'Hip Replacement', 'Spine Surgery'],
                  color: 'from-blue-500 to-indigo-500'
            },
            {
                  icon: Users,
                  title: 'IVF & Fertility',
                  description: 'Premium fertility treatments with high success',
                  savings: '60%',
                  procedures: ['IVF', 'ICSI', 'Egg Freezing'],
                  color: 'from-purple-500 to-pink-500'
            },
            {
                  icon: Stethoscope,
                  title: 'Cancer Care',
                  description: 'Comprehensive oncology with latest technology',
                  savings: '75%',
                  procedures: ['Chemotherapy', 'Radiation', 'Surgery'],
                  color: 'from-teal-500 to-cyan-500'
            },
      ];

      const hospitals = [
            { name: 'JIPMER', type: 'Government', accreditation: 'NABH', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400' },
            { name: 'GEM Hospital', type: 'Private', accreditation: 'NABH', image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400' },
            { name: 'Aravind Eye', type: 'Specialty', accreditation: 'JCI', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400' },
      ];

      const stats = [
            { value: `${countUp.patients.toLocaleString()}+`, label: 'Patients Treated', icon: Users },
            { value: `${countUp.savings}%`, label: 'Cost Savings', icon: DollarSign },
            { value: `${countUp.hospitals}+`, label: 'NABH Hospitals', icon: Building2 },
            { value: `${countUp.doctors}+`, label: 'Specialists', icon: Stethoscope },
      ];

      return (
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Hero Section */}
                  <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
                        {/* Animated Background */}
                        <div className="absolute inset-0">
                              <Image
                                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920"
                                    alt="Medical Tourism"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-teal-800/80 to-transparent" />

                              {/* Animated pulse rings */}
                              <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2">
                                    <div className="relative">
                                          {[...Array(3)].map((_, i) => (
                                                <div
                                                      key={i}
                                                      className="absolute w-64 h-64 border-2 border-emerald-400/30 rounded-full"
                                                      style={{
                                                            animation: `pulse 2s ease-out infinite`,
                                                            animationDelay: `${i * 0.5}s`,
                                                            transform: 'translate(-50%, -50%)',
                                                      }}
                                                />
                                          ))}
                                          <div className="w-32 h-32 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <Heart className="w-16 h-16 text-emerald-400 animate-pulse" />
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <div className="relative container mx-auto px-4">
                              <div className="max-w-3xl">
                                    {/* Trust Badge */}
                                    <div
                                          className={`inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full mb-8 transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                                                }`}
                                    >
                                          <Shield className="w-5 h-5 text-emerald-400" />
                                          <span className="text-white text-sm font-medium">NABH & JCI Accredited Network</span>
                                          <div className="w-px h-4 bg-white/30" />
                                          <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-white text-sm">4.9/5 Rating</span>
                                          </div>
                                    </div>

                                    {/* Title */}
                                    <h1
                                          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                                }`}
                                    >
                                          <span className="block">World-Class</span>
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                                                Healthcare
                                          </span>
                                    </h1>

                                    <p
                                          className={`text-xl md:text-2xl text-emerald-100 leading-relaxed mb-10 max-w-2xl transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                                }`}
                                    >
                                          Save up to 70% on medical procedures at India&apos;s top NABH-accredited hospitals.
                                          From heart surgery to fertility treatments, with complete travel support.
                                    </p>

                                    {/* CTAs */}
                                    <div
                                          className={`flex flex-wrap gap-4 transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                                }`}
                                    >
                                          <Link
                                                href="/booking"
                                                className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 inline-flex items-center gap-2"
                                          >
                                                Free Consultation
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                          </Link>
                                          <Link
                                                href="/cost-calculator"
                                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2"
                                          >
                                                <DollarSign className="w-5 h-5" />
                                                Calculate Savings
                                          </Link>
                                    </div>

                                    {/* Quick Contact */}
                                    <div
                                          className={`mt-10 flex items-center gap-6 transition-all duration-700 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                                }`}
                                    >
                                          <div className="flex items-center gap-3 text-white">
                                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                                                      <Phone className="w-5 h-5" />
                                                </div>
                                                <div>
                                                      <div className="text-xs text-emerald-200">24/7 Helpline</div>
                                                      <div className="font-semibold">+91-9876543210</div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md">
                              <div className="container mx-auto px-4 py-6">
                                    <div
                                          className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                                }`}
                                    >
                                          {stats.map((stat, i) => (
                                                <div key={i} className="text-center text-white">
                                                      <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                                                      <div className="text-3xl font-bold">{stat.value}</div>
                                                      <div className="text-sm text-emerald-200">{stat.label}</div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Treatments */}
                  <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6">
                                          <Stethoscope className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Medical Excellence</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          World-Class Treatments
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Access the same quality care as Western hospitals at a fraction of the cost.
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {treatments.map((treatment, i) => (
                                          <Link
                                                key={i}
                                                href="/services"
                                                className="group bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                          >
                                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${treatment.color} flex items-center justify-center mb-4`}>
                                                      <treatment.icon className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">{treatment.title}</h3>
                                                <p className="text-gray-600 text-sm mb-4">{treatment.description}</p>
                                                <div className="flex items-center gap-2 mb-4">
                                                      <span className="text-2xl font-bold text-emerald-600">{treatment.savings}</span>
                                                      <span className="text-gray-500 text-sm">savings</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                      {treatment.procedures.map((p, j) => (
                                                            <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{p}</span>
                                                      ))}
                                                </div>
                                          </Link>
                                    ))}
                              </div>

                              <div className="text-center mt-12">
                                    <Link href="/services" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all">
                                          View All Treatments <ChevronRight className="w-5 h-5" />
                                    </Link>
                              </div>
                        </div>
                  </section>

                  {/* Partner Hospitals */}
                  <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold mb-4">Partner Hospitals</h2>
                                    <p className="text-emerald-100 text-xl">NABH & JCI accredited medical institutions</p>
                              </div>
                              <div className="grid md:grid-cols-3 gap-8">
                                    {hospitals.map((hospital, i) => (
                                          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/20 transition-all">
                                                <div className="relative h-48">
                                                      <Image src={hospital.image} alt={hospital.name} fill className="object-cover" />
                                                      <div className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                                                            {hospital.accreditation}
                                                      </div>
                                                </div>
                                                <div className="p-6">
                                                      <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
                                                      <p className="text-emerald-200">{hospital.type} Hospital</p>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                              <div className="text-center mt-12">
                                    <Link href="/hospital" className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                                          View All Hospitals <ChevronRight className="w-5 h-5" />
                                    </Link>
                              </div>
                        </div>
                  </section>

                  {/* How It Works */}
                  <section className="py-24 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
                                    <p className="text-xl text-gray-600">Your medical journey in 4 simple steps</p>
                              </div>
                              <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                                    {[
                                          { step: 1, title: 'Free Consultation', desc: 'Share your medical reports for review' },
                                          { step: 2, title: 'Treatment Plan', desc: 'Get personalized options & cost estimate' },
                                          { step: 3, title: 'Travel & Stay', desc: 'We arrange visa, flights & accommodation' },
                                          { step: 4, title: 'Treatment & Recovery', desc: 'Quality care with complete support' },
                                    ].map((item, i) => (
                                          <div key={i} className="text-center relative">
                                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                                                      {item.step}
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                                                <p className="text-gray-600 text-sm">{item.desc}</p>
                                                {i < 3 && (
                                                      <div className="hidden md:block absolute top-8 left-full w-full h-px bg-emerald-200" style={{ width: 'calc(100% - 4rem)', marginLeft: '2rem' }} />
                                                )}
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Ready to Save on Healthcare?
                              </h2>
                              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                    Get a free consultation and cost estimate within 24 hours.
                              </p>
                              <Link
                                    href="/booking"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-full font-semibold text-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all"
                              >
                                    Book Free Consultation
                                    <ArrowRight className="w-6 h-6" />
                              </Link>
                        </div>
                  </section>
            </div>
      );
};

export default MedicalHome;
