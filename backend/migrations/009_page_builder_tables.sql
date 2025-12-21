-- ============================================
-- SUPER ADMIN PAGE BUILDER TABLES
-- Run these commands in your PostgreSQL database
-- ============================================

-- 1. PAGE CONFIGURATIONS - Store page designs
CREATE TABLE IF NOT EXISTS page_configurations (
    id SERIAL PRIMARY KEY,
    page_name TEXT NOT NULL UNIQUE, -- 'home', 'about', 'services', 'contact'
    page_title TEXT, -- SEO title
    page_description TEXT, -- SEO description
    config JSONB NOT NULL, -- Component structure and properties
    is_published BOOLEAN DEFAULT FALSE,
    version INTEGER DEFAULT 1,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    published_at TIMESTAMP,
    published_by UUID REFERENCES users(id)
);

-- Index for faster queries
CREATE INDEX idx_page_config_name ON page_configurations(page_name);
CREATE INDEX idx_page_config_published ON page_configurations(is_published);

-- 2. PAGE VERSIONS - Version history for rollback
CREATE TABLE IF NOT EXISTS page_versions (
    id SERIAL PRIMARY KEY,
    page_config_id INTEGER REFERENCES page_configurations(id) ON DELETE CASCADE,
    page_name TEXT NOT NULL,
    config JSONB NOT NULL,
    version INTEGER NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    note TEXT -- Optional version note
);

-- Index
CREATE INDEX idx_page_versions_config ON page_versions(page_config_id);
CREATE INDEX idx_page_versions_created ON page_versions(created_at DESC);

-- 3. MEDIA LIBRARY - Store uploaded images for page builder
CREATE TABLE IF NOT EXISTS media_library (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    original_name TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT, -- 'image', 'video', 'document'
    file_size INTEGER, -- in bytes
    width INTEGER, -- for images
    height INTEGER, -- for images
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    tags TEXT[] -- for categorization
);

-- Index
CREATE INDEX idx_media_type ON media_library(file_type);
CREATE INDEX idx_media_uploaded ON media_library(uploaded_by);


-- ============================================
-- SAMPLE DATA - Default home page configuration
-- ============================================

INSERT INTO page_configurations (page_name, page_title, page_description, config, is_published, version, published_at)
VALUES (
    'home',
    'Pondicherry Medical Tourism - World-Class Healthcare',
    'Discover top hospitals and medical services in Pondicherry, India. Your trusted partner for medical tourism.',
    '{
        "components": [
            {
                "id": "hero-1",
                "type": "Hero",
                "props": {
                    "title": "Your Health Journey Starts Here",
                    "subtitle": "World-class medical care in beautiful Pondicherry",
                    "ctaText": "Explore Hospitals",
                    "ctaLink": "/hospitals",
                    "backgroundImage": "",
                    "overlay": 0.5
                }
            },
            {
                "id": "features-1",
                "type": "Features",
                "props": {
                    "title": "Why Choose Pondicherry",
                    "subtitle": "Excellence in medical care and patient experience",
                    "items": [
                        {
                            "icon": "hospital",
                            "title": "Top Hospitals",
                            "description": "Access to NABH accredited hospitals"
                        },
                        {
                            "icon": "doctor",
                            "title": "Expert Doctors",
                            "description": "Internationally trained specialists"
                        },
                        {
                            "icon": "affordable",
                            "title": "Affordable Care",
                            "description": "Quality healthcare at competitive prices"
                        }
                    ]
                }
            },
            {
                "id": "stats-1",
                "type": "Statistics",
                "props": {
                    "items": [
                        { "value": "45+", "label": "Hospitals" },
                        { "value": "500+", "label": "Doctors" },
                        { "value": "10000+", "label": "Patients" },
                        { "value": "98%", "label": "Satisfaction" }
                    ]
                }
            }
        ]
    }'::jsonb,
    true,
    1,
    NOW()
) ON CONFLICT (page_name) DO NOTHING;


-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if tables were created successfully
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name IN ('page_configurations', 'page_versions', 'media_library')
ORDER BY table_name;

-- View the default home page config
SELECT page_name, page_title, is_published, version, created_at 
FROM page_configurations;

-- Count rows
SELECT 
    'page_configurations' as table_name, COUNT(*) as row_count FROM page_configurations
UNION ALL
SELECT 'page_versions', COUNT(*) FROM page_versions
UNION ALL
SELECT 'media_library', COUNT(*) FROM media_library;
