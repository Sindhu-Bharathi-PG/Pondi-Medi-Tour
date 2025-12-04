"use client";

import React, { useState, useEffect } from 'react';
import { Globe, Calendar, MapPin, Phone, Mail, Award, Heart, Star, ChevronRight, Play, Menu, X, Check } from 'lucide-react';
import Image from 'next/image';

const MedicalTourismHomepage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);

const hospitals = [
  "JIPMER (Jawaharlal Institute of Postgraduate Medical Education & Research)",
  "Pondicherry Institute of Medical Sciences (PIMS)",
  "Mahatma Gandhi Medical College & Research Institute (MGMCRI)",
  "GEM Hospital",
  "Aravind Eye Hospital",
  "The POSH - Pondy Ortho Speciality Hospital",
  "East Coast Hospital",
  "Dr. Dentsmile Dental Clinic",
  "Indira IVF Centre",
  "Quiet Healing Centre",
  "Aarupadai Veedu Medical College & Hospital",
  "Be Well Hospital Pondicherry",
  "Sri Manakula Vinayagar Medical College & Hospital (SMVMCH)",
  "New Medical Centre (NMC Hospital)",
  "Rajiv Gandhi Women and Children Hospital",
  "Hope Neuro Multispeciality Hospital",
  "Kumaran Hospital",
  "Saram Multispeciality Hospital",
  "Pondy Cancer Hospital and Research Centre",
  "Cluny Hospital"
];
const diseases = [
  "Orthopedics & Bone Fracture Treatment",
  "Eye Surgery & Cataract Removal",
  "IVF & Fertility Treatments",
  "Dental Care & Cosmetic Dentistry",
  "Cardiac Surgery & Heart Diseases",
  "Gastroenterology (Digestive System Disorders)",
  "Cancer Treatment & Oncology",
  "Knee Replacement",
  "Hip Replacement",
  "Cataract Surgery",
  "Neurology & Stroke Rehabilitation",
  "Nephrology (Kidney Disorders & Dialysis)",
  "Urology & Prostate Care",
  "Pulmonology (Lung & Chest Diseases)",
  "Dermatology & Cosmetic Skin Treatments",
  "Pediatrics & Neonatal Care",
  "Obstetrics & Gynecology (Women’s Health)",
  "Endocrinology (Diabetes & Thyroid Disorders)",
  "Psychiatry & Mental Health",
  "ENT (Ear, Nose & Throat Disorders)",
  "Plastic & Reconstructive Surgery",
  "Emergency & Trauma Care",
  "Physiotherapy & Rehabilitation",
  "Dental Implants & Oral Surgery",
  "Laparoscopic & Robotic Surgery",
  "Spine Surgery & Joint Replacement",
  "Liver & Gastro-Liver Transplant",
  "General Medicine & Family Practice"
];
  
  const filteredResults = searchQuery.length > 0 
    ? [...hospitals, ...diseases].filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600',
      title: 'World-Class Medical Excellence',
      subtitle: 'Advanced procedures with internationally trained specialists'
    },
    {
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600',
      title: 'Serene Coastal Recovery',
      subtitle: 'Heal in the tranquil beauty of French-Indian heritage'
    }
  ];

  const testimonials = [
    {
      name: 'John D.',
      location: 'USA',
      procedure: 'Knee Replacement',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      quote: 'The hospital was better than at home. My surgeon was FRCS-trained, and I recovered in paradise. I saved over $40,000.',
      isVideo: true
    },
    {
      name: 'Priya S.',
      location: 'Delhi',
      procedure: 'IVF Treatment',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
      quote: 'The team handled everything. The doctors were amazing, and the peaceful environment was a blessing during a stressful time.'
    },
    {
      name: 'Ahmed R.',
      location: 'Dubai',
      procedure: 'Cardiac Surgery',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
      quote: 'World-class care at a fraction of the cost. The combination of medical expertise and wellness recovery exceeded all expectations.'
    }
  ];

