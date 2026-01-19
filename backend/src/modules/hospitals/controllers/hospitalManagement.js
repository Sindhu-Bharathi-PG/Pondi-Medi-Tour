const { eq, desc, and } = require('drizzle-orm');
const db = require('../../../config/database');
const { users, doctors, treatments, packages, inquiries, hospitalDetails } = require('../../../database/schema');

// Helper to get hospital ID from user
const getHospitalIdFromUser = async (userId) => {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  
  if (user?.hospitalId) return user.hospitalId;

  // Auto-link logic for dev environment/recovery
  if (user && user.userType === 'hospital') {
      const [hospital] = await db.select().from(hospitalDetails).limit(1);
      if (hospital) {
          console.log(`Auto-linking user ${userId} to hospital ${hospital.id}`);
          await db.update(users).set({ hospitalId: hospital.id }).where(eq(users.id, userId));
          return hospital.id;
      }
  }
  
  return null;
};

// ============================================
// DOCTORS CRUD
// ============================================

const getMyDoctors = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const doctorsList = await db.select().from(doctors)
      .where(eq(doctors.hospitalId, hospitalId))
      .orderBy(desc(doctors.createdAt));

    return doctorsList;
  } catch (error) {
    console.error('Get doctors error:', error);
    return reply.code(500).send({ error: 'Failed to fetch doctors' });
  }
};

const addDoctor = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const [newDoctor] = await db.insert(doctors).values({
      ...request.body,
      hospitalId
    }).returning();

    return reply.code(201).send(newDoctor);
  } catch (error) {
    console.error('Add doctor error:', error);
    return reply.code(500).send({ error: 'Failed to add doctor' });
  }
};

const updateDoctor = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const doctorId = parseInt(request.params.id);
    console.log(`[DEBUG] Update Check: DocID=${doctorId}, HospID=${hospitalId}`);

    // Verify doctor belongs to this hospital
    const [existingDoctor] = await db.select().from(doctors)
      .where(and(eq(doctors.id, doctorId), eq(doctors.hospitalId, hospitalId)));

    if (!existingDoctor) {
      const [anyDoc] = await db.select().from(doctors).where(eq(doctors.id, doctorId));
      console.log(`[DEBUG] Update Failed. Existing match? false. Doctor Exists Globally? ${!!anyDoc} (Global HospID: ${anyDoc?.hospitalId})`);
      return reply.code(404).send({ error: 'Doctor not found' });
    }

    const [updated] = await db.update(doctors)
      .set({ ...request.body, updatedAt: new Date() })
      .where(eq(doctors.id, doctorId))
      .returning();

    return updated;
  } catch (error) {
    console.error('Update doctor error:', error);
    return reply.code(500).send({ error: 'Failed to update doctor' });
  }
};

const deleteDoctor = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const doctorId = parseInt(request.params.id);

    // Verify doctor belongs to this hospital
    const [existingDoctor] = await db.select().from(doctors)
      .where(and(eq(doctors.id, doctorId), eq(doctors.hospitalId, hospitalId)));

    if (!existingDoctor) {
      return reply.code(404).send({ error: 'Doctor not found' });
    }

    await db.delete(doctors).where(eq(doctors.id, doctorId));

    return { message: 'Doctor deleted successfully' };
  } catch (error) {
    console.error('Delete doctor error:', error);
    return reply.code(500).send({ error: 'Failed to delete doctor' });
  }
};

// ============================================
// TREATMENTS CRUD
// ============================================

const getMyTreatments = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const treatmentsList = await db.select().from(treatments)
      .where(eq(treatments.hospitalId, hospitalId))
      .orderBy(desc(treatments.createdAt));

    return treatmentsList;
  } catch (error) {
    console.error('Get treatments error:', error);
    return reply.code(500).send({ error: 'Failed to fetch treatments' });
  }
};

const addTreatment = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const [newTreatment] = await db.insert(treatments).values({
      ...request.body,
      hospitalId
    }).returning();

    return reply.code(201).send(newTreatment);
  } catch (error) {
    console.error('Add treatment error:', error);
    return reply.code(500).send({ error: 'Failed to add treatment' });
  }
};

