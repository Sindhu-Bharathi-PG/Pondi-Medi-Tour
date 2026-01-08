"use client";

import { useCurrency } from '@/app/context/CurrencyContext';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Award, Baby, Bone, Brain, Calendar, Check, ChevronRight, Clock, DollarSign, Eye, Globe, Heart, Languages, MapPin, Phone, Plane, Scissors, Shield, Sparkles, Star, Stethoscope, Users, Video, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../components/common';

// Country flags for international appeal
const PATIENT_COUNTRIES = [
      { code: 'US', name: 'United States', flag: '🇺🇸', patients: '15,000+' },
      { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', patients: '8,000+' },
      { code: 'AE', name: 'UAE', flag: '🇦🇪', patients: '6,000+' },
      { code: 'AU', name: 'Australia', flag: '🇦🇺', patients: '4,500+' },
      { code: 'CA', name: 'Canada', flag: '🇨🇦', patients: '3,500+' },
      { code: 'DE', name: 'Germany', flag: '🇩🇪', patients: '3,000+' },
      { code: 'FR', name: 'France', flag: '🇫🇷', patients: '2,500+' },
      { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', patients: '2,000+' },
      { code: 'SG', name: 'Singapore', flag: '🇸🇬', patients: '1,800+' },
      { code: 'JP', name: 'Japan', flag: '🇯🇵', patients: '1,500+' },
];

const ServicesPage = () => {
      const { convertAmount, formatCurrency, selectedCurrency } = useCurrency();
      const [services, setServices] = useState<any[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [convertedPrices, setConvertedPrices] = useState<Record<string, { pondy: number; us: number; uk: number; uae: number }>>({});

      // Map categories to icons
      const categoryIcons: any = {
            'Orthopedics': Bone,
            'IVF': Baby,
            'Ophthalmology': Eye,
            'Cardiology': Heart,
            'Gastroenterology': Activity,
            'Neurology': Brain,
            'Dental': Scissors,
            'Oncology': Stethoscope
      };

      const journeySteps = [
            { icon: Phone, title: 'Free Consultation', desc: 'Connect via call, WhatsApp, or video', time: 'Day 1' },
            { icon: DollarSign, title: 'Treatment Quote', desc: 'Detailed cost breakdown within 24hrs', time: 'Day 2' },
            { icon: Plane, title: 'Visa & Travel', desc: 'Medical visa assistance & flight booking', time: 'Week 1-2' },
            { icon: MapPin, title: 'Arrival & Pickup', desc: 'Airport pickup & hotel arrangement', time: 'Travel Day' },
            { icon: Stethoscope, title: 'Treatment', desc: 'World-class medical care', time: 'As scheduled' },
            { icon: Heart, title: 'Recovery', desc: 'Comfortable recovery with support', time: 'Post-treatment' },
      ];

      // Fetch services from API
      useEffect(() => {
            const fetchServices = async () => {
                  try {
                        const response = await fetch('http://localhost:3001/api/treatments');
                        const data = await response.json();

                        if (data && Array.isArray(data) && data.length > 0) {
                              // Map DB data to Frontend format
                              const mappedServices = data.map(t => ({
                                    id: t.slug || t.id.toString(),
                                    icon: categoryIcons[t.category] || Stethoscope,
                                    title: t.name,
                                    description: t.shortDescription,
                                    image: t.thumbnailUrl || 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800',
                                    procedures: t.technology || [],
                                    savings: t.isPopular ? '70%+' : '60%+',
                                    pondyPriceINR: t.minPrice || 50000,
                                    // Fallback prices for comparison if not in DB
                                    usPriceINR: (t.minPrice || 50000) * 4,
                                    ukPriceINR: (t.minPrice || 50000) * 3,
                                    uaePriceINR: (t.minPrice || 50000) * 2.5,
                                    recovery: t.recoveryTime || 'Varies',
                                    successRate: t.successRate ? `${t.successRate}%+` : '95%+',
                                    color: t.category === 'Oncology' ? 'from-green-600 to-[var(--medical-teal)]' : 'from-[var(--medical-teal)] to-[var(--medical-dark-teal)]',
                                    featured: t.isPopular
                              }));
                              setServices(mappedServices);
                        } else {
                              // If no data in DB, we could use static fallback or show empty state
                              // For this demo, let's keep the static fallbacks if DB is empty
                              console.log('No treatments found in DB, using static data');
                        }
                  } catch (error) {
                        console.error('Error fetching services:', error);
                  } finally {
                        setIsLoading(false);
                  }
            };
            fetchServices();
      }, []);

      // Convert prices when currency changes or services load
      useEffect(() => {
            const convertPrices = async () => {
                  if (services.length === 0) return;
                  const converted: Record<string, { pondy: number; us: number; uk: number; uae: number }> = {};
                  for (const service of services) {
                        const pondy = await convertAmount(service.pondyPriceINR, 'INR');
                        const us = await convertAmount(service.usPriceINR, 'INR');
                        const uk = await convertAmount(service.ukPriceINR, 'INR');
                        const uae = await convertAmount(service.uaePriceINR, 'INR');
                        converted[service.id] = { pondy, us, uk, uae };
                  }
                  setConvertedPrices(converted);
            };
            convertPrices();
      }, [selectedCurrency, services]);

      const getPrice = (serviceId: string, type: 'pondy' | 'us' | 'uk' | 'uae') => {
            return convertedPrices[serviceId]?.[type] || 0;
      };

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* HERO SECTION - Premium Medical Theme */}
                  <section className="relative pt-24 pb-32 overflow-hidden hero-premium">
                        {/* Elegant Background */}
                        <div className="absolute inset-0">
                              <div className="absolute inset-0 opacity-10">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?w=1600')] bg-cover bg-center" />
                              </div>
                              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--medical-gold)]/10 rounded-full blur-3xl" />
                              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--medical-teal)]/10 rounded-full blur-3xl" />
                        </div>

                        <div className="relative container-premium">
                              {/* Breadcrumb */}
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <ChevronRight className="w-4 h-4 breadcrumb-separator" />
                                    <span className="text-[var(--medical-gold)]">Medical Treatments</span>
                              </nav>

                              <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    {/* Left Content */}
                                    <motion.div
                                          initial={{ opacity: 0, y: 30 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.8 }}
                                    >
                                          {/* Trust Badge */}
                                          <div className="gov-seal mb-6">
                                                <Globe className="w-4 h-4" />
                                                <span>Trusted by 50,000+ International Patients</span>
                                          </div>

                                          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                                <span className="text-white">World-Class</span>
                                                <br />
                                                <span className="text-[var(--medical-gold)]">
                                                      Medical Care
                                                </span>
                                                <br />
                                                <span className="text-white/90 text-4xl md:text-5xl">at 70% Less Cost</span>
                                          </h1>

                                          <p className="text-lg text-white/80 leading-relaxed max-w-xl mb-8">
                                                Join patients from <span className="text-[var(--medical-gold)] font-semibold">45+ countries</span> who chose India for premium healthcare. Same doctors. Same technology. Unbeatable savings.
                                          </p>

                                          {/* Country Flags Ticker */}
                                          <div className="flex items-center gap-3 mb-8 overflow-hidden">
                                                <span className="text-white/60 text-sm whitespace-nowrap">Patients from:</span>
                                                <div className="flex gap-2">
                                                      {PATIENT_COUNTRIES.slice(0, 8).map((country, i) => (
                                                            <motion.div
                                                                  key={country.code}
                                                                  initial={{ opacity: 0, scale: 0 }}
                                                                  animate={{ opacity: 1, scale: 1 }}
                                                                  transition={{ delay: i * 0.1 }}
                                                                  className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                                                                  title={`${country.name} - ${country.patients} patients`}
                                                            >
                                                                  {country.flag}
                                                            </motion.div>
                                                      ))}
                                                      <span className="text-white/50 text-sm self-center">+37 more</span>
                                                </div>
                                          </div>

                                          {/* CTA Buttons */}
                                          <div className="flex flex-wrap gap-4">
                                                <Link
                                                      href="/booking"
                                                      className="group inline-flex items-center gap-3 bg-[var(--medical-gold)] text-[var(--medical-navy)] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                                                >
                                                      Get Free Quote
                                                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                                <Link
                                                      href="/cost-calculator"
                                                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
                                                >
                                                      <DollarSign className="w-5 h-5" />
                                                      Calculate Savings
                                                </Link>
                                          </div>
                                    </motion.div>

                                    {/* Right - Stats Cards */}
                                    <motion.div
                                          initial={{ opacity: 0, x: 50 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.8, delay: 0.2 }}
                                          className="grid grid-cols-2 gap-4"
                                    >
                                          {[
                                                { icon: Shield, value: '150+', label: 'Procedures', sublabel: 'Available' },
                                                { icon: Users, value: '50K+', label: 'Global', sublabel: 'Patients' },
                                                { icon: Award, value: '98.5%', label: 'Success', sublabel: 'Rate' },
                                                { icon: Clock, value: '0', label: 'Wait', sublabel: 'Time' },
                                          ].map((stat, index) => (
                                                <motion.div
                                                      key={stat.label}
                                                      initial={{ opacity: 0, y: 20 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{ delay: 0.4 + index * 0.1 }}
                                                      className="group card-premium p-6 bg-white/95 backdrop-blur-lg"
                                                >
                                                      <div className="w-12 h-12 rounded-xl bg-[var(--medical-light-teal)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                            <stat.icon className="w-6 h-6 text-[var(--medical-teal)]" />
                                                      </div>
                                                      <div className="text-4xl font-bold text-[var(--medical-navy)] mb-1">{stat.value}</div>
                                                      <div className="text-[var(--medical-slate)] text-sm">{stat.label}</div>
                                                      <div className="text-gray-400 text-xs">{stat.sublabel}</div>
                                                </motion.div>
                                          ))}
                                    </motion.div>
                              </div>
                        </div>
                  </section>

                  {/* INTERNATIONAL TRUST SIGNALS */}
                  <section className="py-8 bg-white border-b border-gray-100">
                        <div className="container-premium">
                              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                                    {[
                                          { label: 'JCI Accredited', icon: Award, desc: 'International Standard' },
                                          { label: 'NABH Certified', icon: Shield, desc: 'National Quality' },
                                          { label: 'ISO 9001:2015', icon: Check, desc: 'Quality Systems' },
                                          { label: 'US/UK Trained', icon: Award, desc: 'Surgeons' },
                                          { label: '11 Languages', icon: Languages, desc: 'Support Available' },
                                    ].map((item) => (
                                          <div key={item.label} className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[var(--medical-light-teal)] flex items-center justify-center">
                                                      <item.icon className="w-5 h-5 text-[var(--medical-teal)]" />
                                                </div>
                                                <div>
                                                      <div className="font-semibold text-[var(--medical-navy)]">{item.label}</div>
                                                      <div className="text-xs text-gray-500">{item.desc}</div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* FEATURED TREATMENTS */}
                  <section className="section-premium">
                        <div className="container-premium">
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center mb-16"
                              >
                                    <div className="certified-badge mx-auto mb-4">
                                          <Sparkles className="w-4 h-4" />
                                          Most Popular Worldwide
                                    </div>
                                    <h2 className="section-title">
                                          Featured Medical Treatments
                                    </h2>
                                    <p className="section-subtitle mx-auto">
                                          Premium procedures chosen by international patients for exceptional outcomes and savings
                                    </p>
                              </motion.div>

                              {/* Featured Grid */}
                              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                                    {isLoading ? (
                                          <div className="col-span-3 text-center py-20">
                                                <div className="animate-spin w-10 h-10 border-4 border-[var(--medical-teal)] border-t-transparent rounded-full mx-auto mb-4"></div>
                                                <p className="text-[var(--medical-navy)] font-medium">Loading treatments...</p>
                                          </div>
                                    ) : services.filter(s => s.featured).map((service, index) => (
                                          <motion.div
                                                key={service.id}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="group card-premium overflow-hidden"
                                          >
                                                {/* Image Header */}
                                                <div className="relative h-56 overflow-hidden">
                                                      <Image
                                                            src={service.image}
                                                            alt={service.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                      />
                                                      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
                                                      <div className="absolute inset-0 flex flex-col justify-between p-6">
                                                            <div className="flex items-start justify-between">
                                                                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                                                        <service.icon className="w-7 h-7 text-white" />
                                                                  </div>
                                                                  <div className="bg-[var(--medical-gold)] text-[var(--medical-navy)] rounded-full px-3 py-1">
                                                                        <span className="text-sm font-bold">Save {service.savings}</span>
                                                                  </div>
                                                            </div>
                                                            <div>
                                                                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                                                                  <div className="flex items-center gap-2 text-white/90 text-sm">
                                                                        <Star className="w-4 h-4 fill-current" />
                                                                        <span>{service.successRate} success rate</span>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                      <p className="text-[var(--medical-slate)] text-sm mb-6 line-clamp-2">{service.description}</p>

                                                      {/* Price Comparison */}
                                                      <div className="bg-[var(--medical-cream)] rounded-2xl p-4 mb-6">
                                                            <div className="flex items-center justify-between mb-3">
                                                                  <span className="text-gray-500 text-sm">Treatment Cost</span>
                                                                  <span className="text-[var(--medical-teal)] font-bold text-lg">
                                                                        {formatCurrency(getPrice(service.id, 'pondy'))}
                                                                  </span>
                                                            </div>
                                                            <div className="flex items-center justify-between text-sm">
                                                                  <span className="text-gray-400">vs. USA</span>
                                                                  <span className="text-gray-400 line-through">
                                                                        {formatCurrency(getPrice(service.id, 'us'))}
                                                                  </span>
                                                            </div>
                                                            <div className="mt-3 pt-3 border-t border-gray-200">
                                                                  <div className="flex items-center justify-between">
                                                                        <span className="text-[var(--medical-teal)] font-medium">Your Savings</span>
                                                                        <span className="text-[var(--medical-gold)] font-bold text-lg">
                                                                              {formatCurrency(getPrice(service.id, 'us') - getPrice(service.id, 'pondy'))}
                                                                        </span>
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      {/* Procedures */}
                                                      <div className="flex flex-wrap gap-2 mb-6">
                                                            {service.procedures.slice(0, 3).map((proc, i) => (
                                                                  <span key={i} className="bg-[var(--medical-light-teal)] text-[var(--medical-teal)] px-3 py-1 rounded-full text-xs font-medium">
                                                                        {proc}
                                                                  </span>
                                                            ))}
                                                            {service.procedures.length > 3 && (
                                                                  <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs">
                                                                        +{service.procedures.length - 3} more
                                                                  </span>
                                                            )}
                                                      </div>

                                                      {/* CTA */}
                                                      <Link
                                                            href={`/services/${service.id}`}
                                                            className="w-full py-4 rounded-xl font-semibold text-white bg-[var(--medical-teal)] flex items-center justify-center gap-2 hover:bg-[var(--medical-dark-teal)] hover:shadow-lg transition-all group-hover:gap-4"
                                                      >
                                                            View Details
                                                            <ArrowRight className="w-5 h-5" />
                                                      </Link>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>

                              {/* All Services Grid */}
                              <h3 className="text-2xl font-bold text-[var(--medical-navy)] mb-8 text-center">All Medical Specialties</h3>
                              <div className="grid md:grid-cols-2 gap-6">
                                    {isLoading ? (
                                          <div className="col-span-2 text-center py-10">
                                                <p className="text-gray-400">Loading categorized treatments...</p>
                                          </div>
                                    ) : services.filter(s => !s.featured).map((service, index) => (
                                          <motion.div
                                                key={service.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.05 }}
                                                className="group card-premium overflow-hidden flex"
                                          >
                                                <div className="relative w-40 shrink-0">
                                                      <Image
                                                            src={service.image}
                                                            alt={service.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                      />
                                                      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-80`} />
                                                      <div className="absolute inset-0 flex items-center justify-center">
                                                            <service.icon className="w-10 h-10 text-white" />
                                                      </div>
                                                </div>
                                                <div className="flex-1 p-5">
                                                      <h4 className="text-lg font-bold text-[var(--medical-navy)] mb-2">{service.title}</h4>
                                                      <p className="text-[var(--medical-slate)] text-sm mb-3 line-clamp-2">{service.description}</p>
                                                      <div className="flex items-center gap-4 mb-3 text-sm">
                                                            <span className="text-[var(--medical-teal)] font-semibold">
                                                                  {formatCurrency(getPrice(service.id, 'pondy'))}
                                                            </span>
                                                            <span className="text-gray-300">|</span>
                                                            <span className="text-[var(--medical-gold)] font-medium">Save {service.savings}</span>
                                                      </div>
                                                      <Link
                                                            href={`/services/${service.id}`}
                                                            className="text-[var(--medical-teal)] font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm"
                                                      >
                                                            Learn More
                                                            <ChevronRight className="w-4 h-4" />
                                                      </Link>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* GLOBAL COST COMPARISON */}
                  <section className="section-premium-alt">
                        <div className="container-premium">
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center mb-16"
                              >
                                    <h2 className="section-title">
                                          Compare Your Savings
                                    </h2>
                                    <p className="section-subtitle mx-auto">
                                          See how much you can save compared to healthcare costs in your home country
                                    </p>
                              </motion.div>

                              <div className="overflow-x-auto">
                                    <table className="w-full min-w-[800px] bg-white rounded-2xl shadow-lg overflow-hidden">
                                          <thead>
                                                <tr className="bg-[var(--medical-navy)]">
                                                      <th className="px-6 py-4 text-left text-white font-medium">Procedure</th>
                                                      <th className="px-6 py-4 text-center text-[var(--medical-gold)] font-semibold">
                                                            <div className="flex items-center justify-center gap-2">
                                                                  <span>🇮🇳</span> India
                                                            </div>
                                                      </th>
                                                      <th className="px-6 py-4 text-center text-white/80 font-medium">
                                                            <div className="flex items-center justify-center gap-2">
                                                                  <span>🇺🇸</span> USA
                                                            </div>
                                                      </th>
                                                      <th className="px-6 py-4 text-center text-white/80 font-medium">
                                                            <div className="flex items-center justify-center gap-2">
                                                                  <span>🇬🇧</span> UK
                                                            </div>
                                                      </th>
                                                      <th className="px-6 py-4 text-center text-white/80 font-medium">
                                                            <div className="flex items-center justify-center gap-2">
                                                                  <span>🇦🇪</span> UAE
                                                            </div>
                                                      </th>
                                                      <th className="px-6 py-4 text-center text-[var(--medical-gold)] font-medium">Savings</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {services.slice(0, 5).map((service, idx) => (
                                                      <motion.tr
                                                            key={service.id}
                                                            initial={{ opacity: 0 }}
                                                            whileInView={{ opacity: 1 }}
                                                            viewport={{ once: true }}
                                                            className={`border-b border-gray-100 hover:bg-[var(--medical-cream)] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                                      >
                                                            <td className="px-6 py-4">
                                                                  <div className="flex items-center gap-3">
                                                                        <service.icon className="w-5 h-5 text-[var(--medical-teal)]" />
                                                                        <span className="text-[var(--medical-navy)] font-medium">{service.title}</span>
                                                                  </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                  <span className="text-[var(--medical-teal)] font-bold">
                                                                        {formatCurrency(getPrice(service.id, 'pondy'))}
                                                                  </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-gray-400 line-through">
                                                                  {formatCurrency(getPrice(service.id, 'us'))}
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-gray-400 line-through">
                                                                  {formatCurrency(getPrice(service.id, 'uk'))}
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-gray-400 line-through">
                                                                  {formatCurrency(getPrice(service.id, 'uae'))}
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                  <span className="bg-[var(--medical-light-teal)] text-[var(--medical-teal)] font-bold px-4 py-1.5 rounded-full">
                                                                        {service.savings}
                                                                  </span>
                                                            </td>
                                                      </motion.tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </section>

                  {/* WHY INTERNATIONAL PATIENTS CHOOSE US */}
                  <section className="section-premium">
                        <div className="container-premium">
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center mb-16"
                              >
                                    <h2 className="section-title">
                                          Why International Patients Choose Us
                                    </h2>
                                    <p className="section-subtitle mx-auto">
                                          Designed specifically for patients traveling from abroad
                                    </p>
                              </motion.div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                          { icon: Clock, title: 'Zero Wait Time', desc: 'Immediate scheduling vs. months of waiting abroad', highlight: '0 Days Wait' },
                                          { icon: Languages, title: 'Multi-lingual Staff', desc: 'Medical coordinators fluent in 11 languages', highlight: '11 Languages' },
                                          { icon: Plane, title: 'Visa Assistance', desc: 'Complete medical visa support and documentation', highlight: 'Full Support' },
                                          { icon: MapPin, title: 'Airport Pickup', desc: 'Private transfers and luxury accommodation', highlight: 'VIP Service' },
                                          { icon: Video, title: 'Virtual Consults', desc: 'Pre-arrival video consultations with specialists', highlight: 'Free Consult' },
                                          { icon: Calendar, title: 'Fast Recovery', desc: 'Combine treatment with wellness retreat', highlight: 'Heal & Relax' },
                                    ].map((item, index) => (
                                          <motion.div
                                                key={item.title}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="group card-premium p-6"
                                          >
                                                <div className="flex items-start justify-between mb-4">
                                                      <div className="w-12 h-12 rounded-xl bg-[var(--medical-light-teal)] flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <item.icon className="w-6 h-6 text-[var(--medical-teal)]" />
                                                      </div>
                                                      <span className="bg-[var(--medical-gold)]/10 text-[var(--medical-gold)] text-xs font-semibold px-3 py-1 rounded-full border border-[var(--medical-gold)]/30">
                                                            {item.highlight}
                                                      </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-[var(--medical-navy)] mb-2">{item.title}</h3>
                                                <p className="text-[var(--medical-slate)]">{item.desc}</p>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* PATIENT JOURNEY TIMELINE */}
                  <section className="section-premium-alt">
                        <div className="container-premium">
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center mb-16"
                              >
                                    <h2 className="section-title">
                                          Your Treatment Journey
                                    </h2>
                                    <p className="section-subtitle mx-auto">
                                          A simple, stress-free process from inquiry to recovery
                                    </p>
                              </motion.div>

                              <div className="relative max-w-4xl mx-auto">
                                    {/* Timeline line */}
                                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--medical-teal)] via-[var(--medical-gold)] to-transparent hidden md:block" />

                                    {journeySteps.map((step, index) => (
                                          <motion.div
                                                key={step.title}
                                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`relative flex items-center gap-6 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                          >
                                                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                                      <div className="card-premium p-6 inline-block">
                                                            <div className="text-[var(--medical-gold)] text-sm font-medium mb-1">{step.time}</div>
                                                            <h3 className="text-xl font-bold text-[var(--medical-navy)] mb-2">{step.title}</h3>
                                                            <p className="text-[var(--medical-slate)]">{step.desc}</p>
                                                      </div>
                                                </div>

                                                {/* Center icon */}
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--medical-teal)] to-[var(--medical-dark-teal)] flex items-center justify-center shrink-0 shadow-lg z-10">
                                                      <step.icon className="w-6 h-6 text-white" />
                                                </div>

                                                <div className="flex-1 hidden md:block" />
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* GLOBAL TESTIMONIALS */}
                  <section className="section-premium">
                        <div className="container-premium">
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center mb-16"
                              >
                                    <h2 className="section-title">
                                          Hear From Our Global Patients
                                    </h2>
                                    <p className="section-subtitle mx-auto">
                                          Real stories from patients who traveled to India for treatment
                                    </p>
                              </motion.div>

                              <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                          { name: 'Sarah Mitchell', country: 'USA', flag: '🇺🇸', procedure: 'Knee Replacement', quote: 'I saved $25,000 and received world-class care. The doctors were incredible and spoke perfect English.', rating: 5 },
                                          { name: 'Mohammed Al-Said', country: 'UAE', flag: '🇦🇪', procedure: 'Cardiac Surgery', quote: 'Zero wait time compared to 6 months back home. The hospital felt like a 5-star hotel.', rating: 5 },
                                          { name: 'Emma Thompson', country: 'UK', flag: '🇬🇧', procedure: 'IVF Treatment', quote: 'After 3 failed attempts in UK, we succeeded here on the first try. Forever grateful!', rating: 5 },
                                    ].map((testimonial, index) => (
                                          <motion.div
                                                key={testimonial.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="card-premium p-6"
                                          >
                                                <div className="flex items-center gap-3 mb-4">
                                                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--medical-teal)] to-[var(--medical-dark-teal)] flex items-center justify-center text-white font-bold">
                                                            {testimonial.name.charAt(0)}
                                                      </div>
                                                      <div>
                                                            <div className="text-[var(--medical-navy)] font-semibold">{testimonial.name}</div>
                                                            <div className="text-gray-500 text-sm flex items-center gap-2">
                                                                  <span>{testimonial.flag}</span>
                                                                  <span>{testimonial.country}</span>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="flex gap-1 mb-3">
                                                      {[...Array(testimonial.rating)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 text-[var(--medical-gold)] fill-current" />
                                                      ))}
                                                </div>
                                                <p className="text-[var(--medical-slate)] mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                                                <div className="text-[var(--medical-teal)] text-sm font-medium">{testimonial.procedure}</div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* FINAL CTA */}
                  <section className="py-24 relative overflow-hidden hero-premium">
                        <div className="absolute inset-0 opacity-10">
                              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTJoLTJ2Mmgyem0tNiA2di00aC0ydjRoMnptMC02di0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
                        </div>

                        <div className="relative container-premium text-center">
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <div className="flex justify-center gap-2 mb-6">
                                          {PATIENT_COUNTRIES.slice(0, 6).map(c => (
                                                <span key={c.code} className="text-3xl">{c.flag}</span>
                                          ))}
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                          Join 50,000+ International Patients
                                    </h2>
                                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                          Start your journey to world-class healthcare at a fraction of the cost.
                                          Free consultation. No obligations.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                          <Link
                                                href="/booking"
                                                className="group bg-[var(--medical-gold)] text-[var(--medical-navy)] px-10 py-5 rounded-xl font-bold text-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-lg"
                                          >
                                                <Zap className="w-6 h-6" />
                                                Get Free Quote Now
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                          </Link>
                                          <Link
                                                href="/telemedicine"
                                                className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-xl font-bold text-lg border border-white/30 hover:bg-white/20 transition-all flex items-center gap-3"
                                          >
                                                <Video className="w-6 h-6" />
                                                Book Video Consult
                                          </Link>
                                    </div>
                                    <p className="text-white/70 mt-8 text-sm">
                                          💬 Available 24/7 via WhatsApp, Zoom, or Phone
                                    </p>
                              </motion.div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default ServicesPage;
