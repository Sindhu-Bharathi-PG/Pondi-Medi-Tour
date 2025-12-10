"use client";

import { HYBRID_PACKAGES } from '@/app/utils/constants';
import Image from 'next/image';
import React from 'react';

const HybridPackages: React.FC = () => {
      return (
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                  <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                              <h2 className="text-5xl font-bold mb-4 text-gray-800">Don&apos;t Just Get Treated. Heal.</h2>
                              <p className="text-xl text-gray-600">Unique Hybrid Packages combining medical excellence with rejuvenating wellness stays</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                              {HYBRID_PACKAGES.map((pkg, index) => (
                                    <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                          <div className="grid grid-cols-2 h-64">
                                                <div className="relative overflow-hidden">
                                                      <Image src={pkg.image1} alt="Medical" fill className="object-cover" />
                                                      <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                            Medical
                                                      </div>
                                                </div>
                                                <div className="relative overflow-hidden">
                                                      <Image src={pkg.image2} alt="Wellness" fill className="object-cover" />
                                                      <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                            Wellness
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="p-6">
                                                <h3 className="text-2xl font-bold mb-3 text-gray-800">{pkg.title}</h3>
                                                <p className="text-gray-600 mb-4 leading-relaxed">{pkg.description}</p>
                                                <div className="flex justify-between items-center">
                                                      <div className="text-3xl font-bold text-emerald-600">
                                                            From <ConvertedPrice amount={index === 0 ? 8500 : 6200} fromCurrency="USD" />
                                                      </div>
                                                      <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all">
                                                            Learn More
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        <div className="text-center mt-12">
                              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                                    Explore All Hybrid Packages
                              </button>
                        </div>
                  </div>
            </section>
      );
};

export default HybridPackages;
