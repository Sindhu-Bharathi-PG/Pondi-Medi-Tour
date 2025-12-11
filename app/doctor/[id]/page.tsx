"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Award, Building2, Calendar, ChevronRight, Clock, Globe, GraduationCap, Heart, Languages, MapPin, Star, Stethoscope, TrendingUp, User, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header, Footer } from '../../components/common';

// Doctor data - This should match the listing page
const doctorData: Record<string, any> = {
      '1': {
            id: 1,
            name: 'Dr. V. Veerappan',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800',
            specialty: 'Orthopedics',
            serviceSlug: 'orthopedics',
            subSpecialty: 'Spine & Joint Replacement',
            credentials: 'MBBS, MS (Orthopaedics), FRCS (Glasgow)',
            experience: '31+ years',
            hospital: 'POSH Hospital',
            hospitalId: '1',
            rating: 4.9,
            reviews: 450,
            surgeries: 5000,
            languages: ['English', 'Tamil', 'Hindi'],
            education: [
                  { degree: 'MBBS', institution: 'Madras Medical College', year: '1990' },
                  { degree: 'MS Orthopaedics', institution: 'CMC Vellore', year: '1994' },
                  { degree: 'FRCS', institution: 'Royal College, Glasgow, UK', year: '1998' },
            ],
            bio: 'Dr. V. Veerappan is a pioneer in minimally invasive spine surgery with over three decades of experience. He has performed over 5,000 successful surgeries and is known for his expertise in complex joint replacements and revision surgeries. Trained at prestigious institutions in India and the UK, he brings international best practices to patient care.',
            expertise: [
                  'Total Knee Replacement',
                  'Hip Replacement Surgery',
                  'Spine Surgery',
                  'Revision Joint Surgery',
                  'Sports Medicine',
                  'Arthroscopic Surgery',
            ],
            awards: [
                  'Best Orthopedic Surgeon Award - 2019',
                  'Excellence in Spine Surgery - 2017',
                  'Distinguished Alumni Award - CMC Vellore',
            ],
            publications: 45,
            internationalTraining: ['UK', 'USA', 'Germany'],
            consultationTimings: 'Mon-Sat: 9:00 AM - 1:00 PM, 4:00 PM - 7:00 PM',
            featured: true,
            available: true,
      },
      '2': {
            id: 2,
            name: 'Dr. V. M. Thomas',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800',
            specialty: 'IVF & Fertility',
            serviceSlug: 'ivf',
            subSpecialty: 'Reproductive Medicine',
            credentials: 'PhD, FSAB (Reproductive Biotechnology)',
            experience: '25+ years',
            hospital: 'Indira IVF Centre',
            hospitalId: '2',
            rating: 4.9,
            reviews: 680,
            surgeries: 10000,
            languages: ['English', 'Malayalam', 'Tamil'],
            education: [
                  { degree: 'PhD', institution: 'IISc Bangalore', year: '1995' },
                  { degree: 'FSAB', institution: 'European Society of Human Reproduction', year: '2000' },
            ],
            bio: 'Dr. V. M. Thomas is a renowned embryologist with thousands of successful IVF cycles worldwide. His groundbreaking research in reproductive biotechnology has helped countless couples achieve their dream of parenthood. He is a sought-after speaker at international fertility conferences.',
            expertise: [
                  'In Vitro Fertilization (IVF)',
                  'Intracytoplasmic Sperm Injection (ICSI)',
                  'Embryo Cryopreservation',
                  'Preimplantation Genetic Testing',
                  'Fertility Preservation',
                  'Donor Programs',
            ],
            awards: [
                  'Pioneer in IVF Technology Award - 2020',
                  'Best Embryologist - National Fertility Summit',
                  'Lifetime Achievement - Reproductive Medicine',
            ],
            publications: 78,
            internationalTraining: ['Belgium', 'Spain', 'Australia'],
            consultationTimings: 'Mon-Fri: 10:00 AM - 2:00 PM, 5:00 PM - 8:00 PM',
            featured: true,
            available: true,
      },
      '3': {
            id: 3,
            name: 'Dr. Ramya R',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800',
            specialty: 'IVF & Fertility',
            serviceSlug: 'ivf',
            subSpecialty: 'Infertility Consultant',
            credentials: 'MBBS, DGO, FRM',
            experience: '11+ years',
            hospital: 'Indira IVF Centre',
            hospitalId: '2',
            rating: 4.8,
            reviews: 320,
            surgeries: 2500,
            languages: ['English', 'Tamil', 'Hindi'],
            education: [
                  { degree: 'MBBS', institution: 'Stanley Medical College', year: '2010' },
                  { degree: 'DGO', institution: 'Govt General Hospital', year: '2013' },
                  { degree: 'FRM', institution: 'National University Singapore', year: '2016' },
            ],
            bio: 'Dr. Ramya R is a passionate fertility specialist dedicated to making parenthood dreams come true. With specialized training from Singapore, she brings a compassionate approach combined with cutting-edge fertility treatments. Her patient-centric care has earned her excellent reviews.',
            expertise: [
                  'IVF & IUI Treatments',
                  'Ovulation Induction',
                  'Laparoscopic Fertility Surgery',
                  'PCOS Management',
                  'Recurrent Pregnancy Loss',
                  'Male Infertility Treatment',
            ],
            awards: [
                  'Young Fertility Specialist Award - 2021',
                  'Patient Choice Award - 2022',
            ],
            publications: 12,
            internationalTraining: ['Singapore', 'Japan'],
            consultationTimings: 'Mon-Sat: 9:00 AM - 5:00 PM',
            featured: true,
            available: true,
      },
      '4': {
            id: 4,
            name: 'Dr. Suresh Kumar',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800',
            specialty: 'Cardiology',
            serviceSlug: 'cardiology',
            subSpecialty: 'Interventional Cardiology',
            credentials: 'DM Cardiology, FACC (USA)',
            experience: '18+ years',
            hospital: 'JIPMER',
            hospitalId: '1',
            rating: 4.9,
            reviews: 520,
            surgeries: 4000,
            languages: ['English', 'Tamil', 'Telugu'],
            education: [
                  { degree: 'MBBS', institution: 'JIPMER Pondicherry', year: '2002' },
                  { degree: 'DM Cardiology', institution: 'AIIMS New Delhi', year: '2008' },
                  { degree: 'Fellowship', institution: 'Cleveland Clinic, USA', year: '2011' },
            ],
            bio: 'Dr. Suresh Kumar is a Cleveland Clinic trained interventional cardiologist specializing in complex angioplasty and structural heart disease. His expertise in treating complex cardiac conditions has saved thousands of lives across South India.',
            expertise: [
                  'Complex Angioplasty',
                  'TAVI/TAVR Procedures',
                  'Structural Heart Interventions',
                  'Pacemaker Implantation',
                  'Heart Failure Management',
                  'Preventive Cardiology',
            ],
            awards: [
                  'Excellence in Interventional Cardiology - 2022',
                  'Best Cardiologist - Tamil Nadu State Award',
            ],
            publications: 56,
            internationalTraining: ['USA', 'Germany', 'France'],
            consultationTimings: 'Mon-Fri: 8:00 AM - 4:00 PM',
            featured: false,
            available: true,
      },
      '5': {
            id: 5,
            name: 'Dr. Priya Sharma',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
            specialty: 'Gastroenterology',
            serviceSlug: 'gastroenterology',
            subSpecialty: 'Bariatric Surgery',
            credentials: 'MS, MCh, FAIS',
            experience: '15+ years',
            hospital: 'GEM Hospital',
            hospitalId: '2',
            rating: 4.8,
            reviews: 380,
            surgeries: 3200,
            languages: ['English', 'Hindi', 'Tamil'],
            education: [
                  { degree: 'MBBS', institution: 'Maulana Azad Medical College', year: '2005' },
                  { degree: 'MS', institution: 'PGI Chandigarh', year: '2009' },
                  { degree: 'MCh', institution: 'GEM Hospital', year: '2012' },
            ],
            bio: 'Dr. Priya Sharma is a leading bariatric surgeon with expertise in laparoscopic and robotic procedures. She has transformed the lives of thousands through weight loss surgery and metabolic disease treatment.',
            expertise: [
                  'Bariatric Surgery',
                  'Laparoscopic Surgery',
                  'Robotic Surgery',
                  'Metabolic Surgery for Diabetes',
                  'Revision Bariatric Surgery',
                  'Hernia Repair',
            ],
            awards: [
                  'Best Bariatric Surgeon - North India 2021',
                  'Innovation in Surgical Techniques Award',
            ],
            publications: 34,
            internationalTraining: ['USA', 'South Korea'],
            consultationTimings: 'Mon-Sat: 10:00 AM - 6:00 PM',
            featured: false,
            available: true,
      },
      '6': {
            id: 6,
            name: 'Dr. Aravind Mohan',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800',
            specialty: 'Ophthalmology',
            serviceSlug: 'ophthalmology',
            subSpecialty: 'Cataract & Retina',
            credentials: 'MS, DNB, FICO',
            experience: '20+ years',
            hospital: 'Aravind Eye Hospital',
            hospitalId: '1',
            rating: 4.9,
            reviews: 890,
            surgeries: 15000,
            languages: ['English', 'Tamil', 'Malayalam'],
            education: [
                  { degree: 'MBBS', institution: 'Madras Medical College', year: '2000' },
                  { degree: 'MS Ophthalmology', institution: 'Aravind Eye Hospital', year: '2004' },
                  { degree: 'Fellowship', institution: 'Moorfields Eye Hospital, UK', year: '2007' },
            ],
            bio: 'Dr. Aravind Mohan is a world-renowned retina specialist with expertise from Moorfields Eye Hospital, UK. With over 15,000 surgeries, he is one of the most experienced eye surgeons in South India.',
            expertise: [
                  'Cataract Surgery',
                  'Retinal Detachment Repair',
                  'Diabetic Retinopathy Treatment',
                  'Macular Degeneration',
                  'Vitrectomy',
                  'LASIK & Refractive Surgery',
            ],
            awards: [
                  'Excellence in Retinal Surgery - 2020',
                  'Lifetime Achievement in Ophthalmology',
                  'Best Eye Surgeon - Healthcare Excellence Awards',
            ],
            publications: 89,
            internationalTraining: ['UK', 'USA', 'Singapore'],
            consultationTimings: 'Mon-Sat: 8:00 AM - 2:00 PM',
            featured: false,
            available: true,
      },
};

