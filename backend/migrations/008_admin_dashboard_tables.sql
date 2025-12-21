-- ============================================
-- NEW TABLES FOR ADMIN DASHBOARD
-- Run these commands in your PostgreSQL database
-- ============================================

-- 1. ANALYTICS LOGS - Track page views and user activity
CREATE TABLE IF NOT EXISTS analytics_logs (
    id SERIAL PRIMARY KEY,
    event_type TEXT NOT NULL, -- 'page_view', 'inquiry', 'signup', 'hospital_view'
    event_data JSONB, -- Flexible data storage
    user_id UUID REFERENCES users(id),
    hospital_id INTEGER REFERENCES hospital_details(id),
    ip_address TEXT,
    user_agent TEXT,
    referrer_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_analytics_event_type ON analytics_logs(event_type);
CREATE INDEX idx_analytics_created_at ON analytics_logs(created_at);
CREATE INDEX idx_analytics_user_id ON analytics_logs(user_id);


-- 2. ACTIVITY LOGS - Audit trail for admin actions
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    actor_id UUID REFERENCES users(id), -- Who performed the action
    action_type TEXT NOT NULL, -- 'hospital_approved', 'user_created', 'inquiry_responded', 'user_role_changed'
    target_type TEXT, -- 'hospital', 'user', 'inquiry', 'doctor', 'treatment'
    target_id TEXT, -- ID of the affected entity (as text for flexibility)
    description TEXT, -- Human-readable description
    metadata JSONB, -- Additional context (old_value, new_value, etc.)
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activity_actor ON activity_logs(actor_id);
CREATE INDEX idx_activity_type ON activity_logs(action_type);
CREATE INDEX idx_activity_created ON activity_logs(created_at DESC);


-- 3. ADMIN SETTINGS - Store preferences and system settings
CREATE TABLE IF NOT EXISTS admin_settings (
    id SERIAL PRIMARY KEY,
    admin_id UUID REFERENCES users(id), -- NULL for system-wide settings
    setting_key TEXT NOT NULL,
    setting_value JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(admin_id, setting_key) -- One setting per admin per key
);

-- Index
CREATE INDEX idx_settings_admin ON admin_settings(admin_id);


-- 4. NOTIFICATIONS - Push notifications and alerts for admins
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL, -- Recipient
    title TEXT NOT NULL,
    message TEXT,
    type TEXT DEFAULT 'info', -- 'inquiry', 'approval', 'system', 'alert', 'success'
    link_url TEXT, -- Where to navigate on click
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);


-- 5. APPROVAL QUEUE (Optional) - Centralized approvals tracking
-- Note: You can skip this if you prefer to use status fields in existing tables
CREATE TABLE IF NOT EXISTS approval_queue (
    id SERIAL PRIMARY KEY,
    item_type TEXT NOT NULL, -- 'hospital', 'doctor', 'treatment', 'package'
    item_id TEXT NOT NULL, -- ID as text (can be serial or UUID)
    submitted_by UUID REFERENCES users(id),
    reviewed_by UUID REFERENCES users(id),
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    rejection_reason TEXT,
    priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    created_at TIMESTAMP DEFAULT NOW(),
    reviewed_at TIMESTAMP,
    UNIQUE(item_type, item_id) -- One approval per item
);

-- Indexes
CREATE INDEX idx_approval_status ON approval_queue(status);
CREATE INDEX idx_approval_type ON approval_queue(item_type);
CREATE INDEX idx_approval_created ON approval_queue(created_at DESC);


-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert some sample activity logs
INSERT INTO activity_logs (actor_id, action_type, target_type, target_id, description, metadata)
SELECT 
    id as actor_id,
    'user_login' as action_type,
    'user' as target_type,
    id::text as target_id,
    'Admin logged in' as description,
    '{"ip": "127.0.0.1"}'::jsonb as metadata
FROM users 
WHERE user_type IN ('admin', 'superadmin')
LIMIT 1;


-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if tables were created successfully
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name IN ('analytics_logs', 'activity_logs', 'admin_settings', 'notifications', 'approval_queue')
ORDER BY table_name;

-- Count rows in new tables
SELECT 
    'analytics_logs' as table_name, COUNT(*) as row_count FROM analytics_logs
UNION ALL
SELECT 'activity_logs', COUNT(*) FROM activity_logs
UNION ALL
SELECT 'admin_settings', COUNT(*) FROM admin_settings
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications
UNION ALL
SELECT 'approval_queue', COUNT(*) FROM approval_queue;
