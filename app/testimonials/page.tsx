"use client";

import { Footer, Header } from '@/app/components/common';
import { useQuote } from '@/app/context/QuoteContext';
import { useScrolled } from '@/app/hooks';
import { ChevronRight, MapPin, Play, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const TestimonialsPage = () => {
      const scrolled = useScrolled(50);
      const { openQuoteWidget } = useQuote();
      const [activeVideo, setActiveVideo] = useState<string | null>(null);
      const [activeFilter, setActiveFilter] = useState('all');

      const testimonials = [
            {
                  id: 1,
                  name: 'John Davidson',
                  location: 'California, USA',
                  treatment: 'Total Knee Replacement',
                  hospital: 'POSH Hospital',
                  date: 'October 2024',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                  rating: 5,
                  quote: 'I saved over $40,000 compared to US prices. My surgeon was FRCS-trained from Glasgow, and the care was exceptional. The recovery retreat overlooking the Bay of Bengal was the highlight of my healing journey.',
                  savings: '$42,000',
                  category: 'orthopedics',
                  hasVideo: true,
                  featured: true
            },
            {
                  id: 2,
                  name: 'Sarah & Michael Chen',
                  location: 'Singapore',
                  treatment: 'IVF Treatment',
                  hospital: 'Indira IVF Centre',
                  date: 'September 2024',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
                  rating: 5,
                  quote: 'After 3 failed attempts in Singapore, we tried Pondicherry. Dr. Ramya was incredibly supportive. We\'re now expecting twins! The peaceful environment and lower stress definitely helped.',
                  savings: '$12,000',
                  category: 'fertility',
                  hasVideo: true,
                  featured: true
            },
            {
                  id: 3,
                  name: 'Ahmed Al-Rashid',
                  location: 'Dubai, UAE',
                  treatment: 'Cardiac Bypass Surgery',
                  hospital: 'JIPMER',
                  date: 'August 2024',
                  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
                  rating: 5,
                  quote: 'World-class cardiac care at JIPMER saved my life. The team handled everything from visa to recovery. The combination of medical expertise and the healing coastal environment exceeded all my expectations.',
                  savings: '$85,000',
                  category: 'cardiology',
                  hasVideo: false,
                  featured: true
            },
            {
                  id: 4,
                  name: 'Emma Thompson',
                  location: 'London, UK',
                  treatment: 'Cataract Surgery',
                  hospital: 'Aravind Eye Hospital',
                  date: 'November 2024',
                  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
                  rating: 5,
                  quote: 'Aravind Eye Hospital is truly world-renowned. 20-minute surgery, perfect vision, and a lovely week exploring French colonial Pondicherry. Worth every mile traveled!',
                  savings: '$8,000',
                  category: 'ophthalmology',
                  hasVideo: false,
                  featured: false
            },
            {
                  id: 5,
                  name: 'James Wilson',
                  location: 'Sydney, Australia',
                  treatment: 'Bariatric Surgery',
                  hospital: 'GEM Hospital',
                  date: 'July 2024',
                  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
                  rating: 5,
                  quote: 'Lost 45kg since my sleeve gastrectomy at GEM Hospital. The laparoscopic expertise here is among the best in Asia. Plus, recovering on the beach was incredible motivation!',
                  savings: '$22,000',
                  category: 'gastro',
                  hasVideo: true,
                  featured: false
            },
            {
                  id: 6,
                  name: 'Maria Santos',
                  location: 'São Paulo, Brazil',
                  treatment: 'Dental Implants',
                  hospital: 'Dr. Dentsmile Clinic',
                  date: 'June 2024',
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
                  rating: 5,
                  quote: 'Full mouth rehabilitation in just 10 days. The quality matches European standards but at a fraction of the cost. My stay at a French heritage hotel was an added bonus!',
                  savings: '$35,000',
                  category: 'dental',
                  hasVideo: false,
                  featured: false
            }
      ];

      const stats = [
            { value: '15,000+', label: 'Happy Patients' },
            { value: '45+', label: 'Countries' },
            { value: '4.9', label: 'Average Rating' },
            { value: '98%', label: 'Would Recommend' }
      ];

      const filters = [
            { id: 'all', label: 'All Stories' },
            { id: 'orthopedics', label: 'Orthopedics' },
            { id: 'fertility', label: 'Fertility' },
            { id: 'cardiology', label: 'Cardiology' },
            { id: 'dental', label: 'Dental' }
      ];

      const filteredTestimonials = activeFilter === 'all'
            ? testimonials
            : testimonials.filter(t => t.category === activeFilter);

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* Hero */}
                  <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 hero-premium">
                        <div className="container-premium">
                              {/* Breadcrumb */}
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <a href="/">Home</a>
                                    <span className="mx-2">/</span>
                                    <span className="text-white">Patient Stories</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <div className="gov-seal mb-6">
                                          <span>15,000+ Verified Patient Reviews</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                                          Patient Success
                                          <span className="block text-[#bf9b30]">Stories</span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                                          Real stories from real patients. See how medical tourism in Pondicherry changed their lives.
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* Stats */}
                  <section className="py-6 bg-white shadow-md relative z-10 border-b border-gray-100">
                        <div className="container-premium">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                    {stats.map((stat, i) => (
                                          <div key={i}>
                                                <div className="text-2xl font-bold text-[var(--medical-teal)]">{stat.value}</div>
                                                <div className="text-sm text-[var(--medical-slate)]">{stat.label}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Filters */}
                  <section className="py-8">
                        <div className="container mx-auto px-4">
                              <div className="flex flex-wrap justify-center gap-3">
                                    {filters.map((filter) => (
                                          <button
                                                key={filter.id}
                                                onClick={() => setActiveFilter(filter.id)}
                                                className={`px-6 py-3 rounded-full font-medium transition-all ${activeFilter === filter.id ? 'bg-rose-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                                      }`}
                                          >
                                                {filter.label}
                                          </button>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Featured Testimonials */}
                  <section className="py-16">
                        <div className="container mx-auto px-4">
                              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Stories</h2>
                              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                                    {filteredTestimonials.filter(t => t.featured).map((testimonial) => (
                                          <div key={testimonial.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                                                <div className="relative h-64">
                                                      <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                      {testimonial.hasVideo && (
                                                            <button className="absolute inset-0 flex items-center justify-center">
                                                                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                        <Play className="w-8 h-8 text-rose-600 ml-1" />
                                                                  </div>
                                                            </button>
                                                      )}
                                                      <div className="absolute bottom-4 left-4 right-4 text-white">
                                                            <h3 className="text-xl font-bold">{testimonial.name}</h3>
                                                            <div className="flex items-center gap-2 text-sm text-gray-200">
                                                                  <MapPin className="w-4 h-4" />
                                                                  {testimonial.location}
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="p-6">
                                                      <div className="flex items-center gap-1 mb-3">
                                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                                            ))}
                                                      </div>
                                                      <div className="flex items-center gap-4 mb-4 text-sm">
                                                            <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-medium">{testimonial.treatment}</span>
                                                            <span className="text-gray-500">{testimonial.date}</span>
                                                      </div>
                                                      <p className="text-gray-600 italic leading-relaxed mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                                                      <div className="flex items-center justify-between pt-4 border-t">
                                                            <div>
                                                                  <div className="text-sm text-gray-500">Total Savings</div>
                                                                  <div className="text-xl font-bold text-green-600">{testimonial.savings}</div>
                                                            </div>
                                                            <div className="text-right">
                                                                  <div className="text-sm text-gray-500">Hospital</div>
                                                                  <div className="font-medium text-gray-700">{testimonial.hospital}</div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>

                              {/* All Testimonials */}
                              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">More Success Stories</h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                    {filteredTestimonials.filter(t => !t.featured).map((testimonial) => (
                                          <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 flex gap-6 hover:shadow-xl transition-all">
                                                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                                      <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                      <div className="flex items-center gap-1 mb-2">
                                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                                            ))}
                                                      </div>
                                                      <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                                                      <p className="text-gray-500 text-sm mb-2">{testimonial.location} • {testimonial.treatment}</p>
                                                      <p className="text-gray-600 text-sm italic line-clamp-2">&ldquo;{testimonial.quote}&rdquo;</p>
                                                      <div className="mt-3 flex items-center gap-4 text-sm">
                                                            <span className="text-green-600 font-semibold">Saved {testimonial.savings}</span>
                                                            <span className="text-gray-400">|</span>
                                                            <span className="text-gray-500">{testimonial.hospital}</span>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}
                  <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl font-bold mb-6">Start Your Success Story</h2>
                              <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
                                    Join our community of successful patients. Get a free consultation today.
                              </p>
                              <button
                                    onClick={() => openQuoteWidget({ source: 'testimonials-page' })}
                                    className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2"
                              >
                                    Book Free Consultation <ChevronRight className="w-5 h-5" />
                              </button>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default TestimonialsPage;
