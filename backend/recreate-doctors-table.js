const postgres = require('postgres');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function recreateDoctorsTable() {
  const sql = postgres(DATABASE_URL, { ssl: 'require' });
  
  try {
    console.log('🔄 Starting doctors table recreation...\n');
    
    // Drop existing table
    console.log('1️⃣ Dropping existing doctors table...');
    await sql`DROP TABLE IF EXISTS doctors CASCADE`;
    console.log('✅ Existing table dropped\n');
    
    // Create new table
    console.log('2️⃣ Creating new doctors table with enhanced schema...');
    await sql`
      CREATE TABLE doctors (
        id SERIAL PRIMARY KEY,
        hospital_id INTEGER REFERENCES hospital_details(id) ON DELETE CASCADE,
        
        -- Basic Info
        name TEXT NOT NULL,
        specialty TEXT NOT NULL,
        sub_specialty TEXT,
        credentials TEXT,
        experience TEXT,
        image_url TEXT,
        bio TEXT,
        
        -- Metrics
        surgeries_count INTEGER DEFAULT 0,
        publications_count INTEGER DEFAULT 0,
        rating DECIMAL(3,2) DEFAULT 0.0,
        reviews_count INTEGER DEFAULT 0,
        
        -- Languages & Availability
        languages TEXT[],
        consultation_timings TEXT,
        is_available BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        
        -- Credentials (JSONB for structured data)
        education JSONB,
        expertise TEXT[],
        international_training TEXT[],
        awards TEXT[],
        
        -- Service Linking
        service_slug TEXT,
        
        -- Timestamps
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ New table created\n');
    
    // Create indexes
    console.log('3️⃣ Creating indexes...');
    await sql`CREATE INDEX idx_doctors_hospital_id ON doctors(hospital_id)`;
    await sql`CREATE INDEX idx_doctors_specialty ON doctors(specialty)`;
    await sql`CREATE INDEX idx_doctors_service_slug ON doctors(service_slug)`;
    await sql`CREATE INDEX idx_doctors_is_featured ON doctors(is_featured) WHERE is_featured = true`;
    await sql`CREATE INDEX idx_doctors_is_available ON doctors(is_available) WHERE is_available = true`;
    console.log('✅ Indexes created\n');
    
    // Create trigger for updated_at
    console.log('4️⃣ Creating update trigger...');
    await sql`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ language 'plpgsql'
    `;
    await sql`
      CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
    `;
    console.log('✅ Trigger created\n');
    
    // Insert sample data
    console.log('5️⃣ Inserting sample doctor...');
    await sql`
      INSERT INTO doctors (
        hospital_id, name, specialty, sub_specialty, credentials, experience, image_url, bio,
        surgeries_count, publications_count, rating, reviews_count,
        languages, consultation_timings, is_available, is_featured,
        education, expertise, international_training, awards, service_slug
      ) VALUES (
        1,
        'Dr. V. Veerappan',
        'Orthopedics',
        'Spine & Joint Replacement',
        'MBBS, MS (Orthopaedics), FRCS (Glasgow)',
        '31+ years',
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800',
        'Dr. V. Veerappan is a pioneer in minimally invasive spine surgery with over three decades of experience. He has performed over 5,000 successful surgeries and is known for his expertise in complex joint replacements and revision surgeries.',
        5000,
        45,
        4.9,
        450,
        ARRAY['English', 'Tamil', 'Hindi'],
        'Mon-Sat: 9:00 AM - 1:00 PM, 4:00 PM - 7:00 PM',
        true,
        true,
        '[
          {"degree": "MBBS", "institution": "Madras Medical College", "year": "1990"},
          {"degree": "MS Orthopaedics", "institution": "CMC Vellore", "year": "1994"},
          {"degree": "FRCS", "institution": "Royal College, Glasgow, UK", "year": "1998"}
        ]'::jsonb,
        ARRAY['Total Knee Replacement', 'Hip Replacement Surgery', 'Spine Surgery', 'Revision Joint Surgery', 'Sports Medicine', 'Arthroscopic Surgery'],
        ARRAY['UK', 'USA', 'Germany'],
        ARRAY['Best Orthopedic Surgeon Award - 2019', 'Excellence in Spine Surgery - 2017', 'Distinguished Alumni Award - CMC Vellore'],
        'orthopedics'
      )
    `;
    console.log('✅ Sample doctor inserted\n');
    
    console.log('🎉 SUCCESS! Doctors table recreated successfully!\n');
    console.log('Summary:');
    console.log('- Old table dropped');
    console.log('- New enhanced schema created');
    console.log('- 5 indexes added for performance');
    console.log('- Auto-update trigger configured');
    console.log('- 1 sample doctor inserted');
    
  } catch (error) {
    console.error('❌ Error recreating doctors table:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

// Run if called directly
if (require.main === module) {
  recreateDoctorsTable()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { recreateDoctorsTable };
