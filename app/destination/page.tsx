"use client";

import { Footer, Header } from '@/app/components/common';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
      Building2, ChevronRight, CreditCard, Globe, Hotel, Languages, MapPin,
      Plane, Sun, ThermometerSun, Utensils, Waves
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

// Key attractions by category
const attractions = {
      heritage: [
            {
                  name: 'French Quarter (White Town)',
                  image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
                  description: 'Colonial-era streets with mustard-yellow buildings, bougainvillea-draped walls, and charming cafes.',
                  highlights: ['Walking tours', 'Boutique shopping', 'French restaurants', 'Art galleries'],
                  distance: 'City center',
            },
            {
                  name: 'Basilica of the Sacred Heart',
                  image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
                  description: 'Stunning Gothic church with stained glass windows depicting the life of Jesus.',
                  highlights: ['Gothic architecture', 'Religious art', 'Peaceful gardens'],
                  distance: 'South Boulevard',
            },
      ],
      spiritual: [
            {
                  name: 'Auroville - City of Dawn',
                  image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
                  description: 'UNESCO-recognized experimental township dedicated to human unity. Home to the golden Matrimandir.',
                  highlights: ['Matrimandir meditation', 'Organic farms', 'Sustainable living', 'International community'],
                  distance: '12 km from city',
            },
            {
                  name: 'Sri Aurobindo Ashram',
                  image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
                  description: 'World-famous spiritual center for meditation and integral yoga founded in 1926.',
                  highlights: ['Morning meditation', 'Library', 'Samadhi', 'Guest house'],
                  distance: 'White Town',
            },
      ],
      beaches: [
            {
                  name: 'Promenade Beach',
                  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                  description: '1.5 km stretch along the Bay of Bengal. Perfect for sunrise walks and evening strolls.',
                  highlights: ['Sunrise yoga', 'Gandhi statue', 'War memorial', 'Street food'],
                  distance: 'City center',
            },
            {
                  name: 'Paradise Beach',
                  image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
                  description: 'Pristine golden sand beach accessible only by boat. Serene and uncrowded.',
                  highlights: ['Boat ride', 'Swimming', 'Beach huts', 'Seafood'],
                  distance: '8 km (by boat)',
            },
            {
                  name: 'Serenity Beach',
                  image: 'https://images.unsplash.com/photo-1476673160081-cf065f0d2a86?w=800',
                  description: 'Surfer-friendly beach with waves, beach shacks, and a bohemian vibe.',
                  highlights: ['Surfing lessons', 'Cafes', 'Yoga shalas'],
                  distance: '10 km north',
            },
      ],
};

// Cuisine highlights
const cuisineTypes = [
      { name: 'French', desc: 'Authentic croissants, crêpes, and fine dining in White Town', icon: '🥐' },
      { name: 'Tamil', desc: 'Traditional dosas, filter coffee, and banana leaf meals', icon: '🍛' },
      { name: 'Indo-French Fusion', desc: 'Unique blend found only in Pondicherry', icon: '🍽️' },
      { name: 'Seafood', desc: 'Fresh catch from the Bay of Bengal', icon: '🦐' },
];

// Travel essentials
const travelInfo = [
      { icon: Plane, title: 'Getting Here', items: ['Chennai Airport (150 km, 2.5 hrs)', 'Bengaluru Airport (310 km, 5 hrs)', 'Puducherry Airport (domestic)'] },
      { icon: Languages, title: 'Languages', items: ['Tamil (local)', 'English (widely spoken)', 'French (some areas)', 'Hindi (common)'] },
      { icon: CreditCard, title: 'Currency', items: ['Indian Rupee (INR)', 'Cards widely accepted', 'ATMs available', 'USD/EUR exchange easy'] },
      { icon: ThermometerSun, title: 'Best Time', items: ['October to March (ideal)', 'April-June (hot summer)', 'July-September (monsoon)'] },
];

// Accommodation types
const accommodations = [
      {
            type: 'Heritage Boutiques',
            priceRange: '$80-300/night',
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
            description: 'Restored French colonial villas in White Town',
            features: ['Antique décor', 'Courtyard gardens', 'French Quarter location'],
      },
      {
            type: 'Beach Resorts',
            priceRange: '$60-200/night',
            image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
            description: 'Oceanfront properties along ECR',
            features: ['Sea views', 'Pool access', 'Spa facilities'],
      },
      {
            type: 'Auroville Guesthouses',
            priceRange: '$30-100/night',
            image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
            description: 'Eco-friendly stays in the experimental township',
            features: ['Nature immersion', 'Community dining', 'Sustainable living'],
      },
];

