"use client";

import { motion } from 'framer-motion';
import { Award, Building2, ChevronRight, Globe, MapPin, Phone, Search, Shield, Star, Stethoscope, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Footer, Header } from '../components/common';
import { hospitals } from '../data/hospitals';

const filters = [
      { id: 'all', label: 'All Hospitals', icon: Building2 },
      { id: 'Private', label: 'Private', icon: Shield },
      { id: 'Government', label: 'Government', icon: Award },
      { id: 'Specialty', label: 'Specialty Centers', icon: Stethoscope },
      { id: 'Educational', label: 'Teaching Hospitals', icon: Globe },
];

const HospitalPage = () => {
      const [activeFilter, setActiveFilter] = useState('all');
      const [searchQuery, setSearchQuery] = useState('');

      const filteredHospitals = hospitals.filter(h => {
            const matchesFilter = activeFilter === 'all' || h.type === activeFilter;
            const matchesSearch = searchQuery === '' ||
                  h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  h.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesFilter && matchesSearch;
      });

      const featuredHospitals = filteredHospitals.filter(h => h.featured);
      // If we filter, we show all matching as "All Hospitals" below, keeping featured ones at top if needed or just separate.
      // The design has a "Featured" section and an "All" section. 
      // Let's show only featured in the top section (if they match filter) and ALL matching in the bottom section.


      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* Premium Hero Section */}
                  <section className="relative pt-24 pb-20 overflow-hidden hero-premium">
                        <div className="absolute inset-0">
                              <Image
                                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80"
                                    alt="World-class healthcare"
                                    fill
                                    className="object-cover opacity-20"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-[var(--medical-navy)]/95 via-[var(--medical-dark-teal)]/90 to-[var(--medical-teal)]/85" />
                        </div>

                        <div className="relative container-premium">
                              {/* Breadcrumb */}
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <ChevronRight className="w-4 h-4 mx-2" />
                                    <span className="text-white">Partner Hospitals</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className="gov-seal mb-6"
                                    >
                                          <span>50+ NABH Accredited Facilities</span>
                                    </motion.div>

                                    <motion.h1
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.1 }}
                                          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
                                    >
                                          World-Class
                                          <span className="block text-[var(--medical-gold)]">
                                                Partner Hospitals
                                          </span>
                                    </motion.h1>

                                    <motion.p
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.2 }}
                                          className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mb-8"
                                    >
                                          Every partner hospital is rigorously vetted for NABH/JCI accreditation,
                                          cutting-edge technology, and international patient safety standards.
                                          Experience healthcare that rivals the best in the world—at a fraction of the cost.
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
                                                      placeholder="Search hospitals or specialties..."
                                                      value={searchQuery}
                                                      onChange={(e) => setSearchQuery(e.target.value)}
                                                      className="flex-1 px-4 py-4 text-gray-800 focus:outline-none"
                                                />
                                                <button className="bg-[var(--medical-teal)] text-white px-6 py-4 font-semibold hover:bg-[var(--medical-dark-teal)] transition-all">
                                                      Search
                                                </button>
                                          </div>
                                    </motion.div>
                              </div>
                        </div>
                  </section>

                  {/* Stats Bar */}
                  <section className="bg-white py-8 shadow-lg relative z-10 border-b border-gray-100">
                        <div className="container-premium">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {[
                                          { value: '50+', label: 'Partner Hospitals', icon: Building2 },
                                          { value: '500+', label: 'Specialist Doctors', icon: Stethoscope },
                                          { value: '15,000+', label: 'International Patients/Year', icon: Globe },
                                          { value: '98.5%', label: 'Success Rate', icon: Award },
                                    ].map((stat, index) => (
                                          <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="text-center"
                                          >
                                                <stat.icon className="w-8 h-8 mx-auto mb-2 text-[var(--medical-teal)]" />
                                                <div className="text-3xl font-bold text-[var(--medical-navy)]">{stat.value}</div>
                                                <div className="text-sm text-[var(--medical-slate)]">{stat.label}</div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Filter & Results */}
                  <section className="section-premium">
                        <div className="container-premium">
                              {/* Filters */}
                              <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
                                    <div className="flex flex-wrap gap-3">
                                          {filters.map((filter) => (
                                                <button
                                                      key={filter.id}
                                                      onClick={() => setActiveFilter(filter.id)}
                                                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${activeFilter === filter.id
                                                            ? 'bg-[var(--medical-teal)] text-white shadow-lg'
                                                            : 'bg-white text-[var(--medical-slate)] hover:bg-gray-50 shadow'
                                                            }`}
                                                >
                                                      <filter.icon className="w-4 h-4" />
                                                      {filter.label}
                                                </button>
                                          ))}
                                    </div>
                                    <div className="text-[var(--medical-slate)]">
                                          Showing <span className="font-bold text-[var(--medical-teal)]">{filteredHospitals.length}</span> hospitals
                                    </div>
                              </div>

                              {/* Featured Hospitals */}
                              {featuredHospitals.length > 0 && (
                                    <div className="mb-16">
                                          <h2 className="text-2xl font-bold text-[var(--medical-navy)] mb-8 flex items-center gap-3">
                                                <Star className="w-7 h-7 text-[var(--medical-gold)]" />
                                                Featured Hospitals
                                          </h2>
                                          <div className="grid lg:grid-cols-2 gap-8">
                                                {featuredHospitals.map((hospital, index) => (
                                                      <motion.div
                                                            key={hospital.id}
                                                            initial={{ opacity: 0, y: 30 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: index * 0.1 }}
                                                      >
                                                            <Link href={`/hospital/${hospital.id}`} className="block">
                                                                  <div className="card-premium overflow-hidden group cursor-pointer">
                                                                        <div className="flex flex-col md:flex-row">
                                                                              <div className="relative md:w-2/5 h-64 md:h-auto">
                                                                                    <Image
                                                                                          src={hospital.image}
                                                                                          alt={hospital.name}
                                                                                          fill
                                                                                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                                    />
                                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                                                    <div className="absolute top-4 left-4 flex gap-2">
                                                                                          {hospital.accreditation.map((acc, i) => (
                                                                                                <span key={i} className="bg-[var(--medical-gold)] text-[var(--medical-navy)] px-3 py-1 rounded-full text-xs font-bold">
                                                                                                      {acc}
                                                                                                </span>
                                                                                          ))}
                                                                                    </div>
                                                                                    <div className="absolute bottom-4 left-4">
                                                                                          <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm">
                                                                                                {hospital.tagline}
                                                                                          </span>
                                                                                    </div>
                                                                              </div>
                                                                              <div className="flex-1 p-6">
                                                                                    <div className="flex items-start justify-between mb-3">
                                                                                          <div>
                                                                                                <h3 className="text-2xl font-bold text-[var(--medical-navy)] group-hover:text-[var(--medical-teal)] transition-colors">{hospital.name}</h3>
                                                                                                <p className="text-[var(--medical-slate)] text-sm">{hospital.fullName}</p>
                                                                                          </div>
                                                                                          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                                                                                                <Star className="w-4 h-4 fill-current" />
                                                                                                <span className="font-bold">{hospital.rating}</span>
                                                                                          </div>
                                                                                    </div>

                                                                                    <p className="text-[var(--medical-slate)] mb-4 line-clamp-2">{hospital.description}</p>

                                                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                                                          {hospital.specialties.slice(0, 4).map((spec, i) => (
                                                                                                <span key={i} className="bg-[var(--medical-light-teal)] text-[var(--medical-teal)] px-3 py-1 rounded-full text-sm font-medium">
                                                                                                      {spec}
                                                                                                </span>
                                                                                          ))}
                                                                                          {hospital.specialties.length > 4 && (
                                                                                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                                                                                      +{hospital.specialties.length - 4} more
                                                                                                </span>
                                                                                          )}
                                                                                    </div>

                                                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                                                          <div className="flex items-center gap-4 text-sm text-[var(--medical-slate)]">
                                                                                                <span className="flex items-center gap-1">
                                                                                                      <MapPin className="w-4 h-4" />
                                                                                                      {hospital.location}
                                                                                                </span>
                                                                                                <span className="flex items-center gap-1">
                                                                                                      <Users className="w-4 h-4" />
                                                                                                      {hospital.beds} Beds
                                                                                                </span>
                                                                                          </div>
                                                                                          <span className="flex items-center gap-1 text-[var(--medical-teal)] font-semibold group-hover:gap-2 transition-all">
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
                              )}

                              {/* All Hospitals Grid */}
                              <div>
                                    <h2 className="text-2xl font-bold text-[var(--medical-navy)] mb-8 flex items-center gap-3">
                                          <Stethoscope className="w-7 h-7 text-[var(--medical-teal)]" />
                                          All Partner Hospitals
                                    </h2>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                          {filteredHospitals.map((hospital, index) => (
                                                <motion.div
                                                      key={hospital.id}
                                                      initial={{ opacity: 0, y: 30 }}
                                                      whileInView={{ opacity: 1, y: 0 }}
                                                      viewport={{ once: true }}
                                                      transition={{ delay: (index % 3) * 0.1 }}
                                                >
                                                      <Link href={`/hospital/${hospital.id}`} className="block h-full">
                                                            <div className="card-premium overflow-hidden group cursor-pointer h-full flex flex-col">
                                                                  <div className="relative h-52">
                                                                        <Image
                                                                              src={hospital.image}
                                                                              alt={hospital.name}
                                                                              fill
                                                                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                                        <div className="absolute top-4 left-4 flex gap-2">
                                                                              {hospital.accreditation.slice(0, 2).map((acc, i) => (
                                                                                    <span key={i} className="bg-[var(--medical-gold)] text-[var(--medical-navy)] px-2 py-0.5 rounded text-xs font-bold">
                                                                                          {acc}
                                                                                    </span>
                                                                              ))}
                                                                        </div>
                                                                        <div className="absolute bottom-4 left-4 right-4">
                                                                              <h3 className="text-xl font-bold text-white mb-1">{hospital.name}</h3>
                                                                              <p className="text-white/80 text-sm">{hospital.tagline}</p>
                                                                        </div>
                                                                  </div>
                                                                  <div className="p-5 flex-1 flex flex-col">
                                                                        <div className="flex items-center justify-between mb-3">
                                                                              <div className="flex items-center gap-1 text-[var(--medical-gold)]">
                                                                                    <Star className="w-4 h-4 fill-current" />
                                                                                    <span className="font-bold text-[var(--medical-navy)]">{hospital.rating}</span>
                                                                                    <span className="text-[var(--medical-slate)] text-sm">({hospital.reviewsRating.toLocaleString()})</span>
                                                                              </div>
                                                                              <span className="text-[var(--medical-slate)] text-sm">Est. {hospital.established}</span>
                                                                        </div>

                                                                        <div className="flex flex-wrap gap-1 mb-4">
                                                                              {hospital.specialties.slice(0, 3).map((spec, i) => (
                                                                                    <span key={i} className="bg-gray-100 text-[var(--medical-slate)] px-2 py-1 rounded text-xs">
                                                                                          {spec}
                                                                                    </span>
                                                                              ))}
                                                                        </div>

                                                                        <div className="mt-auto flex items-center justify-between">
                                                                              <span className="flex items-center gap-1 text-[var(--medical-slate)] text-sm">
                                                                                    <MapPin className="w-4 h-4" />
                                                                                    {hospital.location.split(',')[0]}
                                                                              </span>
                                                                              <span className="bg-[var(--medical-teal)] text-white px-4 py-2 rounded-lg font-medium text-sm group-hover:bg-[var(--medical-dark-teal)] transition-colors">
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
                        </div>
                  </section>

                  {/* CTA Section */}
                  <section className="py-20 bg-gradient-to-r from-[var(--medical-navy)] via-[var(--medical-dark-teal)] to-[var(--medical-teal)] text-white">
                        <div className="container-premium text-center">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                          Need Help Choosing the Right Hospital?
                                    </h2>
                                    <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                                          Our medical coordinators can recommend the best hospital based on your specific treatment needs, budget, and preferences.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                          <Link
                                                href="/booking"
                                                className="bg-white text-[var(--medical-teal)] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                          >
                                                Get Free Recommendation
                                          </Link>
                                          <a
                                                href="tel:+914132208787"
                                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                                          >
                                                <Phone className="w-5 h-5" />
                                                Speak to Expert
                                          </a>
                                    </div>
                              </motion.div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default HospitalPage;
