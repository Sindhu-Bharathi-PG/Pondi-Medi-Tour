/**
 * Set passwords for hospital users
 */
const postgres = require('postgres');
const bcrypt = require('bcryptjs');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function setPasswords() {
    const sql = postgres(DATABASE_URL);
    
    try {
        // Get all hospital users
        const users = await sql`
            SELECT u.id, u.email, u.name, hd.id as hospital_id, hd.name as hospital_name 
            FROM users u 
            LEFT JOIN hospital_details hd ON u.hospital_id = hd.id
            WHERE u.user_type = 'hospital'
            ORDER BY hd.id
        `;
        
        console.log('\n=== HOSPITAL USER ACCOUNTS ===\n');
        
        // Default password for all
        const defaultPassword = '123456';
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        
        for (const user of users) {
            // Update password
            await sql`
                UPDATE users 
                SET password = ${hashedPassword}
                WHERE id = ${user.id}
            `;
            
            console.log(`Hospital: ${user.hospital_name || 'N/A'} (ID: ${user.hospital_id || 'N/A'})`);
            console.log(`  Email: ${user.email}`);
            console.log(`  Password: ${defaultPassword}`);
            console.log('');
        }
        
        console.log('✅ All passwords updated to: 123456\n');
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sql.end();
    }
}

setPasswords();
