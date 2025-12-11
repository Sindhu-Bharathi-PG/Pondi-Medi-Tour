"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, GraduationCap, Clock, ChevronRight, Search, Heart, Stethoscope, Globe, Users, MapPin, Building2, ArrowRight, TrendingUp, Activity } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Header, Footer } from '../components/common';

// Doctor data with hospital and service linking
const doctors = [
      {
            id: 1,
            name: 'Dr. V. Veerappan',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
            specialty: 'Orthopedics',
            serviceSlug: 'orthopedics',
            subSpecialty: 'Spine & Joint Replacement',
            credentials: 'MBBS, MS (Orthopaedics), FRCS (Glasgow)',
            experience: '31+ years',
            hospital: 'POSH Hospital',
            hospitalId: '1',
            rating: 4.9,
            reviews: 450,
            surgeries: 5000,
            languages: ['English', 'Tamil', 'Hindi'],
            education: ['MBBS - Madras Medical College', 'MS Ortho - CMC Vellore', 'FRCS - Glasgow, UK'],
            bio: 'A pioneer in minimally invasive spine surgery with over three decades of experience.',
            featured: true,
            available: true,
      },
      {
            id: 2,
            name: 'Dr. V. M. Thomas',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
            specialty: 'IVF & Fertility',
            serviceSlug: 'ivf',
            subSpecialty: 'Reproductive Medicine',
            credentials: 'PhD, FSAB (Reproductive Biotechnology)',
            experience: '25+ years',
            hospital: 'Indira IVF Centre',
            hospitalId: '2',
            rating: 4.9,
            reviews: 680,
            surgeries: 10000,
            languages: ['English', 'Malayalam', 'Tamil'],
            education: ['PhD - IISc Bangalore', 'FSAB - European Society'],
            bio: 'Renowned embryologist with thousands of successful IVF cycles worldwide.',
            featured: true,
            available: true,
      },
      {
            id: 3,
            name: 'Dr. Ramya R',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
            specialty: 'IVF & Fertility',
            serviceSlug: 'ivf',
            subSpecialty: 'Infertility Consultant',
            credentials: 'MBBS, DGO, FRM',
            experience: '11+ years',
            hospital: 'Indira IVF Centre',
            hospitalId: '2',
            rating: 4.8,
            reviews: 320,
            surgeries: 2500,
            languages: ['English', 'Tamil', 'Hindi'],
            education: ['MBBS - Stanley Medical', 'DGO - Govt General Hospital', 'FRM - Singapore'],
            bio: 'Passionate fertility specialist dedicated to making parenthood dreams come true.',
            featured: true,
            available: true,
      },
      {
            id: 4,
            name: 'Dr. Suresh Kumar',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
            specialty: 'Cardiology',
            serviceSlug: 'cardiology',
            subSpecialty: 'Interventional Cardiology',
            credentials: 'DM Cardiology, FACC (USA)',
            experience: '18+ years',
            hospital: 'JIPMER',
            hospitalId: '1',
            rating: 4.9,
            reviews: 520,
            surgeries: 4000,
            languages: ['English', 'Tamil', 'Telugu'],
            education: ['MBBS - JIPMER', 'DM Cardio - AIIMS', 'Fellowship - Cleveland Clinic'],
            bio: 'Cleveland Clinic trained interventional cardiologist specializing in complex angioplasty.',
            featured: false,
            available: true,
      },
      {
            id: 5,
            name: 'Dr. Priya Sharma',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
            specialty: 'Gastroenterology',
            serviceSlug: 'gastroenterology',
            subSpecialty: 'Bariatric Surgery',
            credentials: 'MS, MCh, FAIS',
            experience: '15+ years',
            hospital: 'GEM Hospital',
            hospitalId: '2',
            rating: 4.8,
            reviews: 380,
            surgeries: 3200,
            languages: ['English', 'Hindi', 'Tamil'],
            education: ['MBBS - Maulana Azad', 'MS - PGI Chandigarh', 'MCh - GEM Hospital'],
            bio: 'Leading bariatric surgeon with expertise in laparoscopic and robotic procedures.',
            featured: false,
            available: true,
      },
      {
            id: 6,
            name: 'Dr. Aravind Mohan',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400',
            specialty: 'Ophthalmology',
            serviceSlug: 'ophthalmology',
            subSpecialty: 'Cataract & Retina',
            credentials: 'MS, DNB, FICO',
            experience: '20+ years',
            hospital: 'Aravind Eye Hospital',
            hospitalId: '1',
            rating: 4.9,
            reviews: 890,
            surgeries: 15000,
            languages: ['English', 'Tamil', 'Malayalam'],
            education: ['MBBS - Madras Medical', 'MS Ophth - Aravind', 'Fellowship - Moorfields UK'],
            bio: 'World-renowned retina specialist with expertise from Moorfields Eye Hospital, UK.',
            featured: false,
            available: true,
      },
];

