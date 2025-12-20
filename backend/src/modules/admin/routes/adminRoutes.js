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
  getAnalytics
} = require('../controllers/adminController');

async function adminRoutes(fastify, options) {
  // Apply admin authentication to all admin routes
  fastify.addHook('onRequest', adminAuth);

  // Dashboard & Analytics
  fastify.get('/stats', getDashboardStats);
  fastify.get('/analytics', getAnalytics);

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
