const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { eq } = require('drizzle-orm');
const db = require('../config/database');
const { users, hospitalDetails } = require('../database/schema');

async function fixLinks() {
    try {
        console.log('--- STARTING FIX ---');
        
        // 1. Get all hospital users without ID
        const hospitalUsers = await db.select().from(users)
            .where(eq(users.userType, 'hospital'));
            
        console.log(`Found ${hospitalUsers.length} hospital users.`);
        
        // 2. Get all hospitals
        const hospitals = await db.select().from(hospitalDetails);
        console.log(`Found ${hospitals.length} hospitals.`);
        
        if (hospitals.length === 0) {
            console.error('No hospitals found in DB! Cannot link.');
            process.exit(1);
        }

        // 3. Strategy: Link first user to first hospital if only 1 exists, 
        //    or try to match names/emails if possible.
        
        for (const user of hospitalUsers) {
            console.log(`Checking User: ${user.email} (Current HospitalID: ${user.hospitalId})`);
            
            if (!user.hospitalId) {
                // Try to find a hospital to link
                // For now, let's link to the FIRST hospital found if specific logic fails
                // OR specific logic: link 'apon' to 'apon'
                
                const targetHospital = hospitals[0]; // Default to first
                
                console.log(`-> Linking to Hospital: ${targetHospital.name} (ID: ${targetHospital.id})`);
                
                await db.update(users)
                    .set({ hospitalId: targetHospital.id })
                    .where(eq(users.id, user.id));
                    
                console.log('-> LINKED SUCCESSFULLY ✅');
            } else {
                console.log('-> Already linked. Skipping.');
            }
        }
        
        console.log('--- DONE ---');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

fixLinks();
