const { eq, and, desc } = require('drizzle-orm');
const db = require('../../../config/database');
const { inquiries, users } = require('../../../database/schema');

// Helper to get hospital ID
const getHospitalId = async (userId) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user ? user.hospitalId : null;
};

// Admin: Get all inquiries
const getAllInquiries = async (req, reply) => {
    try {
        const { status } = req.query;
        let query = db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
        
        if (status) {
            query = query.where(eq(inquiries.status, status));
        }

        const results = await query;
        reply.send(results);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

// Hospital: Get own inquiries
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
            query.where(and(eq(inquiries.hospitalId, hospitalId), eq(inquiries.status, status)));
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
        // Allow admin or owning hospital
        // For simplicity, checking if user has hospitalId. If not, assume admin (middleware should handle role)
        // Ideally, use req.user.role
        
        let condition = eq(inquiries.id, id);
        if (req.user.userType === 'hospital') {
             const hospitalId = await getHospitalId(req.user.userId);
             if (!hospitalId) return reply.code(403).send({ error: 'Not authorized' });
             condition = and(eq(inquiries.id, id), eq(inquiries.hospitalId, hospitalId));
        }

        const [inquiry] = await db.select().from(inquiries).where(condition);

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
        let condition = eq(inquiries.id, id);
        
        if (req.user.userType === 'hospital') {
             const hospitalId = await getHospitalId(req.user.userId);
             if (!hospitalId) return reply.code(403).send({ error: 'Not authorized' });
             condition = and(eq(inquiries.id, id), eq(inquiries.hospitalId, hospitalId));
        }

        const [updated] = await db.update(inquiries)
            .set({ ...req.body, updatedAt: new Date() })
            .where(condition)
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

// Public: Create inquiry
const createInquiry = async (req, reply) => {
    try {
        const { 
            hospitalId, 
            packageId, 
            inquiryType, 
            sourcePage,
            ...data 
        } = req.body;
        
        // Auto-detect inquiry type if not provided
        let detectedType = inquiryType || 'general';
        if (!inquiryType) {
            if (packageId) detectedType = 'package';
            else if (hospitalId) detectedType = 'hospital';
            else if (data.treatmentType) detectedType = 'treatment';
        }
        
        console.log('Creating inquiry with data:', { ...data, inquiryType: detectedType });
        const [newInquiry] = await db.insert(inquiries)
            .values({ 
                ...data, 
                hospitalId: hospitalId || null,
                packageId: packageId || null,
                inquiryType: detectedType,
                sourcePage: sourcePage || data.referrerUrl || null,
                status: 'pending',
                priority: packageId ? 'high' : 'normal' // Package inquiries get priority
            })
            .returning();

        reply.code(201).send(newInquiry);
    } catch (err) {
        console.error('INQUIRY CREATION ERROR:', err);
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
};

module.exports = {
    getAllInquiries,
    getInquiries,
    getInquiry,
    updateInquiry,
    createInquiry
};
