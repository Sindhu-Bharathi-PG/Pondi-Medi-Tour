/**
 * Reset admin passwords
 */
const postgres = require('postgres');
const bcrypt = require('bcryptjs');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function resetAdminPasswords() {
    const sql = postgres(DATABASE_URL);
    
    try {
        const password = '123456';
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Update all admin and superadmin passwords
        const result = await sql`
            UPDATE users 
            SET password = ${hashedPassword}
            WHERE user_type IN ('admin', 'superadmin')
            RETURNING email, user_type
        `;
        
        console.log('\n=== ADMIN PASSWORDS RESET ===\n');
        result.forEach(u => {
            console.log(`${u.user_type.toUpperCase()}: ${u.email}`);
            console.log(`  Password: ${password}\n`);
        });
        
        console.log('✅ All admin passwords set to: 123456\n');
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sql.end();
    }
}

resetAdminPasswords();
