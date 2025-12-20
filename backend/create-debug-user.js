const postgres = require('postgres');
const bcrypt = require('bcryptjs');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function createDebugUser() {
  const sql = postgres(DATABASE_URL);

  try {
    console.log('--- CREATING DEBUG USER ---');
    
    // 1. Cleanup old debug user if exists
    await sql`DELETE FROM users WHERE email = 'debug@test.com'`;

    // 2. Generate Hash
    const password = 'password123';
    const hash = bcrypt.hashSync(password, 10);
    console.log(`Hash generated: ${hash}`);

    // 3. Insert New User
    const [user] = await sql`
      INSERT INTO users (
        email, password, name, user_type, is_active, email_verified
      ) VALUES (
        'debug@test.com', ${hash}, 'Debug User', 'hospital', true, true
      )
      RETURNING id, email, password
    `;
    
    console.log('✅ Debug User Created: debug@test.com');
    
    // 4. Create Hospital Profile for this user (required for some checks?)
    await sql`
        INSERT INTO hospital_details (user_id, name, slug, status)
        VALUES (${user.id}, 'Debug Hospital', 'debug-hospital', 'verified')
        ON CONFLICT DO NOTHING
    `;
    console.log('✅ Debug Hospital Profile Created');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

createDebugUser();
