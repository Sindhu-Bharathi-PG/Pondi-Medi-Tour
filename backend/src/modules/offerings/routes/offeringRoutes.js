const offeringController = require('../controllers/offeringController');

async function offeringRoutes(fastify, options) {
  fastify.addHook('preHandler', async (req, reply) => {
    try {
      await fastify.authenticate(req, reply);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get('/', offeringController.getMyOfferings);
  fastify.post('/', offeringController.createOffering);
  fastify.get('/:id', offeringController.getOffering);
  fastify.put('/:id', offeringController.updateOffering);
  fastify.delete('/:id', offeringController.deleteOffering);
}

module.exports = offeringRoutes;
