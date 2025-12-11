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
                  specialties: ['Multi-Specialty', 'Cardiology', 'Oncology', 'Neurology', 'Nephrology', 'Orthopedics'],
                  accreditation: ['NABH', 'NABL'],
                  location: 'Gorimedu, Pondicherry',
                  established: 1823,
                  beds: 2500,
                  type: 'government',
                  featured: true,
                  description: 'AIIMS-equivalent status with world-class research. Premier government medical institution matching top US hospitals in quality.',
                  equipment: ['64-slice CT scanner', '3T MRI', 'Digital Operating Theaters', 'Advanced Blood Bank'],
                  highlights: ['1,100+ beds active', 'All specialties', 'World-class research', '50+ Cardiologists trained in US/UK']
            },
            {
                  id: 2,
                  name: 'Apollo Pondicherry',
                  fullName: 'Apollo Speciality Hospitals Pondicherry',
                  image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
                  rating: 4.8,
                  reviews: 1560,
                  specialties: ['Cardiology', 'Orthopedics', 'Neurosurgery', 'IVF', 'Oncology'],
                  accreditation: ['NABH', 'JCI'],
                  location: 'Ariyankuppam, Pondicherry',
                  established: 2005,
                  beds: 300,
                  type: 'private',
                  featured: true,
                  description: 'JCI accredited with advanced diagnostic center. International patient wing with multilingual staff.',
                  equipment: ['Da Vinci Surgical Robot', 'PET-CT Scanner', '64-slice CT', 'Cath Lab'],
                  highlights: ['300+ beds', 'JCI accredited', 'International patient services', 'Advanced diagnostic center']
            },
            {
                  id: 3,
                  name: 'MGMCRI',
                  fullName: 'Mahatma Gandhi Medical College & Research Institute',
                  image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
                  rating: 4.7,
                  reviews: 1230,
                  specialties: ['General Surgery', 'Pediatrics', 'Gynecology', 'Ophthalmology', 'ENT', 'Dermatology'],
                  accreditation: ['NABH', 'NABL'],
                  location: 'Pillaiyarkuppam, Pondicherry',
                  established: 2007,
                  beds: 1200,
                  type: 'private',
                  featured: true,
                  description: 'NABH accredited multi-specialty hospital with focus on research and advanced medical education.',
                  equipment: ['MRI 1.5T', 'CT Scanner', 'Digital X-ray', 'Modern ICUs'],
                  highlights: ['900+ beds', 'NABH accredited', 'Multi-specialty', 'Medical education focus']
            },
            {
                  id: 4,
                  name: 'GEM Hospital',
                  fullName: 'GEM Hospital & Research Centre',
                  image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800',
                  rating: 4.9,
                  reviews: 980,
                  specialties: ['Gastroenterology', 'Bariatric Surgery', 'Laparoscopy', 'Colorectal Surgery'],
                  accreditation: ['NABH', 'JCI'],
                  location: 'East Coast Road, Pondicherry',
                  established: 2005,
                  beds: 300,
                  type: 'specialty',
                  featured: true,
                  description: 'Asia\'s premier gastroenterology center with internationally trained specialists. World leader in laparoscopic GI surgery.',
                  equipment: ['Advanced Endoscopy Suite', 'Laparoscopic Towers', 'Bariatric Surgery Equipment'],
                  highlights: ['JCI certified', 'Asia\'s premier GI center', '97%+ procedure success', 'International faculty']
            },
            {
                  id: 5,
                  name: 'Aravind Eye Hospital',
                  fullName: 'Aravind Eye Hospital',
                  image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
                  rating: 4.9,
                  reviews: 3200,
                  specialties: ['Cataract Surgery', 'LASIK', 'Retina', 'Glaucoma', 'Cornea', 'Pediatric Ophthalmology'],
                  accreditation: ['NABH'],
                  location: 'Cuddalore Road, Pondicherry',
                  established: 2003,
                  beds: 250,
                  type: 'specialty',
                  description: 'World-renowned eye care with highest volume of cataract surgeries globally. 15,000+ surgeries annually.',
                  equipment: ['Femto Laser', 'Phaco Machines', 'OCT Scanner', 'Fundus Camera'],
                  highlights: ['15,000+ cataract surgeries/year', '99%+ vision improvement', 'World-class eye care', 'Affordable excellence']
            },
            {
                  id: 6,
                  name: 'PIMS',
                  fullName: 'Pondicherry Institute of Medical Sciences',
                  image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
                  rating: 4.8,
                  reviews: 890,
                  specialties: ['Orthopedics', 'Joint Replacement', 'Spine Surgery', 'Sports Medicine', 'Trauma'],
                  accreditation: ['NABH'],
                  location: 'Kalapet, Pondicherry',
                  established: 1999,
                  beds: 850,
                  type: 'private',
                  description: 'Leading orthopedic and multi-specialty center with FRCS-trained surgeons and latest technology.',
                  equipment: ['Arthroscopy Suite', 'C-Arm', 'Navigation Systems', 'Laminar Flow OTs'],
                  highlights: ['850 beds', 'NABH accredited', '40+ Orthopedic surgeons', 'International fellowship experience']
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
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* Hero Section - Unique: Certified Healthcare Infrastructure */}
                  <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden hero-premium">
                        <div className="absolute inset-0 opacity-15">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600')] bg-cover bg-center" />
                        </div>

                        <div className="relative container-premium">
                              {/* Breadcrumb */}
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <Link href="/" className="hover:text-white">Home</Link>
                                    <span className="mx-2">/</span>
                                    <span className="text-white">Partner Hospitals</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <div className="gov-seal mb-6">
                                          <span>50+ NABH Accredited Facilities</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                                          Certified Healthcare
                                          <span className="block text-[#bf9b30]">
                                                Infrastructure
                                          </span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mb-8">
                                          Every partner hospital is rigorously vetted for NABH accreditation, cutting-edge technology, and international patient safety standards.
                                    </p>

                                    {/* Search Bar */}
                                    <div className="max-w-xl">
                                          <div className="flex items-center bg-white rounded-xl shadow-xl overflow-hidden">
                                                <Search className="w-5 h-5 text-gray-400 ml-4" />
                                                <input
                                                      type="text"
                                                      placeholder="Search hospitals, specialties..."
                                                      className="flex-1 px-4 py-4 text-gray-800 focus:outline-none"
                                                />
                                                <button className="bg-[var(--medical-teal)] text-white px-6 py-4 font-semibold hover:bg-[var(--medical-dark-teal)] transition-all">
                                                      Search
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Stats Bar */}
                  <section className="bg-white py-6 shadow-md relative z-10 border-b border-gray-100">
                        <div className="container-premium">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                    {[
                                          { value: '50+', label: 'Partner Hospitals' },
                                          { value: '200+', label: 'Specialist Doctors' },
                                          { value: '150+', label: 'Advanced Procedures' },
                                          { value: '99.2%', label: 'Success Rate' },
                                    ].map((stat, index) => (
                                          <div key={index}>
                                                <div className="text-2xl font-bold text-[var(--medical-teal)]">{stat.value}</div>
                                                <div className="text-sm text-[var(--medical-slate)]">{stat.label}</div>
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
