const adminSettingsController = require('../controllers/adminSettingsController');

module.exports = async function (fastify, opts) {
  // Get settings
  fastify.get('/settings', {
    preHandler: fastify.authenticate,
    handler: adminSettingsController.getSettings
  });

  // Update settings
  fastify.put('/settings', {
    preHandler: fastify.authenticate,
    handler: adminSettingsController.updateSettings
  });
};
