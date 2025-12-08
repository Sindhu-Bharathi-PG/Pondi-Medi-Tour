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
};
