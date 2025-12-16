const postgres = require('postgres');

// Using the same URL that finally worked for the backend
const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function forceResetPassword() {
  const sql = postgres(DATABASE_URL, { ssl: 'require' });
  
  try {
    console.log('🔄 Force resetting password for hospital@test.com...');
    
    // This is the hash for "123456" (bcrypt cost 10)
    // Generated via: bcrypt.hashSync("123456", 10)
    const newHash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
    
    await sql`
      UPDATE users 
      SET password = ${newHash}
      WHERE email = 'hospital@test.com'
    `;
    
    console.log('✅ Password updated to "123456"');
    
    // Also update others just in case
    await sql`
      UPDATE users 
      SET password = ${newHash}
      WHERE email IN ('admin@test.com', 'superadmin@test.com')
    `;
    console.log('✅ Admin passwords also updated');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

forceResetPassword();
