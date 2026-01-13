require('dotenv').config({ path: './backend/.env' });
const db = require('./backend/src/config/database');
const { users } = require('./backend/src/database/schema');
const { eq } = require('drizzle-orm');
const bcrypt = require('bcryptjs');

// Force exit after 10 seconds
setTimeout(() => {
    console.error("Timeout reached. Exiting.");
    process.exit(1);
}, 10000);

async function checkUser() {
    try {
        console.log("Checking for user apollo@pondimeditour.com...");
        const user = await db.select().from(users).where(eq(users.email, 'apollo@pondimeditour.com'));
        
        if (user.length === 0) {
            console.log("User NOT FOUND.");
            
            // Create the user if missing
            console.log("Creating user...");
            const hashedPassword = await bcrypt.hash('123456', 10);
            const newUser = {
                email: 'apollo@pondimeditour.com',
                password: hashedPassword,
                name: 'Apollo Admin',
                role: 'hospital_admin',
                userType: 'hospital',
                hospitalId: 1,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            const [created] = await db.insert(users).values(newUser).returning();
            console.log("User created:", created);
        } else {
            console.log("User FOUND:", user[0]);
            
            // Reset password just in case
            console.log("Resetting password to 123456...");
            const hashedPassword = await bcrypt.hash('123456', 10);
            await db.update(users).set({ password: hashedPassword }).where(eq(users.email, 'apollo@pondimeditour.com'));
            console.log("Password reset successful.");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        process.exit(0);
    }
}

checkUser();
