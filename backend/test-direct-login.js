const bcrypt = require('bcryptjs');
const postgres = require('postgres');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function testLogin() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log('🔐 Testing Login Credentials\n');
    
    // Get all hospital users
    const users = await sql`
      SELECT id, email, password, user_type, is_active 
      FROM users 
      WHERE user_type = 'hospital'
    `;
    
    console.log(`Found ${users.length} hospital users:\n`);
    
    const testPassword = 'password123';
    const testPassword2 = '123456';
    
    for (const user of users) {
      console.log(`\n📧 Email: ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Active: ${user.is_active}`);
      console.log(`   Hash: ${user.password.substring(0, 30)}...`);
      
      // Test password123
      const match1 = await bcrypt.compare(testPassword, user.password);
      console.log(`   ✓ Password "password123": ${match1 ? '✅ MATCH' : '❌ NO MATCH'}`);
      
      // Test 123456
      const match2 = await bcrypt.compare(testPassword2, user.password);
      console.log(`   ✓ Password "123456": ${match2 ? '✅ MATCH' : '❌ NO MATCH'}`);
      
      if (match1 || match2) {
        console.log(`\n   🎉 LOGIN WORKS WITH:`);
        console.log(`      Email: ${user.email}`);
        console.log(`      Password: ${match1 ? 'password123' : '123456'}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

testLogin();
