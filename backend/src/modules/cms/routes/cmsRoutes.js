const { superAdminAuth } = require('../../../middleware/superAdminAuth');
const {
  getPageConfig,
  updatePageConfig,
  publishPageConfig,
  getVersionHistory,
  revertToVersion,
  uploadImage
} = require('../controllers/cmsController');

async function cmsRoutes(fastify, options) {
  // Apply super admin authentication to all CMS routes
  fastify.addHook('onRequest', superAdminAuth);

  // Page Configuration Routes
  fastify.get('/pages/:pageType', getPageConfig);
  fastify.put('/pages/:pageType', updatePageConfig);
  fastify.post('/pages/:pageType/publish', publishPageConfig);
  
  // Version History Routes
  fastify.get('/pages/:pageType/versions', getVersionHistory);
  fastify.post('/pages/:pageType/revert/:versionId', revertToVersion);
  
  // Image Upload Route
  fastify.post('/upload/image', uploadImage);
}

module.exports = cmsRoutes;
