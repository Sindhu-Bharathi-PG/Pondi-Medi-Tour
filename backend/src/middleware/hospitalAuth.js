/**
 * Hospital Authentication Middleware
 * Verifies JWT token and checks if user has hospital role
 */

async function hospitalAuth(request, reply) {
  try {
    // Verify JWT token
    await request.jwtVerify();
    
    const user = request.user;
    
    // Check if user has hospital role
    if (!user || user.userType !== 'hospital') {
      return reply.status(403).send({
        error: 'Forbidden',
        message: 'Hospital access required',
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

module.exports = { hospitalAuth };
