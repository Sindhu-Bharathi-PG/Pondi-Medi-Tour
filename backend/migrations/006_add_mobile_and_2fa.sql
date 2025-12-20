-- Migration: Add mobile and 2FA support to users table

-- Add phone_number if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'phone_number') THEN
        ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);
        CREATE INDEX idx_users_phone ON users(phone_number);
    END IF;
END $$;

-- Add 2FA fields if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'two_factor_secret') THEN
        ALTER TABLE users ADD COLUMN two_factor_secret TEXT;
        ALTER TABLE users ADD COLUMN two_factor_enabled BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Update existing superadmin to have 2FA enabled (optional, for demo)
UPDATE users 
SET two_factor_enabled = TRUE 
WHERE user_type = 'superadmin';
