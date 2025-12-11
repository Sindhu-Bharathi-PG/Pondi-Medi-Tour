"use client";

import React, { useState } from 'react';
import { Video, Calendar, MessageSquare, Shield, Clock, Globe, Star, CheckCircle, Phone, Users, Mic, Camera } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const TelemedicinePage = () => {
      const scrolled = useScrolled(50);
      const [selectedOption, setSelectedOption] = useState('video');

      const options = [
            { id: 'video', icon: Video, title: 'Video Consultation', desc: 'Face-to-face with doctor', price: '$50', duration: '30 mins' },
            { id: 'phone', icon: Phone, title: 'Phone Call', desc: 'Voice consultation', price: '$35', duration: '20 mins' },
            { id: 'chat', icon: MessageSquare, title: 'Chat Consultation', desc: 'Text-based Q&A', price: '$25', duration: 'Unlimited' },
      ];

      const features = [
            { icon: Globe, title: 'Multi-Language Support', desc: 'English, Hindi, Tamil, French, Arabic' },
            { icon: Shield, title: 'HIPAA Compliant', desc: 'Your data is 100% secure' },
            { icon: Clock, title: 'Flexible Scheduling', desc: 'Book slots that suit your timezone' },
            { icon: Star, title: 'Top Specialists', desc: 'Connect with our best doctors' },
      ];

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header />

                  <section className="relative pt-32 pb-24 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-blue-800 to-indigo-900" />
                        <div className="relative container mx-auto px-4 text-center text-white">
                              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                                    <Video className="w-5 h-5 text-cyan-400" />
                                    <span className="text-sm font-medium">Consult From Anywhere in the World</span>
                              </div>
                              <h1 className="text-5xl md:text-7xl font-bold mb-6">Virtual<span className="block text-cyan-300">Medical Consultations</span></h1>
                              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">Bridge the distance before you board the plane. Share your reports (MRI, CT, Blood work) securely with Pondicherry's top consultants. Get a confirmed diagnosis and a tentative treatment plan remotely, saving you time and uncertainty upon arrival.</p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2">
                                          <Calendar className="w-5 h-5" />Book Consultation</button>
                                    <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all">How It Works</button>
                              </div>
                        </div>
                  </section>

                  {/* Consultation Options */}
                  <section className="py-16 -mt-12 relative z-10">
                        <div className="container mx-auto px-4">
                              <div className="max-w-4xl mx-auto">
                                    <div className="grid md:grid-cols-3 gap-6">
                                          {options.map((opt) => (
                                                <button key={opt.id} onClick={() => setSelectedOption(opt.id)}
                                                      className={`bg-white rounded-2xl p-8 text-left transition-all shadow-xl hover:shadow-2xl ${selectedOption === opt.id ? 'ring-4 ring-blue-500 scale-105' : ''}`}>
                                                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${selectedOption === opt.id ? 'bg-blue-600' : 'bg-blue-100'}`}>
                                                            <opt.icon className={`w-7 h-7 ${selectedOption === opt.id ? 'text-white' : 'text-blue-600'}`} />
                                                      </div>
                                                      <h3 className="text-xl font-bold text-gray-800 mb-2">{opt.title}</h3>
                                                      <p className="text-gray-500 mb-4">{opt.desc}</p>
                                                      <div className="flex items-center justify-between">
                                                            <span className="text-2xl font-bold text-blue-600">{opt.price}</span>
                                                            <span className="text-gray-400 text-sm">{opt.duration}</span>
                                                      </div>
                                                </button>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* How It Works */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">How Telemedicine Works</h2>
                                    <p className="text-xl text-gray-600">Simple 4-step process to connect with our specialists</p>
                              </div>
                              <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                                    {[{ step: 1, icon: Calendar, title: 'Book a Slot', desc: 'Choose a convenient time in your timezone' },
                                    { step: 2, icon: Users, title: 'Doctor Match', desc: 'We assign the best specialist for your case' },
                                    { step: 3, icon: Video, title: 'Join Session', desc: 'Connect via video, phone, or chat' },
                                    { step: 4, icon: CheckCircle, title: 'Get Report', desc: 'Receive diagnosis & treatment plan' }
                                    ].map((item) => (
                                          <div key={item.step} className="text-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                                                      <item.icon className="w-8 h-8" />
                                                </div>
                                                <div className="text-blue-600 font-bold mb-2">Step {item.step}</div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                                <p className="text-gray-500">{item.desc}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Features */}
                  <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-4 gap-6">
                                    {features.map((f, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-2">
                                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                      <f.icon className="w-7 h-7 text-blue-600" />
                                                </div>
                                                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                                                <p className="text-gray-500 text-sm">{f.desc}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Device Requirements */}
                  <section className="py-16 bg-blue-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="max-w-4xl mx-auto text-center">
                                    <h2 className="text-3xl font-bold mb-8">What You Need</h2>
                                    <div className="flex flex-wrap justify-center gap-8">
                                          {[{ icon: Camera, text: 'Camera' }, { icon: Mic, text: 'Microphone' }, { icon: Globe, text: 'Internet' }].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
                                                      <item.icon className="w-5 h-5" /><span>{item.text}</span>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Consult?</h2>
                              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Book your virtual consultation today and get expert medical advice from the comfort of your home.</p>
                              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />Book Now - Starting $25
                              </button>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default TelemedicinePage;
