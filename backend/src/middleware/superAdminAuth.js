/**
 * Super Admin Authentication Middleware
 * Verifies JWT token and checks if user has superadmin role specifically
 * Used for highly sensitive operations like CMS and database access
 */

async function superAdminAuth(request, reply) {
  try {
    // Verify JWT token
    await request.jwtVerify();
    
    const user = request.user;
    
    // Check if user has superadmin role
    if (!user || user.userType !== 'superadmin') {
      return reply.status(403).send({
        error: 'Forbidden',
        message: 'Super admin access required',
        statusCode: 403
      });
    }
    
    // User is authenticated and authorized as superadmin
    // Continue to route handler
  } catch (error) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Invalid or missing authentication token',
      statusCode: 401
    });
  }
}

module.exports = { superAdminAuth };
