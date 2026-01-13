require('dotenv').config();
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
console.log('DB URL:', connectionString.replace(/:[^:@]*@/, ':****@'));
process.exit();
