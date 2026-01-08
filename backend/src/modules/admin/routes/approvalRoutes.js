const { adminAuth } = require('../../../middleware/adminAuth');
const {
  getPendingApprovals,
  approveItem,
  rejectItem,
  getApprovalStats
} = require('../controllers/approvalQueueController');

async function approvalRoutes(fastify, options) {
  // All routes require admin authentication
  fastify.addHook('onRequest', adminAuth);

  // Get pending approvals
  fastify.get('/', getPendingApprovals);

  // Get approval stats
  fastify.get('/stats', getApprovalStats);

  // Approve an item
  fastify.post('/:id/approve', approveItem);

  // Reject an item
  fastify.post('/:id/reject', rejectItem);
}

module.exports = approvalRoutes;
