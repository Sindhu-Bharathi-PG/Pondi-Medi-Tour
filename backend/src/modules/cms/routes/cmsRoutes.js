const { superAdminAuth } = require('../../../middleware/superAdminAuth');
const {
  getPublicPageConfig,
  getPageConfig,
  updatePageConfig,
  publishPageConfig,
  getVersionHistory,
  revertToVersion,
  uploadImage
} = require('../controllers/cmsController');

async function cmsRoutes(fastify, options) {
  // Public Route - No authentication required
  fastify.get('/public/pages/:pageType', getPublicPageConfig);

  // Authenticated Routes (Super Admin)
  fastify.register(async function (protectedRoutes) {
    protectedRoutes.addHook('onRequest', superAdminAuth);

    // Page Configuration Routes
    protectedRoutes.get('/pages/:pageType', getPageConfig);
    protectedRoutes.put('/pages/:pageType', updatePageConfig);
    protectedRoutes.post('/pages/:pageType/publish', publishPageConfig);
    
    // Version History Routes
    protectedRoutes.get('/pages/:pageType/versions', getVersionHistory);
    protectedRoutes.post('/pages/:pageType/revert/:versionId', revertToVersion);
    
    // Image Upload Route
    protectedRoutes.post('/upload/image', uploadImage);
  });
}

module.exports = cmsRoutes;
