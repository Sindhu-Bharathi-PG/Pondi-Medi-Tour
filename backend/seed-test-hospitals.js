/**
 * PONDI MEDI TOUR - Comprehensive Test Data Seeder
 * Creates 20 hospitals with all related data across ALL tables
 * All data is marked with [TEST] for easy identification and deletion
 * 
 * RUN: node seed-test-hospitals.js
 */

const { drizzle } = require('drizzle-orm/postgres-js');
const { eq } = require('drizzle-orm');
const postgres = require('postgres');
const bcrypt = require('bcryptjs');
const { 
  users, 
  hospitalDetails, 
  doctors, 
  treatments, 
  packages,
  inquiries,
  appointments,
  analyticsLogs,
  activityLogs,
  notifications
} = require('./src/database/schema');
require('dotenv').config();

// Database Connection
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
console.log('🔌 Connecting to DB...');
const client = postgres(connectionString, { ssl: 'require', max: 5 });
const db = drizzle(client);

// ===================== HIGH QUALITY IMAGE URLS =====================
const IMAGES = {
  hospitals: [
    "https://images.unsplash.com/photo-1587351021759-3e566b9af9ef?w=1200&q=80",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&q=80",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80",
    "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1200&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80",
    "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=1200&q=80"
  ],
  logos: [
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&q=80",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=200&q=80"
  ],
  doctorsMale: [
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80"
  ],
  doctorsFemale: [
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80",
    "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&q=80"
  ],
  treatments: [
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    "https://images.unsplash.com/photo-1576091160550-217358c7db81?w=800&q=80",
    "https://images.unsplash.com/photo-1584515933487-9d900da2d7e5?w=800&q=80",
    "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80",
    "https://images.unsplash.com/photo-1666214280391-7e139afc4785?w=800&q=80",
    "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80"
  ],
  packages: [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80"
  ]
};

// ===================== DATA POOLS =====================
const HOSPITAL_DATA = [
  { name: "Apollo Wellness Centre", type: "Private", year: 1995 },
  { name: "Global Care Institute", type: "Private", year: 2005 },
  { name: "Sunrise Medical Hub", type: "Private", year: 2010 },
  { name: "Ocean View Hospital", type: "Private", year: 2000 },
  { name: "Pondicherry General Hospital", type: "Government", year: 1960 },
  { name: "Heritage Healing Centre", type: "Private", year: 2015 },
  { name: "Lotus Specialty Clinic", type: "Private", year: 2018 },
  { name: "French Quarter Medical", type: "Private", year: 2012 },
  { name: "Bay of Bengal Health", type: "Private", year: 2008 },
  { name: "Auroville Integrated Care", type: "Academic", year: 1990 },
  { name: "Coastal Heart Centre", type: "Private", year: 2003 },
  { name: "Royal Palm Hospital", type: "Private", year: 1998 },
  { name: "Serenity Surgicals", type: "Private", year: 2016 },
  { name: "Elite Trauma Centre", type: "Private", year: 2014 },
  { name: "Green Leaf Ayurveda", type: "Private", year: 2011 },
  { name: "Marina Diagnostics", type: "Private", year: 2019 },
  { name: "Blue Wave Orthopedics", type: "Private", year: 2017 },
  { name: "Starlight Maternity Hospital", type: "Private", year: 2013 },
  { name: "Golden Hour Emergency", type: "Private", year: 2020 },
  { name: "Pearl City Dental Care", type: "Private", year: 2021 }
];

const LOCATIONS = [
  { area: "White Town", address: "12, Rue Suffren", coords: { lat: 11.9340, lng: 79.8306 } },
  { area: "Heritage Town", address: "45, Rue Romain Rolland", coords: { lat: 11.9350, lng: 79.8320 } },
  { area: "Auroville", address: "Auroville Main Road", coords: { lat: 12.0070, lng: 79.8107 } },
  { area: "Kalapet", address: "ECR Road, Kalapet", coords: { lat: 11.9723, lng: 79.8567 } },
  { area: "Mission Street", address: "78, Mission Street", coords: { lat: 11.9310, lng: 79.8280 } },
  { area: "Anna Salai", address: "156, Anna Salai", coords: { lat: 11.9280, lng: 79.8250 } },
  { area: "Villianur", address: "Main Road, Villianur", coords: { lat: 11.9567, lng: 79.7890 } },
  { area: "Ariyankuppam", address: "Beach Road, Ariyankuppam", coords: { lat: 11.9012, lng: 79.8134 } }
];

