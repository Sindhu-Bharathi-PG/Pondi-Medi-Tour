const { superAdminAuth } = require('../../../middleware/superAdminAuth');
const { adminAuth } = require('../../../middleware/adminAuth');
const {
  getActivityLogs,
  getActivitySummary
} = require('../controllers/activityLogController');

async function activityLogRoutes(fastify, options) {
  // All routes require admin authentication
  fastify.addHook('onRequest', adminAuth);

  // Get activity logs with filters
  fastify.get('/', getActivityLogs);

  // Get activity summary/stats
  fastify.get('/summary', getActivitySummary);
}

module.exports = activityLogRoutes;
