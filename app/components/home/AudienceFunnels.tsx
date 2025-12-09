"use client";

import React from 'react';
import { Globe, Calendar, MapPin, ChevronRight } from 'lucide-react';

const AudienceFunnels: React.FC = () => {
      const cards = [
            {
                  icon: Globe,
                  color: 'from-blue-500 to-indigo-500',
                  title: 'International Patients',
                  subtitle: 'Traveling for Treatment?',
                  description: 'Access all-inclusive packages for surgery, travel, and 5-star recovery. Save up to 80%.',
                  cta: 'See International Packages'
            },
            {
                  icon: MapPin,
                  color: 'from-emerald-500 to-teal-500',
                  title: 'North & South India',
                  subtitle: "Heal in India's French Riviera",
                  description: 'Escape the city. Combine your procedure with a peaceful, rejuvenating retreat by the sea.',
                  cta: 'Explore Wellness Packages'
            },
            {
                  icon: Calendar,
                  color: 'from-orange-500 to-red-500',
                  title: 'Local Patients',
                  subtitle: 'Pondicherry Residents',
                  description: 'Get direct access and book appointments with our network of top-rated local specialists.',
                  cta: 'Find a Doctor Near You'
            }
      ];

      return (
            <section className="py-20 bg-linear-to-b from-gray-50 to-white">
                  <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                              {cards.map((card, index) => (
                                    <div
                                          key={index}
                                          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
                                    >
                                          <div className={`h-2 bg-linear-to-r ${card.color}`} />
                                          <div className="p-8">
                                                <div className={`w-16 h-16 rounded-full bg-linear-to-r ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                                      <card.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-bold mb-2 text-gray-800">{card.subtitle}</h3>
                                                <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>
                                                <button className={`text-transparent bg-clip-text bg-linear-to-r ${card.color} font-semibold flex items-center gap-2 group-hover:gap-4 transition-all`}>
                                                      {card.cta}
                                                      <ChevronRight className="w-5 h-5" />
                                                </button>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </section>
      );
};

export default AudienceFunnels;