const SPECIALTIES = [
  { name: "Cardiology", subSpecialty: "Interventional Cardiology" },
  { name: "Orthopedics", subSpecialty: "Joint Replacement" },
  { name: "Neurology", subSpecialty: "Neuro Surgery" },
  { name: "Oncology", subSpecialty: "Surgical Oncology" },
  { name: "Dermatology", subSpecialty: "Cosmetic Dermatology" },
  { name: "Ophthalmology", subSpecialty: "LASIK Surgery" },
  { name: "Dental Surgery", subSpecialty: "Implantology" },
  { name: "Ayurveda", subSpecialty: "Panchakarma" },
  { name: "General Surgery", subSpecialty: "Laparoscopic Surgery" },
  { name: "Gynecology", subSpecialty: "IVF & Fertility" }
];

const DOCTOR_NAMES_MALE = [
  "Dr. Rajesh Kumar", "Dr. Samuel John", "Dr. Mohamed Riaz", "Dr. Vikram Singh",
  "Dr. Arun George", "Dr. Sanjay Gupta", "Dr. Prakash Menon", "Dr. Karthik Rajan"
];

const DOCTOR_NAMES_FEMALE = [
  "Dr. Anita Desai", "Dr. Priya Lakshmi", "Dr. Sarah Williams", "Dr. Kavita Krishnan",
  "Dr. Meera Reddy", "Dr. Deepa Nair", "Dr. Anjali Sharma", "Dr. Rekha Pillai"
];

const TREATMENT_TEMPLATES = [
  { name: "Total Knee Replacement", category: "Orthopedics", stay: "5-7 Days", recovery: "6-8 Weeks", minPrice: 4000, maxPrice: 8000 },
  { name: "Hip Replacement Surgery", category: "Orthopedics", stay: "5-7 Days", recovery: "8-12 Weeks", minPrice: 5000, maxPrice: 10000 },
  { name: "Coronary Bypass Surgery", category: "Cardiology", stay: "7-10 Days", recovery: "6-8 Weeks", minPrice: 8000, maxPrice: 15000 },
  { name: "Angioplasty", category: "Cardiology", stay: "2-3 Days", recovery: "1-2 Weeks", minPrice: 3000, maxPrice: 6000 },
  { name: "Spinal Fusion", category: "Neurology", stay: "4-6 Days", recovery: "3-6 Months", minPrice: 6000, maxPrice: 12000 },
  { name: "LASIK Eye Surgery", category: "Ophthalmology", stay: "1 Day", recovery: "1 Week", minPrice: 1000, maxPrice: 3000 },
  { name: "Dental Implants", category: "Dental Surgery", stay: "1 Day", recovery: "2-3 Months", minPrice: 800, maxPrice: 2500 },
  { name: "Full Body Checkup", category: "Diagnostics", stay: "1 Day", recovery: "N/A", minPrice: 200, maxPrice: 500 },
  { name: "Panchakarma Therapy", category: "Ayurveda", stay: "14-21 Days", recovery: "Ongoing", minPrice: 1500, maxPrice: 4000 },
  { name: "IVF Treatment", category: "Gynecology", stay: "1-2 Days", recovery: "2 Weeks", minPrice: 3000, maxPrice: 7000 }
];

const PATIENT_NAMES = [
  "John Smith", "Maria Garcia", "Ahmed Hassan", "Li Wei", "Emma Johnson",
  "Mohammed Ali", "Sophie Martin", "Raj Patel", "Anna Müller", "Carlos Rodriguez"
];

const COUNTRIES = ["USA", "UK", "UAE", "Germany", "France", "Australia", "Canada", "Singapore", "Saudi Arabia", "Russia"];

