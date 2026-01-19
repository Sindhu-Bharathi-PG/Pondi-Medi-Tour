"use client";

import { useCurrency } from '@/app/context/CurrencyContext';
import { useQuote } from '@/app/context/QuoteContext';
import { API_BASE } from '@/app/hooks/useApi';
import { normalizeName, normalizeSuccessRate } from '@/app/utils/normalize';
import { motion } from 'framer-motion';
import { Activity, ArrowLeft, ArrowRight, Baby, Bone, Brain, Building, Check, ChevronRight, Clock, Eye, Heart, Loader2, MapPin, Phone, Scissors, Shield, Sparkles, Star, Stethoscope, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../../components/common';

// Category to icon mapping
const categoryIcons: Record<string, React.ElementType> = {
      'Orthopedics': Bone,
      'IVF & Fertility': Baby,
      'Ophthalmology': Eye,
      'Cardiology': Heart,
      'Gastroenterology': Activity,
      'Neurology': Brain,
      'Dental': Scissors,
      'Oncology': Stethoscope,
};

// Category to gradient colors
const categoryGradients: Record<string, { bg: string; accent: string; light: string; text: string }> = {
      'Orthopedics': { bg: 'from-teal-600 via-cyan-600 to-emerald-600', accent: 'bg-teal-500', light: 'bg-teal-50', text: 'text-teal-600' },
      'IVF & Fertility': { bg: 'from-rose-500 via-pink-500 to-fuchsia-500', accent: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-600' },
      'Ophthalmology': { bg: 'from-emerald-500 via-teal-500 to-cyan-500', accent: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600' },
      'Cardiology': { bg: 'from-red-500 via-rose-500 to-pink-500', accent: 'bg-red-500', light: 'bg-red-50', text: 'text-red-600' },
      'Gastroenterology': { bg: 'from-amber-500 via-orange-500 to-yellow-500', accent: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600' },
      'Neurology': { bg: 'from-purple-600 via-violet-600 to-indigo-600', accent: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-600' },
      'Dental': { bg: 'from-cyan-500 via-sky-500 to-blue-500', accent: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-600' },
      'Oncology': { bg: 'from-green-500 via-emerald-500 to-teal-500', accent: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600' },
};

interface Treatment {
      id: number;
      name: string;
      slug: string;
      category: string;
      subCategory?: string;
      shortDescription: string;
      fullDescription?: string;
      procedureSteps?: any[];
      technology?: string[];
      successRate?: number;
      hospitalStay?: string;
      recoveryTime?: string;
      preRequisites?: string[];
      minPrice?: number;
      maxPrice?: number;
      insuranceCovered?: boolean;
      thumbnailUrl?: string;
      isPopular?: boolean;
      hospitalId?: number;
      hospitalName?: string;
      hospitalSlug?: string;
}

export default function TreatmentDetailPage() {
      const params = useParams();
      const treatmentId = params.id as string;

      const { convertAmount, formatCurrency, selectedCurrency } = useCurrency();
      const { openQuoteWidget } = useQuote();
      const [treatment, setTreatment] = useState<Treatment | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [convertedPrices, setConvertedPrices] = useState<{ min: number; max: number; usPrice: number }>({
            min: 0,
            max: 0,
            usPrice: 0,
      });

      useEffect(() => {
            const fetchTreatment = async () => {
                  try {
                        setLoading(true);
                        const res = await fetch(`${API_BASE}/api/treatments/${treatmentId}`);

                        if (res.ok) {
                              const data = await res.json();
                              setTreatment(data);
                        } else if (res.status === 404) {
                              setError('Treatment not found');
                        } else {
                              setError('Failed to load treatment');
                        }
                  } catch (err) {
                        console.error('Error fetching treatment:', err);
                        setError('Failed to load treatment');
                  } finally {
                        setLoading(false);
                  }
            };

            fetchTreatment();
      }, [treatmentId]);

      useEffect(() => {
            if (!treatment) return;

            const convert = async () => {
                  const minPrice = treatment.minPrice || 50000;
                  const maxPrice = treatment.maxPrice || minPrice * 2;
                  const usPrice = minPrice * 4;

                  const [min, max, us] = await Promise.all([
                        convertAmount(minPrice, 'INR'),
                        convertAmount(maxPrice, 'INR'),
                        convertAmount(usPrice, 'INR'),
                  ]);

                  setConvertedPrices({ min, max, usPrice: us });
            };
            convert();
      }, [treatment, selectedCurrency, convertAmount]);

      if (loading) {
            return (
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                        <div className="text-center">
                              <div className="relative">
                                    <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full animate-pulse"></div>
                                    <Loader2 className="w-12 h-12 text-purple-400 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                              <p className="text-purple-200 mt-6 font-medium">Loading treatment details...</p>
                        </div>
                  </div>
            );
      }

      if (error || !treatment) {
            return (
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                        <Header />
                        <div className="container mx-auto px-4 py-24 text-center">
                              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 max-w-lg mx-auto border border-white/20">
                                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                          <Stethoscope className="w-10 h-10 text-red-400" />
                                    </div>
                                    <h1 className="text-3xl font-bold text-white mb-4">Treatment Not Found</h1>
                                    <p className="text-gray-300 mb-8">The treatment you are looking for does not exist.</p>
                                    <Link
                                          href="/services"
                                          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                                    >
                                          <ArrowLeft className="w-5 h-5" />
                                          Browse Treatments
                                    </Link>
                              </div>
                        </div>
                        <Footer />
                  </div>
            );
      }

      const category = treatment.category || 'Orthopedics';
      const Icon = categoryIcons[category] || Stethoscope;
      const colors = categoryGradients[category] || categoryGradients['Orthopedics'];

      const title = normalizeName(treatment.name);
      const description = treatment.shortDescription || '';
      const fullDescription = treatment.fullDescription || description;
      const successRate = normalizeSuccessRate(treatment.successRate ?? null);
      const hospitalName = treatment.hospitalName ? normalizeName(treatment.hospitalName) : null;
      const technologies = treatment.technology || [];
      const procedureSteps = treatment.procedureSteps || [];
      const preRequisites = treatment.preRequisites || [];
      const savings = '70%';

      return (
            <div className="min-h-screen bg-slate-50">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative pt-28 pb-32 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`}>
                              <div
                                    className="absolute inset-0 opacity-20"
                                    style={{
                                          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                                          backgroundSize: '24px 24px'
                                    }}
                              />
                              <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
                              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>

                        <div className="absolute right-0 top-20 w-1/3 h-full hidden lg:block">
                              <div className="relative w-full h-full">
                                    <Image
                                          src={treatment.thumbnailUrl || 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800'}
                                          alt={title}
                                          fill
                                          className="object-cover opacity-30"
                                    />
                              </div>
                        </div>

                        <div className="relative container mx-auto px-4">
                              <nav className="flex items-center gap-2 text-white/70 mb-8 text-sm">
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <ChevronRight className="w-4 h-4" />
                                    <Link href="/services" className="hover:text-white transition-colors">Treatments</Link>
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-white font-medium">{title}</span>
                              </nav>

                              <div className="max-w-3xl">
                                    <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className="flex items-center gap-3 mb-6"
                                    >
                                          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
                                                <Icon className="w-8 h-8 text-white" />
                                          </div>
                                          <div className="flex items-center gap-3">
                                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
                                                      {category}
                                                </span>
                                                {treatment.isPopular && (
                                                      <span className="bg-amber-400 text-amber-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5">
                                                            <Sparkles className="w-4 h-4" /> Popular
                                                      </span>
                                                )}
                                          </div>
                                    </motion.div>

                                    <motion.h1
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.1 }}
                                          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                                    >
                                          {title}
                                    </motion.h1>

                                    <motion.p
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.2 }}
                                          className="text-xl text-white/90 mb-10 leading-relaxed"
                                    >
                                          {description}
                                    </motion.p>

                                    <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.3 }}
                                          className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                    >
                                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                                                <div className="flex items-center gap-2 text-white/70 text-sm mb-1">
                                                      <Star className="w-4 h-4" /> Success Rate
                                                </div>
                                                <div className="text-2xl font-bold text-white">{successRate}</div>
                                          </div>
                                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                                                <div className="flex items-center gap-2 text-amber-300 text-sm mb-1">
                                                      <Zap className="w-4 h-4" /> Savings
                                                </div>
                                                <div className="text-2xl font-bold text-amber-300">{savings}</div>
                                          </div>
                                          {treatment.recoveryTime && (
                                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                                                      <div className="flex items-center gap-2 text-white/70 text-sm mb-1">
                                                            <Clock className="w-4 h-4" /> Recovery
                                                      </div>
                                                      <div className="text-2xl font-bold text-white">{treatment.recoveryTime}</div>
                                                </div>
                                          )}
                                          {treatment.hospitalStay && (
                                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                                                      <div className="flex items-center gap-2 text-white/70 text-sm mb-1">
                                                            <Building className="w-4 h-4" /> Stay
                                                      </div>
                                                      <div className="text-2xl font-bold text-white">{treatment.hospitalStay}</div>
                                                </div>
                                          )}
                                    </motion.div>
                              </div>
                        </div>
                  </section>

                  {/* Main Content */}
                  <section className="relative -mt-16 pb-20">
                        <div className="container mx-auto px-4">
                              <div className="grid lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-8">
                                          {/* About */}
                                          <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100"
                                          >
                                                <div className="flex items-center gap-3 mb-6">
                                                      <div className={`w-12 h-12 ${colors.light} rounded-2xl flex items-center justify-center`}>
                                                            <Stethoscope className={`w-6 h-6 ${colors.text}`} />
                                                      </div>
                                                      <h2 className="text-2xl font-bold text-slate-800">About This Treatment</h2>
                                                </div>
                                                <p className="text-slate-600 leading-relaxed text-lg">{fullDescription}</p>
                                          </motion.div>

                                          {/* Procedure Steps */}
                                          {procedureSteps.length > 0 && (
                                                <motion.div
                                                      initial={{ opacity: 0, y: 30 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{ delay: 0.5 }}
                                                      className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100"
                                                >
                                                      <div className="flex items-center gap-3 mb-6">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                                                  <Activity className="w-6 h-6 text-white" />
                                                            </div>
                                                            <h2 className="text-2xl font-bold text-slate-800">Procedure Steps</h2>
                                                      </div>
                                                      <div className="space-y-4">
                                                            {procedureSteps.map((step: any, idx: number) => {
                                                                  const stepTitle = typeof step === 'string' ? step : (step.title || step.description || `Step ${idx + 1}`);
                                                                  const stepDescription = typeof step === 'object' && step.description ? step.description : null;

                                                                  return (
                                                                        <div key={idx} className="flex gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                                                                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold shrink-0">
                                                                                    {idx + 1}
                                                                              </div>
                                                                              <div>
                                                                                    <p className="text-slate-800 font-semibold">{stepTitle}</p>
                                                                                    {stepDescription && stepDescription !== stepTitle && (
                                                                                          <p className="text-slate-500 text-sm mt-1">{stepDescription}</p>
                                                                                    )}
                                                                              </div>
                                                                        </div>
                                                                  );
                                                            })}
                                                      </div>
                                                </motion.div>
                                          )}

                                          {/* Technologies */}
                                          {technologies.length > 0 && (
                                                <motion.div
                                                      initial={{ opacity: 0, y: 30 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{ delay: 0.6 }}
                                                      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-xl p-8 text-white"
                                                >
                                                      <div className="flex items-center gap-3 mb-6">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                                                                  <Zap className="w-6 h-6 text-white" />
                                                            </div>
                                                            <h2 className="text-2xl font-bold">Advanced Technology</h2>
                                                      </div>
                                                      <div className="grid sm:grid-cols-2 gap-3">
                                                            {technologies.map((tech: string, idx: number) => (
                                                                  <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
                                                                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shrink-0">
                                                                              <Check className="w-5 h-5 text-white" />
                                                                        </div>
                                                                        <span className="text-white/90">{tech}</span>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </motion.div>
                                          )}

                                          {/* Pre-requisites */}
                                          {preRequisites.length > 0 && (
                                                <motion.div
                                                      initial={{ opacity: 0, y: 30 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{ delay: 0.7 }}
                                                      className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100"
                                                >
                                                      <div className="flex items-center gap-3 mb-6">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                                                  <Shield className="w-6 h-6 text-white" />
                                                            </div>
                                                            <h2 className="text-2xl font-bold text-slate-800">Pre-requisites</h2>
                                                      </div>
                                                      <div className="grid sm:grid-cols-2 gap-3">
                                                            {preRequisites.map((req: string, idx: number) => (
                                                                  <div key={idx} className="flex items-start gap-3 bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
                                                                        <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                                                        <span className="text-slate-700">{req}</span>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </motion.div>
                                          )}

                                          {/* Hospital */}
                                          {hospitalName && (
                                                <motion.div
                                                      initial={{ opacity: 0, y: 30 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{ delay: 0.8 }}
                                                      className={`bg-gradient-to-r ${colors.bg} rounded-3xl shadow-xl p-8 text-white`}
                                                >
                                                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                            <div className="flex items-center gap-4">
                                                                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                                                                        <Building className="w-8 h-8 text-white" />
                                                                  </div>
                                                                  <div>
                                                                        <div className="text-white/70 text-sm mb-1">Available At</div>
                                                                        <h3 className="text-2xl font-bold">{hospitalName}</h3>
                                                                        <div className="flex items-center gap-2 text-white/80 mt-1">
                                                                              <MapPin className="w-4 h-4" /> Pondicherry, India
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                            {treatment.hospitalSlug && (
                                                                  <Link
                                                                        href={`/hospital/${treatment.hospitalSlug}`}
                                                                        className="bg-white text-slate-800 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
                                                                  >
                                                                        View Hospital
                                                                        <ChevronRight className="w-5 h-5" />
                                                                  </Link>
                                                            )}
                                                      </div>
                                                </motion.div>
                                          )}
                                    </div>

                                    {/* Sidebar */}
                                    <div className="lg:col-span-1">
                                          <motion.div
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="sticky top-24 space-y-6"
                                          >
                                                {/* Price Card */}
                                                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                                                      <div className={`bg-gradient-to-r ${colors.bg} p-6 text-white text-center`}>
                                                            <div className="text-white/70 text-sm mb-1">Starting From</div>
                                                            <div className="text-4xl font-bold">{formatCurrency(convertedPrices.min)}</div>
                                                            {convertedPrices.max > convertedPrices.min && (
                                                                  <div className="text-white/80 text-sm mt-1">up to {formatCurrency(convertedPrices.max)}</div>
                                                            )}
                                                      </div>

                                                      <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
                                                            <div className="flex items-center justify-between">
                                                                  <div>
                                                                        <div className="text-slate-500 text-sm line-through">{formatCurrency(convertedPrices.usPrice)}</div>
                                                                        <div className="text-slate-600 text-xs">USA Price</div>
                                                                  </div>
                                                                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold px-4 py-2 rounded-full text-sm">
                                                                        Save {savings}
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      <div className="p-6 space-y-3">
                                                            <button
                                                                  onClick={() => openQuoteWidget({
                                                                        treatmentType: title,
                                                                        hospitalId: treatment.hospitalId,
                                                                        hospitalName: hospitalName || undefined,
                                                                        source: 'treatment-detail'
                                                                  })}
                                                                  className={`w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r ${colors.bg} flex items-center justify-center gap-2 hover:opacity-90 transition-all`}
                                                            >
                                                                  Get Free Quote
                                                                  <ArrowRight className="w-5 h-5" />
                                                            </button>
                                                      </div>
                                                </div>

                                                {/* Contact */}
                                                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100">
                                                      <h3 className="font-bold text-slate-800 mb-4">Need Help?</h3>
                                                      <div className="space-y-3">
                                                            <a href="tel:+911234567890" className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors p-3 bg-slate-50 rounded-xl">
                                                                  <div className={`w-10 h-10 ${colors.light} rounded-xl flex items-center justify-center`}>
                                                                        <Phone className={`w-5 h-5 ${colors.text}`} />
                                                                  </div>
                                                                  <span className="font-medium">+91 123 456 7890</span>
                                                            </a>
                                                            <div className="flex items-center gap-3 text-slate-600 p-3 bg-slate-50 rounded-xl">
                                                                  <div className={`w-10 h-10 ${colors.light} rounded-xl flex items-center justify-center`}>
                                                                        <MapPin className={`w-5 h-5 ${colors.text}`} />
                                                                  </div>
                                                                  <span className="font-medium">Pondicherry, India</span>
                                                            </div>
                                                      </div>
                                                </div>

                                                {/* Insurance */}
                                                {treatment.insuranceCovered && (
                                                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-200">
                                                            <div className="flex items-center gap-4">
                                                                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                                                                        <Shield className="w-7 h-7 text-white" />
                                                                  </div>
                                                                  <div>
                                                                        <div className="font-bold text-green-800">Insurance Covered</div>
                                                                        <div className="text-sm text-green-600">May be covered by international insurance</div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                )}
                                          </motion.div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Back Link */}
                  <section className="py-8 border-t border-slate-200 bg-white">
                        <div className="container mx-auto px-4">
                              <Link href="/services" className={`inline-flex items-center gap-2 ${colors.text} font-semibold hover:gap-3 transition-all`}>
                                    <ArrowLeft className="w-5 h-5" />
                                    Back to All Treatments
                              </Link>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
