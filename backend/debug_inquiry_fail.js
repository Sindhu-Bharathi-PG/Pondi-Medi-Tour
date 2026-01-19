
require('dotenv').config();
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { eq, desc } = require('drizzle-orm');
const schema = require('./src/database/schema'); // Adjust path as needed

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error("DATABASE_URL not set");
    process.exit(1);
}

const client = postgres(connectionString, { ssl: 'require' });
const db = drizzle(client);

// Mocking the logic from hospitalManagement.js
async function debugInquiries() {
    try {
        console.log("Starting debug...");
        
        // 1. Find a user linked to a hospital
        console.log("Finding a hospital user...");
        const usersList = await db.select().from(schema.users)
            .where(eq(schema.users.userType, 'hospital'))
            .limit(1);
            
        if (usersList.length === 0) {
            console.log("No hospital user found.");
            process.exit(0);
        }
        
        const user = usersList[0];
        console.log("User found:", user.id, user.email, "HospitalID:", user.hospitalId);
        
        if (!user.hospitalId) {
            console.log("User has no hospitalId. Checking if we can link one...");
            // Mimic getHospitalIdFromUser auto-link logic logic
            const hospitals = await db.select().from(schema.hospitalDetails).limit(1);
            if (hospitals.length > 0) {
                 console.log(`Auto-linking user ${user.id} to hospital ${hospitals[0].id}`);
                 await db.update(schema.users).set({ hospitalId: hospitals[0].id }).where(eq(schema.users.id, user.id));
                 user.hospitalId = hospitals[0].id;
            } else {
                console.log("No hospitals available to link.");
                process.exit(0);
            }
        }
        
        const hospitalId = user.hospitalId;
        console.log("Using Hospital ID:", hospitalId);
        
        // 2. Run the exact query that is failing
        console.log("Running inquiry query...");
        try {
            const inquiriesList = await db.select().from(schema.inquiries)
              .where(eq(schema.inquiries.hospitalId, hospitalId))
              .orderBy(desc(schema.inquiries.createdAt));
              
            console.log("Query Success!");
            console.log(`Found ${inquiriesList.length} inquiries.`);
            if(inquiriesList.length > 0) {
                console.log("First inquiry:", inquiriesList[0]);
            }
        } catch (queryErr) {
            console.error("QUERY FAILED!");
            console.error(queryErr);
            // Log specific details if available
            if (queryErr.message) console.error("Message:", queryErr.message);
            if (queryErr.code) console.error("Code:", queryErr.code);
            if (queryErr.detail) console.error("Detail:", queryErr.detail);
        }
        
    } catch (err) {
        console.error("General Failure:", err);
    } finally {
        await client.end();
    }
}

debugInquiries();