// ===================== HELPER FUNCTIONS =====================
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// ===================== MAIN SEED FUNCTION =====================
async function seed() {
  const startTime = Date.now();
  
  try {
    // ==================== CLEANUP EXISTING TEST DATA ====================
    console.log('🧹 Cleaning up existing test data...');
    
    // Helper function to safely delete from a table (handles missing tables)
    const safeDelete = async (query, tableName) => {
      try {
        await client.unsafe(query);
        console.log(`   ✓ Cleaned ${tableName}`);
      } catch (err) {
        if (err.message.includes('does not exist')) {
          console.log(`   ⚠ Table ${tableName} doesn't exist, skipping...`);
        } else {
          console.log(`   ⚠ Error cleaning ${tableName}: ${err.message}`);
        }
      }
    };
    
    // Delete in reverse order of dependencies
    await safeDelete("DELETE FROM notifications WHERE title LIKE '%[TEST]%'", 'notifications');
    await safeDelete("DELETE FROM activity_logs WHERE description LIKE '%[TEST]%'", 'activity_logs');
    await safeDelete("DELETE FROM analytics_logs WHERE user_agent = 'Mozilla/5.0 (Test Browser)'", 'analytics_logs');
    await safeDelete("DELETE FROM appointments WHERE patient_name LIKE '%[TEST]%'", 'appointments');
    await safeDelete("DELETE FROM inquiries WHERE patient_name LIKE '%[TEST]%'", 'inquiries');
    await safeDelete("DELETE FROM packages WHERE name LIKE '%[TEST]%'", 'packages');
    await safeDelete("DELETE FROM treatments WHERE name LIKE '%[TEST]%'", 'treatments');
    await safeDelete("DELETE FROM doctors WHERE bio LIKE '%[TEST]%'", 'doctors');
    await safeDelete("DELETE FROM hospital_details WHERE name LIKE '%[TEST]%'", 'hospital_details');
    await safeDelete("DELETE FROM users WHERE name LIKE '%[TEST]%'", 'users');
    
    console.log('✅ Cleanup complete!\n');
    
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Track created entities for cross-referencing
    const createdHospitals = [];
    const createdDoctors = [];
    const createdTreatments = [];
    const createdUsers = [];

    // ==================== CREATE 20 HOSPITALS ====================
    for (let i = 0; i < 20; i++) {
      const hospitalData = HOSPITAL_DATA[i];
      const location = rand(LOCATIONS);
      const email = `test.hospital.${i + 1}@pondimeditour.com`;
      const slug = hospitalData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + randInt(1000, 9999);

      console.log(`\n📍 [${i+1}/20] Creating: ${hospitalData.name}`);

      // A. Create Hospital User
      const [user] = await db.insert(users).values({
        email: email,
        password: hashedPassword,
        name: `[TEST] ${hospitalData.name}`,
        userType: 'hospital',
        isActive: true,
        emailVerified: true
      }).returning();
      createdUsers.push(user);

      // B. Create Hospital Profile
      const [hospital] = await db.insert(hospitalDetails).values({
        userId: user.id,
        name: `[TEST] ${hospitalData.name}`,
        slug: slug,
        type: hospitalData.type,
        establishmentYear: hospitalData.year,
        shortDescription: `Premier healthcare facility in ${location.area}, Pondicherry offering world-class medical services.`,
        fullDescription: `[TEST DATA] ${hospitalData.name} is a leading healthcare institution located in the heart of ${location.area}. We specialize in medical tourism with comprehensive international patient support including visa assistance, airport transfers, and multilingual coordinators. Our state-of-the-art infrastructure and experienced medical professionals ensure the highest quality of care.`,
        infrastructure: {
          totalBeds: randInt(50, 500),
          icuBeds: randInt(10, 50),
          operatingTheaters: randInt(3, 15),
          specializedUnits: ["ICU", "NICU", "CCU", "Burns Unit"],
          technologies: ["Da Vinci Robotic Surgery", "3T MRI", "PET-CT", "Linear Accelerator"],
          amenities: ["Free WiFi", "Private Rooms", "24/7 Cafeteria", "In-house Pharmacy", "Prayer Room", "International Cuisine"]
        },
        internationalServices: {
          languages: ["English", "French", "Tamil", "Hindi", "Arabic"],
          services: ["Visa Assistance", "Airport Pickup", "Hotel Booking", "Local Tours"],
          coordinatorAvailable: true,
          teleconsultation: true
        },
        accreditations: [
          { name: "JCI", year: 2020, logo: "https://via.placeholder.com/100?text=JCI" },
          { name: "NABH", year: 2019, logo: "https://via.placeholder.com/100?text=NABH" },
          { name: "ISO 9001:2015", year: 2021, logo: "https://via.placeholder.com/100?text=ISO" }
        ],
        specializedCenters: ["Heart Centre", "Orthopedic Centre", "Cancer Centre", "Fertility Centre"],
        location: {
          address: location.address,
          area: location.area,
          city: "Pondicherry",
          state: "Puducherry",
          country: "India",
          pincode: "605" + randInt(100, 999),
          coordinates: location.coords
        },
        logoUrl: rand(IMAGES.logos),
        coverUrl: IMAGES.hospitals[i % IMAGES.hospitals.length],
        gallery: [
          IMAGES.hospitals[(i + 1) % IMAGES.hospitals.length],
          IMAGES.hospitals[(i + 2) % IMAGES.hospitals.length],
          IMAGES.hospitals[(i + 3) % IMAGES.hospitals.length],
          IMAGES.treatments[i % IMAGES.treatments.length]
        ],
        website: `https://www.${slug}.com`,
        phone: `+91 ${randInt(70000, 99999)} ${randInt(10000, 99999)}`,
        email: email,
        emergencyPhone: `+91 ${randInt(70000, 99999)} ${randInt(10000, 99999)}`,
        status: 'approved'
      }).returning();
      createdHospitals.push(hospital);

      // B2. Update User with Hospital ID (important for linking!)
      await db.update(users).set({ hospitalId: hospital.id }).where(eq(users.id, user.id));
      console.log(`   ✅ Linked user to hospital ID: ${hospital.id}`);

      // C. Create 3-5 Doctors per Hospital
      const numDoctors = randInt(3, 5);
      for (let j = 0; j < numDoctors; j++) {
        const isMale = Math.random() > 0.5;
        const docName = isMale ? rand(DOCTOR_NAMES_MALE) : rand(DOCTOR_NAMES_FEMALE);
        const specialty = rand(SPECIALTIES);

        const [doctor] = await db.insert(doctors).values({
          hospitalId: hospital.id,
          name: docName,
          specialty: specialty.name,
          subSpecialty: specialty.subSpecialty,
          credentials: "MBBS, MD, MS, FRCS",
          experience: `${randInt(10, 35)}+ years`,
          imageUrl: isMale ? rand(IMAGES.doctorsMale) : rand(IMAGES.doctorsFemale),
          bio: `[TEST] ${docName} is a renowned specialist in ${specialty.name} with extensive experience in ${specialty.subSpecialty}. Trained at premier institutions globally, they bring world-class expertise to our patients.`,
          surgeriesCount: randInt(500, 5000),
          publicationsCount: randInt(10, 100),
          rating: (4 + Math.random()).toFixed(2),
          reviewsCount: randInt(50, 500),
          languages: ["English", "Tamil", rand(["Hindi", "French", "Arabic"])],
          consultationTimings: "Mon-Sat: 09:00 AM - 05:00 PM",
          isAvailable: true,
          isFeatured: Math.random() > 0.7,
          education: [
            { degree: "MBBS", institution: "JIPMER, Pondicherry", year: randInt(1985, 2005) },
            { degree: "MD", institution: "AIIMS, Delhi", year: randInt(1990, 2010) },
            { degree: "Fellowship", institution: "Mayo Clinic, USA", year: randInt(2000, 2015) }
          ],
          expertise: [`Advanced ${specialty.subSpecialty}`, "Minimally Invasive Surgery", "Complex Cases"],
          internationalTraining: ["USA", "UK", "Germany"],
          awards: ["Best Doctor Award 2020", "Excellence in Healthcare 2019"]
        }).returning();
        createdDoctors.push(doctor);
      }

      // D. Create 3-5 Treatments per Hospital
      const numTreatments = randInt(3, 5);
      const usedTreatments = new Set();
      for (let k = 0; k < numTreatments; k++) {
        let template;
        do {
          template = rand(TREATMENT_TEMPLATES);
        } while (usedTreatments.has(template.name));
        usedTreatments.add(template.name);

        const treatmentSlug = `${template.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${hospital.id}-${k}`;

        const [treatment] = await db.insert(treatments).values({
          hospitalId: hospital.id,
          name: `[TEST] ${template.name}`,
          slug: treatmentSlug,
          category: template.category,
          subCategory: template.category,
          shortDescription: `World-class ${template.name} with experienced specialists and latest technology.`,
          fullDescription: `[TEST DATA] Our ${template.name} program offers comprehensive care from diagnosis to recovery. Using cutting-edge technology and evidence-based protocols, we ensure optimal outcomes for all our patients.`,
          procedureSteps: [
            { step: 1, title: "Initial Consultation", description: "Comprehensive evaluation and treatment planning" },
            { step: 2, title: "Pre-operative Preparation", description: "All necessary tests and preparations" },
            { step: 3, title: "Procedure", description: "Surgery/treatment performed by expert team" },
            { step: 4, title: "Post-operative Care", description: "Monitored recovery in comfortable environment" },
            { step: 5, title: "Discharge & Follow-up", description: "Comprehensive discharge plan and follow-up schedule" }
          ],
          technology: ["Latest Equipment", "AI-assisted Diagnostics", "Robotic Surgery"],
          successRate: randInt(92, 99),
          hospitalStay: template.stay,
          recoveryTime: template.recovery,
          preRequisites: ["Blood Tests", "ECG", "Imaging", "Specialist Clearance"],
          minPrice: template.minPrice,
          maxPrice: template.maxPrice,
          insuranceCovered: true,
          thumbnailUrl: rand(IMAGES.treatments),
          isPopular: Math.random() > 0.6
        }).returning();
        createdTreatments.push(treatment);

        // E. Create Package for some treatments (50% chance)
        if (Math.random() > 0.5) {
          await db.insert(packages).values({
            hospitalId: hospital.id,
            treatmentId: treatment.id,
            name: `[TEST] ${template.name} Complete Package`,
            slug: `${treatmentSlug}-pkg`,
            category: 'Surgery Bundle',
            price: template.maxPrice + 3000,
            discountedPrice: template.maxPrice + 2000,
            currency: 'USD',
            durationDays: randInt(7, 21),
            durationNights: randInt(6, 20),
            inclusions: {
              accommodation: "5-Star Hotel / Private Hospital Suite",
              transport: "Airport Pickup & Drop, Local Transport",
              meals: "All Meals Included",
              extraServices: ["City Tour", "Companion Stay", "24/7 Coordinator", "SIM Card", "Currency Exchange"]
            },
            shortDescription: `All-inclusive medical tourism package for ${template.name} including stay, transport, and care.`,
            fullDescription: `[TEST DATA] Complete package covering surgery, hospital stay, hotel accommodation, all meals, airport transfers, and sightseeing. Perfect for international patients seeking hassle-free medical tourism experience.`,
            imageUrl: rand(IMAGES.packages),
            isActive: true,
            isFeatured: Math.random() > 0.7
          });
        }
      }

      // F. Create 2-4 Inquiries per Hospital
      const numInquiries = randInt(2, 4);
      for (let m = 0; m < numInquiries; m++) {
        const patientName = rand(PATIENT_NAMES);
        const country = rand(COUNTRIES);
        const treatment = rand(TREATMENT_TEMPLATES);

        await db.insert(inquiries).values({
          hospitalId: hospital.id,
          patientName: `[TEST] ${patientName}`,
          email: `test.${patientName.toLowerCase().replace(' ', '.')}@example.com`,
          phone: `+1 ${randInt(200, 999)} ${randInt(100, 999)} ${randInt(1000, 9999)}`,
          country: country,
          treatmentType: treatment.name,
          subject: `[TEST] Inquiry about ${treatment.name}`,
          message: `[TEST DATA] Hello, I am interested in ${treatment.name} at your hospital. I am from ${country} and would like to know about the procedure, costs, and accommodation options. Please provide details.`,
          status: rand(['pending', 'responded', 'closed']),
          priority: rand(['low', 'normal', 'high']),
          source: 'website',
          tags: ['medical-tourism', treatment.category.toLowerCase()]
        });
      }

      // G. Create 1-2 Appointments per Hospital (future dates) - SKIP if table doesn't exist
      try {
        const numAppointments = randInt(1, 2);
        if (createdDoctors.length > 0) {
          for (let n = 0; n < numAppointments; n++) {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + randInt(1, 30));

            await db.insert(appointments).values({
              hospitalId: hospital.id,
              doctorId: createdDoctors[createdDoctors.length - 1].id,
              patientName: `[TEST] ${rand(PATIENT_NAMES)}`,
              patientPhone: `+91 ${randInt(70000, 99999)} ${randInt(10000, 99999)}`,
              appointmentDate: futureDate,
              status: rand(['scheduled', 'confirmed']),
              reason: `[TEST] Consultation for ${rand(SPECIALTIES).name}`
            });
          }
        }
      } catch (err) {
        // Appointments table may not exist - skip silently
      }

      console.log(`   ✓ Created hospital with ${numDoctors} doctors, ${numTreatments} treatments`);
    }

    // ==================== CREATE ANALYTICS LOGS ====================
    try {
      console.log('\n📊 Creating analytics logs...');
      for (let i = 0; i < 50; i++) {
        const hospital = rand(createdHospitals);
        await db.insert(analyticsLogs).values({
          eventType: rand(['page_view', 'inquiry', 'hospital_view', 'treatment_view']),
          eventData: { 
            page: rand(['/hospitals', '/treatments', '/packages', '/']),
            duration: randInt(10, 300)
          },
          hospitalId: hospital.id,
          ipAddress: `${randInt(1, 255)}.${randInt(1, 255)}.${randInt(1, 255)}.${randInt(1, 255)}`,
          userAgent: 'Mozilla/5.0 (Test Browser)',
          referrerUrl: rand(['https://google.com', 'https://facebook.com', 'direct', 'https://medicaltourism.com'])
        });
      }
    } catch (err) {
      console.log('   ⚠ analytics_logs table may not exist, skipping...');
    }

    // ==================== CREATE ACTIVITY LOGS ====================
    try {
      console.log('📋 Creating activity logs...');
      for (let i = 0; i < 30; i++) {
        const hospital = rand(createdHospitals);
        await db.insert(activityLogs).values({
          actionType: rand(['hospital_approved', 'inquiry_responded', 'doctor_added', 'package_created']),
          targetType: rand(['hospital', 'inquiry', 'doctor', 'package']),
          targetId: String(hospital.id),
          description: `[TEST] System action on hospital ${hospital.id}`,
          metadata: { test: true, timestamp: new Date().toISOString() }
        });
      }
    } catch (err) {
      console.log('   ⚠ activity_logs table may not exist, skipping...');
    }

    // ==================== CREATE NOTIFICATIONS ====================
    try {
      console.log('🔔 Creating notifications...');
      for (const user of createdUsers.slice(0, 10)) {
        await db.insert(notifications).values({
          userId: user.id,
          title: '[TEST] Welcome to Pondi Medi Tour',
          message: 'Your hospital profile has been approved. Start adding doctors and treatments.',
          type: 'approval',
          isRead: Math.random() > 0.5
        });

        await db.insert(notifications).values({
          userId: user.id,
          title: '[TEST] New Inquiry Received',
          message: 'You have received a new patient inquiry. Please respond within 24 hours.',
          type: 'inquiry',
          isRead: Math.random() > 0.5
        });
      }
    } catch (err) {
      console.log('   ⚠ notifications table may not exist, skipping...');
    }

    // ==================== SUMMARY ====================
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('\n' + '='.repeat(50));
    console.log('✅ SEEDING COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(50));
    console.log(`⏱️  Duration: ${duration} seconds`);
    console.log(`🏥 Hospitals: 20`);
    console.log(`👨‍⚕️ Doctors: ${createdDoctors.length}`);
    console.log(`💉 Treatments: ${createdTreatments.length}`);
    console.log(`📦 Packages: ~${Math.floor(createdTreatments.length / 2)}`);
    console.log(`📧 Inquiries: ~${20 * 3}`);
    console.log(`📅 Appointments: ~${20 * 1.5}`);
    console.log(`📊 Analytics: 50`);
    console.log(`📋 Activity Logs: 30`);
    console.log(`🔔 Notifications: ${createdUsers.slice(0, 10).length * 2}`);
    console.log('='.repeat(50));
    console.log('\n🔑 Test Login Credentials:');
    console.log('   Email: test.hospital.1@pondimeditour.com');
    console.log('   Password: password123');
    console.log('='.repeat(50));

    // Write success file
    const fs = require('fs');
    fs.writeFileSync('seed_result.txt', `SUCCESS - ${new Date().toISOString()}\nHospitals: 20\nDoctors: ${createdDoctors.length}\nTreatments: ${createdTreatments.length}`);

  } catch (error) {
    console.error('\n❌ ERROR DURING SEEDING:', error);
    const fs = require('fs');
    fs.writeFileSync('seed_result.txt', `ERROR: ${error.message}\n${error.stack}`);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

// Run the seeder
seed();
