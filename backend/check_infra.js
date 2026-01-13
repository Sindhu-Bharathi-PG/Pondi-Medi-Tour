require('dotenv').config();
const postgres = require('postgres');

async function checkInfrastructure() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        const result = await sql`
            SELECT infrastructure, patient_count
            FROM hospital_details 
            WHERE name = 'Sri Manakula Vinayagar Medical College and Hospital'
        `;

        if (result.length > 0) {
            console.log("\n--- Infrastructure ---");
            console.log(JSON.stringify(result[0].infrastructure, null, 2));
            console.log("\n--- Patient Count ---");
            // Check if patient_count column exists (might fail if not exists, but let's try selecting it if I missed it earlier, 
            // actually check_columns showed it wasn't there, so this query might fail if I include patient_count)
            // I'll check information_schema for patient_count first to be safe, or just try/catch
        } 

    } catch (err) {
        console.error("Query failed:", err.message);
    } finally {
        await sql.end();
    }
}

checkInfrastructure();
