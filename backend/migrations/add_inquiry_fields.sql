-- Migration: Add inquiry_type and related fields to inquiries table
-- Purpose: Support hospital-specific routing and better inquiry classification

ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS inquiry_type VARCHAR(50) DEFAULT 'general';

ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS package_id INTEGER;

ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS source_page VARCHAR(255);

-- Add comment for clarity
COMMENT ON COLUMN inquiries.inquiry_type IS 'Type: general, hospital, package, treatment';
COMMENT ON COLUMN inquiries.package_id IS 'Reference to specific package if inquiry is package-related';
COMMENT ON COLUMN inquiries.source_page IS 'URL of page where inquiry originated';

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_inquiry_type ON inquiries(inquiry_type);

-- Update existing records to have inquiry_type based on hospital_id
UPDATE inquiries 
SET inquiry_type = CASE 
    WHEN hospital_id IS NOT NULL THEN 'hospital'
    ELSE 'general'
END
WHERE inquiry_type = 'general';
