const authController = require('../controllers/authController');

module.exports = async function (fastify, opts) {
  // Login route
  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
        }
      }
    }
  }, authController.login);

  // Register route
  fastify.post('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password', 'userType'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          userType: { type: 'string', enum: ['patient', 'doctor', 'admin'] }
        }
      }
    }
  }, authController.register);

  // Logout route
  fastify.post('/logout', { preHandler: fastify.authenticate }, authController.logout);

  // Refresh token route
  fastify.post('/refresh', authController.refreshToken);

  // MFA routes
  fastify.post('/mfa/setup', { preHandler: fastify.authenticate }, authController.setupMFA);
  fastify.post('/mfa/verify', authController.verifyMFA);

  // Change password route
  fastify.post('/change-password', {
    preHandler: fastify.authenticate,
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
  }, authController.changePassword);

  // TEMPORARY DEBUG ROUTE
  fastify.get('/reset-debug', async (request, reply) => {
    const bcrypt = require('bcryptjs');
    const { eq } = require('drizzle-orm');
    const { users } = require('../../../database/schema');
    const db = require('../../../config/database');
    
    const newHash = await bcrypt.hash('123456', 10);
    // Create a new user test2@test.com
    try {
        await db.insert(users).values({
            email: 'test2@test.com',
            password: newHash,
            name: 'Test Setup User',
            userType: 'hospital',
            isActive: true,
            emailVerified: true
        });
        return { success: true, message: 'Created user test2@test.com with password 123456' };
    } catch (e) {
        // If exists, update it
        await db.update(users).set({ password: newHash }).where(eq(users.email, 'test2@test.com'));
        return { success: true, message: 'Updated user test2@test.com with password 123456' };
    }
  });
};
