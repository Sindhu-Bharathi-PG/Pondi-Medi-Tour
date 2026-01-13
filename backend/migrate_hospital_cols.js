require('dotenv').config();
const postgres = require('postgres');

async function migrate() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        console.log('Connected to database');

        // Add columns to hospital_details table
        console.log('Adding columns to hospital_details table...');
        
        await sql`
            ALTER TABLE hospital_details 
            ADD COLUMN IF NOT EXISTS beds INTEGER,
            ADD COLUMN IF NOT EXISTS patient_count JSONB DEFAULT '{}'::jsonb;
        `;

        console.log('✅ Migration successful: beds and patient_count columns added!');

    } catch (error) {
        console.error('Error running migration:', error.message);
    } finally {
        await sql.end();
    }
}

migrate();
