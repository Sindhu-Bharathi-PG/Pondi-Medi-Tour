const fs = require('fs');
const path = require('path');

const ENV_CONTENT = `PORT=3001
HOST=0.0.0.0
NODE_ENV=development
LOG_LEVEL=info

# Database
DATABASE_URL=postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Security
JWT_SECRET=your-super-secret-key-change-this-in-production
CORS_ORIGIN=http://localhost:3000

# File Uploads
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=5242880
`;

const envPath = path.join(__dirname, '.env');
fs.writeFileSync(envPath, ENV_CONTENT);
console.log('✅ Backend .env file created successfully at:', envPath);
