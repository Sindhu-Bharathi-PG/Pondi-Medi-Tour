-- 1. Users (Authentication & Role Management)
-- Central identity table. efficiency: High (Indexed UUIDs and Emails)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('patient', 'doctor', 'hospital', 'admin', 'superadmin')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Hospitals (Core Entity)
-- Stores static profile data. 
-- EFFICIENCY NOTE: JSONB is kept for 'attributes' like facilities/location that vary widely but aren't frequently searched individually in complex ways.
CREATE TABLE IF NOT EXISTS hospital_profiles (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Link to login
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('Government', 'Private')),
    city VARCHAR(100), -- Extracted from JSON for efficient "Search by City"
    state VARCHAR(100),
    establishment_year INTEGER,
    beds INTEGER,
    accreditations JSONB DEFAULT '[]', -- JSON is fine for badges
    location JSONB NOT NULL, -- Full address object
    contact JSONB DEFAULT '{}',
    description JSONB DEFAULT '{}',
    facilities JSONB DEFAULT '[]', -- JSON fine for amenity lists
    photos JSONB DEFAULT '[]',
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Doctors (Searchable Entity)
-- NORMALIZED for efficiency. Allows queries like "Find all Cardiologists with >10 years exp"
CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospital_profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(100) NOT NULL, -- Indexed for fast filtering
    qualification VARCHAR(255),
    experience_years INTEGER,
    languages TEXT[], -- Postgres Array Type (better than JSON for search)
    bio TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);

-- 4. Treatments & Packages (Marketplace Entity)
-- NORMALIZED for price comparison and category filtering.
CREATE TABLE IF NOT EXISTS offerings (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospital_profiles(id) ON DELETE CASCADE,
    type VARCHAR(20) CHECK (type IN ('treatment', 'package', 'checkup')),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    min_price DECIMAL(10, 2), -- Numeric for accurate price sorting
    max_price DECIMAL(10, 2),
    duration VARCHAR(50), 
    description TEXT,
    is_popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_offerings_category ON offerings(category);
CREATE INDEX idx_offerings_price ON offerings(min_price);

-- 5. Appointments (Transactional)
-- Links Patients (Users) -> Doctors -> Hospitals
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospital_profiles(id),
    doctor_id INTEGER REFERENCES doctors(id),
    patient_user_id UUID REFERENCES users(id), -- If patient is registered
    patient_name VARCHAR(255) NOT NULL, -- If guest
    patient_phone VARCHAR(50),
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled',
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);

-- 6. Inquiries (Transactional)
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospital_profiles(id),
    patient_name VARCHAR(255),
    email VARCHAR(255),
    subject VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
