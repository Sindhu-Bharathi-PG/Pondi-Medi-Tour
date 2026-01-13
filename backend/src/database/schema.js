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
  inquiryType: text('inquiry_type').default('general'),
  packageId: integer('package_id').references(() => packages.id),
  treatmentType: text('treatment_type'),
  packageName: text('package_name'), // Package the patient is interested in
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  
  // Status & Response
  status: text('status').default('pending'), // 'pending', 'responded', 'closed', 'spam'
  respondedAt: timestamp('responded_at'),
  responseNotes: text('response_notes'),
  assignedTo: uuid('assigned_to').references(() => users.id), // ✅ Changed to UUID
  
  // Source & Tracking
  source: text('source').default('website'),
  sourcePage: text('source_page'),
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
  
  // Popularity Tracking
  viewCount: integer('view_count').default(0),
  inquiryCount: integer('inquiry_count').default(0),
  popularityScore: integer('popularity_score').default(0),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 7. Analytics Logs - Track page views and user activity
const analyticsLogs = pgTable('analytics_logs', {
  id: serial('id').primaryKey(),
  eventType: text('event_type').notNull(), // 'page_view', 'inquiry', 'signup', 'hospital_view'
  eventData: jsonb('event_data'), // Flexible data storage
  userId: uuid('user_id').references(() => users.id),
  hospitalId: integer('hospital_id').references(() => hospitalDetails.id),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  referrerUrl: text('referrer_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 8. Activity Logs - Audit trail for admin actions
const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  actorId: uuid('actor_id').references(() => users.id), // Who performed the action
  actionType: text('action_type').notNull(), // 'hospital_approved', 'user_created', etc.
  targetType: text('target_type'), // 'hospital', 'user', 'inquiry'
  targetId: text('target_id'), // ID of affected entity
  description: text('description'), // Human-readable description
  metadata: jsonb('metadata'), // Additional context
  createdAt: timestamp('created_at').defaultNow(),
});

// 9. Admin Settings - Store preferences and system settings
const adminSettings = pgTable('admin_settings', {
  id: serial('id').primaryKey(),
  adminId: uuid('admin_id').references(() => users.id), // NULL for system-wide settings
  settingKey: text('setting_key').notNull(),
  settingValue: jsonb('setting_value').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 10. Notifications - Push notifications and alerts
const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(), // Recipient
  title: text('title').notNull(),
  message: text('message'),
  type: text('type').default('info'), // 'inquiry', 'approval', 'system'
  linkUrl: text('link_url'), // Navigation link
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// 11. Approval Queue (Optional) - Centralized approvals
const approvalQueue = pgTable('approval_queue', {
  id: serial('id').primaryKey(),
  itemType: text('item_type').notNull(), // 'hospital', 'doctor', 'treatment'
  itemId: text('item_id').notNull(),
  submittedBy: uuid('submitted_by').references(() => users.id),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  status: text('status').default('pending'), // 'pending', 'approved', 'rejected'
  rejectionReason: text('rejection_reason'),
  priority: text('priority').default('normal'),
  createdAt: timestamp('created_at').defaultNow(),
  reviewedAt: timestamp('reviewed_at'),
});

// 12. Page Configurations - Super Admin Page Builder
const pageConfigurations = pgTable('page_configurations', {
  id: serial('id').primaryKey(),
  pageName: text('page_name').notNull().unique(),
  pageTitle: text('page_title'),
  pageDescription: text('page_description'),
  config: jsonb('config').notNull(),
  isPublished: boolean('is_published').default(false),
  version: integer('version').default(1),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  publishedAt: timestamp('published_at'),
  publishedBy: uuid('published_by').references(() => users.id),
});

// 13. Page Versions - Version history
const pageVersions = pgTable('page_versions', {
  id: serial('id').primaryKey(),
  pageConfigId: integer('page_config_id').references(() => pageConfigurations.id),
  pageName: text('page_name').notNull(),
  config: jsonb('config').notNull(),
  version: integer('version').notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  note: text('note'),
});

// 14. Media Library - Uploaded images
const mediaLibrary = pgTable('media_library', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  originalName: text('original_name'),
  fileUrl: text('file_url').notNull(),
  fileType: text('file_type'),
  fileSize: integer('file_size'),
  width: integer('width'),
  height: integer('height'),
  uploadedBy: uuid('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  tags: text('tags').array(),
});

// 15. Reviews - Patient reviews for hospitals
const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  hospitalId: integer('hospital_id').references(() => hospitalDetails.id),
  
  // Reviewer info
  userName: text('user_name').notNull(),
  userEmail: text('user_email'),
  origin: text('origin'), // Country of origin e.g., 'USA', 'UK'
  
  // Review content
  rating: integer('rating').notNull(), // 1-5 stars
  title: text('title'),
  comment: text('comment'),
  
  // Treatment info (optional)
  treatmentType: text('treatment_type'),
  treatmentDate: timestamp('treatment_date'),
  
  // Moderation
  isVerified: boolean('is_verified').default(false),
  isApproved: boolean('is_approved').default(true),
  
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
  packages,
  // Admin dashboard tables
  analyticsLogs,
  activityLogs,
  adminSettings,
  notifications,
  approvalQueue,
  // Page builder tables
  pageConfigurations,
  pageVersions,
  mediaLibrary,
  // Reviews
  reviews
};
