const fs = require('fs');
const path = require('path');
const postgres = require('postgres');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function runSQL() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log('📊 Reading SQL file...');
    const sqlContent = fs.readFileSync(path.join(__dirname, 'create_users_table.sql'), 'utf8');
    
    console.log('⚡ Executing SQL...');
    await sql.unsafe(sqlContent);
    
    console.log('✅ Users table created successfully!');
    console.log('\n📋 Test users:');
    console.log('   • hospital@test.com (password: password123)');
    console.log('   • admin@test.com (password: password123)');
    console.log('   • superadmin@test.com (password: password123)');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sql.end();
  }
}

runSQL();
