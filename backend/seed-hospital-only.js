const postgres = require('postgres');
require('dotenv').config();

// Direct connection string to avoid env issues
const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = postgres(DATABASE_URL);

async function seedHospitalOnly() {
  try {
    console.log('🏥 Attempting to insert ONLY Hospital Details...');

    // 1. Ensure User Exists (Dependency)
    const userId = 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'; // Unique ID for testing
    console.log(`   - Creating Owner User (${userId})...`);
    
    await sql`
      INSERT INTO users (id, email, password, name, user_type, is_active, email_verified)
      VALUES (${userId}, 'hospital.test.only@example.com', 'hash', 'Hospital Admin', 'hospital', true, true)
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
    `;

    // 2. Insert Hospital
    console.log('   - Inserting Hospital Row...');
    
    const infrastructure = {
      totalBeds: 100,
      icuBeds: 20
    };

    const result = await sql`
      INSERT INTO hospital_details (
        user_id, name, slug, type, establishment_year,
        infrastructure, status, location
      ) VALUES (
        ${userId}, 
        'Test Hospital Only', 
        'test-hospital-only', 
        'Private', 
        2024,
        ${sql.json(infrastructure)}, 
        'verified', 
        ${sql.json({ city: 'Test City' })}
      )
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
      RETURNING id, name
    `;

    console.log('✅ SUCCESS! Hospital Inserted:');
    console.log(result);

  } catch (e) {
    console.error('❌ FAILURE:', e);
  } finally {
    await sql.end();
  }
}

seedHospitalOnly();
