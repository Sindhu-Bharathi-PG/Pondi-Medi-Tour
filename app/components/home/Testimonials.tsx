"use client";

import React from 'react';
import { Play, Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
      name: string;
      location: string;
      procedure: string;
      image: string;
      quote: string;
      isVideo?: boolean;
}

interface TestimonialsProps {
      testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
      return (
            <section className="py-20 bg-linear-to-r from-emerald-600 to-teal-600 text-white">
                  <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                              <h2 className="text-5xl font-bold mb-4">From Aches to Ease. Hear Their Stories.</h2>
                              <p className="text-xl text-emerald-100">Real patients. Real transformations.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                              {testimonials.map((testimonial, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                                          <div className="relative mb-4">
                                                <Image
                                                      src={testimonial.image}
                                                      alt={testimonial.name}
                                                      width={80}
                                                      height={80}
                                                      className="rounded-full border-4 border-white/30 object-cover"
                                                />
                                                {testimonial.isVideo && (
                                                      <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition">
                                                                  <Play className="w-6 h-6 text-emerald-600 ml-1" />
                                                            </div>
                                                      </div>
                                                )}
                                          </div>
                                          <div className="flex items-center gap-1 mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                          </div>
                                          <p className="text-white/90 mb-4 italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                                          <div className="border-t border-white/20 pt-4">
                                                <p className="font-bold">{testimonial.name}</p>
                                                <p className="text-emerald-100 text-sm">{testimonial.location} • {testimonial.procedure}</p>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        <div className="text-center mt-12">
                              <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                    See All Patient Stories
                              </button>
                        </div>
                  </div>
            </section>
      );
};

export default Testimonials;
