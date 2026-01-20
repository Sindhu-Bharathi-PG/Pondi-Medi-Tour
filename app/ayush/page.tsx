"use client";

import { Footer, Header } from '@/app/components/common';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
      Award, BookOpen, Building2, CheckCircle, ChevronRight, Clock,
      Droplets, FileCheck, Flame, GraduationCap, Heart, Leaf,
      MapPin, Shield, Sun, Wind
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

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

// AYUSH Systems Data
const ayushSystems = [
      {
            id: 'ayurveda', letter: 'A', name: 'Ayurveda', meaning: 'Science of Life',
            origin: '5,000+ years • Vedic India', icon: Leaf,
            color: 'from-green-600 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-700',
            principles: ['Tridosha Theory (Vata, Pitta, Kapha)', 'Prakriti Assessment', 'Panchakarma Detox'],
            recognition: 'AYUSH Ministry recognized, 400+ colleges', uniqueToIndia: true,
      },
      {
            id: 'yoga', letter: 'Y', name: 'Yoga & Naturopathy', meaning: 'Union of Body, Mind, Spirit',
            origin: 'Ancient • Patanjali Yoga Sutras', icon: Sun,
            color: 'from-orange-500 to-amber-500', bgColor: 'bg-orange-50', textColor: 'text-orange-700',
            principles: ['Ashtanga (8 Limbs)', 'Pranayama Breathing', 'Dhyana Meditation'],
            recognition: 'International Day of Yoga (June 21)', uniqueToIndia: true,
      },
      {
            id: 'unani', letter: 'U', name: 'Unani Medicine', meaning: 'Greco-Arabic Healing',
            origin: 'Greek origins • Islamic development', icon: Droplets,
            color: 'from-blue-600 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-700',
            principles: ['Four Humors (Akhlat)', 'Mizaj (Temperament)', 'Ilaj bil Tadbeer'],
            recognition: 'Central Council for Research in Unani Medicine', uniqueToIndia: false,
      },
      {
            id: 'siddha', letter: 'S', name: 'Siddha Medicine', meaning: 'Perfected Healing',
            origin: '10,000+ years • Tamil Nadu', icon: Flame,
            color: 'from-red-600 to-orange-500', bgColor: 'bg-red-50', textColor: 'text-red-700',
            principles: ['96 Tattvas (Elements)', 'Varmam Therapy', 'Kayakalpa (Rejuvenation)'],
            recognition: 'CCRS - Pondicherry is Siddha heartland', uniqueToIndia: true,
      },
      {
            id: 'homeopathy', letter: 'H', name: 'Homeopathy', meaning: 'Like Cures Like',
            origin: '18th Century • Germany', icon: Heart,
            color: 'from-purple-600 to-pink-500', bgColor: 'bg-purple-50', textColor: 'text-purple-700',
            principles: ['Law of Similars', 'Minimum Dose', 'Individualized Treatment'],
            recognition: 'Central Council for Research in Homoeopathy', uniqueToIndia: false,
      },
];

// Government certifications
const certifications = [
      { name: 'AYUSH Ministry', desc: 'Official Government of India recognition', icon: Shield },
      { name: 'NABH Accredited', desc: 'National quality standards', icon: Award },
      { name: 'ISO Certified', desc: 'International quality management', icon: FileCheck },
      { name: 'State Licensed', desc: 'Puducherry Health Dept. approved', icon: Building2 },
];

// Why Pondicherry for AYUSH
const pondicherryAdvantages = [
      { title: 'Siddha Heartland', desc: 'Authentic Tamil Siddha medicine tradition native to this region', icon: MapPin },
      { title: 'Government Institutions', desc: 'Central Research Institute for Siddha (CRIS) located here', icon: Building2 },
      { title: 'Trained Practitioners', desc: '200+ licensed AYUSH practitioners with verified credentials', icon: GraduationCap },
      { title: 'Healing Environment', desc: 'Coastal climate ideal for recovery and rejuvenation', icon: Wind },
];

