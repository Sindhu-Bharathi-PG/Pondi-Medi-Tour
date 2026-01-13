-- Migration: Add popularity tracking columns to packages table
-- Date: 2026-01-10

ALTER TABLE packages ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS inquiry_count INTEGER DEFAULT 0;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS popularity_score INTEGER DEFAULT 0;

-- Create index for faster sorting by popularity
CREATE INDEX IF NOT EXISTS idx_packages_popularity ON packages(popularity_score DESC);
CREATE INDEX IF NOT EXISTS idx_packages_featured ON packages(is_featured);
