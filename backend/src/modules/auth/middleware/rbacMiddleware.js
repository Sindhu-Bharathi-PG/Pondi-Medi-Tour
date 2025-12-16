/**
 * Role-Based Access Control (RBAC) Middleware
 * Protects routes based on user roles
 */

const rbacMiddleware = (allowedRoles) => {
  return async (request, reply) => {
    try {
      // Check if user is authenticated
      if (!request.user) {
        return reply.code(401).send({ error: 'Authentication required' });
      }

      // Check if user's role is allowed
      if (!allowedRoles.includes(request.user.userType)) {
        return reply.code(403).send({ 
          error: 'Access denied',
          message: `This resource requires one of the following roles: ${allowedRoles.join(', ')}`
        });
      }

      // User has required role, proceed
      return;
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  };
};

/**
 * Predefined role groups for common access patterns
 */
const ROLE_GROUPS = {
  HOSPITAL_ONLY: ['hospital'],
  ADMIN_ONLY: ['admin'],
  SUPERADMIN_ONLY: ['superadmin'],
  ALL_ADMINS: ['admin', 'superadmin'],
  HOSPITAL_AND_ADMIN: ['hospital', 'admin', 'superadmin'],
  ALL_PARTNERS: ['hospital', 'admin', 'superadmin'],
};

/**
 * Convenience middleware for common role combinations
 */
const requireHospital = rbacMiddleware(ROLE_GROUPS.HOSPITAL_ONLY);
const requireAdmin = rbacMiddleware(ROLE_GROUPS.ADMIN_ONLY);
const requireSuperAdmin = rbacMiddleware(ROLE_GROUPS.SUPERADMIN_ONLY);
const requireAnyAdmin = rbacMiddleware(ROLE_GROUPS.ALL_ADMINS);
const requirePartner = rbacMiddleware(ROLE_GROUPS.ALL_PARTNERS);

module.exports = {
  rbacMiddleware,
  ROLE_GROUPS,
  requireHospital,
  requireAdmin,
  requireSuperAdmin,
  requireAnyAdmin,
  requirePartner,
};
