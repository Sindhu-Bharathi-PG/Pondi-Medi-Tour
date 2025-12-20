-- Create Treatments Table (Replacing Offerings)
DROP TABLE IF EXISTS offerings CASCADE;
DROP TABLE IF EXISTS treatments CASCADE;

CREATE TABLE treatments (
  id SERIAL PRIMARY KEY,
  hospital_id INTEGER REFERENCES hospital_details(id) ON DELETE SET NULL,
  
  -- Core Identity
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT,
  sub_category TEXT,
  
  -- Medical Details
  short_description TEXT,
  full_description TEXT,
  procedure_steps JSONB, -- Stores array of objects
  technology TEXT[],     -- Array of strings
  success_rate INTEGER,  -- Percentage (0-100)
  
  -- Logistics
  hospital_stay TEXT,
  recovery_time TEXT,
  pre_requisites TEXT[], -- Array of strings
  
  -- Pricing
  min_price INTEGER,
  max_price INTEGER,
  insurance_covered BOOLEAN DEFAULT TRUE,
  
  -- Media
  thumbnail_url TEXT,
  is_popular BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_treatments_hospital_id ON treatments(hospital_id);
CREATE INDEX idx_treatments_category ON treatments(category);
CREATE INDEX idx_treatments_slug ON treatments(slug);
CREATE INDEX idx_treatments_is_popular ON treatments(is_popular);

-- Auto-update trigger
CREATE TRIGGER trigger_treatments_updated_at 
    BEFORE UPDATE ON treatments
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at();

-- Sample Data
INSERT INTO treatments (
  name, category, min_price, max_price, hospital_stay, recovery_time, success_rate, is_popular
) VALUES 
('Total Knee Replacement', 'Orthopedics', 4500, 6000, '3-5 Days', '4-6 Weeks', 98, true),
('Angioplasty', 'Cardiology', 3200, 4500, '2 Days', '1 Week', 99, false);
