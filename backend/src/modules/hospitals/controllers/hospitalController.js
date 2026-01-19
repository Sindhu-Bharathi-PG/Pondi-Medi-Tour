const { eq } = require('drizzle-orm');
const db = require('../../../config/database');
const { hospitalDetails, users, doctors } = require('../../../database/schema');

const createHospital = async (req, reply) => {
  try {
    const [hospital] = await db.insert(hospitalDetails).values(req.body).returning();
    reply.code(201).send(hospital);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error', message: err.message });
  }
};

const getAllHospitals = async (req, reply) => {
  try {
    const { reviews } = require('../../../database/schema');
    const { sql } = require('drizzle-orm');
    
    // Single optimized query with LEFT JOIN to get all hospitals and their ratings
    const hospitalsWithRatings = await db.select({
      id: hospitalDetails.id,
      name: hospitalDetails.name,
      slug: hospitalDetails.slug,
      type: hospitalDetails.type,
      status: hospitalDetails.status,
      establishmentYear: hospitalDetails.establishmentYear,
      shortDescription: hospitalDetails.shortDescription,
      fullDescription: hospitalDetails.fullDescription,
      infrastructure: hospitalDetails.infrastructure,
      specializedCenters: hospitalDetails.specializedCenters,
      accreditations: hospitalDetails.accreditations,
      location: hospitalDetails.location,
      logoUrl: hospitalDetails.logoUrl,
      coverUrl: hospitalDetails.coverUrl,
      gallery: hospitalDetails.gallery,
      phone: hospitalDetails.phone,
      email: hospitalDetails.email,
      website: hospitalDetails.website,
      emergencyPhone: hospitalDetails.emergencyPhone,
      internationalServices: hospitalDetails.internationalServices,
      avgRating: sql`COALESCE(ROUND(AVG(CASE WHEN ${reviews.isApproved} = true THEN ${reviews.rating} END)::numeric, 1), 4.5)`,
      reviewCount: sql`COUNT(CASE WHEN ${reviews.isApproved} = true THEN 1 END)::int`
    })
    .from(hospitalDetails)
    .leftJoin(reviews, eq(reviews.hospitalId, hospitalDetails.id))
    .groupBy(
      hospitalDetails.id,
      hospitalDetails.name,
      hospitalDetails.slug,
      hospitalDetails.type,
      hospitalDetails.status,
      hospitalDetails.establishmentYear,
      hospitalDetails.shortDescription,
      hospitalDetails.fullDescription,
      hospitalDetails.infrastructure,
      hospitalDetails.specializedCenters,
      hospitalDetails.accreditations,
      hospitalDetails.location,
      hospitalDetails.logoUrl,
      hospitalDetails.coverUrl,
      hospitalDetails.gallery,
      hospitalDetails.phone,
      hospitalDetails.email,
      hospitalDetails.website,
      hospitalDetails.emergencyPhone,
      hospitalDetails.internationalServices
    );
    
    // Transform for frontend
    const transformed = hospitalsWithRatings.map(h => ({
      id: h.id,
      name: h.name,
      slug: h.slug,
      type: h.type || 'Private',
      status: h.status || 'pending',
      establishmentYear: h.establishmentYear,
      shortDescription: h.shortDescription,
      fullDescription: h.fullDescription,
      infrastructure: h.infrastructure,
      specializedCenters: h.specializedCenters || [],
      accreditations: Array.isArray(h.accreditations) 
        ? h.accreditations.map(a => typeof a === 'object' ? a.name : a).filter(Boolean)
        : [],
      location: h.location,
      logoUrl: h.logoUrl,
      coverUrl: h.coverUrl,
      gallery: h.gallery || [],
      phone: h.phone,
      email: h.email,
      website: h.website,
      emergencyPhone: h.emergencyPhone,
      internationalServices: h.internationalServices,
      rating: parseFloat(h.avgRating),
      reviewCount: parseInt(h.reviewCount)
    }));
    
    reply.send(transformed);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

const getHospital = async (req, reply) => {
  const { id } = req.params;
  try {
    // Try to find by ID first, then by slug
    let hospital;
    if (!isNaN(parseInt(id))) {
      [hospital] = await db.select().from(hospitalDetails).where(eq(hospitalDetails.id, parseInt(id)));
    }
    
    // If not found by ID, try by slug
    if (!hospital) {
      const { eq: eqSlug } = require('drizzle-orm');
      [hospital] = await db.select().from(hospitalDetails).where(eq(hospitalDetails.slug, id));
    }
    
    if (!hospital) {
      return reply.code(404).send({ error: 'Hospital not found' });
    }

    // Import related tables
    const { doctors, treatments, packages, reviews } = require('../../../database/schema');
    const { sql } = require('drizzle-orm');
    
    // Fetch related data with error handling
    let relatedDoctors = [];
    let relatedTreatments = [];
    let relatedPackages = [];
    let hospitalReviews = [];
    let stats = { avgRating: 4.5, totalReviews: 0 };
    
    try {
      [relatedDoctors, relatedTreatments, hospitalReviews] = await Promise.all([
        db.select().from(doctors).where(eq(doctors.hospitalId, hospital.id)).limit(10),
        db.select().from(treatments).where(eq(treatments.hospitalId, hospital.id)).limit(10),
        // Fetch approved reviews
        db.select().from(reviews).where(sql`${reviews.hospitalId} = ${hospital.id} AND ${reviews.isApproved} = true`).orderBy(sql`${reviews.createdAt} DESC`).limit(20),
      ]);
      
      // Try packages separately (might fail if table schema differs)
      try {
        relatedPackages = await db.select({
          id: packages.id,
          name: packages.name,
          price: packages.price,
          shortDescription: packages.shortDescription,
          inclusions: packages.inclusions
        }).from(packages).where(eq(packages.hospitalId, hospital.id)).limit(6);
      } catch (pkgErr) {
        req.log.warn('Failed to fetch packages:', pkgErr.message);
      }
      
      // Calculate average rating
      const reviewStats = await db.select({
        avgRating: sql`COALESCE(ROUND(AVG(${reviews.rating})::numeric, 1), 4.5)`,
        totalReviews: sql`COUNT(*)::int`
      }).from(reviews).where(sql`${reviews.hospitalId} = ${hospital.id} AND ${reviews.isApproved} = true`);
      
      stats = reviewStats[0] || { avgRating: 4.5, totalReviews: 0 };
    } catch (relatedErr) {
      req.log.warn('Failed to fetch related data:', relatedErr.message);
    }

    // Transform to front-end expected format
    const transformed = {
      id: hospital.id,
      name: hospital.name,
      slug: hospital.slug,
      type: hospital.type || 'Private',
      establishmentYear: hospital.establishmentYear || 2000,
      beds: hospital.infrastructure?.totalBeds || hospital.infrastructure?.beds || 100,
      
      // Accreditations - ensure it's an array of strings
      accreditations: Array.isArray(hospital.accreditations) 
        ? hospital.accreditations.map(a => typeof a === 'object' ? a.name : a).filter(Boolean)
        : [],
      
      // Location object - avoid duplication if city and state are the same
      location: (() => {
        const city = hospital.location?.city || 'Pondicherry';
        const state = hospital.location?.state || 'India';
        const address = hospital.location?.address;
        const cityLower = city.toLowerCase();
        const stateLower = state.toLowerCase();
        
        // Avoid redundancy: Pondicherry is in Puducherry union territory
        const isRedundant = cityLower === stateLower || 
          (cityLower === 'pondicherry' && stateLower === 'puducherry') ||
          (cityLower === 'puducherry' && stateLower === 'pondicherry');
        
        const displayLocation = isRedundant ? `${city}, India` : `${city}, ${state}`;
          
        return {
          address: address || displayLocation,
          city: city,
          state: isRedundant ? 'Puducherry' : state,
          country: hospital.location?.country || 'India',
          coordinates: hospital.location?.coordinates || null
        };
      })(),
      
      // Contact object
      contact: {
        phone: hospital.phone || '',
        emergency: hospital.emergencyPhone || '',
        email: hospital.email || '',
        website: hospital.website || ''
      },
      
      // Description object
      description: {
        short: hospital.shortDescription || '',
        long: hospital.fullDescription || hospital.shortDescription || ''
      },
      
      // Specialties
      specialties: hospital.specializedCenters || [],
      
      // Infrastructure details
      equipment: hospital.infrastructure?.technologies || [],
      facilities: hospital.infrastructure?.amenities || hospital.infrastructure?.facilities || [],
      
      // Departments (generate from specialties if not provided)
      departments: (hospital.specializedCenters || []).map((center, idx) => ({
        name: center,
        doctors: Math.floor(Math.random() * 5) + 2,
        procedures: `${Math.floor(Math.random() * 100) + 50}+ procedures`,
        image: `https://images.unsplash.com/photo-${1550000000000 + idx * 1000}?w=400`,
        description: `Our ${center} department offers comprehensive care with the latest technology and experienced specialists.`
      })),
      
      // Photos/Gallery - ensure proper array formatting and filter invalid URLs
      photos: (() => {
        let photoArray = [];
        // Check if gallery exists and is an array
        if (Array.isArray(hospital.gallery) && hospital.gallery.length > 0) {
          photoArray = hospital.gallery.filter(url => 
            url && typeof url === 'string' && url.trim() !== ''
          );
        }
        // If no valid photos in gallery, try coverUrl
        if (photoArray.length === 0 && hospital.coverUrl && typeof hospital.coverUrl === 'string' && hospital.coverUrl.trim() !== '') {
          photoArray = [hospital.coverUrl];
        }
        return photoArray;
      })(),
      logo: hospital.logoUrl,
      
      // Related data
      doctors: relatedDoctors.map(d => ({
        id: d.id,
        name: d.name,
        specialty: d.specialization,
        qualification: d.qualifications,
        experience: d.experience,
        image: d.photoUrl,
        available: true
      })),
      
      treatments: relatedTreatments.map(t => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
        category: t.category,
        price: t.minPrice,
        description: t.shortDescription
      })),
      
      packages: relatedPackages.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.shortDescription,
        highlights: p.inclusions || []
      })),
      
      // Real reviews from database
      reviews: hospitalReviews.map(r => ({
        id: r.id,
        user: r.userName,
        rating: r.rating,
        date: new Date(r.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        comment: r.comment,
        origin: r.origin,
        title: r.title,
        verified: r.isVerified,
        treatmentType: r.treatmentType
      })),
      
      // Highlights
      highlights: hospital.infrastructure?.amenities || [
        'International patient services',
        'Multilingual staff',
        'Modern facilities'
      ],
      
      // Additional stats
      patientCount: hospital.internationalServices?.patientsServed || '1000+',
      rating: 4.8
    };

    reply.send(transformed);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error', details: err.message });
  }
};


