require('dotenv').config();
const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function applySchema() {
  try {
    console.log('Reading schema file...');
    const schemaPath = path.join(__dirname, 'ideal_schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Applying optimal schema to database...');
    
    // We split by semicolon to run statements individually if needed, 
    // but postgres.js might handle the block. Let's try simple execution first.
    // If complex, we might need to split. ideal_schema.sql uses standard SQL.
    
    await sql.unsafe(schemaSql);
    
    console.log('✅ Schema applied successfully!');
    console.log('Tables created: users, hospital_profiles, doctors, offerings, appointments, inquiries');
    
  } catch (error) {
    console.error('❌ Error applying schema:', error);
  } finally {
    await sql.end();
  }
}

applySchema();
