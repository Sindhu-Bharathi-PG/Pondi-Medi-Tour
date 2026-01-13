require('dotenv').config();
const db = require('./src/config/database');
const { users } = require('./src/database/schema');
const { eq } = require('drizzle-orm');
const bcrypt = require('bcryptjs');
const http = require('http');

const TARGET_EMAIL = 'hospital@svmchrc.ac.in';
const TARGET_PASS = '123456';

async function run() {
    console.log("--- START DIAGNOSIS ---");
    console.log(`Checking DB Connection...`);
    
    // 1. Check DB User
    try {
        const user = await db.select().from(users).where(eq(users.email, TARGET_EMAIL));
        if (user.length === 0) {
            console.log("❌ CRITICAL: User not found in DB!");
            return;
        }
        const u = user[0];
        console.log(`✅ DB User Found: ID=${u.id}, Email=${u.email}, Role=${u.role}, Hash=${u.password.substring(0, 10)}...`);

        // 2. Reset Password
        console.log("🔄 Force Resetting Password...");
        const newHash = await bcrypt.hash(TARGET_PASS, 10);
        await db.update(users).set({ password: newHash }).where(eq(users.email, TARGET_EMAIL));
        console.log("✅ Password updated in DB.");

        // 3. Test API Login
        console.log("📞 Testing API Login (localhost:3001)...");
        const postData = JSON.stringify({ email: TARGET_EMAIL, password: TARGET_PASS });
        
        const req = http.request({
            hostname: 'localhost',
            port: 3001,
            path: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                console.log(`API Status: ${res.statusCode}`);
                console.log(`API Response: ${data}`);
                
                if (res.statusCode === 200) {
                    console.log("🎉 SUCCESS: API accepted the new password!");
                } else {
                    console.log("❌ FAILURE: API rejected the password (even after reset).");
                    console.log("POSSIBLE CAUSES:");
                    console.log("1. Server is connected to a DIFFERENT database.");
                    console.log("2. Server process needs restart to pick up DB changes (unlikely for Postgres).");
                    console.log("3. Middleware interfering.");
                }
                process.exit(0);
            });
        });
        
        req.on('error', (e) => {
            console.log(`❌ API Connection Error: ${e.message}`);
            process.exit(1);
        });
        
        req.write(postData);
        req.end();

    } catch (e) {
        console.error("❌ Script Error:", e);
        process.exit(1);
    }
}

run();
