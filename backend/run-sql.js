const fs = require('fs');
const path = require('path');
const postgres = require('postgres');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function runSQL() {
  const sql = postgres(DATABASE_URL);
  
  const files = [
    'create_users_table.sql',
    'create-hospital-details-table.sql',
    'create-doctors-table.sql',
    'create-treatments-table.sql',
    'create-packages-table.sql',
    'create-inquiries-table.sql'
  ];

  try {
    console.log('🚀 Starting Database Setup...');

    for (const file of files) {
        console.log(`\n📄 Processing ${file}...`);
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            const sqlContent = fs.readFileSync(filePath, 'utf8');
            await sql.unsafe(sqlContent);
            console.log(`✅ Executed ${file}`);
        } else {
            console.error(`❌ File not found: ${file}`);
        }
    }

    // Add Circular Foreign Key Constraint
    console.log('\n🔗 Adding Circular FK Constraint (Users -> Hospital Details)...');
    try {
        await sql`ALTER TABLE users ADD CONSTRAINT fk_users_hospital FOREIGN KEY (hospital_id) REFERENCES hospital_details(id)`;
        console.log('✅ Constraint added successfully.');
    } catch (e) {
        // Ignore if exists
        console.log('ℹ️ Constraint might already exist:', e.message);
    }
    
    console.log('\n✨ Database Schema Updated Successfully!');
    console.log('   - Tables Recreated');
    console.log('   - Please run "npm run seed" to populate data.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

runSQL();
