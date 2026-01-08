const { adminAuth } = require('../../../middleware/adminAuth');
const {
  getAllMedia,
  uploadMedia,
  deleteMedia,
  updateMedia,
  getMediaStats
} = require('../controllers/mediaLibraryController');

async function mediaRoutes(fastify, options) {
  // All routes require admin authentication
  fastify.addHook('onRequest', adminAuth);

  // Get all media files
  fastify.get('/', getAllMedia);

  // Get media stats
  fastify.get('/stats', getMediaStats);

  // Upload new media
  fastify.post('/upload', uploadMedia);

  // Update media metadata
  fastify.patch('/:id', updateMedia);

  // Delete media
  fastify.delete('/:id', deleteMedia);
}

module.exports = mediaRoutes;
