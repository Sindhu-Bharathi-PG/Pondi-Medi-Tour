const { adminAuth } = require('../../../middleware/adminAuth');
const {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole,
  toggleUserStatus,
  getAllHospitals,
  getHospitalById,
  approveHospital,
  rejectHospital,
  deleteHospital,
  getAnalytics,
  getTopHospitals,
  getActivityLogs,
  getAdminSettings,
  updateAdminSettings
} = require('../controllers/adminController');
const packageController = require('../../packages/controllers/packageController');

async function adminRoutes(fastify, options) {
  // Apply admin authentication to all admin routes
  fastify.addHook('onRequest', adminAuth);

  // Dashboard & Analytics
  fastify.get('/stats', getDashboardStats);
  fastify.get('/analytics', getAnalytics);
  fastify.get('/analytics/top-hospitals', getTopHospitals);
  fastify.get('/analytics/activity', getActivityLogs);

  // Settings
  fastify.get('/settings', getAdminSettings);
  fastify.put('/settings', updateAdminSettings);

  // Packages Management
  fastify.get('/packages', packageController.getAllPackages);
  fastify.delete('/packages/:id', packageController.deletePackage);

  // User Management
  fastify.get('/users', getAllUsers);
  fastify.get('/users/:id', getUserById);
  fastify.put('/users/:id', updateUser);
  fastify.delete('/users/:id', deleteUser);
  fastify.patch('/users/:id/role', changeUserRole);
  fastify.patch('/users/:id/status', toggleUserStatus);

  // Hospital Management
  fastify.get('/hospitals', getAllHospitals);
  fastify.get('/hospitals/:id', getHospitalById);
  fastify.patch('/hospitals/:id/approve', approveHospital);
  fastify.patch('/hospitals/:id/reject', rejectHospital);
  fastify.delete('/hospitals/:id', deleteHospital);
}

module.exports = adminRoutes;
