"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, MapPin, Star, Phone, Clock, Users, Shield, ChevronRight, Search, Filter, Heart, Stethoscope } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const HospitalPage = () => {
      const scrolled = useScrolled(50);
      const [activeFilter, setActiveFilter] = useState('all');

      const hospitals = [
            {
                  id: 1,
                  name: 'JIPMER',
                  fullName: 'Jawaharlal Institute of Postgraduate Medical Education & Research',
                  image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800',
                  rating: 4.9,
                  reviews: 2840,
                  specialties: ['Multi-Specialty', 'Cardiology', 'Oncology', 'Neurology'],
                  accreditation: ['NABH', 'NABL'],
                  location: 'Gorimedu, Pondicherry',
                  established: 1823,
                  beds: 2500,
                  type: 'government',
                  featured: true,
                  description: 'Premier government medical institution offering world-class treatment at affordable costs.'
            },
            {
                  id: 2,
                  name: 'PIMS',
                  fullName: 'Pondicherry Institute of Medical Sciences',
                  image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
                  rating: 4.8,
                  reviews: 1560,
                  specialties: ['Orthopedics', 'Cardiology', 'Neurosurgery', 'IVF'],
                  accreditation: ['NABH'],
                  location: 'Kalapet, Pondicherry',
                  established: 1999,
                  beds: 850,
                  type: 'private',
                  featured: true,
                  description: 'Leading private medical college offering cutting-edge treatments with personalized care.'
            },
            {
                  id: 3,
                  name: 'MGMCRI',
                  fullName: 'Mahatma Gandhi Medical College & Research Institute',
                  image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
                  rating: 4.7,
                  reviews: 1230,
                  specialties: ['General Surgery', 'Pediatrics', 'Gynecology', 'Ophthalmology'],
                  accreditation: ['NABH', 'NABL'],
                  location: 'Pillaiyarkuppam, Pondicherry',
                  established: 2007,
                  beds: 1200,
                  type: 'private',
                  description: 'Comprehensive healthcare with focus on research and advanced medical education.'
            },
            {
                  id: 4,
                  name: 'GEM Hospital',
                  fullName: 'GEM Hospital & Research Centre',
                  image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800',
                  rating: 4.9,
                  reviews: 980,
                  specialties: ['Gastroenterology', 'Bariatric Surgery', 'Laparoscopy'],
                  accreditation: ['NABH', 'JCI'],
                  location: 'East Coast Road, Pondicherry',
                  established: 2005,
                  beds: 300,
                  type: 'specialty',
                  featured: true,
                  description: 'Asia\'s premier gastroenterology center with internationally trained specialists.'
            },
            {
                  id: 5,
                  name: 'Aravind Eye Hospital',
                  fullName: 'Aravind Eye Hospital',
                  image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
                  rating: 4.9,
                  reviews: 3200,
                  specialties: ['Cataract Surgery', 'LASIK', 'Retina', 'Glaucoma'],
                  accreditation: ['NABH'],
                  location: 'Cuddalore Road, Pondicherry',
                  established: 2003,
                  beds: 250,
                  type: 'specialty',
                  description: 'World-renowned eye care with highest volume of cataract surgeries globally.'
            },
            {
                  id: 6,
                  name: 'POSH Hospital',
                  fullName: 'Pondy Ortho Speciality Hospital',
                  image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
                  rating: 4.8,
                  reviews: 890,
                  specialties: ['Joint Replacement', 'Spine Surgery', 'Sports Medicine', 'Trauma'],
                  accreditation: ['NABH'],
                  location: 'Anna Nagar, Pondicherry',
                  established: 2010,
                  beds: 150,
                  type: 'specialty',
                  description: 'Leading orthopedic center with internationally trained surgeons and latest technology.'
            },
      ];

      const filters = [
            { id: 'all', label: 'All Hospitals' },
            { id: 'private', label: 'Private' },
            { id: 'government', label: 'Government' },
            { id: 'specialty', label: 'Specialty Centers' },
      ];

      const filteredHospitals = activeFilter === 'all'
            ? hospitals
            : hospitals.filter(h => h.type === activeFilter);

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header scrolled={scrolled} />

                  {/* Hero Section */}
                  <section className="relative pt-32 pb-20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />
                        <div className="absolute inset-0 opacity-20">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600')] bg-cover bg-center" />
                        </div>

                        <div className="relative container mx-auto px-4">
                              <div className="max-w-4xl mx-auto text-center text-white">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <Shield className="w-5 h-5 text-yellow-400" />
                                          <span className="text-sm font-medium">50+ NABH Accredited Hospitals</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                          World-Class Hospitals
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                                                International Standards
                                          </span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
                                          Explore our network of NABH-accredited hospitals offering advanced medical care at 60-80% lower costs.
                                    </p>

                                    {/* Search Bar */}
                                    <div className="max-w-2xl mx-auto relative">
                                          <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden">
                                                <Search className="w-6 h-6 text-gray-400 ml-6" />
                                                <input
                                                      type="text"
                                                      placeholder="Search hospitals, specialties, or treatments..."
                                                      className="flex-1 px-4 py-5 text-gray-800 focus:outline-none"
                                                />
                                                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-5 font-semibold hover:shadow-lg transition-all">
                                                      Search
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Stats Bar */}
                  <section className="bg-white py-8 shadow-lg relative z-10 -mt-4">
                        <div className="container mx-auto px-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                    {[
                                          { value: '50+', label: 'Partner Hospitals' },
                                          { value: '200+', label: 'Specialist Doctors' },
                                          { value: '150+', label: 'Advanced Procedures' },
                                          { value: '99.2%', label: 'Success Rate' },
                                    ].map((stat, index) => (
                                          <div key={index}>
                                                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                                                <div className="text-gray-600">{stat.label}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Filter & Results */}
                  <section className="py-16">
                        <div className="container mx-auto px-4">
                              {/* Filters */}
                              <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
                                    <div className="flex flex-wrap gap-3">
                                          {filters.map((filter) => (
                                                <button
                                                      key={filter.id}
                                                      onClick={() => setActiveFilter(filter.id)}
                                                      className={`px-6 py-3 rounded-full font-medium transition-all ${activeFilter === filter.id
                                                                  ? 'bg-blue-600 text-white shadow-lg'
                                                                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                                            }`}
                                                >
                                                      {filter.label}
                                                </button>
                                          ))}
                                    </div>
                                    <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow hover:shadow-md transition-all">
                                          <Filter className="w-5 h-5" />
                                          <span className="font-medium">More Filters</span>
                                    </button>
                              </div>

                              {/* Featured Hospitals */}
                              <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                          <Star className="w-6 h-6 text-yellow-500" />
                                          Featured Hospitals
                                    </h2>
                                    <div className="grid lg:grid-cols-2 gap-8">
                                          {filteredHospitals.filter(h => h.featured).map((hospital) => (
                                                <div
                                                      key={hospital.id}
                                                      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                                                >
                                                      <div className="flex flex-col md:flex-row">
                                                            <div className="relative md:w-1/3 h-60 md:h-auto">
                                                                  <Image
                                                                        src={hospital.image}
                                                                        alt={hospital.name}
                                                                        fill
                                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                  />
                                                                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                                        Featured
                                                                  </div>
                                                            </div>
                                                            <div className="flex-1 p-6">
                                                                  <div className="flex items-start justify-between mb-3">
                                                                        <div>
                                                                              <h3 className="text-2xl font-bold text-gray-800">{hospital.name}</h3>
                                                                              <p className="text-gray-500 text-sm">{hospital.fullName}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                                                              <Star className="w-4 h-4 fill-current" />
                                                                              <span className="font-semibold">{hospital.rating}</span>
                                                                        </div>
                                                                  </div>

                                                                  <p className="text-gray-600 mb-4">{hospital.description}</p>

                                                                  <div className="flex flex-wrap gap-2 mb-4">
                                                                        {hospital.specialties.slice(0, 3).map((spec, i) => (
                                                                              <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                                                    {spec}
                                                                              </span>
                                                                        ))}
                                                                        {hospital.specialties.length > 3 && (
                                                                              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                                                                    +{hospital.specialties.length - 3} more
                                                                              </span>
                                                                        )}
                                                                  </div>

                                                                  <div className="flex items-center justify-between pt-4 border-t">
                                                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                                                              <span className="flex items-center gap-1">
                                                                                    <MapPin className="w-4 h-4" />
                                                                                    {hospital.location}
                                                                              </span>
                                                                              <span className="flex items-center gap-1">
                                                                                    <Users className="w-4 h-4" />
                                                                                    {hospital.beds} Beds
                                                                              </span>
                                                                        </div>
                                                                        <Link
                                                                              href={`/hospital/${hospital.id}`}
                                                                              className="flex items-center gap-1 text-blue-600 font-semibold hover:gap-2 transition-all"
                                                                        >
                                                                              View Details
                                                                              <ChevronRight className="w-5 h-5" />
                                                                        </Link>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>

                              {/* All Hospitals Grid */}
                              <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                          <Stethoscope className="w-6 h-6 text-blue-600" />
                                          All Hospitals ({filteredHospitals.length})
                                    </h2>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                          {filteredHospitals.map((hospital) => (
                                                <div
                                                      key={hospital.id}
                                                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
                                                >
                                                      <div className="relative h-48">
                                                            <Image
                                                                  src={hospital.image}
                                                                  alt={hospital.name}
                                                                  fill
                                                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                            <div className="absolute bottom-4 left-4 right-4">
                                                                  <div className="flex items-center gap-2 mb-2">
                                                                        {hospital.accreditation.map((acc, i) => (
                                                                              <span key={i} className="bg-yellow-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                                                                                    {acc}
                                                                              </span>
                                                                        ))}
                                                                  </div>
                                                                  <h3 className="text-xl font-bold text-white">{hospital.name}</h3>
                                                            </div>
                                                      </div>
                                                      <div className="p-5">
                                                            <div className="flex items-center justify-between mb-3">
                                                                  <div className="flex items-center gap-1 text-yellow-500">
                                                                        <Star className="w-4 h-4 fill-current" />
                                                                        <span className="font-semibold text-gray-800">{hospital.rating}</span>
                                                                        <span className="text-gray-500 text-sm">({hospital.reviews})</span>
                                                                  </div>
                                                                  <span className="text-gray-500 text-sm">Est. {hospital.established}</span>
                                                            </div>

                                                            <div className="flex flex-wrap gap-1 mb-4">
                                                                  {hospital.specialties.slice(0, 2).map((spec, i) => (
                                                                        <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                                                              {spec}
                                                                        </span>
                                                                  ))}
                                                            </div>

                                                            <div className="flex items-center justify-between">
                                                                  <span className="flex items-center gap-1 text-gray-500 text-sm">
                                                                        <MapPin className="w-4 h-4" />
                                                                        {hospital.location.split(',')[0]}
                                                                  </span>
                                                                  <Link
                                                                        href={`/hospital/${hospital.id}`}
                                                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                                                                  >
                                                                        View Details
                                                                  </Link>
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* CTA Section */}
                  <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Need Help Choosing the Right Hospital?
                              </h2>
                              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                    Our medical experts can recommend the best hospital based on your specific treatment needs.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                          Get Free Recommendation
                                    </button>
                                    <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                                          <Phone className="w-5 h-5" />
                                          Speak to Expert
                                    </button>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default HospitalPage;
