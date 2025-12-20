const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const db = require('../config/database');
const { users, hospitalDetails, doctors } = require('../database/schema');

async function dumpData() {
    try {
        console.log('--- USERS ---');
        const allUsers = await db.select().from(users);
        allUsers.forEach(u => console.log(`User: ${u.email}, ID: ${u.id}, HospID: ${u.hospitalId}`));
        
        console.log('\n--- HOSPITALS ---');
        const allHospitals = await db.select().from(hospitalDetails);
        allHospitals.forEach(h => console.log(`Hosp: ${h.name}, ID: ${h.id}`));
        
        console.log('\n--- DOCTORS ---');
        const allDoctors = await db.select().from(doctors);
        allDoctors.forEach(d => console.log(`Doc: ${d.name} (ID: ${d.id}), HospID: ${d.hospitalId}`));
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

dumpData();
