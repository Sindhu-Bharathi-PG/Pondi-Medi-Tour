"use client";

import React from 'react';
import { ChevronRight, Check } from 'lucide-react';

const FinalCTA: React.FC = () => {
      return (
            <section className="py-20 bg-linear-to-r from-emerald-600 to-teal-600 text-white">
                  <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                              <div className="text-center mb-12">
                                    <h2 className="text-5xl font-bold mb-4">Your Journey to Health and Wellness Starts Here.</h2>
                                    <p className="text-xl text-emerald-100">Take the first step. Get a free, confidential medical opinion and an all-inclusive cost estimate.</p>
                              </div>

                              <div className="bg-white rounded-2xl shadow-2xl p-8">
                                    <form className="space-y-6">
                                          <div>
                                                <input
                                                      type="text"
                                                      placeholder="Full Name*"
                                                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-gray-800"
                                                />
                                          </div>
                                          <div className="grid md:grid-cols-2 gap-6">
                                                <input
                                                      type="email"
                                                      placeholder="Email Address*"
                                                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-gray-800"
                                                />
                                                <input
                                                      type="tel"
                                                      placeholder="Phone (with country code)*"
                                                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-gray-800"
                                                />
                                          </div>
                                          <textarea
                                                placeholder="Tell us about your medical needs (optional)"
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-gray-800"
                                          />
                                          <button
                                                type="submit"
                                                className="w-full bg-linear-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                          >
                                                Get My Free Quote Now
                                                <ChevronRight className="w-6 h-6" />
                                          </button>
                                          <p className="text-center text-gray-500 text-sm">
                                                <Check className="w-4 h-4 inline text-emerald-600" /> 100% confidential. No obligations.
                                          </p>
                                    </form>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default FinalCTA;
