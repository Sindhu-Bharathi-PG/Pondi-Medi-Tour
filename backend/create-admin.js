const postgres = require('postgres');
const bcrypt = require('bcrypt');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function createAdminUser() {
  const sql = postgres(DATABASE_URL, { ssl: 'require' });
  
  try {
    console.log('🔄 Creating admin user...');
    
    const email = 'admin@test.com';
    const password = '123456';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if user exists
    const existing = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;
    
    if (existing.length > 0) {
      console.log('⚠️  User already exists, updating password...');
      await sql`
        UPDATE users 
        SET password = ${hashedPassword}, user_type = 'admin'
        WHERE email = ${email}
      `;
      console.log('✅ Updated existing user');
    } else {
      console.log('➕ Creating new admin user...');
      await sql`
        INSERT INTO users (email, password, name, user_type, is_active, email_verified)
        VALUES (
          ${email},
          ${hashedPassword},
          'Admin User',
          'admin',
          true,
          true
        )
      `;
      console.log('✅ Admin user created successfully');
    }
    
    console.log(`\n📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

createAdminUser();
