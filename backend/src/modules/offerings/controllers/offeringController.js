const { eq, and } = require('drizzle-orm');
const db = require('../../../config/database');
const { offerings, users } = require('../../../database/schema');

// Helper to get hospital ID
const getHospitalId = async (userId) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user ? user.hospitalId : null;
};

const getMyOfferings = async (req, reply) => {
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized as a hospital' });
        }

        const { type } = req.query; // Filter by 'treatment' or 'package'
        
        let query = db.select().from(offerings).where(eq(offerings.hospitalId, hospitalId));
        
        if (type) {
            query = db.select().from(offerings)
                .where(and(eq(offerings.hospitalId, hospitalId), eq(offerings.type, type)));
        }

        const results = await query;
        reply.send(results);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const getOffering = async (req, reply) => {
    const { id } = req.params;
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const [offering] = await db.select().from(offerings)
            .where(and(eq(offerings.id, id), eq(offerings.hospitalId, hospitalId)));

        if (!offering) {
            return reply.code(404).send({ error: 'Item not found' });
        }
        reply.send(offering);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const createOffering = async (req, reply) => {
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const [newOffering] = await db.insert(offerings)
            .values({ ...req.body, hospitalId })
            .returning();

        reply.code(201).send(newOffering);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const updateOffering = async (req, reply) => {
    const { id } = req.params;
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const [updated] = await db.update(offerings)
            .set(req.body)
            .where(and(eq(offerings.id, id), eq(offerings.hospitalId, hospitalId)))
            .returning();

        if (!updated) {
            return reply.code(404).send({ error: 'Item not found' });
        }
        reply.send(updated);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const deleteOffering = async (req, reply) => {
    const { id } = req.params;
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const [deleted] = await db.delete(offerings)
            .where(and(eq(offerings.id, id), eq(offerings.hospitalId, hospitalId)))
            .returning();

        if (!deleted) {
            return reply.code(404).send({ error: 'Item not found' });
        }
        reply.send({ message: 'Item deleted successfully' });
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getMyOfferings,
    getOffering,
    createOffering,
    updateOffering,
    deleteOffering
};
