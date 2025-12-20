const fs = require('fs');
const path = require('path');
const postgres = require('postgres');

// Connection string from run-sql.js / drizzle.config.js
const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function runSeeding() {
  const sql = postgres(DATABASE_URL);

  try {
    console.log('🚀 Starting Full Seeding Process...');

    // 1. Run Fix FKs (Includes Table Rename if needed)
    console.log('\n🔧 Running Fix FKs / Table Rename...');
    const fixFksPath = path.join(__dirname, 'fix_fks.sql');
    if (fs.existsSync(fixFksPath)) {
        const fixFksContent = fs.readFileSync(fixFksPath, 'utf8');
        await sql.unsafe(fixFksContent);
        console.log('✅ Fix FKs script executed.');
    } else {
        console.error('❌ fix_fks.sql not found!');
        return;
    }

    // 2. Run Insert All Tables
    console.log('\n🌱 Running Data Seeding...');
    const insertPath = path.join(__dirname, 'insert_all_tables.sql');
    if (fs.existsSync(insertPath)) {
        const insertContent = fs.readFileSync(insertPath, 'utf8');
        await sql.unsafe(insertContent);
        console.log('✅ Data Seeding script executed.');
    } else {
        console.error('❌ insert_all_tables.sql not found!');
        return;
    }

    console.log('\n✨ Database Seeding Completed Successfully!');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await sql.end();
  }
}

runSeeding();
