"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
      Sun, Moon, Wind, Heart, ChevronRight, CheckCircle, Clock,
      MapPin, Users, Star, Calendar, GraduationCap, Award,
      BookOpen, Sparkles, ArrowRight
} from 'lucide-react';
import { Footer, Header } from '@/app/components/common';
import { ConvertedPrice } from '@/app/components/common/ConvertedPrice';

// Yoga Traditions/Lineages
const yogaStyles = [
      {
            name: 'Hatha Yoga',
            icon: Sun,
            description: 'Classical poses for physical balance and mental focus',
            intensity: 'Gentle to Moderate',
            bestFor: 'Beginners, All levels',
            color: 'from-amber-500 to-orange-500',
      },
      {
            name: 'Ashtanga Vinyasa',
            icon: Wind,
            description: 'Dynamic flowing sequences synchronized with breath',
            intensity: 'Moderate to Intense',
            bestFor: 'Intermediate, Athletes',
            color: 'from-blue-500 to-indigo-500',
      },
      {
            name: 'Kundalini Yoga',
            icon: Sparkles,
            description: 'Awakening spiritual energy through kriyas and meditation',
            intensity: 'Varies',
            bestFor: 'Spiritual seekers',
            color: 'from-purple-500 to-pink-500',
      },
      {
            name: 'Yin Yoga',
            icon: Moon,
            description: 'Deep stretching with long-held poses for flexibility',
            intensity: 'Gentle',
            bestFor: 'Recovery, Flexibility',
            color: 'from-teal-500 to-cyan-500',
      },
];

// Ashrams & Spiritual Centers
const spiritualCenters = [
      {
            name: 'Sri Aurobindo Ashram',
            type: 'Spiritual Community',
            image: '/images/generated/yoga_ashram_courtyard_1765431282553.png',
            description: 'World-renowned spiritual center founded by Sri Aurobindo. Offers meditation, integral yoga, and spiritual development programs.',
            programs: ['Morning meditation', 'Evening collective prayers', 'Karma yoga', 'Study circles'],
            location: 'White Town, Pondicherry',
            established: '1926',
      },
      {
            name: 'Auroville Yoga Centers',
            type: 'Experimental Township',
            image: '/images/generated/yoga_auroville_center_1765431301870.png',
            description: 'Multiple yoga and meditation centers within UNESCO-recognized Auroville. Focus on integral yoga and conscious living.',
            programs: ['Pitanga Cultural Centre', 'Quiet Healing Centre', 'Savitri Bhawan', 'Matrimandir meditation'],
            location: 'Auroville (12 km from city)',
            established: '1968',
      },
      {
            name: 'Traditional Yoga Shalas',
            type: 'Authentic Studios',
            image: '/images/generated/ayush_grid_yoga_practice_1765431210782.png',
            description: 'Local studios offering daily drop-in classes and short-term intensives in various yoga traditions.',
            programs: ['Morning Mysore', 'Evening Hatha', 'Weekend workshops', 'Private sessions'],
            location: 'Throughout Pondicherry',
            established: 'Various',
      },
];

// Teacher Training Programs
const teacherTraining = [
      {
            title: '200-Hour Teacher Training',
            duration: '28 days',
            certification: 'Yoga Alliance RYT-200',
            priceFrom: 2500,
            includes: ['Comprehensive curriculum', 'Anatomy & physiology', 'Teaching methodology', 'Practicum', 'Accommodation & meals'],
            nextBatch: 'Monthly',
      },
      {
            title: '300-Hour Advanced Training',
            duration: '45 days',
            certification: 'Yoga Alliance RYT-500',
            priceFrom: 3800,
            includes: ['Advanced asanas', 'Yoga therapy', 'Ayurveda basics', 'Business of yoga', 'Mentorship'],
            nextBatch: 'Quarterly',
      },
      {
            title: 'Meditation Teacher Training',
            duration: '21 days',
            certification: 'Certified Meditation Instructor',
            priceFrom: 1800,
            includes: ['Multiple techniques', 'Neuroscience of meditation', 'Guided practice', 'Teaching skills'],
            nextBatch: 'Bi-monthly',
      },
];

