/**
 * List all admin users
 */
const postgres = require('postgres');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function listAdmins() {
    const sql = postgres(DATABASE_URL);
    
    try {
        const users = await sql`
            SELECT email, name, user_type 
            FROM users 
            WHERE user_type IN ('admin', 'superadmin') 
            ORDER BY user_type
        `;
        
        console.log('\n=== ADMIN / SUPERADMIN ACCOUNTS ===\n');
        
        if (users.length === 0) {
            console.log('No admin users found!');
        } else {
            users.forEach(u => {
                console.log(`${u.user_type.toUpperCase()}: ${u.email}`);
                console.log(`  Name: ${u.name || 'N/A'}`);
                console.log(`  Password: 123456`);
                console.log('');
            });
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sql.end();
    }
}

listAdmins();
