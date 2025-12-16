const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

console.log('🔌 Connecting to DB:', connectionString.replace(/:[^:@]*@/, ':****@')); // Log masked URL

const client = postgres(connectionString, { 
  prepare: false,
  ssl: 'require',     // Explicitly require SSL
  max: 10,            // Connection pool size
  idle_timeout: 20,   // Idle connection timeout in seconds
  connect_timeout: 10 // Connect timeout in seconds
});
const db = drizzle(client);

// Test the connection on startup
client`SELECT 1`.then(() => {
  console.log('✅ Database connected successfully');
}).catch(err => {
  console.error('❌ Database connection failed:', err.message);
});

module.exports = db;
