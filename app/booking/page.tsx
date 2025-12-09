"use client";

import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, FileText, MapPin, ChevronRight, Shield, Clock, CheckCircle, Upload, Stethoscope } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const BookingPage = () => {
      const scrolled = useScrolled(50);
      const [step, setStep] = useState(1);
      const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: '', treatment: '', message: '' });

      const treatments = ['Orthopedics', 'IVF & Fertility', 'Cardiology', 'Ophthalmology', 'Dental', 'Gastroenterology', 'Neurology', 'Oncology'];

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header scrolled={scrolled} />

                  <section className="relative pt-32 pb-20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900" />
                        <div className="relative container mx-auto px-4 text-center text-white">
                              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                                    <Calendar className="w-5 h-5 text-yellow-400" />
                                    <span className="text-sm font-medium">Free Consultation • No Obligations</span>
                              </div>
                              <h1 className="text-5xl md:text-7xl font-bold mb-6">Book Your<span className="block text-purple-300">Medical Journey</span></h1>
                              <p className="text-xl text-purple-100 max-w-3xl mx-auto">Get a free personalized treatment plan and cost estimate within 24 hours.</p>
                        </div>
                  </section>

                  <section className="py-16 -mt-8 relative z-10">
                        <div className="container mx-auto px-4">
                              <div className="max-w-4xl mx-auto">
                                    {/* Progress Steps */}
                                    <div className="flex items-center justify-center gap-4 mb-12">
                                          {[1, 2, 3].map((s) => (
                                                <div key={s} className="flex items-center gap-2">
                                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
                                                      {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
                                                </div>
                                          ))}
                                    </div>

                                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                                          {step === 1 && (
                                                <div>
                                                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
                                                      <div className="grid md:grid-cols-2 gap-6">
                                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                                                  <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="John Doe" /></div></div>
                                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                                                  <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="john@email.com" /></div></div>
                                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                                                  <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="+1 234 567 8900" /></div></div>
                                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                                                                  <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                                        <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                                                              <option value="">Select Country</option><option>United States</option><option>United Kingdom</option><option>UAE</option><option>Singapore</option><option>Australia</option><option>Other</option>
                                                                        </select></div></div>
                                                      </div>
                                                      <button onClick={() => setStep(2)} className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                                            Continue <ChevronRight className="w-5 h-5" /></button>
                                                </div>
                                          )}

                                          {step === 2 && (
                                                <div>
                                                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Treatment Details</h2>
                                                      <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-4">Select Treatment Area *</label>
                                                            <div className="grid md:grid-cols-4 gap-3">
                                                                  {treatments.map((t) => (
                                                                        <button key={t} onClick={() => setFormData({ ...formData, treatment: t })}
                                                                              className={`p-4 rounded-xl border-2 text-center transition-all ${formData.treatment === t ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-indigo-300'}`}>
                                                                              <Stethoscope className={`w-6 h-6 mx-auto mb-2 ${formData.treatment === t ? 'text-indigo-600' : 'text-gray-400'}`} />
                                                                              <span className="text-sm font-medium">{t}</span>
                                                                        </button>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Condition</label>
                                                            <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4}
                                                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="Please describe your medical condition and requirements..." /></div>
                                                      <div className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
                                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                                            <p className="text-gray-600 mb-2">Upload Medical Reports (Optional)</p>
                                                            <p className="text-gray-400 text-sm">PDF, JPG, PNG up to 10MB each</p>
                                                            <button className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">Choose Files</button>
                                                      </div>
                                                      <div className="flex gap-4">
                                                            <button onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">Back</button>
                                                            <button onClick={() => setStep(3)} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                                                  Continue <ChevronRight className="w-5 h-5" /></button>
                                                      </div>
                                                </div>
                                          )}

                                          {step === 3 && (
                                                <div className="text-center py-8">
                                                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                            <CheckCircle className="w-10 h-10 text-green-600" />
                                                      </div>
                                                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Request Submitted!</h2>
                                                      <p className="text-gray-600 mb-8 max-w-md mx-auto">Our medical team will review your request and contact you within 24 hours with a personalized treatment plan.</p>
                                                      <div className="bg-indigo-50 rounded-2xl p-6 max-w-md mx-auto mb-8">
                                                            <h3 className="font-semibold text-indigo-800 mb-4">What Happens Next?</h3>
                                                            <div className="space-y-3 text-left">
                                                                  {['Medical team reviews your case', 'Doctor consultation scheduled', 'Personalized treatment plan shared', 'Travel & stay arrangements'].map((item, i) => (
                                                                        <div key={i} className="flex items-center gap-3"><div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</div>
                                                                              <span className="text-indigo-700">{item}</span></div>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      <button onClick={() => { setStep(1); setFormData({ name: '', email: '', phone: '', country: '', treatment: '', message: '' }); }}
                                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg">Submit Another Request</button>
                                                </div>
                                          )}
                                    </div>

                                    {/* Trust Indicators */}
                                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                                          {[{ icon: Shield, title: '100% Confidential', desc: 'Your data is secured' }, { icon: Clock, title: '24-Hour Response', desc: 'Quick turnaround' }, { icon: FileText, title: 'Free Consultation', desc: 'No obligations' }].map((item, i) => (
                                                <div key={i} className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
                                                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center"><item.icon className="w-6 h-6 text-indigo-600" /></div>
                                                      <div><div className="font-bold text-gray-800">{item.title}</div><div className="text-gray-500 text-sm">{item.desc}</div></div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>
                  <Footer />
            </div>
      );
};

export default BookingPage;
