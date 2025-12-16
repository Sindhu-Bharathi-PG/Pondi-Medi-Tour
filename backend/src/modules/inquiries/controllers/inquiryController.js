const { eq, and, desc } = require('drizzle-orm');
const db = require('../../../config/database');
const { inquiries, users } = require('../../../database/schema');

// Helper to get hospital ID
const getHospitalId = async (userId) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user ? user.hospitalId : null;
};

const getInquiries = async (req, reply) => {
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized as a hospital' });
        }

        const { status } = req.query;
        
        let query = db.select().from(inquiries)
            .where(eq(inquiries.hospitalId, hospitalId))
            .orderBy(desc(inquiries.createdAt));
        
        if (status) {
            query = db.select().from(inquiries)
                .where(and(eq(inquiries.hospitalId, hospitalId), eq(inquiries.status, status)))
                .orderBy(desc(inquiries.createdAt));
        }

        const results = await query;
        reply.send(results);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const getInquiry = async (req, reply) => {
    const { id } = req.params;
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const [inquiry] = await db.select().from(inquiries)
            .where(and(eq(inquiries.id, id), eq(inquiries.hospitalId, hospitalId)));

        if (!inquiry) {
            return reply.code(404).send({ error: 'Inquiry not found' });
        }
        reply.send(inquiry);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const updateInquiry = async (req, reply) => {
    const { id } = req.params;
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        // Only allow updating status and maybe priority/message?
        // Typically hospital updates status to 'responded'
        const [updated] = await db.update(inquiries)
            .set({ ...req.body, updatedAt: new Date() })
            .where(and(eq(inquiries.id, id), eq(inquiries.hospitalId, hospitalId)))
            .returning();

        if (!updated) {
            return reply.code(404).send({ error: 'Inquiry not found' });
        }
        reply.send(updated);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

// Manually create inquiry (e.g. phone call log)
const createInquiry = async (req, reply) => {
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const [newInquiry] = await db.insert(inquiries)
            .values({ ...req.body, hospitalId })
            .returning();

        reply.code(201).send(newInquiry);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getInquiries,
    getInquiry,
    updateInquiry,
    createInquiry
};
