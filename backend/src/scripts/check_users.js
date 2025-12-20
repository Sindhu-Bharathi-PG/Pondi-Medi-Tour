const { eq } = require('drizzle-orm');
const db = require('../config/database');
const { users, hospitalDetails } = require('../database/schema');

async function checkUsers() {
    try {
        console.log('--- USERS ---');
        const allUsers = await db.select().from(users);
        
        for (const user of allUsers) {
            console.log(`ID: ${user.id}`);
            console.log(`Email: ${user.email}`);
            console.log(`Type: ${user.userType}`);
            console.log(`HospitalID: ${user.hospitalId}`);
            
            if (user.hospitalId) {
                const [hosp] = await db.select().from(hospitalDetails)
                    .where(eq(hospitalDetails.id, user.hospitalId));
                console.log(`-> Linked Hospital: ${hosp ? hosp.name : 'INVALID ID'}`);
            } else {
                console.log('-> NO HOSPITAL LINKED');
            }
            console.log('---');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkUsers();
