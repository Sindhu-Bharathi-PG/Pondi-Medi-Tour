const bcrypt = require('bcryptjs');
const postgres = require('postgres');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function resetUserPassword() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log('🔄 resetting user password...');
    
    // Generate a fresh hash using the same library as the backend
    const password = 'password123';
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('🔑 Generated new hash for "password123"');
    
    // Update the user
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}
      WHERE email = 'hospital@test.com'
    `;
    
    console.log('✅ Password updated for hospital@test.com');
    
    // Verify it back
    const [user] = await sql`SELECT * FROM users WHERE email = 'hospital@test.com'`;
    const isValid = await bcrypt.compare(password, user.password);
    console.log('🧪 Verification check:', isValid ? 'PASSED' : 'FAILED');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

resetUserPassword();
