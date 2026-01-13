const doctorController = require('../controllers/doctorController');

async function doctorRoutes(fastify, options) {
  // ============================================
  // PUBLIC ROUTES (No auth required)
  // ============================================
  fastify.get('/', doctorController.getAllDoctorsPublic);
  fastify.get('/:id', doctorController.getDoctorByIdPublic);

  // ============================================
  // PROTECTED ROUTES (Auth required)
  // ============================================
  fastify.post('/', { preHandler: fastify.authenticate }, doctorController.createDoctor);
  fastify.put('/:id', { preHandler: fastify.authenticate }, doctorController.updateDoctor);
  fastify.delete('/:id', { preHandler: fastify.authenticate }, doctorController.deleteDoctor);
}

module.exports = doctorRoutes;
