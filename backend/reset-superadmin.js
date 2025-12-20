const postgres = require('postgres');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL);

async function resetPassword() {
  try {
    console.log('🔄 Resetting superadmin password...');
    
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await sql`
      UPDATE users 
      SET password = ${hashedPassword},
          is_active = true
      WHERE email = 'admin@pondimeditour.com'
    `;
    
    console.log('✅ Password reset successfully to: admin123');
  } catch (error) {
    console.error('❌ Error resetting password:', error);
  } finally {
    await sql.end();
  }
}

resetPassword();
