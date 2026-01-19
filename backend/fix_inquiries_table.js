/**
 * Fix inquiries table - add ALL missing columns
 */
require('dotenv').config();
const postgres = require('postgres');

async function fixInquiriesTable() {
    console.log('=== FIXING INQUIRIES TABLE ===\n');
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    
    try {
        // Add each missing column one by one with IF NOT EXISTS pattern
        const alterStatements = [
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS inquiry_type VARCHAR(50) DEFAULT 'general'`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS package_id INTEGER`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS treatment_type VARCHAR(100)`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS package_name VARCHAR(255)`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'website'`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS source_page VARCHAR(255)`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS referrer_url TEXT`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45)`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'normal'`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS tags TEXT[]`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS responded_at TIMESTAMP`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS response_notes TEXT`,
            `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS assigned_to UUID`
        ];
        
        for (const stmt of alterStatements) {
            console.log('Executing:', stmt.substring(0, 60) + '...');
            await sql.unsafe(stmt);
        }
        
        console.log('\n✅ All columns added successfully!');
        
        // Verify
        const columns = await sql`
            SELECT column_name FROM information_schema.columns 
            WHERE table_name = 'inquiries'
        `;
        console.log('\nColumns now in inquiries table:');
        columns.forEach(c => console.log('  -', c.column_name));
        
        // Test insert
        console.log('\n=== TEST INSERT ===');
        const result = await sql`
            INSERT INTO inquiries (patient_name, email, subject, message, status, created_at)
            VALUES ('Fix Test', 'fix@test.com', 'Test Subject', 'Test Message', 'pending', NOW())
            RETURNING id
        `;
        console.log('✅ Test insert successful! ID:', result[0].id);
        
    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await sql.end();
    }
}

fixInquiriesTable();
