"use client";

import { Footer, Header } from '@/app/components/common';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
      Compass, Eye,
      Flower2, Heart,
      Moon,
      Sun,
      Wind
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

// Spiritual destinations
const spiritualPlaces = [
      {
            name: "Matrimandir",
            tagline: "The Soul of Auroville",
            description: "A golden sphere of silence where inner peace becomes reality",
            image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800",
            color: "from-amber-400 to-yellow-500",
      },
      {
            name: "Sri Aurobindo Ashram",
            tagline: "Where Seekers Find Themselves",
            description: "A sanctuary of meditation since 1926",
            image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
            color: "from-purple-500 to-indigo-600",
      },
      {
            name: "Beach Meditation",
            tagline: "Breathe with the Waves",
            description: "Let the ocean's rhythm guide your meditation",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
            color: "from-cyan-500 to-blue-600",
      },
      {
            name: "Temple Serenity",
            tagline: "Ancient Wisdom Awaits",
            description: "Sacred spaces that have witnessed centuries of devotion",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
            color: "from-orange-500 to-red-500",
      },
];

// Experiences
const experiences = [
      {
            title: "Sunrise Meditation",
            tagline: "Greet the dawn with intention",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            icon: Sun,
      },
      {
            title: "Moonlit Yoga",
            tagline: "Flow under the stars",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
            icon: Moon,
      },
      {
            title: "Sound Healing",
            tagline: "Let vibrations heal your soul",
            image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800",
            icon: Wind,
      },
      {
            title: "Inner Journey",
            tagline: "Discover who you truly are",
            image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800",
            icon: Eye,
      },
];

// Floating lotus animation
const FloatingLotus = () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
                  <motion.div
                        key={i}
                        className="absolute text-4xl"
                        style={{
                              left: `${10 + i * 12}%`,
                              top: `${20 + (i % 3) * 30}%`,
                        }}
                        animate={{
                              y: [0, -20, 0],
                              rotate: [0, 10, -10, 0],
                              opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                              duration: 5 + i * 0.5,
                              delay: i * 0.3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                        }}
                  >
                        🪷
                  </motion.div>
            ))}
      </div>
);

