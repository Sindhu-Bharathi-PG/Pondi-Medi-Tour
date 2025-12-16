const postgres = require('postgres');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function runSQL() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log('🗄️  Creating users table...');
    
    // Create table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT,
        user_type TEXT NOT NULL,
        hospital_id INTEGER,
        is_active BOOLEAN DEFAULT true,
        email_verified BOOLEAN DEFAULT false,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Users table created');
    
    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type)`;
    console.log('✅ Indexes created');
    
    // Insert test users (password: "password123" - hashed with bcrypt 12 rounds)
    await sql`
      INSERT INTO users (email, password, name, user_type, is_active, email_verified) 
      VALUES
        ('hospital@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5M5rH6PA8.Q9y', 'Test Hospital', 'hospital', true, true),
        ('admin@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5M5rH6PA8.Q9y', 'Test Admin', 'admin', true, true),
        ('superadmin@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5M5rH6PA8.Q9y', 'Super Admin', 'superadmin', true, true)
      ON CONFLICT (email) DO NOTHING
    `;
    
    console.log('✅ Test users created successfully!');
    console.log('\n📋 Test accounts:');
    console.log('   • hospital@test.com (password: password123)');
    console.log('   • admin@test.com (password: password123)');
    console.log('   • superadmin@test.com (password: password123)');
    console.log('\n🎉 Database setup complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await sql.end();
  }
}

runSQL().catch(console.error);
