const { eq, and } = require('drizzle-orm');
const db = require('../../../config/database');
const { doctors, users } = require('../../../database/schema');

// Helper to get hospital ID
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
    getAllDoctors,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor
};
