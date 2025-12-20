const { pgTable, text, timestamp, boolean, uuid, integer, jsonb, serial, decimal } = require('drizzle-orm/pg-core');

const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name'),
  userType: text('user_type').notNull(), // patient, doctor, hospital, admin, superadmin
  hospitalId: integer('hospital_id').references(() => hospitalDetails.id),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Add more tables as needed
const patients = pgTable('patients', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  firstName: text('first_name'),
  lastName: text('last_name'),
  dateOfBirth: timestamp('date_of_birth'),
  phone: text('phone'),
  address: text('address'),
  medicalHistory: text('medical_history'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 2. Hospitals (Core Entity)
// 2. Hospitals (Core Entity)
// 2. Hospitals (Core Entity)
const hospitalDetails = pgTable('hospital_details', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  
  // Core Identity
  name: text('name').notNull(),
  slug: text('slug').unique(),
  type: text('type'), // 'Private', 'Government', 'Academic'
  establishmentYear: integer('establishment_year'),
  
  // Descriptions
  shortDescription: text('short_description'),
  fullDescription: text('full_description'),
  
  // Infrastructure (JSONB)
  infrastructure: jsonb('infrastructure').default({
    totalBeds: 0,
    icuBeds: 0,
    operatingTheaters: 0,
    specializedUnits: [],
    technologies: [],
    amenities: []
  }),
  
  // International Services (JSONB)
  internationalServices: jsonb('international_services').default({
    languages: [],
    services: [],
    coordinatorAvailable: false,
    teleconsultation: false
  }),
  
  // Accreditations (JSONB Array)
  accreditations: jsonb('accreditations').default([]), 
  
  // Specialized Centers
  specializedCenters: text('specialized_centers').array(),
  
  // Location (JSONB)
  location: jsonb('location'), 
  
  // Media
  logoUrl: text('logo_url'),
  coverUrl: text('cover_url'),
  gallery: jsonb('gallery').default([]),
  
  // Contact
  website: text('website'),
  phone: text('phone'),
  email: text('email'),
  emergencyPhone: text('emergency_phone'),
  
  // Status
  status: text('status').default('pending'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

const doctors = pgTable('doctors', {
  id: serial('id').primaryKey(),
  hospitalId: integer('hospital_id').references(() => hospitalDetails.id),
  
  // Basic Info
  name: text('name').notNull(),
  specialty: text('specialty').notNull(),
  subSpecialty: text('sub_specialty'),
  credentials: text('credentials'),
  experience: text('experience'), // e.g., "31+ years"
  imageUrl: text('image_url'),
  bio: text('bio'),
  
  // Metrics
  surgeriesCount: integer('surgeries_count').default(0),
  publicationsCount: integer('publications_count').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0.00'),
  reviewsCount: integer('reviews_count').default(0),
  
  // Languages & Availability
  languages: text('languages').array(), // ['English', 'Tamil']
  consultationTimings: text('consultation_timings'),
  isAvailable: boolean('is_available').default(true),
  isFeatured: boolean('is_featured').default(false),
  
  // Credentials (JSONB for structured data)
  education: jsonb('education'), // [{degree, institution, year}, ...]
  expertise: text('expertise').array(), // Array of procedures
  internationalTraining: text('international_training').array(), // Countries
  awards: text('awards').array(), // Award titles
  
  // Service Linking
  serviceSlug: text('service_slug'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 4. Treatments (Medical Procedures Only)
const treatments = pgTable('treatments', {
  id: serial('id').primaryKey(),
  hospitalId: integer('hospital_id').references(() => hospitalDetails.id),
  
  // Core Identity
  name: text('name').notNull(), // e.g. "Total Knee Replacement"
  slug: text('slug').unique(),
  category: text('category'), // 'Orthopedics'
  subCategory: text('sub_category'), // 'Joint Replacement'
  
  // Medical Details
  shortDescription: text('short_description'),
  fullDescription: text('full_description'),
  procedureSteps: jsonb('procedure_steps'), // Step-by-step medical process: [{ step: 1, title: '...', description: '...' }]
  technology: text('technology').array(), // Equipment used
  successRate: integer('success_rate'), // %
  
  // Logistics (Medical Context)
  hospitalStay: text('hospital_stay'), // '3-5 Days'
  recoveryTime: text('recovery_time'), // '2 Weeks'
  preRequisites: text('pre_requisites').array(), // 'Cardiac Clearance', 'Blood Tests'
  
  // Pricing (Procedure Cost Only)
  minPrice: integer('min_price'), 
  maxPrice: integer('max_price'),
  insuranceCovered: boolean('insurance_covered').default(true),
  
  // Media & Flags
  thumbnailUrl: text('thumbnail_url'),
  isPopular: boolean('is_popular').default(false),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 5. Appointments (Transactional)
const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  hospitalId: integer('hospital_id').references(() => hospitalDetails.id),
  doctorId: integer('doctor_id').references(() => doctors.id),
  patientUserId: uuid('patient_user_id').references(() => users.id),
  patientName: text('patient_name').notNull(),
  patientPhone: text('patient_phone'),
  appointmentDate: timestamp('appointment_date').notNull(),
  status: text('status').default('scheduled'),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 6. Inquiries (Transactional) - Enhanced
const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  hospitalId: integer('hospital_id').references(() => hospitalDetails.id),
  
  // Patient Information
  patientName: text('patient_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  country: text('country'),
  
  // Inquiry Details
  treatmentType: text('treatment_type'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  
  // Status & Response
  status: text('status').default('pending'), // 'pending', 'responded', 'closed', 'spam'
  respondedAt: timestamp('responded_at'),
  responseNotes: text('response_notes'),
  assignedTo: uuid('assigned_to').references(() => users.id), // ✅ Changed to UUID
  
  // Source & Tracking
  source: text('source').default('website'),
  referrerUrl: text('referrer_url'),
  ipAddress: text('ip_address'),
  
  // Priority & Tags
  priority: text('priority').default('normal'), // 'low', 'normal', 'high', 'urgent'
  tags: text('tags').array(),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 3. Packages (Bundled Offerings)
const packages = pgTable('packages', {
  id: serial('id').primaryKey(),
  hospitalId: integer('hospital_id').references(() => hospitalDetails.id),
  
  // Optional link to a core treatment
  treatmentId: integer('treatment_id').references(() => treatments.id),
  
  // Identity
  name: text('name').notNull(),
  slug: text('slug').unique(),
  category: text('category').notNull(), // 'Wellness', 'Checkup', 'Surgery Bundle'
  
  // Pricing
  price: integer('price').notNull(),
  discountedPrice: integer('discounted_price'),
  currency: text('currency').default('USD'),
  
  // Logistics
  durationDays: integer('duration_days').notNull(),
  durationNights: integer('duration_nights'),
  
  // Inclusions (JSONB - The "Tourism" part)
  inclusions: jsonb('inclusions').default({
    accommodation: null, // '5-Star', 'Private Ward'
    transport: null, // 'Airport Pickup'
    meals: null,
    extraServices: [] // ['City Tour', 'Spa']
  }),
  
  // Content
  shortDescription: text('short_description'),
  fullDescription: text('full_description'),
  imageUrl: text('image_url'),
  
  // Status
  isActive: boolean('is_active').default(true),
  isFeatured: boolean('is_featured').default(false),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Export all tables
module.exports = { 
  users, 
  patients, 
  doctors, 
  hospitalDetails, 
  inquiries, 
  appointments, 
  treatments,
  packages
};