const doctors = [
  {
    name: 'Dr. V. Veerappan',
    credentials: 'MBBS, MS (Orthopaedics), FRCS (Glasgow)',
    specialty: 'Spine & Joint Replacement (Orthopaedics)',
    experience: '31+ years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300'
  },
  {
    name: 'Dr. V. M. Thomas',
    credentials: 'PhD, FSAB (Reproductive Biotechnology)',
    specialty: 'IVF & Fertility Specialist',
    experience: 'Pioneer in South India & 10,000+ couples treated',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300'
  },
  {
    name: 'Dr. Ramya R',
    credentials: 'MBBS, DGO, FRM (Fellow in Reproductive Medicine)',
    specialty: 'Infertility Consultant – IVF, IUI, Donor programs',
    experience: '11+ years',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300'
  }
];


  return (
    <div className={`min-h-screen bg-white ${fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : ''} ${highContrast ? 'bg-black text-white' : ''}`}>
      {/* Accessibility Floating Button */}
      <button
        onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-blue-600 text-white p-3 rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110"
        aria-label="Accessibility Options"
        title="Accessibility Options"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
        </svg>
      </button>

      {/* Accessibility Menu */}
      {showAccessibilityMenu && (
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 translate-x-16 z-50 bg-white shadow-2xl rounded-2xl p-6 w-72 border-2 border-blue-600">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
            </svg>
            Accessibility
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Text Size</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition ${fontSize === 'normal' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  aria-pressed={fontSize === 'normal'}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium text-lg transition ${fontSize === 'large' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  aria-pressed={fontSize === 'large'}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium text-xl transition ${fontSize === 'xlarge' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  aria-pressed={fontSize === 'xlarge'}
                >
                  A
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-full px-4 py-3 rounded-lg font-semibold transition ${highContrast ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                aria-pressed={highContrast}
              >
                {highContrast ? '✓ High Contrast On' : 'High Contrast'}
              </button>
            </div>

            <div>
              <button
                onClick={() => {
                  setFontSize('normal');
                  setHighContrast(false);
                }}
                className="w-full px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-medium transition"
              >
                Reset All
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowAccessibilityMenu(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Close accessibility menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-linear-to-b from-black/50 to-transparent py-4'} ${highContrast ? 'bg-black border-b-2 border-yellow-400' : ''}`}>
        <div className="container mx-auto px-4">
          {/* Top Utility Bar */}
          <div className="flex justify-between items-center text-sm mb-2">
            <div className="flex items-center gap-4">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`bg-transparent border rounded px-2 py-1 ${scrolled ? 'text-gray-700 border-gray-300' : 'text-white border-white/30'} ${highContrast ? 'border-yellow-400 text-yellow-400' : ''}`}
                aria-label="Select language"
              >
                <option>English</option>
                <option>Français</option>
                <option>हिन्दी</option>
                <option>العربية</option>
              </select>
              <div className={`flex items-center gap-2 ${scrolled ? 'text-gray-700' : 'text-white'} ${highContrast ? 'text-yellow-400' : ''}`}>
                <Phone className="w-4 h-4" />
                <span className="font-semibold">24/7: +91-XXX-XXXX</span>
              </div>
            </div>
            <div className={`flex items-center gap-2 ${scrolled ? 'text-emerald-600' : 'text-white'} ${highContrast ? 'text-yellow-400' : ''}`}>
              <Award className="w-4 h-4" />
              <span className="text-xs font-medium">NABH-Accredited Network</span>
            </div>
          </div>

          {/* Main Navigation with Search */}
          <div className="flex justify-between items-center gap-4">
            <div className={`text-2xl font-bold ${scrolled ? 'text-emerald-600' : 'text-white'} ${highContrast ? 'text-yellow-400' : ''}`}>
            Pondy HealthPort
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search hospitals or treatments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className={`w-full px-4 py-2 pl-10 rounded-full border-2 transition-all ${
                    scrolled ? 'bg-white border-gray-300 text-gray-800' : 'bg-white/20 backdrop-blur-md border-white/30 text-white placeholder-white/70'
                  } ${highContrast ? 'bg-black border-yellow-400 text-yellow-400' : ''} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  aria-label="Search hospitals and treatments"
                />
                <svg className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${scrolled ? 'text-gray-400' : 'text-white/70'} ${highContrast ? 'text-yellow-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Search Results Dropdown */}
              {searchFocused && filteredResults.length > 0 && (
                <div className={`absolute top-full mt-2 w-full rounded-2xl shadow-2xl overflow-hidden z-50 ${highContrast ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
                  <div className="max-h-80 overflow-y-auto">
                    {filteredResults.map((result, index) => (
                      <button
                        key={index}
                        className={`w-full px-4 py-3 text-left transition flex items-center gap-3 ${
                          highContrast ? 'hover:bg-yellow-400 hover:text-black text-yellow-400' : 'hover:bg-emerald-50 text-gray-700'
                        }`}
                        onClick={() => {
                          setSearchQuery(result);
                          setSearchFocused(false);
                        }}
                      >
                        {hospitals.includes(result) ? (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-600'}`}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                            </svg>
                          </div>
                        ) : (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-100 text-emerald-600'}`}>
                            <Heart className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-semibold">{result}</div>
                          <div className={`text-xs ${highContrast ? 'text-yellow-400/70' : 'text-gray-500'}`}>
                            {hospitals.includes(result) ? 'Hospital / Clinic' : 'Treatment / Specialty'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchFocused && searchQuery && filteredResults.length === 0 && (
                <div className={`absolute top-full mt-2 w-full rounded-2xl shadow-2xl p-4 ${highContrast ? 'bg-black border-2 border-yellow-400 text-yellow-400' : 'bg-white text-gray-600'}`}>
                  No results found. Try different keywords.
                </div>
              )}
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className={`font-medium hover:text-emerald-600 transition ${scrolled ? 'text-gray-700' : 'text-white'} ${highContrast ? 'text-yellow-400' : ''}`}>Home</a>
              <a href="#" className={`font-medium hover:text-emerald-600 transition ${scrolled ? 'text-gray-700' : 'text-white'} ${highContrast ? 'text-yellow-400' : ''}`}>Hospitals</a>
              <button className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:scale-105'
              }`}>
                Get Free Quote
              </button>
            </nav>

            <button 
              className={`md:hidden ${scrolled ? 'text-gray-700' : 'text-white'} ${highContrast ? 'text-yellow-400' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="main-content" className="relative h-screen overflow-hidden" role="banner">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentHeroSlide}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={slide.subtitle}
            />
            <div className={`absolute inset-0 ${highContrast ? 'bg-black/90' : 'bg-linear-to-r from-black/70 via-black/50 to-transparent'}`} />
          </div>
        ))}
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white space-y-6 animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                World-Class Treatment.<br />
                <span className={`text-transparent bg-clip-text ${highContrast ? 'text-yellow-400' : 'bg-linear-to-r from-emerald-400 to-teal-300'}`}>
                  Tranquil Recovery.
                </span>
              </h1>
              <p className={`text-xl md:text-2xl leading-relaxed ${highContrast ? 'text-yellow-400' : 'text-gray-200'}`}>
                Discover Pondicherry: The smart, serene alternative for your medical journey. World-class doctors, NABH-accredited hospitals, and a unique healing environment.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
                  highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:shadow-2xl hover:scale-105'
                }`} aria-label="Get your free medical quote">
                  Get My Free Quote
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
                <button className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border ${
                  highContrast ? 'bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black' : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border-white/30'
                }`}>
                  Book Local Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroSlide(index)}
              className={`w-12 h-1 rounded transition-all ${
                index === currentHeroSlide ? 'bg-white w-16' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Audience-Specific Funnels */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                color: 'from-blue-500 to-indigo-500',
                title: 'International Patients',
                subtitle: 'Traveling for Treatment?',
                description: 'Access all-inclusive packages for surgery, travel, and 5-star recovery. Save up to 80%.',
                cta: 'See International Packages'
              },
              {
                icon: MapPin,
                color: 'from-emerald-500 to-teal-500',
                title: 'North & South India',
                subtitle: "Heal in India's French Riviera",
                description: 'Escape the city. Combine your procedure with a peaceful, rejuvenating retreat by the sea.',
                cta: 'Explore Wellness Packages'
              },
              {
                icon: Calendar,
                color: 'from-orange-500 to-red-500',
                title: 'Local Patients',
                subtitle: 'Pondicherry Residents',
                description: 'Get direct access and book appointments with our network of top-rated local specialists.',
                cta: 'Find a Doctor Near You'
              }
            ].map((card, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                <div className={`h-2 bg-linear-to-r ${card.color}`} />
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-full bg-linear-to-r ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{card.subtitle}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>
                  <button className={`text-transparent bg-clip-text bg-linear-to-r ${card.color} font-semibold flex items-center gap-2 group-hover:gap-4 transition-all`}>
                    {card.cta}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-linear-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">From Aches to Ease. Hear Their Stories.</h2>
            <p className="text-xl text-emerald-100">Real patients. Real transformations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="relative mb-4">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white/30 object-cover"
                  />
                  {testimonial.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition">
                        <Play className="w-6 h-6 text-emerald-600 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t border-white/20 pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-emerald-100 text-sm">{testimonial.location} • {testimonial.procedure}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              See All Patient Stories
            </button>
          </div>
        </div>
      </section>

      {/* Featured Specialists */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gray-800">World-Class Doctors. Personal Care.</h2>
            <p className="text-xl text-gray-600">Internationally trained specialists dedicated to your wellness</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div key={index} className="group relative bg-linear-to-b from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-80 overflow-hidden">
                  <Image 
                    src={doctor.image} 
                    alt={doctor.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{doctor.name}</h3>
                    <p className="text-emerald-300 text-sm font-medium">{doctor.credentials}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-emerald-600">
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">{doctor.specialty}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{doctor.experience}</p>
                  <button className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-4 transition-all">
                    View Profile
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Meet Our Entire Medical Team
            </button>
          </div>
        </div>
      </section>

      {/* Hybrid Packages */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gray-800">Don&apos;t Just Get Treated. Heal.</h2>
            <p className="text-xl text-gray-600">Unique Hybrid Packages combining medical excellence with rejuvenating wellness stays</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'The Ortho-Rejuvenation Journey',
                image1: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600',
                image2: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
                description: 'Includes Total Knee Replacement, 14-day recovery at Auroville\'s Quiet Healing Centre, aquatic physiotherapy, and all transfers.',
                price: 'From $8,500'
              },
              {
                title: 'The Dental-Heritage Journey',
                image1: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600',
                image2: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600',
                description: 'Includes Full Mouth Implants, 7-day recuperation in a French heritage boutique hotel, and guided local tours.',
                price: 'From $6,200'
              }
            ].map((pkg, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="grid grid-cols-2 h-64">
                  <div className="relative overflow-hidden">
                    <Image src={pkg.image1} alt="Medical" fill className="object-cover" />
                    <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Medical
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <Image src={pkg.image2} alt="Wellness" fill className="object-cover" />
                    <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Wellness
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{pkg.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{pkg.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-emerald-600">{pkg.price}</span>
                    <button className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Explore All Hybrid Packages
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-linear-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Your Seamless Journey to Wellness in 4 Steps</h2>
            <p className="text-xl text-gray-300">From consultation to recovery, we handle everything</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Free Virtual Consultation',
                description: 'Submit your records, get a free quote, and have a video call with your doctor.',
                icon: '🩺'
              },
              {
                step: '02',
                title: 'We Plan Everything',
                description: 'We handle your visa invitation letter, book your accommodation, and schedule all appointments.',
                icon: '📋'
              },
              {
                step: '03',
                title: 'Arrive & Heal',
                description: 'A personal coordinator meets you at the airport, manages all hospital admissions, and is your 24/7 advocate.',
                icon: '🏥'
              },
              {
                step: '04',
                title: 'Recover & Return',
                description: 'Enjoy a seamless transfer to your wellness retreat for recovery, followed by your comfortable journey home.',
                icon: '🌴'
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">{step.icon}</div>
                <div className="text-emerald-400 text-sm font-bold mb-2">{step.step}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Learn More About Our Process
            </button>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-2xl font-bold mb-8 text-gray-800">Our Vetted Network of NABH-Accredited Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['GEM Hospital', 'Aravind Eye', 'POSH Hospital', 'Quiet Healing Centre', 'Dr. Dentsmile'].map((partner, index) => (
              <div key={index} className="bg-gray-100 px-8 py-4 rounded-lg font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-linear-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Your Journey to Health and Wellness Starts Here.</h2>
              <p className="text-xl text-emerald-100">Take the first step. Get a free, confidential medical opinion and an all-inclusive cost estimate.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <form className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Full Name*" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-gray-800"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    type="email" 
                    placeholder="Email Address*" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-gray-800"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone (with country code)*" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-gray-800"
                  />
                </div>
                <textarea 
                  placeholder="Tell us about your medical needs (optional)" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-gray-800"
                />
                <button 
                  type="submit"
                  className="w-full bg-linear-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get My Free Quote Now
                  <ChevronRight className="w-6 h-6" />
                </button>
                <p className="text-center text-gray-500 text-sm">
                  <Check className="w-4 h-4 inline text-emerald-600" /> 100% confidential. No obligations.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Pondicherry Medical Journeys</h3>
              <p className="text-sm leading-relaxed">Transforming healthcare through world-class medical expertise and serene coastal healing.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Popular Treatments</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition">Orthopedics</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">IVF & Fertility</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Dental Care</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Gastroenterology</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Eye Surgery</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Plan Your Trip</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition">How It Works</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Visa Information</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Patient Stories</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Wellness Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 shrink-0" />
                  <span>Pondicherry, India</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-1 shrink-0" />
                  <span>24/7: +91-XXX-XXXX</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-1 shrink-0" />
                  <span>care@pondymedical.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 Pondicherry Medical Journeys. All rights reserved. | <a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a> | <a href="#" className="hover:text-emerald-400 transition">Terms of Use</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MedicalTourismHomepage;