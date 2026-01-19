require('dotenv').config();

const fastify = require('fastify')({
  logger: true
});
const path = require('path');

// ============================================
// PLUGINS
// ============================================

// CORS
fastify.register(require('@fastify/cors'), {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

// JWT (for token generation/verification)
fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-2024',
});

// Multipart (for file uploads)
fastify.register(require('@fastify/multipart'), {
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Static files
const uploadsPath = path.join(__dirname, '../public/uploads');
const fs = require('fs');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
fastify.register(require('@fastify/static'), {
  root: uploadsPath,
  prefix: '/uploads/',
});

// ============================================
// AUTHENTICATION DECORATOR
// ============================================

// This decorator is used by protected routes
fastify.decorate('authenticate', async function(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ 
      error: 'Unauthorized', 
      message: 'Invalid or expired token',
      statusCode: 401 
    });
  }
});

// ============================================
// PUBLIC ROUTES (NO AUTH REQUIRED)
// ============================================

// Health check
fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

// Root
fastify.get('/', async () => ({
  message: 'Pondicherry Medical Tourism Portal API',
  version: '1.0.0'
}));

// ============================================
// AUTH ROUTES (INLINE - NO MODULE)
// ============================================

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { eq } = require('drizzle-orm');
const db = require('./config/database');
const { users } = require('./database/schema');

// LOGIN - No authentication required
fastify.post('/api/auth/login', {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 1 }
      }
    }
  }
}, async (request, reply) => {
  const { email, password } = request.body;
  console.log('LOGIN attempt:', email);
  console.log('Active DB URL:', process.env.DATABASE_URL); // Verify DB connection

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (!user) {
      console.log('User not found:', email);
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    console.log('User found ID:', user.id);
    console.log('Stored Hash:', user.password); // Verify Hash

    const isValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isValid);
    
    if (!isValid) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-2024',
      { expiresIn: '24h' }
    );

    console.log('LOGIN SUCCESS:', user.email);
    return { 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        userType: user.userType,
        name: user.name 
      } 
    };
  } catch (error) {
    console.error('Login error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
});

// REGISTER - No authentication required
fastify.post('/api/auth/register', {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password', 'userType'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        userType: { type: 'string' }
      }
    }
  }
}, async (request, reply) => {
  const { email, password, userType, name } = request.body;

  try {
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length > 0) {
      return reply.code(409).send({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const [newUser] = await db.insert(users).values({
      email,
      password: hashedPassword,
      userType,
      name: name || email
    }).returning();

    const token = jwt.sign(
      { userId: newUser.id, userType: newUser.userType },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-2024',
      { expiresIn: '24h' }
    );

    return reply.code(201).send({ 
      token, 
      user: { id: newUser.id, email: newUser.email, userType: newUser.userType } 
    });
  } catch (error) {
    console.error('Register error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
});

// CHANGE PASSWORD - Authentication required
fastify.post('/api/auth/change-password', {
  preHandler: [fastify.authenticate],
  schema: {
    body: {
      type: 'object',
      required: ['currentPassword', 'newPassword'],
      properties: {
        currentPassword: { type: 'string' },
        newPassword: { type: 'string', minLength: 6 }
      }
    }
  }
}, async (request, reply) => {
  const { currentPassword, newPassword } = request.body;
  const userId = request.user.userId;

  try {
    // Get current user
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isValid) {
      return reply.code(401).send({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await db.update(users).set({ 
      password: hashedPassword,
      updatedAt: new Date()
    }).where(eq(users.id, userId));

    console.log('Password changed for user:', userId);
    return { message: 'Password updated successfully' };
  } catch (error) {
    console.error('Change password error:', error);
    return reply.code(500).send({ error: 'Failed to change password' });
  }
});

// ============================================
// PROTECTED API ROUTES (MODULES)
// ============================================

// Hospital public routes (no auth for browsing)
fastify.register(require('./modules/hospitals/routes/hospitalRoutes'), { prefix: '/api/hospitals' });

// Inquiries (public create, protected list)
fastify.register(require('./modules/inquiries/routes/inquiryRoutes'), { prefix: '/api/inquiries' });

// Admin routes (auth required inside module)
fastify.register(require('./modules/admin/routes/adminRoutes'), { prefix: '/api/admin' });

// Admin analytics routes (NEW)
fastify.register(require('./modules/admin/routes/analyticsRoutes'), { prefix: '/api/admin' });

// NOTE: Settings routes are already defined in adminRoutes.js - do NOT re-register here
// to avoid FST_ERR_DUPLICATED_ROUTE error

// CMS routes (superadmin auth required inside module)
fastify.register(require('./modules/cms/routes/cmsRoutes'), { prefix: '/api/cms' });

// Upload routes (auth required)
fastify.register(require('./modules/upload/routes/uploadRoutes'), { prefix: '/api' });

// ============================================
// NEW FEATURE ROUTES
// ============================================

// Notifications (auth required inside module)
fastify.register(require('./modules/notifications/routes/notificationRoutes'), { prefix: '/api/notifications' });

// Activity Logs (admin auth inside module)
fastify.register(require('./modules/admin/routes/activityLogRoutes'), { prefix: '/api/admin/activity-logs' });

// Approval Queue (admin auth inside module)
fastify.register(require('./modules/admin/routes/approvalRoutes'), { prefix: '/api/admin/approvals' });

// Media Library (admin auth inside module)
fastify.register(require('./modules/admin/routes/mediaRoutes'), { prefix: '/api/admin/media' });

// Appointments (auth inside module)
fastify.register(require('./modules/appointments/routes/appointmentRoutes'), { prefix: '/api/appointments' });

// Doctors (public browsing)
fastify.register(require('./modules/doctors/routes/doctorRoutes'), { prefix: '/api/doctors' });

// Treatments (public browsing)
fastify.register(require('./modules/treatments/routes/treatmentRoutes'), { prefix: '/api/treatments' });

// Packages (public browsing)
fastify.register(require('./modules/packages/routes/packageRoutes'), { prefix: '/api/packages' });



// ============================================
// ERROR HANDLERS
// ============================================

fastify.setErrorHandler((error, request, reply) => {
  console.error('Error:', error.message);
  reply.status(error.statusCode || 500).send({
    error: error.message || 'Internal Server Error',
    statusCode: error.statusCode || 500,
  });
});

fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: 'Not Found',
    message: `Route ${request.method}:${request.url} not found`,
    statusCode: 404,
  });
});

// ============================================
// START SERVER
// ============================================

const start = async () => {
  try {
    const port = process.env.PORT || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`✅ Server running on port ${port}`);
  } catch (err) {
    console.error('Server start error:', err);
    process.exit(1);
  }
};

start();
// trigger restart
