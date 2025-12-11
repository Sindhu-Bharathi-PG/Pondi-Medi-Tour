"use client";

import React from 'react';
import Image from 'next/image';
import { Award, Users, Heart, Globe, Shield, Clock, Star, CheckCircle, MapPin, Phone, Mail } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const AboutPage = () => {
      const scrolled = useScrolled(50);

      const stats = [
            { value: '15,000+', label: 'Successful Treatments', icon: Heart },
            { value: '50+', label: 'Partner Hospitals', icon: Award },
            { value: '200+', label: 'Specialist Doctors', icon: Users },
            { value: '45+', label: 'Countries Served', icon: Globe },
      ];

      const values = [
            {
                  icon: Shield,
                  title: 'Patient Safety First',
                  description: 'Every hospital in our network is NABH-accredited, ensuring the highest standards of safety and care.'
            },
            {
                  icon: Heart,
                  title: 'Compassionate Care',
                  description: 'We understand the emotional journey of seeking medical treatment. Our team provides 24/7 support and guidance.'
            },
            {
                  icon: Globe,
                  title: 'Global Standards',
                  description: 'Our doctors are trained at world-renowned institutions, bringing international expertise to Pondicherry.'
            },
            {
                  icon: Clock,
                  title: 'Seamless Experience',
                  description: 'From visa assistance to post-surgery care, we handle every detail so you can focus on healing.'
            },
      ];

      const team = [
            {
                  name: 'Dr. Rajesh Kumar',
                  role: 'Medical Director',
                  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
                  credentials: 'MBBS, MD, FRCS (UK)'
            },
            {
                  name: 'Priya Venkatesh',
                  role: 'Chief Patient Coordinator',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
                  credentials: 'MBA, Healthcare Management'
            },
            {
                  name: 'Mohamed Faizal',
                  role: 'International Relations Head',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                  credentials: 'MS, International Business'
            },
      ];

      return (
            <div className="min-h-screen bg-white">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative pt-32 pb-20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900" />
                        <div className="absolute inset-0 opacity-20">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600')] bg-cover bg-center" />
                        </div>

                        <div className="relative container mx-auto px-4">
                              <div className="max-w-4xl mx-auto text-center text-white">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <Award className="w-5 h-5 text-yellow-400" />
                                          <span className="text-sm font-medium">Trusted by 15,000+ Patients Worldwide</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                          Your Health Journey,
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                                                Our Sacred Mission
                                          </span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-emerald-100 leading-relaxed max-w-3xl mx-auto">
                                          We are the official facilitators connecting global patients to Pondicherry's healthcare ecosystem. We bridge the gap between you and the doctors, handling the logistics so you can focus on getting better.
                                    </p>
                              </div>
                        </div>

                        {/* Wave decoration */}
                        <div className="absolute bottom-0 left-0 right-0">
                              <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                              </svg>
                        </div>
                  </section>

                  {/* Stats Section */}
                  <section className="py-16 -mt-8 relative z-10">
                        <div className="container mx-auto px-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {stats.map((stat, index) => (
                                          <div
                                                key={index}
                                                className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                          >
                                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                                                      <stat.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                                                <div className="text-gray-600 font-medium">{stat.label}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Story Section */}
                  <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-16 items-center">
                                    <div className="relative">
                                          <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-50 blur-3xl" />
                                          <div className="relative grid grid-cols-2 gap-4">
                                                <Image
                                                      src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600"
                                                      alt="Medical facility"
                                                      width={300}
                                                      height={400}
                                                      className="rounded-2xl shadow-xl object-cover h-80"
                                                />
                                                <Image
                                                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600"
                                                      alt="Doctor consultation"
                                                      width={300}
                                                      height={400}
                                                      className="rounded-2xl shadow-xl object-cover h-80 mt-8"
                                                />
                                          </div>
                                          <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-emerald-600 to-teal-600 text-white p-6 rounded-2xl shadow-xl">
                                                <div className="text-3xl font-bold">10+</div>
                                                <div className="text-emerald-100">Years of Excellence</div>
                                          </div>
                                    </div>

                                    <div>
                                          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6">
                                                <Heart className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Our Story</span>
                                          </div>
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                                                Where French Heritage Meets
                                                <span className="text-emerald-600"> Medical Innovation</span>
                                          </h2>
                                          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                                Founded in the heart of Pondicherry, Pondy HealthPort was born from a simple vision:
                                                to combine the world&apos;s best medical expertise with the unique healing environment
                                                that only our French-Indian coastal town can offer.
                                          </p>
                                          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                                Today, we&apos;re proud to serve patients from over 45 countries, offering everything
                                                from complex surgeries to rejuvenating wellness retreats—all at a fraction of
                                                Western costs without compromising on quality.
                                          </p>

                                          <div className="space-y-4">
                                                {['NABH & JCI Accredited Network', 'Internationally Trained Surgeons', 'Complete Visa & Travel Assistance', 'Luxury Recovery Accommodations'].map((item, index) => (
                                                      <div key={index} className="flex items-center gap-3">
                                                            <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                                                            <span className="text-gray-700 font-medium">{item}</span>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Values Section */}
                  <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">What Drives Us</h2>
                                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                                          Our values aren&apos;t just words—they&apos;re the foundation of every patient interaction.
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {values.map((value, index) => (
                                          <div
                                                key={index}
                                                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
                                          >
                                                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                                      <value.icon className="w-7 h-7 text-yellow-300" />
                                                </div>
                                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                                <p className="text-emerald-100 leading-relaxed">{value.description}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Team Section */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6">
                                          <Users className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Leadership Team</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Meet the Experts Behind Your Care
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Our leadership combines decades of medical and healthcare management expertise.
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                    {team.map((member, index) => (
                                          <div
                                                key={index}
                                                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                                          >
                                                <div className="relative h-80 overflow-hidden">
                                                      <Image
                                                            src={member.image}
                                                            alt={member.name}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                            <h3 className="text-2xl font-bold">{member.name}</h3>
                                                            <p className="text-emerald-300">{member.role}</p>
                                                      </div>
                                                </div>
                                                <div className="p-6">
                                                      <p className="text-gray-600">{member.credentials}</p>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Why Pondicherry Section */}
                  <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="grid md:grid-cols-2 gap-16 items-center">
                                    <div>
                                          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Why Pondicherry?</span>
                                          </div>
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                                                The Perfect Destination for
                                                <span className="text-emerald-600"> Healing & Recovery</span>
                                          </h2>
                                          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                                Pondicherry offers a unique blend of French colonial charm,
                                                spiritual serenity, and world-class healthcare infrastructure.
                                                It&apos;s not just a medical trip—it&apos;s a healing journey.
                                          </p>

                                          <div className="grid grid-cols-2 gap-6">
                                                {[
                                                      { icon: Star, label: 'Tranquil Beaches' },
                                                      { icon: Award, label: 'NABH Hospitals' },
                                                      { icon: Globe, label: 'French Heritage' },
                                                      { icon: Heart, label: 'Auroville Wellness' },
                                                ].map((item, index) => (
                                                      <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-md">
                                                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                                  <item.icon className="w-5 h-5 text-emerald-600" />
                                                            </div>
                                                            <span className="font-medium text-gray-700">{item.label}</span>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    <div className="relative">
                                          <Image
                                                src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800"
                                                alt="Pondicherry"
                                                width={600}
                                                height={500}
                                                className="rounded-2xl shadow-2xl object-cover"
                                          />
                                          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6">
                                                <div className="flex items-center gap-4">
                                                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                                            <Globe className="w-6 h-6 text-white" />
                                                      </div>
                                                      <div>
                                                            <div className="text-2xl font-bold text-gray-800">70%</div>
                                                            <div className="text-gray-600">Cost Savings</div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* CTA Section */}
                  <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Ready to Start Your Healing Journey?
                              </h2>
                              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Get a free consultation and personalized treatment plan from our expert team.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                          Get Free Consultation
                                    </button>
                                    <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                                          <Phone className="w-5 h-5" />
                                          Call Us Now
                                    </button>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default AboutPage;