// Meditation & Pranayama
const meditationPractices = [
      { name: 'Vipassana', desc: 'Insight meditation for self-observation' },
      { name: 'Pranayama', desc: 'Breath control techniques' },
      { name: 'Yoga Nidra', desc: 'Conscious sleep for deep relaxation' },
      { name: 'Mantra Meditation', desc: 'Sound-based spiritual practice' },
      { name: 'Walking Meditation', desc: 'Mindful movement practice' },
      { name: 'Trataka', desc: 'Candle gazing for concentration' },
];

const YogaMeditationPage = () => {
      const [activeTab, setActiveTab] = useState<'programs' | 'training'>('programs');

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative min-h-[70vh] flex items-center pt-20">
                        <div className="absolute inset-0">
                              <Image
                                    src="/images/generated/yoga_hero_ocean_sunrise_1765431260796.png"
                                    alt="Yoga Practice"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-900/95 via-orange-800/80 to-transparent" />
                        </div>

                        <div className="relative container mx-auto px-6 lg:px-8">
                              <div className="max-w-4xl">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                                          <Sun className="w-5 h-5 text-amber-300" />
                                          <span className="text-white text-sm font-medium">
                                                Birthplace of Yoga • Authentic Lineages
                                          </span>
                                    </div>

                                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                                          Yoga &
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-200">
                                                Meditation
                                          </span>
                                    </h1>

                                    <p className="text-xl md:text-2xl text-orange-100 leading-relaxed mb-10 max-w-2xl">
                                          Experience authentic yoga in Pondicherry&apos;s renowned spiritual centers.
                                          From beginner retreats to advanced teacher training at Sri Aurobindo Ashram and Auroville.
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                          <Link
                                                href="#programs"
                                                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                                          >
                                                View Programs
                                                <ChevronRight className="w-5 h-5" />
                                          </Link>
                                          <Link
                                                href="#training"
                                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                                          >
                                                Teacher Training
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Yoga Styles Grid */}
                  <section className="py-12 bg-gradient-to-b from-orange-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                          Yoga Traditions We Offer
                                    </h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                          Explore various yoga styles taught by certified instructors in authentic lineages
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {yogaStyles.map((style, i) => (
                                          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group">
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${style.color} flex items-center justify-center mb-4`}>
                                                      <style.icon className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">{style.name}</h3>
                                                <p className="text-gray-600 text-sm mb-4">{style.description}</p>
                                                <div className="space-y-2 text-sm">
                                                      <div className="flex justify-between">
                                                            <span className="text-gray-500">Intensity:</span>
                                                            <span className="font-medium text-gray-700">{style.intensity}</span>
                                                      </div>
                                                      <div className="flex justify-between">
                                                            <span className="text-gray-500">Best for:</span>
                                                            <span className="font-medium text-gray-700">{style.bestFor}</span>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Spiritual Centers */}
                  <section id="programs" className="py-12 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-4">
                                          <MapPin className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Sacred Spaces</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Ashrams & Spiritual Centers
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          Pondicherry is home to world-renowned spiritual institutions offering authentic yoga and meditation
                                    </p>
                              </div>

                              <div className="space-y-6">
                                    {spiritualCenters.map((center, i) => (
                                          <div
                                                key={i}
                                                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
                                          >
                                                <div className="grid lg:grid-cols-2">
                                                      <div className="relative h-64 lg:h-auto">
                                                            <Image
                                                                  src={center.image}
                                                                  alt={center.name}
                                                                  fill
                                                                  className="object-cover"
                                                            />
                                                      </div>
                                                      <div className="p-8 lg:p-10">
                                                            <div className="flex items-center gap-2 text-sm text-amber-600 font-medium mb-2">
                                                                  <Sparkles className="w-4 h-4" />
                                                                  {center.type}
                                                            </div>
                                                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{center.name}</h3>
                                                            <p className="text-gray-600 mb-6">{center.description}</p>

                                                            <div className="mb-6">
                                                                  <h4 className="font-semibold text-gray-800 mb-3">Programs Offered:</h4>
                                                                  <div className="flex flex-wrap gap-2">
                                                                        {center.programs.map((program, j) => (
                                                                              <span key={j} className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-sm">
                                                                                    {program}
                                                                              </span>
                                                                        ))}
                                                                  </div>
                                                            </div>

                                                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                                                  <div className="flex items-center gap-1">
                                                                        <MapPin className="w-4 h-4" />
                                                                        {center.location}
                                                                  </div>
                                                                  <div className="flex items-center gap-1">
                                                                        <Calendar className="w-4 h-4" />
                                                                        Est. {center.established}
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Teacher Training */}
                  <section id="training" className="py-12 bg-gradient-to-b from-orange-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
                                          <GraduationCap className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Professional Certification</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Yoga Teacher Training
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Internationally recognized certifications in authentic yoga teaching
                                    </p>
                              </div>

                              <div className="grid lg:grid-cols-3 gap-6">
                                    {teacherTraining.map((program, i) => (
                                          <div
                                                key={i}
                                                className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all"
                                          >
                                                <div className="flex items-center gap-2 text-amber-600 mb-4">
                                                      <Award className="w-5 h-5" />
                                                      <span className="text-sm font-medium">{program.certification}</span>
                                                </div>

                                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{program.title}</h3>

                                                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                                                      <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {program.duration}
                                                      </div>
                                                      <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {program.nextBatch}
                                                      </div>
                                                </div>

                                                <ul className="space-y-3 mb-8">
                                                      {program.includes.map((item, j) => (
                                                            <li key={j} className="flex items-start gap-2 text-gray-600">
                                                                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                                  {item}
                                                            </li>
                                                      ))}
                                                </ul>

                                                <div className="pt-6 border-t border-gray-100">
                                                      <div className="flex items-center justify-between mb-4">
                                                            <div>
                                                                  <span className="text-sm text-gray-500">Starting from</span>
                                                                  <div className="text-2xl font-bold text-amber-600">
                                                                        <ConvertedPrice amount={program.priceFrom} fromCurrency="USD" />
                                                                  </div>
                                                            </div>
                                                      </div>
                                                      <Link
                                                            href="/booking"
                                                            className="block w-full text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                                                      >
                                                            Apply Now
                                                      </Link>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Meditation & Pranayama */}
                  <section className="py-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    <div>
                                          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                                                <Moon className="w-4 h-4" />
                                                <span className="text-sm font-medium">Inner Journey</span>
                                          </div>
                                          <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                                Meditation & Pranayama
                                          </h2>
                                          <p className="text-xl text-purple-100 mb-8">
                                                Go beyond asanas into the deeper practices of yoga. Learn ancient breathing
                                                and meditation techniques for lasting inner peace.
                                          </p>

                                          <div className="grid grid-cols-2 gap-4">
                                                {meditationPractices.map((practice, i) => (
                                                      <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                                            <h4 className="font-semibold mb-1">{practice.name}</h4>
                                                            <p className="text-purple-200 text-sm">{practice.desc}</p>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    <div className="relative">
                                          <Image
                                                src="/images/generated/yoga_meditation_close_up_1765431316106.png"
                                                alt="Meditation"
                                                width={600}
                                                height={500}
                                                className="rounded-3xl shadow-2xl"
                                          />
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-12 bg-white">
                        <div className="container mx-auto px-6 lg:px-8 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                    Begin Your Yoga Journey
                              </h2>
                              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                                    Whether you&apos;re a complete beginner or seeking advanced training,
                                    Pondicherry offers the perfect environment for your practice.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link
                                          href="/booking"
                                          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                                    >
                                          Book a Program
                                          <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                          href="/wellness"
                                          className="bg-gray-100 text-gray-700 px-10 py-5 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300"
                                    >
                                          View Complete Packages
                                    </Link>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default YogaMeditationPage;
