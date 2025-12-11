"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowLeft, Building2, Calendar, Camera, CheckCircle, ChevronRight, Clock, Heart, MapPin, Microscope, Phone, Quote, Star, Stethoscope, TrendingUp, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../../components/common';

// This would ideally come from a database or API
const hospitalData: Record<string, any> = {
    '1': {
        id: 1,
        name: 'JIPMER',
        fullName: 'Jawaharlal Institute of Postgraduate Medical Education & Research',
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200',
        gallery: [
            'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800',
            'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
            'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800',
            'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
        ],
        rating: 4.9,
        reviewsRating: 2840,
        specialties: ['Multi-Specialty', 'Cardiology', 'Oncology', 'Neurology', 'Nephrology', 'Orthopedics', 'Gastroenterology', 'Pediatrics'],
        accreditation: ['NABH', 'NABL'],
        location: 'Gorimedu, Pondicherry - 605006',
        established: 1823,
        beds: 2500,
        type: 'Government',
        description: 'JIPMER is an Institute of National Importance and a premier medical institution with AIIMS-equivalent status. With over 200 years of heritage, it offers world-class medical care with cutting-edge research facilities.',
        about: 'JIPMER has been a beacon of medical excellence for over two centuries. As one of India\'s premier medical institutions, it combines heritage with modern healthcare delivery. The hospital is equipped with state-of-the-art medical technology and staffed by internationally trained specialists.',
        equipment: ['64-slice CT scanner', '3T MRI', 'Digital Operating Theaters', 'Advanced Blood Bank', 'Hybrid Cath Lab', 'Linear Accelerator'],
        highlights: [
            '1,100+ active beds across specialties',
            '50+ cardiologists trained in US/UK',
            'World-class research facilities',
            'AIIMS-equivalent status',
            '24/7 emergency services',
            'International patient wing'
        ],
        departments: [
            {
                name: 'Cardiology',
                doctors: 50,
                procedures: '5000+/year',
                image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600',
                description: 'Our Cardiology department is equipped with latest Cath Labs and offers 24/7 primary angioplasty services. We specialize in complex cardiac interventions and pediatric cardiology.',
                head: 'Dr. S. Kumar',
                commonProcedures: ['Angioplasty', 'Bypass Surgery', 'Pacemaker Implantation', 'Valve Replacement']
            },
            {
                name: 'Oncology',
                doctors: 35,
                procedures: '3000+/year',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
                description: 'Comprehensive cancer care with Medical, Surgical and Radiation Oncology under one roof. We offer advanced linear accelerators and brachytherapy.',
                head: 'Dr. R. Meier',
                commonProcedures: ['Chemotherapy', 'Radiation Therapy', 'Tumor Removal', 'Immunotherapy']
            },
            {
                name: 'Neurology',
                doctors: 25,
                procedures: '2000+/year',
                image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600',
                description: 'Advanced neuro-care for stroke, epilepsy, and complex neurological disorders using state-of-the-art neuro-navigation systems.',
                head: 'Dr. A. Singh',
                commonProcedures: ['Stroke Management', 'Epilepsy Surgery', 'Brain Tumor Surgery', 'Spine Surgery']
            },
            {
                name: 'Orthopedics',
                doctors: 30,
                procedures: '4000+/year',
                image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600',
                description: 'Specialized in joint replacements, spine surgery, and sports medicine. Our team performs complex trauma surgeries and arthroscopy.',
                head: 'Dr. P. Raj',
                commonProcedures: ['Knee Replacement', 'Hip Replacement', 'Arthroscopy', 'Fracture Verification']
            },
            {
                name: 'Nephrology',
                doctors: 20,
                procedures: '1500+/year',
                image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600',
                description: 'Complete renal care including dialysis and kidney transplantation. We have a dedicated dialysis unit with 50+ machines.',
                head: 'Dr. M. Ali',
                commonProcedures: ['Dialysis', 'Kidney Transplant', 'Biopsy', 'Stone Removal']
            },
            {
                name: 'Gastroenterology',
                doctors: 18,
                procedures: '2500+/year',
                image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600',
                description: 'Advanced digestive care with a state-of-the-art endoscopy suite. We treat liver diseases, IBD, and pancreatic disorders.',
                head: 'Dr. K. Lee',
                commonProcedures: ['Endoscopy', 'Colonoscopy', 'ERCP', 'Liver Transplant']
            }
        ],
        reviews: [
            { id: 1, user: 'Sarah J.', rating: 5, date: '2 months ago', comment: 'Exceptional care at JIPMER. The staff was incredibly supportive during my surgery. The facilities are world-class.', origin: 'UK' },
            { id: 2, user: 'Ahmed K.', rating: 5, date: '3 months ago', comment: 'World-class facilities at a fraction of the cost. Highly recommend for medical tourism. The doctors explained everything clearly.', origin: 'UAE' },
            { id: 3, user: 'Priya R.', rating: 4, date: '1 month ago', comment: 'Very professional doctors. The waiting time was a bit long, but the treatment was top-notch.', origin: 'India' },
            { id: 4, user: 'John D.', rating: 5, date: '2 weeks ago', comment: 'The cardiology department is simply the best. Dr. Kumar is a lifesaver.', origin: 'USA' },
            { id: 5, user: 'Maria G.', rating: 3, date: '4 months ago', comment: 'Good medical care but the administrative process could be faster.', origin: 'Spain' }
        ],
        facilities: [
            'Modern ICU with 100+ beds',
            'Fully equipped operation theaters',
            'Advanced diagnostic center',
            '24/7 pharmacy',
            'Blood bank',
            'Cafeteria and food services',
            'Patient accommodation',
            'Parking facilities'
        ],
        contact: {
            phone: '+91-413-2272380',
            emergency: '+91-413-2296000',
            email: 'director@jipmer.edu.in',
            website: 'https://www.jipmer.edu.in'
        },
        stats: [
            { value: '200+', label: 'Years of Excellence', icon: Building2 },
            { value: '2500+', label: 'Beds', icon: Activity },
            { value: '15000+', label: 'Procedures/Year', icon: TrendingUp },
            { value: '4.9/5', label: 'Patient Rating', icon: Star }
        ],
        nearbyHospitals: [
            { id: 2, name: 'Apollo Pondicherry', specialty: 'Multi-Specialty', distance: '4.2 km' },
            { id: 3, name: 'MGMCRI', specialty: 'General Surgery', distance: '6.8 km' },
            { id: 6, name: 'PIMS', specialty: 'Orthopedics', distance: '5.5 km' }
        ],
        touristPlaces: [
            { name: 'Promenade Beach', distance: '3.1 km', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400' },
            { name: 'Auroville', distance: '10 km', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400' },
            { name: 'Paradise Beach', distance: '8.5 km', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
            { name: 'French Quarter', distance: '2.5 km', image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400' },
            { name: 'Sri Aurobindo Ashram', distance: '4.5 km', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400' },
            { name: 'Botanical Garden', distance: '5 km', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400' },
            { name: 'Manakula Vinayagar Temple', distance: '4 km', image: 'https://images.unsplash.com/photo-1623945939223-93d39587428f?w=400' },
            { name: 'Chunnambar Boat House', distance: '9 km', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' }
        ]
    },
    '2': {
        id: 2,
        name: 'Apollo Pondicherry',
        fullName: 'Apollo Speciality Hospitals Pondicherry',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200',
        gallery: [
            'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
            'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
            'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800',
            'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        ],
        rating: 4.8,
        reviewsRating: 1560,
        specialties: ['Cardiology', 'Orthopedics', 'Neurosurgery', 'IVF', 'Oncology', 'Nephrology'],
        accreditation: ['NABH', 'JCI'],
        location: 'Ariyankuppam, Pondicherry - 605007',
        established: 2005,
        beds: 300,
        type: 'Private',
        description: 'Apollo Hospitals Pondicherry is a JCI-accredited tertiary care hospital with cutting-edge technology and international patient services.',
        about: 'Part of the prestigious Apollo Hospitals Group, this facility brings world-class healthcare to Pondicherry. With JCI accreditation, it maintains the highest international standards in patient care, safety, and service delivery.',
        equipment: ['Da Vinci Surgical Robot', 'PET-CT Scanner', '64-slice CT', 'Cath Lab', '3T MRI', 'Gamma Knife'],
        highlights: [
            'JCI accredited international standards',
            'Da Vinci robotic surgery',
            'International patient wing',
            'Multilingual staff (English, French, Arabic)',
            'Advanced diagnostic center',
            'Comprehensive oncology services'
        ],
        departments: [
            {
                name: 'Cardiology',
                doctors: 15,
                procedures: '2000+/year',
                image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600',
                description: 'Leading heart care center with advanced robotic interventions. We perform complex angioplasties and bypass surgeries.',
                head: 'Dr. V. Rao',
                commonProcedures: ['Robotic Surgery', 'Angioplasty', 'Valve Replacement', 'TAVI']
            },
            {
                name: 'Orthopedics',
                doctors: 12,
                procedures: '1500+/year',
                image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600',
                description: 'Robotic joint replacement and complex trauma management. Minimally invasive techniques for faster recovery.',
                head: 'Dr. S. Reddy',
                commonProcedures: ['Robotic Knee Replacement', 'Hip Resurfacing', 'Spine Fusion', 'Arthroscopy']
            },
            {
                name: 'Neurosurgery',
                doctors: 8,
                procedures: '800+/year',
                image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600',
                description: 'Precision neurosurgery using Gamma Knife and navigation systems. Specialized in brain and spine tumors.',
                head: 'Dr. A. Gupta',
                commonProcedures: ['Gamma Knife Radiosurgery', 'Brain Tumor Excision', 'DBS']
            },
            {
                name: 'IVF & Fertility',
                doctors: 6,
                procedures: '1200+/year',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
                description: 'High success rate fertility treatments with personalized care. State-of-the-art embryology lab.',
                head: 'Dr. M. Lakshmi',
                commonProcedures: ['IVF', 'ICSI', 'Egg Freezing', 'Genetic Testing']
            },
            {
                name: 'Oncology',
                doctors: 10,
                procedures: '1000+/year',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
                description: 'Holistic cancer care with latest immunotherapy options and precision radiation.',
                head: 'Dr. K. Chen',
                commonProcedures: ['Immunotherapy', 'Targeted Therapy', 'Robotic Onco-Surgery']
            }
        ],
        reviews: [
            { id: 1, user: 'Michael B.', rating: 5, date: '1 month ago', comment: 'The robotic surgery was a success. Recovery was much faster than expected.', origin: 'USA' },
            { id: 2, user: 'Fatima H.', rating: 5, date: '2 weeks ago', comment: 'Excellent fertility center. We are so grateful for the care we received.', origin: 'Oman' },
            { id: 3, user: 'David W.', rating: 4, date: '3 months ago', comment: 'Very clean and modern hospital. Staff speaks good English.', origin: 'Australia' },
            { id: 4, user: 'Sophie L.', rating: 5, date: '1 week ago', comment: 'The international patient lounge made our stay very comfortable.', origin: 'France' },
            { id: 5, user: 'Rajesh K.', rating: 4, date: '2 months ago', comment: 'Great infrastructure and doctors. Parking can be improved.', origin: 'Singapore' }
        ],
        facilities: [
            'International patient lounge',
            'Private deluxe rooms',
            'Multi-cuisine restaurant',
            'Pharmacy and medical store',
            'Diagnostic services',
            'Ambulance services',
            'ATM and banking',
            'Wi-Fi throughout hospital'
        ],
        contact: {
            phone: '+91-413-2208787',
            emergency: '+91-413-2208000',
            email: 'info.pondicherry@apollohospitals.com',
            website: 'https://www.apollohospitals.com/pondicherry'
        },
        stats: [
            { value: '19', label: 'Years of Excellence', icon: Building2 },
            { value: '300+', label: 'Beds', icon: Activity },
            { value: '5000+', label: 'Procedures/Year', icon: TrendingUp },
            { value: '4.8/5', label: 'Patient Rating', icon: Star }
        ],
        nearbyHospitals: [
            { id: 1, name: 'JIPMER', specialty: 'Multi-Specialty', distance: '4.2 km' },
            { id: 4, name: 'GEM Hospital', specialty: 'Gastroenterology', distance: '7.5 km' },
            { id: 5, name: 'Aravind Eye Hospital', specialty: 'Ophthalmology', distance: '2.1 km' }
        ],
        touristPlaces: [
            { name: 'Rock Beach', distance: '5.2 km', image: 'https://images.unsplash.com/photo-1622312685714-db1df639c4d9?w=400' },
            { name: 'Serenity Beach', distance: '8 km', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b606?w=400' },
            { name: 'Botanical Garden', distance: '6.5 km', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400' },
            { name: 'Sri Aurobindo Ashram', distance: '4.8 km', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400' },
            { name: 'Auroville Matrimandir', distance: '12 km', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400' },
            { name: 'Pondicherry Museum', distance: '5.5 km', image: 'https://images.unsplash.com/photo-1545564850-c6504b2c05fc?w=400' },
            { name: 'Ousteri Lake', distance: '12 km', image: 'https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?w=400' },
            { name: 'Bharathi Park', distance: '5 km', image: 'https://images.unsplash.com/photo-1596716075908-011467406c1c?w=400' }
        ]
    }
};

export default function HospitalDetailPage() {
    const params = useParams();
    const hospitalId = params?.id as string;
    const hospital = hospitalData[hospitalId];
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedDept, setSelectedDept] = useState<any | null>(null);
    const [filterRating, setFilterRating] = useState<number | 'all'>('all');

    // Add counter animation for stats
    const [counts, setCounts] = useState<Record<number, number>>({});

    const filteredReviews = hospital?.reviews?.filter((r: any) =>
        filterRating === 'all' || r.rating === filterRating
    ) || [];

    useEffect(() => {
        if (hospital?.stats) {
            const timers: NodeJS.Timeout[] = [];
            hospital.stats.forEach((stat: any, index: number) => {
                const targetValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
                if (!isNaN(targetValue)) {
                    let current = 0;
                    const increment = targetValue / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= targetValue) {
                            setCounts(prev => ({ ...prev, [index]: targetValue }));
                            clearInterval(timer);
                        } else {
                            setCounts(prev => ({ ...prev, [index]: Math.floor(current) }));
                        }
                    }, 30);
                    timers.push(timer);
                }
            });
            return () => timers.forEach(timer => clearInterval(timer));
        }
    }, [hospital]);

    if (!hospital) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Hospital Not Found</h1>
                    <p className="text-gray-600 mb-8">The hospital you're looking for doesn't exist.</p>
                    <Link href="/hospital" className="text-blue-600 hover:underline">← Back to Hospitals</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section with Parallax */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative pt-32 pb-20 overflow-hidden"
            >
                <div className="absolute inset-0">
                    <Image
                        src={hospital.image}
                        alt={hospital.name}
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-transparent" />
                </div>

                <div className="relative container mx-auto px-4">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/hospital" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Hospitals
                        </Link>
                    </motion.div>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-2 mb-4"
                        >
                            {hospital.accreditation.map((acc: string, i: number) => (
                                <span key={i} className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                                    {acc} Accredited
                                </span>
                            ))}
                            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                                {hospital.type} Hospital
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
                        >
                            {hospital.name}
                        </motion.h1>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl text-blue-100 mb-6"
                        >
                            {hospital.fullName}
                        </motion.p>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg text-white/90 mb-8 max-w-3xl"
                        >
                            {hospital.description}
                        </motion.p>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap items-center gap-6 text-white"
                        >
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                <span className="font-bold">{hospital.rating}</span>
                                <span className="text-white/70">({hospital.reviewsRating} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{hospital.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                <span>{hospital.beds} Beds</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>Est. {hospital.established}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Animated Stats Bar */}
            <section className="bg-white shadow-lg relative z-10 -mt-4">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {hospital.stats?.map((stat: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                className="text-center group hover:scale-105 transition-transform"
                            >
                                <stat.icon className="w-10 h-10 mx-auto mb-2 text-blue-600 group-hover:text-blue-700 transition-colors" />
                                <div className="text-3xl font-bold text-gray-800">
                                    {stat.value.includes('/') ? stat.value : (counts[i] || 0) + (stat.value.includes('+') ? '+' : '')}
                                </div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/booking"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                            >
                                <Calendar className="w-5 h-5" />
                                Book Appointment
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a
                                href={`tel:${hospital.contact.phone}`}
                                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/cost-calculator"
                                className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2"
                            >
                                Get Cost Estimate
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Image Gallery */}
            {hospital.gallery && (
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Camera className="w-7 h-7 text-blue-600" />
                            Photo Gallery
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {hospital.gallery.map((img: string, i: number) => (
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
                                        alt={`${hospital.name} gallery ${i + 1}`}
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
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-4xl w-full h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Hospital image"
                                fill
                                className="object-contain"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Department Details Modal */}
            <AnimatePresence>
                {selectedDept && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedDept(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-48">
                                <Image
                                    src={selectedDept.image}
                                    alt={selectedDept.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-4 left-6">
                                    <h3 className="text-3xl font-bold text-white">{selectedDept.name}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedDept(null)}
                                    className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/40 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6">
                                <p className="text-lg text-gray-700 leading-relaxed mb-6">{selectedDept.description}</p>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <User className="w-6 h-6 text-blue-600" />
                                            <h4 className="font-bold text-gray-800">Head of Department</h4>
                                        </div>
                                        <p className="text-gray-700">{selectedDept.head}</p>
                                    </div>
                                    <div className="bg-indigo-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Microscope className="w-6 h-6 text-indigo-600" />
                                            <h4 className="font-bold text-gray-800">Key Procedures</h4>
                                        </div>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                            {selectedDept.commonProcedures?.map((proc: string, i: number) => (
                                                <li key={i}>{proc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-sm text-gray-500 pt-6 border-t">
                                    <div className="flex items-center gap-2">
                                        <Stethoscope className="w-4 h-4" />
                                        <span>{selectedDept.doctors} Specialized Doctors</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4" />
                                        <span>{selectedDept.procedures}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Heart className="w-7 h-7 text-blue-600" />
                                    About {hospital.name}
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">{hospital.about}</p>

                                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Highlights</h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {hospital.highlights.map((highlight: string, i: number) => (
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

                            {/* Specialties */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <Stethoscope className="w-7 h-7 text-blue-600" />
                                    Medical Specialties
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {hospital.specialties.map((specialty: string, i: number) => (
                                        <motion.span
                                            key={i}
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ scale: 1.1 }}
                                            className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-blue-100 transition-colors"
                                        >
                                            {specialty}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Related Treatments - Links to Services */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-[var(--medical-navy)] to-[var(--medical-dark-teal)] rounded-2xl shadow-lg p-8 text-white"
                            >
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Stethoscope className="w-6 h-6" />
                                    Explore Treatments at {hospital.name}
                                </h2>
                                <p className="text-white/80 mb-6">
                                    View detailed information about procedures, costs, and recovery times for treatments available at this hospital.
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {[
                                        { name: 'Orthopedics', slug: 'orthopedics' },
                                        { name: 'Cardiology', slug: 'cardiology' },
                                        { name: 'Neurology', slug: 'neurology' },
                                        { name: 'Oncology', slug: 'oncology' },
                                        { name: 'IVF & Fertility', slug: 'ivf' },
                                        { name: 'Eye Surgery', slug: 'ophthalmology' },
                                    ].filter(t => hospital.specialties.some((s: string) =>
                                        s.toLowerCase().includes(t.name.toLowerCase().split(' ')[0]) ||
                                        t.name.toLowerCase().includes(s.toLowerCase().split(' ')[0])
                                    )).slice(0, 6).map((treatment, i) => (
                                        <Link
                                            key={i}
                                            href={`/services/${treatment.slug}`}
                                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg text-center font-medium transition-all hover:scale-105"
                                        >
                                            {treatment.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/services"
                                        className="bg-[var(--medical-gold)] text-[var(--medical-navy)] px-4 py-3 rounded-lg text-center font-bold transition-all hover:scale-105 col-span-2 md:col-span-1"
                                    >
                                        View All Treatments →
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Departments with Images */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">Departments & Expertise</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {hospital.departments.map((dept: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ y: -5 }}
                                            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                                            onClick={() => setSelectedDept(dept)}
                                        >
                                            <div className="relative h-32">
                                                <Image
                                                    src={dept.image}
                                                    alt={dept.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                                <h3 className="text-lg font-bold">{dept.name}</h3>
                                                <div className="flex gap-3 text-xs mt-1">
                                                    <span>{dept.doctors} Doctors</span>
                                                    <span>•</span>
                                                    <span>{dept.procedures}</span>
                                                </div>
                                            </div>
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full">View Details</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Reviews Section */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b pb-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                                            <Quote className="w-7 h-7 text-blue-600" />
                                            Patient Reviews
                                        </h2>
                                        <div className="flex items-center gap-3">
                                            <span className="text-4xl font-bold text-gray-900">{hospital.rating}</span>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-5 h-5 ${i < Math.floor(hospital.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200 fill-current'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-gray-500 text-sm">{hospital.reviewsRating} total reviews</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { label: 'All', value: 'all' },
                                            { label: '5 ★', value: 5 },
                                            { label: '4 ★', value: 4 },
                                            { label: '3 ★', value: 3 },
                                            { label: '2 ★', value: 2 },
                                            { label: '1 ★', value: 1 }
                                        ].map((option) => (
                                            <button
                                                key={option.label}
                                                onClick={() => setFilterRating(option.value as number | 'all')}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filterRating === option.value
                                                    ? 'bg-blue-600 text-white shadow-md scale-105'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-1 gap-4">
                                    <AnimatePresence mode="popLayout">
                                        {filteredReviews.length > 0 ? (
                                            filteredReviews.map((review: any) => (
                                                <motion.div
                                                    key={review.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    layout
                                                    className="bg-gray-50 rounded-xl p-6 relative group hover:shadow-md transition-shadow"
                                                >
                                                    <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200 group-hover:text-blue-100 transition-colors" />
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-lg flex-shrink-0">
                                                            {review.user.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                <h4 className="font-bold text-gray-800">{review.user}</h4>
                                                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{review.origin}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                                <div className="flex items-center gap-0.5">
                                                                    {[...Array(5)].map((_, starIndex) => (
                                                                        <Star
                                                                            key={starIndex}
                                                                            className={`w-3 h-3 ${starIndex < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span>•</span>
                                                                <span>{review.date}</span>
                                                            </div>
                                                            <p className="text-gray-600 italic">"{review.comment}"</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center py-8 text-gray-500"
                                            >
                                                No reviews found for this rating.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Equipment & Technology */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">Advanced Equipment</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {hospital.equipment.map((item: string, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ x: -20, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                        >
                                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                            <span className="text-gray-700">{item}</span>
                                        </motion.div>
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
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">Hospital Facilities</h2>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {hospital.facilities.map((facility: string, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.03 }}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                            <span className="text-gray-700">{facility}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6 lg:sticky lg:top-4 lg:self-start">
                            {/* Contact Information */}
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">General Enquiries</div>
                                        <a href={`tel:${hospital.contact.phone}`} className="text-blue-600 font-semibold hover:underline">
                                            {hospital.contact.phone}
                                        </a>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Emergency</div>
                                        <a href={`tel:${hospital.contact.emergency}`} className="text-red-600 font-semibold hover:underline">
                                            {hospital.contact.emergency}
                                        </a>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Email</div>
                                        <a href={`mailto:${hospital.contact.email}`} className="text-blue-600 hover:underline break-all">
                                            {hospital.contact.email}
                                        </a>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Website</div>
                                        <a href={hospital.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                            Visit Website →
                                        </a>
                                    </div>
                                    <div className="pt-4 border-t">
                                        <div className="text-sm text-gray-500 mb-1">Address</div>
                                        <p className="text-gray-700">{hospital.location}</p>
                                    </div>
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6 pt-6 border-t">
                                    <Link
                                        href="/booking"
                                        className="w-full bg-gradient-to-r from-[var(--medical-teal)] to-[var(--medical-dark-teal)] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-center block"
                                    >
                                        Book Consultation
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="bg-gradient-to-br from-[var(--medical-teal)] to-[var(--medical-dark-teal)] rounded-2xl shadow-lg p-6 text-white"
                            >
                                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-blue-100">Established</span>
                                        <span className="font-bold">{hospital.established}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-100">Total Beds</span>
                                        <span className="font-bold">{hospital.beds}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-100">Specialties</span>
                                        <span className="font-bold">{hospital.specialties.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-100">Rating</span>
                                        <span className="font-bold flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-current" />
                                            {hospital.rating}/5
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Nearby Hospitals */}
                            {hospital.nearbyHospitals && hospital.nearbyHospitals.length > 0 && (
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-blue-600" />
                                        Nearby Hospitals
                                    </h3>
                                    <div className="space-y-3">
                                        {hospital.nearbyHospitals.map((nearby: any, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.8 + i * 0.1 }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <Link
                                                    href={`/hospital/${nearby.id}`}
                                                    className="block p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                                {nearby.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-500">{nearby.specialty}</p>
                                                        </div>
                                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <MapPin className="w-3 h-3 text-gray-400" />
                                                        <span className="text-xs text-gray-500">{nearby.distance} away</span>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Tourist Places */}
                            {hospital.touristPlaces && hospital.touristPlaces.length > 0 && (
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Camera className="w-5 h-5 text-blue-600" />
                                        Nearby Attractions
                                    </h3>
                                    <div className="space-y-3">
                                        {hospital.touristPlaces.slice(0, 4).map((place: any, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 1.0 + i * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="group cursor-pointer"
                                            >
                                                <div className="relative h-24 rounded-lg overflow-hidden mb-2">
                                                    <Image
                                                        src={place.image}
                                                        alt={place.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    <div className="absolute bottom-2 left-2 right-2">
                                                        <h4 className="font-semibold text-white text-sm">{place.name}</h4>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <MapPin className="w-3 h-3 text-white/80" />
                                                            <span className="text-xs text-white/80">{place.distance} away</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Location and Attractions */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                        <MapPin className="w-7 h-7 text-blue-600" />
                        Location & Nearby Attractions
                    </h2>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-1 h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <iframe
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(hospital.name + ' ' + hospital.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </motion.div>

                        {/* Attractions Grid */}
                        <div className="lg:col-span-2">
                            <div className="grid md:grid-cols-2 gap-4">
                                {hospital.touristPlaces?.map((place: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                            <Image
                                                src={place.image}
                                                alt={place.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">{place.name}</h4>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <MapPin className="w-4 h-4 text-blue-500" />
                                                <span>{place.distance} away</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
