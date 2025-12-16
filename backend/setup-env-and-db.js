const fs = require('fs');
const path = require('path');
const postgres = require('postgres');

// Environment configuration
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

# Optional: Redis (for caching/sessions)
# REDIS_URL=redis://localhost:6379

# Optional: Email (Nodemailer)
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=your-email@example.com
# SMTP_PASSWORD=your-email-password

# Optional: Twilio (SMS)
# TWILIO_ACCOUNT_SID=your-account-sid
# TWILIO_AUTH_TOKEN=your-auth-token
# TWILIO_PHONE_NUMBER=+1234567890

# Optional: Stripe (Payments)
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...

# Optional: Razorpay (Payments)
# RAZORPAY_KEY_ID=rzp_test_...
# RAZORPAY_KEY_SECRET=...
`;

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function setup() {
  try {
    console.log('🚀 Starting setup...\n');
    
    // Step 1: Create .env file
    const envPath = path.join(__dirname, '.env');
    if (!fs.existsSync(envPath)) {
      console.log('📝 Creating .env file...');
      fs.writeFileSync(envPath, ENV_CONTENT);
      console.log('✅ .env file created successfully\n');
    } else {
      console.log('ℹ️  .env file already exists, skipping...\n');
    }

    // Step 2: Execute SQL file
    console.log('🗄️  Connecting to database...');
    const sql = postgres(DATABASE_URL);
    
    console.log('📊 Reading SQL file...');
    const sqlFile = fs.readFileSync(path.join(__dirname, 'create_users_table.sql'), 'utf8');
    
    console.log('⚡ Executing SQL statements...');
    
    // Split SQL file by statements (simple approach)
    const statements = sqlFile
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        await sql.unsafe(statement);
        console.log('✓ Executed statement');
      }
    }
    
    console.log('\n✅ Database setup completed successfully!');
    console.log('\n📋 Test users created:');
    console.log('   • hospital@test.com (password: password123)');
    console.log('   • admin@test.com (password: password123)');
    console.log('   • superadmin@test.com (password: password123)');
    
    await sql.end();
    console.log('\n🎉 Setup complete! You can now start the server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

setup();
