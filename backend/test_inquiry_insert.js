/**
 * Direct test script to debug inquiry submission
 * Run: node test_inquiry_insert.js
 */
require('dotenv').config();
const postgres = require('postgres');

const DATABASE_URL = process.env.DATABASE_URL;

async function testInquiryInsert() {
    console.log('=== INQUIRY INSERTION TEST ===\n');
    
    if (!DATABASE_URL) {
        console.error('ERROR: DATABASE_URL not set in .env');
        return;
    }
    
    const sql = postgres(DATABASE_URL, { ssl: 'require' });
    
    try {
        // Step 1: Check table structure
        console.log('1. Checking inquiries table columns...');
        const columns = await sql`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'inquiries'
            ORDER BY ordinal_position
        `;
        console.log('   Columns found:', columns.length);
        columns.forEach(c => console.log(`   - ${c.column_name} (${c.data_type}, nullable: ${c.is_nullable})`));
        
        // Step 2: Check if required columns exist
        const colNames = columns.map(c => c.column_name);
        const required = ['patient_name', 'email', 'subject', 'message'];
        const missing = required.filter(r => !colNames.includes(r));
        if (missing.length > 0) {
            console.error('\n   ERROR: Missing required columns:', missing);
            return;
        }
        console.log('\n   ✓ All required columns present');
        
        // Step 3: Try a test insert
        console.log('\n2. Attempting test insert...');
        const testData = {
            patient_name: 'Test Patient ' + Date.now(),
            email: 'test@example.com',
            phone: '+1234567890',
            country: 'Test Country',
            subject: 'Test Inquiry',
            message: 'This is a test inquiry from the debug script.',
            status: 'pending'
        };
        
        console.log('   Insert data:', testData);
        
        const result = await sql`
            INSERT INTO inquiries (patient_name, email, phone, country, subject, message, status, created_at)
            VALUES (${testData.patient_name}, ${testData.email}, ${testData.phone}, ${testData.country}, ${testData.subject}, ${testData.message}, ${testData.status}, NOW())
            RETURNING id, patient_name, created_at
        `;
        
        console.log('\n   ✓ INSERT SUCCESSFUL!');
        console.log('   Created inquiry:', result[0]);
        
        // Step 4: Verify the insert
        console.log('\n3. Verifying insert...');
        const verify = await sql`SELECT COUNT(*) as count FROM inquiries`;
        console.log('   Total inquiries in database:', verify[0].count);
        
        console.log('\n=== TEST PASSED ===');
        console.log('Database can accept inquiry inserts. Issue might be in API routing.');
        
    } catch (err) {
        console.error('\n   ✗ ERROR:', err.message);
        console.error('   Full error:', err);
    } finally {
        await sql.end();
    }
}

testInquiryInsert();
