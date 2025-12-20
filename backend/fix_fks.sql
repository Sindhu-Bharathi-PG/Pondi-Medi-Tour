-- MANUAL FIX SCRIPT: Rename table and update Foreign Keys
-- Run this in your SQL client or via psql

BEGIN;

-- 1. Rename Table (Safe check)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'hospital_profiles') THEN
    ALTER TABLE hospital_profiles RENAME TO hospital_details;
  END IF;
END $$;

-- 2. Fix Users Table FK
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_hospital_id_fkey;
ALTER TABLE users DROP CONSTRAINT IF EXISTS fk_users_hospital;
ALTER TABLE users 
  ADD CONSTRAINT fk_users_hospital 
  FOREIGN KEY (hospital_id) REFERENCES hospital_details(id) ON DELETE SET NULL;

-- 3. Fix Doctors Table FK
ALTER TABLE doctors DROP CONSTRAINT IF EXISTS doctors_hospital_id_fkey;
ALTER TABLE doctors 
  ADD CONSTRAINT fk_doctors_hospital 
  FOREIGN KEY (hospital_id) REFERENCES hospital_details(id) ON DELETE CASCADE;

-- 4. Fix Treatments Table FK
ALTER TABLE treatments DROP CONSTRAINT IF EXISTS treatments_hospital_id_fkey;
ALTER TABLE treatments 
  ADD CONSTRAINT fk_treatments_hospital 
  FOREIGN KEY (hospital_id) REFERENCES hospital_details(id) ON DELETE SET NULL;

-- 5. Fix Packages Table FK
ALTER TABLE packages DROP CONSTRAINT IF EXISTS packages_hospital_id_fkey;
ALTER TABLE packages 
  ADD CONSTRAINT fk_packages_hospital 
  FOREIGN KEY (hospital_id) REFERENCES hospital_details(id) ON DELETE CASCADE;

-- 6. Fix Inquiries Table FK
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_hospital_id_fkey;
ALTER TABLE inquiries 
  ADD CONSTRAINT fk_inquiries_hospital 
  FOREIGN KEY (hospital_id) REFERENCES hospital_details(id) ON DELETE SET NULL;

COMMIT;

-- Verify
SELECT 
    tc.table_schema, 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' AND ccu.table_name = 'hospital_details';
