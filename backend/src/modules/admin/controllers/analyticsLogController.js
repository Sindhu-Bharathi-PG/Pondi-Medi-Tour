const { sql } = require('../../../config/database');

/**
 * Log an analytics event (public endpoint)
 */
async function logEvent(request, reply) {
  try {
    const { 
      eventType, 
      eventData = {}, 
      userId = null, 
      hospitalId = null 
    } = request.body;

    // Get client information
    const ipAddress = request.ip;
    const userAgent = request.headers['user-agent'];
    const referrerUrl = request.headers['referer'] || null;

    await sql`
      INSERT INTO analytics_logs (event_type, event_data, user_id, hospital_id, ip_address, user_agent, referrer_url)
      VALUES (${eventType}, ${JSON.stringify(eventData)}, ${userId}, ${hospitalId}, ${ipAddress}, ${userAgent}, ${referrerUrl})
    `;

    return reply.status(201).send({ success: true, message: 'Event logged' });
  } catch (error) {
    console.error('Error logging analytics event:', error);
    return reply.status(500).send({ success: false, error: 'Failed to log event' });
  }
}

/**
 * Get analytics summary for dashboard
 */
async function getAnalyticsSummary(request, reply) {
  try {
    const { period = '7d' } = request.query;
    
    let interval = '7 days';
    if (period === '24h') interval = '24 hours';
    if (period === '30d') interval = '30 days';
    if (period === '90d') interval = '90 days';

    // Overall stats
    const [stats] = await sql`
      SELECT 
        COUNT(*) as total_events,
        COUNT(DISTINCT ip_address) as unique_visitors,
        COUNT(*) FILTER (WHERE event_type = 'page_view') as page_views,
        COUNT(*) FILTER (WHERE event_type = 'inquiry') as inquiries,
        COUNT(*) FILTER (WHERE event_type = 'hospital_view') as hospital_views
      FROM analytics_logs
      WHERE created_at > NOW() - ${sql.raw(`INTERVAL '${interval}'`)}
    `;

    // Events by type
    const eventsByType = await sql`
      SELECT event_type, COUNT(*) as count
      FROM analytics_logs
      WHERE created_at > NOW() - ${sql.raw(`INTERVAL '${interval}'`)}
      GROUP BY event_type
      ORDER BY count DESC
      LIMIT 10
    `;

    // Top pages/hospitals viewed
    const topHospitals = await sql`
      SELECT 
        hospital_id,
        hd.name as hospital_name,
        COUNT(*) as views
      FROM analytics_logs al
      LEFT JOIN hospital_details hd ON al.hospital_id = hd.id
      WHERE al.event_type = 'hospital_view'
        AND al.created_at > NOW() - ${sql.raw(`INTERVAL '${interval}'`)}
        AND al.hospital_id IS NOT NULL
      GROUP BY hospital_id, hd.name
      ORDER BY views DESC
      LIMIT 5
    `;

    // Daily breakdown
    const dailyStats = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as events,
        COUNT(DISTINCT ip_address) as visitors
      FROM analytics_logs
      WHERE created_at > NOW() - ${sql.raw(`INTERVAL '${interval}'`)}
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `;

    return reply.send({
      success: true,
      period,
      stats,
      eventsByType,
      topHospitals,
      dailyStats
    });
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return reply.status(500).send({ success: false, error: 'Failed to fetch analytics' });
  }
}

/**
 * Get detailed analytics logs with pagination
 */
async function getAnalyticsLogs(request, reply) {
  try {
    const { 
      eventType, 
      hospitalId,
      limit = 100, 
      offset = 0 
    } = request.query;

    let whereClause = sql`WHERE 1=1`;
    
    if (eventType) {
      whereClause = sql`${whereClause} AND event_type = ${eventType}`;
    }
    if (hospitalId) {
      whereClause = sql`${whereClause} AND hospital_id = ${parseInt(hospitalId)}`;
    }

    const logs = await sql`
      SELECT 
        id, event_type, event_data, user_id, hospital_id, 
        ip_address, user_agent, referrer_url, created_at
      FROM analytics_logs
      ORDER BY created_at DESC
      LIMIT ${parseInt(limit)}
      OFFSET ${parseInt(offset)}
    `;

    const [{ count }] = await sql`SELECT COUNT(*) as count FROM analytics_logs`;

    return reply.send({
      success: true,
      logs,
      total: parseInt(count),
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Error fetching analytics logs:', error);
    return reply.status(500).send({ success: false, error: 'Failed to fetch logs' });
  }
}

/**
 * Helper function to log analytics from other modules
 */
async function trackEvent(eventType, eventData = {}, userId = null, hospitalId = null, request = null) {
  try {
    const ipAddress = request?.ip || null;
    const userAgent = request?.headers?.['user-agent'] || null;
    const referrerUrl = request?.headers?.['referer'] || null;

    await sql`
      INSERT INTO analytics_logs (event_type, event_data, user_id, hospital_id, ip_address, user_agent, referrer_url)
      VALUES (${eventType}, ${JSON.stringify(eventData)}, ${userId}, ${hospitalId}, ${ipAddress}, ${userAgent}, ${referrerUrl})
    `;
    return true;
  } catch (error) {
    console.error('Error tracking event:', error);
    return false;
  }
}

module.exports = {
  logEvent,
  getAnalyticsSummary,
  getAnalyticsLogs,
  trackEvent
};
