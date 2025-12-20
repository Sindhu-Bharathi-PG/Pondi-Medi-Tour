const { uploadImage } = require('../controllers/uploadController');

async function uploadRoutes(fastify, options) {
    // Upload image endpoint
    fastify.post('/upload', {
        preHandler: fastify.authenticate
    }, uploadImage);
}

module.exports = uploadRoutes;
