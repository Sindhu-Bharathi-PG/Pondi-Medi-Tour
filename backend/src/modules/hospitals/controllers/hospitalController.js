const { eq } = require('drizzle-orm');
const db = require('../../../config/database');
const { hospitalProfiles, users } = require('../../../database/schema');

const createHospital = async (req, reply) => {
  try {
    const [hospital] = await db.insert(hospitalProfiles).values(req.body).returning();
    reply.code(201).send(hospital);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error', message: err.message });
  }
};

const getAllHospitals = async (req, reply) => {
  try {
    const hospitals = await db.select().from(hospitalProfiles);
    reply.send(hospitals);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

const getHospital = async (req, reply) => {
  const { id } = req.params;
  try {
    const [hospital] = await db.select().from(hospitalProfiles).where(eq(hospitalProfiles.id, id));
    if (!hospital) {
      return reply.code(404).send({ error: 'Hospital not found' });
    }
    reply.send(hospital);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
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
    
    const [hospital] = await db.select().from(hospitalProfiles).where(eq(hospitalProfiles.id, user.hospitalId));
    
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
    const [updated] = await db.update(hospitalProfiles)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(hospitalProfiles.id, id))
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
    
    const [updated] = await db.update(hospitalProfiles)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(hospitalProfiles.id, user.hospitalId))
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

module.exports = {
  createHospital,
  getAllHospitals,
  getHospital,
  getMyHospital,
  updateHospital,
  updateMyHospital,
  addPhoto,
  deletePhoto,
  deleteHospital
};
