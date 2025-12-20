const postgres = require('postgres');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function checkDB() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log('🔍 Verifying Data Seeding...');
    
    const hospitals = await sql`SELECT count(*) FROM hospital_details`;
    const doctors = await sql`SELECT count(*) FROM doctors`;
    const treatments = await sql`SELECT count(*) FROM treatments`;
    const packages = await sql`SELECT count(*) FROM packages`;
    const inquiries = await sql`SELECT count(*) FROM inquiries`;
    const users = await sql`SELECT count(*) FROM users`;

    console.log('\n📊 Row Counts:');
    console.log(`   🏥 Hospitals: ${hospitals[0].count}`);
    console.log(`   👨‍⚕️ Doctors:   ${doctors[0].count}`);
    console.log(`   💊 Treatments: ${treatments[0].count}`);
    console.log(`   📦 Packages:   ${packages[0].count}`);
    console.log(`   📩 Inquiries:  ${inquiries[0].count}`);
    console.log(`   busts Users:      ${users[0].count}`);

    if (parseInt(hospitals[0].count) > 0) {
        console.log('\n✅ Verification PASSED: Data exists.');
    } else {
        console.log('\n❌ Verification FAILED: Database appears empty.');
    }

  } catch (error) {
    console.error('❌ Error checking DB:', error);
  } finally {
    await sql.end();
  }
}

checkDB();
