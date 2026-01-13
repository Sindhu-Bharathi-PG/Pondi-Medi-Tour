require('dotenv').config();
const postgres = require('postgres');

async function checkColumns() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    try {
        const columns = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'hospital_details';
        `;
        console.log("Existing columns in hospital_details:");
        columns.forEach(c => console.log(`- ${c.column_name} (${c.data_type})`));
    } catch (err) {
        console.error(err);
    } finally {
        await sql.end();
    }
}
checkColumns();
