"use client";

import { API_BASE } from '@/app/hooks/useApi';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Building2, ChevronRight, Clock, Globe, GraduationCap, Languages, Star, Stethoscope, TrendingUp, User, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../../components/common';

interface DoctorDetail {
      id: number;
      name: string;
      imageUrl: string;
      specialty: string;
      serviceSlug: string;
      subSpecialty: string;
      credentials: string;
      experience: string;
      hospitalName: string;
      hospitalId: number;
      rating: number;
      reviewsCount: number;
      surgeriesCount: number;
      languages: string[];
      education: Array<{ degree: string; institution: string; year: string }>;
      bio: string;
      expertise: string[];
      awards: string[];
      publicationsCount: number;
      internationalTraining: string[];
      consultationTimings: string;
      isFeatured: boolean;
      isAvailable: boolean;
}

export default function DoctorDetailPage() {
      const params = useParams();
      const doctorId = params?.id as string;
      const [doctor, setDoctor] = useState<DoctorDetail | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(false);

      useEffect(() => {
            const fetchDoctor = async () => {
                  try {
                        const res = await fetch(`${API_BASE}/api/doctors/${doctorId}`);
                        if (res.ok) {
                              const data = await res.json();
                              // Add fallback for imageUrl
                              if (!data.imageUrl) {
                                    data.imageUrl = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800';
                              }
                              setDoctor(data);
                        } else {
                              setError(true);
                        }
                  } catch (err) {
                        console.error('Error fetching doctor:', err);
                        setError(true);
                  } finally {
                        setLoading(false);
                  }
            };
            fetchDoctor();
      }, [doctorId]);

      if (loading) {
            return (
                  <div className="min-h-screen bg-gray-50">
                        <Header />
                        <div className="container mx-auto px-4 py-32 text-center">
                              <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                              <p className="text-gray-600">Loading doctor profile...</p>
                        </div>
                        <Footer />
                  </div>
            );
      }

      if (error || !doctor) {
            return (
                  <div className="min-h-screen bg-gray-50">
                        <Header />
                        <div className="container mx-auto px-4 py-32 text-center">
                              <h1 className="text-4xl font-bold text-gray-800 mb-4">Doctor Not Found</h1>
                              <p className="text-gray-600 mb-8">The doctor you&apos;re looking for doesn&apos;t exist.</p>
                              <Link href="/doctor" className="text-blue-600 hover:underline">← Back to Doctors</Link>
                        </div>
                        <Footer />
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header />

                  {/* Hero Section */}
                  <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative pt-32 pb-20 overflow-hidden"
                  >
                        <div className="absolute inset-0">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900" />
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600')] bg-cover bg-center opacity-10" />
                        </div>

                        <div className="relative container mx-auto px-4">
                              <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                              >
                                    <Link href="/doctor" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
                                          <ArrowLeft className="w-5 h-5" />
                                          Back to Doctors
                                    </Link>
                              </motion.div>

                              <div className="flex flex-col lg:flex-row gap-10 items-start">
                                    {/* Doctor Image */}
                                    <motion.div
                                          initial={{ scale: 0.8, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          transition={{ delay: 0.3 }}
                                          className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl shrink-0 border-4 border-white/20"
                                    >
                                          <Image
                                                src={doctor.imageUrl}
                                                alt={doctor.name}
                                                fill
                                                className="object-cover"
                                                priority
                                          />
                                          {doctor.isAvailable && (
                                                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                      Available
                                                </div>
                                          )}
                                    </motion.div>

                                    {/* Doctor Info */}
                                    <div className="flex-1">
                                          <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="flex flex-wrap gap-2 mb-4"
                                          >
                                                {doctor.isFeatured && (
                                                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                                            <Award className="w-4 h-4" />
                                                            Top Rated
                                                      </span>
                                                )}
                                                <Link
                                                      href={`/services/${doctor.serviceSlug}`}
                                                      className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                                                >
                                                      {doctor.specialty}
                                                </Link>
                                          </motion.div>

                                          <motion.h1
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-4xl md:text-5xl font-bold text-white mb-2"
                                          >
                                                {doctor.name}
                                          </motion.h1>

                                          <motion.p
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.55 }}
                                                className="text-xl text-blue-200 mb-2"
                                          >
                                                {doctor.subSpecialty}
                                          </motion.p>

                                          <motion.p
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                className="text-white/80 mb-6"
                                          >
                                                {doctor.credentials}
                                          </motion.p>

                                          <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                                className="flex flex-wrap items-center gap-6 text-white mb-8"
                                          >
                                                <div className="flex items-center gap-2">
                                                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                      <span className="font-bold">{doctor.rating}</span>
                                                      <span className="text-white/70">({doctor.reviewsCount} reviews)</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                      <Clock className="w-5 h-5" />
                                                      <span>{doctor.experience}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                      <TrendingUp className="w-5 h-5" />
                                                      <span>{doctor.surgeriesCount.toLocaleString()}+ Procedures</span>
                                                </div>
                                          </motion.div>

                                          <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.8 }}
                                          >
                                                <Link
                                                      href={`/hospital/${doctor.hospitalId}`}
                                                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                                                >
                                                      <Building2 className="w-5 h-5 text-white" />
                                                      <div>
                                                            <div className="text-white/60 text-xs">Practicing at</div>
                                                            <div className="text-white font-semibold">{doctor.hospitalName}</div>
                                                      </div>
                                                      <ChevronRight className="w-5 h-5 text-white/60" />
                                                </Link>
                                          </motion.div>
                                    </div>
                              </div>
                        </div>
                  </motion.section>

                  {/* Stats Bar */}
                  <section className="bg-white shadow-lg relative z-10 -mt-4">
                        <div className="container mx-auto px-4 py-6">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                          { value: doctor.experience, label: 'Experience', icon: Clock },
                                          { value: `${doctor.surgeriesCount.toLocaleString()}+`, label: 'Procedures', icon: TrendingUp },
                                          { value: doctor.publicationsCount, label: 'Publications', icon: GraduationCap },
                                          { value: doctor.rating, label: 'Rating', icon: Star },
                                    ].map((stat, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.9 + i * 0.1 }}
                                                className="text-center"
                                          >
                                                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                                                <div className="text-sm text-gray-600">{stat.label}</div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Main Content */}
                  <section className="py-16">
                        <div className="container mx-auto px-4">
                              <div className="grid lg:grid-cols-3 gap-8">
                                    {/* Left Column */}
                                    <div className="lg:col-span-2 space-y-8">
                                          {/* About */}
                                          <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-2xl shadow-lg p-8"
                                          >
                                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                      <User className="w-6 h-6 text-blue-600" />
                                                      About {doctor.name}
                                                </h2>
                                                <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
                                          </motion.div>

                                          {/* Expertise */}
                                          <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-2xl shadow-lg p-8"
                                          >
                                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                                      <Stethoscope className="w-6 h-6 text-blue-600" />
                                                      Areas of Expertise
                                                </h2>
                                                <div className="grid md:grid-cols-2 gap-3">
                                                      {doctor.expertise.map((item: string, i: number) => (
                                                            <motion.div
                                                                  key={i}
                                                                  initial={{ x: -20, opacity: 0 }}
                                                                  whileInView={{ x: 0, opacity: 1 }}
                                                                  viewport={{ once: true }}
                                                                  transition={{ delay: i * 0.05 }}
                                                                  className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg"
                                                            >
                                                                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                                                  <span className="text-gray-700">{item}</span>
                                                            </motion.div>
                                                      ))}
                                                </div>
                                          </motion.div>

                                          {/* Education & Training */}
                                          <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-2xl shadow-lg p-8"
                                          >
                                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                                      <GraduationCap className="w-6 h-6 text-blue-600" />
                                                      Education & Training
                                                </h2>
                                                <div className="space-y-4">
                                                      {doctor.education.map((edu: any, i: number) => (
                                                            <motion.div
                                                                  key={i}
                                                                  initial={{ x: -20, opacity: 0 }}
                                                                  whileInView={{ x: 0, opacity: 1 }}
                                                                  viewport={{ once: true }}
                                                                  transition={{ delay: i * 0.1 }}
                                                                  className="flex gap-4 items-start"
                                                            >
                                                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                                                        {String(edu.year || '').slice(-2) || '—'}
                                                                  </div>
                                                                  <div>
                                                                        <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                                                                        <p className="text-gray-600">{edu.institution}</p>
                                                                  </div>
                                                            </motion.div>
                                                      ))}
                                                </div>

                                                {doctor.internationalTraining && (
                                                      <div className="mt-8 pt-6 border-t">
                                                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                                  <Globe className="w-5 h-5 text-blue-600" />
                                                                  International Training
                                                            </h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                  {doctor.internationalTraining.map((country: string, i: number) => (
                                                                        <span key={i} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium">
                                                                              {country}
                                                                        </span>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                )}
                                          </motion.div>

                                          {/* Awards */}
                                          {doctor.awards && (
                                                <motion.div
                                                      initial={{ y: 50, opacity: 0 }}
                                                      whileInView={{ y: 0, opacity: 1 }}
                                                      viewport={{ once: true }}
                                                      className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-8 border border-yellow-100"
                                                >
                                                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                                            <Award className="w-6 h-6 text-yellow-600" />
                                                            Awards & Recognition
                                                      </h2>
                                                      <div className="space-y-3">
                                                            {doctor.awards.map((award: string, i: number) => (
                                                                  <motion.div
                                                                        key={i}
                                                                        initial={{ scale: 0.9, opacity: 0 }}
                                                                        whileInView={{ scale: 1, opacity: 1 }}
                                                                        viewport={{ once: true }}
                                                                        transition={{ delay: i * 0.1 }}
                                                                        className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm"
                                                                  >
                                                                        <Star className="w-5 h-5 text-yellow-500 fill-current shrink-0" />
                                                                        <span className="text-gray-700">{award}</span>
                                                                  </motion.div>
                                                            ))}
                                                      </div>
                                                </motion.div>
                                          )}
                                    </div>

                                    {/* Right Column - Sidebar */}
                                    <div className="space-y-6">
                                          {/* Quick Info Card */}
                                          <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
                                          >
                                                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Information</h3>

                                                <div className="space-y-4">
                                                      <div className="flex items-start gap-3">
                                                            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                                                            <div>
                                                                  <div className="text-sm text-gray-500">Consultation Timings</div>
                                                                  <div className="text-gray-800 font-medium">{doctor.consultationTimings}</div>
                                                            </div>
                                                      </div>

                                                      <div className="flex items-start gap-3">
                                                            <Languages className="w-5 h-5 text-blue-600 mt-0.5" />
                                                            <div>
                                                                  <div className="text-sm text-gray-500">Languages</div>
                                                                  <div className="text-gray-800 font-medium">{doctor.languages.join(', ')}</div>
                                                            </div>
                                                      </div>

                                                      <div className="flex items-start gap-3">
                                                            <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
                                                            <div>
                                                                  <div className="text-sm text-gray-500">Hospital</div>
                                                                  <Link href={`/hospital/${doctor.hospitalId}`} className="text-blue-600 font-medium hover:underline">
                                                                        {doctor.hospitalName}
                                                                  </Link>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="mt-6 pt-6 border-t">
                                                      <Link
                                                            href={`/services/${doctor.serviceSlug}`}
                                                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
                                                      >
                                                            View {doctor.specialty} Treatments
                                                            <ChevronRight className="w-4 h-4" />
                                                      </Link>

                                                      <Link
                                                            href={`/hospital/${doctor.hospitalId}`}
                                                            className="w-full mt-3 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                                                      >
                                                            View Hospital
                                                            <Building2 className="w-4 h-4" />
                                                      </Link>
                                                </div>
                                          </motion.div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Related Doctors CTA */}
                  <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900">
                        <div className="container mx-auto px-4">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center max-w-3xl mx-auto"
                              >
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                          Explore More Specialists
                                    </h2>
                                    <p className="text-blue-100 text-lg mb-8">
                                          Find the right specialist for your medical needs from our network of world-class doctors.
                                    </p>
                                    <Link
                                          href="/doctor"
                                          className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400 transition-all"
                                    >
                                          <Users className="w-5 h-5" />
                                          View All Doctors
                                    </Link>
                              </motion.div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
