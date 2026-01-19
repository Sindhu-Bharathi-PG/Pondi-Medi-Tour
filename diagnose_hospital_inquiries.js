require('dotenv').config({ path: './backend/.env' });
const postgres = require('postgres');

async function diagnoseHospitalInquiries() {
    const sql = postgres(process.env.DATABASE_URL);
    
    try {
        console.log('🔍 HOSPITAL INQUIRIES DIAGNOSTIC\n');
        console.log('=' .repeat(60));
        
        // 1. Check users table for hospital users
        console.log('\n1️⃣ Checking hospital users...\n');
        const hospitalUsers = await sql`
            SELECT id, email, name, "userType", "hospitalId"
            FROM users 
            WHERE "userType" = 'hospital'
            ORDER BY id
        `;
        
        if (hospitalUsers.length === 0) {
            console.log('❌ No hospital users found!');
            console.log('   Create a hospital user first.\n');
        } else {
            console.log(`✅ Found ${hospitalUsers.length} hospital user(s):\n`);
            hospitalUsers.forEach(user => {
                console.log(`   • User ID: ${user.id}`);
                console.log(`     Email: ${user.email}`);
                console.log(`     Name: ${user.name}`);
                console.log(`     Hospital ID: ${user.hospitalId || '❌ NOT LINKED'}`);
                console.log('');
            });
        }
        
        // 2. Check hospital_details table
        console.log('2️⃣ Checking hospitals in database...\n');
        const hospitals = await sql`
            SELECT id, name, slug
            FROM hospital_details
            ORDER BY id
            LIMIT 5
        `;
        
        if (hospitals.length === 0) {
            console.log('❌ No hospitals found in database!\n');
        } else {
            console.log(`✅ Found ${hospitals.length} hospital(s):\n`);
            hospitals.forEach(h => {
                console.log(`   • Hospital ID: ${h.id}`);
                console.log(`     Name: ${h.name}`);
                console.log(`     Slug: ${h.slug}`);
                console.log('');
            });
        }
        
        // 3. Check inquiries table
        console.log('3️⃣ Checking inquiries...\n');
        const allInquiries = await sql`
            SELECT id, "patientName", "hospitalId", "packageName", "createdAt"
            FROM inquiries
            ORDER BY "createdAt" DESC
            LIMIT 10
        `;
        
        if (allInquiries.length === 0) {
            console.log('❌ No inquiries found in database!\n');
        } else {
            console.log(`✅ Found ${allInquiries.length} recent inquiries:\n`);
            allInquiries.forEach(inq => {
                console.log(`   • Inquiry ID: ${inq.id}`);
                console.log(`     Patient: ${inq.patientName}`);
                console.log(`     Hospital ID: ${inq.hospitalId || 'NULL'}`);
                console.log(`     Package: ${inq.packageName || 'N/A'}`);
                console.log(`     Created: ${new Date(inq.createdAt).toLocaleString()}`);
                console.log('');
            });
        }
        
        // 4. Cross-reference: For each hospital user, show their inquiries
        console.log('4️⃣ Matching hospital users to inquiries...\n');
        for (const user of hospitalUsers) {
            if (!user.hospitalId) {
                console.log(`   ⚠️  User "${user.email}" has NO hospital linked!`);
                console.log(`      This user won't see any inquiries.\n`);
                continue;
            }
            
            const userInquiries = await sql`
                SELECT COUNT(*) as count
                FROM inquiries
                WHERE "hospitalId" = ${user.hospitalId}
            `;
            
            const count = parseInt(userInquiries[0].count);
            console.log(`   ${count > 0 ? '✅' : '⚠️ '} User "${user.email}" (Hospital ID: ${user.hospitalId})`);
            console.log(`      Has ${count} inquiry(ies)\n`);
        }
        
        // 5. Summary and recommendations
        console.log('=' .repeat(60));
        console.log('📋 SUMMARY & RECOMMENDATIONS:\n');
        
        const usersWithoutHospital = hospitalUsers.filter(u => !u.hospitalId);
        const inquiriesWithoutHospital = allInquiries.filter(i => !i.hospitalId);
        
        if (usersWithoutHospital.length > 0) {
            console.log('⚠️  ISSUE: Hospital users without hospital linkage');
            console.log('   Users affected:', usersWithoutHospital.map(u => u.email).join(', '));
            console.log('   FIX: Run this SQL to link them:');
            console.log('');
            usersWithoutHospital.forEach(user => {
                if (hospitals.length > 0) {
                    console.log(`   UPDATE users SET "hospitalId" = ${hospitals[0].id} WHERE id = ${user.id};`);
                }
            });
            console.log('');
        }
        
        if (inquiriesWithoutHospital.length > 0) {
            console.log('⚠️  ISSUE: Inquiries without hospital assignment');
            console.log(`   ${inquiriesWithoutHospital.length} inquiries have NULL hospitalId`);
            console.log('   These won\'t show up in any hospital dashboard\n');
        }
        
        if (hospitalUsers.length > 0 && hospitalUsers.every(u => u.hospitalId)) {
            console.log('✅ All hospital users have hospital linkages\n');
        }
        
        if (allInquiries.length > 0 && allInquiries.every(i => i.hospitalId)) {
            console.log('✅ All inquiries are properly assigned to hospitals\n');
        }
        
        console.log('=' .repeat(60));
        
    } catch (error) {
        console.error('❌ Error running diagnostic:', error);
    } finally {
        await sql.end();
    }
}

diagnoseHospitalInquiries();
