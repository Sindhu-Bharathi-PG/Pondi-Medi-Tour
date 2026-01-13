require('dotenv').config();
const postgres = require('postgres');

async function checkCounts() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        const hospitalId = 5;
        const doctors = await sql`SELECT count(*) FROM doctors WHERE hospital_id = ${hospitalId}`;
        const treatments = await sql`SELECT count(*) FROM treatments WHERE hospital_id = ${hospitalId}`;
        const packages = await sql`SELECT count(*) FROM packages WHERE hospital_id = ${hospitalId}`;
        
        console.log(`Doctors: ${doctors[0].count}`);
        console.log(`Treatments: ${treatments[0].count}`);
        console.log(`Packages: ${packages[0].count}`);

    } catch (err) {
        console.error("Query failed:", err.message);
    } finally {
        await sql.end();
    }
}

checkCounts();
