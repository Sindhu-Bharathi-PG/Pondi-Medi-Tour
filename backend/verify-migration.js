/**
 * Verify migration results
 */
const postgres = require('postgres');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function verify() {
    const sql = postgres(DATABASE_URL);
    
    try {
        const hospitals = await sql`SELECT COUNT(*) as count FROM hospital_details`;
        const doctors = await sql`SELECT COUNT(*) as count FROM doctors`;
        const treatments = await sql`SELECT COUNT(*) as count FROM treatments`;
        const packages = await sql`SELECT COUNT(*) as count FROM packages`;
        const users = await sql`SELECT COUNT(*) as count FROM users WHERE user_type = 'hospital'`;
        
        console.log('\n=== MIGRATED DATA COUNTS ===');
        console.log('🏥 Hospitals:', hospitals[0].count);
        console.log('👨‍⚕️ Doctors:', doctors[0].count);
        console.log('💊 Treatments:', treatments[0].count);
        console.log('📦 Packages:', packages[0].count);
        console.log('👤 Hospital Users:', users[0].count);
        console.log('============================\n');
        
        // Show hospital names
        const hospitalNames = await sql`SELECT id, name, slug FROM hospital_details ORDER BY id`;
        console.log('Hospital List:');
        hospitalNames.forEach(h => console.log(`  - ID ${h.id}: ${h.name}`));
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sql.end();
    }
}

verify();
