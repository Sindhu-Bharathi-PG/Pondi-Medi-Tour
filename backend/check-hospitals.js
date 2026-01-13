const postgres = require('postgres');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function checkHospitals() {
  const sql = postgres(DATABASE_URL, { ssl: 'require' });

  try {
    console.log('🏥 Checking existing hospitals...\n');

    const hospitals = await sql`
      SELECT id, name, status 
      FROM hospital_details 
      ORDER BY id
    `;

    console.log(`Found ${hospitals.length} hospitals:\n`);
    console.log('─'.repeat(60));
    console.log('ID  | Name                           | Status');
    console.log('─'.repeat(60));
    hospitals.forEach(h => {
      console.log(`${h.id.toString().padEnd(4)}| ${h.name.substring(0, 30).padEnd(31)}| ${h.status}`);
    });
    console.log('─'.repeat(60));

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

checkHospitals();
