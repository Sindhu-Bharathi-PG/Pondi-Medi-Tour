"use client";

import { Footer, Header } from '@/app/components/common';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Droplets, Feather, Flame, Flower, Heart, Sparkles } from 'lucide-react';
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

// Spa experiences
const spaExperiences = [
      {
            title: "Aromatic Bliss",
            tagline: "Let scents carry your worries away",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
            color: "from-pink-500 to-rose-600",
            icon: Flower,
      },
      {
            title: "Healing Waters",
            tagline: "Float into pure relaxation",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
            color: "from-cyan-500 to-blue-600",
            icon: Droplets,
      },
      {
            title: "Warm Stone Therapy",
            tagline: "Ancient heat, modern relief",
            image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800",
            color: "from-orange-500 to-amber-600",
            icon: Flame,
      },
      {
            title: "Gentle Touch",
            tagline: "Hands that heal, moments that matter",
            image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800",
            color: "from-purple-500 to-violet-600",
            icon: Feather,
      },
];

// Relaxation moments
const relaxMoments = [
      {
            title: "Ocean Breeze",
            tagline: "Sea air that soothes the soul",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      },
      {
            title: "Garden Tranquility",
            tagline: "Nature's embrace",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      },
      {
            title: "Sunset Serenity",
            tagline: "Golden hours of peace",
            image: "https://images.unsplash.com/photo-1476673160081-cf065f0d2a86?w=800",
      },
      {
            title: "Pure Stillness",
            tagline: "Time stands still",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      },
];

// Floating bubbles animation
const FloatingBubbles = () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                  <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/30"
                        style={{
                              width: 10 + Math.random() * 30,
                              height: 10 + Math.random() * 30,
                              left: `${Math.random() * 100}%`,
                              bottom: '-5%',
                        }}
                        animate={{
                              y: [0, -800],
                              x: [0, Math.random() * 100 - 50],
                              opacity: [0.5, 0],
                              scale: [1, 0.5],
                        }}
                        transition={{
                              duration: 8 + Math.random() * 5,
                              delay: i * 0.5,
                              repeat: Infinity,
                              ease: 'easeOut',
                        }}
                  />
            ))}
      </div>
);

