const postgres = require('postgres');
require('dotenv').config();

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = postgres(DATABASE_URL);

async function seed() {
  try {
    console.log('🌱 Starting Database Seed...');

    // 1. Hospital User
    const userId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    console.log('👤 Creating User...');
    await sql`
      INSERT INTO users (id, email, password, name, user_type, is_active, email_verified)
      VALUES (${userId}, 'apollo@example.com', '$2b$10$hashedpasswordplaceholder', 'Apollo Admin', 'hospital', true, true)
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
    `;

    // 2. Hospital Details
    console.log('🏥 Creating Hospital Profile...');
    const infrastructure = {
      totalBeds: 550,
      icuBeds: 120,
      operatingTheaters: 15,
      technologies: ["Da Vinci Xi Robot", "3 Tesla MRI"],
      amenities: ["Private Suites", "International Patient Lounge"]
    };
    
    const intlServices = {
      languages: ["English", "Arabic", "French"],
      services: ["Visa Assistance", "Airport Transfers"],
      coordinatorAvailable: true
    };

    const accreditations = [
      { name: "JCI", issuer: "Joint Commission International", year: 2023 },
      { name: "NABH", issuer: "National Accreditation Board for Hospitals", year: 2022 }
    ];

    const [hospital] = await sql`
      INSERT INTO hospital_details (
        user_id, name, slug, type, establishment_year, 
        infrastructure, international_services, accreditations,
        location, status, website
      ) VALUES (
        ${userId}, 'Apollo Specialty Hospital', 'apollo-specialty-chennai', 'Private', 1983,
        ${sql.json(infrastructure)}, ${sql.json(intlServices)}, ${sql.json(accreditations)},
        ${sql.json({ city: "Chennai", country: "India" })}, 'verified', 'https://apollohospitals.com'
      )
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `;
    
    const hospitalId = hospital.id;
    console.log(`   -> Hospital ID: ${hospitalId}`);

    // Update User with Hospital ID
    await sql`UPDATE users SET hospital_id = ${hospitalId} WHERE id = ${userId}`;

    // 3. Doctors
    console.log('👨‍⚕️ Creating Doctors...');
    const [doc1] = await sql`
      INSERT INTO doctors (
        hospital_id, name, specialty, sub_specialty, experience,
        surgeries_count, languages, is_featured
      ) VALUES (
        ${hospitalId}, 'Dr. Y. Vijayachandra Reddy', 'Cardiology', 'Interventional Cardiology', '28+ Years',
        15000, ${['English', 'Telugu']}, true
      ) RETURNING id
    `;

    const [doc2] = await sql`
      INSERT INTO doctors (
        hospital_id, name, specialty, sub_specialty, experience,
        surgeries_count, languages, is_featured
      ) VALUES (
        ${hospitalId}, 'Dr. Pruthviraj Karumuri', 'Orthopedics', 'Joint Replacement', '18+ Years',
        4000, ${['English', 'Tamil']}, true
      ) RETURNING id
    `;

    // 4. Treatments
    console.log('💊 Creating Treatments...');
    const [t1] = await sql`
      INSERT INTO treatments (
        hospital_id, name, slug, category, min_price
      ) VALUES (
        ${hospitalId}, 'CABG Surgery', 'cabg-surgery', 'Cardiology', 5500
      ) ON CONFLICT (slug) DO UPDATE SET min_price = EXCLUDED.min_price
      RETURNING id
    `;
    
    const [t2] = await sql`
      INSERT INTO treatments (
        hospital_id, name, slug, category, min_price
      ) VALUES (
        ${hospitalId}, 'Total Knee Replacement', 'total-knee-replacement', 'Orthopedics', 4000
      ) ON CONFLICT (slug) DO UPDATE SET min_price = EXCLUDED.min_price
      RETURNING id
    `;

    // 5. Packages
    console.log('📦 Creating Packages...');
    await sql`
      INSERT INTO packages (
        hospital_id, treatment_id, name, slug, category,
        price, discounted_price, duration_days, inclusions
      ) VALUES (
        ${hospitalId}, ${t2.id}, 'Premium Knee Bundle', 'premium-knee-bundle', 'Surgery Bundle',
        6500, 5999, 14,
        ${sql.json({ accommodation: "Private Suite", transport: "Airport Pickup" })}
      ) ON CONFLICT (slug) DO NOTHING
    `;

    // 6. Inquiries
    console.log('📩 Creating Inquiries...');
    await sql`
      INSERT INTO inquiries (
        hospital_id, patient_name, email, subject, message, status
      ) VALUES (
        ${hospitalId}, 'John Doe', 'john@example.com', 'Knee Surgery Cost', 'Please send quote.', 'pending'
      )
    `;

    console.log('✅ Seed Completed Successfully!');

  } catch (e) {
    console.error('❌ Seed Failed:', e);
  } finally {
    await sql.end();
  }
}

seed();
