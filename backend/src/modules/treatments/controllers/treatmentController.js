const db = require('../../../config/database');
const { treatments } = require('../../../database/schema');
const { eq } = require('drizzle-orm');

const getAllTreatments = async (req, reply) => {
    try {
        // Fetch all treatments. Can add featured filtering later if needed.
        const results = await db.select().from(treatments);
        reply.send(results);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const getTreatmentBySlug = async (req, reply) => {
    const { slug } = req.params;
    try {
        const [treatment] = await db.select().from(treatments).where(eq(treatments.slug, slug));
        if (!treatment) {
            return reply.code(404).send({ error: 'Treatment not found' });
        }
        reply.send(treatment);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllTreatments,
    getTreatmentBySlug
};
