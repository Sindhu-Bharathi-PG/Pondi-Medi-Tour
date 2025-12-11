"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
      MessageSquare, Shield, Globe, HeartHandshake, Phone, Mail,
      CheckCircle, ChevronRight, AlertCircle, HeadphonesIcon
} from 'lucide-react';
import { Header, Footer } from '@/app/components/common';
import { useScrolled } from '@/app/hooks';

const PatientSupportPage = () => {
      const scrolled = useScrolled(50);

      const supportServices = [
            {
                  title: 'Grievance Redressal',
                  desc: 'Dedicated support for any medical or service concerns',
                  icon: Shield,
                  color: 'text-red-600',
                  bg: 'bg-red-50'
            },
            {
                  title: 'Language Interpreters',
                  desc: 'Professional translation in French, English, Arabic & more',
                  icon: Globe,
                  color: 'text-blue-600',
                  bg: 'bg-blue-50'
            },
            {
                  title: 'MVT Facilitation',
                  desc: 'End-to-end travel, accommodation & visa assist',
                  icon: HeartHandshake,
                  color: 'text-green-600',
                  bg: 'bg-green-50'
            },
            {
                  title: '24/7 Helpline',
                  desc: 'Round-the-clock emergency and query support',
                  icon: HeadphonesIcon,
                  color: 'text-purple-600',
                  bg: 'bg-purple-50'
            }
      ];

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 hero-premium text-white">
                        <div className="container-premium">
                              {/* Breadcrumb */}
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <a href="/">Home</a>
                                    <span className="mx-2">/</span>
                                    <span className="text-white">Patient Support</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <div className="gov-seal mb-6">
                                          <span>24/7 Dedicated Support Team</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                          We Are Here
                                          <span className="block text-[#bf9b30]">For You</span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
                                          From arrival to recovery, our dedicated support team ensures your safety, comfort, and satisfaction. Aligned with India&apos;s National Medical Value Travel Strategy.
                                    </p>
                                    <button className="inline-flex items-center gap-2 bg-[var(--medical-gold)] text-[var(--medical-navy)] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all">
                                          Contact Support
                                    </button>
                              </div>
                        </div>
                  </section>

                  {/* Core Services */}
                  <section className="py-20 relative -mt-10 z-10">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-4 gap-6">
                                    {supportServices.map((service, i) => (
                                          <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:-translate-y-1 transition-transform cursor-default">
                                                <div className={`w-14 h-14 ${service.bg} rounded-full flex items-center justify-center mb-4`}>
                                                      <service.icon className={`w-7 h-7 ${service.color}`} />
                                                </div>
                                                <h3 className="font-bold text-gray-800 text-lg mb-2">{service.title}</h3>
                                                <p className="text-gray-600 text-sm">{service.desc}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Language Support */}
                  <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                          <h2 className="text-3xl font-bold text-gray-800 mb-6">Breaking Language Barriers</h2>
                                          <p className="text-gray-600 mb-6 text-lg">
                                                Communication is key to quality healthcare. We provide professional interpreters to ensure you understand every aspect of your treatment.
                                          </p>
                                          <div className="grid grid-cols-2 gap-4">
                                                {['English', 'Français (French)', 'العربية (Arabic)', 'தமிழ் (Tamil)', 'Русский (Russian)', 'Español (Spanish)'].map((lang, i) => (
                                                      <div key={i} className="flex items-center gap-2">
                                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                                            <span className="font-medium text-gray-700">{lang}</span>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                                    <div className="bg-indigo-50 rounded-3xl p-8 relative overflow-hidden">
                                          <div className="relative z-10">
                                                <h3 className="text-xl font-bold text-indigo-900 mb-4">Need an Interpreter?</h3>
                                                <p className="text-indigo-700 mb-6">Request language assistance before your arrival.</p>
                                                <Link href="/booking" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold inline-block hover:bg-indigo-700 transition">
                                                      Book Interpreter
                                                </Link>
                                          </div>
                                          <Globe className="absolute -bottom-4 -right-4 w-40 h-40 text-indigo-100" />
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Grievance Redressal */}
                  <section className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4 max-w-4xl text-center">
                              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <h2 className="text-3xl font-bold text-gray-800 mb-4">Grievance Redressal</h2>
                              <p className="text-gray-600 mb-8">
                                    Your satisfaction and safety are paramount. We have a structured grievance mechanism to address any concerns regarding medical treatment, billing, or services.
                              </p>
                              <div className="bg-white rounded-2xl p-8 shadow-sm text-left">
                                    <h3 className="font-bold text-lg mb-4">How to report an issue:</h3>
                                    <div className="space-y-4">
                                          <div className="flex gap-4">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 shrink-0">1</div>
                                                <p className="text-gray-600">Contact our 24/7 Patient Support Team immediately.</p>
                                          </div>
                                          <div className="flex gap-4">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 shrink-0">2</div>
                                                <p className="text-gray-600">Submit a formal written complaint via email or our portal.</p>
                                          </div>
                                          <div className="flex gap-4">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 shrink-0">3</div>
                                                <p className="text-gray-600">Issues are escalated to the Medical Board for impartial review within 48 hours.</p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default PatientSupportPage;
