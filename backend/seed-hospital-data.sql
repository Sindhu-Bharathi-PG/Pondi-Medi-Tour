-- SEED DATA SCRIPT FOR MEDICAL TOURISM SYSTEM
-- This script clears existing data and inserts a complete demo dataset.

-- 1. CLEANUP (Optional - Comment out if you want to keep existing data)
-- TRUNCATE users, hospital_details, doctors, treatments, packages, inquiries RESTART IDENTITY CASCADE;

-- 2. CREATE HOSPITAL USER
-- We'll use a specific UUID for linking
DO $$
DECLARE
    v_user_id UUID := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    v_hospital_id INTEGER;
    v_doctor1_id INTEGER;
    v_doctor2_id INTEGER;
    v_treatment1_id INTEGER;
    v_treatment2_id INTEGER;
BEGIN

    -- Insert User
    INSERT INTO users (id, email, password, name, user_type, is_active, email_verified)
    VALUES (
        v_user_id,
        'apollo@example.com',
        '$2b$10$EpIxTBir6VI.rOTqr8kbmuo1.y.zD4W8z/r/vH0j8.p.u.x.x.x', -- 'password' (hashed placeholder)
        'Apollo Admin',
        'hospital',
        true,
        true
    ) ON CONFLICT (email) DO NOTHING;

    -- 3. CREATE HOSPITAL DETAILS
    INSERT INTO hospital_details (
        user_id,
        name,
        slug,
        type,
        establishment_year,
        short_description,
        full_description,
        infrastructure,
        international_services,
        accreditations,
        location,
        status,
        website,
        phone,
        email
    ) VALUES (
        v_user_id,
        'Apollo Specialty Hospital',
        'apollo-specialty-chennai',
        'Private',
        1983,
        'A JCI-accredited multi-specialty hospital renowned for cardiac and orthopedic care.',
        'Apollo Hospitals was established in 1983 by Dr. Prathap C. Reddy. It was the first corporate hospital in India. The Apollo Hospitals Group is today one of the largest integrated healthcare organizations in the world. This specific branch specializes in high-end tertiary care with a focus on medical tourism.',
        '{
            "totalBeds": 550,
            "icuBeds": 120,
            "operatingTheaters": 15,
            "technologies": ["Da Vinci Xi Robot", "CyberKnife", "TrueBeam STx", "3 Tesla MRI"],
            "amenities": ["International Patient Lounge", "Private Suites", "Multi-cuisine Cafeteria", "ATM", "Prayer Room"]
        }',
        '{
            "languages": ["English", "Arabic", "French", "Bengali", "Russian"],
            "services": ["Visa Assistance", "Airport Transfers", "Hotel Booking", "Sim Card", "Dedicated Case Manager"],
            "coordinatorAvailable": true,
            "teleconsultation": true
        }',
        '[
            {"name": "JCI", "issuer": "Joint Commission International", "year": 2023, "logoUrl": "/logos/jci.png"},
            {"name": "NABH", "issuer": "National Accreditation Board for Hospitals", "year": 2022, "logoUrl": "/logos/nabh.png"}
        ]',
        '{
            "address": "21, Greams Lane, Off Greams Road",
            "city": "Chennai",
            "state": "Tamil Nadu",
            "country": "India",
            "pincode": "600006",
            "coords": {"lat": 13.0604, "lng": 80.2496}
        }',
        'verified',
        'https://chennai.apollohospitals.com',
        '+91-44-28290200',
        'international_chennai@apollohospitals.com'
    ) RETURNING id INTO v_hospital_id;
    
    -- Update User with Hospital ID
    UPDATE users SET hospital_id = v_hospital_id WHERE id = v_user_id;

    -- 4. CREATE DOCTORS
    INSERT INTO doctors (
        hospital_id, name, specialty, sub_specialty, experience, credentials, 
        surgeries_count, languages, consultation_timings, is_featured,
        education, expertise
    ) VALUES (
        v_hospital_id,
        'Dr. Y. Vijayachandra Reddy',
        'Cardiology',
        'Interventional Cardiology',
        '28+ Years',
        'MBBS, MD, DM (Cardiology), FACC, FCSI',
        15000,
        ARRAY['English', 'Telugu', 'Tamil'],
        'Mon-Sat: 9:00 AM - 5:00 PM',
        true,
        '[{"degree": "MBBS", "institution": "SV Medical College", "year": 1990}, {"degree": "DM", "institution": "PGIMER", "year": 1995}]',
        ARRAY['Angioplasty', 'TAVR', 'Pacemaker Implantation']
    ) RETURNING id INTO v_doctor1_id;

    INSERT INTO doctors (
        hospital_id, name, specialty, sub_specialty, experience, credentials,
        surgeries_count, languages, consultation_timings, is_featured,
        education, expertise
    ) VALUES (
        v_hospital_id,
        'Dr. Pruthviraj Karumuri',
        'Orthopedics',
        'Joint Replacement',
        '18+ Years',
        'MBBS, MS (Ortho), Fellowship in Arthroplasty (USA)',
        4000,
        ARRAY['English', 'Tamil', 'Hindi'],
        'Mon-Fri: 10:00 AM - 4:00 PM',
        true,
        '[{"degree": "MBBS", "institution": "Madras Medical College", "year": 2002}]',
        ARRAY['Knee Replacement', 'Hip Replacement', 'Arthroscopy']
    ) RETURNING id INTO v_doctor2_id;

    -- 5. CREATE TREATMENTS
    INSERT INTO treatments (
        hospital_id, name, slug, category, sub_category,
        short_description, min_price, max_price, hospital_stay, recovery_time, success_rate
    ) VALUES (
        v_hospital_id,
        'Coronary Artery Bypass Graft (CABG)',
        'cabg-surgery',
        'Cardiology',
        'Heart Surgery',
        'Advanced bypass surgery to restore blood flow to the heart muscle using grafts.',
        5500, 7500,
        '7-9 Days',
        '4-6 Weeks',
        98
    ) RETURNING id INTO v_treatment1_id;

    INSERT INTO treatments (
        hospital_id, name, slug, category, sub_category,
        short_description, min_price, max_price, hospital_stay, recovery_time, success_rate
    ) VALUES (
        v_hospital_id,
        'Total Knee Replacement (Unilateral)',
        'total-knee-replacement',
        'Orthopedics',
        'Joint Surgery',
        'Surgical procedure to replace the weight-bearing surfaces of the knee joint.',
        4000, 6000,
        '4-5 Days',
        '3-6 Weeks',
        96
    ) RETURNING id INTO v_treatment2_id;

    -- 6. CREATE PACKAGES
    INSERT INTO packages (
        hospital_id, treatment_id, name, slug, category,
        price, discounted_price, currency,
        duration_days, duration_nights,
        inclusions, short_description, is_featured
    ) VALUES (
        v_hospital_id, v_treatment2_id,
        'Premium Knee Replacement Package',
        'premium-knee-replacement-package',
        'Surgery Bundle',
        6500, 5999, 'USD',
        14, 13,
        '{
            "accommodation": "Private Deluxe Room for Patient + Companion",
            "transport": "Airport Pick-up & Drop (Luxury SUV)",
            "meals": "Customized Diet Plan + Companion Meals",
            "extraServices": ["Physiotherapy Sessions (x5)", "City Tour for Companion"]
        }',
        'A comprehensive all-inclusive package for knee replacement including surgery, rehab, and luxury stay.',
        true
    );

    INSERT INTO packages (
        hospital_id, NULL, name, slug, category,
        price, discounted_price, currency,
        duration_days, duration_nights,
        inclusions, short_description, is_featured
    ) VALUES (
        v_hospital_id, NULL,
        'Master Whole Body Checkup',
        'master-whole-body-checkup',
        'Checkup',
        350, 299, 'USD',
        1, 0,
        '{
            "accommodation": null,
            "transport": "Complimentary Pick-up",
            "meals": "Breakfast & Lunch",
            "extraServices": ["Consultation with 5 Specialists"]
        }',
        'Extensive health screening covering over 80 parameters including cardiac and cancer markers.',
        false
    );

    -- 7. CREATE INQUIRIES
    INSERT INTO inquiries (
        hospital_id, patient_name, email, phone, country,
        treatment_type, subject, message, status, priority, source
    ) VALUES (
        v_hospital_id, 'John Doe', 'john.doe@email.com', '+1-555-0123', 'USA',
        'Orthopedics', 'Inquiry about Knee Surgery cost',
        'I am looking for a total knee replacement for my father (65M). Please provide an estimate including rehabilitation.',
        'pending', 'high', 'website'
    );

    INSERT INTO inquiries (
        hospital_id, patient_name, email, phone, country,
        treatment_type, subject, message, status, responded_at, priority
    ) VALUES (
        v_hospital_id, 'Fatima Al-Sayed', 'fatima.a@email.com', '+971-50-1234567', 'UAE',
        'Cardiology', 'CABG Surgery Availability',
        'Can you confirm the earliest availability for Dr. Reddy for a CABG procedure?',
        'responded', NOW(), 'urgent'
    );

END $$;
