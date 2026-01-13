require('dotenv').config();
const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = postgres(connectionString, { ssl: 'require' });

async function checkSchema() {
    try {
        const columns = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'inquiries';
        `;
        console.log('Columns in inquiries table:');
        columns.forEach(c => console.log(`- ${c.column_name}: ${c.data_type}`));
    } catch (err) {
        console.error('Check failed:', err.message);
    } finally {
        await sql.end();
        process.exit();
    }
}

checkSchema();
