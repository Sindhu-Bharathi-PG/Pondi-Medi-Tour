const { eq, desc, and, sql } = require('drizzle-orm');
const db = require('../../../config/database');
const { 
    inquiries, 
    packages, 
    users, 
    hospitalDetails,
    doctors,
    treatments,
    reviews,
    appointments,
    notifications
} = require('../../../database/schema');
const { hospitalAuth } = require('../../../middleware/hospitalAuth');

// Get hospital ID from JWT token
const getHospitalId = async (userId) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user ? user.hospitalId : null;
};

async function hospitalMeRoutes(fastify, options) {
    // All routes require hospital authentication
    fastify.addHook('preHandler', hospitalAuth);

    // ============================================
    // DASHBOARD
    // ============================================

    // GET /api/hospitals/me/dashboard - Get dashboard stats
    const { getMyDashboardStats } = require('../controllers/hospitalDashboard');
    fastify.get('/dashboard', getMyDashboardStats);

    // ============================================
    // INQUIRIES
    // ============================================

    // GET /api/hospitals/me/inquiries - Get hospital's inquiries
    fastify.get('/inquiries', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found for this user' });
            }

            const { status } = req.query;
            let results = await db.select()
                .from(inquiries)
                .where(eq(inquiries.hospitalId, hospitalId))
                .orderBy(desc(inquiries.createdAt));

            if (status && status !== 'all') {
                results = results.filter(i => i.status === status);
            }

            reply.send(results);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to fetch inquiries' });
        }
    });

    // PUT /api/hospitals/me/inquiries/:id - Update inquiry
    fastify.put('/inquiries/:id', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const { id } = req.params;
            const condition = and(
                eq(inquiries.id, parseInt(id)),
                eq(inquiries.hospitalId, hospitalId)
            );

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
            reply.code(500).send({ error: 'Failed to update inquiry' });
        }
    });

    // ============================================
    // PACKAGES
    // ============================================

    // GET /api/hospitals/me/packages - Get hospital's packages
    fastify.get('/packages', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found for this user' });
            }

            const results = await db.select()
                .from(packages)
                .where(eq(packages.hospitalId, hospitalId))
                .orderBy(desc(packages.createdAt));

            reply.send(results);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to fetch packages' });
        }
    });

    // POST /api/hospitals/me/packages - Create package
    fastify.post('/packages', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const [newPackage] = await db.insert(packages)
                .values({
                    ...req.body,
                    hospitalId: hospitalId,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .returning();

            reply.code(201).send(newPackage);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to create package' });
        }
    });

    // PUT /api/hospitals/me/packages/:id - Update package
    fastify.put('/packages/:id', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const { id } = req.params;
            const condition = and(
                eq(packages.id, parseInt(id)),
                eq(packages.hospitalId, hospitalId)
            );

            const [updated] = await db.update(packages)
                .set({ ...req.body, updatedAt: new Date() })
                .where(condition)
                .returning();

            if (!updated) {
                return reply.code(404).send({ error: 'Package not found' });
            }
            reply.send(updated);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to update package' });
        }
    });

    // DELETE /api/hospitals/me/packages/:id - Delete package
    fastify.delete('/packages/:id', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const { id } = req.params;
            const condition = and(
                eq(packages.id, parseInt(id)),
                eq(packages.hospitalId, hospitalId)
            );

            const [deleted] = await db.delete(packages)
                .where(condition)
                .returning();

            if (!deleted) {
                return reply.code(404).send({ error: 'Package not found' });
            }
            reply.send({ success: true });
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to delete package' });
        }
    });

    // ============================================
    // DOCTORS
    // ============================================

    // GET /api/hospitals/me/doctors - Get hospital's doctors
    fastify.get('/doctors', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const results = await db.select()
                .from(doctors)
                .where(eq(doctors.hospitalId, hospitalId))
                .orderBy(desc(doctors.createdAt));

            reply.send(results);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to fetch doctors' });
        }
    });

    // POST /api/hospitals/me/doctors - Create doctor
    fastify.post('/doctors', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const [newDoctor] = await db.insert(doctors)
                .values({
                    ...req.body,
                    hospitalId: hospitalId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .returning();

            reply.code(201).send(newDoctor);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to create doctor', details: err.message });
        }
    });

    // PUT /api/hospitals/me/doctors/:id - Update doctor
    fastify.put('/doctors/:id', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const { id } = req.params;
            const condition = and(
                eq(doctors.id, parseInt(id)),
                eq(doctors.hospitalId, hospitalId)
            );

            const [updated] = await db.update(doctors)
                .set({ ...req.body, updatedAt: new Date() })
                .where(condition)
                .returning();

            if (!updated) {
                return reply.code(404).send({ error: 'Doctor not found' });
            }
            reply.send(updated);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to update doctor' });
        }
    });

    // DELETE /api/hospitals/me/doctors/:id - Delete doctor
    fastify.delete('/doctors/:id', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const { id } = req.params;
            const condition = and(
                eq(doctors.id, parseInt(id)),
                eq(doctors.hospitalId, hospitalId)
            );

            const [deleted] = await db.delete(doctors)
                .where(condition)
                .returning();

            if (!deleted) {
                return reply.code(404).send({ error: 'Doctor not found' });
            }
            reply.send({ success: true });
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to delete doctor' });
        }
    });

    // ============================================
    // TREATMENTS
    // ============================================

    // GET /api/hospitals/me/treatments - Get hospital's treatments
    fastify.get('/treatments', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const results = await db.select()
                .from(treatments)
                .where(eq(treatments.hospitalId, hospitalId))
                .orderBy(desc(treatments.createdAt));

            reply.send(results);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to fetch treatments' });
        }
    });

    // POST /api/hospitals/me/treatments - Create treatment
    fastify.post('/treatments', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const [newTreatment] = await db.insert(treatments)
                .values({
                    ...req.body,
                    hospitalId: hospitalId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .returning();

            reply.code(201).send(newTreatment);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to create treatment', details: err.message });
        }
    });

    // PUT /api/hospitals/me/treatments/:id - Update treatment
    fastify.put('/treatments/:id', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const { id } = req.params;
            const condition = and(
                eq(treatments.id, parseInt(id)),
                eq(treatments.hospitalId, hospitalId)
            );

            const [updated] = await db.update(treatments)
                .set({ ...req.body, updatedAt: new Date() })
                .where(condition)
                .returning();

            if (!updated) {
                return reply.code(404).send({ error: 'Treatment not found' });
            }
            reply.send(updated);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to update treatment' });
        }
    });

    // DELETE /api/hospitals/me/treatments/:id - Delete treatment
    fastify.delete('/treatments/:id', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const { id } = req.params;
            const condition = and(
                eq(treatments.id, parseInt(id)),
                eq(treatments.hospitalId, hospitalId)
            );

            const [deleted] = await db.delete(treatments)
                .where(condition)
                .returning();

            if (!deleted) {
                return reply.code(404).send({ error: 'Treatment not found' });
            }
            reply.send({ success: true });
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to delete treatment' });
        }
    });

    // ============================================
    // REVIEWS
    // ============================================

    // GET /api/hospitals/me/reviews - Get hospital's reviews
    fastify.get('/reviews', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const results = await db.select()
                .from(reviews)
                .where(eq(reviews.hospitalId, hospitalId))
                .orderBy(desc(reviews.createdAt));

            reply.send(results);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to fetch reviews' });
        }
    });

    // ============================================
    // APPOINTMENTS
    // ============================================

    // GET /api/hospitals/me/appointments - Get hospital's appointments
    fastify.get('/appointments', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const results = await db.select()
                .from(appointments)
                .where(eq(appointments.hospitalId, hospitalId))
                .orderBy(desc(appointments.appointmentDate));

            reply.send(results);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to fetch appointments' });
        }
    });

    // POST /api/hospitals/me/appointments - Create appointment
    fastify.post('/appointments', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const [newAppointment] = await db.insert(appointments)
                .values({
                    ...req.body,
                    hospitalId: hospitalId,
                    createdAt: new Date()
                })
                .returning();

            reply.code(201).send(newAppointment);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to create appointment', details: err.message });
        }
    });

    // PUT /api/hospitals/me/appointments/:id - Update appointment
    fastify.put('/appointments/:id', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const { id } = req.params;
            const condition = and(
                eq(appointments.id, parseInt(id)),
                eq(appointments.hospitalId, hospitalId)
            );

            const [updated] = await db.update(appointments)
                .set(req.body)
                .where(condition)
                .returning();

            if (!updated) {
                return reply.code(404).send({ error: 'Appointment not found' });
            }
            reply.send(updated);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to update appointment' });
        }
    });

    // ============================================
    // HOSPITAL PROFILE
    // ============================================

    // GET /api/hospitals/me/profile - Get hospital profile
    fastify.get('/profile', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const [hospital] = await db.select()
                .from(hospitalDetails)
                .where(eq(hospitalDetails.id, hospitalId));

            if (!hospital) {
                return reply.code(404).send({ error: 'Hospital not found' });
            }
            reply.send(hospital);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to fetch profile' });
        }
    });

    // PUT /api/hospitals/me/profile - Update hospital profile
    fastify.put('/profile', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const [updated] = await db.update(hospitalDetails)
                .set({ ...req.body, updatedAt: new Date() })
                .where(eq(hospitalDetails.id, hospitalId))
                .returning();

            if (!updated) {
                return reply.code(404).send({ error: 'Hospital not found' });
            }
            reply.send(updated);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to update profile' });
        }
    });

    // ============================================
    // NOTIFICATIONS
    // ============================================

    // GET /api/hospitals/me/notifications - Get notifications
    fastify.get('/notifications', async (req, reply) => {
        try {
            const userId = req.user.userId;
            
            const results = await db.select()
                .from(notifications)
                .where(eq(notifications.userId, userId))
                .orderBy(desc(notifications.createdAt))
                .limit(50);

            reply.send(results);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to fetch notifications' });
        }
    });

    // PUT /api/hospitals/me/notifications/:id/read - Mark notification as read
    fastify.put('/notifications/:id/read', async (req, reply) => {
        try {
            const userId = req.user.userId;
            const { id } = req.params;

            const [updated] = await db.update(notifications)
                .set({ isRead: true })
                .where(and(
                    eq(notifications.id, parseInt(id)),
                    eq(notifications.userId, userId)
                ))
                .returning();

            if (!updated) {
                return reply.code(404).send({ error: 'Notification not found' });
            }
            reply.send(updated);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to update notification' });
        }
    });

    // PUT /api/hospitals/me/notifications/read-all - Mark all as read
    fastify.put('/notifications/read-all', async (req, reply) => {
        try {
            const userId = req.user.userId;

            await db.update(notifications)
                .set({ isRead: true })
                .where(eq(notifications.userId, userId));

            reply.send({ success: true });
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to update notifications' });
        }
    });

    // ============================================
    // REVIEWS
    // ============================================

    // GET /api/hospitals/me/reviews - Get hospital's reviews
    fastify.get('/reviews', async (req, reply) => {
        try {
            const hospitalId = await getHospitalId(req.user.userId);
            if (!hospitalId) {
                return reply.code(403).send({ error: 'Hospital not found' });
            }

            const results = await db.select()
                .from(reviews)
                .where(eq(reviews.hospitalId, hospitalId))
                .orderBy(desc(reviews.createdAt));

            reply.send(results);
        } catch (err) {
            req.log.error(err);
            reply.code(500).send({ error: 'Failed to fetch reviews' });
        }
    });

    // ============================================
    // ANALYTICS
    // ============================================

    // GET /api/hospitals/me/analytics - Get hospital analytics
    const { getHospitalAnalytics } = require('../controllers/hospitalAnalytics');
    fastify.get('/analytics', getHospitalAnalytics);
}

module.exports = hospitalMeRoutes;
