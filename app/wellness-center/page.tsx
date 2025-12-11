"use client";

import { motion } from 'framer-motion';
import { Award, Building2, ChevronRight, Heart, Leaf, MapPin, Phone, Search, Shield, Sparkles, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Footer, Header } from '../components/common';
import { wellnessCenters, wellnessCenterTypes, ayushSpecialties } from '../data/wellness-centers';

const WellnessCenterPage = () => {
      const [activeType, setActiveType] = useState('All');
      const [activeSpecialty, setActiveSpecialty] = useState('All');
      const [searchQuery, setSearchQuery] = useState('');

      const filteredCenters = wellnessCenters.filter(center => {
            const matchesType = activeType === 'All' || center.type === activeType;
            const matchesSpecialty = activeSpecialty === 'All' ||
                  center.specialties.some(s => s.toLowerCase().includes(activeSpecialty.toLowerCase()));
            const matchesSearch = searchQuery === '' ||
                  center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  center.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesType && matchesSpecialty && matchesSearch;
      });

      const featuredCenters = filteredCenters.filter(c => c.featured);

      return (
            <div className="min-h-screen bg-amber-50/30">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative pt-24 pb-20 overflow-hidden">
                        <div className="absolute inset-0">
                              <Image
                                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&q=80"
                                    alt="AYUSH Wellness Centers"
                                    fill
                                    className="object-cover opacity-20"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-amber-800/95 via-orange-700/90 to-amber-600/85" />
                        </div>

                        <div className="relative container mx-auto px-6 lg:px-8">
                              {/* Breadcrumb */}
                              <nav className="flex items-center text-white/70 mb-8 text-sm">
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <ChevronRight className="w-4 h-4 mx-2" />
                                    <span className="text-white">AYUSH Wellness Centers</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20"
                                    >
                                          <Leaf className="w-4 h-4 text-amber-300" />
                                          <span className="text-white text-sm font-medium">Heal in India • AYUSH Certified</span>
                                    </motion.div>

                                    <motion.h1
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.1 }}
                                          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
                                    >
                                          AYUSH Wellness
                                          <span className="block text-amber-200">
                                                Centers
                                          </span>
                                    </motion.h1>

                                    <motion.p
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.2 }}
                                          className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mb-8"
                                    >
                                          Discover authentic Ayurveda, Yoga, Siddha, Naturopathy, and Homeopathy centers in Pondicherry.
                                          Government-certified practitioners offering traditional healing therapies.
                                    </motion.p>

                                    {/* Search Bar */}
                                    <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.3 }}
                                          className="max-w-xl"
                                    >
                                          <div className="flex items-center bg-white rounded-xl shadow-2xl overflow-hidden">
                                                <Search className="w-5 h-5 text-gray-400 ml-4" />
                                                <input
                                                      type="text"
                                                      placeholder="Search centers or therapies..."
                                                      value={searchQuery}
                                                      onChange={(e) => setSearchQuery(e.target.value)}
                                                      className="flex-1 px-4 py-4 text-gray-800 focus:outline-none"
                                                />
                                                <button className="bg-amber-500 text-white px-6 py-4 font-semibold hover:bg-amber-600 transition-all">
                                                      Search
                                                </button>
                                          </div>
                                    </motion.div>
                              </div>
                        </div>
                  </section>

                  {/* Stats Bar */}
                  <section className="bg-white py-8 shadow-lg relative z-10 border-b border-gray-100">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {[
                                          { value: '50+', label: 'Wellness Centers', icon: Building2 },
                                          { value: '200+', label: 'AYUSH Practitioners', icon: Users },
                                          { value: '6', label: 'AYUSH Modalities', icon: Leaf },
                                          { value: '4.7', label: 'Average Rating', icon: Star },
                                    ].map((stat, index) => (
                                          <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="text-center"
                                          >
                                                <stat.icon className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                                                <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                                                <div className="text-sm text-gray-500">{stat.label}</div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Filters */}
                  <section className="py-8 bg-white border-b border-gray-100">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="space-y-4">
                                    {/* Type Filter */}
                                    <div>
                                          <span className="text-sm font-medium text-gray-600 mb-2 block">Center Type</span>
                                          <div className="flex flex-wrap gap-2">
                                                {wellnessCenterTypes.map((type) => (
                                                      <button
                                                            key={type}
                                                            onClick={() => setActiveType(type)}
                                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeType === type
                                                                        ? 'bg-amber-500 text-white shadow-lg'
                                                                        : 'bg-gray-100 text-gray-600 hover:bg-amber-100'
                                                                  }`}
                                                      >
                                                            {type}
                                                      </button>
                                                ))}
                                          </div>
                                    </div>

                                    {/* Specialty Filter */}
                                    <div>
                                          <span className="text-sm font-medium text-gray-600 mb-2 block">AYUSH Specialty</span>
                                          <div className="flex flex-wrap gap-2">
                                                {ayushSpecialties.map((specialty) => (
                                                      <button
                                                            key={specialty}
                                                            onClick={() => setActiveSpecialty(specialty)}
                                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSpecialty === specialty
                                                                        ? 'bg-green-600 text-white shadow-lg'
                                                                        : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                                                                  }`}
                                                      >
                                                            {specialty}
                                                      </button>
                                                ))}
                                          </div>
                                    </div>

                                    <div className="text-gray-500 text-sm pt-2">
                                          Showing <span className="font-bold text-amber-600">{filteredCenters.length}</span> wellness centers
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Featured Centers */}
                  {featuredCenters.length > 0 && (
                        <section className="py-12 bg-gradient-to-b from-amber-50/50 to-white">
                              <div className="container mx-auto px-6 lg:px-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                                          <Sparkles className="w-7 h-7 text-amber-500" />
                                          Featured Wellness Centers
                                    </h2>
                                    <div className="grid lg:grid-cols-2 gap-8">
                                          {featuredCenters.map((center, index) => (
                                                <motion.div
                                                      key={center.id}
                                                      initial={{ opacity: 0, y: 30 }}
                                                      whileInView={{ opacity: 1, y: 0 }}
                                                      viewport={{ once: true }}
                                                      transition={{ delay: index * 0.1 }}
                                                >
                                                      <Link href={`/wellness-center/${center.id}`} className="block">
                                                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all border border-gray-100">
                                                                  <div className="flex flex-col md:flex-row">
                                                                        <div className="relative md:w-2/5 h-64 md:h-auto">
                                                                              <Image
                                                                                    src={center.image}
                                                                                    alt={center.name}
                                                                                    fill
                                                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                              />
                                                                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                                              <div className="absolute top-4 left-4 flex gap-2">
                                                                                    {center.accreditation.slice(0, 2).map((acc, i) => (
                                                                                          <span key={i} className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                                                                {acc}
                                                                                          </span>
                                                                                    ))}
                                                                              </div>
                                                                              <div className="absolute bottom-4 left-4">
                                                                                    <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm">
                                                                                          {center.tagline}
                                                                                    </span>
                                                                              </div>
                                                                        </div>
                                                                        <div className="flex-1 p-6">
                                                                              <div className="flex items-start justify-between mb-3">
                                                                                    <div>
                                                                                          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">{center.name}</h3>
                                                                                          <p className="text-gray-500 text-sm">{center.fullName}</p>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                                                                                          <Star className="w-4 h-4 fill-current" />
                                                                                          <span className="font-bold">{center.rating}</span>
                                                                                    </div>
                                                                              </div>

                                                                              <p className="text-gray-600 mb-4 line-clamp-2">{center.description}</p>

                                                                              <div className="flex flex-wrap gap-2 mb-4">
                                                                                    {center.specialties.slice(0, 4).map((spec, i) => (
                                                                                          <span key={i} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                                                                                                {spec}
                                                                                          </span>
                                                                                    ))}
                                                                                    {center.specialties.length > 4 && (
                                                                                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                                                                                +{center.specialties.length - 4} more
                                                                                          </span>
                                                                                    )}
                                                                              </div>

                                                                              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                                                          <span className="flex items-center gap-1">
                                                                                                <MapPin className="w-4 h-4" />
                                                                                                {center.location}
                                                                                          </span>
                                                                                          <span className="flex items-center gap-1">
                                                                                                <Building2 className="w-4 h-4" />
                                                                                                {center.type}
                                                                                          </span>
                                                                                    </div>
                                                                                    <span className="flex items-center gap-1 text-amber-600 font-semibold group-hover:gap-2 transition-all">
                                                                                          View Details
                                                                                          <ChevronRight className="w-5 h-5" />
                                                                                    </span>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </Link>
                                                </motion.div>
                                          ))}
                                    </div>
                              </div>
                        </section>
                  )}

                  {/* All Centers Grid */}
                  <section className="py-12 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                                    <Leaf className="w-7 h-7 text-green-600" />
                                    All Wellness Centers
                              </h2>
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredCenters.map((center, index) => (
                                          <motion.div
                                                key={center.id}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: (index % 3) * 0.1 }}
                                          >
                                                <Link href={`/wellness-center/${center.id}`} className="block h-full">
                                                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all h-full flex flex-col border border-gray-100">
                                                            <div className="relative h-52">
                                                                  <Image
                                                                        src={center.image}
                                                                        alt={center.name}
                                                                        fill
                                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                  />
                                                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                                  <div className="absolute top-4 left-4 flex gap-2">
                                                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${center.type === 'Government'
                                                                                    ? 'bg-blue-500 text-white'
                                                                                    : center.type === 'Ashram'
                                                                                          ? 'bg-purple-500 text-white'
                                                                                          : center.type === 'Community'
                                                                                                ? 'bg-green-500 text-white'
                                                                                                : 'bg-amber-500 text-white'
                                                                              }`}>
                                                                              {center.type}
                                                                        </span>
                                                                  </div>
                                                                  <div className="absolute bottom-4 left-4 right-4">
                                                                        <h3 className="text-xl font-bold text-white mb-1">{center.name}</h3>
                                                                        <p className="text-white/80 text-sm">{center.tagline}</p>
                                                                  </div>
                                                            </div>
                                                            <div className="p-5 flex-1 flex flex-col">
                                                                  <div className="flex items-center justify-between mb-3">
                                                                        <div className="flex items-center gap-1 text-amber-500">
                                                                              <Star className="w-4 h-4 fill-current" />
                                                                              <span className="font-bold text-gray-800">{center.rating}</span>
                                                                              <span className="text-gray-400 text-sm">({center.reviewsCount})</span>
                                                                        </div>
                                                                        <span className="text-gray-400 text-sm">Est. {center.established}</span>
                                                                  </div>

                                                                  <div className="flex flex-wrap gap-1 mb-4">
                                                                        {center.specialties.slice(0, 3).map((spec, i) => (
                                                                              <span key={i} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                                                                                    {spec}
                                                                              </span>
                                                                        ))}
                                                                  </div>

                                                                  <div className="mt-auto flex items-center justify-between">
                                                                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                                                                              <MapPin className="w-4 h-4" />
                                                                              {center.location.split(',')[0]}
                                                                        </span>
                                                                        <span className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium text-sm group-hover:bg-amber-600 transition-colors">
                                                                              View Details
                                                                        </span>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </Link>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA Section */}
                  <section className="py-20 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 text-white">
                        <div className="container mx-auto px-6 lg:px-8 text-center">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <Heart className="w-12 h-12 mx-auto mb-4 text-amber-200" />
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                          Begin Your Healing Journey
                                    </h2>
                                    <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                                          Our wellness coordinators can recommend the best AYUSH center based on your health goals and preferences.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                          <Link
                                                href="/booking"
                                                className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                          >
                                                Get Free Consultation
                                          </Link>
                                          <Link
                                                href="/ayush"
                                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                                          >
                                                Learn About AYUSH
                                          </Link>
                                    </div>
                              </motion.div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default WellnessCenterPage;
