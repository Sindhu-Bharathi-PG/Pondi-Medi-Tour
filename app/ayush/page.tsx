"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
      Leaf, Sparkles, Heart, Sun, Droplets, Wind, Flame, ChevronRight,
      CheckCircle, Award, Shield, BookOpen, Users, Clock, MapPin,
      GraduationCap, FileCheck, Building2
} from 'lucide-react';
import { Header, Footer } from '@/app/components/common';

// AYUSH Systems Data - Unique scientific/government focus
const ayushSystems = [
      {
            id: 'ayurveda',
            letter: 'A',
            name: 'Ayurveda',
            meaning: 'Science of Life',
            origin: '5,000+ years • Vedic India',
            icon: Leaf,
            color: 'from-green-600 to-emerald-500',
            bgColor: 'bg-green-50',
            textColor: 'text-green-700',
            principles: ['Tridosha Theory (Vata, Pitta, Kapha)', 'Prakriti Assessment', 'Panchakarma Detox'],
            recognition: 'AYUSH Ministry recognized, 400+ colleges, 500,000+ practitioners in India',
            uniqueToIndia: true,
      },
      {
            id: 'yoga',
            letter: 'Y',
            name: 'Yoga & Naturopathy',
            meaning: 'Union of Body, Mind, Spirit',
            origin: 'Ancient • Patanjali Yoga Sutras',
            icon: Sun,
            color: 'from-orange-500 to-amber-500',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700',
            principles: ['Ashtanga (8 Limbs)', 'Pranayama Breathing', 'Dhyana Meditation'],
            recognition: 'International Day of Yoga (June 21), UNESCO Heritage',
            uniqueToIndia: true,
      },
      {
            id: 'unani',
            letter: 'U',
            name: 'Unani Medicine',
            meaning: 'Greco-Arabic Healing',
            origin: 'Greek origins • Islamic development',
            icon: Droplets,
            color: 'from-blue-600 to-cyan-500',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700',
            principles: ['Four Humors (Akhlat)', 'Mizaj (Temperament)', 'Ilaj bil Tadbeer (Regimen)'],
            recognition: 'Central Council for Research in Unani Medicine (CCRUM)',
            uniqueToIndia: false,
      },
      {
            id: 'siddha',
            letter: 'S',
            name: 'Siddha Medicine',
            meaning: 'Perfected Healing',
            origin: '10,000+ years • Tamil Nadu',
            icon: Flame,
            color: 'from-red-600 to-orange-500',
            bgColor: 'bg-red-50',
            textColor: 'text-red-700',
            principles: ['96 Tattvas (Elements)', 'Varmam Therapy', 'Kayakalpa (Rejuvenation)'],
            recognition: 'Central Council for Research in Siddha (CCRS) - Pondicherry is Siddha heartland',
            uniqueToIndia: true,
      },
      {
            id: 'homeopathy',
            letter: 'H',
            name: 'Homeopathy',
            meaning: 'Like Cures Like',
            origin: '18th Century • Germany (Dr. Hahnemann)',
            icon: Heart,
            color: 'from-purple-600 to-pink-500',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-700',
            principles: ['Law of Similars', 'Minimum Dose', 'Individualized Treatment'],
            recognition: 'Central Council for Research in Homoeopathy (CCRH)',
            uniqueToIndia: false,
      },
];

// Government certifications
const certifications = [
      { name: 'AYUSH Ministry', desc: 'Official Government of India recognition', icon: Shield },
      { name: 'NABH Accredited', desc: 'National quality standards', icon: Award },
      { name: 'ISO Certified', desc: 'International quality management', icon: FileCheck },
      { name: 'State Licensed', desc: 'Puducherry Health Dept. approved', icon: Building2 },
];

// Why Pondicherry for AYUSH
const pondicherryAdvantages = [
      { title: 'Siddha Heartland', desc: 'Authentic Tamil Siddha medicine tradition native to this region', icon: MapPin },
      { title: 'Government Institutions', desc: 'Central Research Institute for Siddha (CRIS) located here', icon: Building2 },
      { title: 'Trained Practitioners', desc: '200+ licensed AYUSH practitioners with verified credentials', icon: GraduationCap },
      { title: 'Healing Environment', desc: 'Coastal climate ideal for recovery and rejuvenation', icon: Wind },
];

