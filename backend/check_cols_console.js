
const postgres = require('postgres');
require('dotenv').config();

async function checkCols() {
    console.log("STARTING COLUMN CHECK...");
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    try {
        const result = await sql`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'inquiries'
        `;
        const columns = result.map(r => r.column_name);
        console.log('COLUMNS FOUND:', columns.sort().join(', '));
    } catch (err) {
        console.error("ERROR:", err);
    } finally {
        await sql.end();
        console.log("DONE");
    }
}
checkCols();
