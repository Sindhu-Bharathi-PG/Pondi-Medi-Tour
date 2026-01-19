
-- Migration: Sync inquiries table with Schema
-- Adds missing columns to avoid Drizzle select query failures

-- 1. Assigned To (Admin/User handling inquiry)
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES users(id);

-- 2. Source Tracking
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'website';
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS referrer_url TEXT;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45);

-- 3. Priority & Tags
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'normal';
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS tags TEXT[];

-- 4. Response Management
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS responded_at TIMESTAMP;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS response_notes TEXT;

-- 5. Inquiry Context (if not already there)
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS treatment_type VARCHAR(100);
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS package_name VARCHAR(100);

-- 6. Safety checks on existing columns just in case
-- (Already added by previous migration but safe to double check or ignore)
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS inquiry_type VARCHAR(50) DEFAULT 'general';
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS package_id INTEGER;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS source_page VARCHAR(255);

-- 7. Ensure status column exists
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_inquiries_hospital_id ON inquiries(hospital_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
