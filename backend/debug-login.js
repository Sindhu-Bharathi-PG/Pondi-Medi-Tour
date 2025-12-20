const postgres = require('postgres');
const bcrypt = require('bcryptjs');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function debugLogin() {
  const sql = postgres(DATABASE_URL);

  try {
    console.log('🔍 Checking User: apollo@pondimeditour.com');
    const users = await sql`SELECT * FROM users WHERE email = 'apollo@pondimeditour.com'`;

    if (users.length === 0) {
      console.log('❌ User not found!');
      return;
    }

    const user = users[0];
    console.log('✅ User Found:', {
      id: user.id,
      email: user.email,
      user_type: user.user_type,
      is_active: user.is_active,
      email_verified: user.email_verified
    });

    console.log('🔑 Stored Hash:', user.password);

    const testPasswords = ['password123', 'admin123', 'password', 'Apollo@123', '123456'];
    let matchFound = false;

    for (const pass of testPasswords) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        console.log(`✅ MATCH FOUND! The password is: "${pass}"`);
        matchFound = true;
        break;
      }
    }

    if (!matchFound) {
      console.log('⚠️ No match found among common passwords.');
      
      // OPTIONAL: Reset password
      const newPass = 'password123';
      const newHash = await bcrypt.hash(newPass, 12);
      console.log(`\n🔄 resetting password to "${newPass}"...`);
      
      await sql`UPDATE users SET password = ${newHash} WHERE id = ${user.id}`;
      console.log('✅ Password reset successfully.');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

debugLogin();
