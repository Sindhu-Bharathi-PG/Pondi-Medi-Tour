"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Bone, Baby, Eye, Brain, Stethoscope, Scissors, Activity, ChevronRight, Shield, Clock, DollarSign, Award, ArrowRight } from 'lucide-react';
import { Header, Footer } from '../components/common';
import { useScrolled } from '../hooks';

const ServicesPage = () => {
      const scrolled = useScrolled(50);

      const services = [
            {
                  id: 'orthopedics',
                  icon: Bone,
                  title: 'Orthopedics & Joint Replacement',
                  description: 'World-class joint replacement, spine surgery, and sports medicine with FRCS-trained surgeons.',
                  image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
                  procedures: ['Total Knee Replacement', 'Hip Replacement', 'Spine Surgery', 'ACL Reconstruction', 'Shoulder Arthroscopy'],
                  savings: '70%',
                  recovery: '14-21 days',
                  color: 'from-blue-600 to-cyan-500',
                  featured: true
            },
            {
                  id: 'ivf',
                  icon: Baby,
                  title: 'IVF & Fertility Treatment',
                  description: 'Advanced reproductive medicine with 60%+ success rates and compassionate care.',
                  image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800',
                  procedures: ['IVF Treatment', 'IUI', 'ICSI', 'Egg Freezing', 'Donor Programs'],
                  savings: '65%',
                  recovery: '2-3 weeks',
                  color: 'from-pink-600 to-rose-500',
                  featured: true
            },
            {
                  id: 'ophthalmology',
                  icon: Eye,
                  title: 'Eye Surgery & LASIK',
                  description: 'Leading eye care center with 15,000+ cataract surgeries annually at Aravind Eye Hospital.',
                  image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
                  procedures: ['Cataract Surgery', 'LASIK', 'Retina Treatment', 'Glaucoma Surgery', 'Cornea Transplant'],
                  savings: '80%',
                  recovery: '3-7 days',
                  color: 'from-teal-600 to-emerald-500',
                  featured: true
            },
            {
                  id: 'cardiology',
                  icon: Heart,
                  title: 'Cardiac Surgery',
                  description: 'Interventional cardiology and open-heart surgery at JIPMER with international protocols.',
                  image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800',
                  procedures: ['Bypass Surgery', 'Angioplasty', 'Valve Replacement', 'Pacemaker Implant', 'Heart Transplant'],
                  savings: '75%',
                  recovery: '4-6 weeks',
                  color: 'from-red-600 to-pink-500'
            },
            {
                  id: 'gastroenterology',
                  icon: Activity,
                  title: 'Gastroenterology & Bariatric',
                  description: 'Asia\'s premier GI center at GEM Hospital with laparoscopic expertise.',
                  image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800',
                  procedures: ['Bariatric Surgery', 'Laparoscopic Surgery', 'Liver Treatment', 'Colorectal Surgery', 'Endoscopy'],
                  savings: '70%',
                  recovery: '7-14 days',
                  color: 'from-orange-600 to-amber-500'
            },
            {
                  id: 'neurology',
                  icon: Brain,
                  title: 'Neurology & Neurosurgery',
                  description: 'Advanced brain and spine surgery with robotic assistance and minimally invasive techniques.',
                  image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
                  procedures: ['Brain Tumor Surgery', 'Spine Surgery', 'Epilepsy Surgery', 'Stroke Treatment', 'Deep Brain Stimulation'],
                  savings: '75%',
                  recovery: '2-4 weeks',
                  color: 'from-purple-600 to-indigo-500'
            },
            {
                  id: 'dental',
                  icon: Scissors,
                  title: 'Dental Care & Implants',
                  description: 'Full mouth rehabilitation, implants, and cosmetic dentistry at world-class clinics.',
                  image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800',
                  procedures: ['Dental Implants', 'Full Mouth Rehab', 'Veneers', 'Root Canal', 'Smile Makeover'],
                  savings: '60%',
                  recovery: '3-10 days',
                  color: 'from-cyan-600 to-blue-500'
            },
            {
                  id: 'oncology',
                  icon: Stethoscope,
                  title: 'Cancer Treatment',
                  description: 'Comprehensive oncology care with the latest chemotherapy and radiation protocols.',
                  image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
                  procedures: ['Chemotherapy', 'Radiation Therapy', 'Surgical Oncology', 'Immunotherapy', 'Palliative Care'],
                  savings: '65%',
                  recovery: 'Varies',
                  color: 'from-green-600 to-teal-500'
            },
      ];

      return (
            <div className="min-h-screen bg-white">
                  <Header scrolled={scrolled} />

                  {/* Hero Section */}
                  <section className="relative pt-32 pb-24 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900" />
                        <div className="absolute inset-0 opacity-20">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?w=1600')] bg-cover bg-center" />
                        </div>

                        <div className="relative container mx-auto px-4">
                              <div className="max-w-4xl mx-auto text-center text-white">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                                          <Award className="w-5 h-5 text-yellow-400" />
                                          <span className="text-sm font-medium">150+ Advanced Medical Procedures</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                          World-Class Treatments
                                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                                                Unmatched Value
                                          </span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-emerald-100 leading-relaxed max-w-3xl mx-auto">
                                          From complex surgeries to wellness therapies, experience international-standard care at 60-80% lower costs.
                                    </p>
                              </div>
                        </div>

                        {/* Stats floating cards */}
                        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2">
                              <div className="container mx-auto px-4">
                                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                          {[
                                                { icon: Shield, value: '150+', label: 'Procedures Offered' },
                                                { icon: DollarSign, value: '70%', label: 'Average Savings' },
                                                { icon: Clock, value: '24/7', label: 'Patient Support' },
                                          ].map((stat, index) => (
                                                <div key={index} className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4">
                                                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                                            <stat.icon className="w-7 h-7 text-white" />
                                                      </div>
                                                      <div>
                                                            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                                                            <div className="text-gray-600">{stat.label}</div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Featured Services */}
                  <section className="pt-32 pb-20">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          Our Most Sought-After Treatments
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Comprehensive medical services delivered by internationally trained specialists
                                    </p>
                              </div>

                              {/* Featured Grid */}
                              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                                    {services.filter(s => s.featured).map((service) => (
                                          <div
                                                key={service.id}
                                                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                                          >
                                                <div className="relative h-72 overflow-hidden">
                                                      <Image
                                                            src={service.image}
                                                            alt={service.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                      />
                                                      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
                                                      <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                                                  <service.icon className="w-8 h-8" />
                                                            </div>
                                                            <div>
                                                                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                                                  <p className="text-white/90">{service.description}</p>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="p-8">
                                                      <div className="flex items-center justify-between mb-6">
                                                            <div className="flex items-center gap-4">
                                                                  <div className="text-center">
                                                                        <div className="text-2xl font-bold text-emerald-600">{service.savings}</div>
                                                                        <div className="text-xs text-gray-500">Savings</div>
                                                                  </div>
                                                                  <div className="h-10 w-px bg-gray-200" />
                                                                  <div className="text-center">
                                                                        <div className="text-lg font-bold text-gray-800">{service.recovery}</div>
                                                                        <div className="text-xs text-gray-500">Recovery</div>
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      <div className="flex flex-wrap gap-2 mb-6">
                                                            {service.procedures.slice(0, 3).map((proc, i) => (
                                                                  <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                                        {proc}
                                                                  </span>
                                                            ))}
                                                            {service.procedures.length > 3 && (
                                                                  <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                                                                        +{service.procedures.length - 3} more
                                                                  </span>
                                                            )}
                                                      </div>

                                                      <Link
                                                            href={`/services/${service.id}`}
                                                            className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${service.color} flex items-center justify-center gap-2 hover:shadow-lg transition-all group-hover:gap-4`}
                                                      >
                                                            Explore Treatment
                                                            <ArrowRight className="w-5 h-5" />
                                                      </Link>
                                                </div>
                                          </div>
                                    ))}
                              </div>

                              {/* All Services */}
                              <div className="grid md:grid-cols-2 gap-8">
                                    {services.filter(s => !s.featured).map((service) => (
                                          <div
                                                key={service.id}
                                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex"
                                          >
                                                <div className="relative w-48 shrink-0">
                                                      <Image
                                                            src={service.image}
                                                            alt={service.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                      />
                                                      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-80`} />
                                                      <div className="absolute inset-0 flex items-center justify-center">
                                                            <service.icon className="w-12 h-12 text-white" />
                                                      </div>
                                                </div>
                                                <div className="flex-1 p-6">
                                                      <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                                                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                                      <div className="flex items-center gap-4 mb-4 text-sm">
                                                            <span className="text-emerald-600 font-semibold">Save {service.savings}</span>
                                                            <span className="text-gray-300">|</span>
                                                            <span className="text-gray-500">Recovery: {service.recovery}</span>
                                                      </div>
                                                      <Link
                                                            href={`/services/${service.id}`}
                                                            className="text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                                                      >
                                                            Learn More
                                                            <ChevronRight className="w-5 h-5" />
                                                      </Link>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Why Choose Us */}
                  <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                          Why Medical Tourists Choose Pondicherry
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Combining world-class medical care with a unique healing environment
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-4 gap-8">
                                    {[
                                          { value: '60-80%', label: 'Cost Savings', desc: 'Compared to US/UK prices' },
                                          { value: '99.2%', label: 'Success Rate', desc: 'Across all procedures' },
                                          { value: '0', label: 'Wait Time', desc: 'Immediate scheduling' },
                                          { value: '24/7', label: 'Support', desc: 'Multilingual assistance' },
                                    ].map((item, index) => (
                                          <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2">
                                                <div className="text-4xl font-bold text-emerald-600 mb-2">{item.value}</div>
                                                <div className="text-xl font-semibold text-gray-800 mb-1">{item.label}</div>
                                                <div className="text-gray-500">{item.desc}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Ready to Start Your Treatment Journey?
                              </h2>
                              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                                    Get a free cost estimate and personalized treatment plan within 24 hours.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link
                                          href="/cost-calculator"
                                          className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                    >
                                          Get Cost Estimate
                                    </Link>
                                    <Link
                                          href="/booking"
                                          className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                                    >
                                          Book Consultation
                                    </Link>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default ServicesPage;
