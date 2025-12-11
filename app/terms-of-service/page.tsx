"use client";

import React from 'react';
import { FileText, Shield, AlertTriangle, CheckCircle, Mail } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const TermsOfServicePage = () => {
      const scrolled = useScrolled(50);
      const lastUpdated = 'December 1, 2024';

      const sections = [
            { title: 'Acceptance of Terms', content: 'By using Pondy HealthPort services, you agree to these terms. We facilitate connections between patients and healthcare providers but are not a healthcare provider ourselves.' },
            { title: 'Services Provided', content: 'We provide medical tourism facilitation including hospital referrals, appointment scheduling, travel coordination, and patient support. Final medical decisions remain with qualified healthcare professionals.' },
            { title: 'User Responsibilities', content: 'You must provide accurate medical and personal information. You are responsible for obtaining appropriate visas and travel documents. Follow all medical advice from treating physicians.' },
            { title: 'Limitation of Liability', content: 'While we carefully vet our partner hospitals, we do not guarantee specific medical outcomes. We are not liable for decisions made by independent healthcare providers in our network.' },
            { title: 'Cancellation Policy', content: 'Consultation fees are non-refundable after the service is rendered. Hospital booking cancellations are subject to individual hospital policies. Travel bookings follow standard airline/hotel terms.' },
            { title: 'Dispute Resolution', content: 'Any disputes will first be addressed through our patient advocacy team. Unresolved matters will be subject to arbitration under Indian law in Pondicherry jurisdiction.' },
      ];

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header />

                  <section className="pt-32 pb-16 bg-gradient-to-br from-indigo-800 to-purple-900">
                        <div className="container mx-auto px-4 text-center text-white">
                              <FileText className="w-16 h-16 mx-auto mb-6 text-indigo-300" />
                              <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
                              <p className="text-xl text-indigo-200">Last updated: {lastUpdated}</p>
                        </div>
                  </section>

                  <section className="py-16">
                        <div className="container mx-auto px-4 max-w-4xl">
                              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-xl">
                                          <div className="flex items-center gap-3">
                                                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                                                <p className="text-yellow-800 font-medium">Defining our role as facilitators. We connect you to care providers but do not provide medical advice directly.</p>
                                          </div>
                                    </div>

                                    <div className="space-y-8">
                                          {sections.map((section, i) => (
                                                <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                                                      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                            <CheckCircle className="w-5 h-5 text-indigo-600" />{section.title}
                                                      </h2>
                                                      <p className="text-gray-600 leading-relaxed pl-7">{section.content}</p>
                                                </div>
                                          ))}
                                    </div>

                                    <div className="mt-12 p-6 bg-indigo-50 rounded-2xl">
                                          <h3 className="text-lg font-bold text-gray-800 mb-4">Questions About These Terms?</h3>
                                          <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-indigo-600" />
                                                <a href="mailto:legal@pondyhealthport.com" className="text-indigo-600 font-medium hover:underline">legal@pondyhealthport.com</a>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default TermsOfServicePage;
