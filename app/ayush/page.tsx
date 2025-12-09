"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Sparkles, Heart, Sun, Moon, Droplets, Wind, Flame, ChevronRight, CheckCircle, Star, Clock, Award, MapPin } from 'lucide-react';
import { Header, Footer } from '@/app/components/common';
import { useScrolled } from '@/app/hooks';

const AyushPage = () => {
      const scrolled = useScrolled(50);

      const therapies = [
            {
                  id: 'ayurveda',
                  name: 'Ayurveda',
                  icon: Leaf,
                  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                  description: 'Ancient Indian healing system focusing on balance of body, mind, and spirit through herbs, diet, and lifestyle.',
                  treatments: ['Panchakarma Detox', 'Abhyanga Massage', 'Shirodhara', 'Nasya', 'Herbal Steam Bath'],
                  duration: '7-21 days',
                  color: 'from-green-600 to-emerald-500'
            },
            {
                  id: 'yoga',
                  name: 'Yoga & Pranayama',
                  icon: Sun,
                  image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
                  description: 'Transform your body and mind through ancient yogic practices, breathing techniques, and meditation.',
                  treatments: ['Hatha Yoga', 'Ashtanga Yoga', 'Pranayama', 'Yoga Nidra', 'Meditation'],
                  duration: '3-14 days',
                  color: 'from-orange-500 to-amber-500'
            },
            {
                  id: 'unani',
                  name: 'Unani Medicine',
                  icon: Droplets,
                  image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800',
                  description: 'Traditional Greco-Arabic medicine system using natural elements to restore body\'s natural balance.',
                  treatments: ['Hijama (Cupping)', 'Hammam Bath', 'Dalak Massage', 'Herbal Remedies', 'Diet Therapy'],
                  duration: '5-14 days',
                  color: 'from-blue-600 to-cyan-500'
            },
            {
                  id: 'siddha',
                  name: 'Siddha Medicine',
                  icon: Flame,
                  image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800',
                  description: 'Ancient Tamil Nadu healing tradition using herbs, minerals, and spiritual practices for holistic health.',
                  treatments: ['Varmam Therapy', 'Thokkanam', 'Purgation', 'Herbal Medicine', 'Kayakalpa'],
                  duration: '7-21 days',
                  color: 'from-red-600 to-orange-500'
            },
            {
                  id: 'naturopathy',
                  name: 'Naturopathy',
                  icon: Wind,
                  image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
                  description: 'Nature cure using the healing power of natural elements - water, earth, air, sunlight, and fasting.',
                  treatments: ['Hydrotherapy', 'Mud Therapy', 'Fasting Therapy', 'Diet Therapy', 'Massage'],
                  duration: '5-14 days',
                  color: 'from-teal-600 to-cyan-500'
            },
            {
                  id: 'homeopathy',
                  name: 'Homeopathy',
                  icon: Heart,
                  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
                  description: 'Gentle healing system using highly diluted natural substances to stimulate the body\'s healing response.',
                  treatments: ['Constitutional Treatment', 'Acute Care', 'Chronic Disease Care', 'Mental Health', 'Preventive Care'],
                  duration: 'Ongoing',
                  color: 'from-purple-600 to-pink-500'
            },
      ];

      const centers = [
            { name: 'Quiet Healing Centre', location: 'Auroville', specialty: 'Naturopathy & Yoga', rating: 4.9 },
            { name: 'Auroville Ayurveda', location: 'Auroville', specialty: 'Traditional Ayurveda', rating: 4.8 },
            { name: 'Svastha Wellness', location: 'White Town', specialty: 'Siddha & Yoga', rating: 4.7 },
            { name: 'Ananda Spa', location: 'ECR', specialty: 'Holistic Wellness', rating: 4.8 },
      ];

      return (
            <div className="min-h-screen bg-white">
                  <Header scrolled={scrolled} />

                  {/* Hero Section */}
                  <section className="relative h-screen min-h-[700px] flex items-center">
                        <div className="absolute inset-0">
                              <Image
                                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920"
                                    alt="AYUSH Wellness"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-transparent" />
                        </div>

                        <div className="relative container mx-auto px-4">
                              <div className="max-w-3xl">
                                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full mb-6">
                                          <div className="flex -space-x-1">
                                                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">A</span>
                                                <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">Y</span>
                                                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">U</span>
                                                <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">S</span>
                                                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">H</span>
                                          </div>
                                          <span className="text-white text-sm font-medium">Ayurveda • Yoga • Unani • Siddha • Homeopathy</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                          Ancient Wisdom
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-green-300">
                                                Modern Healing
                                          </span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-green-100 leading-relaxed mb-8 max-w-2xl">
                                          Discover India&apos;s traditional healing systems in the spiritual haven of Pondicherry.
                                          Experience authentic AYUSH therapies in certified wellness centers.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                          <Link href="/booking" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                                                Start Your Healing Journey
                                                <ChevronRight className="w-5 h-5" />
                                          </Link>
                                          <Link href="#therapies" className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                                                Explore Therapies
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* AYUSH Explained */}
                  <section className="py-20 bg-gradient-to-b from-green-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          What is AYUSH?
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          AYUSH stands for India&apos;s traditional and alternative medicine systems,
                                          recognized and regulated by the Government of India for holistic healthcare.
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                                    {[
                                          { letter: 'A', word: 'Ayurveda', color: 'bg-green-500' },
                                          { letter: 'Y', word: 'Yoga', color: 'bg-orange-500' },
                                          { letter: 'U', word: 'Unani', color: 'bg-blue-500' },
                                          { letter: 'S', word: 'Siddha', color: 'bg-red-500' },
                                          { letter: 'H', word: 'Homeopathy', color: 'bg-purple-500' },
                                          { letter: '+', word: 'Naturopathy', color: 'bg-teal-500' },
                                    ].map((item, i) => (
                                          <div key={i} className="text-center">
                                                <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-3 text-white text-3xl font-bold shadow-lg`}>
                                                      {item.letter}
                                                </div>
                                                <span className="font-semibold text-gray-700">{item.word}</span>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Therapies */}
                  <section id="therapies" className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Traditional Healing Systems
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Explore authentic AYUSH therapies delivered by certified practitioners
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {therapies.map((therapy) => (
                                          <div key={therapy.id} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                                                <div className="relative h-56">
                                                      <Image
                                                            src={therapy.image}
                                                            alt={therapy.name}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                      />
                                                      <div className={`absolute inset-0 bg-gradient-to-t ${therapy.color} opacity-80`} />
                                                      <div className="absolute inset-0 flex items-center justify-center">
                                                            <therapy.icon className="w-16 h-16 text-white" />
                                                      </div>
                                                      <div className="absolute bottom-4 left-4">
                                                            <h3 className="text-2xl font-bold text-white">{therapy.name}</h3>
                                                      </div>
                                                </div>
                                                <div className="p-6">
                                                      <p className="text-gray-600 mb-4">{therapy.description}</p>
                                                      <div className="flex items-center gap-2 mb-4 text-sm text-green-600">
                                                            <Clock className="w-4 h-4" />
                                                            <span>Typical duration: {therapy.duration}</span>
                                                      </div>
                                                      <div className="flex flex-wrap gap-2 mb-4">
                                                            {therapy.treatments.slice(0, 3).map((t, i) => (
                                                                  <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                                                        {t}
                                                                  </span>
                                                            ))}
                                                      </div>
                                                      <Link href={`/ayush/${therapy.id}`} className={`block w-full text-center py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${therapy.color} hover:shadow-lg transition-all`}>
                                                            Learn More
                                                      </Link>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Certified Centers */}
                  <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold mb-4">Certified AYUSH Centers</h2>
                                    <p className="text-green-100 text-xl">Government-recognized wellness centers in Pondicherry</p>
                              </div>
                              <div className="grid md:grid-cols-4 gap-6">
                                    {centers.map((center, i) => (
                                          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all">
                                                <div className="flex items-center gap-1 mb-3">
                                                      {[...Array(5)].map((_, j) => (
                                                            <Star key={j} className={`w-4 h-4 ${j < Math.floor(center.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} />
                                                      ))}
                                                      <span className="ml-2 text-sm">{center.rating}</span>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">{center.name}</h3>
                                                <div className="flex items-center gap-2 text-green-200 text-sm mb-2">
                                                      <MapPin className="w-4 h-4" />
                                                      {center.location}
                                                </div>
                                                <p className="text-green-100 text-sm">{center.specialty}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl font-bold text-gray-800 mb-6">Begin Your AYUSH Journey</h2>
                              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                    Experience the healing wisdom of ancient India in the serene environment of Pondicherry.
                              </p>
                              <Link href="/booking" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
                                    Book AYUSH Consultation <ChevronRight className="w-5 h-5" />
                              </Link>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default AyushPage;
