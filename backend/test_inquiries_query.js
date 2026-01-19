
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { eq, desc } = require('drizzle-orm');
const schema = require('./src/database/schema');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function testQuery() {
    try {
        console.log('Testing inquiries query...');
        
        // 1. Check if table exists and has data
        const rawCount = await client`SELECT COUNT(*) FROM inquiries`;
        console.log('Raw count:', rawCount[0].count);

        // 2. Try Drizzle query
        // Find a hospital ID first
        const hospitals = await db.select().from(schema.hospitalDetails).limit(1);
        if (hospitals.length === 0) {
            console.log('No hospitals found');
            return;
        }
        const hospitalId = hospitals[0].id;
        console.log('Using hospital ID:', hospitalId);

        const inquiriesList = await db.select()
            .from(schema.inquiries)
            .where(eq(schema.inquiries.hospitalId, hospitalId))
            .orderBy(desc(schema.inquiries.createdAt));
            
        console.log('Drizzle query success. Found:', inquiriesList.length);
        
    } catch (err) {
        console.error('Test Failed:', err);
    } finally {
        await client.end();
    }
}

testQuery();