const updateTreatment = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const treatmentId = parseInt(request.params.id);
    console.log('[Treatment Update] ID:', treatmentId, 'Body:', request.body);

    const [existingTreatment] = await db.select().from(treatments)
      .where(and(eq(treatments.id, treatmentId), eq(treatments.hospitalId, hospitalId)));

    if (!existingTreatment) {
      return reply.code(404).send({ error: 'Treatment not found' });
    }

    // Build update data carefully with only valid fields
    const updateData = {
      updatedAt: new Date()
    };

    // Only include valid fields from request body
    const allowedFields = [
      'name', 'slug', 'category', 'subCategory',
      'shortDescription', 'fullDescription', 'procedureSteps',
      'technology', 'successRate', 'hospitalStay', 'recoveryTime',
      'preRequisites', 'minPrice', 'maxPrice', 'insuranceCovered',
      'thumbnailUrl', 'isPopular'
    ];

    for (const field of allowedFields) {
      if (request.body[field] !== undefined) {
        updateData[field] = request.body[field];
      }
    }

    console.log('[Treatment Update] Update data:', updateData);

    const [updated] = await db.update(treatments)
      .set(updateData)
      .where(eq(treatments.id, treatmentId))
      .returning();

    console.log('[Treatment Update] Success:', updated);
    return updated;
  } catch (error) {
    console.error('Update treatment error:', error);
    return reply.code(500).send({ error: 'Failed to update treatment', details: error.message });
  }
};

const deleteTreatment = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const treatmentId = parseInt(request.params.id);

    const [existingTreatment] = await db.select().from(treatments)
      .where(and(eq(treatments.id, treatmentId), eq(treatments.hospitalId, hospitalId)));

    if (!existingTreatment) {
      return reply.code(404).send({ error: 'Treatment not found' });
    }

    await db.delete(treatments).where(eq(treatments.id, treatmentId));

    return { message: 'Treatment deleted successfully' };
  } catch (error) {
    console.error('Delete treatment error:', error);
    return reply.code(500).send({ error: 'Failed to delete treatment' });
  }
};

// ============================================
// INQUIRIES
// ============================================

const getMyInquiries = async (request, reply) => {
  try {
    const userId = request.user.userId;
    console.log(`[getMyInquiries] Request received from User ID: ${userId}`);
    
    const hospitalId = await getHospitalIdFromUser(userId);
    console.log(`[getMyInquiries] Resolved Hospital ID: ${hospitalId}`);
    
    if (!hospitalId) {
      console.log('[getMyInquiries] ERROR: No hospital linked to this user');
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    // Query all columns from inquiries table
    const { sql } = require('drizzle-orm');
    const inquiriesList = await db.execute(sql`
      SELECT 
        id,
        hospital_id as "hospitalId",
        patient_name as "patientName",
        email,
        phone,
        country,
        subject,
        message,
        COALESCE(status, 'pending') as status,
        COALESCE(priority, 'normal') as priority,
        treatment_type as "treatmentType",
        package_name as "packageName",
        package_id as "packageId",
        inquiry_type as "inquiryType",
        COALESCE(source, 'website') as source,
        source_page as "sourcePage",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM inquiries 
      WHERE hospital_id = ${hospitalId}
      ORDER BY created_at DESC
    `);

    console.log(`[getMyInquiries] Found ${inquiriesList.length} inquiries for hospital ${hospitalId}`);
    
    return inquiriesList;
  } catch (error) {
    console.error('Get inquiries error:', error);
    return reply.code(500).send({ error: 'Failed to fetch inquiries', details: error.message });
  }
};

const updateInquiry = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const inquiryId = parseInt(request.params.id);
    console.log('[Inquiry Update] ID:', inquiryId, 'Body:', request.body);

    const [existingInquiry] = await db.select().from(inquiries)
      .where(and(eq(inquiries.id, inquiryId), eq(inquiries.hospitalId, hospitalId)));

    if (!existingInquiry) {
      return reply.code(404).send({ error: 'Inquiry not found' });
    }

    // Build update data carefully
    const updateData = {
      updatedAt: new Date()
    };

    // Only include valid fields from request body
    if (request.body.status) {
      updateData.status = request.body.status;
    }
    if (request.body.priority) {
      updateData.priority = request.body.priority;
    }
    if (request.body.respondedAt) {
      updateData.respondedAt = new Date(request.body.respondedAt);
    }
    if (request.body.responseNotes) {
      updateData.responseNotes = request.body.responseNotes;
    }

    console.log('[Inquiry Update] Update data:', updateData);

    const [updated] = await db.update(inquiries)
      .set(updateData)
      .where(eq(inquiries.id, inquiryId))
      .returning();

    console.log('[Inquiry Update] Success:', updated);
    return updated;
  } catch (error) {
    console.error('Update inquiry error:', error);
    return reply.code(500).send({ error: 'Failed to update inquiry', details: error.message });
  }
};

