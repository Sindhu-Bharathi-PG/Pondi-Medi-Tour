const hospitalController = require('../controllers/hospitalController');
const dashboardController = require('../controllers/hospitalDashboard');
const managementController = require('../controllers/hospitalManagement');

module.exports = async function (fastify, opts) {
  // Public routes
  fastify.get('/', hospitalController.getAllHospitals);
  fastify.get('/:id', hospitalController.getHospital);
  
  // Dashboard stats (authenticated)
  fastify.get('/me/dashboard', { preHandler: fastify.authenticate }, dashboardController.getMyDashboardStats);
  
  // Profile routes (authenticated)
  fastify.get('/me/profile', { preHandler: fastify.authenticate }, hospitalController.getMyHospital);
  fastify.put('/me/profile', { preHandler: fastify.authenticate }, hospitalController.updateMyHospital);
  fastify.post('/me/photos', { preHandler: fastify.authenticate }, hospitalController.addPhoto);
  fastify.delete('/me/photos/:index', { preHandler: fastify.authenticate }, hospitalController.deletePhoto);
  
  // ============================================
  // DOCTORS CRUD (authenticated)
  // ============================================
  fastify.get('/me/doctors', { preHandler: fastify.authenticate }, managementController.getMyDoctors);
  fastify.post('/me/doctors', { preHandler: fastify.authenticate }, managementController.addDoctor);
  fastify.put('/me/doctors/:id', { preHandler: fastify.authenticate }, managementController.updateDoctor);
  fastify.delete('/me/doctors/:id', { preHandler: fastify.authenticate }, managementController.deleteDoctor);
  
  // ============================================
  // TREATMENTS CRUD (authenticated)
  // ============================================
  fastify.get('/me/treatments', { preHandler: fastify.authenticate }, managementController.getMyTreatments);
  fastify.post('/me/treatments', { preHandler: fastify.authenticate }, managementController.addTreatment);
  fastify.put('/me/treatments/:id', { preHandler: fastify.authenticate }, managementController.updateTreatment);
  fastify.delete('/me/treatments/:id', { preHandler: fastify.authenticate }, managementController.deleteTreatment);
  
  // ============================================
  // PACKAGES CRUD (authenticated)
  // ============================================
  fastify.get('/me/packages', { preHandler: fastify.authenticate }, managementController.getMyPackages);
  fastify.post('/me/packages', { preHandler: fastify.authenticate }, managementController.addPackage);
  fastify.put('/me/packages/:id', { preHandler: fastify.authenticate }, managementController.updatePackage);
  fastify.delete('/me/packages/:id', { preHandler: fastify.authenticate }, managementController.deletePackage);
  
  // ============================================
  // INQUIRIES (authenticated)
  // ============================================
  fastify.get('/me/inquiries', { preHandler: fastify.authenticate }, managementController.getMyInquiries);
  fastify.put('/me/inquiries/:id', { preHandler: fastify.authenticate }, managementController.updateInquiry);
  
  // Admin-only routes
  fastify.post('/', hospitalController.createHospital);
  fastify.put('/:id', hospitalController.updateHospital);
  fastify.delete('/:id', hospitalController.deleteHospital);
};
