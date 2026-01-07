const postgres = require('postgres');
const bcrypt = require('bcryptjs');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function forceReset() {
    console.log('Connecting to database...');
    // Add connection timeout
    const sql = postgres(DATABASE_URL, {
        connect_timeout: 10,
        idle_timeout: 10
    });

    try {
        console.log('Generating hash...');
        const hashedPassword = await bcrypt.hash('123456', 10);
        
        console.log('Updating passwords...');
        const result = await sql`
            UPDATE users 
            SET password = ${hashedPassword}
            WHERE user_type IN ('admin', 'superadmin')
            RETURNING email, user_type
        `;

        if (result.length > 0) {
            console.log('✅ Success! Updated users:', result.map(u => u.email).join(', '));
        } else {
            console.log('⚠️ No admin users found to update.');
        }

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        console.log('Closing connection...');
        await sql.end();
        console.log('Done.');
        process.exit(0);
    }
}

forceReset();
