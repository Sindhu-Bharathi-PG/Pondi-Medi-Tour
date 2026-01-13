const { eq, sql, desc, and, gte } = require('drizzle-orm');
const db = require('../../../config/database');
const { 
  users, 
  hospitalDetails, 
  doctors, 
  treatments, 
  packages, 
  inquiries, 
  appointments 
} = require('../../../database/schema');

/**
 * Get analytics data for hospital dashboard
 * Returns revenue trends, inquiry stats, appointment stats, and treatment breakdowns
 */
const getHospitalAnalytics = async (request, reply) => {
  try {
    const userId = request.user.userId;
    
    // Get the hospital ID for this user
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    if (!user || !user.hospitalId) {
      return reply.code(404).send({ error: 'Hospital not found for this user' });
    }
    
    const hospitalId = user.hospitalId;
    
    // Get date ranges
    const now = new Date();
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Get monthly inquiry counts for last 6 months
    const monthlyInquiries = await db.execute(sql`
      SELECT 
        TO_CHAR(created_at, 'Mon') as month,
        COUNT(*)::int as count
      FROM inquiries 
      WHERE hospital_id = ${hospitalId} 
        AND created_at >= ${sixMonthsAgo}
      GROUP BY TO_CHAR(created_at, 'Mon'), DATE_TRUNC('month', created_at)
      ORDER BY DATE_TRUNC('month', created_at)
      LIMIT 6
    `);
    
    // Get inquiry stats by status
    const inquiryStats = await db.execute(sql`
      SELECT 
        status,
        COUNT(*)::int as count
      FROM inquiries 
      WHERE hospital_id = ${hospitalId}
      GROUP BY status
    `);
    
    // Get treatment distribution
    const treatmentStats = await db.execute(sql`
      SELECT 
        treatment_type as name,
        COUNT(*)::int as value
      FROM inquiries 
      WHERE hospital_id = ${hospitalId}
        AND treatment_type IS NOT NULL
      GROUP BY treatment_type
      ORDER BY count DESC
      LIMIT 5
    `);
    
    // Get monthly appointments for last 6 months
    let monthlyAppointments = [];
    try {
      const aptResult = await db.execute(sql`
        SELECT 
          TO_CHAR(appointment_date, 'Mon') as month,
          COUNT(*)::int as count
        FROM appointments 
        WHERE hospital_id = ${hospitalId}
          AND appointment_date >= ${sixMonthsAgo}
        GROUP BY TO_CHAR(appointment_date, 'Mon'), DATE_TRUNC('month', appointment_date)
        ORDER BY DATE_TRUNC('month', appointment_date)
        LIMIT 6
      `);
      monthlyAppointments = aptResult.rows || [];
    } catch (err) {
      console.log('Appointments table might not exist:', err.message);
    }
    
    // Get package performance
    const packageStats = await db.execute(sql`
      SELECT 
        name,
        price::int as price,
        COALESCE(views, 0)::int as views
      FROM packages 
      WHERE hospital_id = ${hospitalId}
        AND is_active = true
      ORDER BY views DESC
      LIMIT 5
    `);
    
    // Get doctor count
    const [doctorCount] = await db.select({ count: sql`COUNT(*)::int` })
      .from(doctors)
      .where(eq(doctors.hospitalId, hospitalId));
    
    // Get total inquiries this month
    const [inquiriesThisMonth] = await db.select({ count: sql`COUNT(*)::int` })
      .from(inquiries)
      .where(and(
        eq(inquiries.hospitalId, hospitalId),
        gte(inquiries.createdAt, oneMonthAgo)
      ));
    
    // Get total inquiries last month (for comparison)
    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    const [inquiriesLastMonth] = await db.select({ count: sql`COUNT(*)::int` })
      .from(inquiries)
      .where(and(
        eq(inquiries.hospitalId, hospitalId),
        gte(inquiries.createdAt, twoMonthsAgo),
        sql`${inquiries.createdAt} < ${oneMonthAgo}`
      ));
    
    // Calculate percentage change
    const thisMonth = inquiriesThisMonth?.count || 0;
    const lastMonth = inquiriesLastMonth?.count || 1; // Avoid division by zero
    const percentageChange = ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1);
    
    // Response with analytics data
    return {
      success: true,
      data: {
        summary: {
          totalDoctors: doctorCount?.count || 0,
          inquiriesThisMonth: thisMonth,
          inquiriesChange: percentageChange,
          conversionRate: 68, // Placeholder - calculate from actual conversions
        },
        monthlyTrends: {
          inquiries: monthlyInquiries.rows || [],
          appointments: monthlyAppointments
        },
        inquiryStats: inquiryStats.rows || [],
        treatmentDistribution: treatmentStats.rows || [],
        topPackages: packageStats.rows || []
      }
    };
    
  } catch (error) {
    console.error('Error fetching hospital analytics:', error.message);
    return reply.code(500).send({ 
      error: 'Failed to fetch analytics', 
      details: error.message 
    });
  }
};

module.exports = {
  getHospitalAnalytics
};
