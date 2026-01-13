require('dotenv').config();
const db = require('./src/config/database');
const { users } = require('./src/database/schema');
const { eq } = require('drizzle-orm');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const STATUS_FILE = path.resolve(__dirname, 'status.txt');

async function run() {
    try {
        const email = 'hospital@svmchrc.ac.in';
        console.log(`Deleting user ${email}...`);
        
        // 1. Delete existing user(s)
        await db.delete(users).where(eq(users.email, email));
        
        // 2. Create fresh user
        const hashedPassword = await bcrypt.hash('123456', 10);
        const newUser = {
            email: email,
            password: hashedPassword,
            name: 'Sri Venkateshwaraa Admin',
            role: 'hospital_admin',
            userType: 'hospital', 
            hospitalId: 4, 
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        console.log("Creating new user...");
        const [created] = await db.insert(users).values(newUser).returning();
        
        const msg = `SUCCESS: User recreated. ID=${created.id}, Email=${created.email}, HospitalID=${created.hospitalId}`;
        console.log(msg);
        fs.writeFileSync(STATUS_FILE, msg);
        
    } catch (e) {
        const err = `ERROR: ${e.message}`;
        console.error(err);
        fs.writeFileSync(STATUS_FILE, err);
    } finally {
        process.exit(0);
    }
}

run();
