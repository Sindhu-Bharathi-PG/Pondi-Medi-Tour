require('dotenv').config();
const postgres = require('postgres');

async function checkValues() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        const result = await sql`
            SELECT id, name, type, establishment_year, accreditations, location, specialized_centers
            FROM hospital_details 
            WHERE name = 'Sri Manakula Vinayagar Medical College and Hospital'
        `;

        if (result.length > 0) {
            console.log("\n--- Current Data in DB ---");
            console.log(JSON.stringify(result[0], null, 2));
        } else {
            console.log("Hospital not found.");
        }

    } catch (err) {
        console.error("Query failed:", err.message);
    } finally {
        await sql.end();
    }
}

checkValues();
