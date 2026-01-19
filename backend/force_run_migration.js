
require('dotenv').config();
const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;

async function runMigration() {
    console.log("FORCE RUNNING MIGRATION NOW...");
    const sql = postgres(connectionString, { ssl: 'require' });

    try {
        const migrationPath = path.join(__dirname, 'migrations/sync_inquiries_schema.sql');
        const migrationSql = fs.readFileSync(migrationPath, 'utf8');
        
        console.log("Executing SQL...");
        // Execute the raw SQL
        await sql.unsafe(migrationSql);
        
        console.log("✅ MIGRATION SUCCESS!");
    } catch (err) {
        console.error("❌ MIGRATION FAILED:", err);
    } finally {
        await sql.end();
        console.log("DONE");
    }
}

runMigration();
