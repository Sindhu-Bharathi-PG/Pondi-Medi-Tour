"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Sparkles, Sun, Heart, MapPin, Star, Clock, Users, ChevronRight, Waves, TreePine, Flower2, MoonStar } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const WellnessPage = () => {
      const scrolled = useScrolled(50);

      const wellnessPackages = [
            {
                  id: 1,
                  title: 'Post-Surgery Recovery Retreat',
                  duration: '14 days',
                  location: 'Quiet Healing Centre, Auroville',
                  image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
                  price: 'From $2,500',
                  rating: 4.9,
                  reviews: 145,
                  includes: ['Aquatic Therapy', 'Physiotherapy', 'Yoga Sessions', 'Organic Meals', 'Spa Treatments'],
                  description: 'Holistic recovery program designed for post-surgical patients with expert physiotherapy and nature healing.',
                  featured: true
            },
            {
                  id: 2,
                  title: 'Ayurveda Rejuvenation',
                  duration: '7-21 days',
                  location: 'Traditional Wellness Centre',
                  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                  price: 'From $1,800',
                  rating: 4.8,
                  reviews: 230,
                  includes: ['Panchakarma', 'Abhyanga Massage', 'Shirodhara', 'Herbal Treatments', 'Meditation'],
                  description: 'Authentic Kerala-style Ayurveda treatments for detoxification and rejuvenation.',
                  featured: true
            },
            {
                  id: 3,
                  title: 'French Heritage Wellness Stay',
                  duration: '7 days',
                  location: 'Heritage Hotel, White Town',
                  image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
                  price: 'From $1,500',
                  rating: 4.9,
                  reviews: 89,
                  includes: ['Colonial Villa Stay', 'French Cuisine', 'Beach Walks', 'Cultural Tours', 'Spa Access'],
                  description: 'Recover in colonial-era luxury while exploring Pondicherry\'s unique French-Indian culture.',
                  featured: true
            },
            {
                  id: 4,
                  title: 'Beachside Healing Program',
                  duration: '10 days',
                  location: 'Beach Resort, ECR',
                  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                  price: 'From $2,000',
                  rating: 4.7,
                  reviews: 167,
                  includes: ['Ocean View Room', 'Beach Yoga', 'Naturopathy', 'Reflexology', 'Healthy Dining'],
                  description: 'Heal with the sounds of waves and gentle sea breeze in our beachfront wellness retreat.'
            },
            {
                  id: 5,
                  title: 'Meditation & Mindfulness',
                  duration: '5-14 days',
                  location: 'Sri Aurobindo Ashram',
                  image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
                  price: 'From $800',
                  rating: 4.9,
                  reviews: 312,
                  includes: ['Guided Meditation', 'Ashram Stay', 'Spiritual Discourses', 'Volunteer Activities', 'Simple Meals'],
                  description: 'Find inner peace through spiritual practices at the renowned Sri Aurobindo Ashram.'
            },
            {
                  id: 6,
                  title: 'Auroville Eco-Healing',
                  duration: '7-14 days',
                  location: 'Auroville Community',
                  image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800',
                  price: 'From $1,200',
                  rating: 4.8,
                  reviews: 198,
                  includes: ['Eco-friendly Stay', 'Organic Farm Tours', 'Sustainable Living Workshops', 'Forest Walks', 'Community Dining'],
                  description: 'Experience sustainable healing in the experimental township of Auroville.'
            },
      ];

      const highlights = [
            { icon: Leaf, title: 'Holistic Approach', desc: 'Mind, body & spirit healing' },
            { icon: Sparkles, title: 'Natural Therapies', desc: 'Ayurveda, naturopathy, yoga' },
            { icon: Sun, title: 'Tropical Climate', desc: 'Year-round healing weather' },
            { icon: Heart, title: 'Expert Care', desc: 'Certified wellness practitioners' },
      ];

      return (
            <div className="min-h-screen bg-white">
                  <Header scrolled={scrolled} />

                  {/* Hero Section */}
                  <section className="relative pt-32 pb-24 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-orange-700 to-rose-700" />
                        <div className="absolute inset-0 opacity-30">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600')] bg-cover bg-center" />
                        </div>

                        <div className="relative container mx-auto px-4">
                              <div className="max-w-4xl mx-auto text-center text-white">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <Flower2 className="w-5 h-5 text-yellow-300" />
                                          <span className="text-sm font-medium">Holistic Healing Destination</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                          Heal Your Body
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200">
                                                Nurture Your Soul
                                          </span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-orange-100 leading-relaxed max-w-3xl mx-auto">
                                          Experience the perfect blend of world-class recovery care and ancient healing traditions in the serene coastal paradise of Pondicherry.
                                    </p>
                              </div>
                        </div>

                        {/* Floating Wave */}
                        <div className="absolute bottom-0 left-0 right-0">
                              <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                              </svg>
                        </div>
                  </section>

                  {/* Highlights */}
                  <section className="py-16 -mt-8 relative z-10">
                        <div className="container mx-auto px-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {highlights.map((item, index) => (
                                          <div
                                                key={index}
                                                className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                          >
                                                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                                                      <item.icon className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                                                <p className="text-gray-500 text-sm">{item.desc}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Why Pondicherry for Wellness */}
                  <section className="py-20 bg-gradient-to-b from-white to-orange-50">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-16 items-center">
                                    <div>
                                          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm font-semibold">The Perfect Healing Destination</span>
                                          </div>
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                                                Where French Elegance Meets
                                                <span className="text-orange-600"> Indian Spirituality</span>
                                          </h2>
                                          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                                Pondicherry offers a unique environment for recovery and wellness that combines:
                                          </p>

                                          <div className="space-y-4">
                                                {[
                                                      { icon: Waves, text: 'Pristine beaches for natural healing' },
                                                      { icon: TreePine, text: 'Auroville\'s sustainable eco-communities' },
                                                      { icon: MoonStar, text: 'Sri Aurobindo Ashram\'s spiritual practices' },
                                                      { icon: Sparkles, text: 'Authentic Ayurveda & wellness traditions' },
                                                ].map((item, index) => (
                                                      <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md">
                                                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                                                  <item.icon className="w-6 h-6 text-orange-600" />
                                                            </div>
                                                            <span className="font-medium text-gray-700">{item.text}</span>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    <div className="relative">
                                          <div className="grid grid-cols-2 gap-4">
                                                <Image
                                                      src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600"
                                                      alt="Pondicherry Beach"
                                                      width={300}
                                                      height={400}
                                                      className="rounded-2xl shadow-xl object-cover h-64"
                                                />
                                                <Image
                                                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600"
                                                      alt="Ayurveda Treatment"
                                                      width={300}
                                                      height={400}
                                                      className="rounded-2xl shadow-xl object-cover h-64 mt-8"
                                                />
                                                <Image
                                                      src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600"
                                                      alt="Meditation"
                                                      width={300}
                                                      height={400}
                                                      className="rounded-2xl shadow-xl object-cover h-64"
                                                />
                                                <Image
                                                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600"
                                                      alt="Spa"
                                                      width={300}
                                                      height={400}
                                                      className="rounded-2xl shadow-xl object-cover h-64 mt-8"
                                                />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Wellness Packages */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Curated Wellness Experiences
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Choose from our carefully designed recovery and rejuvenation packages
                                    </p>
                              </div>

                              {/* Featured Packages */}
                              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                                    {wellnessPackages.filter(p => p.featured).map((pkg) => (
                                          <div
                                                key={pkg.id}
                                                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                                          >
                                                <div className="relative h-64">
                                                      <Image
                                                            src={pkg.image}
                                                            alt={pkg.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                            <span className="font-semibold text-gray-800">{pkg.rating}</span>
                                                      </div>
                                                      <div className="absolute bottom-4 left-4 right-4">
                                                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                                  {pkg.duration}
                                                            </span>
                                                      </div>
                                                </div>

                                                <div className="p-6">
                                                      <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                                                      <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
                                                            <MapPin className="w-4 h-4" />
                                                            {pkg.location}
                                                      </p>
                                                      <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                                                      <div className="flex flex-wrap gap-2 mb-4">
                                                            {pkg.includes.slice(0, 3).map((item, i) => (
                                                                  <span key={i} className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs">
                                                                        {item}
                                                                  </span>
                                                            ))}
                                                      </div>

                                                      <div className="flex items-center justify-between pt-4 border-t">
                                                            <div>
                                                                  <span className="text-2xl font-bold text-orange-600">{pkg.price}</span>
                                                            </div>
                                                            <Link
                                                                  href={`/wellness/${pkg.id}`}
                                                                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-1"
                                                            >
                                                                  View Details
                                                                  <ChevronRight className="w-4 h-4" />
                                                            </Link>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>

                              {/* Other Packages */}
                              <div className="grid md:grid-cols-3 gap-6">
                                    {wellnessPackages.filter(p => !p.featured).map((pkg) => (
                                          <div
                                                key={pkg.id}
                                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                                          >
                                                <div className="relative h-48">
                                                      <Image
                                                            src={pkg.image}
                                                            alt={pkg.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                      <div className="absolute bottom-4 left-4">
                                                            <h3 className="text-lg font-bold text-white">{pkg.title}</h3>
                                                            <p className="text-white/80 text-sm">{pkg.duration} • {pkg.location.split(',')[0]}</p>
                                                      </div>
                                                </div>
                                                <div className="p-4">
                                                      <div className="flex items-center justify-between">
                                                            <span className="text-xl font-bold text-orange-600">{pkg.price}</span>
                                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                                  {pkg.rating} ({pkg.reviews})
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Ready for Your Wellness Journey?
                              </h2>
                              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                                    Let us create a personalized wellness package tailored to your recovery needs.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link
                                          href="/booking"
                                          className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                    >
                                          Plan My Wellness Retreat
                                    </Link>
                                    <Link
                                          href="/telemedicine"
                                          className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                                    >
                                          Free Consultation
                                    </Link>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default WellnessPage;
