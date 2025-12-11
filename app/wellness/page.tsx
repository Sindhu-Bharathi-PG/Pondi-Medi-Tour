"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
      ChevronRight, Heart, Leaf, MapPin, Star, Sun,
      Clock, CheckCircle, Users, Sparkles, Waves, Calendar
} from 'lucide-react';
import { Footer, Header } from '../components/common';
import { ConvertedPrice } from '../components/common/ConvertedPrice';

// Highlights
const highlights = [
      { icon: Heart, title: 'Holistic Approach', desc: 'Mind, body & spirit healing' },
      { icon: Leaf, title: 'Natural Therapies', desc: 'Ayurveda, naturopathy, yoga' },
      { icon: Sun, title: 'Tropical Climate', desc: 'Year-round healing weather' },
      { icon: Users, title: 'Expert Care', desc: 'Certified wellness practitioners' },
];

// Why Pondicherry features
const pondicherryFeatures = [
      'Pristine beaches for natural healing',
      'Auroville\'s sustainable eco-communities',
      'Sri Aurobindo Ashram\'s spiritual practices',
      'Authentic Ayurveda & wellness traditions',
];

// Featured Packages
const featuredPackages = [
      {
            id: 'detox-7',
            name: '7-Day Ayurvedic Detox',
            location: 'Traditional Wellness Centre',
            duration: '7 days / 6 nights',
            image: '/images/generated/package_ayurveda_detox_massage_1765430995885.png',
            priceFrom: 1200,
            rating: 4.9,
            reviews: 234,
            description: 'Authentic Kerala-style Ayurveda for complete detoxification and rejuvenation. Observable benefits within 7 days.',
            includes: ['Daily Abhyanga Massage', 'Panchakarma Treatments', 'Shirodhara Therapy', 'Sattvic Diet (Pure Foods)', 'Daily Meditation'],
            featured: true,
      },
      {
            id: 'yoga-14',
            name: '14-Day Yoga & Spiritual Immersion',
            location: 'Sri Aurobindo Ashram',
            duration: '14 days / 13 nights',
            image: '/images/generated/package_yoga_ashram_immersion_1765431015643.png',
            priceFrom: 1800,
            rating: 4.9,
            reviews: 312,
            description: 'Deep yoga immersion with spiritual practices at the renowned Sri Aurobindo Ashram. Transform body and mind.',
            includes: ['Morning & Evening Yoga', 'Ashram Meditation', 'Philosophy Teachings', 'Beach Walks', 'Cultural Tours'],
            featured: true,
      },
      {
            id: 'complete-21',
            name: '21-Day Complete Wellness Rejuvenation',
            location: 'Quiet Healing Centre, Auroville',
            duration: '21 days / 20 nights',
            image: '/images/generated/package_complete_wellness_auroville_1765431034682.png',
            priceFrom: 3200,
            rating: 4.9,
            reviews: 156,
            description: 'The ultimate wellness experience combining all AYUSH modalities. Complete mind-body-spirit transformation.',
            includes: ['Ayurveda + Yoga + Naturopathy', 'Intensive Daily Schedule', 'Lifestyle Coaching', 'Complete Transformation', 'Expert Consultations'],
            featured: true,
      },
];