const SpaRejuvenationPage = () => {
      const heroRef = useRef<HTMLElement>(null);
      const { scrollY } = useScroll();
      const heroY = useTransform(scrollY, [0, 500], [0, 150]);
      const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero - Luxurious & Calming */}
                  <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
                        <motion.div className="absolute inset-0" style={{ y: heroY }}>
                              <Image
                                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920"
                                    alt="Luxury Spa"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-800/60 to-rose-700/40" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </motion.div>

                        <FloatingBubbles />

                        {/* Soft glow effect */}
                        <motion.div
                              className="absolute inset-0 opacity-30"
                              style={{
                                    background: 'radial-gradient(circle at 30% 50%, rgba(236,72,153,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(139,92,246,0.4) 0%, transparent 50%)',
                              }}
                              animate={{ opacity: [0.2, 0.4, 0.2] }}
                              transition={{ duration: 5, repeat: Infinity }}
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
                                          className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/25"
                                    >
                                          <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                          >
                                                <Droplets className="w-6 h-6 text-cyan-300" />
                                          </motion.div>
                                          <span className="text-white text-lg font-medium">
                                                Indulge Your Senses
                                          </span>
                                    </motion.div>

                                    <motion.h1
                                          variants={fadeInUp}
                                          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8"
                                    >
                                          <motion.span
                                                className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-200 to-purple-200"
                                                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                                                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                                style={{ backgroundSize: '200% auto' }}
                                          >
                                                UNWIND
                                          </motion.span>
                                          <span className="block text-white text-5xl md:text-6xl mt-2">
                                                in Paradise
                                          </span>
                                    </motion.h1>

                                    <motion.p
                                          variants={fadeInUp}
                                          className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
                                    >
                                          Where luxury meets nature,
                                          <br />
                                          <span className="text-pink-200 font-semibold">and every moment is pure indulgence.</span>
                                    </motion.p>

                                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="#experiences"
                                                      className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-pink-500/50 transition-all inline-flex items-center gap-3"
                                                >
                                                      <Sparkles className="w-6 h-6" />
                                                      Discover Bliss
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
                              <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-3">
                                    <motion.div
                                          className="w-2 h-4 bg-white rounded-full"
                                          animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                    />
                              </div>
                        </motion.div>
                  </section>

                  {/* Spa Experiences */}
                  <section id="experiences" className="py-24 bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.span
                                          className="text-7xl mb-6 block"
                                          animate={{ rotate: [0, 10, -10, 0] }}
                                          transition={{ duration: 4, repeat: Infinity }}
                                    >
                                          🌺
                                    </motion.span>
                                    <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-500 mb-6">
                                          Pure Indulgence
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Every touch is a journey, every moment a treasure
                                    </p>
                              </motion.div>

                              <div className="grid md:grid-cols-2 gap-8">
                                    {spaExperiences.map((experience, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 60 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.15 }}
                                                whileHover={{ scale: 1.03, y: -10 }}
                                                className="relative group cursor-pointer"
                                          >
                                                <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                                                      <Image
                                                            src={experience.image}
                                                            alt={experience.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                      />
                                                      <div className={`absolute inset-0 bg-gradient-to-t ${experience.color} opacity-60 group-hover:opacity-70 transition-opacity`} />

                                                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                                                            <motion.div
                                                                  className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4"
                                                                  whileHover={{ rotate: 360 }}
                                                                  transition={{ duration: 0.5 }}
                                                            >
                                                                  <experience.icon className="w-8 h-8 text-white" />
                                                            </motion.div>
                                                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
                                                                  {experience.title}
                                                            </h3>
                                                            <p className="text-xl text-white/90 italic">
                                                                  "{experience.tagline}"
                                                            </p>
                                                      </div>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Quote Banner */}
                  <section className="py-24 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600" />
                        <FloatingBubbles />

                        <div className="container mx-auto px-6 lg:px-8 relative z-10">
                              <motion.div
                                    className="text-center max-w-4xl mx-auto"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.div
                                          className="text-8xl mb-8"
                                          animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                                          transition={{ duration: 3, repeat: Infinity }}
                                    >
                                          💆‍♀️
                                    </motion.div>
                                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                                          "True relaxation is an art,
                                          <span className="text-yellow-300"> and you deserve a masterpiece."</span>
                                    </h2>
                              </motion.div>
                        </div>
                  </section>

                  {/* Relaxation Moments */}
                  <section className="py-24 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <span className="text-6xl mb-6 block">🍃</span>
                                    <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-6">
                                          Moments of
                                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500"> Peace</span>
                                    </h2>
                              </motion.div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {relaxMoments.map((moment, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                whileHover={{ y: -15, scale: 1.02 }}
                                                className="group cursor-pointer"
                                          >
                                                <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
                                                      <Image
                                                            src={moment.image}
                                                            alt={moment.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/40 to-transparent" />
                                                      <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <h3 className="text-xl font-bold text-white mb-2">{moment.title}</h3>
                                                            <p className="text-pink-200 italic">"{moment.tagline}"</p>
                                                      </div>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Visual Gallery */}
                  <section className="py-24 bg-gradient-to-b from-purple-50 via-pink-50 to-rose-50">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <span className="text-6xl mb-6 block">✨</span>
                                    <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mb-6">
                                          Captured Serenity
                                    </h2>
                              </motion.div>

                              <div className="grid grid-cols-3 gap-4">
                                    {[
                                          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600",
                                          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600",
                                          "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600",
                                          "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600",
                                          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
                                          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
                                    ].map((src, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                                className={`relative rounded-2xl overflow-hidden shadow-xl cursor-pointer ${i === 0 || i === 5 ? 'row-span-2 h-80' : 'h-40'
                                                      }`}
                                          >
                                                <Image
                                                      src={src}
                                                      alt="Spa moment"
                                                      fill
                                                      className="object-cover"
                                                />
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Final CTA */}
                  <section className="py-32 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600" />

                        <FloatingBubbles />

                        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.div
                                          className="text-8xl mb-8"
                                          animate={{ scale: [1, 1.2, 1] }}
                                          transition={{ duration: 3, repeat: Infinity }}
                                    >
                                          🌸
                                    </motion.div>
                                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                                          Your Bliss
                                          <span className="block text-yellow-300">Awaits</span>
                                    </h2>
                                    <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
                                          Step into a world where every moment is designed for your pleasure.
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

export default SpaRejuvenationPage;
