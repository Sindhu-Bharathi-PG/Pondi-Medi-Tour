const { eq, and, desc } = require('drizzle-orm');
const db = require('../../../config/database');
const { appointments, users } = require('../../../database/schema');

// Helper to get hospital ID
const getHospitalId = async (userId) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user ? user.hospitalId : null;
};

const getAppointments = async (req, reply) => {
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized as a hospital' });
        }

        const { date, status } = req.query;
        
        // Start building query
        let query = db.select().from(appointments)
            .where(eq(appointments.hospitalId, hospitalId))
            .orderBy(desc(appointments.appointmentDate));
        
        if (status) {
            query = db.select().from(appointments)
                .where(and(
                    eq(appointments.hospitalId, hospitalId), 
                    eq(appointments.status, status)
                ))
                .orderBy(desc(appointments.appointmentDate));
        }

        // Add date filtering logic if needed (e.g. range or specific day)
        // For now status is primary filter for dashboard

        const results = await query;
        reply.send(results);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const getAppointment = async (req, reply) => {
    const { id } = req.params;
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const [appointment] = await db.select().from(appointments)
            .where(and(eq(appointments.id, id), eq(appointments.hospitalId, hospitalId)));

        if (!appointment) {
            return reply.code(404).send({ error: 'Appointment not found' });
        }
        reply.send(appointment);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const updateAppointment = async (req, reply) => {
    const { id } = req.params;
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const [updated] = await db.update(appointments)
            .set({ ...req.body, updatedAt: new Date() })
            .where(and(eq(appointments.id, id), eq(appointments.hospitalId, hospitalId)))
            .returning();

        if (!updated) {
            return reply.code(404).send({ error: 'Appointment not found' });
        }
        reply.send(updated);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const createAppointment = async (req, reply) => {
    try {
        const hospitalId = await getHospitalId(req.user.userId);
        if (!hospitalId) {
            return reply.code(403).send({ error: 'Not authorized' });
        }

        const [newAppointment] = await db.insert(appointments)
            .values({ ...req.body, hospitalId })
            .returning();

        reply.code(201).send(newAppointment);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAppointments,
    getAppointment,
    updateAppointment,
    createAppointment
};
