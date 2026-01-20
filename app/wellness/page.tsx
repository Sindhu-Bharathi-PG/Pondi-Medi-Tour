"use client";

import { Footer, Header } from '@/app/components/common';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
      Camera,
      Compass,
      Heart,
      Sparkles,
      Sun,
      TreePine,
      Waves
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
      visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

// Tourist attractions data
const attractions = [
      {
            title: "French Quarter Magic",
            tagline: "Where Europe Meets India",
            image: "/images/french-quarter.png",
            color: "from-amber-500 to-orange-600",
            icon: Camera,
      },
      {
            title: "Golden Matrimandir",
            tagline: "Silence Speaks Louder",
            image: "/images/matrimandir.png",
            color: "from-yellow-400 to-amber-500",
            icon: Sun,
      },
      {
            title: "Pristine Beaches",
            tagline: "Where Waves Kiss the Shore",
            image: "/images/paradise-beach.png",
            color: "from-cyan-500 to-blue-600",
            icon: Waves,
      },
      {
            title: "Auroville Serenity",
            tagline: "City of Tomorrow, Today",
            image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
            color: "from-green-500 to-emerald-600",
            icon: TreePine,
      },
];

// Experience highlights
const experiences = [
      {
            title: "Sunrise at Promenade",
            description: "Watch the golden sun rise over the Bay of Bengal",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            tagline: "Every morning is a masterpiece",
      },
      {
            title: "Café Culture",
            description: "Sip authentic French coffee in colonial cafés",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
            tagline: "Taste the French connection",
      },
      {
            title: "Heritage Walks",
            description: "Wander through colorful streets frozen in time",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
            tagline: "History whispers at every corner",
      },
      {
            title: "Spiritual Awakening",
            description: "Find peace in world-renowned ashrams",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
            tagline: "Discover your inner calm",
      },
];

// Photo gallery
const gallery = [
      { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600", alt: "French architecture" },
      { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600", alt: "Paradise beach" },
      { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600", alt: "Wellness moment" },
      { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600", alt: "Nature retreat" },
      { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600", alt: "Spa experience" },
      { src: "https://images.unsplash.com/photo-1476673160081-cf065f0d2a86?w=600", alt: "Ocean view" },
];

// Catchy quotes
const quotes = [
      { text: "Find Your Paradise", author: "Pondicherry awaits" },
      { text: "Where Time Slows Down", author: "And life speeds up" },
      { text: "Colors of Serenity", author: "Painted by nature" },
];

// Floating elements
const FloatingElements = () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
                  <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              background: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'][i % 5],
                        }}
                        animate={{
                              y: [0, -30, 0],
                              x: [0, 15, -15, 0],
                              opacity: [0.3, 0.7, 0.3],
                              scale: [1, 1.5, 1],
                        }}
                        transition={{
                              duration: 4 + i * 0.5,
                              delay: i * 0.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                        }}
                  />
            ))}
      </div>
);

