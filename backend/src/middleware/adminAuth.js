/**
 * Admin Authentication Middleware
 * Verifies JWT token and checks if user has admin or superadmin role
 */

async function adminAuth(request, reply) {
  try {
    // Verify JWT token
    await request.jwtVerify();
    
    const user = request.user;
    
    // Check if user has admin or superadmin role
    if (!user || (user.userType !== 'admin' && user.userType !== 'superadmin')) {
      return reply.status(403).send({
        error: 'Forbidden',
        message: 'Admin access required',
        statusCode: 403
      });
    }
    
    // User is authenticated and authorized
    // Continue to route handler
  } catch (error) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Invalid or missing authentication token',
      statusCode: 401
    });
  }
}

module.exports = { adminAuth };