// Quick facts
const quickFacts = [
      { label: 'Population', value: '244,000' },
      { label: 'Area', value: '293 sq km' },
      { label: 'Time Zone', value: 'IST (GMT+5:30)' },
      { label: 'French Rule', value: '1674-1954' },
];

const DestinationPage = () => {
      const heroRef = useRef<HTMLElement>(null);
      const beachesRef = useRef<HTMLElement>(null);
      const isBeachesInView = useInView(beachesRef, { once: true, margin: "-100px" });

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
                                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920"
                                    alt="Pondicherry"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </motion.div>

                        {/* Animated Orbs */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              <motion.div
                                    className="absolute w-96 h-96 rounded-full bg-gradient-radial from-amber-400/20 to-transparent blur-3xl"
                                    style={{ right: '10%', top: '20%' }}
                                    animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
                                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                              />
                              <motion.div
                                    className="absolute w-72 h-72 rounded-full bg-gradient-radial from-orange-400/15 to-transparent blur-3xl"
                                    style={{ left: '20%', bottom: '20%' }}
                                    animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
                                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
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
                                    <motion.div
                                          variants={fadeInUp}
                                          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20"
                                    >
                                          <motion.div
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                          >
                                                <Globe className="w-5 h-5 text-amber-400" />
                                          </motion.div>
                                          <span className="text-white text-sm font-medium">
                                                French Riviera of the East
                                          </span>
                                    </motion.div>

                                    <motion.h1
                                          variants={fadeInUp}
                                          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
                                    >
                                          Discover
                                          <motion.span
                                                className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-[length:200%_auto]"
                                                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                          >
                                                Pondicherry
                                          </motion.span>
                                    </motion.h1>

                                    <motion.p
                                          variants={fadeInUp}
                                          className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-10 max-w-2xl"
                                    >
                                          Where French colonial charm meets Tamil heritage, spiritual communities,
                                          and pristine beaches. The perfect destination for wellness and cultural exploration.
                                    </motion.p>

                                    {/* Quick Facts */}
                                    <motion.div
                                          variants={fadeInUp}
                                          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                                    >
                                          {quickFacts.map((fact, i) => (
                                                <motion.div
                                                      key={i}
                                                      className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center border border-white/10"
                                                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                                                >
                                                      <motion.div
                                                            className="text-3xl font-bold text-white"
                                                            animate={{ scale: [1, 1.05, 1] }}
                                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                                      >
                                                            {fact.value}
                                                      </motion.div>
                                                      <div className="text-white/70 text-sm">{fact.label}</div>
                                                </motion.div>
                                          ))}
                                    </motion.div>

                                    {/* CTA Buttons */}
                                    <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="#explore"
                                                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-amber-900/30 hover:shadow-2xl transition-all inline-flex items-center gap-2"
                                                >
                                                      Explore Places
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
                                                      href="#travel"
                                                      className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all border border-white/30"
                                                >
                                                      Travel Info
                                                </Link>
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

                  {/* French Heritage Section */}
                  <section id="explore" className="py-20 bg-gradient-to-b from-amber-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-12"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.div
                                          className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-5 py-2 rounded-full mb-6"
                                          whileHover={{ scale: 1.05 }}
                                    >
                                          <Building2 className="w-4 h-4" />
                                          <span className="font-semibold">French Heritage</span>
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Colonial Charm & History
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          Explore 280 years of French influence in architecture, cuisine, and culture
                                    </p>
                              </motion.div>

                              <div className="grid lg:grid-cols-2 gap-8">
                                    {attractions.heritage.map((place, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 50, x: i % 2 === 0 ? -30 : 30 }}
                                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.15 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group"
                                          >
                                                <div className="grid md:grid-cols-2">
                                                      <div className="relative h-64 md:h-auto">
                                                            <Image
                                                                  src={place.image}
                                                                  alt={place.name}
                                                                  fill
                                                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                            />
                                                      </div>
                                                      <div className="p-8">
                                                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{place.name}</h3>
                                                            <div className="flex items-center gap-2 text-amber-600 mb-4">
                                                                  <MapPin className="w-4 h-4" />
                                                                  <span className="text-sm font-medium">{place.distance}</span>
                                                            </div>
                                                            <p className="text-gray-600 mb-5">{place.description}</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                  {place.highlights.map((h, j) => (
                                                                        <motion.span
                                                                              key={j}
                                                                              initial={{ opacity: 0, scale: 0.8 }}
                                                                              whileInView={{ opacity: 1, scale: 1 }}
                                                                              viewport={{ once: true }}
                                                                              transition={{ delay: j * 0.05 }}
                                                                              className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm font-medium"
                                                                        >
                                                                              {h}
                                                                        </motion.span>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Spiritual Sites */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-12"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.div
                                          className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-5 py-2 rounded-full mb-6"
                                          whileHover={{ scale: 1.05 }}
                                    >
                                          <Sun className="w-4 h-4" />
                                          <span className="font-semibold">Spiritual Destinations</span>
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Sacred Spaces & Communities
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          World-renowned spiritual centers for meditation and self-discovery
                                    </p>
                              </motion.div>

                              <div className="grid lg:grid-cols-2 gap-8">
                                    {attractions.spiritual.map((place, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.15 }}
                                                whileHover={{ y: -10 }}
                                                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 hover:shadow-xl transition-all"
                                          >
                                                <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                                                      <Image
                                                            src={place.image}
                                                            alt={place.name}
                                                            fill
                                                            className="object-cover"
                                                      />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{place.name}</h3>
                                                <div className="flex items-center gap-2 text-purple-600 mb-4">
                                                      <MapPin className="w-4 h-4" />
                                                      <span className="text-sm font-medium">{place.distance}</span>
                                                </div>
                                                <p className="text-gray-600 mb-5">{place.description}</p>
                                                <div className="flex flex-wrap gap-2 mb-5">
                                                      {place.highlights.map((h, j) => (
                                                            <motion.span
                                                                  key={j}
                                                                  initial={{ opacity: 0 }}
                                                                  whileInView={{ opacity: 1 }}
                                                                  viewport={{ once: true }}
                                                                  transition={{ delay: j * 0.05 }}
                                                                  className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium"
                                                            >
                                                                  {h}
                                                            </motion.span>
                                                      ))}
                                                </div>
                                                {place.name.includes('Auroville') && (
                                                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <Link
                                                                  href="/auroville"
                                                                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                                                            >
                                                                  Explore Auroville
                                                                  <ChevronRight className="w-4 h-4" />
                                                            </Link>
                                                      </motion.div>
                                                )}
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Beaches */}
                  <section ref={beachesRef} className="py-24 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600" />
                        <motion.div
                              className="absolute inset-0"
                              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
                        />

                        {/* Animated waves */}
                        <motion.div
                              className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-white/10 to-transparent"
                              animate={{ y: [0, -10, 0] }}
                              transition={{ duration: 4, repeat: Infinity }}
                        />

                        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-white">
                              <motion.div
                                    className="text-center mb-12"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isBeachesInView ? { opacity: 1, y: 0 } : {}}
                              >
                                    <motion.div
                                          className="inline-flex items-center gap-2 bg-white/10 px-5 py-2 rounded-full mb-6 border border-white/20"
                                          whileHover={{ scale: 1.05 }}
                                    >
                                          <Waves className="w-4 h-4" />
                                          <span className="font-semibold">Coastal Beauty</span>
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                          Pristine Beaches
                                    </h2>
                                    <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
                                          35 km of serene coastline along the Bay of Bengal
                                    </p>
                              </motion.div>

                              <motion.div
                                    className="grid md:grid-cols-3 gap-8"
                                    initial="hidden"
                                    animate={isBeachesInView ? "visible" : "hidden"}
                                    variants={staggerContainer}
                              >
                                    {attractions.beaches.map((beach, i) => (
                                          <motion.div
                                                key={i}
                                                variants={scaleIn}
                                                whileHover={{ y: -10, scale: 1.02 }}
                                                className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all"
                                          >
                                                <div className="relative h-52">
                                                      <Image
                                                            src={beach.image}
                                                            alt={beach.name}
                                                            fill
                                                            className="object-cover"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                </div>
                                                <div className="p-6">
                                                      <h3 className="text-xl font-bold mb-2">{beach.name}</h3>
                                                      <div className="flex items-center gap-2 text-cyan-200 mb-4">
                                                            <MapPin className="w-4 h-4" />
                                                            <span className="text-sm">{beach.distance}</span>
                                                      </div>
                                                      <p className="text-cyan-100 text-sm mb-5">{beach.description}</p>
                                                      <div className="flex flex-wrap gap-2">
                                                            {beach.highlights.map((h, j) => (
                                                                  <span key={j} className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                                        {h}
                                                                  </span>
                                                            ))}
                                                      </div>
                                                </div>
                                          </motion.div>
                                    ))}
                              </motion.div>
                        </div>
                  </section>

                  {/* Cuisine */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    <motion.div
                                          initial={{ opacity: 0, x: -50 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          viewport={{ once: true }}
                                    >
                                          <motion.div
                                                className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-5 py-2 rounded-full mb-6"
                                                whileHover={{ scale: 1.05 }}
                                          >
                                                <Utensils className="w-4 h-4" />
                                                <span className="font-semibold">Culinary Delights</span>
                                          </motion.div>
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                                Unique Indo-French Cuisine
                                          </h2>
                                          <p className="text-xl text-gray-600 mb-10">
                                                Pondicherry&apos;s culinary scene is unlike anywhere else in India -
                                                a delicious fusion of French and Tamil traditions.
                                          </p>

                                          <motion.div
                                                className="grid grid-cols-2 gap-4"
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                                variants={staggerContainer}
                                          >
                                                {cuisineTypes.map((cuisine, i) => (
                                                      <motion.div
                                                            key={i}
                                                            variants={scaleIn}
                                                            whileHover={{ scale: 1.05 }}
                                                            className="bg-orange-50 rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all"
                                                      >
                                                            <div className="text-4xl mb-3">{cuisine.icon}</div>
                                                            <h4 className="font-bold text-gray-800 mb-1">{cuisine.name}</h4>
                                                            <p className="text-gray-600 text-sm">{cuisine.desc}</p>
                                                      </motion.div>
                                                ))}
                                          </motion.div>
                                    </motion.div>

                                    <motion.div
                                          className="relative"
                                          initial={{ opacity: 0, x: 50 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          viewport={{ once: true }}
                                    >
                                          <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                className="relative rounded-3xl overflow-hidden shadow-2xl"
                                          >
                                                <Image
                                                      src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
                                                      alt="Cuisine"
                                                      width={600}
                                                      height={500}
                                                      className="object-cover"
                                                />
                                          </motion.div>
                                    </motion.div>
                              </div>
                        </div>
                  </section>

                  {/* Travel Info */}
                  <section id="travel" className="py-20 bg-gradient-to-b from-gray-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-12"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Travel Essentials
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Everything you need to know for planning your visit
                                    </p>
                              </motion.div>

                              <motion.div
                                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={staggerContainer}
                              >
                                    {travelInfo.map((info, i) => (
                                          <motion.div
                                                key={i}
                                                variants={scaleIn}
                                                whileHover={{ y: -10 }}
                                                className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all"
                                          >
                                                <motion.div
                                                      className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-amber-200"
                                                      whileHover={{ rotate: [0, -10, 10, 0] }}
                                                      transition={{ duration: 0.5 }}
                                                >
                                                      <info.icon className="w-7 h-7 text-white" />
                                                </motion.div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-4">{info.title}</h3>
                                                <ul className="space-y-3">
                                                      {info.items.map((item, j) => (
                                                            <li key={j} className="text-gray-600 text-sm flex items-start gap-2">
                                                                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                                                                  {item}
                                                            </li>
                                                      ))}
                                                </ul>
                                          </motion.div>
                                    ))}
                              </motion.div>
                        </div>
                  </section>

                  {/* Accommodations */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-12"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.div
                                          className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full mb-6"
                                          whileHover={{ scale: 1.05 }}
                                    >
                                          <Hotel className="w-4 h-4" />
                                          <span className="font-semibold">Where to Stay</span>
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Accommodation Options
                                    </h2>
                              </motion.div>

                              <motion.div
                                    className="grid md:grid-cols-3 gap-8"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={staggerContainer}
                              >
                                    {accommodations.map((acc, i) => (
                                          <motion.div
                                                key={i}
                                                variants={scaleIn}
                                                whileHover={{ y: -10 }}
                                                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                                          >
                                                <div className="relative h-52">
                                                      <Image
                                                            src={acc.image}
                                                            alt={acc.type}
                                                            fill
                                                            className="object-cover"
                                                      />
                                                      <motion.div
                                                            className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full font-bold text-green-600 shadow-lg"
                                                            whileHover={{ scale: 1.1 }}
                                                      >
                                                            {acc.priceRange}
                                                      </motion.div>
                                                </div>
                                                <div className="p-6">
                                                      <h3 className="text-xl font-bold text-gray-800 mb-2">{acc.type}</h3>
                                                      <p className="text-gray-600 text-sm mb-5">{acc.description}</p>
                                                      <div className="flex flex-wrap gap-2">
                                                            {acc.features.map((f, j) => (
                                                                  <span key={j} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                                                        {f}
                                                                  </span>
                                                            ))}
                                                      </div>
                                                </div>
                                          </motion.div>
                                    ))}
                              </motion.div>
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
                                          <Globe className="w-16 h-16 mx-auto mb-6 text-amber-400" />
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                          Ready to Experience Pondicherry?
                                    </h2>
                                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                          Combine your wellness journey with an unforgettable exploration of this unique destination.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="/booking"
                                                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-amber-900/30 hover:shadow-2xl transition-all"
                                                >
                                                      Plan My Visit
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

export default DestinationPage;
