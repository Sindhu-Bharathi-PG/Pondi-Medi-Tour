require('dotenv').config({ path: './backend/.env' });
const postgres = require('postgres');

async function verifyPackageQuote() {
    const sql = postgres(process.env.DATABASE_URL);
    
    try {
        console.log('🔍 Checking package quote for Manakula Vinayakar Hospital...\n');
        
        // 1. Find the hospital
        const hospitals = await sql`
            SELECT id, name, slug 
            FROM hospital_details 
            WHERE name ILIKE '%manakula%vinayakar%'
        `;
        
        if (hospitals.length === 0) {
            console.log('❌ Hospital not found in database');
            console.log('Searching for similar names...\n');
            
            const allHospitals = await sql`
                SELECT id, name 
                FROM hospital_details 
                LIMIT 10
            `;
            
            console.log('Available hospitals:');
            allHospitals.forEach(h => {
                console.log(`  - ID: ${h.id}, Name: ${h.name}`);
            });
            
            await sql.end();
            return;
        }
        
        const hospital = hospitals[0];
        console.log(`✅ Found Hospital:`);
        console.log(`   ID: ${hospital.id}`);
        console.log(`   Name: ${hospital.name}`);
        console.log(`   Slug: ${hospital.slug}\n`);
        
        // 2. Check for inquiries for this hospital
        const inquiries = await sql`
            SELECT id, "patientName", email, "treatmentType", "packageName", 
                   "hospitalId", status, priority, "createdAt"
            FROM inquiries 
            WHERE "hospitalId" = ${hospital.id}
            ORDER BY "createdAt" DESC
            LIMIT 10
        `;
        
        console.log(`📋 Inquiries for ${hospital.name}:`);
        if (inquiries.length === 0) {
            console.log('   ❌ No inquiries found for this hospital\n');
        } else {
            console.log(`   ✅ Found ${inquiries.length} inquiries:\n`);
            inquiries.forEach((inq, i) => {
                console.log(`   ${i + 1}. ID: ${inq.id}`);
                console.log(`      Patient: ${inq.patientName}`);
                console.log(`      Email: ${inq.email}`);
                console.log(`      Treatment: ${inq.treatmentType}`);
                console.log(`      Package: ${inq.packageName || 'N/A'}`);
                console.log(`      Status: ${inq.status}`);
                console.log(`      Priority: ${inq.priority}`);
                console.log(`      Created: ${inq.createdAt}`);
                console.log('');
            });
        }
        
        // 3. Check for inquiries with packageName (package quotes)
        const packageInquiries = await sql`
            SELECT id, "patientName", "packageName", "hospitalId", "createdAt"
            FROM inquiries 
            WHERE "packageName" IS NOT NULL 
            AND "packageName" != ''
            ORDER BY "createdAt" DESC
            LIMIT 5
        `;
        
        console.log(`📦 Recent Package Quotes (all hospitals):`);
        if (packageInquiries.length === 0) {
            console.log('   ❌ No package quotes found in database\n');
        } else {
            packageInquiries.forEach((inq, i) => {
                console.log(`   ${i + 1}. Package: ${inq.packageName}`);
                console.log(`      Patient: ${inq.patientName}`);
                console.log(`      Hospital ID: ${inq.hospitalId}`);
                console.log(`      Created: ${inq.createdAt}`);
                console.log('');
            });
        }
        
        // 4. Check which user is linked to this hospital
        const users = await sql`
            SELECT id, email, name, "userType", "hospitalId"
            FROM users 
            WHERE "hospitalId" = ${hospital.id}
        `;
        
        console.log(`👤 Users linked to ${hospital.name}:`);
        if (users.length === 0) {
            console.log('   ⚠️  No users linked to this hospital!');
            console.log('   This means no one can log in as this hospital admin.\n');
        } else {
            users.forEach((user, i) => {
                console.log(`   ${i + 1}. Email: ${user.email}`);
                console.log(`      Name: ${user.name}`);
                console.log(`      Type: ${user.userType}`);
                console.log(`      User ID: ${user.id}`);
                console.log('');
            });
        }
        
        // 5. Summary
        console.log('=' .repeat(60));
        console.log('SUMMARY:');
        console.log('=' .repeat(60));
        console.log(`Hospital ID: ${hospital.id}`);
        console.log(`Hospital Name: ${hospital.name}`);
        console.log(`Inquiries for this hospital: ${inquiries.length}`);
        console.log(`Users linked to this hospital: ${users.length}`);
        console.log('\n💡 NEXT STEPS:');
        
        if (inquiries.length === 0) {
            console.log('   1. The inquiry may not have been submitted successfully');
            console.log('   2. OR the inquiry was submitted with a different hospitalId');
            console.log('   3. Check the browser console for submission errors');
            console.log('   4. Make sure backend server is running (pnpm run dev)');
        }
        
        if (users.length === 0) {
            console.log('   ⚠️  Create a hospital admin user for this hospital first!');
        } else {
            console.log(`   ✅ Log in with: ${users[0].email}`);
            console.log('   Then navigate to: /dashboard/hospital/inquiries');
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await sql.end();
    }
}

verifyPackageQuote();
