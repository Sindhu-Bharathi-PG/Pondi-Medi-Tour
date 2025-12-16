const hospitalController = require('../controllers/hospitalController');

module.exports = async function (fastify, opts) {
  // Public routes
  fastify.get('/', hospitalController.getAllHospitals);
  fastify.get('/:id', hospitalController.getHospital);
  
  // Authenticated routes for hospital users
  fastify.get('/me/profile', { preHandler: fastify.authenticate }, hospitalController.getMyHospital);
  fastify.put('/me/profile', { preHandler: fastify.authenticate }, hospitalController.updateMyHospital);
  fastify.post('/me/photos', { preHandler: fastify.authenticate }, hospitalController.addPhoto);
  fastify.delete('/me/photos/:index', { preHandler: fastify.authenticate }, hospitalController.deletePhoto);
  
  // Admin-only routes
  fastify.post('/', hospitalController.createHospital);
  fastify.put('/:id', hospitalController.updateHospital);
  fastify.delete('/:id', hospitalController.deleteHospital);
};
