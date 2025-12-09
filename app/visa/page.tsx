"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, CheckCircle, Clock, Globe, Shield, Phone, Mail, ChevronRight, AlertCircle, Download, Plane, Calendar, Users } from 'lucide-react';
import { Header, Footer } from '@/app/components/common';
import { useScrolled } from '@/app/hooks';

const VisaPage = () => {
      const scrolled = useScrolled(50);

      const visaTypes = [
            {
                  type: 'Medical Visa',
                  duration: 'Up to 1 year',
                  entries: 'Triple entry',
                  processing: '3-5 business days',
                  ideal: 'Major surgeries, extended treatment',
                  color: 'from-blue-600 to-indigo-600'
            },
            {
                  type: 'Medical Attendant Visa',
                  duration: 'Same as patient',
                  entries: 'Triple entry',
                  processing: '3-5 business days',
                  ideal: 'Companions of medical visa holders',
                  color: 'from-purple-600 to-pink-600'
            },
            {
                  type: 'e-Medical Visa',
                  duration: '60 days',
                  entries: 'Triple entry',
                  processing: '72 hours',
                  ideal: 'Short procedures, consultations',
                  color: 'from-emerald-600 to-teal-600'
            }
      ];

      const documents = [
            'Valid passport (6+ months validity)',
            'Passport-size photographs',
            'Medical records & diagnosis',
            'Hospital invitation letter (we provide)',
            'Proof of financial means',
            'Return flight booking'
      ];

      const countries = ['USA', 'UK', 'Canada', 'Australia', 'UAE', 'Saudi Arabia', 'Singapore', 'Germany', 'France'];

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header scrolled={scrolled} />

                  {/* Hero */}
                  <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900">
                        <div className="container mx-auto px-4 text-center text-white">
                              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                    <FileText className="w-5 h-5 text-blue-300" />
                                    <span className="text-sm font-medium">Complete Visa Assistance</span>
                              </div>
                              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                                    Medical Visa
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Made Simple</span>
                              </h1>
                              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                                    We handle all your visa documentation and provide official invitation letters from our partner hospitals.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/booking" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
                                          Get Invitation Letter <ChevronRight className="w-5 h-5" />
                                    </Link>
                              </div>
                        </div>
                  </section>

                  {/* Visa Types */}
                  <section className="py-20 -mt-8 relative z-10">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-3 gap-8">
                                    {visaTypes.map((visa, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                                                <div className={`h-3 bg-gradient-to-r ${visa.color}`} />
                                                <div className="p-8">
                                                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{visa.type}</h3>
                                                      <div className="space-y-4 mb-6">
                                                            <div className="flex items-center justify-between">
                                                                  <span className="text-gray-500">Duration</span>
                                                                  <span className="font-semibold text-gray-800">{visa.duration}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                  <span className="text-gray-500">Entries</span>
                                                                  <span className="font-semibold text-gray-800">{visa.entries}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                  <span className="text-gray-500">Processing</span>
                                                                  <span className="font-semibold text-green-600">{visa.processing}</span>
                                                            </div>
                                                      </div>
                                                      <div className="bg-gray-50 rounded-xl p-4">
                                                            <div className="text-sm text-gray-500 mb-1">Best for</div>
                                                            <div className="font-medium text-gray-700">{visa.ideal}</div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Our Service */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-16 items-center">
                                    <div>
                                          <h2 className="text-4xl font-bold text-gray-800 mb-6">We Handle Everything</h2>
                                          <p className="text-xl text-gray-600 mb-8">Our visa assistance service includes:</p>
                                          <div className="space-y-4">
                                                {[
                                                      'Official hospital invitation letter',
                                                      'Treatment plan documentation',
                                                      'Visa application guidance',
                                                      'Document verification',
                                                      'Embassy appointment support',
                                                      'Extension assistance if needed'
                                                ].map((item, i) => (
                                                      <div key={i} className="flex items-center gap-4">
                                                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                                                            <span className="text-gray-700 font-medium">{item}</span>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                                          <h3 className="text-xl font-bold text-gray-800 mb-6">Required Documents</h3>
                                          <div className="space-y-3">
                                                {documents.map((doc, i) => (
                                                      <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3">
                                                            <FileText className="w-5 h-5 text-blue-600" />
                                                            <span className="text-gray-700">{doc}</span>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Countries */}
                  <section className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-2xl font-bold text-gray-800 mb-8">Patients Welcome From</h2>
                              <div className="flex flex-wrap justify-center gap-4">
                                    {countries.map((country, i) => (
                                          <span key={i} className="bg-white px-6 py-3 rounded-full shadow-md font-medium text-gray-700 hover:shadow-lg transition-all">
                                                {country}
                                          </span>
                                    ))}
                                    <span className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md font-medium">+ 40 more countries</span>
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl font-bold mb-6">Need Visa Assistance?</h2>
                              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                    Book a consultation and we&apos;ll provide your hospital invitation letter within 48 hours.
                              </p>
                              <Link href="/booking" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
                                    Start Your Application <ChevronRight className="w-5 h-5" />
                              </Link>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default VisaPage;
