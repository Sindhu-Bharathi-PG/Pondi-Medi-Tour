const postgres = require('postgres');
const bcrypt = require('bcrypt');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL);

async function createAdminUser() {
    try {
        console.log('🔑 Creating admin user...');

        // Hash the password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Check if admin user already exists
        const existingUser = await sql`
            SELECT id FROM users WHERE email = 'admin@pondimeditour.com'
        `;

        if (existingUser.length > 0) {
            console.log('⚠️  Admin user already exists!');
            console.log('\n✅ Admin Credentials:');
            console.log('   Email: admin@pondimeditour.com');
            console.log('   Password: admin123');
            return;
        }

        // Create admin user
        const [user] = await sql`
            INSERT INTO users (email, password, name, user_type, is_active, email_verified)
            VALUES (
                'admin@pondimeditour.com',
                ${hashedPassword},
                'Super Admin',
                'superadmin',
                true,
                true
            )
            RETURNING id, email, name, user_type
        `;

        console.log('✅ Admin user created successfully!\n');
        console.log('📧 Email: admin@pondimeditour.com');
        console.log('🔒 Password: admin123');
        console.log('\n⚠️  Please change this password after first login!');

    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    } finally {
        await sql.end();
    }
}

createAdminUser();
