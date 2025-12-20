-- Enhanced Inquiries Table - Corrected SQL
-- Fix: assigned_to should be UUID to match users.id

DROP TABLE IF EXISTS inquiries CASCADE;

CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  hospital_id INTEGER REFERENCES hospital_details(id) ON DELETE SET NULL,
  
  -- Patient Information
  patient_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  
  -- Inquiry Details
  treatment_type TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Status & Response
  status TEXT DEFAULT 'pending',
  responded_at TIMESTAMP,
  response_notes TEXT,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL, -- ✅ Changed to UUID
  
  -- Source & Tracking
  source TEXT DEFAULT 'website',
  referrer_url TEXT,
  ip_address TEXT,
  
  -- Priority & Tags
  priority TEXT DEFAULT 'normal',
  tags TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_inquiries_hospital_id ON inquiries(hospital_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_email ON inquiries(email);
CREATE INDEX idx_inquiries_priority ON inquiries(priority) WHERE status = 'pending';
CREATE INDEX idx_inquiries_treatment_type ON inquiries(treatment_type);
CREATE INDEX idx_inquiries_assigned_to ON inquiries(assigned_to) WHERE assigned_to IS NOT NULL;

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_inquiries_updated_at 
    BEFORE UPDATE ON inquiries
    FOR EACH ROW 
    EXECUTE FUNCTION update_inquiries_updated_at();

-- Insert some sample data
INSERT INTO inquiries (
  patient_name, email, phone, country, 
  treatment_type, subject, message, 
  status, priority, source
) VALUES 
(
  'John Doe',
  'john@example.com',
  '+1-555-0123',
  'United States',
  'Orthopedics',
  'Inquiry regarding Orthopedics',
  'I am looking for information regarding total knee replacement surgery cost and recovery time.',
  'pending',
  'high',
  'website'
),
(
  'Alice Smith',
  'alice@example.com',
  '+44-20-7123-4567',
  'United Kingdom',
  'Cardiology',
  'Inquiry regarding Cardiology',
  'Do you have availability for cardiac consultations?',
  'responded',
  'normal',
  'website'
),
(
  'Robert Brown',
  'robert@example.com',
  '+971-4-123-4567',
  'UAE',
  'Dental',
  'Insurance Question',
  'Do you accept international insurance for dental procedures?',
  'pending',
  'urgent',
  'website'
);

-- Verification query
SELECT 
  id, patient_name, email, phone, country, 
  treatment_type, status, priority, created_at
FROM inquiries
ORDER BY 
  CASE priority 
    WHEN 'urgent' THEN 0 
    WHEN 'high' THEN 1 
    WHEN 'normal' THEN 2 
    WHEN 'low' THEN 3 
    ELSE 2 
  END,
  created_at DESC;
