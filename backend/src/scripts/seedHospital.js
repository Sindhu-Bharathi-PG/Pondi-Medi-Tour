
require('dotenv').config({ path: '../../.env' });
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { hospitalProfiles } = require('../database/schema');

// Connection URL
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const client = postgres(connectionString);
const db = drizzle(client);

const jipmerData = {
    name: 'JIPMER',
    type: 'Government',
    establishmentYear: 1823,
    beds: 2500,
    patientCount: { daily: 5000, annual: 1500000 },
    location: {
        address: 'Gorimedu, Pondicherry - 605006',
        coordinates: { lat: 11.9546, lng: 79.8166 }
    },
    contact: {
        phone: '+91-413-2272380',
        emergency: '+91-413-2296000',
        email: 'director@jipmer.edu.in',
        website: 'https://www.jipmer.edu.in'
    },
    description: {
        short: 'Jawaharlal Institute of Postgraduate Medical Education & Research',
        long: 'JIPMER is an Institute of National Importance and a premier medical institution with AIIMS-equivalent status. With over 200 years of heritage, it offers world-class medical care with cutting-edge research facilities. As one of India\'s premier medical institutions, it combines heritage with modern healthcare delivery. The hospital is equipped with state-of-the-art medical technology and staffed by internationally trained specialists.'
    },
    photos: [
        'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800',
        'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800'
    ],
    accreditations: ['NABH', 'NABL'],
    highlights: [
        '1,100+ active beds across specialties',
        '50+ cardiologists trained in US/UK',
        'World-class research facilities',
        'AIIMS-equivalent status',
        '24/7 emergency services',
        'International patient wing'
    ],
    specialties: ['Multi-Specialty', 'Cardiology', 'Oncology', 'Neurology', 'Nephrology', 'Orthopedics', 'Gastroenterology', 'Pediatrics'],
    equipment: ['64-slice CT scanner', '3T MRI', 'Digital Operating Theaters', 'Advanced Blood Bank', 'Hybrid Cath Lab', 'Linear Accelerator'],
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
        }
    ],
    reviews: [
        { id: 1, user: 'Sarah J.', rating: 5, date: '2 months ago', comment: 'Exceptional care at JIPMER.', origin: 'UK' },
        { id: 2, user: 'Ahmed K.', rating: 5, date: '3 months ago', comment: 'World-class facilities at a fraction of the cost.', origin: 'UAE' }
    ]
};

async function seed() {
    try {
        console.log('Seeding hospital data...');
        await db.insert(hospitalProfiles).values(jipmerData);
        console.log('Hospital inserted successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await client.end();
    }
}

seed();
