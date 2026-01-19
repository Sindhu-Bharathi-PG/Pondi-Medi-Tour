
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/pondimeditour';
const client = postgres(connectionString);
const db = drizzle(client);

// Helper for writing logs to file
const fs = require('fs');
const crypto = require('crypto');
const logFile = 'seed_inquiries_result.txt';
function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

async function seedInquiries() {
    try {
        fs.writeFileSync(logFile, 'Starting seed process...\n');
        
        // 1. Get a hospital
        const resultHospitals = await client`SELECT * FROM hospital_details LIMIT 1`;
        if (resultHospitals.length === 0) {
            log('No hospitals found! Please run main seeder first.');
            return;
        }
        const hospital = resultHospitals[0];
        log(`Using Hospital: ${hospital.name} (ID: ${hospital.id})`);

        // 2. Get a hospital user
        let users = await client`SELECT * FROM users WHERE user_type = 'hospital' LIMIT 1`;
        let user;
        
        if (users.length === 0) {
            log('No hospital user found. Creating one...');
            // Create a user
            const userId = crypto.randomUUID();
            const email = 'hospital@test.com';
            
            // Password hash for 'password123' (bcrypt) - just a dummy for now or reused
            const hash = '$2a$12$JDjE3wN/x.O7hO2.T7uPoevF7x1g5e3u5.J1g5e3u5.J1g5e3u5'; 

            users = await client`INSERT INTO users (email, password, user_type, name) 
                                VALUES (${email}, ${hash}, 'hospital', 'Hospital Admin') 
                                RETURNING *`;
            user = users[0];
        } else {
            user = users[0];
        }
        
        log(`Using User: ${user.email} (ID: ${user.id})`);

        // 3. Link user to hospital
        if (user.hospital_id !== hospital.id) {
            log('Linking user to hospital...');
            await client`UPDATE users SET hospital_id = ${hospital.id} WHERE id = ${user.id}`;
            log('Linked successfully.');
        } else {
            log('User already linked to hospital.');
        }

        // 4. Create Inquiries
        log('Creating inquiries...');
        
        const inquiriesData = [
            {
                hospital_id: hospital.id,
                patient_name: 'John Test',
                email: 'john@test.com',
                subject: 'Knee Surgery Inquiry',
                message: 'I need details about knee surgery costs.',
                status: 'pending',
                priority: 'high',
                created_at: new Date()
            },
            {
                hospital_id: hospital.id,
                patient_name: 'Sarah Sample',
                email: 'sarah@sample.com',
                subject: 'Dental Implants',
                message: 'How much for full mouth implants?',
                status: 'responded',
                priority: 'normal',
                created_at: new Date(Date.now() - 86400000)
            },
             {
                hospital_id: hospital.id,
                patient_name: 'Mike Mock',
                email: 'mike@mock.com',
                subject: 'Cardiology Checkup',
                message: 'Do you offer heart check packages?',
                status: 'pending',
                priority: 'urgent',
                created_at: new Date(Date.now() - 172800000)
            }
        ];

        for (const data of inquiriesData) {
            await client`INSERT INTO inquiries ${client(data)}`;
        }
        
        log(`Inserted ${inquiriesData.length} inquiries.`);
        
        // Login info
        log(`\nLOGIN CREDENTIALS:`);
        log(`Email: ${user.email}`);
        log(`(Use existing password if known, otherwise reset it)`);

    } catch (err) {
        log('ERROR: ' + err);
        log(err.stack);
    } finally {
        await client.end();
        process.exit();
    }
}

seedInquiries();
