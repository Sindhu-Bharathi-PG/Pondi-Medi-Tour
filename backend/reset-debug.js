const postgres = require('postgres');
const bcrypt = require('bcryptjs');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function debugReset() {
  const sql = postgres(DATABASE_URL);
  
  console.log('--- STARTING DEBUG RESET ---');

  try {
    // 1. Generate Hash
    const password = 'password123';
    console.log(`1. Generating hash for: "${password}"`);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log(`   Generated Hash: ${hash}`);

    // 2. Update DB
    console.log('2. Updating Database for user: apollo@pondimeditour.com');
    const result = await sql`
      UPDATE users 
      SET password = ${hash}
      WHERE email = 'apollo@pondimeditour.com'
      RETURNING id, email, password
    `;
    
    if (result.length === 0) {
        console.error('❌ User not found in DB! Cannot update.');
    } else {
        console.log('✅ User updated successfully.');
        console.log('   stored_hash_in_db:', result[0].password);
        
        // 3. Verify Comparison
        console.log('3. Verifying comparison...');
        const isMatch = bcrypt.compareSync(password, result[0].password);
        console.log(`   bcrypt.compare("${password}", db_hash) === ${isMatch}`);
        
        if (isMatch) {
            console.log('✅ LOGIN SHOULD WORK NOW.');
        } else {
            console.error('❌ HASH MISMATCH IMMEDIATELY AFTER SAVE. This is critical.');
        }
    }

  } catch (error) {
    console.error('❌ FATAL ERROR:', error);
  } finally {
    await sql.end();
    console.log('--- FINISHED ---');
  }
}

debugReset();
