const { pgTable, text, timestamp, boolean, uuid, integer, jsonb, serial } = require('drizzle-orm/pg-core');

const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name'),
  userType: text('user_type').notNull(), // patient, doctor, hospital, admin, superadmin
  hospitalId: integer('hospital_id').references(() => hospitalProfiles.id),
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
const hospitalProfiles = pgTable('hospital_profiles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'Government' or 'Private'
  establishmentYear: integer('establishment_year'),
  accreditations: jsonb('accreditations').default([]),
  beds: integer('beds'),
  patientCount: jsonb('patient_count').default({}),
  location: jsonb('location').notNull(),
  contact: jsonb('contact').default({}),
  description: jsonb('description').default({}),
  departments: jsonb('departments').default([]),
  specialties: jsonb('specialties').default([]),
  equipment: jsonb('equipment').default([]),
  facilities: jsonb('facilities').default([]),
  doctors: jsonb('doctors').default([]),
  treatments: jsonb('treatments').default([]),
  packages: jsonb('packages').default([]),
  reviews: jsonb('reviews').default([]),
  photos: jsonb('photos').default([]),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
const doctors = pgTable('doctors', {
  id: serial('id').primaryKey(),
  hospitalId: integer('hospital_id').references(() => hospitalProfiles.id),
  name: text('name').notNull(),
  specialty: text('specialty').notNull(),
  qualification: text('qualification'),
  experienceYears: integer('experience_years'),
  // Using simple text for simplicity in ORM, assuming DB might be array or JSON. 
  // If DB is TEXT[], Drizzle's text[] support depends on version.
  // For safety in this environment, we'll map to 'bio' and 'imageUrl' mostly.
  bio: text('bio'),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// 4. Treatments & Packages (Marketplace Entity)
const offerings = pgTable('offerings', {
  id: serial('id').primaryKey(),
  hospitalId: integer('hospital_id').references(() => hospitalProfiles.id),
  type: text('type'), // 'treatment', 'package', 'checkup'
  name: text('name').notNull(),
  category: text('category'),
  minPrice: integer('min_price'), // Using integer for simpler price handling or decimal in DB
  maxPrice: integer('max_price'),
  duration: text('duration'),
  description: text('description'),
  isPopular: boolean('is_popular').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// 5. Appointments (Transactional)
const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  hospitalId: integer('hospital_id').references(() => hospitalProfiles.id),
  doctorId: integer('doctor_id').references(() => doctors.id),
  patientUserId: uuid('patient_user_id').references(() => users.id),
  patientName: text('patient_name').notNull(),
  patientPhone: text('patient_phone'),
  appointmentDate: timestamp('appointment_date').notNull(),
  status: text('status').default('scheduled'),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 6. Inquiries (Transactional)
const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  hospitalId: integer('hospital_id').references(() => hospitalProfiles.id),
  patientName: text('patient_name'),
  email: text('email'),
  subject: text('subject'),
  message: text('message'),
  status: text('status').default('pending'), 
  createdAt: timestamp('created_at').defaultNow(),
});

// Export all tables
module.exports = { users, patients, doctors, hospitalProfiles, inquiries, appointments, offerings };
