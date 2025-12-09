"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Sun, Sparkles, Heart, MapPin, Star, ChevronRight, Waves, TreePine, Moon, Wind, Droplets, ArrowRight, Play } from 'lucide-react';

const WellnessHome = () => {
      const [isVisible, setIsVisible] = useState(false);
      const [activeTestimonial, setActiveTestimonial] = useState(0);

      useEffect(() => {
            setIsVisible(true);
            const timer = setInterval(() => {
                  setActiveTestimonial(prev => (prev + 1) % 3);
            }, 5000);
            return () => clearInterval(timer);
      }, []);

      const experiences = [
            {
                  icon: Leaf,
                  title: 'AYUSH Therapies',
                  description: 'Ancient healing wisdom of Ayurveda, Yoga, Unani, Siddha & Naturopathy',
                  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600',
                  link: '/ayush',
                  color: 'from-green-500 to-emerald-500'
            },
            {
                  icon: Sun,
                  title: 'Yoga & Meditation',
                  description: 'Transform your mind and body in spiritual Auroville ashrams',
                  image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600',
                  link: '/yoga-meditation',
                  color: 'from-orange-500 to-amber-500'
            },
            {
                  icon: Sparkles,
                  title: 'Spa & Rejuvenation',
                  description: 'Luxurious treatments blending Eastern and Western techniques',
                  image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
                  link: '/spa-rejuvenation',
                  color: 'from-purple-500 to-pink-500'
            },
            {
                  icon: Waves,
                  title: 'Beach Wellness',
                  description: 'Healing retreats along the pristine Bay of Bengal coastline',
                  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
                  link: '/wellness',
                  color: 'from-cyan-500 to-blue-500'
            },
      ];

      const testimonials = [
            { name: 'Emily Sanders', location: 'London, UK', text: 'The Ayurvedic retreat changed my life. I feel 10 years younger!', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
            { name: 'David Chen', location: 'Singapore', text: 'Best yoga teacher training I\'ve ever experienced. Truly transformative.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
            { name: 'Maria Garcia', location: 'Madrid, Spain', text: 'The spa treatments were heavenly. Pondicherry is paradise!', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200' },
      ];

      const highlights = [
            { icon: TreePine, label: 'Auroville', value: 'Spiritual Township' },
            { icon: Moon, label: 'Ashram', value: 'Sri Aurobindo' },
            { icon: Waves, label: 'Beaches', value: '35km Coastline' },
            { icon: Leaf, label: 'AYUSH', value: '50+ Centers' },
      ];

      return (
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Hero Section */}
                  <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
                        {/* Animated Background */}
                        <div className="absolute inset-0">
                              <Image
                                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920"
                                    alt="Wellness in Pondicherry"
                                    fill
                                    className="object-cover scale-105"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-orange-800/70 to-transparent" />

                              {/* Animated particles */}
                              <div className="absolute inset-0 overflow-hidden">
                                    {[...Array(20)].map((_, i) => (
                                          <div
                                                key={i}
                                                className="absolute w-2 h-2 bg-amber-300/30 rounded-full"
                                                style={{
                                                      left: `${Math.random() * 100}%`,
                                                      top: `${Math.random() * 100}%`,
                                                      animation: `floatUp ${3 + Math.random() * 2}s ease-in-out infinite`,
                                                      animationDelay: `${Math.random() * 2}s`,
                                                }}
                                          />
                                    ))}
                              </div>
                        </div>

                        <div className="relative container mx-auto px-4">
                              <div className="max-w-3xl">
                                    {/* Animated Badge */}
                                    <div
                                          className={`inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full mb-8 transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                                                }`}
                                    >
                                          <div className="flex items-center gap-1">
                                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                          </div>
                                          <span className="text-white text-sm font-medium">Holistic Wellness Destination</span>
                                    </div>

                                    {/* Animated Title */}
                                    <h1
                                          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                                }`}
                                    >
                                          <span className="block">Discover</span>
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 animate-pulse">
                                                Inner Peace
                                          </span>
                                    </h1>

                                    <p
                                          className={`text-xl md:text-2xl text-amber-100 leading-relaxed mb-10 max-w-2xl transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                                }`}
                                    >
                                          Experience ancient healing traditions in the spiritual haven of Pondicherry.
                                          Where Auroville&apos;s wisdom meets beachside serenity.
                                    </p>

                                    {/* Animated CTAs */}
                                    <div
                                          className={`flex flex-wrap gap-4 transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                                }`}
                                    >
                                          <Link
                                                href="/booking"
                                                className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 inline-flex items-center gap-2"
                                          >
                                                Start Your Journey
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                          </Link>
                                          <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2">
                                                <Play className="w-5 h-5" />
                                                Watch Video
                                          </button>
                                    </div>
                              </div>
                        </div>

                        {/* Floating Highlights */}
                        <div className="absolute bottom-8 left-0 right-0">
                              <div className="container mx-auto px-4">
                                    <div
                                          className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                                }`}
                                    >
                                          {highlights.map((item, i) => (
                                                <div
                                                      key={i}
                                                      className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center text-white hover:bg-white/20 transition-all hover:scale-105"
                                                      style={{ animationDelay: `${1.2 + i * 0.1}s` }}
                                                >
                                                      <item.icon className="w-6 h-6 mx-auto mb-2 text-amber-300" />
                                                      <div className="text-lg font-bold">{item.value}</div>
                                                      <div className="text-xs text-amber-200">{item.label}</div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                                    <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
                              </div>
                        </div>
                  </section>

                  {/* Wellness Experiences */}
                  <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-6">
                                          <Sparkles className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Transformative Experiences</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Your Wellness Journey Awaits
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Explore our curated wellness experiences designed to nurture your body, mind, and soul.
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {experiences.map((exp, i) => (
                                          <Link
                                                key={i}
                                                href={exp.link}
                                                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                                          >
                                                <div className="relative h-64 overflow-hidden">
                                                      <Image
                                                            src={exp.image}
                                                            alt={exp.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                      />
                                                      <div className={`absolute inset-0 bg-gradient-to-t ${exp.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
                                                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                                            <exp.icon className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                                                            <h3 className="text-xl font-bold text-center">{exp.title}</h3>
                                                      </div>
                                                </div>
                                                <div className="p-6">
                                                      <p className="text-gray-600 text-center">{exp.description}</p>
                                                      <div className="mt-4 text-center">
                                                            <span className="inline-flex items-center gap-1 text-amber-600 font-semibold group-hover:gap-2 transition-all">
                                                                  Explore <ChevronRight className="w-4 h-4" />
                                                            </span>
                                                      </div>
                                                </div>
                                          </Link>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Why Pondicherry */}
                  <section className="py-24 bg-gradient-to-r from-amber-600 to-orange-500 text-white overflow-hidden">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-16 items-center">
                                    <div>
                                          <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                                Why Wellness Seekers Choose Pondicherry
                                          </h2>
                                          <p className="text-xl text-amber-100 mb-8">
                                                A unique blend of French colonial charm, ancient Indian spirituality, and natural coastal beauty.
                                          </p>
                                          <div className="space-y-4">
                                                {[
                                                      { icon: TreePine, text: 'Auroville - UNESCO recognized spiritual community' },
                                                      { icon: Heart, text: 'Sri Aurobindo Ashram - World-famous meditation center' },
                                                      { icon: Waves, text: 'Pristine beaches for yoga and healing' },
                                                      { icon: Leaf, text: '50+ AYUSH certified wellness centers' },
                                                ].map((item, i) => (
                                                      <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                                            <item.icon className="w-6 h-6 text-amber-200" />
                                                            <span className="font-medium">{item.text}</span>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                                    <div className="relative">
                                          <div className="grid grid-cols-2 gap-4">
                                                <Image
                                                      src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400"
                                                      alt="Pondicherry"
                                                      width={250}
                                                      height={300}
                                                      className="rounded-2xl shadow-2xl"
                                                />
                                                <Image
                                                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400"
                                                      alt="Ayurveda"
                                                      width={250}
                                                      height={300}
                                                      className="rounded-2xl shadow-2xl mt-8"
                                                />
                                          </div>
                                          <div className="absolute -bottom-6 -right-6 bg-white text-gray-800 rounded-2xl shadow-xl p-6">
                                                <div className="text-4xl font-bold text-amber-600">4.9★</div>
                                                <div className="text-gray-500">Average Rating</div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Testimonials */}
                  <section className="py-24 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Transformative Stories</h2>
                                    <p className="text-xl text-gray-600">Hear from our wellness travelers</p>
                              </div>
                              <div className="max-w-4xl mx-auto">
                                    <div className="relative">
                                          {testimonials.map((t, i) => (
                                                <div
                                                      key={i}
                                                      className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 transition-all duration-500 ${activeTestimonial === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                                                            }`}
                                                >
                                                      <div className="flex flex-col md:flex-row items-center gap-8">
                                                            <Image
                                                                  src={t.image}
                                                                  alt={t.name}
                                                                  width={120}
                                                                  height={120}
                                                                  className="rounded-full border-4 border-amber-300"
                                                            />
                                                            <div>
                                                                  <p className="text-2xl text-gray-700 italic mb-4">&ldquo;{t.text}&rdquo;</p>
                                                                  <div className="flex items-center gap-2">
                                                                        <span className="font-bold text-gray-800">{t.name}</span>
                                                                        <span className="text-gray-400">•</span>
                                                                        <span className="text-gray-500">{t.location}</span>
                                                                  </div>
                                                                  <div className="flex gap-1 mt-2">
                                                                        {[...Array(5)].map((_, j) => (
                                                                              <Star key={j} className="w-5 h-5 text-amber-400 fill-current" />
                                                                        ))}
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                                    <div className="flex justify-center gap-2 mt-8">
                                          {testimonials.map((_, i) => (
                                                <button
                                                      key={i}
                                                      onClick={() => setActiveTestimonial(i)}
                                                      className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === i ? 'bg-amber-500 w-8' : 'bg-gray-300'
                                                            }`}
                                                />
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Ready to Transform Your Life?
                              </h2>
                              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                    Book your wellness retreat and discover the healing power of Pondicherry.
                              </p>
                              <Link
                                    href="/booking"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-10 py-5 rounded-full font-semibold text-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all"
                              >
                                    Begin Your Journey
                                    <ArrowRight className="w-6 h-6" />
                              </Link>
                        </div>
                  </section>
            </div>
      );
};

export default WellnessHome;
