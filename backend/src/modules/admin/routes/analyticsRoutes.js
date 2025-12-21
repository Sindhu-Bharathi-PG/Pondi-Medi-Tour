const analyticsController = require('../controllers/analyticsController');

module.exports = async function (fastify, opts) {
  // Analytics stats
  fastify.get('/analytics/stats', {
    preHandler: fastify.authenticate,
    handler: analyticsController.getStats
  });

  // Top hospitals
  fastify.get('/analytics/top-hospitals', {
    preHandler: fastify.authenticate,
    handler: analyticsController.getTopHospitals
  });

  // Activity feed
  fastify.get('/analytics/activity', {
    preHandler: fastify.authenticate,
    handler: analyticsController.getActivityFeed
  });
};
