const fs = require('fs');
const path = require('path');

const ENV_CONTENT = `# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-key-change-this-in-production-2024

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
`;

const envPath = path.join(__dirname, '.env.local');
fs.writeFileSync(envPath, ENV_CONTENT);
console.log('✅ .env.local file created successfully at:', envPath);
console.log('\n📋 Configuration:');
console.log('   • NextAuth URL: http://localhost:3000');
console.log('   • Backend API URL: http://localhost:3001');
console.log('\n⚠️  Please restart your Next.js dev server for changes to take effect!');
