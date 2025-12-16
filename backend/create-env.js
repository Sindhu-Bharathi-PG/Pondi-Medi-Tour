const fs = require('fs');
const path = require('path');

const ENV_CONTENT = `# Environment Variables
# Database
DATABASE_URL=postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Server
PORT=3001
HOST=0.0.0.0
NODE_ENV=development
LOG_LEVEL=info

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024

# CORS
CORS_ORIGIN=http://localhost:3000
`;

const envPath = path.join(__dirname, '.env');
fs.writeFileSync(envPath, ENV_CONTENT);
console.log('✅ .env file created successfully at:', envPath);
