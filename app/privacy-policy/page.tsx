"use client";

import React from 'react';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const PrivacyPolicyPage = () => {
      const scrolled = useScrolled(50);
      const lastUpdated = 'December 1, 2024';

      const sections = [
            { title: 'Information We Collect', icon: FileText, content: 'We collect personal information including name, contact details, medical history, and travel preferences to provide our medical tourism services. Health information is collected with explicit consent and handled with the highest security standards.' },
            { title: 'How We Use Your Information', icon: Eye, content: 'Your data is used to facilitate medical consultations, arrange travel and accommodation, communicate treatment plans, and improve our services. We never sell your personal or medical information to third parties.' },
            { title: 'Data Security', icon: Lock, content: 'We implement industry-standard encryption, secure servers, and strict access controls. All medical data transmission is HIPAA compliant. Regular security audits ensure your information remains protected.' },
            { title: 'Your Rights', icon: Shield, content: 'You have the right to access, correct, or delete your personal data. You may withdraw consent for data processing at any time. Contact our Data Protection Officer for any privacy-related requests.' },
      ];

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header scrolled={scrolled} />

                  <section className="pt-32 pb-16 bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="container mx-auto px-4 text-center text-white">
                              <Shield className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
                              <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
                              <p className="text-xl text-gray-300">Last updated: {lastUpdated}</p>
                        </div>
                  </section>

                  <section className="py-16">
                        <div className="container mx-auto px-4 max-w-4xl">
                              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                          At Pondy HealthPort, we take your privacy seriously. This policy explains how we collect, use, and protect your personal and medical information when you use our medical tourism services.
                                    </p>

                                    <div className="space-y-8">
                                          {sections.map((section, i) => (
                                                <div key={i} className="border-b border-gray-100 pb-8 last:border-0">
                                                      <div className="flex items-center gap-4 mb-4">
                                                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                                                  <section.icon className="w-6 h-6 text-emerald-600" />
                                                            </div>
                                                            <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                                                      </div>
                                                      <p className="text-gray-600 leading-relaxed pl-16">{section.content}</p>
                                                </div>
                                          ))}
                                    </div>

                                    <div className="mt-12 p-6 bg-emerald-50 rounded-2xl">
                                          <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Our Privacy Team</h3>
                                          <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-emerald-600" />
                                                <a href="mailto:privacy@pondyhealthport.com" className="text-emerald-600 font-medium hover:underline">privacy@pondyhealthport.com</a>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default PrivacyPolicyPage;
