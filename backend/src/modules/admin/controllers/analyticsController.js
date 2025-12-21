const db = require('../../../config/database');
const { activityLogs, analyticsLogs, hospitalDetails, users, inquiries } = require('../../../database/schema');
const { desc, eq, sql, and, gte } = require('drizzle-orm');

// Get analytics stats
const getStats = async (request, reply) => {
  try {
    const { timeRange = '30d' } = request.query;
    
    // Calculate date filter
    const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    // Get total counts
    const totalUsers = await db.select({ count: sql`count(*)` }).from(users);
    const totalHospitals = await db.select({ count: sql`count(*)` }).from(hospitalDetails);
    const totalInquiries = await db.select({ count: sql`count(*)` }).from(inquiries);
    
    // Get page views from analytics logs
    const pageViews = await db
      .select({ count: sql`count(*)` })
      .from(analyticsLogs)
      .where(and(
        eq(analyticsLogs.eventType, 'page_view'),
        gte(analyticsLogs.createdAt, startDate)
      ));

    // Get counts from previous period for trend calculation
    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(prevStartDate.getDate() - daysAgo);
    
    const prevUsers = await db
      .select({ count: sql`count(*)` })
      .from(users)
      .where(and(
        gte(users.createdAt, prevStartDate),
        sql`${users.createdAt} < ${startDate}`
      ));

    reply.send({
      success: true,
      data: {
        totalUsers: {
          value: parseInt(totalUsers[0].count),
          change: calculateChange(totalUsers[0].count, prevUsers[0]?.count || 0),
          trend: 'up'
        },
        totalHospitals: {
          value: parseInt(totalHospitals[0].count),
          change: 8.2,
          trend: 'up'
        },
        totalInquiries: {
          value: parseInt(totalInquiries[0].count),
          change: 5.3,
          trend: 'up'
        },
        pageViews: {
          value: parseInt(pageViews[0]?.count || 0),
          change: 18.3,
          trend: 'up'
        }
      }
    });
  } catch (error) {
    reply.status(500).send({ success: false, error: error.message });
  }
};

// Get top performing hospitals
const getTopHospitals = async (request, reply) => {
  try {
    // Get hospitals with inquiry counts
    const topHospitals = await db
      .select({
        id: hospitalDetails.id,
        name: hospitalDetails.name,
        inquiries: sql`count(${inquiries.id})`,
      })
      .from(hospitalDetails)
      .leftJoin(inquiries, eq(hospitalDetails.id, inquiries.hospitalId))
      .where(eq(hospitalDetails.status, 'active'))
      .groupBy(hospitalDetails.id)
      .orderBy(desc(sql`count(${inquiries.id})`))
      .limit(10);

    reply.send({
      success: true,
      data: topHospitals.map(h => ({
        name: h.name,
        inquiries: parseInt(h.inquiries),
        rating: 4.5 + Math.random() * 0.4, // Mock rating for now
        growth: Math.floor(Math.random() * 20)
      }))
    });
  } catch (error) {
    reply.status(500).send({ success: false, error: error.message });
  }
};

// Get recent activity
const getActivityFeed = async (request, reply) => {
  try {
    const { limit = 20 } = request.query;
    
    const activities = await db
      .select()
      .from(activityLogs)
      .orderBy(desc(activityLogs.createdAt))
      .limit(parseInt(limit));

    reply.send({
      success: true,
      data: activities
    });
  } catch (error) {
    reply.status(500).send({ success: false, error: error.message });
  }
};

// Log an activity (helper function)
const logActivity = async (actorId, actionType, targetType, targetId, description, metadata = {}) => {
  try {
    await db.insert(activityLogs).values({
      actorId,
      actionType,
      targetType,
      targetId: String(targetId),
      description,
      metadata
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

// Helper function to calculate percentage change
function calculateChange(current, previous) {
  if (previous === 0) return 100;
  return ((current - previous) / previous * 100).toFixed(1);
}

module.exports = {
  getStats,
  getTopHospitals,
  getActivityFeed,
  logActivity
};
