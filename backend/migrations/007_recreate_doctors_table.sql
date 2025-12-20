-- Drop existing doctors table and recreate with enhanced schema
-- WARNING: This will delete all existing doctor data

-- Drop the existing table
DROP TABLE IF EXISTS doctors CASCADE;

-- Create the new enhanced doctors table
CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  hospital_id INTEGER REFERENCES hospital_profiles(id) ON DELETE CASCADE,
  
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
  rating DECIMAL(3,2) DEFAULT 0.0, -- Auto-calculated from reviews
  reviews_count INTEGER DEFAULT 0, -- Auto-calculated from reviews
  
  -- Languages & Availability
  languages TEXT[], -- Array: ['English', 'Tamil', 'Hindi']
  consultation_timings TEXT, -- e.g., "Mon-Sat: 9AM-1PM, 4PM-7PM"
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- Credentials (JSONB for structured data)
  education JSONB, -- [{degree: "MBBS", institution: "XX", year: "2000"}, ...]
  expertise TEXT[], -- Array of procedures: ['Total Knee Replacement', ...]
  international_training TEXT[], -- Array of countries: ['UK', 'USA', 'Germany']
  awards TEXT[], -- Array of award titles
  
  -- Service Linking
  service_slug TEXT, -- For routing to specialty pages (e.g., 'orthopedics')
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_doctors_hospital_id ON doctors(hospital_id);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_service_slug ON doctors(service_slug);
CREATE INDEX idx_doctors_is_featured ON doctors(is_featured) WHERE is_featured = true;
CREATE INDEX idx_doctors_is_available ON doctors(is_available) WHERE is_available = true;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data to match the current /doctor page
INSERT INTO doctors (
  hospital_id, name, specialty, sub_specialty, credentials, experience, image_url, bio,
  surgeries_count, publications_count, rating, reviews_count,
  languages, consultation_timings, is_available, is_featured,
  education, expertise, international_training, awards, service_slug
) VALUES 
(
  1,
  'Dr. V. Veerappan',
  'Orthopedics',
  'Spine & Joint Replacement',
  'MBBS, MS (Orthopaedics), FRCS (Glasgow)',
  '31+ years',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800',
  'Dr. V. Veerappan is a pioneer in minimally invasive spine surgery with over three decades of experience. He has performed over 5,000 successful surgeries and is known for his expertise in complex joint replacements and revision surgeries. Trained at prestigious institutions in India and the UK, he brings international best practices to patient care.',
  5000,
  45,
  4.9,
  450,
  ARRAY['English', 'Tamil', 'Hindi'],
  'Mon-Sat: 9:00 AM - 1:00 PM, 4:00 PM - 7:00 PM',
  true,
  true,
  '[
    {"degree": "MBBS", "institution": "Madras Medical College", "year": "1990"},
    {"degree": "MS Orthopaedics", "institution": "CMC Vellore", "year": "1994"},
    {"degree": "FRCS", "institution": "Royal College, Glasgow, UK", "year": "1998"}
  ]'::jsonb,
  ARRAY['Total Knee Replacement', 'Hip Replacement Surgery', 'Spine Surgery', 'Revision Joint Surgery', 'Sports Medicine', 'Arthroscopic Surgery'],
  ARRAY['UK', 'USA', 'Germany'],
  ARRAY['Best Orthopedic Surgeon Award - 2019', 'Excellence in Spine Surgery - 2017', 'Distinguished Alumni Award - CMC Vellore'],
  'orthopedics'
);

-- Add more sample doctors as needed
