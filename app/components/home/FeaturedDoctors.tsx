"use client";

import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Doctor {
      name: string;
      credentials: string;
      specialty: string;
      experience: string;
      image: string;
}

interface FeaturedDoctorsProps {
      doctors: Doctor[];
}

const FeaturedDoctors: React.FC<FeaturedDoctorsProps> = ({ doctors }) => {
      return (
            <section className="py-20 bg-white">
                  <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                              <h2 className="text-5xl font-bold mb-4 text-gray-800">World-Class Doctors. Personal Care.</h2>
                              <p className="text-xl text-gray-600">Internationally trained specialists dedicated to your wellness</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                              {doctors.map((doctor, index) => (
                                    <div key={index} className="group relative bg-linear-to-b from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                          <div className="relative h-80 overflow-hidden">
                                                <Image
                                                      src={doctor.image}
                                                      alt={doctor.name}
                                                      fill
                                                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                      <h3 className="text-2xl font-bold mb-1">{doctor.name}</h3>
                                                      <p className="text-emerald-300 text-sm font-medium">{doctor.credentials}</p>
                                                </div>
                                          </div>
                                          <div className="p-6">
                                                <div className="flex items-center gap-2 mb-3 text-emerald-600">
                                                      <Heart className="w-5 h-5" />
                                                      <span className="font-semibold">{doctor.specialty}</span>
                                                </div>
                                                <p className="text-gray-600 mb-4">{doctor.experience}</p>
                                                <button className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-4 transition-all">
                                                      View Profile
                                                      <ChevronRight className="w-5 h-5" />
                                                </button>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        <div className="text-center mt-12">
                              <button className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                                    Meet Our Entire Medical Team
                              </button>
                        </div>
                  </div>
            </section>
      );
};

export default FeaturedDoctors;
