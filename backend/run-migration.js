require('dotenv').config();
const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = postgres(connectionString, { ssl: 'require' });

async function runMigration() {
    try {
        console.log('Running migration...');
        
        await sql`
            ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS inquiry_type VARCHAR(50) DEFAULT 'general';
            ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS package_id INTEGER;
            ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS source_page VARCHAR(255);
            -- Ensure assigned_to is UUID to match users table
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inquiries' AND column_name='assigned_to') THEN
                    ALTER TABLE inquiries ADD COLUMN assigned_to UUID REFERENCES users(id);
                END IF;
            END $$;
        `;
        
        console.log('Migration completed successfully');
    } catch (err) {
        console.error('Migration failed:', err.message);
    } finally {
        await sql.end();
        process.exit();
    }
}

runMigration();
