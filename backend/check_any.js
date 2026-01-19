
require('dotenv').config();
const postgres = require('postgres');

async function checkAnyInquiries() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    try {
        const count = await sql`SELECT COUNT(*) FROM inquiries`;
        console.log(`Total Inquiries in DB: ${count[0].count}`);
        
        if (count[0].count > 0) {
            const sample = await sql`SELECT * FROM inquiries LIMIT 1`;
            console.log('Sample:', JSON.stringify(sample[0], null, 2));
        } else {
            console.log('No inquiries found.');
        }
    } catch (e) {
        console.error(e);
    } finally {
        await sql.end();
    }
}
checkAnyInquiries();
