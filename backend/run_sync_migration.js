
require('dotenv').config();
const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;

async function runMigration() {
    console.log("Running migration: sync_inquiries_schema.sql");
    const sql = postgres(connectionString, { ssl: 'require' });

    try {
        const migrationPath = path.join(__dirname, 'migrations/sync_inquiries_schema.sql');
        const migrationSql = fs.readFileSync(migrationPath, 'utf8');
        
        // Execute the raw SQL
        await sql.unsafe(migrationSql);
        
        console.log("✅ Migration applied successfully!");
    } catch (err) {
        console.error("❌ Migration Failed:", err);
    } finally {
        await sql.end();
        process.exit();
    }
}

runMigration();
