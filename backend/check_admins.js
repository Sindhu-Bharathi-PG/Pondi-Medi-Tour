const { eq } = require('drizzle-orm');
const db = require('./src/config/database');
const { users } = require('./src/database/schema');

async function checkAdmins() {
  try {
    const allUsers = await db.select().from(users);
    console.log('All Users:', allUsers.map(u => ({ id: u.id, email: u.email, userType: u.userType })));
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}

checkAdmins();
