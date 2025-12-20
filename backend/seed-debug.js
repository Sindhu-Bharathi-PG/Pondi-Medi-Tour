const postgres = require('postgres');
const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function seedDebug() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log('🧪 Starting Granular Seeding...');

    // 1. User
    const userId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'; // New ID to avoid conflict
    console.log(`👤 Inserting User ${userId}...`);
    try {
        await sql`
            INSERT INTO users (id, email, password, name, user_type, is_active, email_verified)
            VALUES (${userId}, 'apollo.test@example.com', 'hash', 'Apollo Test', 'hospital', true, true)
            ON CONFLICT (email) DO NOTHING
        `;
        console.log('✅ User inserted/exists.');
    } catch (e) {
        console.error('❌ User Insert Failed:', e.message);
    }

    // 2. Hospital
    console.log('🏥 Inserting Hospital...');
    let hospitalId;
    try {
        const result = await sql`
            INSERT INTO hospital_details (
                user_id, name, slug, type, establishment_year, status,
                infrastructure, international_services, location -- Simplified for debug
            ) VALUES (
                ${userId}, 
                'Apollo Specialty Test', 
                'apollo-test-new', 
                'Private', 
                1990, 
                'verified',
                '{}'::jsonb, 
                '{}'::jsonb, 
                '{}'::jsonb
            ) RETURNING id
        `;
        hospitalId = result[0].id;
        console.log(`✅ Hospital Inserted ID: ${hospitalId}`);
    } catch (e) {
        console.error('❌ Hospital Insert Failed:', e.message);
        throw e; // Stop if hospital fails
    }

    // 3. Treatment
    console.log('💊 Inserting Treatment...');
    try {
        await sql`
            INSERT INTO treatments (hospital_id, name, min_price)
            VALUES (${hospitalId}, 'Test Treatment', 1000)
        `;
        console.log('✅ Treatment Inserted.');
    } catch (e) {
        console.error('❌ Treatment Insert Failed:', e.message);
    }

  } catch (error) {
    console.error('❌ Critical Error:', error);
  } finally {
    await sql.end();
  }
}

seedDebug();
