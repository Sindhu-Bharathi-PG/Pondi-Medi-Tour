-- Create Packages Table (Medical Tourism Bundles)
DROP TABLE IF EXISTS packages CASCADE;

CREATE TABLE packages (
  id SERIAL PRIMARY KEY,
  hospital_id INTEGER REFERENCES hospital_details(id) ON DELETE CASCADE,
  treatment_id INTEGER REFERENCES treatments(id) ON DELETE SET NULL,
  
  -- Identity
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT NOT NULL, -- 'Wellness', 'Checkup', 'Surgery Bundle'
  
  -- Pricing
  price INTEGER NOT NULL,
  discounted_price INTEGER,
  currency TEXT DEFAULT 'USD',
  
  -- Logistics
  duration_days INTEGER NOT NULL,
  duration_nights INTEGER,
  
  -- Inclusions (JSONB)
  -- Structure: { accommodation: "5-Star", transport: "Airport Pickup", meals: "All Inclusive", extraServices: ["City Tour"] }
  inclusions JSONB DEFAULT '{"accommodation": null, "transport": null, "meals": null, "extraServices": []}',
  
  -- Content
  short_description TEXT,
  full_description TEXT,
  image_url TEXT,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_packages_hospital_id ON packages(hospital_id);
CREATE INDEX idx_packages_category ON packages(category);
CREATE INDEX idx_packages_slug ON packages(slug);
CREATE INDEX idx_packages_price ON packages(price);

-- Auto-update trigger
CREATE TRIGGER trigger_packages_updated_at 
    BEFORE UPDATE ON packages
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at();

-- Sample Data
INSERT INTO packages (
  name, slug, category, price, discounted_price, duration_days, duration_nights, inclusions, short_description, is_active
) VALUES (
  'Executive Cardiac Checkup + Stay', 
  'executive-cardiac-checkup', 
  'Checkup', 
  800, 
  650, 
  3, 
  2,
  '{
    "accommodation": "4-Star Hotel", 
    "transport": "Airport & Hotel Transfer", 
    "meals": "Breakfast Included", 
    "extraServices": ["Beach Wellness Walk"]
   }',
  'A comprehensive heart health assessment combined with a relaxing 2-night stay.',
  true
);