const YogaMeditationPage = () => {
      const heroRef = useRef<HTMLElement>(null);
      const { scrollY } = useScroll();
      const heroY = useTransform(scrollY, [0, 500], [0, 150]);
      const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero - Serene & Colorful */}
                  <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
                        <motion.div className="absolute inset-0" style={{ y: heroY }}>
                              <Image
                                    src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920"
                                    alt="Meditation Paradise"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 via-purple-800/70 to-pink-700/50" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </motion.div>

                        <FloatingLotus />

                        {/* Animated mandala background */}
                        <motion.div
                              className="absolute inset-0 flex items-center justify-center opacity-10"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        >
                              <div className="w-[800px] h-[800px] border-2 border-white rounded-full" />
                              <div className="absolute w-[600px] h-[600px] border-2 border-white rounded-full" />
                              <div className="absolute w-[400px] h-[400px] border-2 border-white rounded-full" />
                        </motion.div>

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
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                          >
                                                <Flower2 className="w-6 h-6 text-pink-300" />
                                          </motion.div>
                                          <span className="text-white text-lg font-medium">
                                                Find Your Inner Peace
                                          </span>
                                    </motion.div>

                                    <motion.h1
                                          variants={fadeInUp}
                                          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8"
                                    >
                                          <motion.span
                                                className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200"
                                                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                                                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                                style={{ backgroundSize: '200% auto' }}
                                          >
                                                BREATHE
                                          </motion.span>
                                          <span className="block text-white text-5xl md:text-6xl mt-2">
                                                • Flow • Be
                                          </span>
                                    </motion.h1>

                                    <motion.p
                                          variants={fadeInUp}
                                          className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
                                    >
                                          Where the ocean meets the soul,
                                          <br />
                                          <span className="text-pink-200 font-semibold">transformation begins.</span>
                                    </motion.p>

                                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                      href="#discover"
                                                      className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all inline-flex items-center gap-3"
                                                >
                                                      <Compass className="w-6 h-6" />
                                                      Begin Your Journey
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

                  {/* Spiritual Places */}
                  <section id="discover" className="py-24 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.span
                                          className="text-7xl mb-6 block"
                                          animate={{ scale: [1, 1.2, 1] }}
                                          transition={{ duration: 3, repeat: Infinity }}
                                    >
                                          🕉️
                                    </motion.span>
                                    <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mb-6">
                                          Sacred Sanctuaries
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Spaces where silence speaks and the soul finds its home
                                    </p>
                              </motion.div>

                              <div className="grid md:grid-cols-2 gap-8">
                                    {spiritualPlaces.map((place, i) => (
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
                                                            src={place.image}
                                                            alt={place.name}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                      />
                                                      <div className={`absolute inset-0 bg-gradient-to-t ${place.color} opacity-60 group-hover:opacity-70 transition-opacity`} />

                                                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                                                            <p className="text-white/80 text-lg italic mb-2">"{place.tagline}"</p>
                                                            <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                                                                  {place.name}
                                                            </h3>
                                                            <p className="text-white/90">
                                                                  {place.description}
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
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600" />
                        <motion.div
                              className="absolute inset-0 opacity-20"
                              animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                              transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse' }}
                              style={{
                                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                    backgroundSize: '30px 30px',
                              }}
                        />

                        <div className="container mx-auto px-6 lg:px-8 relative z-10">
                              <motion.div
                                    className="text-center max-w-4xl mx-auto"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                              >
                                    <motion.div
                                          className="text-8xl mb-8"
                                          animate={{ y: [0, -10, 0] }}
                                          transition={{ duration: 3, repeat: Infinity }}
                                    >
                                          ✨
                                    </motion.div>
                                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                                          "Stillness is not the absence of movement,
                                          <span className="text-yellow-300"> but the presence of peace."</span>
                                    </h2>
                              </motion.div>
                        </div>
                  </section>

                  {/* Experiences Grid */}
                  <section className="py-24 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <span className="text-6xl mb-6 block">🧘</span>
                                    <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-6">
                                          Soul
                                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> Experiences</span>
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
                                                <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
                                                      <Image
                                                            src={exp.image}
                                                            alt={exp.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/40 to-transparent" />
                                                      <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <motion.div
                                                                  className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4"
                                                                  whileHover={{ rotate: 360 }}
                                                                  transition={{ duration: 0.5 }}
                                                            >
                                                                  <exp.icon className="w-7 h-7 text-white" />
                                                            </motion.div>
                                                            <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                                                            <p className="text-purple-200 italic">"{exp.tagline}"</p>
                                                      </div>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Visual Gallery */}
                  <section className="py-24 bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50">
                        <div className="container mx-auto px-6 lg:px-8">
                              <motion.div
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <span className="text-6xl mb-6 block">🌸</span>
                                    <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
                                          Moments of Bliss
                                    </h2>
                              </motion.div>

                              <div className="grid grid-cols-3 gap-4">
                                    {[
                                          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600",
                                          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
                                          "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600",
                                          "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600",
                                          "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600",
                                          "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600",
                                    ].map((src, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                                className={`relative rounded-2xl overflow-hidden shadow-xl cursor-pointer ${i === 1 || i === 4 ? 'row-span-2 h-80' : 'h-40'
                                                      }`}
                                          >
                                                <Image
                                                      src={src}
                                                      alt="Meditation moment"
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
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

                        <FloatingLotus />

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
                                          🪷
                                    </motion.div>
                                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                                          Your Soul is
                                          <span className="block text-yellow-300">Calling</span>
                                    </h2>
                                    <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
                                          Answer the call. Find your peace. Transform your life.
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

export default YogaMeditationPage;
