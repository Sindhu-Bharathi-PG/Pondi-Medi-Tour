require('dotenv').config();

const fastify = require('fastify')({
  logger: true
});

// CORS only - minimal plugins
fastify.register(require('@fastify/cors'), {
  origin: '*',
  credentials: true,
});

// Test route - no auth needed
fastify.post('/test-login', async (request, reply) => {
  console.log('=== MINIMAL TEST LOGIN HIT ===');
  console.log('Body:', request.body);
  
  const bcrypt = require('bcryptjs');
  const { eq } = require('drizzle-orm');
  const db = require('./config/database');
  const { users } = require('./database/schema');
  
  const { email, password } = request.body;
  
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    console.log('User found:', !!user);
    
    if (!user) {
      return reply.code(401).send({ error: 'User not found', email });
    }
    
    console.log('User data:', { id: user.id, email: user.email, userType: user.userType });
    console.log('Stored hash:', user.password);
    
    const isValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isValid);
    
    if (!isValid) {
      return reply.code(401).send({ error: 'Password mismatch' });
    }
    
    return { success: true, user: { id: user.id, email: user.email, userType: user.userType } };
  } catch (err) {
    console.error('Error:', err);
    return reply.code(500).send({ error: err.message });
  }
});

// Health check
fastify.get('/health', async () => ({ status: 'ok' }));

const start = async () => {
  try {
    await fastify.listen({ port: 3002, host: '0.0.0.0' });
    console.log('✅ MINIMAL TEST SERVER running on port 3002');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
