"use client";

import { useCurrency } from '@/app/context/CurrencyContext';
import { API_BASE } from '@/app/hooks/useApi';
import { normalizeCategory, normalizeDescription, normalizeName, normalizeSuccessRate } from '@/app/utils/normalize';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Award, Baby, Bone, Brain, Building2, ChevronRight, Eye, Heart, MapPin, Plane, Scissors, Search, Shield, Sparkles, Stethoscope, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Footer, Header } from '../components/common';

// Country flags for international appeal
const PATIENT_COUNTRIES = [
      { code: 'US', name: 'United States', flag: '🇺🇸', patients: '15,000+' },
      { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', patients: '8,000+' },
      { code: 'AE', name: 'UAE', flag: '🇦🇪', patients: '6,000+' },
      { code: 'AU', name: 'Australia', flag: '🇦🇺', patients: '4,500+' },
      { code: 'CA', name: 'Canada', flag: '🇨🇦', patients: '3,500+' },
];

// Category styling
const categoryStyles: Record<string, { icon: any; bg: string; text: string; light: string }> = {
      'Orthopedics': { icon: Bone, bg: 'from-teal-500 to-emerald-500', text: 'text-teal-600', light: 'bg-teal-50' },
      'IVF & Fertility': { icon: Baby, bg: 'from-rose-500 to-pink-500', text: 'text-rose-600', light: 'bg-rose-50' },
      'Ophthalmology': { icon: Eye, bg: 'from-emerald-500 to-cyan-500', text: 'text-emerald-600', light: 'bg-emerald-50' },
      'Cardiology': { icon: Heart, bg: 'from-red-500 to-rose-500', text: 'text-red-600', light: 'bg-red-50' },
      'Gastroenterology': { icon: Activity, bg: 'from-amber-500 to-orange-500', text: 'text-amber-600', light: 'bg-amber-50' },
      'Neurology': { icon: Brain, bg: 'from-purple-500 to-indigo-500', text: 'text-purple-600', light: 'bg-purple-50' },
      'Dental': { icon: Scissors, bg: 'from-cyan-500 to-blue-500', text: 'text-cyan-600', light: 'bg-cyan-50' },
      'Oncology': { icon: Stethoscope, bg: 'from-green-500 to-teal-500', text: 'text-green-600', light: 'bg-green-50' },
};

const ServicesPage = () => {
      const { convertAmount, formatCurrency, selectedCurrency } = useCurrency();
      const [services, setServices] = useState<any[]>([]);
      const [filteredServices, setFilteredServices] = useState<any[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [searchQuery, setSearchQuery] = useState('');
      const [convertedPrices, setConvertedPrices] = useState<Record<string, { pondy: number; us: number }>>({});
      const resultsRef = useRef<HTMLDivElement>(null);

      // Fetch services from API
      useEffect(() => {
            const fetchServices = async () => {
                  try {
                        const response = await fetch(`${API_BASE}/api/treatments`);
                        const data = await response.json();

                        if (data && Array.isArray(data) && data.length > 0) {
                              const mappedServices = data.map(t => {
                                    const category = normalizeCategory(t.category);
                                    const styles = categoryStyles[category] || categoryStyles['Orthopedics'];

                                    return {
                                          id: t.slug || t.id.toString(),
                                          title: normalizeName(t.name),
                                          description: normalizeDescription(t.shortDescription, 150),
                                          image: t.thumbnailUrl || 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800',
                                          procedures: Array.isArray(t.technology) ? t.technology : [],
                                          savings: t.isPopular ? '70%+' : '60%+',
                                          pondyPriceINR: t.minPrice || 50000,
                                          usPriceINR: (t.minPrice || 50000) * 4,
                                          successRate: normalizeSuccessRate(t.successRate),
                                          featured: t.isPopular,
                                          hospitalName: normalizeName(t.hospitalName),
                                          category: category,
                                          styles: styles
                                    };
                              });
                              setServices(mappedServices);
                              setFilteredServices(mappedServices);
                        }
                  } catch (error) {
                        console.error('Error fetching services:', error);
                  } finally {
                        setIsLoading(false);
                  }
            };
            fetchServices();
      }, []);

      // Filter services
      useEffect(() => {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = services.filter(service =>
                  service.title.toLowerCase().includes(lowerQuery) ||
                  service.category.toLowerCase().includes(lowerQuery) ||
                  service.description.toLowerCase().includes(lowerQuery)
            );
            setFilteredServices(filtered);
      }, [searchQuery, services]);

      // Price conversion
      useEffect(() => {
            if (services.length === 0) return;

            const convertPrices = async () => {
                  const newPrices: Record<string, { pondy: number; us: number }> = {};

                  // Process in chunks to avoid blocking
                  for (const service of services) {
                        const [pondy, us] = await Promise.all([
                              convertAmount(service.pondyPriceINR, 'INR'),
                              convertAmount(service.usPriceINR, 'INR')
                        ]);
                        newPrices[service.id] = { pondy, us };
                  }
                  setConvertedPrices(newPrices);
            };

            convertPrices();
      }, [services, selectedCurrency, convertAmount]);

      const getPrice = (id: string, type: 'pondy' | 'us') => {
            return convertedPrices[id]?.[type] || 0;
      };

      return (
            <div className="min-h-screen bg-slate-50">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative pt-32 pb-20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
                              <div className="absolute inset-0 opacity-20" style={{
                                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                                    backgroundSize: '32px 32px'
                              }}></div>
                              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
                              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        <div className="relative container mx-auto px-4 text-center">
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="max-w-3xl mx-auto"
                              >
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-purple-200 mb-6 border border-white/10">
                                          <Sparkles className="w-4 h-4" />
                                          <span className="text-sm font-medium">World-Class Healthcare at 70% Less Cost</span>
                                    </div>

                                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                          Find Your Perfect <br />
                                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Medical Treatment</span>
                                    </h1>

                                    <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
                                          Explore premium treatments from JCI-accredited hospitals in Pondicherry, India.
                                          Combine world-class care with a relaxing recovery vacation.
                                    </p>

                                    {/* Search Bar */}
                                    <div className="bg-white p-2 rounded-2xl shadow-xl max-w-2xl mx-auto flex items-center gap-2">
                                          <div className="flex-1 flex items-center gap-3 px-4">
                                                <Search className="w-5 h-5 text-gray-400" />
                                                <input
                                                      type="text"
                                                      placeholder="Search treatments (e.g., Knee Replacement, IVF)..."
                                                      className="w-full py-3 outline-none text-gray-700 placeholder-gray-400"
                                                      value={searchQuery}
                                                      onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                          </div>
                                          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                                                Search
                                          </button>
                                    </div>
                              </motion.div>

                              {/* Trust Signals */}
                              <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/60">
                                    <div className="flex items-center gap-2">
                                          <Shield className="w-5 h-5 text-emerald-400" />
                                          <span>JCI Accredited Hospitals</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                          <Users className="w-5 h-5 text-blue-400" />
                                          <span>50,000+ Happy Patients</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                          <Award className="w-5 h-5 text-amber-400" />
                                          <span>US/UK Trained Surgeons</span>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Treatments Grid */}
                  <section className="py-20">
                        <div className="container mx-auto px-4">
                              {isLoading ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                          {[1, 2, 3, 4, 5, 6].map((i) => (
                                                <div key={i} className="h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100/50 animate-pulse">
                                                      <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300" />
                                                      <div className="p-7 pt-5">
                                                            <div className="mb-4">
                                                                  <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
                                                                  <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-2" />
                                                                  <div className="h-4 bg-gray-100 rounded w-full mb-1" />
                                                                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                                  <div className="h-16 bg-gray-100 rounded-2xl" />
                                                                  <div className="h-16 bg-gray-100 rounded-2xl" />
                                                            </div>
                                                            <div className="flex gap-2 mb-6">
                                                                  <div className="h-8 bg-gray-100 rounded-lg w-20" />
                                                                  <div className="h-8 bg-gray-100 rounded-lg w-24" />
                                                                  <div className="h-8 bg-gray-100 rounded-lg w-16" />
                                                            </div>
                                                            <div className="pt-6 border-t border-gray-100">
                                                                  <div className="h-8 bg-gray-100 rounded-lg w-32 ml-auto" />
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                          {filteredServices.map((service, index) => {
                                                const Icon = service.styles.icon;

                                                return (
                                                      <motion.div
                                                            key={service.id}
                                                            initial={{ opacity: 0, y: 30 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: (index % 3) * 0.1 }}
                                                            className="h-full"
                                                      >
                                                            <Link href={`/services/${service.id}`} className="block h-full group">
                                                                  <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100/50 group-hover:border-[var(--medical-teal)]/20">

                                                                        {/* Image Section - Unified Style */}
                                                                        <div className="relative h-64 overflow-hidden">
                                                                              <Image
                                                                                    src={service.image}
                                                                                    alt={service.title}
                                                                                    fill
                                                                                    loading="lazy"
                                                                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                                                              />
                                                                              <div className={`absolute inset-0 bg-gradient-to-t ${service.styles.bg} opacity-80`} />

                                                                              {/* Top Badges */}
                                                                              <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                                                                                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg">
                                                                                          <Icon className={`w-6 h-6 ${service.styles.text}`} />
                                                                                    </div>
                                                                                    <div className="bg-white/90 backdrop-blur-md text-[var(--medical-teal)] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                                                                                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--medical-teal)] animate-pulse" />
                                                                                          Save {service.savings}
                                                                                    </div>
                                                                              </div>

                                                                              {/* Success Rate Badge - Floating */}
                                                                              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                                                                    <div className="flex flex-col items-center">
                                                                                          <div className="flex items-center gap-1 text-[var(--medical-gold)] mb-0.5">
                                                                                                <Award className="w-4 h-4 fill-current" />
                                                                                                <span className="text-sm font-black text-[var(--medical-navy)]">{service.successRate}</span>
                                                                                          </div>
                                                                                          <div className="text-[10px] text-gray-500 font-bold">Success Rate</div>
                                                                                    </div>
                                                                              </div>
                                                                        </div>

                                                                        {/* Content Area - Unified Style */}
                                                                        <div className="p-7 pt-5 flex-1 flex flex-col">
                                                                              <div className="mb-4">
                                                                                    <div className={`text-xs font-black uppercase tracking-widest ${service.styles.text} mb-2`}>{service.category}</div>
                                                                                    <h3 className="text-xl font-black text-[var(--medical-navy)] group-hover:text-[var(--medical-teal)] transition-colors duration-300 leading-tight mb-2">
                                                                                          {service.title}
                                                                                    </h3>
                                                                                    <p className="text-gray-500 text-sm font-medium line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                                                          {service.description}
                                                                                    </p>
                                                                              </div>

                                                                              {/* Key Info Grid */}
                                                                              <div className="grid grid-cols-2 gap-4 mb-6">
                                                                                    <div className={`flex items-center gap-3 ${service.styles.light} p-3 rounded-2xl group-hover:bg-[var(--medical-light-teal)]/30 transition-colors`}>
                                                                                          <div className="p-2 bg-white rounded-xl shadow-sm">
                                                                                                <Building2 className={`w-4 h-4 ${service.styles.text}`} />
                                                                                          </div>
                                                                                          <div className="flex flex-col">
                                                                                                <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Hospital</span>
                                                                                                <span className="text-xs font-bold text-[var(--medical-navy)] truncate max-w-[80px]">{service.hospitalName}</span>
                                                                                          </div>
                                                                                    </div>
                                                                                    <div className={`flex items-center gap-3 ${service.styles.light} p-3 rounded-2xl group-hover:bg-[var(--medical-light-teal)]/30 transition-colors`}>
                                                                                          <div className="p-2 bg-white rounded-xl shadow-sm">
                                                                                                <Sparkles className={`w-4 h-4 ${service.styles.text}`} />
                                                                                          </div>
                                                                                          <div className="flex flex-col">
                                                                                                <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Price</span>
                                                                                                <span className={`text-xs font-bold ${service.styles.text}`}>{formatCurrency(getPrice(service.id, 'pondy'))}</span>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>

                                                                              {/* Technology/Procedures Tags */}
                                                                              <div className="flex flex-wrap gap-2 mb-6">
                                                                                    {service.procedures.slice(0, 3).map((proc: string, i: number) => (
                                                                                          <span key={i} className={`text-[10px] font-black uppercase tracking-wider ${service.styles.text} ${service.styles.light} px-3 py-1.5 rounded-lg border ${service.styles.text.replace('text-', 'border-')}/10`}>
                                                                                                {proc}
                                                                                          </span>
                                                                                    ))}
                                                                                    {service.procedures.length > 3 && (
                                                                                          <span className="text-[10px] font-black text-gray-400 self-center">
                                                                                                +{service.procedures.length - 3} More
                                                                                          </span>
                                                                                    )}
                                                                              </div>

                                                                              {/* Footer - Unified Style */}
                                                                              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                                                                    <div className="flex flex-col">
                                                                                          <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">vs USA Price</span>
                                                                                          <span className="text-xs text-gray-400 line-through">{formatCurrency(getPrice(service.id, 'us'))}</span>
                                                                                    </div>

                                                                                    <div className="flex items-center gap-2 text-[var(--medical-teal)] font-black text-sm uppercase tracking-widest group/link">
                                                                                          Details
                                                                                          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${service.styles.bg} text-white flex items-center justify-center group-hover/link:translate-x-1 transition-transform shadow-lg`}>
                                                                                                <ChevronRight className="w-5 h-5" />
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </Link>
                                                      </motion.div>
                                                );
                                          })}
                                    </div>
                              )}
                        </div>
                  </section>

                  {/* International Patients - Banner */}
                  <section className="py-20 bg-white border-t border-slate-100">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Trusted by Patients Worldwide</h2>
                                    <p className="text-slate-500 max-w-2xl mx-auto">We welcome thousands of international patients annually, providing dedicated support services for a seamless medical journey.</p>
                              </div>

                              <div className="flex flex-wrap justify-center gap-6">
                                    {PATIENT_COUNTRIES.map((country) => (
                                          <div key={country.code} className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                                                <span className="text-2xl">{country.flag}</span>
                                                <div className="text-left">
                                                      <div className="font-bold text-slate-700">{country.name}</div>
                                                      <div className="text-xs text-slate-500">{country.patients} Patients</div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Process Steps */}
                  <section className="py-20 bg-slate-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Your Journey to Recovery</h2>
                                    <p className="text-slate-500">Simple, transparent, and guided every step of the way</p>
                              </div>

                              <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                                    {[
                                          { icon: Plane, title: "Plan", desc: "Consultation & Visa" },
                                          { icon: MapPin, title: "Arrive", desc: "Airport Pickup & Hotel" },
                                          { icon: Activity, title: "Treat", desc: "Procedure & Care" },
                                          { icon: Heart, title: "Recover", desc: "Rehab & Sightseeing" }
                                    ].map((step, idx) => (
                                          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative group hover:shadow-md transition-all">
                                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                      <step.icon className="w-6 h-6" />
                                                </div>
                                                <h3 className="font-bold text-slate-800 mb-1">{step.title}</h3>
                                                <p className="text-sm text-slate-500">{step.desc}</p>

                                                {idx < 3 && (
                                                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                                                            <ArrowRight className="w-4 h-4 text-slate-300" />
                                                      </div>
                                                )}
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default ServicesPage;
