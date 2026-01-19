
require('dotenv').config();
const postgres = require('postgres');

async function checkCols() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    try {
        const cols = await sql`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'inquiries'
        `;
        console.log("ACTUAL DB COLUMNS in 'inquiries':");
        const colNames = cols.map(c => c.column_name).sort();
        console.log(JSON.stringify(colNames, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await sql.end();
    }
}
checkCols();
