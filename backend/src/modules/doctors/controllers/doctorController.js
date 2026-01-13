const { eq } = require('drizzle-orm');
const db = require('../../../config/database');
const { doctors, hospitalDetails, users } = require('../../../database/schema');

// ============================================
// PUBLIC ROUTES (No auth required)
// ============================================

const getAllDoctorsPublic = async (req, reply) => {
    try {
        const { limit, featured, hospitalId } = req.query;
        
        let query = db.select({
            id: doctors.id,
            name: doctors.name,
            specialty: doctors.specialty,
            subSpecialty: doctors.subSpecialty,
            experience: doctors.experience,
            imageUrl: doctors.imageUrl,
            bio: doctors.bio,
            rating: doctors.rating,
            reviewsCount: doctors.reviewsCount,
            languages: doctors.languages,
            isFeatured: doctors.isFeatured,
            hospitalId: doctors.hospitalId,
            hospitalName: hospitalDetails.name
        })
        .from(doctors)
        .leftJoin(hospitalDetails, eq(doctors.hospitalId, hospitalDetails.id));
        
        // Filter by hospitalId if provided
        if (hospitalId) {
            query = query.where(eq(doctors.hospitalId, parseInt(hospitalId)));
        }
        
        // Filter by featured if provided
        if (featured === 'true') {
            query = query.where(eq(doctors.isFeatured, true));
        }
        
        const results = await query;
        
        // Apply limit if provided
        const limitedResults = limit ? results.slice(0, parseInt(limit)) : results;
        
        reply.send(limitedResults);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const getDoctorByIdPublic = async (req, reply) => {
    const { id } = req.params;
    try {
        const [doctor] = await db.select({
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
            hospitalId: doctors.hospitalId,
            hospitalName: hospitalDetails.name,
            hospitalSlug: hospitalDetails.slug
        })
        .from(doctors)
        .leftJoin(hospitalDetails, eq(doctors.hospitalId, hospitalDetails.id))
        .where(eq(doctors.id, parseInt(id)));

        if (!doctor) {
            return reply.code(404).send({ error: 'Doctor not found' });
        }
        reply.send(doctor);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

// ============================================
// PRIVATE ROUTES (Auth required - for hospital management)
// ============================================

const getHospitalId = async (userId) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user ? user.hospitalId : null;
};

const getAllDoctors = async (req, reply) => {
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized as a hospital' });
        }

        const allDoctors = await db.select().from(doctors)
            .where(eq(doctors.hospitalId, hospitalId));
        
        reply.send(allDoctors);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const getDoctor = async (req, reply) => {
    const { id } = req.params;
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const { and } = require('drizzle-orm');
        const [doctor] = await db.select().from(doctors)
            .where(and(eq(doctors.id, id), eq(doctors.hospitalId, hospitalId)));

        if (!doctor) {
            return reply.code(404).send({ error: 'Doctor not found' });
        }
        reply.send(doctor);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const createDoctor = async (req, reply) => {
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const [newDoctor] = await db.insert(doctors)
            .values({ ...req.body, hospitalId })
            .returning();

        reply.code(201).send(newDoctor);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const updateDoctor = async (req, reply) => {
    const { id } = req.params;
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const { and } = require('drizzle-orm');
        const [updated] = await db.update(doctors)
            .set(req.body)
            .where(and(eq(doctors.id, id), eq(doctors.hospitalId, hospitalId)))
            .returning();

        if (!updated) {
            return reply.code(404).send({ error: 'Doctor not found' });
        }
        reply.send(updated);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const deleteDoctor = async (req, reply) => {
    const { id } = req.params;
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const { and } = require('drizzle-orm');
        const [deleted] = await db.delete(doctors)
            .where(and(eq(doctors.id, id), eq(doctors.hospitalId, hospitalId)))
            .returning();

        if (!deleted) {
            return reply.code(404).send({ error: 'Doctor not found' });
        }
        reply.send({ message: 'Doctor deleted successfully' });
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllDoctorsPublic,
    getDoctorByIdPublic,
    getAllDoctors,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor
};
