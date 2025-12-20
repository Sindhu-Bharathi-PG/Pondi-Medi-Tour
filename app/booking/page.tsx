"use client";

import { CheckCircle, ChevronRight, Clock, FileText, Mail, MapPin, Phone, Shield, Stethoscope, Upload, User } from 'lucide-react';
import { useState } from 'react';
import { Footer, Header } from '../components/common';
import { useScrolled } from '../hooks';

const BookingPage = () => {
      const scrolled = useScrolled(50);
      const [step, setStep] = useState(1);
      const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: '', treatment: '', message: '' });
      const [errors, setErrors] = useState<{ [key: string]: string }>({});

      const treatments = ['Orthopedics', 'IVF & Fertility', 'Cardiology', 'Ophthalmology', 'Dental', 'Gastroenterology', 'Neurology', 'Oncology'];

      const handleStep1Next = () => {
            const newErrors: { [key: string]: string } = {};
            if (!formData.name.trim()) newErrors.name = 'Please enter your full name';
            if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
            if (!formData.phone.trim()) newErrors.phone = 'Please enter a phone number';
            if (!formData.country.trim()) newErrors.country = 'Please select your country';
            setErrors(newErrors);
            if (Object.keys(newErrors).length === 0) {
                  setStep(2);
            } else {
                  const firstInvalid = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
                  firstInvalid?.focus();
            }
      };

      const handleSubmit = async () => {
            try {
                  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/inquiries`, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              // Patient Information (structured)
                              patientName: formData.name,
                              email: formData.email,
                              phone: formData.phone, // ✅ Now a separate field
                              country: formData.country, // ✅ Now a separate field

                              // Inquiry Details
                              treatmentType: formData.treatment, // ✅ Now a separate field
                              subject: `Inquiry regarding ${formData.treatment}`,
                              message: formData.message, // ✅ Clean message only

                              // Source tracking
                              source: 'website',
                              referrerUrl: typeof window !== 'undefined' ? window.location.href : null,
                        }),
                  });

                  if (response.ok) {
                        setStep(3);
                  } else {
                        // Handle error (optional: show toast or alert)
                        console.error("Failed to submit inquiry");
                        alert("Something went wrong. Please try again.");
                  }
            } catch (error) {
                  console.error("Error submitting inquiry:", error);
                  alert("Network error. Please try again.");
            }
      };

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden hero-premium">
                        <div className="relative container-premium">
                              {/* Breadcrumb */}
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <a href="/">Home</a>
                                    <span className="mx-2">/</span>
                                    <span className="text-white">Book Consultation</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <div className="gov-seal mb-6">
                                          <span>Free Consultation • No Obligations</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                                          Book Your
                                          <span className="block text-[#bf9b30]">Medical Journey</span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                                          Secure your slot with zero booking fees. Whether it&apos;s a doctor&apos;s appointment or a wellness retreat, book it here.
                                    </p>
                              </div>
                        </div>
                  </section>

                  <section className="py-12 relative z-10">
                        <div className="container-premium">
                              <div className="max-w-4xl mx-auto">
                                    {/* Progress Steps */}
                                    <div className="flex items-center justify-center gap-4 mb-10">
                                          {[1, 2, 3].map((s) => (
                                                <div key={s} className="flex items-center gap-2">
                                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-[var(--medical-teal)] text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
                                                      {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-[var(--medical-teal)]' : 'bg-gray-200'}`} />}
                                                </div>
                                          ))}
                                    </div>

                                    <div className="card-premium p-8 md:p-12">
                                          {step === 1 && (
                                                <div>
                                                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
                                                      <div className="grid md:grid-cols-2 gap-6">
                                                            {/* Full Name */}
                                                            <div>
                                                                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Full Name *</label>
                                                                  <div className="relative">
                                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                                        <input
                                                                              id="name"
                                                                              type="text"
                                                                              value={formData.name}
                                                                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                              placeholder="John Doe"
                                                                              aria-invalid={!!errors.name}
                                                                              aria-describedby={errors.name ? 'name-error' : undefined}
                                                                        />
                                                                  </div>
                                                                  {errors.name && <p id="name-error" role="alert" className="text-red-600 mt-2 text-sm">{errors.name}</p>}
                                                            </div>

                                                            {/* Email */}
                                                            <div>
                                                                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email Address *</label>
                                                                  <div className="relative">
                                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                                        <input
                                                                              id="email"
                                                                              type="email"
                                                                              value={formData.email}
                                                                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                              placeholder="john@email.com"
                                                                              aria-invalid={!!errors.email}
                                                                              aria-describedby={errors.email ? 'email-error' : undefined}
                                                                        />
                                                                  </div>
                                                                  {errors.email && <p id="email-error" role="alert" className="text-red-600 mt-2 text-sm">{errors.email}</p>}
                                                            </div>

                                                            {/* Phone */}
                                                            <div>
                                                                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">Phone Number *</label>
                                                                  <div className="relative">
                                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                                        <input
                                                                              id="phone"
                                                                              type="tel"
                                                                              value={formData.phone}
                                                                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                              placeholder="+1 234 567 8900"
                                                                              aria-invalid={!!errors.phone}
                                                                              aria-describedby={errors.phone ? 'phone-error' : undefined}
                                                                        />
                                                                  </div>
                                                                  {errors.phone && <p id="phone-error" role="alert" className="text-red-600 mt-2 text-sm">{errors.phone}</p>}
                                                            </div>

                                                            {/* Country */}
                                                            <div>
                                                                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="country">Country *</label>
                                                                  <div className="relative">
                                                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                                        <select
                                                                              id="country"
                                                                              value={formData.country}
                                                                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                              aria-invalid={!!errors.country}
                                                                              aria-describedby={errors.country ? 'country-error' : undefined}
                                                                        >
                                                                              <option value="">Select Country</option>
                                                                              <option>United States</option>
                                                                              <option>United Kingdom</option>
                                                                              <option>UAE</option>
                                                                              <option>Singapore</option>
                                                                              <option>Australia</option>
                                                                              <option>Other</option>
                                                                        </select>
                                                                  </div>
                                                                  {errors.country && <p id="country-error" role="alert" className="text-red-600 mt-2 text-sm">{errors.country}</p>}
                                                            </div>
                                                      </div>
                                                      <button onClick={() => handleStep1Next()} className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                                            Continue <ChevronRight className="w-5 h-5" /></button>
                                                </div>
                                          )}

                                          {step === 2 && (
                                                <div>
                                                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Treatment Details</h2>
                                                      <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-4">Select Treatment Area *</label>
                                                            <div className="grid md:grid-cols-4 gap-3">
                                                                  {treatments.map((t) => (
                                                                        <button key={t} onClick={() => setFormData({ ...formData, treatment: t })}
                                                                              className={`p-4 rounded-xl border-2 text-center transition-all ${formData.treatment === t ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-indigo-300'}`}>
                                                                              <Stethoscope className={`w-6 h-6 mx-auto mb-2 ${formData.treatment === t ? 'text-indigo-600' : 'text-gray-400'}`} />
                                                                              <span className="text-sm font-medium">{t}</span>
                                                                        </button>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Condition</label>
                                                            <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4}
                                                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="Please describe your medical condition and requirements..." /></div>
                                                      <div className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
                                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                                            <p className="text-gray-600 mb-2">Upload Medical Reports (Optional)</p>
                                                            <p className="text-gray-400 text-sm">PDF, JPG, PNG up to 10MB each</p>
                                                            <button className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">Choose Files</button>
                                                      </div>
                                                      <div className="flex gap-4">
                                                            <button onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">Back</button>
                                                            <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                                                  Continue <ChevronRight className="w-5 h-5" /></button>
                                                      </div>
                                                </div>
                                          )}

                                          {step === 3 && (
                                                <div className="text-center py-8">
                                                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                            <CheckCircle className="w-10 h-10 text-green-600" />
                                                      </div>
                                                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Request Submitted!</h2>
                                                      <p className="text-gray-600 mb-8 max-w-md mx-auto">Our medical team will review your request and contact you within 24 hours with a personalized treatment plan.</p>
                                                      <div className="bg-indigo-50 rounded-2xl p-6 max-w-md mx-auto mb-8">
                                                            <h3 className="font-semibold text-indigo-800 mb-4">What Happens Next?</h3>
                                                            <div className="space-y-3 text-left">
                                                                  {['Medical team reviews your case', 'Doctor consultation scheduled', 'Personalized treatment plan shared', 'Travel & stay arrangements'].map((item, i) => (
                                                                        <div key={i} className="flex items-center gap-3"><div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</div>
                                                                              <span className="text-indigo-700">{item}</span></div>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      <button onClick={() => { setStep(1); setFormData({ name: '', email: '', phone: '', country: '', treatment: '', message: '' }); }}
                                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg">Submit Another Request</button>
                                                </div>
                                          )}
                                    </div>

                                    {/* Trust Indicators */}
                                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                                          {[{ icon: Shield, title: '100% Confidential', desc: 'Your data is secured' }, { icon: Clock, title: '24-Hour Response', desc: 'Quick turnaround' }, { icon: FileText, title: 'Free Consultation', desc: 'No obligations' }].map((item, i) => (
                                                <div key={i} className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
                                                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center"><item.icon className="w-6 h-6 text-indigo-600" /></div>
                                                      <div><div className="font-bold text-gray-800">{item.title}</div><div className="text-gray-500 text-sm">{item.desc}</div></div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>
                  <Footer />
            </div>
      );
};

export default BookingPage;
