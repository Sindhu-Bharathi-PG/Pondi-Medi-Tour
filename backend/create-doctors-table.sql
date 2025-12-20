-- Create Doctors Table
DROP TABLE IF EXISTS doctors CASCADE;

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  hospital_id INTEGER REFERENCES hospital_details(id) ON DELETE CASCADE,
  
  -- Basic Info
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  sub_specialty TEXT,
  credentials TEXT,
  experience TEXT, -- e.g., "31+ years"
  image_url TEXT,
  bio TEXT,
  
  -- Metrics
  surgeries_count INTEGER DEFAULT 0,
  publications_count INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.00,
  reviews_count INTEGER DEFAULT 0,
  
  -- Languages & Availability
  languages TEXT[], -- Array of strings
  consultation_timings TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Credentials (JSONB)
  -- Structure: [{degree: "MBBS", institution: "...", year: 1990}]
  education JSONB, 
  
  -- Arrays
  expertise TEXT[],
  international_training TEXT[],
  awards TEXT[],
  
  -- Service Linking
  service_slug TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_doctors_hospital_id ON doctors(hospital_id);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);

-- Auto-update trigger
CREATE TRIGGER trigger_doctors_updated_at 
    BEFORE UPDATE ON doctors
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at();
