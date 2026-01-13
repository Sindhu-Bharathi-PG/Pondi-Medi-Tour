const inquiryController = require('../controllers/inquiryController');

async function inquiryRoutes(fastify, options) {
  // Public route for creating inquiry
  fastify.post('/', inquiryController.createInquiry);

  // Protected routes
  fastify.register(async function (protectedRoutes) {
    protectedRoutes.addHook('preHandler', async (req, reply) => {
      try {
        await fastify.authenticate(req, reply);
      } catch (err) {
        reply.send(err);
      }
    });

    protectedRoutes.get('/', async (req, reply) => {
        // Dispatch based on role
        if (req.user.userType === 'admin' || req.user.userType === 'superadmin') {
            return inquiryController.getAllInquiries(req, reply);
        } else {
            return inquiryController.getInquiries(req, reply);
        }
    });
    
    protectedRoutes.get('/:id', inquiryController.getInquiry);
    protectedRoutes.put('/:id', inquiryController.updateInquiry);
  });
}

module.exports = inquiryRoutes;