// Quality standards
const qualityStandards = [
      { metric: '100%', label: 'Licensed Practitioners', desc: 'Government-verified credentials' },
      { metric: 'NABH', label: 'Accredited Centers', desc: 'National quality standards' },
      { metric: 'GMP', label: 'Medicine Standards', desc: 'Good Manufacturing Practice' },
      { metric: '24/7', label: 'Medical Support', desc: 'Emergency coordination' },
];

const AyushPage = () => {
      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero Section - Government Premium Style */}
                  <section className="relative min-h-[70vh] flex items-center pt-20">
                        <div className="absolute inset-0">
                              <Image
                                    src="/images/generated/ayush_hero_traditional_healing_1765431175455.png"
                                    alt="Traditional AYUSH Healing"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/80 to-green-900/60" />
                        </div>

                        <div className="relative container mx-auto px-6 lg:px-8">
                              <div className="max-w-4xl">
                                    {/* Official Badge */}
                                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20">
                                          <Shield className="w-5 h-5 text-amber-400" />
                                          <span className="text-white text-sm font-medium tracking-wide">
                                                Government of India • Ministry of AYUSH Recognized Systems
                                          </span>
                                    </div>

                                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                                          Traditional
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-green-300">
                                                AYUSH Healing
                                          </span>
                                    </h1>

                                    <p className="text-xl md:text-2xl text-green-100 leading-relaxed mb-10 max-w-3xl">
                                          Experience India&apos;s officially recognized traditional medicine systems.
                                          Authentic therapies delivered by licensed practitioners in certified wellness centers.
                                    </p>

                                    {/* AYUSH Letters Visual */}
                                    <div className="flex gap-2 mb-10">
                                          {['A', 'Y', 'U', 'S', 'H'].map((letter, i) => (
                                                <div
                                                      key={letter}
                                                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg"
                                                      style={{
                                                            background: ['#16a34a', '#f97316', '#0284c7', '#dc2626', '#9333ea'][i]
                                                      }}
                                                >
                                                      {letter}
                                                </div>
                                          ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                          <Link
                                                href="/booking"
                                                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                                          >
                                                Find Certified Practitioner
                                                <ChevronRight className="w-5 h-5" />
                                          </Link>
                                          <Link
                                                href="#systems"
                                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                                          >
                                                Learn About AYUSH
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Heal in India - Strategic Alignment */}
                  <section className="py-10 bg-white border-b border-gray-100">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
                                    <div className="flex items-center gap-6">
                                          {/* Placeholder for Logo - In a real app this would be the actual SVG */}
                                          <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-amber-500">
                                                <Sun className="w-10 h-10 text-amber-600" />
                                          </div>
                                          <div>
                                                <div className="text-amber-600 font-bold tracking-wider text-sm mb-1 uppercase">National Initiative</div>
                                                <h3 className="text-3xl font-bold text-gray-900">Heal in India</h3>
                                                <p className="text-gray-600 max-w-md">
                                                      Official partner of the Government of India&apos;s initiative to promote holistic wellness tourism.
                                                </p>
                                          </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                          <div className="text-right hidden md:block">
                                                <div className="text-sm font-semibold text-gray-900">New: AYUSH Visa (AY)</div>
                                                <div className="text-xs text-gray-500">Simplified entry for wellness travelers</div>
                                          </div>
                                          <Link href="/visa" className="bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-700 transition shadow-lg shadow-amber-200">
                                                Visa Details
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* What is AYUSH - Official Definition */}
                  <section className="py-12 md:py-16 bg-gradient-to-b from-green-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="max-w-4xl mx-auto">
                                    <div className="text-center mb-10">
                                          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
                                                <BookOpen className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Official Definition</span>
                                          </div>
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                                What is AYUSH?
                                          </h2>
                                    </div>

                                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-l-4 border-green-500">
                                          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                                                <strong className="text-green-700">AYUSH</strong> is an acronym for India&apos;s traditional
                                                and alternative medicine systems, officially recognized and regulated by the
                                                <strong className="text-green-700"> Ministry of AYUSH, Government of India</strong>.
                                          </p>
                                          <div className="grid md:grid-cols-2 gap-6">
                                                <div className="flex items-start gap-4">
                                                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                                                      <div>
                                                            <h4 className="font-semibold text-gray-800">Legally Recognized</h4>
                                                            <p className="text-gray-600 text-sm">Practitioners are licensed under Indian Medical Acts</p>
                                                      </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                                                      <div>
                                                            <h4 className="font-semibold text-gray-800">Quality Controlled</h4>
                                                            <p className="text-gray-600 text-sm">Medicines meet pharmacopoeial standards</p>
                                                      </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                                                      <div>
                                                            <h4 className="font-semibold text-gray-800">Research Backed</h4>
                                                            <p className="text-gray-600 text-sm">Central Research Councils for each system</p>
                                                      </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                                                      <div>
                                                            <h4 className="font-semibold text-gray-800">Globally Exported</h4>
                                                            <p className="text-gray-600 text-sm">$500M+ annual exports of AYUSH products</p>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* The Six AYUSH Systems - Detailed Cards */}
                  <section id="systems" className="py-12 md:py-16 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-10">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          The Six Healing Systems
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          Each system has unique principles, methodologies, and therapeutic applications
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {ayushSystems.map((system) => (
                                          <div
                                                key={system.id}
                                                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group"
                                          >
                                                {/* Header with Letter */}
                                                <div className={`p-6 bg-gradient-to-r ${system.color} text-white`}>
                                                      <div className="flex items-center justify-between mb-4">
                                                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                                                                  <span className="text-3xl font-bold">{system.letter}</span>
                                                            </div>
                                                            {system.uniqueToIndia && (
                                                                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                                                                        🇮🇳 Unique to India
                                                                  </span>
                                                            )}
                                                      </div>
                                                      <h3 className="text-2xl font-bold mb-1">{system.name}</h3>
                                                      <p className="text-white/80 text-sm">{system.meaning}</p>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{system.origin}</span>
                                                      </div>

                                                      <h4 className="font-semibold text-gray-800 mb-3">Core Principles:</h4>
                                                      <ul className="space-y-2 mb-4">
                                                            {system.principles.map((principle, i) => (
                                                                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                                        <div className={`w-1.5 h-1.5 rounded-full mt-2 bg-gradient-to-r ${system.color}`} />
                                                                        {principle}
                                                                  </li>
                                                            ))}
                                                      </ul>

                                                      <div className={`${system.bgColor} rounded-xl p-4`}>
                                                            <p className={`text-sm ${system.textColor}`}>
                                                                  <strong>Recognition:</strong> {system.recognition}
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Quality & Certifications */}
                  <section className="py-12 md:py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-10">
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                          Quality Assurance Standards
                                    </h2>
                                    <p className="text-xl text-green-100 max-w-2xl mx-auto">
                                          All our partner centers meet strict government quality requirements
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-4 gap-4 mb-10">
                                    {qualityStandards.map((item, i) => (
                                          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10">
                                                <div className="text-4xl md:text-5xl font-bold mb-2">{item.metric}</div>
                                                <div className="font-semibold text-lg mb-1">{item.label}</div>
                                                <div className="text-green-200 text-sm">{item.desc}</div>
                                          </div>
                                    ))}
                              </div>

                              <div className="grid md:grid-cols-4 gap-6">
                                    {certifications.map((cert, i) => (
                                          <div key={i} className="bg-white/5 backdrop-blur-md rounded-xl p-6 flex items-start gap-4 border border-white/10">
                                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                                      <cert.icon className="w-6 h-6 text-amber-300" />
                                                </div>
                                                <div>
                                                      <h4 className="font-semibold mb-1">{cert.name}</h4>
                                                      <p className="text-green-200 text-sm">{cert.desc}</p>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Why Pondicherry for AYUSH */}
                  <section className="py-12 md:py-16 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="grid lg:grid-cols-2 gap-10 items-center">
                                    <div>
                                          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-6">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Regional Excellence</span>
                                          </div>
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                                Why Pondicherry for
                                                <span className="text-green-600"> AYUSH?</span>
                                          </h2>
                                          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                                                Pondicherry is uniquely positioned as a hub for authentic AYUSH therapies,
                                                particularly Siddha medicine which originated in the Tamil region.
                                          </p>

                                          <div className="space-y-6">
                                                {pondicherryAdvantages.map((adv, i) => (
                                                      <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5">
                                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                                                                  <adv.icon className="w-6 h-6 text-green-600" />
                                                            </div>
                                                            <div>
                                                                  <h4 className="font-semibold text-gray-800 mb-1">{adv.title}</h4>
                                                                  <p className="text-gray-600 text-sm">{adv.desc}</p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    <div className="relative">
                                          <div className="grid grid-cols-2 gap-4">
                                                <Image
                                                      src="/images/generated/ayush_grid_ayurveda_treatment_1765431192823.png"
                                                      alt="Ayurveda Treatment"
                                                      width={300}
                                                      height={400}
                                                      className="rounded-2xl shadow-xl object-cover h-64 w-full"
                                                />
                                                <Image
                                                      src="/images/generated/ayush_grid_yoga_practice_1765431210782.png"
                                                      alt="Yoga Practice"
                                                      width={300}
                                                      height={400}
                                                      className="rounded-2xl shadow-xl object-cover h-64 w-full mt-8"
                                                />
                                                <Image
                                                      src="/images/generated/ayush_grid_traditional_medicine_1765431226565.png"
                                                      alt="Traditional Medicine"
                                                      width={300}
                                                      height={400}
                                                      className="rounded-2xl shadow-xl object-cover h-64 w-full"
                                                />
                                                <Image
                                                      src="/images/generated/ayush_grid_wellness_center_1765431243792.png"
                                                      alt="Wellness Center"
                                                      width={300}
                                                      height={400}
                                                      className="rounded-2xl shadow-xl object-cover h-64 w-full mt-8"
                                                />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* How to Choose - Guidance */}
                  <section className="py-12 md:py-16 bg-gradient-to-b from-green-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-10">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Which System is Right for You?
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          Our practitioners will help determine the best approach based on your health goals
                                    </p>
                              </div>

                              <div className="max-w-5xl mx-auto">
                                    <div className="grid md:grid-cols-3 gap-8">
                                          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-green-500">
                                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                                      <Leaf className="w-8 h-8 text-green-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-3">Chronic Conditions</h3>
                                                <p className="text-gray-600 mb-4">
                                                      Ayurveda & Siddha excel at managing long-term conditions through lifestyle modification
                                                </p>
                                                <div className="text-sm text-green-600 font-medium">
                                                      Arthritis • Diabetes • Digestive Issues
                                                </div>
                                          </div>

                                          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-orange-500">
                                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                                      <Sun className="w-8 h-8 text-orange-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-3">Stress & Mental Health</h3>
                                                <p className="text-gray-600 mb-4">
                                                      Yoga, meditation, and naturopathy provide powerful tools for mental wellness
                                                </p>
                                                <div className="text-sm text-orange-600 font-medium">
                                                      Anxiety • Depression • Burnout
                                                </div>
                                          </div>

                                          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-purple-500">
                                                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                                      <Heart className="w-8 h-8 text-purple-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-3">Gentle Healing</h3>
                                                <p className="text-gray-600 mb-4">
                                                      Homeopathy offers side-effect-free treatment suitable for all ages
                                                </p>
                                                <div className="text-sm text-purple-600 font-medium">
                                                      Allergies • Children • Elderly
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-12 md:py-16 bg-gradient-to-r from-gray-900 to-gray-800">
                        <div className="container mx-auto px-6 lg:px-8 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    Begin Your AYUSH Healing Journey
                              </h2>
                              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                    Connect with certified practitioners and discover the right traditional therapy for your needs
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link
                                          href="/booking"
                                          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                                    >
                                          Find Certified Practitioner
                                          <ChevronRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                          href="/wellness"
                                          className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                                    >
                                          View Wellness Packages
                                    </Link>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default AyushPage;
