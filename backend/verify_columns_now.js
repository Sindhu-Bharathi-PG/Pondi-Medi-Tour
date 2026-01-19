
const postgres = require('postgres');
require('dotenv').config();

async function checkColumns() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    try {
        const result = await sql`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'inquiries'
        `;
        const columns = result.map(r => r.column_name);
        console.log('Current Columns:', columns.sort());
        
        const expected = ['inquiry_type', 'package_id', 'source_page', 'assigned_to', 'source', 'referrer_url', 'ip_address', 'priority', 'tags', 'responded_at', 'response_notes', 'treatment_type', 'package_name'];
        const missing = expected.filter(c => !columns.includes(c));
        
        if (missing.length > 0) {
            console.log('Check Failed. Missing columns:', missing);
        } else {
            console.log('✓ All expected columns present.');
        }

    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}
checkColumns();
