const { pgTable, text, timestamp, boolean, uuid, integer } = require('drizzle-orm/pg-core');

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  userType: text('user_type').notNull(), // patient, doctor, admin
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Add more tables as needed
export const patients = pgTable('patients', {
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

export const doctors = pgTable('doctors', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  firstName: text('first_name'),
  lastName: text('last_name'),
  specialization: text('specialization'),
  licenseNumber: text('license_number'),
  hospitalId: uuid('hospital_id'),
  phone: text('phone'),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const hospitals = pgTable('hospitals', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
  website: text('website'),
  accreditation: text('accreditation'),
  specialties: text('specialties'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Add more tables for other modules...