// Other Packages
const otherPackages = [
      {
            id: 'recovery-14',
            name: 'Post-Surgery Recovery Retreat',
            location: 'Beach Resort, ECR',
            duration: '14 days',
            image: '/images/generated/package_recovery_beach_resort_1765431053203.png',
            priceFrom: 2000,
            rating: 4.8,
            description: 'Holistic post-surgical recovery with physiotherapy and nature healing. Sea salt air aids respiratory healing.',
            includes: ['Aquatic Therapy', 'Physiotherapy', 'Gentle Yoga', 'Organic Meals', 'Spa Treatments'],
      },
      {
            id: 'auroville-eco',
            name: 'Auroville Eco-Healing Experience',
            location: 'Auroville Community',
            duration: '7 days',
            image: '/images/generated/package_auroville_eco_living_1765431070820.png',
            priceFrom: 1100,
            rating: 4.9,
            description: 'Experience sustainable healing in the experimental township of Auroville. UNESCO-recognized spiritual community.',
            includes: ['Eco-friendly Stay', 'Organic Farm Tours', 'Sustainable Living Workshops', 'Forest Walks', 'Community Dining'],
      },
      {
            id: 'heritage-7',
            name: 'French Heritage Wellness Stay',
            location: 'Heritage Hotel, White Town',
            duration: '7 days',
            image: '/images/generated/package_french_heritage_villa_1765431092375.png',
            priceFrom: 1600,
            rating: 4.9,
            description: 'Recover in colonial-era luxury while exploring Pondicherry\'s unique French-Indian heritage.',
            includes: ['Colonial Villa Stay', 'French Cuisine', 'Beach Walks', 'Cultural Tours', 'Spa Access'],
      },
];

