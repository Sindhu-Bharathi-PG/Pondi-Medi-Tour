const treatmentController = require('../controllers/treatmentController');

async function treatmentRoutes(fastify, options) {
    // Public routes for fetching treatments
    fastify.get('/', treatmentController.getAllTreatments);
    fastify.get('/:slug', treatmentController.getTreatmentBySlug);
}

module.exports = treatmentRoutes;
