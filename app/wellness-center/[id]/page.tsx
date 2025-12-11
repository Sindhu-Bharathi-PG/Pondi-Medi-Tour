"use client";

import { motion } from 'framer-motion';
import {
      ArrowLeft, Award, Building2, Calendar, Camera, CheckCircle, ChevronRight,
      Clock, Heart, Leaf, Mail, MapPin, Phone, Quote, Sparkles, Star,
      Users, X, Globe
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Footer, Header } from '../../components/common';
import { wellnessCenters } from '../../data/wellness-centers';

export default function WellnessCenterDetailPage() {
      const params = useParams();
      const centerId = params?.id as string;
      const center = wellnessCenters.find(c => c.id.toString() === centerId);
      const [selectedImage, setSelectedImage] = useState<string | null>(null);

      if (!center) {
            return (
                  <div className="min-h-screen bg-amber-50/30">
                        <Header />
                        <div className="container mx-auto px-4 py-32 text-center">
                              <Leaf className="w-16 h-16 mx-auto mb-4 text-amber-400" />
                              <h1 className="text-4xl font-bold text-gray-800 mb-4">Center Not Found</h1>
                              <p className="text-gray-600 mb-8">The wellness center you're looking for doesn't exist.</p>
                              <Link href="/wellness-center" className="text-amber-600 hover:underline inline-flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Wellness Centers
                              </Link>
                        </div>
                        <Footer />
                  </div>
            );
      }

      // Get similar centers (same type or overlapping specialties)
      const similarCenters = wellnessCenters
            .filter(c => c.id !== center.id && (
                  c.type === center.type ||
                  c.specialties.some(s => center.specialties.includes(s))
            ))
            .slice(0, 3);

      return (
            <div className="min-h-screen bg-amber-50/30">
                  <Header />

                  {/* Hero Section */}
                  <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative pt-24 pb-20 overflow-hidden"
                  >
                        <div className="absolute inset-0">
                              <Image
                                    src={center.heroImage}
                                    alt={center.name}
                                    fill
                                    className="object-cover"
                                    priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-orange-800/85 to-transparent" />
                        </div>

                        <div className="relative container mx-auto px-6 lg:px-8">
                              <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                              >
                                    <Link href="/wellness-center" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                                          <ArrowLeft className="w-5 h-5" />
                                          Back to Wellness Centers
                                    </Link>
                              </motion.div>

                              <div className="max-w-4xl">
                                    <motion.div
                                          initial={{ y: 30, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.3 }}
                                          className="flex flex-wrap gap-2 mb-4"
                                    >
                                          {center.accreditation.map((acc, i) => (
                                                <span key={i} className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                      {acc}
                                                </span>
                                          ))}
                                          <span className={`backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium ${center.type === 'Government'
                                                      ? 'bg-blue-500/80'
                                                      : center.type === 'Ashram'
                                                            ? 'bg-purple-500/80'
                                                            : center.type === 'Community'
                                                                  ? 'bg-green-500/80'
                                                                  : 'bg-white/20'
                                                }`}>
                                                {center.type}
                                          </span>
                                    </motion.div>

                                    <motion.h1
                                          initial={{ y: 30, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.4 }}
                                          className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
                                    >
                                          {center.name}
                                    </motion.h1>
                                    <motion.p
                                          initial={{ y: 30, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.5 }}
                                          className="text-xl text-amber-100 mb-6"
                                    >
                                          {center.fullName}
                                    </motion.p>
                                    <motion.p
                                          initial={{ y: 30, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.6 }}
                                          className="text-lg text-white/90 mb-8 max-w-3xl"
                                    >
                                          {center.description}
                                    </motion.p>

                                    <motion.div
                                          initial={{ y: 30, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.7 }}
                                          className="flex flex-wrap items-center gap-6 text-white"
                                    >
                                          <div className="flex items-center gap-2">
                                                <Star className="w-5 h-5 text-amber-400 fill-current" />
                                                <span className="font-bold">{center.rating}</span>
                                                <span className="text-white/70">({center.reviewsCount} reviews)</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                                <MapPin className="w-5 h-5" />
                                                <span>{center.location}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5" />
                                                <span>Est. {center.established}</span>
                                          </div>
                                    </motion.div>
                              </div>
                        </div>
                  </motion.section>

                  {/* Stats Bar */}
                  {center.stats && (
                        <section className="bg-white shadow-lg relative z-10 -mt-4">
                              <div className="container mx-auto px-6 lg:px-8 py-8">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                          {center.stats.map((stat, i) => (
                                                <motion.div
                                                      key={i}
                                                      initial={{ scale: 0, opacity: 0 }}
                                                      animate={{ scale: 1, opacity: 1 }}
                                                      transition={{ delay: 0.8 + i * 0.1 }}
                                                      className="text-center group hover:scale-105 transition-transform"
                                                >
                                                      <stat.icon className="w-10 h-10 mx-auto mb-2 text-amber-500 group-hover:text-amber-600 transition-colors" />
                                                      <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                                                      <div className="text-sm text-gray-600">{stat.label}</div>
                                                </motion.div>
                                          ))}
                                    </div>
                              </div>
                        </section>
                  )}

                  {/* Quick Actions */}
                  <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-6">
                        <div className="container mx-auto px-6 lg:px-8">
                              <div className="flex flex-wrap gap-4 justify-center">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Link
                                                href="/booking"
                                                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                                          >
                                                <Calendar className="w-5 h-5" />
                                                Book Consultation
                                          </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <a
                                                href={`tel:${center.contact.phone}`}
                                                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                                          >
                                                <Phone className="w-5 h-5" />
                                                Call Now
                                          </a>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <a
                                                href={center.contact.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white border-2 border-amber-500 text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-all flex items-center gap-2"
                                          >
                                                <Globe className="w-5 h-5" />
                                                Visit Website
                                          </a>
                                    </motion.div>
                              </div>
                        </div>
                  </section>

                  {/* Image Gallery */}
                  {center.gallery.length > 0 && (
                        <section className="py-12 bg-white">
                              <div className="container mx-auto px-6 lg:px-8">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                          <Camera className="w-7 h-7 text-amber-500" />
                                          Photo Gallery
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                          {center.gallery.map((img, i) => (
                                                <motion.div
                                                      key={i}
                                                      initial={{ opacity: 0, scale: 0.8 }}
                                                      animate={{ opacity: 1, scale: 1 }}
                                                      transition={{ delay: i * 0.1 }}
                                                      whileHover={{ scale: 1.05 }}
                                                      className="relative h-48 rounded-xl overflow-hidden cursor-pointer group"
                                                      onClick={() => setSelectedImage(img)}
                                                >
                                                      <Image
                                                            src={img}
                                                            alt={`${center.name} gallery ${i + 1}`}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                      />
                                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                            <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                      </div>
                                                </motion.div>
                                          ))}
                                    </div>
                              </div>
                        </section>
                  )}

                  {/* Image Modal */}
                  {selectedImage && (
                        <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                              onClick={() => setSelectedImage(null)}
                        >
                              <div className="relative max-w-4xl w-full h-[80vh]">
                                    <Image
                                          src={selectedImage}
                                          alt="Gallery image"
                                          fill
                                          className="object-contain"
                                    />
                                    <button
                                          onClick={() => setSelectedImage(null)}
                                          className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                                    >
                                          <X className="w-6 h-6" />
                                    </button>
                              </div>
                        </motion.div>
                  )}

                  {/* Main Content */}
                  <section className="py-16 bg-amber-50/30">
                        <div className="container mx-auto px-6 lg:px-8">
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
                                                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                      <Heart className="w-7 h-7 text-amber-500" />
                                                      About {center.name}
                                                </h2>
                                                <p className="text-gray-600 leading-relaxed mb-6">{center.about}</p>

                                                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Highlights</h3>
                                                <div className="grid md:grid-cols-2 gap-3">
                                                      {center.highlights.map((highlight, i) => (
                                                            <motion.div
                                                                  key={i}
                                                                  initial={{ x: -20, opacity: 0 }}
                                                                  whileInView={{ x: 0, opacity: 1 }}
                                                                  viewport={{ once: true }}
                                                                  transition={{ delay: i * 0.05 }}
                                                                  className="flex items-start gap-2"
                                                            >
                                                                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                                  <span className="text-gray-700">{highlight}</span>
                                                            </motion.div>
                                                      ))}
                                                </div>
                                          </motion.div>

                                          {/* AYUSH Specialties */}
                                          <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-2xl shadow-lg p-8"
                                          >
                                                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                                      <Leaf className="w-7 h-7 text-green-600" />
                                                      AYUSH Specialties
                                                </h2>
                                                <div className="flex flex-wrap gap-3">
                                                      {center.specialties.map((specialty, i) => (
                                                            <motion.span
                                                                  key={i}
                                                                  initial={{ scale: 0 }}
                                                                  whileInView={{ scale: 1 }}
                                                                  viewport={{ once: true }}
                                                                  transition={{ delay: i * 0.05 }}
                                                                  whileHover={{ scale: 1.1 }}
                                                                  className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-green-100 transition-colors"
                                                            >
                                                                  {specialty}
                                                            </motion.span>
                                                      ))}
                                                </div>
                                          </motion.div>

                                          {/* Therapies */}
                                          <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-gradient-to-br from-amber-600 to-orange-500 rounded-2xl shadow-lg p-8 text-white"
                                          >
                                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                                      <Sparkles className="w-6 h-6" />
                                                      Available Therapies
                                                </h2>
                                                <p className="text-white/80 mb-6">
                                                      Explore the traditional healing therapies available at this center.
                                                </p>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                      {center.therapies.map((therapy, i) => (
                                                            <div
                                                                  key={i}
                                                                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg text-center font-medium transition-all"
                                                            >
                                                                  {therapy}
                                                            </div>
                                                      ))}
                                                </div>
                                          </motion.div>

                                          {/* Facilities */}
                                          <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-2xl shadow-lg p-8"
                                          >
                                                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                                      <Building2 className="w-7 h-7 text-amber-500" />
                                                      Facilities & Amenities
                                                </h2>
                                                <div className="grid md:grid-cols-2 gap-3">
                                                      {center.facilities.map((facility, i) => (
                                                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                                  <CheckCircle className="w-5 h-5 text-amber-500" />
                                                                  <span className="text-gray-700">{facility}</span>
                                                            </div>
                                                      ))}
                                                </div>
                                          </motion.div>
                                    </div>

                                    {/* Right Column - Sidebar */}
                                    <div className="space-y-6">
                                          {/* Contact Card */}
                                          <motion.div
                                                initial={{ x: 50, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
                                          >
                                                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                                                <div className="space-y-4">
                                                      <a href={`tel:${center.contact.phone}`} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                                            <Phone className="w-5 h-5 text-green-600" />
                                                            <div>
                                                                  <div className="text-sm text-gray-500">Phone</div>
                                                                  <div className="font-semibold text-gray-800">{center.contact.phone}</div>
                                                            </div>
                                                      </a>
                                                      <a href={`mailto:${center.contact.email}`} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                                                            <Mail className="w-5 h-5 text-amber-600" />
                                                            <div>
                                                                  <div className="text-sm text-gray-500">Email</div>
                                                                  <div className="font-semibold text-gray-800 text-sm">{center.contact.email}</div>
                                                            </div>
                                                      </a>
                                                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                            <MapPin className="w-5 h-5 text-gray-600" />
                                                            <div>
                                                                  <div className="text-sm text-gray-500">Location</div>
                                                                  <div className="font-semibold text-gray-800">{center.location}</div>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="mt-6 space-y-3">
                                                      <Link
                                                            href="/booking"
                                                            className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                                                      >
                                                            Book Consultation
                                                      </Link>
                                                      <a
                                                            href={center.contact.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                                                      >
                                                            Visit Website
                                                      </a>
                                                </div>
                                          </motion.div>

                                          {/* Similar Centers */}
                                          {similarCenters.length > 0 && (
                                                <motion.div
                                                      initial={{ x: 50, opacity: 0 }}
                                                      whileInView={{ x: 0, opacity: 1 }}
                                                      viewport={{ once: true }}
                                                      className="bg-white rounded-2xl shadow-lg p-6"
                                                >
                                                      <h3 className="text-xl font-bold text-gray-800 mb-4">Similar Centers</h3>
                                                      <div className="space-y-4">
                                                            {similarCenters.map((similar) => (
                                                                  <Link
                                                                        key={similar.id}
                                                                        href={`/wellness-center/${similar.id}`}
                                                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors group"
                                                                  >
                                                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                                              <Image
                                                                                    src={similar.image}
                                                                                    alt={similar.name}
                                                                                    fill
                                                                                    className="object-cover"
                                                                              />
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                              <h4 className="font-semibold text-gray-800 group-hover:text-amber-600 transition-colors truncate">
                                                                                    {similar.name}
                                                                              </h4>
                                                                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                                                                    <Star className="w-3 h-3 text-amber-500 fill-current" />
                                                                                    {similar.rating}
                                                                              </div>
                                                                        </div>
                                                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500" />
                                                                  </Link>
                                                            ))}
                                                      </div>
                                                </motion.div>
                                          )}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* CTA Section */}
                  <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-500 text-white">
                        <div className="container mx-auto px-6 lg:px-8 text-center">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                              >
                                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-green-200" />
                                    <h2 className="text-4xl font-bold mb-4">
                                          Ready to Begin Your Healing Journey?
                                    </h2>
                                    <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                                          Connect with our wellness coordinators to plan your AYUSH therapy experience at {center.name}.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                          <Link
                                                href="/booking"
                                                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                          >
                                                Book Your Consultation
                                          </Link>
                                          <Link
                                                href="/wellness-center"
                                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                                          >
                                                Explore More Centers
                                          </Link>
                                    </div>
                              </motion.div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