const WellnessPage = () => {
      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative min-h-[70vh] flex items-center pt-20">
                        <div className="absolute inset-0">
                              <Image
                                    src="/images/generated/wellness_page_hero_retreat_1765430977781.png"
                                    alt="Wellness Retreat"
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-800/80 to-transparent" />
                        </div>

                        <div className="relative container mx-auto px-6 lg:px-8">
                              <div className="max-w-3xl">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
                                          <Leaf className="w-4 h-4 text-amber-300" />
                                          <span className="text-white text-sm font-medium">Heal in India • National Wellness Destination</span>
                                    </div>

                                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                          Heal Your Body.
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-200">
                                                Nurture Your Soul.
                                          </span>
                                    </h1>

                                    <p className="text-lg md:text-xl text-amber-100 leading-relaxed mb-8 max-w-2xl">
                                          Wellness isn&apos;t a one-hour massage; it&apos;s a lifestyle reset. Our Naturopathy centers focus on diet correction (Satvic food), fasting therapy, and mud therapy to cure lifestyle diseases like diabetes and hypertension naturally.
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                          <Link
                                                href="#packages"
                                                className="bg-white text-amber-700 px-6 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                                          >
                                                View Packages
                                                <ChevronRight className="w-5 h-5" />
                                          </Link>
                                          <Link
                                                href="/booking"
                                                className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                                          >
                                                Free Consultation
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Highlights Strip */}
                  <section className="py-8 bg-white border-b border-gray-100">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {highlights.map((item, i) => (
                                          <div key={i} className="flex items-center gap-3 p-3">
                                                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                                                      <item.icon className="w-5 h-5 text-amber-600" />
                                                </div>
                                                <div>
                                                      <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                                                      <p className="text-gray-500 text-xs">{item.desc}</p>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Why Pondicherry Section */}
                  <section className="py-12 bg-gradient-to-b from-amber-50 to-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    <div>
                                          <span className="text-amber-600 font-medium text-sm">The Perfect Healing Destination</span>
                                          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                                                Where French Elegance Meets Indian Spirituality
                                          </h2>
                                          <p className="text-gray-600 mb-6">
                                                Pondicherry offers a unique environment for recovery and wellness that combines:
                                          </p>
                                          <ul className="space-y-3">
                                                {pondicherryFeatures.map((feature, i) => (
                                                      <li key={i} className="flex items-center gap-3">
                                                            <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                                                            <span className="text-gray-700">{feature}</span>
                                                      </li>
                                                ))}
                                          </ul>
                                    </div>
                                    <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
                                          <Image
                                                src="/images/generated/why_pondicherry_french_indian_fusion_1765431109687.png"
                                                alt="Pondicherry"
                                                fill
                                                className="object-cover"
                                          />
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Featured Packages */}
                  <section id="packages" className="py-12 bg-white">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="text-center mb-10">
                                    <span className="text-amber-600 font-medium text-sm">Curated Wellness Experiences</span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                                          Featured Packages
                                    </h2>
                                    <p className="text-gray-600 mt-2 max-w-xl mx-auto">
                                          Choose from our carefully designed recovery and rejuvenation packages.
                                    </p>
                              </div>

                              <div className="grid lg:grid-cols-3 gap-6">
                                    {featuredPackages.map((pkg) => (
                                          <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group border border-gray-100">
                                                <div className="relative h-48">
                                                      <Image src={pkg.image} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                                                            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                                            <span className="font-bold text-sm text-gray-800">{pkg.rating}</span>
                                                      </div>
                                                      <div className="absolute bottom-3 left-3">
                                                            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">{pkg.duration}</span>
                                                      </div>
                                                </div>

                                                <div className="p-5">
                                                      <div className="flex items-center gap-1 text-xs text-amber-600 mb-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {pkg.location}
                                                      </div>
                                                      <h3 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h3>
                                                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{pkg.description}</p>

                                                      <div className="space-y-1.5 mb-4">
                                                            {pkg.includes.slice(0, 4).map((item, i) => (
                                                                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                                                        <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                                                        {item}
                                                                  </div>
                                                            ))}
                                                            {pkg.includes.length > 4 && (
                                                                  <span className="text-xs text-amber-600">+{pkg.includes.length - 4} more</span>
                                                            )}
                                                      </div>

                                                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                            <div>
                                                                  <span className="text-xs text-gray-500">From</span>
                                                                  <div className="text-lg font-bold text-amber-600">
                                                                        <ConvertedPrice amount={pkg.priceFrom} fromCurrency="USD" />
                                                                  </div>
                                                            </div>
                                                            <Link
                                                                  href={`/booking?package=${pkg.id}`}
                                                                  className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-amber-600 transition-all"
                                                            >
                                                                  Book Now
                                                            </Link>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Other Packages */}
                  <section className="py-12 bg-gray-50">
                        <div className="container mx-auto px-6 lg:px-8">
                              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Other Packages</h2>

                              <div className="grid md:grid-cols-3 gap-5">
                                    {otherPackages.map((pkg) => (
                                          <div key={pkg.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all group">
                                                <div className="relative h-40">
                                                      <Image src={pkg.image} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                      <div className="absolute bottom-3 left-3 right-3">
                                                            <h3 className="text-white font-bold">{pkg.name}</h3>
                                                            <div className="flex items-center gap-3 text-white/80 text-xs mt-1">
                                                                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{pkg.location}</span>
                                                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{pkg.duration}</span>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="p-4">
                                                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pkg.description}</p>
                                                      <div className="flex flex-wrap gap-1.5 mb-3">
                                                            {pkg.includes.slice(0, 3).map((item, i) => (
                                                                  <span key={i} className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-xs">{item}</span>
                                                            ))}
                                                      </div>
                                                      <div className="flex items-center justify-between">
                                                            <div className="text-amber-600 font-bold">
                                                                  <ConvertedPrice amount={pkg.priceFrom} fromCurrency="USD" />
                                                            </div>
                                                            <div className="flex items-center gap-1 text-sm">
                                                                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                                                                  <span className="font-medium">{pkg.rating}</span>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA Section */}
                  <section className="py-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        <div className="container mx-auto px-6 lg:px-8 text-center">
                              <Sparkles className="w-10 h-10 mx-auto mb-4 text-amber-200" />
                              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                                    Ready for Your Wellness Journey?
                              </h2>
                              <p className="text-amber-100 mb-8 max-w-xl mx-auto">
                                    Let us create a personalized wellness package tailored to your recovery needs.
                              </p>
                              <div className="flex flex-wrap justify-center gap-3">
                                    <Link
                                          href="/booking"
                                          className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                                    >
                                          Plan My Wellness Retreat
                                    </Link>
                                    <Link
                                          href="/telemedicine"
                                          className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
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
