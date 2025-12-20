-- Migration: Add page_configurations table for CMS
-- This table stores page configurations with version control

CREATE TABLE IF NOT EXISTS page_configurations (
  id SERIAL PRIMARY KEY,
  page_type VARCHAR(50) NOT NULL UNIQUE, -- 'medical' or 'wellness'
  config JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft' or 'published'
  version INTEGER DEFAULT 1,
  modified_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP
);

-- Create index on page_type for faster lookups
CREATE INDEX IF NOT EXISTS idx_page_configurations_type ON page_configurations(page_type);

-- Create page_configuration_history table for version control
CREATE TABLE IF NOT EXISTS page_configuration_history (
  id SERIAL PRIMARY KEY,
  page_type VARCHAR(50) NOT NULL,
  config JSONB NOT NULL,
  version INTEGER NOT NULL,
  modified_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

-- Create index on page_type and version
CREATE INDEX IF NOT EXISTS idx_page_config_history ON page_configuration_history(page_type, version DESC);

-- Insert default configurations from JSON files (will be populated by application)
INSERT INTO page_configurations (page_type, config, status, version) 
VALUES 
  ('medical', '{}'::jsonb, 'published', 1),
  ('wellness', '{}'::jsonb, 'published', 1)
ON CONFLICT (page_type) DO NOTHING;
