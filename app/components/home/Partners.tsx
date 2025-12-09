"use client";

import React from 'react';
import { PARTNERS } from '@/app/utils/constants';

const Partners: React.FC = () => {
      return (
            <section className="py-16 bg-white">
                  <div className="container mx-auto px-4">
                        <h3 className="text-center text-2xl font-bold mb-8 text-gray-800">
                              Our Vetted Network of NABH-Accredited Partners
                        </h3>
                        <div className="flex flex-wrap justify-center items-center gap-12">
                              {PARTNERS.map((partner, index) => (
                                    <div
                                          key={index}
                                          className="bg-gray-100 px-8 py-4 rounded-lg font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all cursor-pointer"
                                    >
                                          {partner}
                                    </div>
                              ))}
                        </div>
                  </div>
            </section>
      );
};

export default Partners;
