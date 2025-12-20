-- DATA SEEDING SCRIPT
-- RUN THIS SCRIPT TO POPULATE YOUR DATABASE WITH SAMPLE DATA
-- WARNING: This will try to insert data. If IDs clash, it might fail. 
-- Best run on a fresh DB or after TRUNCATE.

BEGIN;

-- 1. Insert USERS (Admin, Hospital, Patient)
-- Using explicit UUIDs to make relationships easy to set up
INSERT INTO users (id, email, password, name, user_type, is_active, email_verified)
VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'superadmin@pondimeditour.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5M5rH6PA8.Q9y', 'Super Admin', 'superadmin', true, true),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'apollo@pondimeditour.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5M5rH6PA8.Q9y', 'Apollo Admin', 'hospital', true, true),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', 'patient@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5M5rH6PA8.Q9y', 'John Doe', 'patient', true, true)
ON CONFLICT (email) DO NOTHING;

-- 2. Insert HOSPITAL_DETAILS
-- Using explicit ID 1
INSERT INTO hospital_details (
    id, user_id, name, slug, type, establishment_year, 
    short_description, full_description, 
    infrastructure, international_services, accreditations, location, 
    status, logo_url
) VALUES (
    1, 
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', -- Links to Apollo Admin
    'Apollo Specialty Hospital',
    'apollo-specialty-hospital',
    'Private',
    2001,
    'A world-class tertiary care facility known for excellence in cardiology and orthopedics.',
    'Apollo Specialty Hospital is a state-of-the-art medical facility offering comprehensive healthcare services. With a focus on medical tourism, we provide personalized care for international patients.',
    '{
        "totalBeds": 450,
        "icuBeds": 85,
        "operatingTheaters": 14,
        "technologies": ["Da Vinci Robot", "3 Tesla MRI", "CyberKnife"],
        "amenities": ["Private Suites", "International Cuisine", "Prayer Room", "Family Accommodation"]
    }',
    '{
        "languages": ["English", "French", "Arabic", "Russian"],
        "services": ["Visa Assistance", "Airport Pickup", "Hotel Booking", "Interpreter Services"],
        "coordinatorAvailable": true,
        "teleconsultation": true
    }',
    '[
        {"name": "JCI", "year": 2023, "issuer": "Joint Commission International"},
        {"name": "NABH", "year": 2022, "issuer": "National Accreditation Board for Hospitals"}
    ]',
    '{
        "address": "No. 1, Old Trunk Road",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "pincode": "600001",
        "coords": {"lat": 13.0827, "lng": 80.2707}
    }',
    'verified',
    'https://res.cloudinary.com/demo/image/upload/v1600000000/hospital_logo.png'
)
ON CONFLICT (id) DO NOTHING;

-- Update the User to link back to the hospital (if your logic requires it)
UPDATE users SET hospital_id = 1 WHERE id = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22';


-- 3. Insert DOCTORS
INSERT INTO doctors (
    hospital_id, name, specialty, sub_specialty, 
    credentials, experience, bio, 
    languages, consultation_timings, is_available, is_featured,
    surgeries_count, publications_count, rating, reviews_count,
    education, expertise, international_training, awards, service_slug,
    image_url
) VALUES 
(
    1, 
    'Dr. Rajesh Kumar', 
    'Cardiology', 
    'Interventional Cardiology',
    'MBBS, MD, DM (Cardiology)', 
    '25+ Years', 
    'Dr. Rajesh Kumar is a renowned cardiologist with expertise in complex angioplasties and heart valve replacements.',
    ARRAY['English', 'Tamil', 'Hindi'],
    'Mon-Sat: 10:00 AM - 04:00 PM', 
    true, true,
    1500, 45, 4.9, 120,
    '[
      {"degree": "MBBS", "institution": "Madras Medical College", "year": 1995},
      {"degree": "MD", "institution": "AIIMS New Delhi", "year": 1999}
    ]',
    ARRAY['Angioplasty', 'Heart Valve Replacement', 'Pacemaker Implantation'],
    ARRAY['United Kingdom', 'USA'],
    ARRAY['Best Cardiologist 2022', 'Lifetime Achievement Award'],
    'cardiology-service',
    'https://res.cloudinary.com/demo/image/upload/v1/doctors/dr_rajesh.jpg'
),
(
    1, 
    'Dr. Sarah Wilson', 
    'Orthopedics', 
    'Joint Replacement',
    'MBBS, MS (Ortho), FRCS', 
    '18+ Years', 
    'Specialist in robotic knee replacement and hip arthroplasty.',
    ARRAY['English', 'French'],
    'Mon-Fri: 09:00 AM - 02:00 PM', 
    true, true,
    800, 20, 4.8, 85,
    '[
      {"degree": "MBBS", "institution": "JIPMER", "year": 2002},
      {"degree": "MS Ortho", "institution": "CMC Vellore", "year": 2006}
    ]',
    ARRAY['Knee Replacement', 'Hip Replacement', 'Arthroscopy'],
    ARRAY['Germany', 'Singapore'],
    ARRAY['Excellence in Orthopedics'],
    'orthopedics-service',
    'https://res.cloudinary.com/demo/image/upload/v1/doctors/dr_sarah.jpg'
);