export default function DoctorDetailPage() {
      const params = useParams();
      const doctorId = params?.id as string;
      const doctor = doctorData[doctorId];

      if (!doctor) {
            return (
                  <div className="min-h-screen bg-gray-50">
                        <Header />
                        <div className="container mx-auto px-4 py-32 text-center">
                              <h1 className="text-4xl font-bold text-gray-800 mb-4">Doctor Not Found</h1>
                              <p className="text-gray-600 mb-8">The doctor you&apos;re looking for doesn&apos;t exist.</p>
                              <Link href="/doctor" className="text-blue-600 hover:underline">← Back to Doctors</Link>
                        </div>
                        <Footer />
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-gray-50">
                  <Header />

                  {/* Hero Section */}
                  <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative pt-32 pb-20 overflow-hidden"
                  >
                        <div className="absolute inset-0">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900" />
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600')] bg-cover bg-center opacity-10" />
                        </div>

                        <div className="relative container mx-auto px-4">
                              <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                              >
                                    <Link href="/doctor" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
                                          <ArrowLeft className="w-5 h-5" />
                                          Back to Doctors
                                    </Link>
                              </motion.div>

                              <div className="flex flex-col lg:flex-row gap-10 items-start">
                                    {/* Doctor Image */}
                                    <motion.div
                                          initial={{ scale: 0.8, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          transition={{ delay: 0.3 }}
                                          className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl shrink-0 border-4 border-white/20"
                                    >
                                          <Image
                                                src={doctor.image}
                                                alt={doctor.name}
                                                fill
                                                className="object-cover"
                                                priority
                                          />
                                          {doctor.available && (
                                                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                      Available
                                                </div>
                                          )}
                                    </motion.div>

                                    {/* Doctor Info */}
                                    <div className="flex-1">
                                          <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="flex flex-wrap gap-2 mb-4"
                                          >
                                                {doctor.featured && (
                                                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                                            <Award className="w-4 h-4" />
                                                            Top Rated
                                                      </span>
                                                )}
                                                <Link
                                                      href={`/services/${doctor.serviceSlug}`}
                                                      className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                                                >
                                                      {doctor.specialty}
                                                </Link>
                                          </motion.div>

                                          <motion.h1
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-4xl md:text-5xl font-bold text-white mb-2"
                                          >
                                                {doctor.name}
                                          </motion.h1>

                                          <motion.p
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.55 }}
                                                className="text-xl text-blue-200 mb-2"
                                          >
                                                {doctor.subSpecialty}
                                          </motion.p>

                                          <motion.p
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                className="text-white/80 mb-6"
                                          >
                                                {doctor.credentials}
                                          </motion.p>

                                          <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                                className="flex flex-wrap items-center gap-6 text-white mb-8"
                                          >
                                                <div className="flex items-center gap-2">
                                                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                      <span className="font-bold">{doctor.rating}</span>
                                                      <span className="text-white/70">({doctor.reviews} reviews)</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                      <Clock className="w-5 h-5" />
                                                      <span>{doctor.experience}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                      <TrendingUp className="w-5 h-5" />
                                                      <span>{doctor.surgeries.toLocaleString()}+ Procedures</span>
                                                </div>
                                          </motion.div>

                                          <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.8 }}
                                          >
                                                <Link
                                                      href={`/hospital/${doctor.hospitalId}`}
                                                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                                                >
                                                      <Building2 className="w-5 h-5 text-white" />
                                                      <div>
                                                            <div className="text-white/60 text-xs">Practicing at</div>
                                                            <div className="text-white font-semibold">{doctor.hospital}</div>
                                                      </div>
                                                      <ChevronRight className="w-5 h-5 text-white/60" />
                                                </Link>
                                          </motion.div>
                                    </div>
                              </div>
                        </div>
                  </motion.section>

                  {/* Stats Bar */}
                  <section className="bg-white shadow-lg relative z-10 -mt-4">
                        <div className="container mx-auto px-4 py-6">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                          { value: doctor.experience, label: 'Experience', icon: Clock },
                                          { value: `${doctor.surgeries.toLocaleString()}+`, label: 'Procedures', icon: TrendingUp },
                                          { value: doctor.publications, label: 'Publications', icon: GraduationCap },
                                          { value: doctor.rating, label: 'Rating', icon: Star },
                                    ].map((stat, i) => (
                                          <motion.div
                                                key={i}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.9 + i * 0.1 }}
                                                className="text-center"
                                          >
                                                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                                                <div className="text-sm text-gray-600">{stat.label}</div>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Main Content */}
                  <section className="py-16">
                        <div className="container mx-auto px-4">
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
                                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                      <User className="w-6 h-6 text-blue-600" />
                                                      About {doctor.name}
                                                </h2>
                                                <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
                                          </motion.div>

                                          {/* Expertise */}
                                          <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-2xl shadow-lg p-8"
                                          >
                                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                                      <Stethoscope className="w-6 h-6 text-blue-600" />
                                                      Areas of Expertise
                                                </h2>
                                                <div className="grid md:grid-cols-2 gap-3">
                                                      {doctor.expertise.map((item: string, i: number) => (
                                                            <motion.div
                                                                  key={i}
                                                                  initial={{ x: -20, opacity: 0 }}
                                                                  whileInView={{ x: 0, opacity: 1 }}
                                                                  viewport={{ once: true }}
                                                                  transition={{ delay: i * 0.05 }}
                                                                  className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg"
                                                            >
                                                                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                                                  <span className="text-gray-700">{item}</span>
                                                            </motion.div>
                                                      ))}
                                                </div>
                                          </motion.div>

                                          {/* Education & Training */}
                                          <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-2xl shadow-lg p-8"
                                          >
                                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                                      <GraduationCap className="w-6 h-6 text-blue-600" />
                                                      Education & Training
                                                </h2>
                                                <div className="space-y-4">
                                                      {doctor.education.map((edu: any, i: number) => (
                                                            <motion.div
                                                                  key={i}
                                                                  initial={{ x: -20, opacity: 0 }}
                                                                  whileInView={{ x: 0, opacity: 1 }}
                                                                  viewport={{ once: true }}
                                                                  transition={{ delay: i * 0.1 }}
                                                                  className="flex gap-4 items-start"
                                                            >
                                                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                                                        {edu.year.slice(-2)}
                                                                  </div>
                                                                  <div>
                                                                        <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                                                                        <p className="text-gray-600">{edu.institution}</p>
                                                                  </div>
                                                            </motion.div>
                                                      ))}
                                                </div>

                                                {doctor.internationalTraining && (
                                                      <div className="mt-8 pt-6 border-t">
                                                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                                  <Globe className="w-5 h-5 text-blue-600" />
                                                                  International Training
                                                            </h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                  {doctor.internationalTraining.map((country: string, i: number) => (
                                                                        <span key={i} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium">
                                                                              {country}
                                                                        </span>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                )}
                                          </motion.div>

                                          {/* Awards */}
                                          {doctor.awards && (
                                                <motion.div
                                                      initial={{ y: 50, opacity: 0 }}
                                                      whileInView={{ y: 0, opacity: 1 }}
                                                      viewport={{ once: true }}
                                                      className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-8 border border-yellow-100"
                                                >
                                                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                                            <Award className="w-6 h-6 text-yellow-600" />
                                                            Awards & Recognition
                                                      </h2>
                                                      <div className="space-y-3">
                                                            {doctor.awards.map((award: string, i: number) => (
                                                                  <motion.div
                                                                        key={i}
                                                                        initial={{ scale: 0.9, opacity: 0 }}
                                                                        whileInView={{ scale: 1, opacity: 1 }}
                                                                        viewport={{ once: true }}
                                                                        transition={{ delay: i * 0.1 }}
                                                                        className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm"
                                                                  >
                                                                        <Star className="w-5 h-5 text-yellow-500 fill-current shrink-0" />
                                                                        <span className="text-gray-700">{award}</span>
                                                                  </motion.div>
                                                            ))}
                                                      </div>
                                                </motion.div>
                                          )}
                                    </div>

                                    {/* Right Column - Sidebar */}
                                    <div className="space-y-6">
                                          {/* Quick Info Card */}
                                          <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
                                          >
                                                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Information</h3>

                                                <div className="space-y-4">
                                                      <div className="flex items-start gap-3">
                                                            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                                                            <div>
                                                                  <div className="text-sm text-gray-500">Consultation Timings</div>
                                                                  <div className="text-gray-800 font-medium">{doctor.consultationTimings}</div>
                                                            </div>
                                                      </div>

                                                      <div className="flex items-start gap-3">
                                                            <Languages className="w-5 h-5 text-blue-600 mt-0.5" />
                                                            <div>
                                                                  <div className="text-sm text-gray-500">Languages</div>
                                                                  <div className="text-gray-800 font-medium">{doctor.languages.join(', ')}</div>
                                                            </div>
                                                      </div>

                                                      <div className="flex items-start gap-3">
                                                            <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
                                                            <div>
                                                                  <div className="text-sm text-gray-500">Hospital</div>
                                                                  <Link href={`/hospital/${doctor.hospitalId}`} className="text-blue-600 font-medium hover:underline">
                                                                        {doctor.hospital}
                                                                  </Link>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="mt-6 pt-6 border-t">
                                                      <Link
                                                            href={`/services/${doctor.serviceSlug}`}
                                                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
                                                      >
                                                            View {doctor.specialty} Treatments
                                                            <ChevronRight className="w-4 h-4" />
                                                      </Link>

                                                      <Link
                                                            href={`/hospital/${doctor.hospitalId}`}
                                                            className="w-full mt-3 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                                                      >
                                                            View Hospital
                                                            <Building2 className="w-4 h-4" />
                                                      </Link>
                                                </div>
                                          </motion.div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Related Doctors CTA */}
                  <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900">
                        <div className="container mx-auto px-4">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center max-w-3xl mx-auto"
                              >
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                          Explore More Specialists
                                    </h2>
                                    <p className="text-blue-100 text-lg mb-8">
                                          Find the right specialist for your medical needs from our network of world-class doctors.
                                    </p>
                                    <Link
                                          href="/doctor"
                                          className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400 transition-all"
                                    >
                                          <Users className="w-5 h-5" />
                                          View All Doctors
                                    </Link>
                              </motion.div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