// Quality standards
const qualityStandards = [
      { metric: '100%', label: 'Licensed Practitioners', desc: 'Government-verified' },
      { metric: 'NABH', label: 'Accredited Centers', desc: 'Quality standards' },
      { metric: 'GMP', label: 'Medicine Standards', desc: 'Manufacturing' },
      { metric: '24/7', label: 'Medical Support', desc: 'Emergency care' },
];

// Floating leaf animation
const FloatingLeaves = () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
                  <motion.div
                        key={i}
                        className="absolute text-3xl opacity-20"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                              y: [0, -30, 0],
                              x: [0, 15, -15, 0],
                              rotate: [0, 20, -20, 0],
                              opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                              duration: 6 + i * 0.5,
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

const AyushPage = () => {
      const heroRef = useRef<HTMLElement>(null);
      const systemsRef = useRef<HTMLElement>(null);
      const qualityRef = useRef<HTMLElement>(null);
      const isSystemsInView = useInView(systemsRef, { once: true, margin: "-100px" });
      const isQualityInView = useInView(qualityRef, { once: true, margin: "-100px" });

      // Parallax
      const { scrollY } = useScroll();
      const heroY = useTransform(scrollY, [0, 500], [0, 150]);
      const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero Section with Parallax */}
                  <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
                        <motion.div className="absolute inset-0" style={{ y: heroY }}>
                              <Image
                                    src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920"
                                    alt="Traditional AYUSH Healing"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/80 to-emerald-800/60" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </motion.div>

                        {/* Floating Leaves */}
                        <FloatingLeaves />

                        {/* Animated Orbs */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              <motion.div
                                    className="absolute w-96 h-96 rounded-full bg-gradient-radial from-green-400/20 to-transparent blur-3xl"
                                    style={{ right: '10%', top: '20%' }}
                                    animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
                                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                              />
                        </div>

                        <motion.div
                              className="relative container mx-auto px-6 lg:px-8"
                              style={{ opacity: heroOpacity }}
                        >
                              <motion.div
                                    className="max-w-4xl"
                                    initial="hidden"
                                    animate="visible"
                                    variants={staggerContainer}
                              >
                                    {/* Official Badge */}
                                    <motion.div
                                          variants={fadeInUp}
                                          className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20"
                                    >
                                          <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                          >
                                                <Shield className="w-5 h-5 text-amber-400" />
                                          </motion.div>
                                          <span className="text-white text-sm font-medium tracking-wide">
                                                Government of India • Ministry of AYUSH Recognized
                                          </span>
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h1
                                          variants={fadeInUp}
                                          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
                                    >
                                          Traditional
                                          <motion.span
                                                className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-green-300 to-amber-300 bg-[length:200%_auto]"
                                                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                          >
                                                AYUSH Healing
                                          </motion.span>
                                    </motion.h1>

                                    <motion.p
                                          variants={fadeInUp}
                                          className="text-xl md:text-2xl text-green-100 leading-relaxed mb-10 max-w-3xl"
                                    >
                                          Experience India&apos;s officially recognized traditional medicine systems.
                                          Authentic therapies delivered by licensed practitioners in certified centers.
                                    </motion.p>

                                    {/* AYUSH Letters Visual */}
                                    <motion.div
                                          variants={fadeInUp}
                                          className="flex gap-3 mb-10"
                                    >
                                          {[
                                                { letter: 'A', color: '#16a34a' },
                                                { letter: 'Y', color: '#f97316' },
                                                { letter: 'U', color: '#0284c7' },
                                                { letter: 'S', color: '#dc2626' },
                                                { letter: 'H', color: '#9333ea' }
                                          ].map((item, i) => (
                                                <motion.div
                                                      key={item.letter}
                                                      initial={{ opacity: 0, scale: 0 }}
                                                      animate={{ opacity: 1, scale: 1 }}
                                                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                                                      whileHover={{ scale: 1.2, rotate: 10 }}
                                                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg cursor-pointer"
                                                      style={{ background: item.color }}
                                                >
                                                      {item.letter}
                                                </motion.div>
                                          ))}
                                    </motion.div>

                                    {/* CTA Buttons */}
                                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="/booking"
                                                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-amber-900/30 hover:shadow-2xl transition-all flex items-center gap-2"
                                                >
                                                      Find Certified Practitioner
                                                      <motion.span
                                                            animate={{ x: [0, 5, 0] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                      >
                                                            <ChevronRight className="w-5 h-5" />
                                                      </motion.span>
                                                </Link>
                                          </motion.div>
                                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="#systems"
                                                      className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all border border-white/30 flex items-center justify-center"
                                                >
                                                      Learn About AYUSH
                                                </Link>
                                          </motion.div>
                                    </motion.div>
                              </motion.div>
                        </motion.div>
                  </section>

                  {/* Scroll Indicator - Separate from hero content for proper positioning */}
                  <motion.div
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                        initial={{ opacity: 1 }}
                        animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ display: 'none' }}
                  >
                        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                              <motion.div
                                    className="w-1.5 h-3 bg-white/60 rounded-full"
                                    animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                              />
                        </div>
                  </motion.div>

                  {/* Heal in India Banner */}
                  <section className="py-12 bg-white border-b border-gray-100">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.01 }}
                              >
                                    <div className="flex items-center gap-6">
                                          <motion.div
                                                className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-amber-500"
                                                animate={{ rotate: [0, 5, -5, 0] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                          >
                                                <Sun className="w-10 h-10 text-amber-600" />
                                          </motion.div>
                                          <div>
                                                <div className="text-amber-600 font-bold tracking-wider text-sm mb-1 uppercase">National Initiative</div>
                                                <h3 className="text-3xl font-bold text-gray-900">Heal in India</h3>
                                                <p className="text-gray-600 max-w-md">
                                                      Official partner of the Government of India&apos;s initiative to promote holistic wellness tourism.
                                                </p>
                                          </div>
                                    </div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Link href="/visa" className="bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-amber-200 hover:shadow-xl transition-all">
                                                AYUSH Visa Details
                                          </Link>
                                    </motion.div>
                              </motion.div>
                        </div>
                  </section>

                  {/* What is AYUSH */}
                  <section className="py-20 bg-gradient-to-b from-green-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="max-w-4xl mx-auto"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <div className="text-center mb-10">
                                          <motion.div
                                                className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full mb-6"
                                                whileHover={{ scale: 1.05 }}
                                          >
                                                <BookOpen className="w-4 h-4" />
                                                <span className="font-semibold">Official Definition</span>
                                          </motion.div>
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                                                What is AYUSH?
                                          </h2>
                                    </div>

                                    <motion.div
                                          className="bg-white rounded-3xl shadow-xl p-10 md:p-12 border-l-4 border-green-500"
                                          whileHover={{ scale: 1.01 }}
                                    >
                                          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                                                <strong className="text-green-700">AYUSH</strong> is an acronym for India&apos;s traditional
                                                and alternative medicine systems, officially recognized by the
                                                <strong className="text-green-700"> Ministry of AYUSH, Government of India</strong>.
                                          </p>
                                          <div className="grid md:grid-cols-2 gap-6">
                                                {[
                                                      { title: 'Legally Recognized', desc: 'Practitioners are licensed under Indian Medical Acts' },
                                                      { title: 'Quality Controlled', desc: 'Medicines meet pharmacopoeial standards' },
                                                      { title: 'Research Backed', desc: 'Central Research Councils for each system' },
                                                      { title: 'Globally Exported', desc: '$500M+ annual exports of AYUSH products' },
                                                ].map((item, i) => (
                                                      <motion.div
                                                            key={i}
                                                            className="flex items-start gap-4"
                                                            initial={{ opacity: 0, x: -20 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: i * 0.1 }}
                                                      >
                                                            <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                                                            <div>
                                                                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                                                  <p className="text-gray-600 text-sm">{item.desc}</p>
                                                            </div>
                                                      </motion.div>
                                                ))}
                                          </div>
                                    </motion.div>
                              </motion.div>
                        </div>
                  </section>

                  {/* The Six AYUSH Systems */}
                  <section ref={systemsRef} id="systems" className="py-20 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-12"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isSystemsInView ? { opacity: 1, y: 0 } : {}}
                              >
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          The Five Healing Systems
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          Each system has unique principles, methodologies, and therapeutic applications
                                    </p>
                              </motion.div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {ayushSystems.map((system, index) => (
                                          <motion.div
                                                key={system.id}
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={isSystemsInView ? { opacity: 1, y: 0 } : {}}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ y: -10 }}
                                                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group"
                                          >
                                                {/* Header */}
                                                <div className={`p-6 bg-gradient-to-r ${system.color} text-white relative overflow-hidden`}>
                                                      {/* Animated background */}
                                                      <motion.div
                                                            className="absolute inset-0 bg-white/10"
                                                            initial={{ x: '-100%' }}
                                                            whileHover={{ x: '100%' }}
                                                            transition={{ duration: 0.6 }}
                                                      />
                                                      <div className="relative">
                                                            <div className="flex items-center justify-between mb-4">
                                                                  <motion.div
                                                                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center"
                                                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                                                  >
                                                                        <span className="text-4xl font-bold">{system.letter}</span>
                                                                  </motion.div>
                                                                  {system.uniqueToIndia && (
                                                                        <span className="bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium">
                                                                              🇮🇳 Unique to India
                                                                        </span>
                                                                  )}
                                                            </div>
                                                            <h3 className="text-2xl font-bold mb-1">{system.name}</h3>
                                                            <p className="text-white/80">{system.meaning}</p>
                                                      </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{system.origin}</span>
                                                      </div>

                                                      <h4 className="font-semibold text-gray-800 mb-3">Core Principles:</h4>
                                                      <ul className="space-y-2 mb-5">
                                                            {system.principles.map((principle, i) => (
                                                                  <motion.li
                                                                        key={i}
                                                                        className="flex items-start gap-2 text-sm text-gray-600"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={isSystemsInView ? { opacity: 1 } : {}}
                                                                        transition={{ delay: index * 0.1 + i * 0.05 }}
                                                                  >
                                                                        <div className={`w-2 h-2 rounded-full mt-1.5 bg-gradient-to-r ${system.color}`} />
                                                                        {principle}
                                                                  </motion.li>
                                                            ))}
                                                      </ul>

                                                      <div className={`${system.bgColor} rounded-xl p-4`}>
                                                            <p className={`text-sm ${system.textColor}`}>
                                                                  <strong>Recognition:</strong> {system.recognition}
                                                            </p>
                                                      </div>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Quality & Certifications */}
                  <section ref={qualityRef} className="py-24 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600" />
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

                        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-white">
                              <motion.div
                                    className="text-center mb-12"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isQualityInView ? { opacity: 1, y: 0 } : {}}
                              >
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Quality Assurance Standards</h2>
                                    <p className="text-xl text-green-100 max-w-2xl mx-auto">
                                          All our partner centers meet strict government quality requirements
                                    </p>
                              </motion.div>

                              <motion.div
                                    className="grid md:grid-cols-4 gap-6 mb-12"
                                    initial="hidden"
                                    animate={isQualityInView ? "visible" : "hidden"}
                                    variants={staggerContainer}
                              >
                                    {qualityStandards.map((item, i) => (
                                          <motion.div
                                                key={i}
                                                variants={scaleIn}
                                                whileHover={{ scale: 1.05 }}
                                                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20"
                                          >
                                                <motion.div
                                                      className="text-5xl font-bold mb-2"
                                                      animate={{ scale: [1, 1.05, 1] }}
                                                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                                >
                                                      {item.metric}
                                                </motion.div>
                                                <div className="font-semibold text-lg mb-1">{item.label}</div>
                                                <div className="text-green-200 text-sm">{item.desc}</div>
                                          </motion.div>
                                    ))}
                              </motion.div>

                              <div className="grid md:grid-cols-4 gap-6">
                                    {certifications.map((cert, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={isQualityInView ? { opacity: 1, y: 0 } : {}}
                                                transition={{ delay: i * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="bg-white/5 backdrop-blur-md rounded-xl p-6 flex items-start gap-4 border border-white/10"
                                          >
                                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                                      <cert.icon className="w-6 h-6 text-amber-300" />
                                                </div>
                                                <div>
                                                      <h4 className="font-semibold mb-1">{cert.name}</h4>
                                                      <p className="text-green-200 text-sm">{cert.desc}</p>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Why Pondicherry */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    <motion.div
                                          initial={{ opacity: 0, x: -50 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          viewport={{ once: true }}
                                    >
                                          <motion.div
                                                className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-5 py-2 rounded-full mb-6"
                                                whileHover={{ scale: 1.05 }}
                                          >
                                                <MapPin className="w-4 h-4" />
                                                <span className="font-semibold">Regional Excellence</span>
                                          </motion.div>
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                                Why Pondicherry for
                                                <span className="text-green-600"> AYUSH?</span>
                                          </h2>
                                          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                                                Pondicherry is uniquely positioned as a hub for authentic AYUSH therapies,
                                                particularly Siddha medicine which originated in the Tamil region.
                                          </p>

                                          <div className="space-y-5">
                                                {pondicherryAdvantages.map((adv, i) => (
                                                      <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: -30 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: i * 0.1 }}
                                                            whileHover={{ x: 10 }}
                                                            className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all"
                                                      >
                                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                                                                  <adv.icon className="w-6 h-6 text-green-600" />
                                                            </div>
                                                            <div>
                                                                  <h4 className="font-semibold text-gray-800 mb-1">{adv.title}</h4>
                                                                  <p className="text-gray-600 text-sm">{adv.desc}</p>
                                                            </div>
                                                      </motion.div>
                                                ))}
                                          </div>
                                    </motion.div>

                                    <motion.div
                                          className="relative"
                                          initial={{ opacity: 0, x: 50 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          viewport={{ once: true }}
                                    >
                                          <div className="grid grid-cols-2 gap-4">
                                                {[
                                                      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
                                                      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
                                                      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400',
                                                      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400',
                                                ].map((src, i) => (
                                                      <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: i * 0.1 }}
                                                            whileHover={{ scale: 1.05 }}
                                                            className={`relative h-64 rounded-2xl overflow-hidden shadow-xl ${i % 2 === 1 ? 'mt-8' : ''}`}
                                                      >
                                                            <Image
                                                                  src={src}
                                                                  alt="AYUSH therapy"
                                                                  fill
                                                                  className="object-cover"
                                                            />
                                                      </motion.div>
                                                ))}
                                          </div>
                                    </motion.div>
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
                        <motion.div
                              className="absolute inset-0"
                              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
                        />

                        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.div
                                          animate={{ rotate: [0, 360] }}
                                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                    >
                                          <Leaf className="w-16 h-16 mx-auto mb-6 text-green-400" />
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                          Begin Your AYUSH Healing Journey
                                    </h2>
                                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                          Connect with certified practitioners and discover the right traditional therapy for your needs
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="/booking"
                                                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-green-900/30 hover:shadow-2xl transition-all inline-flex items-center gap-2"
                                                >
                                                      Find Certified Practitioner
                                                      <ChevronRight className="w-5 h-5" />
                                                </Link>
                                          </motion.div>
                                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="/wellness"
                                                      className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
                                                >
                                                      View Wellness Packages
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

export default AyushPage;
