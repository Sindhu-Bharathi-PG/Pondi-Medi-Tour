"use client";

import { useQuote } from '@/app/context/QuoteContext';
import { API_BASE } from '@/app/hooks/useApi';
import { Award, CheckCircle, Globe, Heart, MapPin, Phone, Shield, Star, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../components/common';
import { useScrolled } from '../hooks';

const AboutPage = () => {
      const scrolled = useScrolled(50);
      const { openQuoteWidget } = useQuote();
      const [dynamicStats, setDynamicStats] = useState({
            totalHospitals: 10, // Default fallback
            totalUsers: 5000,
            loading: true
      });

      // Fetch real stats from database
      useEffect(() => {
            const fetchStats = async () => {
                  try {
                        const res = await fetch(`${API_BASE}/api/hospitals`);
                        if (res.ok) {
                              const hospitals = await res.json();
                              const count = Array.isArray(hospitals) ? hospitals.length : (hospitals.hospitals?.length || 0);
                              setDynamicStats({
                                    totalHospitals: count > 0 ? count : 10, // Use 10 as minimum fallback
                                    totalUsers: 5000,
                                    loading: false
                              });
                        } else {
                              // API failed, use defaults
                              setDynamicStats(prev => ({ ...prev, loading: false }));
                        }
                  } catch (error) {
                        console.error('Failed to fetch stats:', error);
                        setDynamicStats(prev => ({ ...prev, loading: false }));
                  }
            };
            fetchStats();
      }, []);

      const stats = [
            { value: '5M+', label: 'Medical Tourists Annually', icon: Users },
            { value: '70%', label: 'Cost Savings vs West', icon: Award },
            { value: dynamicStats.loading ? '...' : `${dynamicStats.totalHospitals}+`, label: 'Partner Hospitals', icon: Heart },
            { value: '150+', label: 'Countries Trust India', icon: Globe },
      ];

      const values = [
            {
                  icon: Shield,
                  title: 'Global Accreditation',
                  description: 'Over 500 JCI-accredited hospitals and thousands of NABH-certified facilities ensure world-class safety standards.'
            },
            {
                  icon: Heart,
                  title: 'Expertise & Innovation',
                  description: 'US/UK-trained doctors, cutting-edge technology, and pioneering treatments in cardiac care, oncology, and orthopedics.'
            },
            {
                  icon: Globe,
                  title: 'Holistic Healing',
                  description: 'Combine modern medicine with ancient wellness traditions—Ayurveda, Yoga, and meditation for complete recovery.'
            },
            {
                  icon: Award,
                  title: 'Zero Wait Times',
                  description: 'Skip months-long queues. Get immediate consultations, rapid diagnostics, and same-week surgeries.'
            },
      ];

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* Hero Section - Unique: Our Mission */}
                  <section className="relative pt-24 md:pt-24 md:pb-24 overflow-hidden hero-premium">
                        <div className="absolute inset-0 opacity-15">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600')] bg-cover bg-center" />
                        </div>

                        <div className="relative container-premium">
                              {/* Breadcrumb */}
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <a href="/" className="hover:text-white">Home</a>
                                    <span className="mx-2">/</span>
                                    <span className="text-white">About Us</span>
                              </nav>

                              <div className="max-w-4xl mx-auto">
                                    <div className="gov-seal mb-6">
                                          <span>Government-Recognized Portal</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                                          Our Mission:
                                          <span className="block text-[#bf9b30]">
                                                Accessible World-Class Care
                                          </span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
                                          Connecting international patients with India&apos;s finest healthcare institutions. Save up to 70% while receiving internationally accredited care in serene coastal settings.
                                    </p>
                              </div>
                        </div>

                        {/* Wave decoration */}
                        <div className="absolute bottom-0 left-0 right-0">
                              <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H0Z" fill="var(--medical-cream)" />
                              </svg>
                        </div>
                  </section>

                  {/* Mission Stats Section */}
                  <section className="py-12 relative z-10">
                        <div className="container-premium">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {stats.map((stat, index) => (
                                          <div
                                                key={index}
                                                className="card-premium p-6 text-center"
                                          >
                                                <div className="w-12 h-12 mx-auto mb-3 bg-[var(--medical-light-teal)] rounded-xl flex items-center justify-center">
                                                      <stat.icon className="w-6 h-6 text-[var(--medical-teal)]" />
                                                </div>
                                                <div className="text-2xl font-bold text-[var(--medical-navy)] mb-1">{stat.value}</div>
                                                <div className="text-sm text-[var(--medical-slate)]">{stat.label}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Why India Section */}
                  <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6">
                                          <Globe className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Why India?</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                          The World&apos;s Premier
                                          <span className="text-emerald-600"> Medical Tourism Hub</span>
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          India has emerged as the global leader in affordable, high-quality healthcare—attracting over 5 million medical tourists annually from 150+ countries.
                                    </p>
                              </div>

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
                                                <div className="text-3xl font-bold">{dynamicStats.loading ? '...' : `${dynamicStats.totalHospitals}+`}</div>
                                                <div className="text-emerald-100">Partner Hospitals</div>
                                          </div>
                                    </div>

                                    <div>
                                          <h3 className="text-3xl font-bold text-gray-800 mb-6">Unmatched Value Without Compromise</h3>
                                          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                                Heart surgery in the US costs $100,000+. In India? $5,000—same equipment, same training, same outcomes. Hip replacements, cancer treatments, cosmetic procedures—all 60-90% cheaper than Western prices.
                                          </p>
                                          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                                But it&apos;s not just about savings. India boasts over 500 JCI-accredited hospitals (more than most countries combined), equipped with the latest robotic surgery systems, proton therapy, and AI diagnostics. Doctors trained at Johns Hopkins, Mayo Clinic, and Oxford bring global expertise home.
                                          </p>

                                          <div className="space-y-4">
                                                {[
                                                      '90% cost savings on major surgeries',
                                                      'No wait times—immediate treatment',
                                                      '5000+ English-speaking specialists',
                                                      'Medical visa in 72 hours'
                                                ].map((item, index) => (
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
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Patients Choose India</h2>
                                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                                          The perfect combination of expertise, technology, affordability, and healing traditions.
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

                  {/* Benefits Comparison Section */}
                  <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6">
                                          <Award className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Real Savings</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                          See the Difference for Yourself
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                          Same procedures, same quality—dramatically different prices.
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                    {[
                                          { procedure: 'Heart Bypass Surgery', usa: '$120,000', india: '$7,000', savings: '94%' },
                                          { procedure: 'Hip Replacement', usa: '$40,000', india: '$7,500', savings: '81%' },
                                          { procedure: 'IVF Treatment', usa: '$15,000', india: '$3,000', savings: '80%' },
                                          { procedure: 'Dental Implants', usa: '$4,000', india: '$800', savings: '80%' },
                                          { procedure: 'Cosmetic Surgery', usa: '$10,000', india: '$2,500', savings: '75%' },
                                          { procedure: 'Spine Surgery', usa: '$60,000', india: '$9,000', savings: '85%' },
                                    ].map((item, index) => (
                                          <div
                                                key={index}
                                                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                          >
                                                <h3 className="text-lg font-bold text-gray-800 mb-4">{item.procedure}</h3>
                                                <div className="space-y-3 mb-4">
                                                      <div className="flex justify-between items-center">
                                                            <span className="text-gray-600">USA:</span>
                                                            <span className="font-bold text-red-600 line-through">{item.usa}</span>
                                                      </div>
                                                      <div className="flex justify-between items-center">
                                                            <span className="text-gray-600">India:</span>
                                                            <span className="font-bold text-emerald-600 text-xl">{item.india}</span>
                                                      </div>
                                                </div>
                                                <div className="bg-emerald-100 text-emerald-700 rounded-lg px-3 py-2 text-center font-bold">
                                                      Save {item.savings}
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Why Pondicherry Section */}
                  <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
                                          <MapPin className="w-4 h-4" />
                                          <span className="text-sm font-semibold">Why Pondicherry?</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                          India&apos;s Hidden Gem for
                                          <span className="text-emerald-600"> Medical Tourism</span>
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                          While cities like Delhi and Mumbai are crowded medical hubs, Pondicherry offers the perfect escape—world-class healthcare meets tranquil coastal healing.
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 gap-16 items-center">
                                    <div>
                                          <h3 className="text-3xl font-bold text-gray-800 mb-6">The Perfect Recovery Destination</h3>
                                          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                                Imagine recovering from surgery not in a sterile hospital ward, but in a UNESCO-listed French colonial town with pristine beaches, yoga ashrams, and Ayurvedic spas. That&apos;s Pondicherry.
                                          </p>
                                          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                                Just 3 hours from Chennai International Airport, Pondicherry blends NABH-accredited hospitals with healing infrastructure you won&apos;t find elsewhere—Auroville wellness centers, beachfront recovery resorts, and a slower pace that accelerates healing.
                                          </p>

                                          <div className="grid grid-cols-2 gap-6">
                                                {[
                                                      { icon: Star, label: 'UNESCO Heritage', sublabel: 'French charm + serenity' },
                                                      { icon: Award, label: 'Top Hospitals', sublabel: 'NABH-certified care' },
                                                      { icon: Heart, label: 'Holistic Healing', sublabel: 'Ayurveda + Yoga hubs' },
                                                      { icon: Globe, label: 'Beach Therapy', sublabel: 'Coastal recovery bliss' },
                                                ].map((item, index) => (
                                                      <div key={index} className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                                                                  <item.icon className="w-6 h-6 text-white" />
                                                            </div>
                                                            <div className="font-bold text-gray-800 mb-1">{item.label}</div>
                                                            <div className="text-sm text-gray-600">{item.sublabel}</div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    <div className="relative">
                                          <Image
                                                src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800"
                                                alt="Pondicherry beach"
                                                width={600}
                                                height={500}
                                                className="rounded-2xl shadow-2xl object-cover"
                                          />
                                          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-8">
                                                <div className="flex items-center gap-4">
                                                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                                            <MapPin className="w-7 h-7 text-white" />
                                                      </div>
                                                      <div>
                                                            <div className="text-3xl font-bold text-gray-800">3hr</div>
                                                            <div className="text-gray-600">from Chennai Airport</div>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="absolute -top-6 -right-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
                                                <div className="text-2xl font-bold">40% Less</div>
                                                <div className="text-emerald-100">than big cities</div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* CTA Section */}
                  <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Ready to Experience India&apos;s Healthcare Excellence?
                              </h2>
                              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Get a free consultation, personalized treatment plan, and transparent cost estimate—all within 24 hours.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <button
                                          onClick={() => openQuoteWidget({ source: 'about-page' })}
                                          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                    >
                                          Get Free Consultation
                                    </button>
                                    <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                                          <Phone className="w-5 h-5" />
                                          Talk to Specialist
                                    </button>
                              </div>
                              <p className="mt-8 text-emerald-300">
                                    ✓ No obligations &nbsp;•&nbsp; ✓ Medical visa assistance &nbsp;•&nbsp; ✓ Transparent pricing
                              </p>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default AboutPage;
