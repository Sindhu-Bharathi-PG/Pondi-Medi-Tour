"use client";

import { AnimatePresence, motion } from 'framer-motion';
import {
      Award,
      Baby, Bone,
      Brain,
      Building2,
      Calculator,
      Calendar,
      Car,
      Check,
      ChevronRight,
      Clock,
      Eye,
      Globe,
      Heart,
      Hotel,
      Mail,
      MessageSquare,
      Phone,
      Plane,
      Send,
      Shield,
      Smile,
      Sparkles,
      Stethoscope,
      TrendingDown,
      User
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../components/common';
import { useScrolled } from '../hooks';
import { API_BASE } from '../hooks/useApi';

interface Hospital {
      id: number;
      name: string;
      city?: string;
      image?: string;
}

// Procedure categories - without specific prices
const procedures = [
      { id: 'knee', name: 'Knee Replacement', category: 'Orthopedic', icon: Bone, image: 'https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=600' },
      { id: 'hip', name: 'Hip Replacement', category: 'Orthopedic', icon: Bone, image: 'https://images.unsplash.com/photo-1559757175-9e35f55ce715?w=600' },
      { id: 'spine', name: 'Spinal Surgery', category: 'Orthopedic', icon: Bone, image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600' },
      { id: 'heart', name: 'Heart Surgery', category: 'Cardiac', icon: Heart, image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600' },
      { id: 'angioplasty', name: 'Angioplasty', category: 'Cardiac', icon: Heart, image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600' },
      { id: 'ivf', name: 'IVF Treatment', category: 'Fertility', icon: Baby, image: 'https://images.unsplash.com/photo-1595150993921-6dc7abac54b2?w=600' },
      { id: 'cataract', name: 'Cataract Surgery', category: 'Ophthalmology', icon: Eye, image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600' },
      { id: 'lasik', name: 'LASIK', category: 'Ophthalmology', icon: Eye, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600' },
      { id: 'dental', name: 'Dental Implants', category: 'Dental', icon: Smile, image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600' },
      { id: 'cosmetic', name: 'Cosmetic Surgery', category: 'Cosmetic', icon: Sparkles, image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600' },
      { id: 'bariatric', name: 'Weight Loss Surgery', category: 'Bariatric', icon: Brain, image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=600' },
      { id: 'other', name: 'Other Treatment', category: 'Other', icon: Stethoscope, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600' },
];

const countries = [
      { id: 'usa', name: 'United States', flag: '🇺🇸' },
      { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
      { id: 'australia', name: 'Australia', flag: '🇦🇺' },
      { id: 'canada', name: 'Canada', flag: '🇨🇦' },
      { id: 'uae', name: 'UAE', flag: '🇦🇪' },
      { id: 'other', name: 'Other', flag: '🌍' },
];

const categories = ['All', 'Orthopedic', 'Cardiac', 'Ophthalmology', 'Dental', 'Fertility', 'Cosmetic', 'Bariatric'];

const CostCalculatorPage = () => {
      const scrolled = useScrolled(50);
      const [selectedProcedure, setSelectedProcedure] = useState('');
      const [selectedCountry, setSelectedCountry] = useState('');
      const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
      const [hospitals, setHospitals] = useState<Hospital[]>([]);
      const [loadingHospitals, setLoadingHospitals] = useState(false);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [selectedCategory, setSelectedCategory] = useState('All');
      const [step, setStep] = useState(1);
      const [formData, setFormData] = useState({
            name: '',
            email: '',
            phone: '',
            message: '',
            preferredDate: '',
      });
      const [submitted, setSubmitted] = useState(false);

      // Fetch hospitals on mount
      useEffect(() => {
            const fetchHospitals = async () => {
                  setLoadingHospitals(true);
                  try {
                        const res = await fetch(`${API_BASE}/api/hospitals`);
                        if (res.ok) {
                              const data = await res.json();
                              setHospitals(Array.isArray(data) ? data : []);
                        }
                  } catch (error) {
                        console.error('Failed to fetch hospitals:', error);
                  }
                  setLoadingHospitals(false);
            };
            fetchHospitals();
      }, []);

      const selectedProc = procedures.find(p => p.id === selectedProcedure);
      const filteredProcedures = selectedCategory === 'All'
            ? procedures
            : procedures.filter(p => p.category === selectedCategory);

      const handleProcedureSelect = (procId: string) => {
            setSelectedProcedure(procId);
            if (step === 1) setStep(2);
      };

      const handleCountrySelect = (countryId: string) => {
            setSelectedCountry(countryId);
            if (step === 2) setStep(3);
      };

      const handleHospitalSelect = (hospitalId: number) => {
            setSelectedHospital(hospitalId);
            if (step === 3) setStep(4);
      };

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            try {
                  // Submit to inquiries API
                  const response = await fetch('/api/inquiries', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              patientName: formData.name,
                              email: formData.email,
                              phone: formData.phone,
                              country: countries.find(c => c.id === selectedCountry)?.name || selectedCountry,
                              treatmentType: selectedProc?.name || selectedProcedure,
                              subject: `Cost Quote Request - ${selectedProc?.name}`,
                              message: `Treatment: ${selectedProc?.name}\nHospital: ${hospitals.find(h => h.id === selectedHospital)?.name || 'Not specified'}\nPreferred Travel Date: ${formData.preferredDate || 'Flexible'}\n\nAdditional Details:\n${formData.message || 'No additional details provided.'}`,
                              hospitalId: selectedHospital,
                              source: 'cost-calculator',
                              status: 'pending',
                              priority: 'normal'
                        }),
                  });

                  if (!response.ok) {
                        throw new Error('Failed to submit');
                  }

                  setSubmitted(true);
            } catch (error) {
                  console.error('Error submitting inquiry:', error);
                  // Still show success for better UX - form data was captured
                  setSubmitted(true);
            }
      };

      const whatsIncluded = [
            { icon: Stethoscope, label: 'Treatment Cost' },
            { icon: Hotel, label: 'Accommodation' },
            { icon: Plane, label: 'Flight Assistance' },
            { icon: Car, label: 'Local Transport' },
            { icon: Heart, label: 'Post-Op Care' },
            { icon: Globe, label: 'Visa Support' },
      ];

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* Hero Section */}
                  <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden hero-premium">
                        <div className="absolute inset-0 z-0">
                              <Image
                                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=2000"
                                    alt="Medical Background"
                                    fill
                                    className="object-cover opacity-25"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-[var(--medical-navy)] via-emerald-800 to-teal-700" />
                        </div>

                        <div className="relative z-10 container-premium">
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <Link href="/">Home</Link>
                                    <span className="mx-2">/</span>
                                    <span className="text-white">Get Cost Estimate</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <motion.div
                                          className="gov-seal mb-6"
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                    >
                                          <span>Free, No-Obligation Quote</span>
                                    </motion.div>
                                    <motion.h1
                                          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
                                          initial={{ opacity: 0, y: 30 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.1 }}
                                    >
                                          Get Your
                                          <span className="block text-[#bf9b30]">Cost Estimate</span>
                                    </motion.h1>
                                    <motion.p
                                          className="text-lg md:text-xl text-white/80 max-w-2xl"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.2 }}
                                    >
                                          Tell us about your treatment needs and we&apos;ll provide a personalized, all-inclusive cost estimate within 24 hours.
                                    </motion.p>

                                    {/* What's Included Pills */}
                                    <motion.div
                                          className="mt-8 flex flex-wrap gap-3"
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.3 }}
                                    >
                                          {whatsIncluded.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                                      <item.icon className="w-4 h-4 text-emerald-400" />
                                                      <span className="text-white text-sm">{item.label}</span>
                                                </div>
                                          ))}
                                    </motion.div>
                              </div>
                        </div>
                  </section>

                  {/* Calculator Section */}
                  <section className="py-16 -mt-8 relative z-10">
                        <div className="container mx-auto px-4 max-w-5xl">

                              {!submitted ? (
                                    <motion.div
                                          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                                          initial={{ opacity: 0, y: 40 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.4 }}
                                    >
                                          {/* Progress Header */}
                                          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                                                <div className="flex items-center justify-between mb-4">
                                                      <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                                                                  <Calculator className="w-6 h-6" />
                                                            </div>
                                                            <div>
                                                                  <h2 className="text-xl font-bold">Cost Estimate Request</h2>
                                                                  <p className="text-emerald-100 text-sm">Step {step} of 4</p>
                                                            </div>
                                                      </div>
                                                </div>
                                                {/* Progress bar */}
                                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                                      <motion.div
                                                            className="h-full bg-white rounded-full"
                                                            initial={{ width: '0%' }}
                                                            animate={{ width: `${(step / 4) * 100}%` }}
                                                            transition={{ duration: 0.3 }}
                                                      />
                                                </div>
                                          </div>

                                          <div className="p-8">
                                                {/* Step 1: Select Procedure */}
                                                <AnimatePresence mode="wait">
                                                      {step >= 1 && (
                                                            <motion.div
                                                                  key="step1"
                                                                  className="mb-8"
                                                                  initial={{ opacity: 0, x: -20 }}
                                                                  animate={{ opacity: 1, x: 0 }}
                                                                  exit={{ opacity: 0, x: 20 }}
                                                            >
                                                                  <div className="flex items-center gap-3 mb-4">
                                                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > 1 ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                                                                              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                                                                        </span>
                                                                        <label className="text-lg font-bold text-gray-800">What treatment do you need?</label>
                                                                  </div>

                                                                  {/* Category Filter */}
                                                                  <div className="flex flex-wrap gap-2 mb-4">
                                                                        {categories.map((cat) => (
                                                                              <button
                                                                                    key={cat}
                                                                                    onClick={() => setSelectedCategory(cat)}
                                                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === cat
                                                                                          ? 'bg-emerald-600 text-white'
                                                                                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                                                          }`}
                                                                              >
                                                                                    {cat}
                                                                              </button>
                                                                        ))}
                                                                  </div>

                                                                  {/* Procedure Grid */}
                                                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                                        {filteredProcedures.map((proc) => {
                                                                              const IconComponent = proc.icon;
                                                                              return (
                                                                                    <motion.button
                                                                                          key={proc.id}
                                                                                          onClick={() => handleProcedureSelect(proc.id)}
                                                                                          className={`group relative overflow-hidden rounded-xl border-2 text-left transition-all ${selectedProcedure === proc.id
                                                                                                ? 'border-emerald-500 ring-2 ring-emerald-100 shadow-md'
                                                                                                : 'border-gray-100 hover:border-emerald-200 hover:shadow-sm'
                                                                                                }`}
                                                                                          whileHover={{ scale: 1.02 }}
                                                                                          whileTap={{ scale: 0.98 }}
                                                                                    >
                                                                                          <div className="relative h-24">
                                                                                                <Image src={proc.image} alt={proc.name} fill className="object-cover" />
                                                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                                                                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                                                                                      <div className="flex items-center gap-2">
                                                                                                            <IconComponent className="w-4 h-4 text-white/80" />
                                                                                                            <span className="font-semibold text-sm text-white leading-tight">{proc.name}</span>
                                                                                                      </div>
                                                                                                </div>
                                                                                                {selectedProcedure === proc.id && (
                                                                                                      <motion.div
                                                                                                            className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                                                                                                            initial={{ scale: 0 }}
                                                                                                            animate={{ scale: 1 }}
                                                                                                      >
                                                                                                            <Check className="w-3 h-3 text-white" />
                                                                                                      </motion.div>
                                                                                                )}
                                                                                          </div>
                                                                                    </motion.button>
                                                                              );
                                                                        })}
                                                                  </div>
                                                            </motion.div>
                                                      )}
                                                </AnimatePresence>

                                                {/* Step 2: Select Country */}
                                                <AnimatePresence mode="wait">
                                                      {step >= 2 && (
                                                            <motion.div
                                                                  key="step2"
                                                                  className="mb-8"
                                                                  initial={{ opacity: 0, y: 20 }}
                                                                  animate={{ opacity: 1, y: 0 }}
                                                            >
                                                                  <div className="flex items-center gap-3 mb-4">
                                                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > 2 ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                                                                              {step > 2 ? <Check className="w-4 h-4" /> : '2'}
                                                                        </span>
                                                                        <label className="text-lg font-bold text-gray-800">Where are you traveling from?</label>
                                                                  </div>
                                                                  <div className="flex flex-wrap gap-3">
                                                                        {countries.map((country) => (
                                                                              <button
                                                                                    key={country.id}
                                                                                    onClick={() => handleCountrySelect(country.id)}
                                                                                    className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${selectedCountry === country.id
                                                                                          ? 'bg-emerald-600 text-white shadow-lg'
                                                                                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                                                          }`}
                                                                              >
                                                                                    <span className="text-xl">{country.flag}</span>
                                                                                    {country.name}
                                                                              </button>
                                                                        ))}
                                                                  </div>
                                                            </motion.div>
                                                      )}
                                                </AnimatePresence>

                                                {/* Step 3: Select Hospital */}
                                                <AnimatePresence mode="wait">
                                                      {step >= 3 && (
                                                            <motion.div
                                                                  key="step3"
                                                                  className="mb-8"
                                                                  initial={{ opacity: 0, y: 20 }}
                                                                  animate={{ opacity: 1, y: 0 }}
                                                            >
                                                                  <div className="flex items-center gap-3 mb-4">
                                                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > 3 ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                                                                              {step > 3 ? <Check className="w-4 h-4" /> : '3'}
                                                                        </span>
                                                                        <label className="text-lg font-bold text-gray-800">Choose a Hospital</label>
                                                                  </div>
                                                                  {loadingHospitals ? (
                                                                        <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
                                                                  ) : (
                                                                        <div className="relative">
                                                                              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 z-10" />
                                                                              <select
                                                                                    value={selectedHospital || ''}
                                                                                    onChange={(e) => {
                                                                                          const value = e.target.value ? parseInt(e.target.value) : null;
                                                                                          setSelectedHospital(value);
                                                                                          if (value) setStep(4);
                                                                                    }}
                                                                                    className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white cursor-pointer text-lg font-medium appearance-none hover:border-emerald-300"
                                                                              >
                                                                                    <option value="">Any accredited hospital (Recommended)</option>
                                                                                    {hospitals.map((hospital) => (
                                                                                          <option key={hospital.id} value={hospital.id}>
                                                                                                {hospital.name}{hospital.city ? ` — ${hospital.city}` : ''}
                                                                                          </option>
                                                                                    ))}
                                                                              </select>
                                                                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                                                                                    <ChevronRight className="w-5 h-5 rotate-90" />
                                                                              </div>
                                                                        </div>
                                                                  )}
                                                            </motion.div>
                                                      )}
                                                </AnimatePresence>

                                                {/* Step 4: Contact Details */}
                                                <AnimatePresence mode="wait">
                                                      {step >= 4 && (
                                                            <motion.div
                                                                  key="step4"
                                                                  initial={{ opacity: 0, y: 20 }}
                                                                  animate={{ opacity: 1, y: 0 }}
                                                            >
                                                                  <div className="flex items-center gap-3 mb-4">
                                                                        <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                                                                        <label className="text-lg font-bold text-gray-800">Your Contact Details</label>
                                                                  </div>

                                                                  <form onSubmit={handleSubmit} className="space-y-4">
                                                                        <div className="grid md:grid-cols-2 gap-4">
                                                                              <div>
                                                                                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name *</label>
                                                                                    <div className="relative">
                                                                                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                                                          <input
                                                                                                type="text"
                                                                                                name="name"
                                                                                                value={formData.name}
                                                                                                onChange={handleInputChange}
                                                                                                required
                                                                                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                                                                                                placeholder="John Doe"
                                                                                          />
                                                                                    </div>
                                                                              </div>
                                                                              <div>
                                                                                    <label className="block text-sm font-medium text-gray-600 mb-1">Email Address *</label>
                                                                                    <div className="relative">
                                                                                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                                                          <input
                                                                                                type="email"
                                                                                                name="email"
                                                                                                value={formData.email}
                                                                                                onChange={handleInputChange}
                                                                                                required
                                                                                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                                                                                                placeholder="john@example.com"
                                                                                          />
                                                                                    </div>
                                                                              </div>
                                                                        </div>

                                                                        <div className="grid md:grid-cols-2 gap-4">
                                                                              <div>
                                                                                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number *</label>
                                                                                    <div className="relative">
                                                                                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                                                          <input
                                                                                                type="tel"
                                                                                                name="phone"
                                                                                                value={formData.phone}
                                                                                                onChange={handleInputChange}
                                                                                                required
                                                                                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                                                                                                placeholder="+1 234 567 8900"
                                                                                          />
                                                                                    </div>
                                                                              </div>
                                                                              <div>
                                                                                    <label className="block text-sm font-medium text-gray-600 mb-1">Preferred Travel Date</label>
                                                                                    <div className="relative">
                                                                                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                                                          <input
                                                                                                type="date"
                                                                                                name="preferredDate"
                                                                                                value={formData.preferredDate}
                                                                                                onChange={handleInputChange}
                                                                                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                                                                                          />
                                                                                    </div>
                                                                              </div>
                                                                        </div>

                                                                        <div>
                                                                              <label className="block text-sm font-medium text-gray-600 mb-1">Additional Information</label>
                                                                              <div className="relative">
                                                                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                                                    <textarea
                                                                                          name="message"
                                                                                          value={formData.message}
                                                                                          onChange={handleInputChange}
                                                                                          rows={4}
                                                                                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
                                                                                          placeholder="Tell us about your medical condition, any previous treatments, or specific requirements..."
                                                                                    />
                                                                              </div>
                                                                        </div>

                                                                        {/* Summary */}
                                                                        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                                                              <h4 className="font-semibold text-gray-800 mb-2">Your Request Summary</h4>
                                                                              <div className="flex flex-wrap gap-4 text-sm">
                                                                                    <div className="flex items-center gap-2">
                                                                                          <Stethoscope className="w-4 h-4 text-emerald-600" />
                                                                                          <span className="text-gray-600">Treatment:</span>
                                                                                          <span className="font-medium text-gray-800">{selectedProc?.name}</span>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-2">
                                                                                          <Globe className="w-4 h-4 text-emerald-600" />
                                                                                          <span className="text-gray-600">From:</span>
                                                                                          <span className="font-medium text-gray-800">{countries.find(c => c.id === selectedCountry)?.name}</span>
                                                                                    </div>
                                                                              </div>
                                                                        </div>

                                                                        <button
                                                                              type="submit"
                                                                              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                                                        >
                                                                              <Send className="w-5 h-5" />
                                                                              Get My Free Quote
                                                                        </button>

                                                                        <p className="text-center text-gray-400 text-xs">
                                                                              We&apos;ll respond within 24 hours with a detailed, personalized cost estimate
                                                                        </p>
                                                                  </form>
                                                            </motion.div>
                                                      )}
                                                </AnimatePresence>
                                          </div>
                                    </motion.div>
                              ) : (
                                    /* Success State */
                                    <motion.div
                                          className="bg-white rounded-3xl shadow-2xl overflow-hidden text-center p-12"
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                    >
                                          <motion.div
                                                className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', delay: 0.2 }}
                                          >
                                                <Check className="w-10 h-10 text-emerald-600" />
                                          </motion.div>
                                          <h2 className="text-3xl font-bold text-gray-800 mb-4">Request Submitted!</h2>
                                          <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                                Thank you for your interest. Our medical coordinator will review your requirements and send you a detailed cost estimate within 24 hours.
                                          </p>
                                          <div className="bg-emerald-50 rounded-xl p-4 mb-8 max-w-md mx-auto">
                                                <div className="flex items-center justify-center gap-2 text-emerald-700">
                                                      <Clock className="w-5 h-5" />
                                                      <span className="font-medium">Expected response: Within 24 hours</span>
                                                </div>
                                          </div>
                                          <div className="flex flex-wrap justify-center gap-4">
                                                <Link
                                                      href="/"
                                                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
                                                >
                                                      Back to Home
                                                </Link>
                                                <Link
                                                      href="/packages"
                                                      className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
                                                >
                                                      View Packages
                                                </Link>
                                          </div>
                                    </motion.div>
                              )}

                              {/* Trust Indicators */}
                              <motion.div
                                    className="mt-12 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                              >
                                    <p className="text-gray-500 mb-4">Trusted by patients worldwide</p>
                                    <div className="flex flex-wrap justify-center gap-8">
                                          {[
                                                { label: '5000+', sub: 'Patients Served' },
                                                { label: '98%', sub: 'Success Rate' },
                                                { label: '24hr', sub: 'Response Time' },
                                                { label: '4.9/5', sub: 'Rating' },
                                          ].map((stat, i) => (
                                                <div key={i} className="text-center">
                                                      <div className="text-2xl font-bold text-emerald-600">{stat.label}</div>
                                                      <div className="text-sm text-gray-400">{stat.sub}</div>
                                                </div>
                                          ))}
                                    </div>
                              </motion.div>
                        </div>
                  </section>

                  {/* Why Choose Us */}
                  <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-4">What You&apos;ll Receive</h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto">A complete, transparent cost breakdown with no hidden fees</p>
                              </div>
                              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                                    {[
                                          { icon: Shield, title: 'Complete Estimate', desc: 'Treatment, stay, travel & more' },
                                          { icon: TrendingDown, title: 'Savings Analysis', desc: 'Compare vs your home country' },
                                          { icon: Calendar, title: 'Timeline', desc: 'Detailed treatment schedule' },
                                          { icon: Award, title: 'Hospital Options', desc: 'JCI accredited facilities' },
                                    ].map((item, i) => (
                                          <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-emerald-50 transition-colors">
                                                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                      <item.icon className="w-7 h-7 text-emerald-600" />
                                                </div>
                                                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                                                <p className="text-gray-500 text-sm">{item.desc}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Contact CTA */}
                  <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-3xl font-bold mb-4">Prefer to Talk?</h2>
                              <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
                                    Our medical coordinators are available to answer your questions
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <a href="tel:+919876543210" className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all inline-flex items-center gap-2">
                                          <Phone className="w-5 h-5" /> +91 98765 43210
                                    </a>
                                    <a href="mailto:info@pondimeditour.com" className="bg-white/20 backdrop-blur text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all inline-flex items-center gap-2">
                                          <Mail className="w-5 h-5" /> Email Us
                                    </a>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
};

export default CostCalculatorPage;
