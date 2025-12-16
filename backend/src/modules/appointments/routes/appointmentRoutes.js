const appointmentController = require('../controllers/appointmentController');

async function appointmentRoutes(fastify, options) {
  fastify.addHook('preHandler', async (req, reply) => {
    try {
      await fastify.authenticate(req, reply);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get('/', appointmentController.getAppointments);
  fastify.post('/', appointmentController.createAppointment);
  fastify.get('/:id', appointmentController.getAppointment);
  fastify.put('/:id', appointmentController.updateAppointment);
}

module.exports = appointmentRoutes;
