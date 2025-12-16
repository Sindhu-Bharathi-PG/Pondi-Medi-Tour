const doctorController = require('../controllers/doctorController');

async function doctorRoutes(fastify, options) {
  // Authentication middleware is required for all routes
  fastify.addHook('preHandler', async (req, reply) => {
    try {
      await fastify.authenticate(req, reply);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get('/', doctorController.getAllDoctors);
  fastify.post('/', doctorController.createDoctor);
  fastify.get('/:id', doctorController.getDoctor);
  fastify.put('/:id', doctorController.updateDoctor);
  fastify.delete('/:id', doctorController.deleteDoctor);
}

module.exports = doctorRoutes;
