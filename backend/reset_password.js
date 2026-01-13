require('dotenv').config();
const bcrypt = require('bcryptjs');
const postgres = require('postgres');

const EMAIL = 'ms@smvmch.ac.in';
const NEW_PASSWORD = '123456';

async function resetPassword() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        console.log('Connected to database');

        // Check if user exists
        const users = await sql`
            SELECT id, email, user_type FROM users WHERE email = ${EMAIL}
        `;

        if (users.length === 0) {
            console.log(`User ${EMAIL} not found in database`);
            await sql.end();
            return;
        }

        console.log('Found user:', users[0]);

        // Hash new password
        const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10);
        console.log('New password hashed');

        // Update password
        await sql`
            UPDATE users SET password = ${hashedPassword}, updated_at = NOW() WHERE email = ${EMAIL}
        `;

        console.log(`\n✅ Password reset successful!`);
        console.log(`Email: ${EMAIL}`);
        console.log(`New Password: ${NEW_PASSWORD}`);

        await sql.end();
    } catch (error) {
        console.error('Error:', error.message);
        await sql.end();
    }
}

resetPassword();
