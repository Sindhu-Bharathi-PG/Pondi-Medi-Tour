const db = require('../../../config/database');
const { adminSettings } = require('../../../database/schema');
const { eq, and } = require('drizzle-orm');

// Get admin settings
const getSettings = async (request, reply) => {
  try {
    const adminId = request.user.id; // From auth middleware
    
    // Get all settings for this admin
    const settings = await db
      .select()
      .from(adminSettings)
      .where(eq(adminSettings.adminId, adminId));

    // Convert to key-value object
    const settingsObj = settings.reduce((acc, setting) => {
      acc[setting.settingKey] = setting.settingValue;
      return acc;
    }, {});

    // Return with defaults if no settings exist
    const defaults = {
      adminName: request.user.name || 'Admin',
      adminEmail: request.user.email,
      emailNotifications: true,
      inquiryAlerts: true,
      hospitalApprovalAlerts: true,
      weeklyReports: false,
      twoFactorAuth: false,
      sessionTimeout: 30,
      maintenanceMode: false,
      autoApproveHospitals: false
    };

    reply.send({
      success: true,
      data: { ...defaults, ...settingsObj }
    });
  } catch (error) {
    reply.status(500).send({ success: false, error: error.message });
  }
};

// Update admin settings
const updateSettings = async (request, reply) => {
  try {
    const adminId = request.user.id;
    const settings = request.body;

    // Upsert each setting
    for (const [key, value] of Object.entries(settings)) {
      // Skip profile fields (handled separately)
      if (key === 'adminName' || key === 'adminEmail') continue;

      const existing = await db
        .select()
        .from(adminSettings)
        .where(and(
          eq(adminSettings.adminId, adminId),
          eq(adminSettings.settingKey, key)
        ))
        .limit(1);

      if (existing.length > 0) {
        // Update
        await db
          .update(adminSettings)
          .set({
            settingValue: value,
            updatedAt: new Date()
          })
          .where(and(
            eq(adminSettings.adminId, adminId),
            eq(adminSettings.settingKey, key)
          ));
      } else {
        // Insert
        await db.insert(adminSettings).values({
          adminId,
          settingKey: key,
          settingValue: value
        });
      }
    }

    reply.send({
      success: true,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    reply.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