// ============================================
// REVIEWS
// ============================================

const getMyReviews = async (request, reply) => {
  try {
    const { reviews } = require('../../../database/schema');
    const { sql } = require('drizzle-orm');
    
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    // Fetch all reviews for this hospital
    const reviewsList = await db.select().from(reviews)
      .where(eq(reviews.hospitalId, hospitalId))
      .orderBy(desc(reviews.createdAt));

    // Calculate statistics
    const stats = await db.select({
      totalReviews: sql`COUNT(*)::int`,
      averageRating: sql`COALESCE(ROUND(AVG(${reviews.rating})::numeric, 1), 0.0)`,
      fiveStarCount: sql`SUM(CASE WHEN ${reviews.rating} = 5 THEN 1 ELSE 0 END)::int`,
      fourStarCount: sql`SUM(CASE WHEN ${reviews.rating} = 4 THEN 1 ELSE 0 END)::int`,
      threeStarCount: sql`SUM(CASE WHEN ${reviews.rating} = 3 THEN 1 ELSE 0 END)::int`,
      twoStarCount: sql`SUM(CASE WHEN ${reviews.rating} = 2 THEN 1 ELSE 0 END)::int`,
      oneStarCount: sql`SUM(CASE WHEN ${reviews.rating} = 1 THEN 1 ELSE 0 END)::int`,
      verifiedCount: sql`SUM(CASE WHEN ${reviews.isVerified} = true THEN 1 ELSE 0 END)::int`
    })
    .from(reviews)
    .where(eq(reviews.hospitalId, hospitalId));

    return {
      reviews: reviewsList,
      stats: stats[0] || {
        totalReviews: 0,
        averageRating: 0,
        fiveStarCount: 0,
        fourStarCount: 0,
        threeStarCount: 0,
        twoStarCount: 0,
        oneStarCount: 0,
        verifiedCount: 0
      }
    };
  } catch (error) {
    console.error('Get reviews error:', error);
    return reply.code(500).send({ error: 'Failed to fetch reviews' });
  }
};

// ============================================
// PACKAGES CRUD
// ============================================

const getMyPackages = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const packagesList = await db.select().from(packages)
      .where(eq(packages.hospitalId, hospitalId))
      .orderBy(desc(packages.createdAt));

    return packagesList;
  } catch (error) {
    console.error('Get packages error:', error);
    return reply.code(500).send({ error: 'Failed to fetch packages' });
  }
};

const addPackage = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const [newPackage] = await db.insert(packages).values({
      ...request.body,
      hospitalId
    }).returning();

    return reply.code(201).send(newPackage);
  } catch (error) {
    console.error('Add package error:', error);
    return reply.code(500).send({ error: 'Failed to add package' });
  }
};

const updatePackage = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const packageId = parseInt(request.params.id);

    const [existingPackage] = await db.select().from(packages)
      .where(and(eq(packages.id, packageId), eq(packages.hospitalId, hospitalId)));

    if (!existingPackage) {
      return reply.code(404).send({ error: 'Package not found' });
    }

    const [updated] = await db.update(packages)
      .set({ ...request.body, updatedAt: new Date() })
      .where(eq(packages.id, packageId))
      .returning();

    return updated;
  } catch (error) {
    console.error('Update package error:', error);
    return reply.code(500).send({ error: 'Failed to update package' });
  }
};

const deletePackage = async (request, reply) => {
  try {
    const hospitalId = await getHospitalIdFromUser(request.user.userId);
    if (!hospitalId) {
      return reply.code(404).send({ error: 'No hospital linked to this user' });
    }

    const packageId = parseInt(request.params.id);

    const [existingPackage] = await db.select().from(packages)
      .where(and(eq(packages.id, packageId), eq(packages.hospitalId, hospitalId)));

    if (!existingPackage) {
      return reply.code(404).send({ error: 'Package not found' });
    }

    await db.delete(packages).where(eq(packages.id, packageId));

    return { message: 'Package deleted successfully' };
  } catch (error) {
    console.error('Delete package error:', error);
    return reply.code(500).send({ error: 'Failed to delete package' });
  }
};

module.exports = {
  // Doctors
  getMyDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  // Treatments
  getMyTreatments,
  addTreatment,
  updateTreatment,
  deleteTreatment,
  // Inquiries
  getMyInquiries,
  updateInquiry,
  // Reviews
  getMyReviews,
  // Packages
  getMyPackages,
  addPackage,
  updatePackage,
  deletePackage
};