-- 4. Insert TREATMENTS
INSERT INTO treatments (
    hospital_id, name, slug, category, sub_category, 
    short_description, full_description, 
    min_price, max_price, 
    hospital_stay, recovery_time, success_rate, 
    is_popular, insurance_covered
) VALUES 
(
    1,
    'Total Knee Replacement',
    'total-knee-replacement-apollo',
    'Orthopedics',
    'Joint Replacement',
    'Minimally invasive knee replacement surgery.',
    'Full knee replacement using the latest robotic technology ensuring faster recovery and better alignment.',
    4500, 6000,
    '3-5 Days', '4-6 Weeks', 98,
    true, true
),
(
    1,
    'Coronary Angioplasty',
    'coronary-angioplasty-apollo',
    'Cardiology',
    'Interventional',
    'Stent placement for blocked arteries.',
    'Advanced angioplasty procedure to restore blood flow to the heart muscle.',
    3500, 5000,
    '2 Days', '1 Week', 99,
    true, true
);


-- 5. Insert PACKAGES
-- We need to know Treatment IDs, assuming 1 and 2 from above if table was empty.
-- Using subquery to be safe(r)
INSERT INTO packages (
    hospital_id, treatment_id, name, slug, category, 
    price, discounted_price, currency, 
    duration_days, duration_nights, 
    inclusions, short_description, is_active
) VALUES 
(
    1,
    (SELECT id FROM treatments WHERE slug = 'total-knee-replacement-apollo' LIMIT 1),
    'Premium Knee Replacement Package',
    'premium-knee-replacement-apollo',
    'Surgery Bundle',
    6500, 6000, 'USD',
    10, 9,
    '{
        "accommodation": "5-Star Hospital Suite",
        "transport": "Luxury Airport Transfer",
        "meals": "All Meals Included",
        "extraServices": ["Post-op Physiotherapy", "City Tour for Family"]
    }',
    'All-inclusive package for knee replacement surgery with luxury stay.',
    true
);


-- 6. Insert INQUIRIES
INSERT INTO inquiries (
    hospital_id, patient_name, email, phone, country, 
    treatment_type, subject, message, 
    status, priority, source, assigned_to
) VALUES 
(
    1,
    'Michael Smith',
    'michael.smith@email.com',
    '+1-415-555-0100',
    'USA',
    'Orthopedics',
    'Knee Surgery Inquiry',
    'I am interested in the robotic knee replacement package. What is the earliest availability?',
    'pending',
    'high',
    'website',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22' -- Assigned to Apollo Admin
);

-- Reset Sequences (Important)
SELECT setval(pg_get_serial_sequence('hospital_details', 'id'), (SELECT MAX(id) FROM hospital_details));
SELECT setval(pg_get_serial_sequence('doctors', 'id'), (SELECT MAX(id) FROM doctors));
SELECT setval(pg_get_serial_sequence('treatments', 'id'), (SELECT MAX(id) FROM treatments));
SELECT setval(pg_get_serial_sequence('packages', 'id'), (SELECT MAX(id) FROM packages));
SELECT setval(pg_get_serial_sequence('inquiries', 'id'), (SELECT MAX(id) FROM inquiries));

COMMIT;
