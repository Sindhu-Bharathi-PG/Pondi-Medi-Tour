require('dotenv').config();
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { eq } = require('drizzle-orm');
const schema = require('./src/database/schema');

async function verifySimple() {
    const connectionString = process.env.DATABASE_URL;
    const client = postgres(connectionString, { ssl: 'require' });
    const db = drizzle(client, { schema });

    console.log("Verifying simple existence...");

    try {
        // Only select Specific columns to avoid "column does not exist" if schema mismatch
        // Using raw sql for safety
        const result = await client`SELECT id, name, type, establishment_year, beds, location, contact, description, photos FROM hospital_details WHERE name = 'Sri Manakula Vinayagar Medical College and Hospital'`;
        
        if (result.length === 0) {
            console.log("❌ Hospital NOT FOUND in database!");
        } else {
            console.log("✅ Hospital FOUND!");
            const h = result[0];
            console.log(JSON.stringify(h, null, 2));

            // Check related tables count
            const docCount = await client`SELECT count(*) FROM doctors WHERE hospital_id = ${h.id}`;
            console.log(`Doctors count: ${docCount[0].count}`);

            const treatCount = await client`SELECT count(*) FROM treatments WHERE hospital_id = ${h.id}`;
            console.log(`Treatments count: ${treatCount[0].count}`);

            const pkgCount = await client`SELECT count(*) FROM packages WHERE hospital_id = ${h.id}`;
            console.log(`Packages count: ${pkgCount[0].count}`);
        }

    } catch (err) {
        console.error("Query failed:", err.message);
    } finally {
        await client.end();
    }
}

verifySimple();
