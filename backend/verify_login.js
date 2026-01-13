require('dotenv').config();
const db = require('./src/config/database');
const { users } = require('./src/database/schema');
const { eq } = require('drizzle-orm');
const bcrypt = require('bcryptjs');

// Force exit after 10 seconds
setTimeout(() => {
    console.error("Timeout reached. Exiting.");
    process.exit(1);
}, 10000);

async function verifyLogin() {
    try {
        const targetEmail = 'hospital@svmchrc.ac.in';
        console.log(`Verifying user ${targetEmail}...`);
        
        const user = await db.select().from(users).where(eq(users.email, targetEmail));
        
        if (user.length === 0) {
            console.log("❌ User NOT FOUND in database!");
        } else {
            const u = user[0];
            console.log("✅ User FOUND:");
            console.log(`   ID: ${u.id}`);
            console.log(`   Email: ${u.email}`);
            console.log(`   Role: ${u.role}`);
            console.log(`   UserType: ${u.userType}`);
            console.log(`   HospitalID: ${u.hospitalId}`);
            console.log(`   IsActive: ${u.isActive}`);
            console.log(`   Password Hash: ${u.password.substring(0, 20)}...`);
            
            console.log("Testing password '123456'...");
            const isMatch = await bcrypt.compare('123456', u.password);
            console.log(`   Password Match: ${isMatch ? "YES ✅" : "NO ❌"}`);
            
            if (!isMatch) {
                console.log("Attempting manual hash repair...");
                const newHash = await bcrypt.hash('123456', 10);
                await db.update(users).set({ password: newHash }).where(eq(users.email, targetEmail));
                console.log("   Repaired hash. Please try again.");
            }
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        console.log("Done.");
        process.exit(0);
    }
}

verifyLogin();
