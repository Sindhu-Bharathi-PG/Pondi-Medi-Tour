require('dotenv').config();
const postgres = require('postgres');

async function migrate() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        console.log('Connected to database');

        // Add columns to packages table
        console.log('Adding popularity columns to packages table...');
        
        await sql`
            ALTER TABLE packages 
            ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
            ADD COLUMN IF NOT EXISTS inquiry_count INTEGER DEFAULT 0,
            ADD COLUMN IF NOT EXISTS popularity_score INTEGER DEFAULT 0;
        `;

        console.log('✅ Migration successful: Popularity columns added to packages!');

    } catch (error) {
        console.error('Error running migration:', error.message);
    } finally {
        await sql.end();
    }
}

migrate();
