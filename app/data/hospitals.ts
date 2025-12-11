import { Activity, Building2, Microscope, Stethoscope, Trophy, User } from 'lucide-react';

export interface Hospital {
      id: number | string;
      name: string;
      fullName: string;
      slug: string; // clean url slug
      image: string;
      heroImage: string;
      gallery: string[];
      rating: number;
      reviewsRating: number;
      specialties: string[]; // For display
      serviceSlugs: string[]; // For linking to /services/[slug]
      accreditation: string[];
      location: string;
      established: number;
      beds: number;
      type: 'Government' | 'Private' | 'Specialty' | 'Educational';
      featured: boolean;
      tagline: string;
      description: string;
      about: string;
      highlights: string[];
      equipment: string[];
      facilities: string[];
      internationalPatients: string;
      successRate: string;
      contact: {
            phone: string;
            emergency: string;
            email: string;
            website: string;
      };
      departments?: any[];
      stats?: any[];
      nearbyHospitals?: any[];
      touristPlaces?: any[];
}

export const hospitals: Hospital[] = [
      {
            id: 1,
            name: 'JIPMER',
            fullName: 'Jawaharlal Institute of Postgraduate Medical Education & Research',
            slug: 'jipmer',
            image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80',
            heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80',
            gallery: [
                  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800',
                  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
                  'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800',
                  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
            ],
            rating: 4.9,
            reviewsRating: 2840,
            specialties: ['Cardiology', 'Oncology', 'Neurology', 'Nephrology', 'Orthopedics', 'Gastroenterology', 'Pediatrics', 'Trauma'],
            serviceSlugs: ['cardiology', 'oncology', 'neurology', 'nephrology', 'orthopedics', 'gastroenterology', 'pediatrics'],
            accreditation: ['NABH', 'NABL', 'INI'],
            location: 'Gorimedu, Pondicherry',
            established: 1823,
            beds: 2500,
            type: 'Government',
            featured: true,
            tagline: 'Institute of National Importance',
            description: 'Premier government medical institution with AIIMS-equivalent status. Over 200 years of medical excellence with world-class research facilities and internationally trained specialists.',
            about: 'JIPMER is an Institute of National Importance (INI) and a premier medical institution in India. It offers high-quality medical care ranging from basic to super-specialty services. JIPMER is known for its free treatment for poor patients and heavily subsidized rates for others, making world-class healthcare accessible to all.',
            highlights: ['50+ US/UK trained cardiologists', '1,100+ active beds', '24/7 Trauma Center', 'World-class research', 'AI-assisted diagnostics'],
            equipment: ['64-slice CT scanner', '3T MRI', 'Digital Operating Theaters', 'Advanced Blood Bank', 'Robotic Surgery Suite', 'Linear Accelerator'],
            facilities: ['Modern ICU', 'Telemedicine Center', 'International Patient Wing', '24/7 Pharmacy', 'Banking services', 'Patient Guest House'],
            internationalPatients: '5000+',
            successRate: '98.5%',
            contact: {
                  phone: '+91-413-2272380',
                  emergency: '+91-413-2296000',
                  email: 'director@jipmer.edu.in',
                  website: 'https://jipmer.edu.in',
            },
            stats: [
                  { value: '200+', label: 'Years of Excellence', icon: Building2 },
                  { value: '2500+', label: 'Beds', icon: Activity },
                  { value: '15000+', label: 'Procedures/Year', icon: Trophy },
                  { value: '4.9/5', label: 'Patient Rating', icon: User }
            ]
      },
      {
            id: 2,
            name: 'Apollo Pondicherry',
            fullName: 'Apollo Speciality Hospitals Pondicherry',
            slug: 'apollo-pondicherry',
            image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800&q=80',
            heroImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1600&q=80',
            gallery: [
                  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
                  'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800',
            ],
            rating: 4.8,
            reviewsRating: 1560,
            specialties: ['Cardiology', 'Orthopedics', 'Neurosurgery', 'IVF', 'Oncology', 'Robotic Surgery', 'Critical Care'],
            serviceSlugs: ['cardiology', 'orthopedics', 'neurology', 'ivf', 'oncology'],
            accreditation: ['NABH', 'JCI', 'NABL'],
            location: 'Ariyankuppam, Pondicherry',
            established: 2005,
            beds: 300,
            type: 'Private',
            featured: true,
            tagline: 'JCI Accredited Excellence',
            description: 'Part of Asia\'s largest healthcare group. JCI accredited with Da Vinci robotic surgery, international patient wing, and multilingual staff.',
            about: 'Apollo Hospitals Pondicherry is a state-of-the-art super specialty hospital. It was the first hospital in Pondicherry to receive JCI accreditation, the gold standard in global healthcare. The hospital focuses on providing high-end tertiary care with a human touch.',
            highlights: ['JCI Accredited', 'Da Vinci Robotic Surgery', 'International Patient Wing', 'Multilingual Staff', 'Advanced Cath Lab'],
            equipment: ['Da Vinci Xi Robot', '128 Slice CT', '1.5T MRI', 'Flat Panel Cath Lab', 'Digital Mammography'],
            facilities: ['Luxury Patient Suites', 'Translator Services', 'Visa Assistance', 'Airport Transfer', 'Multi-cuisine Cafeteria'],
            internationalPatients: '3000+',
            successRate: '97.8%',
            contact: {
                  phone: '+91-413-2208787',
                  emergency: '+91-413-2208000',
                  email: 'info_pondicherry@apollohospitals.com',
                  website: 'https://apollohospitals.com/pondicherry',
            },
            stats: [
                  { value: '18+', label: 'Years Serving', icon: Building2 },
                  { value: '300+', label: 'Critical Care Beds', icon: Activity },
                  { value: '1000+', label: 'Robotic Surgeries', icon: Microscope },
            ]
      },
      {
            id: 3,
            name: 'MGMCRI',
            fullName: 'Mahatma Gandhi Medical College & Research Institute',
            slug: 'mgmcri',
            image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
            heroImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&q=80',
            gallery: [],
            rating: 4.7,
            reviewsRating: 1230,
            specialties: ['General Surgery', 'Pediatrics', 'Gynecology', 'Cardiology', 'Dermatology', 'Psychiatry', 'Organ Transplant'],
            serviceSlugs: ['general-surgery', 'pediatrics', 'gynecology', 'cardiology', 'dermatology', 'organ-transplant'],
            accreditation: ['NABH', 'NABL', 'NAAC A++'],
            location: 'Pillaiyarkuppam, Pondicherry',
            established: 2001,
            beds: 1350,
            type: 'Educational',
            featured: true,
            tagline: 'Academic Excellence in Healthcare',
            description: 'NABH accredited super-specialty hospital with focus on research and advanced medical education. Part of Sri Balaji Vidyapeeth.',
            about: 'MGMCRI is a leading medical institution known for its robust research and academic framework. It provides comprehensive healthcare services including complex organ transplants and tertiary care at affordable costs.',
            highlights: ['1350+ beds', 'Multi-organ Transplant Center', 'NAAC A++ Accredited', 'Rural Health Centers'],
            equipment: ['Advanced Cath Lab', 'Dialysis Unit (60+ beds)', 'Sleep Lab', 'Genetic Lab'],
            facilities: ['Patient Counseling', 'Rehabilitation Center', 'Blood Bank', 'Yoga & Wellness Center'],
            internationalPatients: '1500+',
            successRate: '96.5%',
            contact: {
                  phone: '+91-413-2615449',
                  emergency: '+91-413-2615450',
                  email: 'info@sbvu.ac.in',
                  website: 'https://mgmcri.ac.in',
            }
      },
      {
            id: 4,
            name: 'GEM Hospital',
            fullName: 'GEM Hospital & Research Centre',
            slug: 'gem-hospital',
            image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&q=80',
            heroImage: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=80',
            gallery: [],
            rating: 4.9,
            reviewsRating: 980,
            specialties: ['Gastroenterology', 'Bariatric Surgery', 'Laparoscopy', 'Hepatology', 'GI Cancer'],
            serviceSlugs: ['gastroenterology', 'bariatric', 'laparoscopy', 'oncology'],
            accreditation: ['NABH', 'ISO'],
            location: 'East Coast Road, Pondicherry',
            established: 2005,
            beds: 300,
            type: 'Specialty',
            featured: true,
            tagline: "Asia's Premier GI Center",
            description: 'World leader in laparoscopic GI surgery. Dedicated exclusively to Gastroenterology and Laparoscopic surgeries.',
            about: 'GEM Hospital is one of the few dedicated centers for Gastroenterology in India. It is pioneered in laparoscopic surgeries and has performed numerous first-of-its-kind procedures in the region.',
            highlights: ['Focus on Minimally Invasive Surgery', 'Liver Transplant Unit', 'Obesity Clinic', '24/7 GI Emergency'],
            equipment: ['4K Laparoscopy Towers', 'Endoscopic Ultrasound', 'Fibroscan', 'Manometry'],
            facilities: ['Dietary Counseling', 'Obesity Support Group', 'International Patient Lounge'],
            internationalPatients: '4000+',
            successRate: '97.2%',
            contact: {
                  phone: '+91-413-2222222', // Placeholder
                  emergency: '+91-413-2222223',
                  email: 'pondicherry@gemhospital.com',
                  website: 'https://gemhospital.com',
            }
      },
      {
            id: 5,
            name: 'Aravind Eye Hospital',
            fullName: 'Aravind Eye Hospital',
            slug: 'aravind-eye',
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
            heroImage: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=1600&q=80',
            gallery: [],
            rating: 4.9,
            reviewsRating: 3200,
            specialties: ['Ophthalmology', 'Cataract', 'Lasik', 'Retina', 'Glaucoma', 'Pediatric Eye Care'],
            serviceSlugs: ['ophthalmology', 'cataract', 'lasik'],
            accreditation: ['NABH'],
            location: 'Cuddalore Road, Pondicherry',
            established: 2003,
            beds: 250,
            type: 'Specialty',
            featured: false,
            tagline: 'World-Renowned Eye Care',
            description: 'Part of the Aravind Eye Care System. High volume, high quality eye care at affordable costs.',
            about: 'Aravind Eye Hospital is a model for efficiency and quality in eye care delivery. It performs a massive number of surgeries daily while maintaining infection rates lower than international standards.',
            highlights: ['Low Cost / Free Treatment options', 'High Volume Cataract Surgery', 'Community Outreach'],
            equipment: ['Femtosecond Laser', 'Ophthalmic Microscopes', 'Visual Field Analyzers'],
            facilities: ['Optical Shop', 'Low Vision Clinic', 'Patient Dormitories'],
            internationalPatients: '2500+',
            successRate: '99.1%',
            contact: {
                  phone: '+91-413-2619100',
                  emergency: '+91-413-2619100',
                  email: 'pony@aravind.org',
                  website: 'https://aravind.org',
            }
      },
      {
            id: 6,
            name: 'PIMS',
            fullName: 'Pondicherry Institute of Medical Sciences',
            slug: 'pims',
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80',
            heroImage: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1600&q=80',
            gallery: [],
            rating: 4.8,
            reviewsRating: 890,
            specialties: ['Orthopedics', 'General Medicine', 'Cardiology', 'Nephrology', 'Dermatology'],
            serviceSlugs: ['orthopedics', 'general-medicine', 'nephrology'],
            accreditation: ['NABH', 'NABL'],
            location: 'Kalapet, Pondicherry',
            established: 2002,
            beds: 850,
            type: 'Private',
            featured: false,
            tagline: 'Excellence in Orthopedics',
            description: 'A multi-specialty hospital and teaching institute located in a serene coastal environment.',
            about: 'PIMS offers a wide range of medical services with a team of dedicated doctors. The hospital is well-known for its orthopedics department and community health initiatives.',
            highlights: ['Coastal Campus', 'Community Medicine', 'Sports Medicine'],
            equipment: ['Arthroscopy Suite', 'Dialysis Units'],
            facilities: ['Beach-side recovery (nearby)', 'Student Campus facilities'],
            internationalPatients: '1800+',
            successRate: '96.8%',
            contact: {
                  phone: '+91-413-2656271',
                  emergency: '+91-413-2656272',
                  email: 'contact@pimsmmm.net',
                  website: 'https://pimsmmm.net',
            }
      },
      {
            id: 7,
            name: 'Sri Manakula Vinayagar',
            fullName: 'Sri Manakula Vinayagar Medical College and Hospital',
            slug: 'smvmch',
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', // Placeholder
            heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80',
            gallery: [],
            rating: 4.6,
            reviewsRating: 650,
            specialties: ['General Medicine', 'Surgery', 'Obstetrics', 'IVF', 'Pediatrics'],
            serviceSlugs: ['general-medicine', 'surgery', 'ivf', 'pediatrics'],
            accreditation: ['NABH', 'NABL'],
            location: 'Madagadipet, Pondicherry',
            established: 2006,
            beds: 900,
            type: 'Educational',
            featured: false,
            tagline: 'Quality Education & Healthcare',
            description: 'Providing ultramodern health care facilities and medical education.',
            about: 'SMVMCH is an ultra-modern multi-specialty hospital providing comprehensive healthcare services. It is equipped with advanced technologies and offers services in all major medical disciplines.',
            highlights: ['Advanced IVF Lab', 'Hi-tech Operation Theatres', 'Modern Trauma Care'],
            equipment: ['MRI', 'CT Scan', 'Mammogram'],
            facilities: ['Pharmacy', 'Ambulance', 'Blood Bank'],
            internationalPatients: '500+',
            successRate: '95.5%',
            contact: {
                  phone: '+91-413-2643000',
                  emergency: '+91-413-2643000',
                  email: 'principal@smvmch.ac.in',
                  website: 'https://smvmch.ac.in',
            }
      },
      {
            id: 8,
            name: 'Sri Venkateshwaraa',
            fullName: 'Sri Venkateshwaraa Medical College Hospital',
            slug: 'svmch',
            image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80', // Placeholder
            heroImage: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1600&q=80',
            gallery: [],
            rating: 4.5,
            reviewsRating: 400,
            specialties: ['Tertiary Care', 'Cardiology', 'Neurology', 'Urology'],
            serviceSlugs: ['cardiology', 'neurology', 'urology'],
            accreditation: ['NABH'],
            location: 'Ariyur, Pondicherry',
            established: 2007,
            beds: 750,
            type: 'Educational',
            featured: false,
            tagline: 'Compassionate Care',
            description: 'Focused on delivering tertiary healthcare services to the rural and urban population.',
            about: 'Sri Venkateshwaraa Medical College Hospital is dedicated to excellence in medical education and patient care. It provides affordable, high-quality treatment with a focus on holistic healing.',
            highlights: ['Rural Health focus', 'Affordable Tertiary Care'],
            equipment: ['Cath Lab', 'Dialysis'],
            facilities: ['Canteen', 'Parking'],
            internationalPatients: '200+',
            successRate: '94%',
            contact: {
                  phone: '+91-413-2260601',
                  emergency: '+91-413-2260601',
                  email: 'svmch_pondy@yahoo.com',
                  website: 'https://svmcpondy.com',
            }
      },
      {
            id: 9,
            name: 'East Coast Hospitals',
            fullName: 'East Coast Hospitals',
            slug: 'east-coast',
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', // Placeholder
            heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80',
            gallery: [],
            rating: 4.4,
            reviewsRating: 350,
            specialties: ['Trauma', 'Critical Care', 'Orthopedics', 'Cardiology'],
            serviceSlugs: ['orthopedics', 'cardiology'],
            accreditation: ['NABH'],
            location: 'Moolakulam, Pondicherry',
            established: 2010,
            beds: 100,
            type: 'Private',
            featured: false,
            tagline: 'Critical Care Excellence',
            description: 'Renowned for its trauma and critical care units.',
            about: 'East Coast Hospitals is a multispecialty center with a strong reputation for its emergency and trauma care services. It provides 24/7 critical care support.',
            highlights: ['24/7 Trauma Care', 'Advanced ICU'],
            equipment: ['Ventilators', 'Trauma OT'],
            facilities: ['Ambulance', 'Pharmacy'],
            internationalPatients: '100+',
            successRate: '93%',
            contact: {
                  phone: '+91-413-2297800',
                  emergency: '+91-413-2297800',
                  email: 'info@eastcoasthospitals.com',
                  website: 'https://eastcoasthospitals.com',
            }
      },
      {
            id: 10,
            name: 'Be Well Hospitals',
            fullName: 'Be Well Hospitals Pondicherry',
            slug: 'be-well',
            image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80', // Placeholder
            heroImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&q=80',
            gallery: [],
            rating: 4.3,
            reviewsRating: 280,
            specialties: ['Multispecialty', 'Emergency Medicine', 'General Surgery'],
            serviceSlugs: ['general-surgery'],
            accreditation: ['NABH'],
            location: 'Lawspet, Pondicherry',
            established: 2012,
            beds: 50,
            type: 'Private',
            featured: false,
            tagline: 'Accessible Healthcare',
            description: 'Chain of multispecialty hospitals providing accessible and affordable quality healthcare.',
            about: 'Be Well Hospitals establishes secondary care multispecialty hospitals in peri-urban and district headquarter towns. The Pondicherry branch offers comprehensive emergency and surgical services.',
            highlights: ['Emergency Care', 'Affordable Packages'],
            equipment: ['Digital X-Ray', 'Ultrasound'],
            facilities: ['Pharmacy', 'Lab'],
            internationalPatients: '50+',
            successRate: '95%',
            contact: {
                  phone: '+91-413-2255555',
                  emergency: '+91-413-2255555',
                  email: 'pondy@bewellhospitals.com',
                  website: 'https://bewellhospitals.in',
            }
      }
];
