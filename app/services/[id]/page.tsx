"use client";

import { useCurrency } from '@/app/context/CurrencyContext';
import { motion } from 'framer-motion';
import { Activity, ArrowLeft, ArrowRight, Award, Baby, Bone, Brain, Building, Calendar, Check, ChevronRight, Clock, DollarSign, Eye, Heart, MapPin, Phone, Plane, Scissors, Shield, Star, Stethoscope, Users, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../../components/common';

// Hospital data for linking treatments to hospitals
const hospitalsData: Record<number, { name: string; fullName: string; location: string }> = {
      1: { name: 'JIPMER', fullName: 'Jawaharlal Institute of Postgraduate Medical Education & Research', location: 'Gorimedu, Pondicherry' },
      2: { name: 'Apollo Pondicherry', fullName: 'Apollo Speciality Hospitals Pondicherry', location: 'Ariyankuppam, Pondicherry' },
      3: { name: 'MGMCRI', fullName: 'Mahatma Gandhi Medical College & Research Institute', location: 'Pillaiyarkuppam, Pondicherry' },
      4: { name: 'GEM Hospital', fullName: 'GEM Hospital & Research Centre', location: 'East Coast Road, Pondicherry' },
      5: { name: 'Aravind Eye Hospital', fullName: 'Aravind Eye Hospital', location: 'Cuddalore Road, Pondicherry' },
      6: { name: 'PIMS', fullName: 'Pondicherry Institute of Medical Sciences', location: 'Kalapet, Pondicherry' },
};

// Treatment data (could be moved to a shared data file or fetched from API)
const treatmentsData: Record<string, TreatmentType> = {
      'orthopedics': {
            id: 'orthopedics',
            icon: Bone,
            title: 'Orthopedics & Joint Replacement',
            subtitle: 'World-Class Joint Care Excellence',
            description: 'Experience world-class joint replacement with 95%+ patient satisfaction at 5-year follow-up. Our FRCS-trained surgeons bring international fellowship experience from leading hospitals in the US and UK.',
            longDescription: 'Our orthopedic department specializes in advanced joint replacement surgeries using the latest robotic-assisted technology. With minimally invasive techniques, patients experience faster recovery, less pain, and better outcomes. Our surgeons have performed over 10,000 successful joint replacements.',
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200',
            procedures: [
                  { name: 'Total Knee Replacement', priceINR: 416500, recoveryDays: '45-60 days' },
                  { name: 'Hip Replacement', priceINR: 499800, recoveryDays: '45-60 days' },
                  { name: 'Spine Surgery', priceINR: 666400, recoveryDays: '30-90 days' },
                  { name: 'ACL Reconstruction', priceINR: 249900, recoveryDays: '6-9 months' },
                  { name: 'Shoulder Arthroscopy', priceINR: 208250, recoveryDays: '3-6 months' },
            ],
            avgPriceINR: 708000,
            usPriceINR: 2916000,
            savings: '70%',
            recovery: '6-12 weeks',
            successRate: '95%+',
            hospitalStay: '3-5 days',
            color: 'from-[var(--medical-teal)] to-[var(--medical-dark-teal)]',
            highlights: [
                  'Robotic-assisted surgery available',
                  'US/UK fellowship trained surgeons',
                  'Imported prosthetics from US & Europe',
                  'Dedicated physiotherapy team',
            ],
            accreditations: ['JCI', 'NABH', 'ISO 9001'],
            hospitals: [1, 2, 6],
      },
      'ivf': {
            id: 'ivf',
            icon: Baby,
            title: 'IVF & Fertility Treatment',
            subtitle: 'Your Path to Parenthood',
            description: 'Advanced reproductive medicine with 45%+ live birth rate for patients under 35. Our 35+ IVF specialists follow international protocols and use cutting-edge embryology labs.',
            longDescription: 'Our fertility center offers comprehensive reproductive solutions with state-of-the-art embryology labs and experienced specialists. We provide personalized treatment plans, genetic screening, and emotional support throughout your journey to parenthood.',
            image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200',
            procedures: [
                  { name: 'IVF Treatment (Single Cycle)', priceINR: 249900, recoveryDays: '14 days to test' },
                  { name: 'IUI', priceINR: 41650, recoveryDays: '14 days to test' },
                  { name: 'ICSI', priceINR: 291600, recoveryDays: '14 days to test' },
                  { name: 'Egg Freezing', priceINR: 166600, recoveryDays: '1-2 days' },
                  { name: 'Donor Programs', priceINR: 416500, recoveryDays: 'Varies' },
            ],
            avgPriceINR: 291600,
            usPriceINR: 1499400,
            savings: '80%',
            recovery: '14 days',
            successRate: '45%+ (age <35)',
            hospitalStay: 'Outpatient',
            color: 'from-rose-600 to-pink-500',
            highlights: [
                  '45%+ live birth rate (under 35)',
                  'State-of-the-art embryology lab',
                  'Genetic screening available',
                  'Counseling & emotional support',
            ],
            accreditations: ['NABH', 'ISO 9001'],
            hospitals: [2, 3],
      },
      'ophthalmology': {
            id: 'ophthalmology',
            icon: Eye,
            title: 'Eye Surgery & LASIK',
            subtitle: 'Vision Restoration Excellence',
            description: 'Leading eye care with 99%+ vision improvement rate. Partner hospital Aravind Eye Hospital performs 15,000+ cataract surgeries annually with world-renowned expertise.',
            longDescription: 'Our ophthalmology department offers comprehensive eye care from routine check-ups to complex surgeries. With advanced laser technology and experienced surgeons, we restore vision with precision and care. Our partnership with Aravind Eye Hospital brings world-class expertise.',
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200',
            procedures: [
                  { name: 'Cataract Surgery (Phaco)', priceINR: 49980, recoveryDays: '7 days' },
                  { name: 'LASIK', priceINR: 83300, recoveryDays: '1-2 days' },
                  { name: 'Retina Treatment', priceINR: 166600, recoveryDays: '2-4 weeks' },
                  { name: 'Glaucoma Surgery', priceINR: 124950, recoveryDays: '2-4 weeks' },
                  { name: 'Cornea Transplant', priceINR: 249900, recoveryDays: '6-12 months' },
            ],
            avgPriceINR: 99960,
            usPriceINR: 666400,
            savings: '85%',
            recovery: '3-7 days',
            successRate: '99%+',
            hospitalStay: 'Day care',
            color: 'from-[var(--medical-teal)] to-emerald-500',
            highlights: [
                  'Bladeless LASIK technology',
                  '15,000+ cataract surgeries/year',
                  'Aravind Eye Hospital partnership',
                  'Same-day discharge',
            ],
            accreditations: ['NABH', 'ISO 9001'],
            hospitals: [5],
      },
      'cardiology': {
            id: 'cardiology',
            icon: Heart,
            title: 'Cardiac Surgery',
            subtitle: 'Heart Care You Can Trust',
            description: 'Interventional cardiology at JIPMER with 98.5% success rate and <1% mortality. Our 50+ board-certified cardiologists handle complex cases with precision.',
            longDescription: 'Our cardiac care unit offers comprehensive heart treatment from diagnosis to rehabilitation. With advanced cath labs, hybrid operating rooms, and experienced cardiac surgeons, we provide life-saving care with excellent outcomes.',
            image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=1200',
            procedures: [
                  { name: 'Bypass Surgery (CABG)', priceINR: 833000, recoveryDays: '8-12 weeks' },
                  { name: 'Angioplasty + Stent', priceINR: 333200, recoveryDays: '1-2 weeks' },
                  { name: 'Valve Replacement', priceINR: 999600, recoveryDays: '6-8 weeks' },
                  { name: 'Pacemaker Implant', priceINR: 416500, recoveryDays: '1-2 weeks' },
                  { name: 'Heart Transplant', priceINR: 2499000, recoveryDays: '3-6 months' },
            ],
            avgPriceINR: 999600,
            usPriceINR: 4165000,
            savings: '76%',
            recovery: '8-12 weeks',
            successRate: '98.5%',
            hospitalStay: '5-10 days',
            color: 'from-red-600 to-rose-500',
            highlights: [
                  '98.5% surgery success rate',
                  '<1% mortality rate',
                  'Hybrid OR available',
                  '24/7 cardiac emergency',
            ],
            accreditations: ['JCI', 'NABH', 'ISO 9001'],
            hospitals: [1, 2],
      },
      'gastroenterology': {
            id: 'gastroenterology',
            icon: Activity,
            title: 'Gastroenterology & Bariatric',
            subtitle: 'Digestive Health Specialists',
            description: 'Asia\'s premier GI center at GEM Hospital with JCI accreditation. World-class laparoscopic expertise for bariatric and digestive surgeries.',
            longDescription: 'Our gastroenterology department offers advanced minimally invasive surgeries for weight loss and digestive conditions. With GEM Hospital partnership, we bring Asia\'s best laparoscopic expertise to our patients.',
            image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1200',
            procedures: [
                  { name: 'Gastric Bypass', priceINR: 499800, recoveryDays: '2-3 weeks' },
                  { name: 'Sleeve Gastrectomy', priceINR: 416500, recoveryDays: '2-3 weeks' },
                  { name: 'Liver Transplant', priceINR: 2082500, recoveryDays: '3-6 months' },
                  { name: 'Colorectal Surgery', priceINR: 333200, recoveryDays: '4-6 weeks' },
                  { name: 'Endoscopy (Diagnostic)', priceINR: 16660, recoveryDays: 'Same day' },
            ],
            avgPriceINR: 499800,
            usPriceINR: 1666000,
            savings: '70%',
            recovery: '7-14 days',
            successRate: '97%+',
            hospitalStay: '2-5 days',
            color: 'from-amber-600 to-orange-500',
            highlights: [
                  'GEM Hospital partnership',
                  'Minimally invasive techniques',
                  'Comprehensive weight loss program',
                  'Post-surgery nutrition support',
            ],
            accreditations: ['JCI', 'NABH'],
            hospitals: [4],
      },
      'neurology': {
            id: 'neurology',
            icon: Brain,
            title: 'Neurology & Neurosurgery',
            subtitle: 'Advanced Brain & Spine Care',
            description: 'Advanced brain and spine surgery with robotic assistance and minimally invasive techniques. Complex neurological conditions treated with precision.',
            longDescription: 'Our neurosciences department provides comprehensive care for brain and spine conditions. With advanced navigation systems, robotic assistance, and experienced neurosurgeons, we handle the most complex cases with excellent outcomes.',
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200',
            procedures: [
                  { name: 'Brain Tumor Surgery', priceINR: 999600, recoveryDays: '2-4 weeks' },
                  { name: 'Spine Fusion', priceINR: 666400, recoveryDays: '3-6 months' },
                  { name: 'Epilepsy Surgery', priceINR: 833000, recoveryDays: '4-6 weeks' },
                  { name: 'Stroke Treatment', priceINR: 333200, recoveryDays: 'Varies' },
                  { name: 'Deep Brain Stimulation', priceINR: 1665500, recoveryDays: '2-4 weeks' },
            ],
            avgPriceINR: 1249500,
            usPriceINR: 4998000,
            savings: '75%',
            recovery: '2-4 weeks',
            successRate: '96%+',
            hospitalStay: '5-14 days',
            color: 'from-purple-600 to-indigo-500',
            highlights: [
                  'Robotic-assisted surgery',
                  'Navigation-guided procedures',
                  'Minimally invasive spine surgery',
                  'Comprehensive rehab program',
            ],
            accreditations: ['NABH', 'ISO 9001'],
            hospitals: [1, 2, 3],
      },
      'dental': {
            id: 'dental',
            icon: Scissors,
            title: 'Dental Care & Implants',
            subtitle: 'Premium Dental Excellence',
            description: 'Full mouth rehabilitation with 98%+ 10-year implant survival rate. 25+ dental specialists with cosmetic dentistry expertise.',
            longDescription: 'Our dental center offers comprehensive dental care from routine cleanings to complex full mouth rehabilitations. With advanced implant technology and cosmetic expertise, we create beautiful, lasting smiles.',
            image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200',
            procedures: [
                  { name: 'Single Dental Implant', priceINR: 41650, recoveryDays: '3-6 months' },
                  { name: 'Full Mouth Implants (All-on-4)', priceINR: 499800, recoveryDays: '3-6 months' },
                  { name: 'Porcelain Veneers (per tooth)', priceINR: 16660, recoveryDays: '2-3 days' },
                  { name: 'Root Canal', priceINR: 8330, recoveryDays: '1-2 days' },
                  { name: 'Smile Makeover', priceINR: 166600, recoveryDays: '1-2 weeks' },
            ],
            avgPriceINR: 49980,
            usPriceINR: 333200,
            savings: '85%',
            recovery: '3-10 days',
            successRate: '98%+',
            hospitalStay: 'Outpatient',
            color: 'from-cyan-600 to-[var(--medical-teal)]',
            highlights: [
                  '98%+ 10-year implant survival',
                  'Same-day dental implants available',
                  'Digital smile design',
                  'Painless procedures',
            ],
            accreditations: ['ISO 9001'],
            hospitals: [2, 3, 6],
      },
      'oncology': {
            id: 'oncology',
            icon: Stethoscope,
            title: 'Cancer Treatment',
            subtitle: 'Comprehensive Cancer Care',
            description: 'Comprehensive oncology care with 30+ oncologists using the latest chemotherapy, targeted therapy, and radiation protocols.',
            longDescription: 'Our cancer center provides complete oncology care from diagnosis through treatment and survivorship. With tumor boards, precision medicine, and compassionate care, we fight cancer with the latest evidence-based treatments.',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
            procedures: [
                  { name: 'Chemotherapy (per cycle)', priceINR: 41650, recoveryDays: 'Varies' },
                  { name: 'Radiation Therapy (course)', priceINR: 249900, recoveryDays: 'Varies' },
                  { name: 'Surgical Oncology', priceINR: 499800, recoveryDays: '2-6 weeks' },
                  { name: 'Immunotherapy', priceINR: 333200, recoveryDays: 'Varies' },
                  { name: 'Bone Marrow Transplant', priceINR: 2082500, recoveryDays: '3-6 months' },
            ],
            avgPriceINR: 666400,
            usPriceINR: 2082500,
            savings: '65%',
            recovery: 'Varies',
            successRate: 'Stage-dependent',
            hospitalStay: 'Varies',
            color: 'from-green-600 to-[var(--medical-teal)]',
            highlights: [
                  'Multidisciplinary tumor boards',
                  'Precision medicine available',
                  'Palliative care team',
                  'Survivorship programs',
            ],
            accreditations: ['NABH', 'ISO 9001'],
            hospitals: [1, 2, 3],
      },
};

interface Procedure {
      name: string;
      priceINR: number;
      recoveryDays: string;
}

interface TreatmentType {
      id: string;
      icon: React.ElementType;
      title: string;
      subtitle: string;
      description: string;
      longDescription: string;
      image: string;
      procedures: Procedure[];
      avgPriceINR: number;
      usPriceINR: number;
      savings: string;
      recovery: string;
      successRate: string;
      hospitalStay: string;
      color: string;
      highlights: string[];
      accreditations: string[];
      hospitals: number[];
}

export default function TreatmentDetailPage() {
      const params = useParams();
      const treatmentId = params.id as string;
      const treatment = treatmentsData[treatmentId];

      const { convertAmount, formatCurrency, selectedCurrency } = useCurrency();
      const [convertedPrices, setConvertedPrices] = useState<{ avg: number; us: number; procedures: number[] }>({
            avg: 0,
            us: 0,
            procedures: [],
      });

      useEffect(() => {
            if (!treatment) return;

            const convert = async () => {
                  const avg = await convertAmount(treatment.avgPriceINR, 'INR');
                  const us = await convertAmount(treatment.usPriceINR, 'INR');
                  const procedures = await Promise.all(
                        treatment.procedures.map(p => convertAmount(p.priceINR, 'INR'))
                  );
                  setConvertedPrices({ avg, us, procedures });
            };
            convert();
      }, [treatment, selectedCurrency]);

      if (!treatment) {
            notFound();
      }

      const Icon = treatment.icon;

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative pt-24 pb-16 overflow-hidden">
                        <div className="absolute inset-0">
                              <Image
                                    src={treatment.image}
                                    alt={treatment.title}
                                    fill
                                    className="object-cover"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-r ${treatment.color} opacity-90`} />
                        </div>

                        <div className="relative container-premium">
                              {/* Breadcrumb */}
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <ChevronRight className="w-4 h-4 breadcrumb-separator" />
                                    <Link href="/services" className="hover:text-white transition-colors">Treatments</Link>
                                    <ChevronRight className="w-4 h-4 breadcrumb-separator" />
                                    <span className="text-white">{treatment.title}</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className="flex items-center gap-4 mb-6"
                                    >
                                          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                                <Icon className="w-8 h-8 text-white" />
                                          </div>
                                          <div>
                                                <div className="gov-seal">{treatment.subtitle}</div>
                                          </div>
                                    </motion.div>

                                    <motion.h1
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.1 }}
                                          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                                    >
                                          {treatment.title}
                                    </motion.h1>

                                    <motion.p
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.2 }}
                                          className="text-xl text-white/90 mb-8 max-w-2xl"
                                    >
                                          {treatment.description}
                                    </motion.p>

                                    {/* Quick Stats */}
                                    <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.3 }}
                                          className="flex flex-wrap gap-6"
                                    >
                                          <div className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-3">
                                                <div className="text-white/70 text-sm">Success Rate</div>
                                                <div className="text-white font-bold text-xl">{treatment.successRate}</div>
                                          </div>
                                          <div className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-3">
                                                <div className="text-white/70 text-sm">Average Savings</div>
                                                <div className="text-[var(--medical-gold)] font-bold text-xl">{treatment.savings}</div>
                                          </div>
                                          <div className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-3">
                                                <div className="text-white/70 text-sm">Recovery</div>
                                                <div className="text-white font-bold text-xl">{treatment.recovery}</div>
                                          </div>
                                          <div className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-3">
                                                <div className="text-white/70 text-sm">Hospital Stay</div>
                                                <div className="text-white font-bold text-xl">{treatment.hospitalStay}</div>
                                          </div>
                                    </motion.div>
                              </div>
                        </div>
                  </section>

                  {/* Main Content */}
                  <section className="section-premium">
                        <div className="container-premium">
                              <div className="grid lg:grid-cols-3 gap-8">
                                    {/* Left Column - Procedures */}
                                    <div className="lg:col-span-2 space-y-8">
                                          {/* About */}
                                          <div className="card-premium p-8">
                                                <h2 className="text-2xl font-bold text-[var(--medical-navy)] mb-4">About This Treatment</h2>
                                                <p className="text-[var(--medical-slate)] leading-relaxed">{treatment.longDescription}</p>
                                          </div>

                                          {/* Procedures & Pricing */}
                                          <div className="card-premium p-8">
                                                <h2 className="text-2xl font-bold text-[var(--medical-navy)] mb-6">Procedures & Pricing</h2>
                                                <div className="space-y-4">
                                                      {treatment.procedures.map((proc, idx) => (
                                                            <div key={proc.name} className="flex items-center justify-between p-4 bg-[var(--medical-cream)] rounded-xl">
                                                                  <div>
                                                                        <div className="font-semibold text-[var(--medical-navy)]">{proc.name}</div>
                                                                        <div className="text-sm text-gray-500 flex items-center gap-2">
                                                                              <Clock className="w-4 h-4" />
                                                                              Recovery: {proc.recoveryDays}
                                                                        </div>
                                                                  </div>
                                                                  <div className="text-right">
                                                                        <div className="text-lg font-bold text-[var(--medical-teal)]">
                                                                              {formatCurrency(convertedPrices.procedures[idx] || 0)}
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      ))}
                                                </div>
                                          </div>

                                          {/* Why Choose Us */}
                                          <div className="card-premium p-8">
                                                <h2 className="text-2xl font-bold text-[var(--medical-navy)] mb-6">Why Choose Us</h2>
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                      {treatment.highlights.map((highlight) => (
                                                            <div key={highlight} className="flex items-start gap-3">
                                                                  <div className="w-6 h-6 rounded-full bg-[var(--medical-light-teal)] flex items-center justify-center shrink-0 mt-0.5">
                                                                        <Check className="w-4 h-4 text-[var(--medical-teal)]" />
                                                                  </div>
                                                                  <span className="text-[var(--medical-slate)]">{highlight}</span>
                                                            </div>
                                                      ))}
                                                </div>
                                          </div>

                                          {/* Hospitals in Pondicherry */}
                                          <div className="card-premium p-8">
                                                <h2 className="text-2xl font-bold text-[var(--medical-navy)] mb-6 flex items-center gap-3">
                                                      <Building className="w-7 h-7 text-[var(--medical-teal)]" />
                                                      Hospitals in Pondicherry
                                                </h2>
                                                <p className="text-[var(--medical-slate)] mb-6">
                                                      The following partner hospitals in Pondicherry offer {treatment.title.toLowerCase()} services with world-class care.
                                                </p>
                                                <div className="space-y-4">
                                                      {treatment.hospitals.map((hospitalId) => {
                                                            const hospital = hospitalsData[hospitalId];
                                                            if (!hospital) return null;
                                                            return (
                                                                  <div key={hospitalId} className="flex items-center justify-between p-4 bg-[var(--medical-cream)] rounded-xl hover:shadow-md transition-all">
                                                                        <div>
                                                                              <div className="font-semibold text-[var(--medical-navy)]">{hospital.name}</div>
                                                                              <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                                                    <MapPin className="w-4 h-4" />
                                                                                    {hospital.location}
                                                                              </div>
                                                                        </div>
                                                                        <Link
                                                                              href={`/hospital/${hospitalId}`}
                                                                              className="flex items-center gap-2 bg-[var(--medical-teal)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--medical-dark-teal)] transition-colors text-sm"
                                                                        >
                                                                              Hospital Details
                                                                              <ChevronRight className="w-4 h-4" />
                                                                        </Link>
                                                                  </div>
                                                            );
                                                      })}
                                                </div>
                                          </div>
                                    </div>

                                    {/* Right Column - Sticky CTA */}
                                    <div className="lg:col-span-1">
                                          <div className="sticky top-24 space-y-6">
                                                {/* Price Card */}
                                                <div className="card-premium p-6">
                                                      <div className="text-center mb-6">
                                                            <div className="text-gray-500 text-sm mb-1">Starting From</div>
                                                            <div className="text-4xl font-bold text-[var(--medical-teal)]">
                                                                  {formatCurrency(convertedPrices.avg)}
                                                            </div>
                                                            <div className="flex items-center justify-center gap-2 mt-2">
                                                                  <span className="text-gray-400 line-through text-sm">
                                                                        {formatCurrency(convertedPrices.us)} (USA)
                                                                  </span>
                                                            </div>
                                                            <div className="bg-[var(--medical-gold)]/10 text-[var(--medical-gold)] font-bold px-4 py-2 rounded-full inline-block mt-3">
                                                                  Save {treatment.savings}
                                                            </div>
                                                      </div>

                                                      <Link
                                                            href="/booking"
                                                            className="w-full py-4 rounded-xl font-semibold text-white bg-[var(--medical-teal)] flex items-center justify-center gap-2 hover:bg-[var(--medical-dark-teal)] transition-all mb-3"
                                                      >
                                                            Get Free Quote
                                                            <ArrowRight className="w-5 h-5" />
                                                      </Link>

                                                      <Link
                                                            href="/telemedicine"
                                                            className="w-full py-4 rounded-xl font-semibold text-[var(--medical-teal)] bg-[var(--medical-light-teal)] flex items-center justify-center gap-2 hover:bg-[var(--medical-teal)]/20 transition-all"
                                                      >
                                                            <Video className="w-5 h-5" />
                                                            Video Consultation
                                                      </Link>
                                                </div>

                                                {/* Contact Options */}
                                                <div className="card-premium p-6">
                                                      <h3 className="font-semibold text-[var(--medical-navy)] mb-4">Need Help?</h3>
                                                      <div className="space-y-3 text-sm">
                                                            <a href="tel:+911234567890" className="flex items-center gap-3 text-[var(--medical-slate)] hover:text-[var(--medical-teal)]">
                                                                  <Phone className="w-4 h-4" /> +91 123 456 7890
                                                            </a>
                                                            <a href="#" className="flex items-center gap-3 text-[var(--medical-slate)] hover:text-[var(--medical-teal)]">
                                                                  <MapPin className="w-4 h-4" /> Pondicherry, India
                                                            </a>
                                                      </div>
                                                </div>

                                                {/* Accreditations */}
                                                <div className="card-premium p-6">
                                                      <h3 className="font-semibold text-[var(--medical-navy)] mb-4">Accreditations</h3>
                                                      <div className="flex flex-wrap gap-2">
                                                            {treatment.accreditations.map((acc) => (
                                                                  <span key={acc} className="bg-[var(--medical-light-teal)] text-[var(--medical-teal)] px-3 py-1 rounded-full text-sm font-medium">
                                                                        {acc}
                                                                  </span>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Back to Services */}
                  <section className="py-8 border-t border-gray-100">
                        <div className="container-premium">
                              <Link href="/services" className="inline-flex items-center gap-2 text-[var(--medical-teal)] font-semibold hover:gap-3 transition-all">
                                    <ArrowLeft className="w-5 h-5" />
                                    Back to All Treatments
                              </Link>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
