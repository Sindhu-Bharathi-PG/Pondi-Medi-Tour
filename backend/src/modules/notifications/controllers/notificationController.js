const { sql } = require('../../../config/database');

/**
 * Get all notifications for the authenticated user
 */
async function getUserNotifications(request, reply) {
  try {
    const userId = request.user.id;
    
    const notifications = await sql`
      SELECT id, title, message, type, link_url, is_read, created_at
      FROM notifications
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 50
    `;
    
    return reply.send({
      success: true,
      notifications,
      unreadCount: notifications.filter(n => !n.is_read).length
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return reply.status(500).send({ success: false, error: 'Failed to fetch notifications' });
  }
}

/**
 * Mark a single notification as read
 */
async function markAsRead(request, reply) {
  try {
    const { id } = request.params;
    const userId = request.user.id;
    
    await sql`
      UPDATE notifications
      SET is_read = true
      WHERE id = ${id} AND user_id = ${userId}
    `;
    
    return reply.send({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return reply.status(500).send({ success: false, error: 'Failed to update notification' });
  }
}

/**
 * Mark all notifications as read for the user
 */
async function markAllAsRead(request, reply) {
  try {
    const userId = request.user.id;
    
    await sql`
      UPDATE notifications
      SET is_read = true
      WHERE user_id = ${userId} AND is_read = false
    `;
    
    return reply.send({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return reply.status(500).send({ success: false, error: 'Failed to update notifications' });
  }
}

/**
 * Create a new notification (internal helper, also exposed for admin)
 */
async function createNotification(request, reply) {
  try {
    const { userId, title, message, type = 'info', linkUrl } = request.body;
    
    const [notification] = await sql`
      INSERT INTO notifications (user_id, title, message, type, link_url)
      VALUES (${userId}, ${title}, ${message}, ${type}, ${linkUrl || null})
      RETURNING id, title, message, type, link_url, is_read, created_at
    `;
    
    return reply.status(201).send({ success: true, notification });
  } catch (error) {
    console.error('Error creating notification:', error);
    return reply.status(500).send({ success: false, error: 'Failed to create notification' });
  }
}

/**
 * Helper function to create notifications from other modules
 * @param {string} userId - User UUID
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} type - 'info', 'success', 'warning', 'error'
 * @param {string} linkUrl - Optional navigation link
 */
async function sendNotification(userId, title, message, type = 'info', linkUrl = null) {
  try {
    await sql`
      INSERT INTO notifications (user_id, title, message, type, link_url)
      VALUES (${userId}, ${title}, ${message}, ${type}, ${linkUrl})
    `;
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
}

/**
 * Delete a notification
 */
async function deleteNotification(request, reply) {
  try {
    const { id } = request.params;
    const userId = request.user.id;
    
    await sql`
      DELETE FROM notifications
      WHERE id = ${id} AND user_id = ${userId}
    `;
    
    return reply.send({ success: true, message: 'Notification deleted' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return reply.status(500).send({ success: false, error: 'Failed to delete notification' });
  }
}

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
  sendNotification,
  deleteNotification
};
