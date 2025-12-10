"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Star, GraduationCap, Clock, Calendar, Video, MessageSquare, ChevronRight, Search, Filter, Heart, Stethoscope, Globe, Users } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const DoctorPage = () => {
      const scrolled = useScrolled(50);
      const [activeSpecialty, setActiveSpecialty] = useState('all');

      const doctors = [
            {
                  id: 1,
                  name: 'Dr. V. Veerappan',
                  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
                  specialty: 'Orthopedics',
                  subSpecialty: 'Spine & Joint Replacement',
                  credentials: 'MBBS, MS (Orthopaedics), FRCS (Glasgow)',
                  experience: '31+ years',
                  hospital: 'POSH Hospital',
                  rating: 4.9,
                  reviews: 450,
                  surgeries: 5000,
                  languages: ['English', 'Tamil', 'Hindi'],
                  education: ['MBBS - Madras Medical College', 'MS Ortho - CMC Vellore', 'FRCS - Glasgow, UK'],
                  featured: true,
                  available: true,
                  nextSlot: 'Today, 4:00 PM'
            },
            {
                  id: 2,
                  name: 'Dr. V. M. Thomas',
                  image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
                  specialty: 'IVF',
                  subSpecialty: 'Reproductive Medicine',
                  credentials: 'PhD, FSAB (Reproductive Biotechnology)',
                  experience: '25+ years',
                  hospital: 'Indira IVF Centre',
                  rating: 4.9,
                  reviews: 680,
                  surgeries: 10000,
                  languages: ['English', 'Malayalam', 'Tamil'],
                  education: ['PhD - IISc Bangalore', 'FSAB - European Society'],
                  featured: true,
                  available: true,
                  nextSlot: 'Tomorrow, 10:00 AM'
            },
            {
                  id: 3,
                  name: 'Dr. Ramya R',
                  image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
                  specialty: 'IVF',
                  subSpecialty: 'Infertility Consultant',
                  credentials: 'MBBS, DGO, FRM',
                  experience: '11+ years',
                  hospital: 'Indira IVF Centre',
                  rating: 4.8,
                  reviews: 320,
                  surgeries: 2500,
                  languages: ['English', 'Tamil', 'Hindi'],
                  education: ['MBBS - Stanley Medical', 'DGO - Govt General Hospital', 'FRM - Singapore'],
                  featured: true,
                  available: true,
                  nextSlot: 'Today, 6:00 PM'
            },
            {
                  id: 4,
                  name: 'Dr. Suresh Kumar',
                  image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
                  specialty: 'Cardiology',
                  subSpecialty: 'Interventional Cardiology',
                  credentials: 'DM Cardiology, FACC (USA)',
                  experience: '18+ years',
                  hospital: 'JIPMER',
                  rating: 4.9,
                  reviews: 520,
                  surgeries: 4000,
                  languages: ['English', 'Tamil', 'Telugu'],
                  education: ['MBBS - JIPMER', 'DM Cardio - AIIMS', 'Fellowship - Cleveland Clinic'],
                  featured: false,
                  available: true,
                  nextSlot: 'Wed, 11:00 AM'
            },
            {
                  id: 5,
                  name: 'Dr. Priya Sharma',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
                  specialty: 'Gastroenterology',
                  subSpecialty: 'Bariatric Surgery',
                  credentials: 'MS, MCh, FAIS',
                  experience: '15+ years',
                  hospital: 'GEM Hospital',
                  rating: 4.8,
                  reviews: 380,
                  surgeries: 3200,
                  languages: ['English', 'Hindi', 'Tamil'],
                  education: ['MBBS - Maulana Azad', 'MS - PGI Chandigarh', 'MCh - GEM Hospital'],
                  featured: false,
                  available: true,
                  nextSlot: 'Thu, 2:00 PM'
            },
            {
                  id: 6,
                  name: 'Dr. Aravind Mohan',
                  image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400',
                  specialty: 'Ophthalmology',
                  subSpecialty: 'Cataract & Retina',
                  credentials: 'MS, DNB, FICO',
                  experience: '20+ years',
                  hospital: 'Aravind Eye Hospital',
                  rating: 4.9,
                  reviews: 890,
                  surgeries: 15000,
                  languages: ['English', 'Tamil', 'Malayalam'],
                  education: ['MBBS - Madras Medical', 'MS Ophth - Aravind', 'Fellowship - Moorfields UK'],
                  featured: false,
                  available: true,
                  nextSlot: 'Today, 5:30 PM'
            },
      ];

      const specialties = [
            { id: 'all', label: 'All Specialties', count: doctors.length },
            { id: 'Orthopedics', label: 'Orthopedics', count: 1 },
            { id: 'IVF', label: 'IVF & Fertility', count: 2 },
            { id: 'Cardiology', label: 'Cardiology', count: 1 },
            { id: 'Gastroenterology', label: 'Gastroenterology', count: 1 },
            { id: 'Ophthalmology', label: 'Ophthalmology', count: 1 },
      ];

      const filteredDoctors = activeSpecialty === 'all'
            ? doctors
            : doctors.filter(d => d.specialty === activeSpecialty);

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative pt-32 pb-20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900" />
                        <div className="absolute inset-0 opacity-20">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600')] bg-cover bg-center" />
                        </div>

                        <div className="relative container mx-auto px-4">
                              <div className="max-w-4xl mx-auto text-center text-white">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <GraduationCap className="w-5 h-5 text-yellow-400" />
                                          <span className="text-sm font-medium">200+ Internationally Trained Specialists</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                          Expert Doctors
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                                                Personalized Care
                                          </span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-purple-100 leading-relaxed max-w-3xl mx-auto mb-8">
                                          Connect with world-class specialists trained at premier global institutions, right here in Pondicherry.
                                    </p>

                                    {/* Search Bar */}
                                    <div className="max-w-2xl mx-auto relative">
                                          <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden">
                                                <Search className="w-6 h-6 text-gray-400 ml-6" />
                                                <input
                                                      type="text"
                                                      placeholder="Search by doctor name, specialty, or condition..."
                                                      className="flex-1 px-4 py-5 text-gray-800 focus:outline-none"
                                                />
                                                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-5 font-semibold hover:shadow-lg transition-all">
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
                                          { value: '200+', label: 'Expert Doctors', icon: Stethoscope },
                                          { value: '50K+', label: 'Successful Surgeries', icon: Award },
                                          { value: '45+', label: 'Countries Served', icon: Globe },
                                          { value: '4.8', label: 'Average Rating', icon: Star },
                                    ].map((stat, index) => (
                                          <div key={index} className="flex items-center justify-center gap-3">
                                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                                      <stat.icon className="w-6 h-6 text-purple-600" />
                                                </div>
                                                <div className="text-left">
                                                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                                                      <div className="text-gray-600 text-sm">{stat.label}</div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Filter & Results */}
                  <section className="py-16">
                        <div className="container mx-auto px-4">
                              {/* Specialty Filters */}
                              <div className="flex flex-wrap gap-3 mb-12 justify-center">
                                    {specialties.map((specialty) => (
                                          <button
                                                key={specialty.id}
                                                onClick={() => setActiveSpecialty(specialty.id)}
                                                className={`px-6 py-3 rounded-full font-medium transition-all ${activeSpecialty === specialty.id
                                                            ? 'bg-purple-600 text-white shadow-lg'
                                                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                                      }`}
                                          >
                                                {specialty.label}
                                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeSpecialty === specialty.id ? 'bg-white/20' : 'bg-gray-200'
                                                      }`}>
                                                      {specialty.count}
                                                </span>
                                          </button>
                                    ))}
                              </div>

                              {/* Featured Doctors */}
                              <div className="mb-16">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                                          <Award className="w-6 h-6 text-yellow-500" />
                                          Top Rated Specialists
                                    </h2>
                                    <div className="grid lg:grid-cols-3 gap-8">
                                          {filteredDoctors.filter(d => d.featured).map((doctor) => (
                                                <div
                                                      key={doctor.id}
                                                      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                                                >
                                                      <div className="relative">
                                                            <div className="h-64 relative overflow-hidden">
                                                                  <Image
                                                                        src={doctor.image}
                                                                        alt={doctor.name}
                                                                        fill
                                                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                                  />
                                                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                            </div>
                                                            <div className="absolute top-4 right-4 flex gap-2">
                                                                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                                        Available
                                                                  </span>
                                                            </div>
                                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                                  <h3 className="text-xl font-bold">{doctor.name}</h3>
                                                                  <p className="text-purple-300">{doctor.subSpecialty}</p>
                                                            </div>
                                                      </div>

                                                      <div className="p-6">
                                                            <div className="flex items-center gap-4 mb-4">
                                                                  <div className="flex items-center gap-1">
                                                                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                                                        <span className="font-bold text-gray-800">{doctor.rating}</span>
                                                                        <span className="text-gray-500 text-sm">({doctor.reviews})</span>
                                                                  </div>
                                                                  <span className="text-gray-300">|</span>
                                                                  <span className="text-purple-600 font-medium">{doctor.experience}</span>
                                                            </div>

                                                            <p className="text-gray-600 text-sm mb-4">{doctor.credentials}</p>

                                                            <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                                                                  <Stethoscope className="w-4 h-4" />
                                                                  <span>{doctor.hospital}</span>
                                                            </div>

                                                            <div className="flex items-center gap-2 mb-4">
                                                                  <Clock className="w-4 h-4 text-green-600" />
                                                                  <span className="text-green-600 font-medium text-sm">Next: {doctor.nextSlot}</span>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-3">
                                                                  <button className="flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                                                                        <Calendar className="w-4 h-4" />
                                                                        Book Now
                                                                  </button>
                                                                  <button className="flex items-center justify-center gap-2 bg-purple-50 text-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                                                                        <Video className="w-4 h-4" />
                                                                        Video Consult
                                                                  </button>
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>

                              {/* All Doctors */}
                              <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                                          <Users className="w-6 h-6 text-purple-600" />
                                          All Specialists ({filteredDoctors.length})
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                          {filteredDoctors.map((doctor) => (
                                                <div
                                                      key={doctor.id}
                                                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex gap-6"
                                                >
                                                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                                            <Image
                                                                  src={doctor.image}
                                                                  alt={doctor.name}
                                                                  fill
                                                                  className="object-cover"
                                                            />
                                                      </div>
                                                      <div className="flex-1">
                                                            <div className="flex items-start justify-between mb-2">
                                                                  <div>
                                                                        <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                                                                        <p className="text-purple-600 text-sm">{doctor.subSpecialty}</p>
                                                                  </div>
                                                                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                                                                        <Star className="w-4 h-4 fill-current" />
                                                                        <span className="font-semibold text-sm">{doctor.rating}</span>
                                                                  </div>
                                                            </div>
                                                            <p className="text-gray-500 text-sm mb-3">{doctor.credentials}</p>
                                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                  <span>{doctor.experience}</span>
                                                                  <span className="text-gray-300">|</span>
                                                                  <span>{doctor.hospital}</span>
                                                            </div>
                                                      </div>
                                                      <div className="flex flex-col justify-center gap-2">
                                                            <Link
                                                                  href={`/doctor/${doctor.id}`}
                                                                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-center"
                                                            >
                                                                  Book
                                                            </Link>
                                                            <button className="text-purple-600 font-medium hover:underline text-sm">
                                                                  View Profile
                                                            </button>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Video Consultation Banner */}
                  <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
                        <div className="container mx-auto px-4">
                              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="text-white">
                                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                                Can&apos;t Travel? Try Video Consultation
                                          </h2>
                                          <p className="text-purple-100 text-lg max-w-xl">
                                                Get expert medical opinions from our specialists without leaving home.
                                                Available in multiple languages.
                                          </p>
                                    </div>
                                    <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shrink-0">
                                          <Video className="w-5 h-5" />
                                          Book Video Consultation
                                    </button>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default DoctorPage;
