const { eq } = require('drizzle-orm');
const db = require('./backend/src/config/database');
const { users } = require('./backend/src/database/schema');

async function checkAdmins() {
  try {
    const admins = await db.select().from(users);
    console.log('All users:', admins.map(u => ({ id: u.id, email: u.email, userType: u.userType })));
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}

checkAdmins();
