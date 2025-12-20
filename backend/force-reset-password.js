const postgres = require('postgres');
const bcrypt = require('bcryptjs');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function forceReset() {
  const sql = postgres(DATABASE_URL);

  try {
    console.log('🔄 resetting password for apollo@pondimeditour.com...');
    
    // Hash for "password123"
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}
      WHERE email = 'apollo@pondimeditour.com'
    `;

    console.log('✅ Password successfully reset to: password123');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

forceReset();
