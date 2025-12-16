-- Create users table with authentication fields
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT,
  user_type TEXT NOT NULL, -- 'patient', 'doctor', 'hospital', 'admin', 'superadmin'
  hospital_id INTEGER REFERENCES hospital_profiles(id),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on user_type for role-based queries
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);

-- Insert test users (password: "password123" - hashed with bcrypt 12 rounds)
INSERT INTO users (email, password, name, user_type, is_active, email_verified) 
VALUES
  ('hospital@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5M5rH6PA8.Q9y', 'Test Hospital', 'hospital', true, true),
  ('admin@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5M5rH6PA8.Q9y', 'Test Admin', 'admin', true, true),
  ('superadmin@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5M5rH6PA8.Q9y', 'Super Admin', 'superadmin', true, true)
ON CONFLICT (email) DO NOTHING;
