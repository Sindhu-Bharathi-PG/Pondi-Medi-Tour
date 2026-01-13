const packageController = require('../controllers/packageController');
const { adminAuth } = require('../../../middleware/adminAuth');

async function packageRoutes(fastify, options) {
    // Public routes for fetching packages
    fastify.get('/', packageController.getAllPackages);
    fastify.get('/:slug', packageController.getPackageBySlug);
    
    // Admin/Superadmin route for updating popularity score
    fastify.patch('/:id/popularity', {
        preHandler: [adminAuth]
    }, packageController.updatePopularityScore);
}

module.exports = packageRoutes;
