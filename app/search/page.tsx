"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, MapPin, Star, Clock, DollarSign, ChevronDown, Hospital, User, Stethoscope } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const SearchPage = () => {
      const scrolled = useScrolled(50);
      const [searchQuery, setSearchQuery] = useState('');
      const [activeTab, setActiveTab] = useState('all');

      const results = [
            { type: 'hospital', name: 'JIPMER', specialty: 'Multi-Specialty', rating: 4.9, location: 'Gorimedu', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400' },
            { type: 'doctor', name: 'Dr. V. Veerappan', specialty: 'Orthopedics', rating: 4.9, location: 'POSH Hospital', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400' },
            { type: 'treatment', name: 'Knee Replacement', specialty: 'Orthopedics', rating: 4.8, location: 'Multiple Hospitals', image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400' },
            { type: 'hospital', name: 'GEM Hospital', specialty: 'Gastroenterology', rating: 4.9, location: 'ECR', image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400' },
            { type: 'doctor', name: 'Dr. Ramya R', specialty: 'IVF Specialist', rating: 4.8, location: 'Indira IVF', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400' },
            { type: 'treatment', name: 'IVF Treatment', specialty: 'Fertility', rating: 4.9, location: 'Multiple Centers', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400' },
      ];

      const filteredResults = activeTab === 'all' ? results : results.filter(r => r.type === activeTab);
      const tabs = [{ id: 'all', label: 'All Results' }, { id: 'hospital', label: 'Hospitals' }, { id: 'doctor', label: 'Doctors' }, { id: 'treatment', label: 'Treatments' }];

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header />

                  <section className="pt-32 pb-8 bg-gradient-to-br from-emerald-800 to-teal-700">
                        <div className="container mx-auto px-4">
                              <div className="max-w-3xl mx-auto">
                                    <h1 className="text-4xl font-bold text-white text-center mb-8">Find Your Care</h1>
                                    <div className="relative">
                                          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search hospitals, doctors, or treatments..."
                                                className="w-full pl-14 pr-32 py-5 rounded-2xl shadow-2xl text-lg focus:ring-4 focus:ring-emerald-300 focus:outline-none" />
                                          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors">Search</button>
                                    </div>
                              </div>
                        </div>
                  </section>

                  <section className="py-8">
                        <div className="container mx-auto px-4">
                              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                                    <div className="flex gap-2">
                                          {tabs.map((tab) => (
                                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                                      className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === tab.id ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 shadow'}`}>
                                                      {tab.label}
                                                </button>
                                          ))}
                                    </div>
                                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md">
                                          <Filter className="w-4 h-4" /><span>Filters</span><ChevronDown className="w-4 h-4" />
                                    </button>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredResults.map((item, i) => (
                                          <Link key={i} href={`/${item.type}/${i}`} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                                                <div className="relative h-48">
                                                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                                                      <div className="absolute top-4 left-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${item.type === 'hospital' ? 'bg-blue-500 text-white' : item.type === 'doctor' ? 'bg-purple-500 text-white' : 'bg-emerald-500 text-white'}`}>
                                                                  {item.type}
                                                            </span>
                                                      </div>
                                                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-yellow-500 fill-current" /><span className="font-semibold text-sm">{item.rating}</span>
                                                      </div>
                                                </div>
                                                <div className="p-5">
                                                      <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                                                      <p className="text-emerald-600 text-sm mb-2">{item.specialty}</p>
                                                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                            <MapPin className="w-4 h-4" />{item.location}
                                                      </div>
                                                </div>
                                          </Link>
                                    ))}
                              </div>

                              {filteredResults.length === 0 && (
                                    <div className="text-center py-16">
                                          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                          <h3 className="text-xl font-bold text-gray-800 mb-2">No results found</h3>
                                          <p className="text-gray-500">Try adjusting your search or filters</p>
                                    </div>
                              )}
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default SearchPage;
