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

async function checkUser() {
    try {
        const targetEmail = 'hospital@svmchrc.ac.in';
        const targetHospitalId = 4;
        const targetName = 'Sri Venkateshwaraa Admin';
        
        console.log(`Checking for user ${targetEmail}...`);
        const user = await db.select().from(users).where(eq(users.email, targetEmail));
        
        if (user.length === 0) {
            console.log("User NOT FOUND.");
            
            // Create the user if missing
            console.log("Creating user...");
            const hashedPassword = await bcrypt.hash('123456', 10);
            const newUser = {
                email: targetEmail,
                password: hashedPassword,
                name: targetName,
                role: 'hospital_admin',
                userType: 'hospital',
                hospitalId: targetHospitalId,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            const [created] = await db.insert(users).values(newUser).returning();
            console.log("User created:", created);
        } else {
            console.log("User FOUND:", user[0].email, "ID:", user[0].id, "HospitalID:", user[0].hospitalId);
            
            const updates = {
                password: await bcrypt.hash('123456', 10)
            };
            
            // Ensure hospital ID linkage is correct
            if (user[0].hospitalId !== targetHospitalId) {
                console.log(`Correcting Hospital ID from ${user[0].hospitalId} to ${targetHospitalId}...`);
                updates.hospitalId = targetHospitalId;
            }
            
            console.log("Resetting password to 123456...");
            await db.update(users).set(updates).where(eq(users.email, targetEmail));
            console.log("Update successful.");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        console.log("Done.");
        process.exit(0);
    }
}

checkUser();
