const { adminAuth } = require('../../../middleware/adminAuth');
const { superAdminAuth } = require('../../../middleware/superAdminAuth');
const {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
  deleteNotification
} = require('../controllers/notificationController');

async function notificationRoutes(fastify, options) {
  // All routes require authentication (via adminAuth which verifies JWT)
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Invalid or missing authentication token',
        statusCode: 401
      });
    }
  });

  // Get user's notifications
  fastify.get('/', getUserNotifications);

  // Mark single notification as read
  fastify.patch('/:id/read', markAsRead);

  // Mark all notifications as read
  fastify.post('/mark-all-read', markAllAsRead);

  // Delete a notification
  fastify.delete('/:id', deleteNotification);

  // Admin: Create notification for a user (requires superadmin)
  fastify.post('/admin/create', { preHandler: superAdminAuth }, createNotification);
}

module.exports = notificationRoutes;
