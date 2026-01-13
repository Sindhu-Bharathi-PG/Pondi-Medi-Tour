const postgres = require('postgres');
const bcrypt = require('bcryptjs');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function resetAdminPassword() {
    const sql = postgres(DATABASE_URL, { ssl: 'require' });
    
    try {
        // Generate fresh hash with bcryptjs (same library used by server)
        const password = 'admin123';
        const hash = await bcrypt.hash(password, 12);
        
        console.log('🔄 Resetting admin passwords...');
        console.log('New hash:', hash);
        
        // Update all admin accounts
        const result = await sql`
            UPDATE users 
            SET password = ${hash}
            WHERE user_type IN ('admin', 'superadmin', 'hospital')
            RETURNING email, user_type
        `;
        
        console.log('\n✅ Updated passwords for:');
        result.forEach(u => console.log(`  - ${u.email} (${u.user_type})`));
        
        console.log('\n📝 Login with:');
        console.log('   Password: admin123');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await sql.end();
    }
}

resetAdminPassword();