const WellnessPage = () => {
      const heroRef = useRef<HTMLElement>(null);
      const { scrollY } = useScroll();
      const heroY = useTransform(scrollY, [0, 500], [0, 150]);
      const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero Section - Vibrant & Colorful */}
                  <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
                        <motion.div className="absolute inset-0" style={{ y: heroY }}>
                              <Image
                                    src="/images/hero-wellness.png"
                                    alt="Pondicherry Paradise"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-800/60 to-orange-700/40" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </motion.div>

                        <FloatingElements />

                        {/* Animated rainbow gradient */}
                        <motion.div
                              className="absolute inset-0 opacity-30"
                              style={{
                                    background: 'linear-gradient(45deg, #ff006650, #8b5cf650, #06b6d450, #10b98150, #f59e0b50)',
                                    backgroundSize: '400% 400%',
                              }}
                              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        />

                        <motion.div
                              className="relative container mx-auto px-6 lg:px-8 text-center"
                              style={{ opacity: heroOpacity }}
                        >
                              <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={staggerContainer}
                                    className="max-w-5xl mx-auto"
                              >
                                    <motion.div
                                          variants={fadeInUp}
                                          className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/30"
                                    >
                                          <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                          >
                                                <Sparkles className="w-6 h-6 text-yellow-300" />
                                          </motion.div>
                                          <span className="text-white text-lg font-medium">
                                                Discover the Magic of Pondicherry
                                          </span>
                                    </motion.div>

                                    <motion.h1
                                          variants={fadeInUp}
                                          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8"
                                    >
                                          <motion.span
                                                className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200"
                                                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                                style={{ backgroundSize: '200% auto' }}
                                          >
                                                ESCAPE
                                          </motion.span>
                                          <span className="block text-white text-5xl md:text-6xl mt-2">
                                                to Paradise
                                          </span>
                                    </motion.h1>

                                    <motion.p
                                          variants={fadeInUp}
                                          className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
                                    >
                                          Where French elegance dances with Tamil soul,
                                          <br />
                                          <span className="text-yellow-200 font-semibold">and every moment becomes a memory.</span>
                                    </motion.p>

                                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="#explore"
                                                      className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-pink-500/50 transition-all inline-flex items-center gap-3"
                                                >
                                                      <Compass className="w-6 h-6" />
                                                      Start Exploring
                                                </Link>
                                          </motion.div>
                                    </motion.div>
                              </motion.div>
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                              className="absolute bottom-10 left-1/2 -translate-x-1/2"
                              animate={{ y: [0, 15, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                        >
                              <div className="w-8 h-12 border-3 border-white/50 rounded-full flex justify-center pt-3">
                                    <motion.div
                                          className="w-2 h-4 bg-white rounded-full"
                                          animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                    />
                              </div>
                        </motion.div>
                  </section>

                  {/* Attractions Grid - Vibrant Cards */}
                  <section id="explore" className="py-24 bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.span
                                          className="text-6xl mb-6 block"
                                          animate={{ rotate: [0, 10, -10, 0] }}
                                          transition={{ duration: 3, repeat: Infinity }}
                                    >
                                          ✨
                                    </motion.span>
                                    <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 mb-6">
                                          Must-See Wonders
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Every corner tells a story, every view takes your breath away
                                    </p>
                              </motion.div>

                              <div className="grid md:grid-cols-2 gap-8">
                                    {attractions.map((attraction, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -2 : 2 }}
                                                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.15 }}
                                                whileHover={{ scale: 1.03, y: -10 }}
                                                className="relative group cursor-pointer"
                                          >
                                                <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                                                      <Image
                                                            src={attraction.image}
                                                            alt={attraction.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                      />
                                                      <div className={`absolute inset-0 bg-gradient-to-t ${attraction.color} opacity-60 group-hover:opacity-70 transition-opacity`} />

                                                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                                                            <motion.div
                                                                  className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4"
                                                                  whileHover={{ rotate: 360 }}
                                                                  transition={{ duration: 0.5 }}
                                                            >
                                                                  <attraction.icon className="w-8 h-8 text-white" />
                                                            </motion.div>
                                                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
                                                                  {attraction.title}
                                                            </h3>
                                                            <p className="text-xl text-white/90 italic">
                                                                  "{attraction.tagline}"
                                                            </p>
                                                      </div>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Quote Section - Colorful */}
                  <section className="py-20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600" />
                        <motion.div
                              className="absolute inset-0"
                              animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                              style={{
                                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                              }}
                        />

                        <div className="container mx-auto px-6 lg:px-8 relative z-10">
                              <motion.div
                                    className="text-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.div
                                          className="text-8xl mb-8"
                                          animate={{ scale: [1, 1.2, 1] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                    >
                                          💫
                                    </motion.div>
                                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                                          {quotes[0].text}
                                    </h2>
                                    <p className="text-2xl text-white/80 italic">— {quotes[0].author}</p>
                              </motion.div>
                        </div>
                  </section>

                  {/* Experiences Section */}
                  <section className="py-24 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <span className="text-6xl mb-6 block">🌈</span>
                                    <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-6">
                                          Unforgettable
                                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500"> Moments</span>
                                    </h2>
                              </motion.div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {experiences.map((exp, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                whileHover={{ y: -15, scale: 1.02 }}
                                                className="group cursor-pointer"
                                          >
                                                <div className="relative h-72 rounded-3xl overflow-hidden shadow-xl">
                                                      <Image
                                                            src={exp.image}
                                                            alt={exp.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                                      <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <p className="text-yellow-300 text-sm font-medium mb-2 italic">"{exp.tagline}"</p>
                                                            <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                                                            <p className="text-white/70 text-sm">{exp.description}</p>
                                                      </div>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Photo Gallery - Masonry Style */}
                  <section className="py-24 bg-gradient-to-b from-cyan-50 via-blue-50 to-purple-50">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <span className="text-6xl mb-6 block">📸</span>
                                    <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                                          Captured Beauty
                                    </h2>
                                    <p className="text-xl text-gray-600">Every frame tells a thousand stories</p>
                              </motion.div>

                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {gallery.map((img, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                                className={`relative rounded-2xl overflow-hidden shadow-xl cursor-pointer ${i === 0 || i === 5 ? 'row-span-2' : ''
                                                      }`}
                                                style={{ height: i === 0 || i === 5 ? '400px' : '200px' }}
                                          >
                                                <Image
                                                      src={img.src}
                                                      alt={img.alt}
                                                      fill
                                                      className="object-cover hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                      <Camera className="w-10 h-10 text-white" />
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Final CTA - Vibrant */}
                  <section className="py-32 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />
                        <motion.div
                              className="absolute inset-0"
                              style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/%3E%3C/svg%3E")',
                              }}
                        />

                        <FloatingElements />

                        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.div
                                          className="text-8xl mb-8"
                                          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                          transition={{ duration: 3, repeat: Infinity }}
                                    >
                                          🌴
                                    </motion.div>
                                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                                          Your Adventure
                                          <span className="block text-yellow-300">Starts Here</span>
                                    </h2>
                                    <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
                                          Don't just dream about paradise — live it.
                                    </p>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                          <Link
                                                href="/destination"
                                                className="bg-white text-purple-600 px-12 py-6 rounded-full font-black text-2xl shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center gap-3"
                                          >
                                                <Heart className="w-8 h-8 fill-current" />
                                                Explore More
                                          </Link>
                                    </motion.div>
                              </motion.div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default WellnessPage;
