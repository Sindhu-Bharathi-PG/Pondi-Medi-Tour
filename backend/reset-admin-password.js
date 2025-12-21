const postgres = require('postgres');
const bcrypt = require('bcryptjs');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function resetAdminPassword() {
  const sql = postgres(DATABASE_URL);

  try {
    console.log('🔄 Resetting admin passwords...');
    
    // Hash for "123456"
    const hashedPassword = await bcrypt.hash('123456', 12);
    
    // Check if admin exists
    const existing = await sql`SELECT id, email, user_type FROM users WHERE user_type IN ('admin', 'superadmin')`;
    console.log('Found users:', existing);

    if (existing.length === 0) {
      console.log('➕ Creating new admin user...');
      await sql`
        INSERT INTO users (email, password, name, user_type, is_active, email_verified)
        VALUES ('admin@test.com', ${hashedPassword}, 'Admin User', 'admin', true, true)
      `;
      console.log('✅ Created admin@test.com');
    } else {
      // Update all admin passwords
      await sql`
        UPDATE users 
        SET password = ${hashedPassword}
        WHERE user_type IN ('admin', 'superadmin')
      `;
      console.log('✅ Updated passwords for existing admins');
    }

    // Also update specific accounts
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}
      WHERE email IN ('admin@test.com', 'superadmin@test.com', 'admin@pondimeditour.com')
    `;

    console.log('\\n✅ Admin password reset complete!');
    console.log('📧 Email: admin@test.com (or any admin account)');
    console.log('🔑 Password: 123456\\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

resetAdminPassword();
