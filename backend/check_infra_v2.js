require('dotenv').config();
const postgres = require('postgres');

async function checkInfra() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        const result = await sql`
            SELECT id, infrastructure
            FROM hospital_details 
            WHERE name = 'Sri Manakula Vinayagar Medical College and Hospital'
        `;

        if (result.length > 0) {
            console.log("\n--- Infrastructure ---");
            console.log(JSON.stringify(result[0].infrastructure, null, 2));
        }

    } catch (err) {
        console.error("Query failed:", err.message);
    } finally {
        await sql.end();
    }
}

checkInfra();