const specialties = [
      { id: 'all', label: 'All Specialties', count: doctors.length },
      { id: 'Orthopedics', label: 'Orthopedics', count: doctors.filter(d => d.specialty === 'Orthopedics').length },
      { id: 'IVF & Fertility', label: 'IVF & Fertility', count: doctors.filter(d => d.specialty === 'IVF & Fertility').length },
      { id: 'Cardiology', label: 'Cardiology', count: doctors.filter(d => d.specialty === 'Cardiology').length },
      { id: 'Gastroenterology', label: 'Gastroenterology', count: doctors.filter(d => d.specialty === 'Gastroenterology').length },
      { id: 'Ophthalmology', label: 'Ophthalmology', count: doctors.filter(d => d.specialty === 'Ophthalmology').length },
];

export default function DoctorPage() {
      const [activeSpecialty, setActiveSpecialty] = useState('all');
      const [searchQuery, setSearchQuery] = useState('');
      const [counts, setCounts] = useState<Record<number, number>>({});

      const stats = [
            { value: '200+', label: 'Expert Doctors', icon: Stethoscope, target: 200 },
            { value: '50K+', label: 'Successful Surgeries', icon: Activity, target: 50000 },
            { value: '45+', label: 'Countries Served', icon: Globe, target: 45 },
            { value: '4.8', label: 'Average Rating', icon: Star, target: 48 },
      ];

      // Animated counter effect
      useEffect(() => {
            const timers: NodeJS.Timeout[] = [];
            stats.forEach((stat, index) => {
                  let current = 0;
                  const targetValue = stat.target;
                  const increment = targetValue / 50;
                  const timer = setInterval(() => {
                        current += increment;
                        if (current >= targetValue) {
                              setCounts(prev => ({ ...prev, [index]: targetValue }));
                              clearInterval(timer);
                        } else {
                              setCounts(prev => ({ ...prev, [index]: Math.floor(current) }));
                        }
                  }, 30);
                  timers.push(timer);
            });
            return () => timers.forEach(timer => clearInterval(timer));
      }, []);

      const filteredDoctors = doctors.filter(d => {
            const matchesSpecialty = activeSpecialty === 'all' || d.specialty === activeSpecialty;
            const matchesSearch = searchQuery === '' ||
                  d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  d.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  d.hospital.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSpecialty && matchesSearch;
      });

      const featuredDoctors = filteredDoctors.filter(d => d.featured);
      const allDoctors = filteredDoctors;

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header />

                  {/* Hero Section with Parallax */}
                  <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative pt-32 pb-24 overflow-hidden"
                  >
                        <div className="absolute inset-0">
                              <Image
                                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600"
                                    alt="Medical specialists"
                                    fill
                                    className="object-cover scale-105"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-transparent" />
                        </div>

                        <div className="relative container mx-auto px-4">
                              <motion.nav
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-2 text-white/70 mb-8 text-sm"
                              >
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-white">Specialist Doctors</span>
                              </motion.nav>

                              <div className="max-w-4xl">
                                    <motion.div
                                          initial={{ y: 30, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.3 }}
                                          className="flex flex-wrap gap-2 mb-4"
                                    >
                                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                200+ Verified Specialists
                                          </span>
                                          <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                                                International Credentials
                                          </span>
                                    </motion.div>

                                    <motion.h1
                                          initial={{ y: 30, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.4 }}
                                          className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                                    >
                                          World-Class Medical
                                          <span className="block text-yellow-400">Specialists</span>
                                    </motion.h1>

                                    <motion.p
                                          initial={{ y: 30, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.5 }}
                                          className="text-xl text-white/90 mb-8 max-w-3xl"
                                    >
                                          Every doctor in our network holds verified international credentials.
                                          Many are professors at prestigious medical colleges, ensuring your treatment
                                          is based on the latest research.
                                    </motion.p>

                                    {/* Search Bar */}
                                    <motion.div
                                          initial={{ y: 30, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.6 }}
                                          className="max-w-xl"
                                    >
                                          <div className="flex items-center bg-white rounded-xl shadow-2xl overflow-hidden">
                                                <Search className="w-5 h-5 text-gray-400 ml-4" />
                                                <input
                                                      type="text"
                                                      placeholder="Search by doctor name, specialty, hospital..."
                                                      value={searchQuery}
                                                      onChange={(e) => setSearchQuery(e.target.value)}
                                                      className="flex-1 px-4 py-4 text-gray-800 focus:outline-none"
                                                />
                                                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
                                                      Search
                                                </button>
                                          </div>
                                    </motion.div>
                              </div>
                        </div>
                  </motion.section>

                  {/* Animated Stats Bar */}
                  <section className="bg-white shadow-lg relative z-10 -mt-6">
                        <div className="container mx-auto px-4 py-8">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {stats.map((stat, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.8 + i * 0.1 }}
                                                className="text-center group hover:scale-105 transition-transform"
                                          >
                                                <stat.icon className="w-10 h-10 mx-auto mb-2 text-blue-600 group-hover:text-blue-700 transition-colors" />
                                                <div className="text-3xl font-bold text-gray-800">
                                                      {stat.value.includes('.')
                                                            ? (counts[i] ? (counts[i] / 10).toFixed(1) : '0.0')
                                                            : (counts[i] || 0).toLocaleString() + (stat.value.includes('+') ? '+' : '')
                                                      }
                                                </div>
                                                <div className="text-sm text-gray-600">{stat.label}</div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Specialty Filters */}
                  <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="container mx-auto px-4">
                              <div className="flex flex-wrap gap-3 justify-center">
                                    {specialties.map((specialty) => (
                                          <motion.button
                                                key={specialty.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setActiveSpecialty(specialty.id)}
                                                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${activeSpecialty === specialty.id
                                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                                      }`}
                                          >
                                                {specialty.label}
                                                <span className={`px-2 py-0.5 rounded-full text-xs ${activeSpecialty === specialty.id ? 'bg-white/20' : 'bg-gray-200'
                                                      }`}>
                                                      {specialty.count}
                                                </span>
                                          </motion.button>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Featured Doctors */}
                  {featuredDoctors.length > 0 && (
                        <section className="py-16 bg-white">
                              <div className="container mx-auto px-4">
                                    <motion.div
                                          initial={{ y: 30, opacity: 0 }}
                                          whileInView={{ y: 0, opacity: 1 }}
                                          viewport={{ once: true }}
                                          className="flex items-center gap-3 mb-10"
                                    >
                                          <Award className="w-8 h-8 text-yellow-500" />
                                          <h2 className="text-3xl font-bold text-gray-800">Top Rated Specialists</h2>
                                    </motion.div>

                                    <div className="grid lg:grid-cols-3 gap-8">
                                          {featuredDoctors.map((doctor, index) => (
                                                <motion.div
                                                      key={doctor.id}
                                                      initial={{ opacity: 0, y: 30 }}
                                                      whileInView={{ opacity: 1, y: 0 }}
                                                      viewport={{ once: true }}
                                                      transition={{ delay: index * 0.1 }}
                                                      whileHover={{ y: -8 }}
                                                      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100"
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
                                                                  {doctor.available && (
                                                                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                                              Available
                                                                        </span>
                                                                  )}
                                                            </div>
                                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                                  <h3 className="text-xl font-bold">{doctor.name}</h3>
                                                                  <Link
                                                                        href={`/services/${doctor.serviceSlug}`}
                                                                        className="text-blue-300 hover:text-blue-200 transition-colors"
                                                                  >
                                                                        {doctor.subSpecialty}
                                                                  </Link>
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
                                                                  <span className="text-blue-600 font-medium">{doctor.experience}</span>
                                                            </div>

                                                            <p className="text-gray-600 text-sm mb-4">{doctor.credentials}</p>

                                                            <Link
                                                                  href={`/hospital/${doctor.hospitalId}`}
                                                                  className="flex items-center gap-2 mb-4 text-sm text-gray-500 hover:text-blue-600 transition-colors group/link"
                                                            >
                                                                  <Building2 className="w-4 h-4" />
                                                                  <span className="group-hover/link:underline">{doctor.hospital}</span>
                                                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                            </Link>

                                                            <div className="flex flex-wrap gap-2 mb-6">
                                                                  {doctor.languages.map((lang, i) => (
                                                                        <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                                                              {lang}
                                                                        </span>
                                                                  ))}
                                                            </div>

                                                            <Link
                                                                  href={`/doctor/${doctor.id}`}
                                                                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
                                                            >
                                                                  View Details
                                                                  <ChevronRight className="w-4 h-4" />
                                                            </Link>
                                                      </div>
                                                </motion.div>
                                          ))}
                                    </div>
                              </div>
                        </section>
                  )}

                  {/* All Doctors */}
                  <section className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                              <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 mb-10"
                              >
                                    <Users className="w-8 h-8 text-blue-600" />
                                    <h2 className="text-3xl font-bold text-gray-800">
                                          All Specialists ({allDoctors.length})
                                    </h2>
                              </motion.div>

                              <div className="grid md:grid-cols-2 gap-6">
                                    {allDoctors.map((doctor, index) => (
                                          <motion.div
                                                key={doctor.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.05 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex gap-6 border border-gray-100"
                                          >
                                                <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0">
                                                      <Image
                                                            src={doctor.image}
                                                            alt={doctor.name}
                                                            fill
                                                            className="object-cover"
                                                      />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                      <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                  <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                                                                  <Link
                                                                        href={`/services/${doctor.serviceSlug}`}
                                                                        className="text-blue-600 text-sm hover:underline"
                                                                  >
                                                                        {doctor.subSpecialty}
                                                                  </Link>
                                                            </div>
                                                            <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded shrink-0">
                                                                  <Star className="w-4 h-4 fill-current" />
                                                                  <span className="font-semibold text-sm">{doctor.rating}</span>
                                                            </div>
                                                      </div>
                                                      <p className="text-gray-500 text-sm mb-3 truncate">{doctor.credentials}</p>
                                                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                                            <span>{doctor.experience}</span>
                                                            <span className="text-gray-300">|</span>
                                                            <Link
                                                                  href={`/hospital/${doctor.hospitalId}`}
                                                                  className="hover:text-blue-600 hover:underline transition-colors"
                                                            >
                                                                  {doctor.hospital}
                                                            </Link>
                                                      </div>
                                                </div>
                                                <div className="flex flex-col justify-center gap-2 shrink-0">
                                                      <Link
                                                            href={`/doctor/${doctor.id}`}
                                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all text-center"
                                                      >
                                                            View Details
                                                      </Link>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA Section */}
                  <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900">
                        <div className="container mx-auto px-4">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center max-w-3xl mx-auto"
                              >
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                          Need Help Finding the Right Specialist?
                                    </h2>
                                    <p className="text-blue-100 text-lg mb-8">
                                          Our patient coordinators can help you choose the best doctor for your specific condition
                                          and connect you with hospitals that match your needs.
                                    </p>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                          <Link
                                                href="/services"
                                                className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2"
                                          >
                                                Browse Treatments
                                                <ArrowRight className="w-5 h-5" />
                                          </Link>
                                          <Link
                                                href="/hospital"
                                                className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                                          >
                                                View Hospitals
                                                <Building2 className="w-5 h-5" />
                                          </Link>
                                    </div>
                              </motion.div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
