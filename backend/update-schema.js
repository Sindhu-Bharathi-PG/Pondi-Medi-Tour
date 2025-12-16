require('dotenv').config();
const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function updateSchema() {
  try {
    console.log('Creating tables...');

    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        hospital_id INTEGER REFERENCES hospital_profiles(id) ON DELETE CASCADE,
        patient_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        priority VARCHAR(20) DEFAULT 'medium', 
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Created inquiries table');

    await sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        hospital_id INTEGER REFERENCES hospital_profiles(id) ON DELETE CASCADE,
        doctor_name VARCHAR(255), 
        patient_name VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL,
        time VARCHAR(50), 
        type VARCHAR(100), 
        status VARCHAR(50) DEFAULT 'scheduled', 
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Created appointments table');

    console.log('Schema updated successfully');
  } catch (error) {
    console.error('Error updating schema:', error);
  } finally {
    await sql.end();
  }
}

updateSchema();
