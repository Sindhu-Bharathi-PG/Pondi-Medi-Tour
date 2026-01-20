"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
      Building2, ChevronRight, Heart, Leaf, MapPin, Search,
      Sparkles, Star, Users
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Footer, Header } from '../components/common';
import { ayushSpecialties, wellnessCenters, wellnessCenterTypes } from '../data/wellness-centers';

// Animation variants
const fadeInUp = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const scaleIn = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

// Floating leaves animation
const FloatingLeaves = () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
                  <motion.div
                        key={i}
                        className="absolute text-2xl opacity-20"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                              y: [0, -20, 0],
                              x: [0, 10, -10, 0],
                              rotate: [0, 15, -15, 0],
                              opacity: [0.1, 0.25, 0.1],
                        }}
                        transition={{
                              duration: 5 + i * 0.5,
                              delay: i * 0.3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                        }}
                  >
                        🍃
                  </motion.div>
            ))}
      </div>
);

const WellnessCenterPage = () => {
      const [activeType, setActiveType] = useState('All');
      const [activeSpecialty, setActiveSpecialty] = useState('All');
      const [searchQuery, setSearchQuery] = useState('');
      const heroRef = useRef<HTMLElement>(null);
      const centersRef = useRef<HTMLElement>(null);
      const isCentersInView = useInView(centersRef, { once: true, margin: "-100px" });

      // Parallax
      const { scrollY } = useScroll();
      const heroY = useTransform(scrollY, [0, 500], [0, 150]);
      const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

      const filteredCenters = wellnessCenters.filter(center => {
            const matchesType = activeType === 'All' || center.type === activeType;
            const matchesSpecialty = activeSpecialty === 'All' ||
                  center.specialties.some(s => s.toLowerCase().includes(activeSpecialty.toLowerCase()));
            const matchesSearch = searchQuery === '' ||
                  center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  center.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesType && matchesSpecialty && matchesSearch;
      });

      const featuredCenters = filteredCenters.filter(c => c.featured);

      return (
            <div className="min-h-screen bg-amber-50/30">
                  <Header />

                  {/* Hero Section with Parallax */}
                  <section ref={heroRef} className="relative min-h-[80vh] flex items-center pt-24 pb-20 overflow-hidden">
                        <motion.div className="absolute inset-0" style={{ y: heroY }}>
                              <Image
                                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920"
                                    alt="AYUSH Wellness Centers"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-orange-800/85 to-amber-700/70" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </motion.div>

                        {/* Floating Leaves */}
                        <FloatingLeaves />

                        {/* Animated Orbs */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              <motion.div
                                    className="absolute w-96 h-96 rounded-full bg-gradient-radial from-amber-400/20 to-transparent blur-3xl"
                                    style={{ right: '10%', top: '20%' }}
                                    animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
                                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                              />
                        </div>

                        <motion.div
                              className="relative container mx-auto px-6 lg:px-8"
                              style={{ opacity: heroOpacity }}
                        >
                              {/* Breadcrumb */}
                              <nav className="flex items-center text-white/70 mb-8 text-sm">
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <ChevronRight className="w-4 h-4 mx-2" />
                                    <span className="text-white">AYUSH Wellness Centers</span>
                              </nav>

                              <motion.div
                                    className="max-w-4xl"
                                    initial="hidden"
                                    animate="visible"
                                    variants={staggerContainer}
                              >
                                    <motion.div
                                          variants={fadeInUp}
                                          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20"
                                    >
                                          <motion.div
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                          >
                                                <Leaf className="w-5 h-5 text-amber-300" />
                                          </motion.div>
                                          <span className="text-white text-sm font-medium">Heal in India • AYUSH Certified</span>
                                    </motion.div>

                                    <motion.h1
                                          variants={fadeInUp}
                                          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-white"
                                    >
                                          AYUSH Wellness
                                          <motion.span
                                                className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 bg-[length:200%_auto]"
                                                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                          >
                                                Centers
                                          </motion.span>
                                    </motion.h1>

                                    <motion.p
                                          variants={fadeInUp}
                                          className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-10"
                                    >
                                          Discover authentic Ayurveda, Yoga, Siddha, Naturopathy, and Homeopathy centers in Pondicherry.
                                          Government-certified practitioners offering traditional healing therapies.
                                    </motion.p>

                                    {/* Search Bar */}
                                    <motion.div variants={fadeInUp} className="max-w-xl">
                                          <motion.div
                                                className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden"
                                                whileHover={{ scale: 1.02 }}
                                          >
                                                <Search className="w-5 h-5 text-gray-400 ml-5" />
                                                <input
                                                      type="text"
                                                      placeholder="Search centers or therapies..."
                                                      value={searchQuery}
                                                      onChange={(e) => setSearchQuery(e.target.value)}
                                                      className="flex-1 px-4 py-5 text-gray-800 focus:outline-none"
                                                />
                                                <motion.button
                                                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-5 font-semibold hover:from-amber-600 hover:to-orange-600 transition-all"
                                                      whileHover={{ scale: 1.05 }}
                                                      whileTap={{ scale: 0.95 }}
                                                >
                                                      Search
                                                </motion.button>
                                          </motion.div>
                                    </motion.div>
                              </motion.div>
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                              className="absolute bottom-8 left-1/2 -translate-x-1/2"
                              animate={{ y: [0, 10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                        >
                              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                                    <motion.div
                                          className="w-1.5 h-3 bg-white/60 rounded-full"
                                          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                    />
                              </div>
                        </motion.div>
                  </section>

                  {/* Stats Bar */}
                  <section className="bg-white py-10 shadow-lg relative z-10 border-b border-gray-100">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={staggerContainer}
                              >
                                    {[
                                          { value: '50+', label: 'Wellness Centers', icon: Building2 },
                                          { value: '200+', label: 'AYUSH Practitioners', icon: Users },
                                          { value: '6', label: 'AYUSH Modalities', icon: Leaf },
                                          { value: '4.7', label: 'Average Rating', icon: Star },
                                    ].map((stat, index) => (
                                          <motion.div
                                                key={index}
                                                variants={scaleIn}
                                                whileHover={{ scale: 1.05, y: -5 }}
                                                className="text-center cursor-pointer"
                                          >
                                                <motion.div
                                                      className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-200"
                                                      whileHover={{ rotate: [0, -10, 10, 0] }}
                                                      transition={{ duration: 0.5 }}
                                                >
                                                      <stat.icon className="w-7 h-7 text-white" />
                                                </motion.div>
                                                <motion.div
                                                      className="text-3xl font-bold text-gray-800"
                                                      animate={{ scale: [1, 1.05, 1] }}
                                                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                                >
                                                      {stat.value}
                                                </motion.div>
                                                <div className="text-sm text-gray-500">{stat.label}</div>
                                          </motion.div>
                                    ))}
                              </motion.div>
                        </div>
                  </section>

                  {/* Filters */}
                  <section className="py-8 bg-white border-b border-gray-100">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="space-y-5"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    {/* Type Filter */}
                                    <div>
                                          <span className="text-sm font-semibold text-gray-700 mb-3 block">Center Type</span>
                                          <div className="flex flex-wrap gap-2">
                                                {wellnessCenterTypes.map((type) => (
                                                      <motion.button
                                                            key={type}
                                                            onClick={() => setActiveType(type)}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeType === type
                                                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200'
                                                                        : 'bg-gray-100 text-gray-600 hover:bg-amber-100'
                                                                  }`}
                                                      >
                                                            {type}
                                                      </motion.button>
                                                ))}
                                          </div>
                                    </div>

                                    {/* Specialty Filter */}
                                    <div>
                                          <span className="text-sm font-semibold text-gray-700 mb-3 block">AYUSH Specialty</span>
                                          <div className="flex flex-wrap gap-2">
                                                {ayushSpecialties.map((specialty) => (
                                                      <motion.button
                                                            key={specialty}
                                                            onClick={() => setActiveSpecialty(specialty)}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeSpecialty === specialty
                                                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200'
                                                                        : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                                                                  }`}
                                                      >
                                                            {specialty}
                                                      </motion.button>
                                                ))}
                                          </div>
                                    </div>

                                    <motion.div
                                          className="text-gray-500 pt-2"
                                          animate={{ opacity: [0.7, 1, 0.7] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                    >
                                          Showing <span className="font-bold text-amber-600">{filteredCenters.length}</span> wellness centers
                                    </motion.div>
                              </motion.div>
                        </div>
                  </section>

                  {/* Featured Centers */}
                  {featuredCenters.length > 0 && (
                        <section className="py-16 bg-gradient-to-b from-amber-50/50 to-white">
                              <div className="container mx-auto px-6 lg:px-8">
                                    <motion.h2
                                          className="text-3xl font-bold text-gray-800 mb-10 flex items-center gap-3"
                                          initial={{ opacity: 0, x: -30 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          viewport={{ once: true }}
                                    >
                                          <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                          >
                                                <Sparkles className="w-8 h-8 text-amber-500" />
                                          </motion.div>
                                          Featured Wellness Centers
                                    </motion.h2>

                                    <div className="grid lg:grid-cols-2 gap-8">
                                          {featuredCenters.map((center, index) => (
                                                <motion.div
                                                      key={center.id}
                                                      initial={{ opacity: 0, y: 50 }}
                                                      whileInView={{ opacity: 1, y: 0 }}
                                                      viewport={{ once: true }}
                                                      transition={{ delay: index * 0.15 }}
                                                      whileHover={{ y: -10 }}
                                                >
                                                      <Link href={`/wellness-center/${center.id}`} className="block">
                                                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all border border-gray-100">
                                                                  <div className="flex flex-col md:flex-row">
                                                                        <div className="relative md:w-2/5 h-64 md:h-auto">
                                                                              <Image
                                                                                    src={center.image}
                                                                                    alt={center.name}
                                                                                    fill
                                                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                                              />
                                                                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                                              <div className="absolute top-4 left-4 flex gap-2">
                                                                                    {center.accreditation.slice(0, 2).map((acc, i) => (
                                                                                          <motion.span
                                                                                                key={i}
                                                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                                                animate={{ opacity: 1, scale: 1 }}
                                                                                                transition={{ delay: i * 0.1 }}
                                                                                                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                                                                                          >
                                                                                                {acc}
                                                                                          </motion.span>
                                                                                    ))}
                                                                              </div>
                                                                              <div className="absolute bottom-4 left-4">
                                                                                    <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium">
                                                                                          {center.tagline}
                                                                                    </span>
                                                                              </div>
                                                                        </div>
                                                                        <div className="flex-1 p-6 md:p-8">
                                                                              <div className="flex items-start justify-between mb-3">
                                                                                    <div>
                                                                                          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">{center.name}</h3>
                                                                                          <p className="text-gray-500 text-sm">{center.fullName}</p>
                                                                                    </div>
                                                                                    <motion.div
                                                                                          className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full"
                                                                                          whileHover={{ scale: 1.1 }}
                                                                                    >
                                                                                          <Star className="w-4 h-4 fill-current" />
                                                                                          <span className="font-bold">{center.rating}</span>
                                                                                    </motion.div>
                                                                              </div>

                                                                              <p className="text-gray-600 mb-5 line-clamp-2">{center.description}</p>

                                                                              <div className="flex flex-wrap gap-2 mb-5">
                                                                                    {center.specialties.slice(0, 4).map((spec, i) => (
                                                                                          <motion.span
                                                                                                key={i}
                                                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                                                whileInView={{ opacity: 1, scale: 1 }}
                                                                                                viewport={{ once: true }}
                                                                                                transition={{ delay: i * 0.05 }}
                                                                                                className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium border border-amber-100"
                                                                                          >
                                                                                                {spec}
                                                                                          </motion.span>
                                                                                    ))}
                                                                                    {center.specialties.length > 4 && (
                                                                                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                                                                                +{center.specialties.length - 4} more
                                                                                          </span>
                                                                                    )}
                                                                              </div>

                                                                              <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                                                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                                                          <span className="flex items-center gap-1.5">
                                                                                                <MapPin className="w-4 h-4" />
                                                                                                {center.location}
                                                                                          </span>
                                                                                          <span className="flex items-center gap-1.5">
                                                                                                <Building2 className="w-4 h-4" />
                                                                                                {center.type}
                                                                                          </span>
                                                                                    </div>
                                                                                    <motion.span
                                                                                          className="flex items-center gap-1 text-amber-600 font-semibold"
                                                                                          whileHover={{ x: 5 }}
                                                                                    >
                                                                                          View Details
                                                                                          <ChevronRight className="w-5 h-5" />
                                                                                    </motion.span>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </Link>
                                                </motion.div>
                                          ))}
                                    </div>
                              </div>
                        </section>
                  )}

                  {/* All Centers Grid */}
                  <section ref={centersRef} className="py-16 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.h2
                                    className="text-3xl font-bold text-gray-800 mb-10 flex items-center gap-3"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isCentersInView ? { opacity: 1, x: 0 } : {}}
                              >
                                    <Leaf className="w-8 h-8 text-green-600" />
                                    All Wellness Centers
                              </motion.h2>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredCenters.map((center, index) => (
                                          <motion.div
                                                key={center.id}
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={isCentersInView ? { opacity: 1, y: 0 } : {}}
                                                transition={{ delay: (index % 6) * 0.1 }}
                                                whileHover={{ y: -10 }}
                                          >
                                                <Link href={`/wellness-center/${center.id}`} className="block h-full">
                                                      <div className="bg-white rounded-3xl shadow-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all h-full flex flex-col border border-gray-100">
                                                            <div className="relative h-56">
                                                                  <Image
                                                                        src={center.image}
                                                                        alt={center.name}
                                                                        fill
                                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                                  />
                                                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                                  <div className="absolute top-4 left-4">
                                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${center.type === 'Government'
                                                                                    ? 'bg-blue-500 text-white'
                                                                                    : center.type === 'Ashram'
                                                                                          ? 'bg-purple-500 text-white'
                                                                                          : center.type === 'Community'
                                                                                                ? 'bg-green-500 text-white'
                                                                                                : 'bg-amber-500 text-white'
                                                                              }`}>
                                                                              {center.type}
                                                                        </span>
                                                                  </div>
                                                                  <div className="absolute bottom-4 left-4 right-4">
                                                                        <h3 className="text-xl font-bold text-white mb-1">{center.name}</h3>
                                                                        <p className="text-white/80 text-sm">{center.tagline}</p>
                                                                  </div>
                                                            </div>
                                                            <div className="p-6 flex-1 flex flex-col">
                                                                  <div className="flex items-center justify-between mb-4">
                                                                        <motion.div
                                                                              className="flex items-center gap-1.5 text-amber-500"
                                                                              whileHover={{ scale: 1.1 }}
                                                                        >
                                                                              <Star className="w-5 h-5 fill-current" />
                                                                              <span className="font-bold text-gray-800">{center.rating}</span>
                                                                              <span className="text-gray-400 text-sm">({center.reviewsCount})</span>
                                                                        </motion.div>
                                                                        <span className="text-gray-400 text-sm">Est. {center.established}</span>
                                                                  </div>

                                                                  <div className="flex flex-wrap gap-2 mb-5">
                                                                        {center.specialties.slice(0, 3).map((spec, i) => (
                                                                              <span key={i} className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                                                                    {spec}
                                                                              </span>
                                                                        ))}
                                                                  </div>

                                                                  <div className="mt-auto flex items-center justify-between">
                                                                        <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                                                                              <MapPin className="w-4 h-4" />
                                                                              {center.location.split(',')[0]}
                                                                        </span>
                                                                        <motion.span
                                                                              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-lg shadow-amber-200"
                                                                              whileHover={{ scale: 1.05 }}
                                                                              whileTap={{ scale: 0.95 }}
                                                                        >
                                                                              View Details
                                                                        </motion.span>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </Link>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA Section */}
                  <section className="py-24 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500" />
                        <motion.div
                              className="absolute inset-0"
                              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
                        />

                        {/* Animated orbs */}
                        <motion.div
                              className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 10, repeat: Infinity }}
                        />

                        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.div
                                          animate={{ scale: [1, 1.1, 1] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                    >
                                          <Heart className="w-16 h-16 mx-auto mb-6 text-amber-200" />
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                          Begin Your Healing Journey
                                    </h2>
                                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                                          Our wellness coordinators can recommend the best AYUSH center based on your health goals and preferences.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="/booking"
                                                      className="bg-white text-amber-600 px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                                                >
                                                      Get Free Consultation
                                                </Link>
                                          </motion.div>
                                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="/ayush"
                                                      className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/30"
                                                >
                                                      Learn About AYUSH
                                                </Link>
                                          </motion.div>
                                    </div>
                              </motion.div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default WellnessCenterPage;