// Get hospital profile for logged-in user
const getMyHospital = async (req, reply) => {
  try {
    const userId = req.user.userId; // From JWT token
    
    // Get user's hospital_id
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    
    if (!user || !user.hospitalId) {
      return reply.code(404).send({ error: 'No hospital profile linked to this account' });
    }
    
    const [hospital] = await db.select().from(hospitalDetails).where(eq(hospitalDetails.id, user.hospitalId));
    
    if (!hospital) {
      return reply.code(404).send({ error: 'Hospital profile not found' });
    }
    
    reply.send(hospital);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

const updateHospital = async (req, reply) => {
  const { id } = req.params;
  try {
    const [updated] = await db.update(hospitalDetails)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(hospitalDetails.id, id))
      .returning();
    
    if (!updated) {
      return reply.code(404).send({ error: 'Hospital not found' });
    }
    reply.send(updated);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

// Update hospital for logged-in user
const updateMyHospital = async (req, reply) => {
  try {
    const userId = req.user.userId;
    
    // Get user's hospital_id
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    
    if (!user || !user.hospitalId) {
      return reply.code(404).send({ error: 'No hospital profile linked to this account' });
    }
    
    const [updated] = await db.update(hospitalDetails)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(hospitalDetails.id, user.hospitalId))
      .returning();
    
    if (!updated) {
      return reply.code(404).send({ error: 'Hospital not found' });
    }
    
    reply.send(updated);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

// Add photo to hospital
const addPhoto = async (req, reply) => {
  try {
    const userId = req.user.userId;
    const { url, caption } = req.body;
    
    // Get user's hospital_id
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    
    if (!user || !user.hospitalId) {
      return reply.code(404).send({ error: 'No hospital profile linked to this account' });
    }
    
    // Get current photos
    const [hospital] = await db.select().from(hospitalProfiles).where(eq(hospitalProfiles.id, user.hospitalId));
    
    if (!hospital) {
      return reply.code(404).send({ error: 'Hospital not found' });
    }
    
    const currentPhotos = hospital.photos || [];
    const newPhotos = [...currentPhotos, { url, caption, uploadedAt: new Date().toISOString() }];
    
    const [updated] = await db.update(hospitalProfiles)
      .set({ photos: newPhotos, updatedAt: new Date() })
      .where(eq(hospitalProfiles.id, user.hospitalId))
      .returning();
    
    reply.send(updated);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

// Delete photo from hospital
const deletePhoto = async (req, reply) => {
  try {
    const userId = req.user.userId;
    const { index } = req.params;
    
    // Get user's hospital_id
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    
    if (!user || !user.hospitalId) {
      return reply.code(404).send({ error: 'No hospital profile linked to this account' });
    }
    
    // Get current photos
    const [hospital] = await db.select().from(hospitalProfiles).where(eq(hospitalProfiles.id, user.hospitalId));
    
    if (!hospital) {
      return reply.code(404).send({ error: 'Hospital not found' });
    }
    
    const currentPhotos = hospital.photos || [];
    
    if (index < 0 || index >= currentPhotos.length) {
      return reply.code(400).send({ error: 'Invalid photo index' });
    }
    
    const newPhotos = currentPhotos.filter((_, i) => i !== parseInt(index));
    
    const [updated] = await db.update(hospitalProfiles)
      .set({ photos: newPhotos, updatedAt: new Date() })
      .where(eq(hospitalProfiles.id, user.hospitalId))
      .returning();
    
    reply.send(updated);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

const deleteHospital = async (req, reply) => {
  const { id } = req.params;
  try {
    const [deleted] = await db.delete(hospitalProfiles)
      .where(eq(hospitalProfiles.id, id))
      .returning();
      
    if (!deleted) {
      return reply.code(404).send({ error: 'Hospital not found' });
    }
    reply.send({ message: 'Hospital deleted successfully' });
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

const getAllDoctors = async (req, reply) => {
  try {
    const { sql } = require('drizzle-orm');
    
    // Single optimized query with LEFT JOIN to get hospital names
    const doctorsWithHospitals = await db.select({
      id: doctors.id,
      name: doctors.name,
      specialty: doctors.specialty,
      subSpecialty: doctors.subSpecialty,
      credentials: doctors.credentials,
      experience: doctors.experience,
      imageUrl: doctors.imageUrl,
      bio: doctors.bio,
      surgeriesCount: doctors.surgeriesCount,
      publicationsCount: doctors.publicationsCount,
      rating: doctors.rating,
      reviewsCount: doctors.reviewsCount,
      languages: doctors.languages,
      consultationTimings: doctors.consultationTimings,
      isAvailable: doctors.isAvailable,
      isFeatured: doctors.isFeatured,
      education: doctors.education,
      expertise: doctors.expertise,
      internationalTraining: doctors.internationalTraining,
      awards: doctors.awards,
      serviceSlug: doctors.serviceSlug,
      hospitalId: doctors.hospitalId,
      hospitalName: hospitalDetails.name,
    })
    .from(doctors)
    .leftJoin(hospitalDetails, eq(doctors.hospitalId, hospitalDetails.id))
    .where(eq(doctors.isAvailable, true));
    
    // Transform for frontend
    const transformed = doctorsWithHospitals.map(d => ({
      id: d.id,
      name: d.name,
      specialty: d.specialty,
      subSpecialty: d.subSpecialty,
      credentials: d.credentials,
      experience: d.experience,
      imageUrl: d.imageUrl,
      bio: d.bio,
      surgeriesCount: d.surgeriesCount || 0,
      publicationsCount: d.publicationsCount || 0,
      rating: parseFloat(d.rating) || 4.5,
      reviewsCount: d.reviewsCount || 0,
      languages: d.languages || ['English'],
      consultationTimings: d.consultationTimings,
      isAvailable: d.isAvailable,
      isFeatured: d.isFeatured,
      education: d.education,
      expertise: d.expertise || [],
      internationalTraining: d.internationalTraining || [],
      awards: d.awards || [],
      serviceSlug: d.serviceSlug,
      hospitalId: d.hospitalId,
      hospitalName: d.hospitalName || 'Partner Hospital',
    }));
    
    reply.send(transformed);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

const getDoctor = async (req, reply) => {
  const { id } = req.params;
  try {
    const { sql } = require('drizzle-orm');
    
    // Fetch single doctor with hospital details
    const [doctorWithHospital] = await db.select({
      id: doctors.id,
      name: doctors.name,
      specialty: doctors.specialty,
      subSpecialty: doctors.subSpecialty,
      credentials: doctors.credentials,
      experience: doctors.experience,
      imageUrl: doctors.imageUrl,
      bio: doctors.bio,
      surgeriesCount: doctors.surgeriesCount,
      publicationsCount: doctors.publicationsCount,
      rating: doctors.rating,
      reviewsCount: doctors.reviewsCount,
      languages: doctors.languages,
      consultationTimings: doctors.consultationTimings,
      isAvailable: doctors.isAvailable,
      isFeatured: doctors.isFeatured,
      education: doctors.education,
      expertise: doctors.expertise,
      internationalTraining: doctors.internationalTraining,
      awards: doctors.awards,
      serviceSlug: doctors.serviceSlug,
      hospitalId: doctors.hospitalId,
      hospitalName: hospitalDetails.name,
    })
    .from(doctors)
    .leftJoin(hospitalDetails, eq(doctors.hospitalId, hospitalDetails.id))
    .where(eq(doctors.id, parseInt(id)));
    
    if (!doctorWithHospital) {
      return reply.code(404).send({ error: 'Doctor not found' });
    }
    
    // Transform for frontend
    const transformed = {
      id: doctorWithHospital.id,
      name: doctorWithHospital.name,
      specialty: doctorWithHospital.specialty,
      subSpecialty: doctorWithHospital.subSpecialty,
      credentials: doctorWithHospital.credentials,
      experience: doctorWithHospital.experience,
      imageUrl: doctorWithHospital.imageUrl,
      bio: doctorWithHospital.bio,
      surgeriesCount: doctorWithHospital.surgeriesCount || 0,
      publicationsCount: doctorWithHospital.publicationsCount || 0,
      rating: parseFloat(doctorWithHospital.rating) || 4.5,
      reviewsCount: doctorWithHospital.reviewsCount || 0,
      languages: doctorWithHospital.languages || ['English'],
      consultationTimings: doctorWithHospital.consultationTimings,
      isAvailable: doctorWithHospital.isAvailable,
      isFeatured: doctorWithHospital.isFeatured,
      education: doctorWithHospital.education,
      expertise: doctorWithHospital.expertise || [],
      internationalTraining: doctorWithHospital.internationalTraining || [],
      awards: doctorWithHospital.awards || [],
      serviceSlug: doctorWithHospital.serviceSlug,
      hospitalId: doctorWithHospital.hospitalId,
      hospitalName: doctorWithHospital.hospitalName || 'Partner Hospital',
    };
    
    reply.send(transformed);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createHospital,
  getAllHospitals,
  getAllDoctors,
  getDoctor,
  getHospital,
  getMyHospital,
  updateHospital,
  updateMyHospital,
  addPhoto,
  deletePhoto,
  deleteHospital
};
