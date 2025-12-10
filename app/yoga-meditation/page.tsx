"use client";

import { Footer, Header } from '@/app/components/common';
import { ConvertedPrice } from '@/app/components/common/ConvertedPrice';
import { useScrolled } from '@/app/hooks';
import { CheckCircle, ChevronRight, Clock, Heart, Moon, Sun, Wind } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const YogaMeditationPage = () => {
      const scrolled = useScrolled(50);

      const programs = [
            {
                  name: 'Beginner Yoga Retreat',
                  duration: '5 days',
                  basePrice: 599,
                  image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
                  includes: ['Daily 2-hour yoga sessions', 'Pranayama classes', 'Meditation basics', 'Healthy vegetarian meals', 'Beach sunrise sessions'],
                  level: 'Beginner'
            },
            {
                  name: 'Advanced Ashtanga Intensive',
                  duration: '10 days',
                  basePrice: 1299,
                  image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
                  includes: ['5 hours daily practice', 'Mysore-style training', 'Philosophy lectures', 'One-on-one guidance', 'Certificate of completion'],
                  level: 'Advanced'
            },
            {
                  name: 'Silent Meditation Retreat',
                  duration: '7 days',
                  basePrice: 899,
                  image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800',
                  includes: ['Vipassana meditation', 'Noble silence practice', 'Walking meditation', 'Dharma talks', 'Ashram accommodation'],
                  level: 'All Levels'
            },
            {
                  name: 'Yoga Teacher Training (200hr)',
                  duration: '28 days',
                  basePrice: 2499,
                  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
                  includes: ['Yoga Alliance certified', 'Anatomy & philosophy', 'Teaching methodology', 'Practicum sessions', 'Lifetime support'],
                  level: 'Intermediate+'
            },
      ];

      // ... (rest of the file until the map function)

      {
            programs.map((program, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all flex flex-col md:flex-row">
                        <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                              <Image src={program.image} alt={program.name} fill className="object-cover" />
                              <div className="absolute top-4 left-4">
                                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">{program.level}</span>
                              </div>
                        </div>
                        <div className="flex-1 p-6">
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{program.name}</h3>
                              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{program.duration}</span>
                                    <span className="text-amber-600 font-semibold flex gap-1">
                                          From <ConvertedPrice amount={program.basePrice} fromCurrency="USD" />
                                    </span>
                              </div>
                              <ul className="space-y-2 mb-4">
                                    {program.includes.slice(0, 4).map((item, j) => (
                                          <li key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                                                <CheckCircle className="w-4 h-4 text-green-500" />{item}
                                          </li>
                                    ))}
                              </ul>
                              <Link href="/booking" className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg transition-all">
                                    Book Now
                              </Link>
                        </div>
                  </div>
            ))
      }

      const styles = [
            { name: 'Hatha Yoga', icon: Sun, desc: 'Traditional poses for balance' },
            { name: 'Ashtanga', icon: Wind, desc: 'Dynamic flowing sequences' },
            { name: 'Yin Yoga', icon: Moon, desc: 'Deep stretch & relaxation' },
            { name: 'Pranayama', icon: Heart, desc: 'Breath control techniques' },
      ];

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero */}
                  <section className="relative h-screen min-h-[700px] flex items-center">
                        <div className="absolute inset-0">
                              <Image src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920" alt="Yoga" fill className="object-cover" priority />
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-orange-800/70 to-transparent" />
                        </div>
                        <div className="relative container mx-auto px-4">
                              <div className="max-w-3xl">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <Sun className="w-5 h-5 text-amber-400" />
                                          <span className="text-white text-sm font-medium">Birthplace of Yoga • Auroville & Ashram Programs</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                                          Yoga &
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">Meditation</span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-2xl">
                                          Transform your life through authentic yoga practices in Pondicherry&apos;s spiritual centers.
                                          From beginner retreats to teacher training.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                          <Link href="/booking" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
                                                Book Retreat <ChevronRight className="w-5 h-5" />
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Yoga Styles */}
                  <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-4 gap-6">
                                    {styles.map((style, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all hover:-translate-y-2">
                                                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                      <style.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">{style.name}</h3>
                                                <p className="text-gray-600">{style.desc}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Programs */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Yoga Programs & Retreats</h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose from beginner-friendly retreats to advanced teacher training</p>
                              </div>
                              <div className="grid md:grid-cols-2 gap-8">
                                    {programs.map((program, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all flex flex-col md:flex-row">
                                                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                                                      <Image src={program.image} alt={program.name} fill className="object-cover" />
                                                      <div className="absolute top-4 left-4">
                                                            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">{program.level}</span>
                                                      </div>
                                                </div>
                                                <div className="flex-1 p-6">
                                                      <h3 className="text-xl font-bold text-gray-800 mb-2">{program.name}</h3>
                                                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{program.duration}</span>
                                                            <span className="text-amber-600 font-semibold flex gap-1">
                                                                  From <ConvertedPrice amount={program.basePrice} fromCurrency="USD" />
                                                            </span>
                                                      </div>
                                                      <ul className="space-y-2 mb-4">
                                                            {program.includes.slice(0, 4).map((item, j) => (
                                                                  <li key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                                                                        <CheckCircle className="w-4 h-4 text-green-500" />{item}
                                                                  </li>
                                                            ))}
                                                      </ul>
                                                      <Link href="/booking" className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg transition-all">
                                                            Book Now
                                                      </Link>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl font-bold mb-6">Find Your Inner Peace</h2>
                              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                                    Join thousands who have transformed their lives through yoga in Pondicherry.
                              </p>
                              <Link href="/booking" className="bg-white text-orange-600 px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all">
                                    Start Your Journey
                              </Link>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default YogaMeditationPage;
