require('dotenv').config();
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { eq } = require('drizzle-orm');
const schema = require('./src/database/schema');

async function verifyData() {
    const connectionString = process.env.DATABASE_URL;
    const client = postgres(connectionString, { ssl: 'require' });
    const db = drizzle(client, { schema });

    console.log("Verifying data for: Sri Manakula Vinayagar Medical College and Hospital");

    // 1. Check Hospital Details
    const hospitals = await db.select().from(schema.hospitalDetails)
        .where(eq(schema.hospitalDetails.name, "Sri Manakula Vinayagar Medical College and Hospital"));

    if (hospitals.length === 0) {
        console.error("❌ Hospital NOT FOUND in database!");
        await client.end();
        return;
    }

    const hospital = hospitals[0];
    const hospitalId = hospital.id;

    console.log("\n✅ Hospital Found: ID", hospitalId);
    
    // Compare Basic Details
    console.log("\n--- Basic Details ---");
    console.log("Type matches:", hospital.type === "Private" ? "✅" : `❌ (Expected: Private, Found: ${hospital.type})`);
    console.log("Est. Year matches:", hospital.establishmentYear === 2004 ? "✅" : `❌ (Expected: 2004, Found: ${hospital.establishmentYear})`);
    console.log("Beds matches:", hospital.beds == 1180 ? "✅" : `❌ (Expected: 1180, Found: ${hospital.beds})`);
    
    console.log("Accreditations:", JSON.stringify(hospital.accreditations));
    console.log("Contact Email:", hospital.contact?.email);
    console.log("City:", hospital.location?.city);

    // 2. Check Doctors
    console.log("\n--- Doctors ---");
    const doctors = await db.select().from(schema.doctors).where(eq(schema.doctors.hospitalId, hospitalId));
    
    const expectedDoctors = ["Dr. SHIVAJI.P.R", "Dr. Ashida. T.S", "Dr. Vaithiswaran. A"];
    const foundDoctorNames = doctors.map(d => d.name);
    
    expectedDoctors.forEach(name => {
        const found = foundDoctorNames.some(n => n.includes(name) || name.includes(n));
        console.log(`Doctor '${name}': ${found ? "✅ Found" : "❌ NOT Found"}`);
    });
    console.log(`Total Doctors in DB: ${doctors.length}`);

    // 3. Check Treatments
    console.log("\n--- Treatments ---");
    const treatments = await db.select().from(schema.treatments).where(eq(schema.treatments.hospitalId, hospitalId));
    
    const expectedTreatments = ["TURP", "PCNL", "URSL", "coronary angiography", "PTCA", "Cardiac catheterization", "Onco Reconstruction", "Hand surgeries"];
    const foundTreatments = treatments.map(t => t.name);
    
    expectedTreatments.forEach(name => {
        const found = foundTreatments.some(t => t.toLowerCase().includes(name.toLowerCase()));
        console.log(`Treatment '${name}': ${found ? "✅ Found" : "❌ NOT Found"}`);
    });
    console.log(`Total Treatments in DB: ${treatments.length}`);

    // 4. Check Packages
    console.log("\n--- Packages ---");
    const packages = await db.select().from(schema.packages).where(eq(schema.packages.hospitalId, hospitalId));
    
    const expectedPackages = ["TURP", "PCNL", "URSL", "Coronary angiography", "Cardiac catheterization", "Percutaneous transluminal coronary angioplasty", "Device closure", "Onco Reconstruction", "Hand surgeries"];
    const foundPackages = packages.map(p => p.name);

    expectedPackages.forEach(name => {
         const found = foundPackages.some(p => p.toLowerCase().includes(name.toLowerCase()));
         console.log(`Package '${name}': ${found ? "✅ Found" : "❌ NOT Found"}`);
    });
    console.log(`Total Packages in DB: ${packages.length}`);

    // 5. Check Photos (Hospital Details usually stores logic for photos differently, sometimes in jsonb or separate table)
    // The user mentioned "photos" in the input JSON, but the table schema has `hospitalDetails.photos` in some conversations, or `hospital_images`?
    // Let's check `hospital.photos` if it exists in the schema.
    // Looking at schema.js previously, I didn't see explicit photos column in the partial view, but `hospitalDetails` usually has it. 
    // Wait, the prompt implies "check whether the same details are entered".
    // I will check `hospital.photos` (JSONB likely) or `mediaLibrary`?
    // In `schema.js`, `hospitalDetails` often has a `images` or `photos` column. Let's inspect the object from the first query result.
    
    console.log("\n--- Photos ---");
    // If photos is stored in JSON column
    if (hospital.photos) {
         console.log("Photos found in 'photos' column:", JSON.stringify(hospital.photos));
    } else {
        console.log("No 'photos' column found in hospital object");
    }

    await client.end();
}

verifyData();
