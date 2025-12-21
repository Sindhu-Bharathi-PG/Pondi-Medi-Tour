const postgres = require('postgres');
const bcrypt = require('bcryptjs');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function fixAdminNow() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log('🔍 Checking for admin users...');
    
    // Check current users
    const users = await sql`SELECT id, email, user_type, is_active FROM users WHERE user_type IN ('admin', 'superadmin')`;
    console.log('Found admin users:', users);
    
    const password = '123456';
    const hash = await bcrypt.hash(password, 10);
    
    console.log('\n🔄 Setting password to: 123456');
    console.log('Hash:', hash);
    
    if (users.length === 0) {
      // Create new admin
      console.log('\n➕ Creating new admin...');
      const result = await sql`
        INSERT INTO users (email, password, name, user_type, is_active, email_verified)
        VALUES ('admin@test.com', ${hash}, 'Admin User', 'admin', true, true)
        RETURNING id, email
      `;
      console.log('✅ Created:', result[0]);
    } else {
      // Update all admin passwords
      console.log('\n🔄 Updating existing admins...');
      await sql`
        UPDATE users 
        SET password = ${hash}, is_active = true
        WHERE user_type IN ('admin', 'superadmin')
      `;
      console.log('✅ Updated all admin accounts');
    }
    
    // Also ensure these specific emails exist
    const emails = ['admin@test.com', 'superadmin@test.com'];
    for (const email of emails) {
      const exists = await sql`SELECT id FROM users WHERE email = ${email}`;
      if (exists.length === 0) {
        await sql`
          INSERT INTO users (email, password, name, user_type, is_active, email_verified)
          VALUES (${email}, ${hash}, 'Admin', 'admin', true, true)
        `;
        console.log(`✅ Created ${email}`);
      } else {
        await sql`UPDATE users SET password = ${hash}, is_active = true WHERE email = ${email}`;
        console.log(`✅ Updated ${email}`);
      }
    }
    
    console.log('\n✅ DONE! You can now login with:');
    console.log('   Email: admin@test.com');
    console.log('   Password: 123456\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sql.end();
  }
}

fixAdminNow();
