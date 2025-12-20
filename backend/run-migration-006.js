const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL);

async function runMigration() {
  try {
    console.log('🔄 Running migration 006_add_mobile_and_2fa.sql...');
    await sql.file('migrations/006_add_mobile_and_2fa.sql');
    console.log('✅ Migration applied successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await sql.end();
  }
}

runMigration();
