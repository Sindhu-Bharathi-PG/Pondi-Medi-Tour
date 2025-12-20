-- Create Hospital Details Table (Formerly Hospital Profiles)
DROP TABLE IF EXISTS hospital_details CASCADE;

CREATE TABLE hospital_details (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  
  -- Core Identity
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  type TEXT, -- 'Private', 'Government', 'Academic'
  establishment_year INTEGER,
  
  -- Descriptions
  short_description TEXT,
  full_description TEXT,
  
  -- Infrastructure (JSONB)
  -- Structure: { totalBeds: 500, icuBeds: 50, operatingTheaters: 12, specializedUnits: [], technologies: [], amenities: [] }
  infrastructure JSONB DEFAULT '{"totalBeds": 0, "icuBeds": 0, "operatingTheaters": 0, "specializedUnits": [], "technologies": [], "amenities": []}',
  
  -- International Services (JSONB)
  -- Structure: { languages: [], services: [], coordinatorAvailable: boolean, teleconsultation: boolean }
  international_services JSONB DEFAULT '{"languages": [], "services": [], "coordinatorAvailable": false, "teleconsultation": false}',
  
  -- Accreditations (JSONB Array)
  -- Structure: [{ name: "JCI", issuer: "...", year: 2024, logoUrl: "..." }]
  accreditations JSONB DEFAULT '[]',
  
  -- Specialized Centers (Array)
  specialized_centers TEXT[],
  
  -- Location (JSONB)
  -- Structure: { address: "...", city: "...", state: "...", country: "...", pincode: "...", coords: { lat: 0, lng: 0 } }
  location JSONB,
  
  -- Media
  logo_url TEXT,
  cover_url TEXT,
  gallery JSONB DEFAULT '[]', -- [{ category: "Rooms", urls: [...] }]
  
  -- Contact
  website TEXT,
  phone TEXT,
  email TEXT,
  emergency_phone TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'banned'
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_hospital_details_slug ON hospital_details(slug);
CREATE INDEX idx_hospital_details_user_id ON hospital_details(user_id);
CREATE INDEX idx_hospital_details_type ON hospital_details(type);

-- Auto-update trigger
CREATE TRIGGER trigger_hospital_details_updated_at 
    BEFORE UPDATE ON hospital_details
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at();

-- Sample Data (A Medical Tourism Ready Hospital)
INSERT INTO hospital_details (
  name, slug, type, establishment_year, short_description, infrastructure, international_services, accreditations, location, status
) VALUES (
  'Apollo Specialty Hospital', 
  'apollo-specialty-hospital', 
  'Private', 
  2001, 
  'A world-class tertiary care facility.',
  '{
    "totalBeds": 450, 
    "icuBeds": 85, 
    "operatingTheaters": 14, 
    "technologies": ["Da Vinci Pharmacy", "3 Tesla MRI"],
    "amenities": ["Private Suites", "International Cuisine"]
   }',
  '{
    "languages": ["English", "French", "Arabic"], 
    "services": ["Visa Assistance", "Airport Pickup", "Hotel Booking"],
    "coordinatorAvailable": true
   }',
  '[{"name": "JCI", "year": 2023}, {"name": "NABH", "year": 2022}]',
  '{
    "address": "No. 1, Old Trunk Road", 
    "city": "Chennai", 
    "state": "Tamil Nadu", 
    "country": "India"
   }',
  'verified'
);
