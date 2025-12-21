const { eq, sql, desc, and, gt } = require('drizzle-orm');
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
 * Get dashboard statistics for the logged-in hospital user
 */
const getMyDashboardStats = async (request, reply) => {
  try {
    console.log('=== DASHBOARD API CALLED ===');
    console.log('request.user:', request.user);
    
    const userId = request.user.userId;
    console.log('User ID from token:', userId);
    
    // Get the hospital ID for this user
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    console.log('User from DB:', user ? { id: user.id, email: user.email, hospitalId: user.hospitalId } : 'NOT FOUND');
    
    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }
    
    if (!user.hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user', userId: user.id });
    }
    
    const hospitalId = user.hospitalId;
    console.log('Hospital ID:', hospitalId);
    
    // Get hospital details
    const [hospital] = await db.select().from(hospitalDetails).where(eq(hospitalDetails.id, hospitalId)).limit(1);
    console.log('Hospital from DB:', hospital ? { id: hospital.id, name: hospital.name } : 'NOT FOUND');
    
    // Get counts - do them one by one for easier debugging
    console.log('Fetching doctors count...');
    const doctorsResult = await db.select({ count: sql`COUNT(*)::int` }).from(doctors).where(eq(doctors.hospitalId, hospitalId));
    console.log('Doctors count:', doctorsResult[0]?.count);
    
    console.log('Fetching treatments count...');
    const treatmentsResult = await db.select({ count: sql`COUNT(*)::int` }).from(treatments).where(eq(treatments.hospitalId, hospitalId));
    console.log('Treatments count:', treatmentsResult[0]?.count);
    
    console.log('Fetching packages count...');
    const packagesResult = await db.select({ count: sql`COUNT(*)::int` }).from(packages).where(
      and(eq(packages.hospitalId, hospitalId), eq(packages.isActive, true))
    );
    console.log('Packages count:', packagesResult[0]?.count);
    
    console.log('Fetching pending inquiries count...');
    const pendingInquiriesResult = await db.select({ count: sql`COUNT(*)::int` }).from(inquiries).where(
      and(eq(inquiries.hospitalId, hospitalId), eq(inquiries.status, 'pending'))
    );
    console.log('Pending inquiries:', pendingInquiriesResult[0]?.count);
    
    console.log('Fetching total inquiries count...');
    const totalInquiriesResult = await db.select({ count: sql`COUNT(*)::int` }).from(inquiries).where(eq(inquiries.hospitalId, hospitalId));
    console.log('Total inquiries:', totalInquiriesResult[0]?.count);
    
    console.log('Fetching recent inquiries...');
    const recentInquiriesResult = await db.select({
      id: inquiries.id,
      patientName: inquiries.patientName,
      email: inquiries.email,
      country: inquiries.country,
      treatmentType: inquiries.treatmentType,
      subject: inquiries.subject,
      status: inquiries.status,
      priority: inquiries.priority,
      createdAt: inquiries.createdAt
    })
    .from(inquiries)
    .where(eq(inquiries.hospitalId, hospitalId))
    .orderBy(desc(inquiries.createdAt))
    .limit(5);
    console.log('Recent inquiries count:', recentInquiriesResult.length);
    
    console.log('Fetching upcoming appointments...');
    let upcomingAppointmentsResult = [];
    try {
      upcomingAppointmentsResult = await db.select({
        id: appointments.id,
        patientName: appointments.patientName,
        patientPhone: appointments.patientPhone,
        appointmentDate: appointments.appointmentDate,
        status: appointments.status,
        reason: appointments.reason,
        doctorId: appointments.doctorId
      })
      .from(appointments)
      .where(eq(appointments.hospitalId, hospitalId))
      .limit(5);
    } catch (aptErr) {
      console.log('Appointments table might not exist, skipping:', aptErr.message);
      upcomingAppointmentsResult = [];
    }
    console.log('Upcoming appointments:', upcomingAppointmentsResult.length);
    
    // Calculate profile completion percentage
    const profileFields = [
      hospital?.name,
      hospital?.shortDescription,
      hospital?.fullDescription,
      hospital?.logoUrl,
      hospital?.coverUrl,
      hospital?.phone,
      hospital?.email,
      hospital?.website,
      hospital?.location,
      hospital?.infrastructure
    ];
    const filledFields = profileFields.filter(f => f !== null && f !== undefined && f !== '').length;
    const profileCompletion = Math.round((filledFields / profileFields.length) * 100);
    
    console.log('Profile completion:', profileCompletion + '%');
    console.log('=== DASHBOARD API SUCCESS ===');
    
    // Return dashboard data
    return {
      hospital: {
        id: hospital?.id,
        name: hospital?.name,
        status: hospital?.status,
        type: hospital?.type,
        logoUrl: hospital?.logoUrl,
        coverUrl: hospital?.coverUrl,
        gallery: hospital?.gallery || []
      },
      stats: {
        doctorsCount: doctorsResult[0]?.count || 0,
        treatmentsCount: treatmentsResult[0]?.count || 0,
        packagesCount: packagesResult[0]?.count || 0,
        pendingInquiries: pendingInquiriesResult[0]?.count || 0,
        totalInquiries: totalInquiriesResult[0]?.count || 0,
        profileCompletion
      },
      recentInquiries: recentInquiriesResult,
      upcomingAppointments: upcomingAppointmentsResult
    };
    
  } catch (error) {
    console.error('=== DASHBOARD API ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return reply.code(500).send({ error: 'Failed to fetch dashboard stats', details: error.message });
  }
};

module.exports = {
  getMyDashboardStats
};
