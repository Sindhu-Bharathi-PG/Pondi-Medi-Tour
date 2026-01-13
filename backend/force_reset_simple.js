require('dotenv').config();
const db = require('./src/config/database');
const { users } = require('./src/database/schema');
const { eq } = require('drizzle-orm');
const bcrypt = require('bcryptjs');

(async () => {
    try {
        console.log("Starting simple password reset...");
        const targetEmail = 'hospital@svmchrc.ac.in';
        
        // 1. Verify user exists
        const user = await db.select().from(users).where(eq(users.email, targetEmail));
        if (user.length === 0) {
            console.error("User not found during reset!");
            process.exit(1);
        }
        
        console.log("User found. Generating new hash...");
        // 2. Generate hash
        const hash = await bcrypt.hash('123456', 10);
        
        // 3. Update DB
        await db.update(users).set({ password: hash }).where(eq(users.email, targetEmail));
        console.log("SUCCESS: Password reset to '123456' for", targetEmail);
        
        // 4. Verification Check
        const [updatedUser] = await db.select().from(users).where(eq(users.email, targetEmail));
        const match = await bcrypt.compare('123456', updatedUser.password);
        console.log("Verification Check: Password matches?", match);
        
    } catch (error) {
        console.error("CRITICAL ERROR:", error);
    } finally {
        console.log("Exiting.");
        process.exit(0);
    }
})();
