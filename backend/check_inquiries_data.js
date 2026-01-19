
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/pondimeditour';
const client = postgres(connectionString);
const db = drizzle(client);

// Simple query to check inquiries
const fs = require('fs');
async function checkInquiries() {
    const log = (msg) => {
        console.log(msg);
        fs.appendFileSync('check_inquiries_output.txt', msg + '\n');
    };
    
    try {
        fs.writeFileSync('check_inquiries_output.txt', 'Starting check...\n');
        const result = await client`SELECT * FROM inquiries`;
        log('Total inquiries: ' + result.length);
        if (result.length > 0) {
            log('First inquiry: ' + JSON.stringify(result[0]));
        } else {
            log('No inquiries found.');
        }
        
        // Also check if we have any hospital users
        const users = await client`SELECT * FROM users WHERE user_type = 'hospital'`;
        log('Hospital users: ' + users.length);
        if (users.length > 0) {
            log('First hospital user: ' + JSON.stringify(users[0]));
            
            // Check if this user has a hospital_id
            if (users[0].hospital_id) {
                const hospitalInquiries = await client`SELECT * FROM inquiries WHERE hospital_id = ${users[0].hospital_id}`;
                log(`Inquiries for hospital ${users[0].hospital_id}: ` + hospitalInquiries.length);
            }
        }
        
    } catch (err) {
        log('Error: ' + err);
    } finally {
        await client.end();
        process.exit();
    }
}

checkInquiries();
