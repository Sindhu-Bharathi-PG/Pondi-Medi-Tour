const postgres = require('postgres');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL);

async function createSuperAdmin() {
  try {
    console.log('🔐 Creating Super Admin account...');
    
    // New Super Admin Credentials
    const email = 'superadmin@pondimeditour.in';
    const password = 'SuperAdmin@2024';
    const name = 'Super Administrator';
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Check if user exists
    const existing = await sql`
      SELECT id, email FROM users WHERE email = ${email}
    `;
    
    if (existing.length > 0) {
      // Update existing user
      await sql`
        UPDATE users 
        SET password = ${hashedPassword},
            user_type = 'superadmin',
            is_active = true,
            email_verified = true,
            name = ${name}
        WHERE email = ${email}
      `;
      console.log('✅ Super Admin updated successfully!');
    } else {
      // Create new user
      await sql`
        INSERT INTO users (email, password, name, user_type, is_active, email_verified)
        VALUES (${email}, ${hashedPassword}, ${name}, 'superadmin', true, true)
      `;
      console.log('✅ Super Admin created successfully!');
    }
    
    console.log('\n📋 Super Admin Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🌐 Login URL: http://localhost:3000/login/admin');
    
  } catch (error) {
    console.error('❌ Error creating Super Admin:', error);
  } finally {
    await sql.end();
  }
}

createSuperAdmin();
