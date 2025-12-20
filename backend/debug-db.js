const { eq } = require('drizzle-orm');
const db = require('./src/config/database');
const { users, hospitalDetails, doctors, treatments, packages, inquiries } = require('./src/database/schema');

async function debugData() {
  console.log('=== DEBUG: Checking Database Contents ===\n');

  try {
    // 1. Check users
    console.log('--- USERS ---');
    const allUsers = await db.select().from(users);
    console.log(`Total users: ${allUsers.length}`);
    allUsers.forEach(u => {
      console.log(`  - ${u.email} | Type: ${u.userType} | HospitalID: ${u.hospitalId}`);
    });

    // 2. Check hospital_details
    console.log('\n--- HOSPITAL_DETAILS ---');
    const allHospitals = await db.select().from(hospitalDetails);
    console.log(`Total hospitals: ${allHospitals.length}`);
    allHospitals.forEach(h => {
      console.log(`  - ID: ${h.id} | Name: ${h.name} | Status: ${h.status} | UserID: ${h.userId}`);
    });

    // 3. Check doctors
    console.log('\n--- DOCTORS ---');
    const allDoctors = await db.select().from(doctors);
    console.log(`Total doctors: ${allDoctors.length}`);
    allDoctors.forEach(d => {
      console.log(`  - ${d.name} | Specialty: ${d.specialty} | HospitalID: ${d.hospitalId}`);
    });

    // 4. Check treatments
    console.log('\n--- TREATMENTS ---');
    const allTreatments = await db.select().from(treatments);
    console.log(`Total treatments: ${allTreatments.length}`);
    allTreatments.forEach(t => {
      console.log(`  - ${t.name} | Category: ${t.category} | HospitalID: ${t.hospitalId}`);
    });

    // 5. Check packages
    console.log('\n--- PACKAGES ---');
    const allPackages = await db.select().from(packages);
    console.log(`Total packages: ${allPackages.length}`);
    allPackages.forEach(p => {
      console.log(`  - ${p.name} | Price: ${p.price} | HospitalID: ${p.hospitalId}`);
    });

    // 6. Check inquiries
    console.log('\n--- INQUIRIES ---');
    const allInquiries = await db.select().from(inquiries);
    console.log(`Total inquiries: ${allInquiries.length}`);
    allInquiries.forEach(i => {
      console.log(`  - ${i.patientName} | Status: ${i.status} | HospitalID: ${i.hospitalId}`);
    });

    console.log('\n=== DEBUG COMPLETE ===');
    
  } catch (error) {
    console.error('Error:', error);
  }
  
  process.exit(0);
}

debugData();
