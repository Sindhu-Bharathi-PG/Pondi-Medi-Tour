const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL not found!');
    process.exit(1);
}

const sql = postgres(connectionString, { ssl: 'require' });

async function createTable() {
    try {
        console.log('Creating packages table...');
        
        await sql`
            CREATE TABLE IF NOT EXISTS packages (
              id SERIAL PRIMARY KEY,
              hospital_id INTEGER REFERENCES hospital_details(id) ON DELETE CASCADE,
              treatment_id INTEGER REFERENCES treatments(id) ON DELETE SET NULL,
              
              name TEXT NOT NULL,
              slug TEXT UNIQUE,
              category TEXT NOT NULL, 
              
              price INTEGER NOT NULL,
              discounted_price INTEGER,
              currency TEXT DEFAULT 'USD',
              
              duration_days INTEGER NOT NULL,
              duration_nights INTEGER,
              
              inclusions JSONB DEFAULT '{"accommodation": null, "transport": null, "meals": null, "extraServices": []}',
              
              short_description TEXT,
              full_description TEXT,
              image_url TEXT,
              
              is_active BOOLEAN DEFAULT TRUE,
              is_featured BOOLEAN DEFAULT FALSE,
              
              created_at TIMESTAMP DEFAULT NOW(),
              updated_at TIMESTAMP DEFAULT NOW()
            );
        `;
        
        console.log('✅ Table "packages" created successfully (or already exists).');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating table:', error);
        process.exit(1);
    }
}

createTable();
