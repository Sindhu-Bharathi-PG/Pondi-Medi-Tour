require('dotenv').config();
console.log('DB URL:', process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:[^:@]+@/, ':***@') : 'UNDEFINED');
