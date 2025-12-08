require('dotenv').config();
const connectDB = require('./config/database');

const fastify = require('fastify')({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Register plugins
fastify.register(require('@fastify/cors'), {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
});

fastify.register(require('@fastify/helmet'), {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
});

fastify.register(require('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '1 minute',
});

fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET || 'your-secret-key',
});

fastify.register(require('@fastify/multipart'), {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

fastify.register(require('@fastify/static'), {
  root: require('path').join(__dirname, '../public/uploads'),
  prefix: '/uploads/',
});

// Register routes
fastify.register(require('./modules/auth/routes/authRoutes'), { prefix: '/api/auth' });
fastify.register(require('./modules/consent/routes/consentRoutes'), { prefix: '/api/consent' });
fastify.register(require('./modules/profile/routes/profileRoutes'), { prefix: '/api/profile' });
fastify.register(require('./modules/search/routes/searchRoutes'), { prefix: '/api/search' });
fastify.register(require('./modules/cost-calculator/routes/costRoutes'), { prefix: '/api/cost' });
fastify.register(require('./modules/telemedicine/routes/telemedicineRoutes'), { prefix: '/api/telemedicine' });
fastify.register(require('./modules/booking/routes/bookingRoutes'), { prefix: '/api/booking' });
fastify.register(require('./modules/visa/routes/visaRoutes'), { prefix: '/api/visa' });
fastify.register(require('./modules/wellness/routes/wellnessRoutes'), { prefix: '/api/wellness' });
fastify.register(require('./modules/payment/routes/paymentRoutes'), { prefix: '/api/payment' });
fastify.register(require('./modules/notifications/routes/notificationRoutes'), { prefix: '/api/notifications' });
fastify.register(require('./modules/admin/routes/adminRoutes'), { prefix: '/api/admin' });

// Health check route
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Root route
fastify.get('/', async (request, reply) => {
  return {
    message: 'Pondicherry Medical Tourism Portal API',
    version: '1.0.0',
    docs: '/api/docs'
  };
});

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(error.statusCode || 500).send({
    error: error.message || 'Internal Server Error',
    statusCode: error.statusCode || 500,
  });
});

// Not found handler
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: 'Not Found',
    message: `Route ${request.method}:${request.url} not found`,
    statusCode: 404,
  });
});

// Start server
const start = async () => {
  try {
    // Connect to database
    await connectDB();

    const port = process.env.PORT || 3001;
    const host = process.env.HOST || '0.0.0.0';

    await fastify.listen({ port, host });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  fastify.log.info('Received SIGINT, shutting down gracefully');
  await fastify.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  fastify.log.info('Received SIGTERM, shutting down gracefully');
  await fastify.close();
  process.exit(0);
});

start();
