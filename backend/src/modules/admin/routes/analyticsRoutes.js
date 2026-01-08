const { adminAuth } = require('../../../middleware/adminAuth');
const {
  logEvent,
  getAnalyticsSummary,
  getAnalyticsLogs
} = require('../controllers/analyticsLogController');

async function analyticsRoutes(fastify, options) {
  // Public endpoint for logging events (no auth required)
  fastify.post('/event', logEvent);

  // Protected routes for viewing analytics (admin only)
  fastify.register(async function (protectedRoutes) {
    protectedRoutes.addHook('onRequest', adminAuth);

    protectedRoutes.get('/summary', getAnalyticsSummary);
    protectedRoutes.get('/logs', getAnalyticsLogs);
  });
}

module.exports = analyticsRoutes;
