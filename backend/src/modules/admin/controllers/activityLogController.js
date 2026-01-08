const { sql } = require('../../../config/database');

/**
 * Get activity logs with filtering and pagination
 */
async function getActivityLogs(request, reply) {
  try {
    const { 
      actionType, 
      targetType, 
      actorId,
      limit = 50, 
      offset = 0 
    } = request.query;

    let query = sql`
      SELECT 
        al.id,
        al.action_type,
        al.target_type,
        al.target_id,
        al.description,
        al.metadata,
        al.created_at,
        u.name as actor_name,
        u.email as actor_email
      FROM activity_logs al
      LEFT JOIN users u ON al.actor_id = u.id
      WHERE 1=1
    `;

    // Build dynamic query based on filters
    const conditions = [];
    const params = [];

    if (actionType) {
      conditions.push(sql`al.action_type = ${actionType}`);
    }
    if (targetType) {
      conditions.push(sql`al.target_type = ${targetType}`);
    }
    if (actorId) {
      conditions.push(sql`al.actor_id = ${actorId}`);
    }

    // Execute with pagination
    const logs = await sql`
      SELECT 
        al.id,
        al.action_type,
        al.target_type,
        al.target_id,
        al.description,
        al.metadata,
        al.created_at,
        u.name as actor_name,
        u.email as actor_email
      FROM activity_logs al
      LEFT JOIN users u ON al.actor_id = u.id
      ORDER BY al.created_at DESC
      LIMIT ${parseInt(limit)}
      OFFSET ${parseInt(offset)}
    `;

    const [{ count }] = await sql`SELECT COUNT(*) as count FROM activity_logs`;

    return reply.send({
      success: true,
      logs,
      total: parseInt(count),
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return reply.status(500).send({ success: false, error: 'Failed to fetch activity logs' });
  }
}

/**
 * Log an activity (helper function for other modules)
 * @param {string} actorId - User UUID who performed the action
 * @param {string} actionType - Type of action (e.g., 'hospital_approved', 'user_created')
 * @param {string} targetType - Type of entity affected (e.g., 'hospital', 'user')
 * @param {string} targetId - ID of the affected entity
 * @param {string} description - Human-readable description
 * @param {object} metadata - Additional context data
 */
async function logActivity(actorId, actionType, targetType, targetId, description, metadata = {}) {
  try {
    await sql`
      INSERT INTO activity_logs (actor_id, action_type, target_type, target_id, description, metadata)
      VALUES (${actorId}, ${actionType}, ${targetType}, ${targetId}, ${description}, ${JSON.stringify(metadata)})
    `;
    return true;
  } catch (error) {
    console.error('Error logging activity:', error);
    return false;
  }
}

/**
 * Get activity summary statistics
 */
async function getActivitySummary(request, reply) {
  try {
    const [stats] = await sql`
      SELECT 
        COUNT(*) as total_actions,
        COUNT(DISTINCT actor_id) as unique_actors,
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as last_24h,
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as last_7d
      FROM activity_logs
    `;

    const topActions = await sql`
      SELECT action_type, COUNT(*) as count
      FROM activity_logs
      WHERE created_at > NOW() - INTERVAL '30 days'
      GROUP BY action_type
      ORDER BY count DESC
      LIMIT 10
    `;

    return reply.send({
      success: true,
      stats,
      topActions
    });
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    return reply.status(500).send({ success: false, error: 'Failed to fetch summary' });
  }
}

module.exports = {
  getActivityLogs,
  logActivity,
  getActivitySummary
};
