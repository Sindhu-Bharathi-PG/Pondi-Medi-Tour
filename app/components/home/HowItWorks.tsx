"use client";

import React from 'react';
import { JOURNEY_STEPS } from '@/app/utils/constants';

const HowItWorks: React.FC = () => {
      return (
            <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                  <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                              <h2 className="text-5xl font-bold mb-4">Your Seamless Journey to Wellness in 4 Steps</h2>
                              <p className="text-xl text-gray-300">From consultation to recovery, we handle everything</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                              {JOURNEY_STEPS.map((step, index) => (
                                    <div key={index} className="text-center group">
                                          <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">{step.icon}</div>
                                          <div className="text-emerald-400 text-sm font-bold mb-2">{step.step}</div>
                                          <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                          <p className="text-gray-300 leading-relaxed">{step.description}</p>
                                    </div>
                              ))}
                        </div>

                        <div className="text-center mt-12">
                              <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                    Learn More About Our Process
                              </button>
                        </div>
                  </div>
            </section>
      );
};

export default HowItWorks;
