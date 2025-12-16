const inquiryController = require('../controllers/inquiryController');

async function inquiryRoutes(fastify, options) {
  fastify.addHook('preHandler', async (req, reply) => {
    try {
      await fastify.authenticate(req, reply);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get('/', inquiryController.getInquiries);
  fastify.post('/', inquiryController.createInquiry);
  fastify.get('/:id', inquiryController.getInquiry);
  fastify.put('/:id', inquiryController.updateInquiry);
}

module.exports = inquiryRoutes;
