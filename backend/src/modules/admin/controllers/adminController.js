const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL);

/**
 * Admin Controller
 * Handles all admin operations for user and hospital management
 */

/**
 * Get dashboard statistics
 */
async function getDashboardStats(request, reply) {
  try {
    // Get total users count
    const [userStats] = await sql`
      SELECT 
        COUNT(*) as total_users,
        COUNT(*) FILTER (WHERE user_type = 'patient') as total_patients,
        COUNT(*) FILTER (WHERE user_type = 'hospital') as total_hospitals_users,
        COUNT(*) FILTER (WHERE user_type = 'admin') as total_admins,
        COUNT(*) FILTER (WHERE is_active = true) as active_users
      FROM users
    `;

    // Get hospital statistics
    const [hospitalStats] = await sql`
      SELECT 
        COUNT(*) as total_hospitals,
        COUNT(*) FILTER (WHERE status = 'active') as active_hospitals,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_approvals
      FROM hospital_details
    `;

    // Get recent activity count (last 24 hours)
    const [activityStats] = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as new_users_today,
        COUNT(*) FILTER (WHERE last_login > NOW() - INTERVAL '1 hour') as active_sessions
      FROM users
    `;

    return reply.send({
      totalUsers: parseInt(userStats.total_users),
      totalHospitals: parseInt(hospitalStats.total_hospitals),
      pendingApprovals: parseInt(hospitalStats.pending_approvals),
      activeSessions: parseInt(activityStats.active_sessions || 0),
      activeHospitals: parseInt(hospitalStats.active_hospitals),
      newUsersToday: parseInt(activityStats.new_users_today || 0)
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to fetch dashboard statistics'
    });
  }
}

/**
 * Get all users with filtering and pagination
 */
async function getAllUsers(request, reply) {
  try {
    const { page = 1, limit = 10, role, search, status } = request.query;
    const offset = (page - 1) * limit;

    // Build dynamic query
    let whereConditions = [];
    let params = [];

    if (role && role !== 'all') {
      whereConditions.push(`user_type = $${params.length + 1}`);
      params.push(role);
    }

    if (status) {
      whereConditions.push(`is_active = $${params.length + 1}`);
      params.push(status === 'active');
    }

    if (search) {
      whereConditions.push(`(name ILIKE $${params.length + 1} OR email ILIKE $${params.length + 1})`);
      params.push(`%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get users
    const users = await sql.unsafe(`
      SELECT id, email, name, user_type, is_active, last_login, created_at
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `, [...params, limit, offset]);

    // Get total count
    const [{ count }] = await sql.unsafe(`
      SELECT COUNT(*) as count FROM users ${whereClause}
    `, params);

    return reply.send({
      users: users.map(user => ({
        id: user.id,
        name: user.name || 'N/A',
        email: user.email,
        role: user.user_type,
        status: user.is_active ? 'active' : 'inactive',
        lastLogin: user.last_login,
        joinedDate: user.created_at
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(count),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to fetch users'
    });
  }
}

/**
 * Get user by ID
 */
async function getUserById(request, reply) {
  try {
    const { id } = request.params;

    const [user] = await sql`
      SELECT id, email, name, user_type, is_active, last_login, created_at, updated_at
      FROM users
      WHERE id = ${id}
    `;

    if (!user) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    return reply.send({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.user_type,
      isActive: user.is_active,
      lastLogin: user.last_login,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to fetch user'
    });
  }
}

/**
 * Update user
 */
async function updateUser(request, reply) {
  try {
    const { id } = request.params;
    const { name, email } = request.body;

    const [updatedUser] = await sql`
      UPDATE users
      SET 
        name = COALESCE(${name}, name),
        email = COALESCE(${email}, email),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, email, name, user_type, is_active
    `;

    if (!updatedUser) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    return reply.send({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to update user'
    });
  }
}

/**
 * Delete user (soft delete)
 */
async function deleteUser(request, reply) {
  try {
    const { id } = request.params;

    // Soft delete by deactivating
    const [deletedUser] = await sql`
      UPDATE users
      SET is_active = false, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id
    `;

    if (!deletedUser) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    return reply.send({
      message: 'User deleted successfully',
      id: deletedUser.id
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to delete user'
    });
  }
}

/**
 * Change user role
 */
async function changeUserRole(request, reply) {
  try {
    const { id } = request.params;
    const { role } = request.body;

    // Validate role
    const validRoles = ['patient', 'doctor', 'hospital', 'admin', 'superadmin'];
    if (!validRoles.includes(role)) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Invalid role. Must be one of: ' + validRoles.join(', ')
      });
    }

    const [updatedUser] = await sql`
      UPDATE users
      SET user_type = ${role}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, email, name, user_type
    `;

    if (!updatedUser) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    return reply.send({
      message: 'User role updated successfully',
      user: updatedUser
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to update user role'
    });
  }
}

/**
 * Toggle user status (activate/deactivate)
 */
async function toggleUserStatus(request, reply) {
  try {
    const { id } = request.params;

    const [updatedUser] = await sql`
      UPDATE users
      SET is_active = NOT is_active, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, is_active
    `;

    if (!updatedUser) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    return reply.send({
      message: `User ${updatedUser.is_active ? 'activated' : 'deactivated'} successfully`,
      id: updatedUser.id,
      isActive: updatedUser.is_active
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to toggle user status'
    });
  }
}

/**
 * Get all hospitals with filtering
 */
async function getAllHospitals(request, reply) {
  try {
    const { page = 1, limit = 10, status, search } = request.query;
    const offset = (page - 1) * limit;

    let whereConditions = [];
    let params = [];

    if (status && status !== 'all') {
      whereConditions.push(`status = $${params.length + 1}`);
      params.push(status);
    }

    if (search) {
      whereConditions.push(`name ILIKE $${params.length + 1}`);
      params.push(`%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const hospitals = await sql.unsafe(`
      SELECT id, name, type, city, state, beds, status, created_at
      FROM hospital_details
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `, [...params, limit, offset]);

    const [{ count }] = await sql.unsafe(`
      SELECT COUNT(*) as count FROM hospital_details ${whereClause}
    `, params);

    return reply.send({
      hospitals: hospitals.map(h => ({
        id: h.id,
        name: h.name,
        type: h.type,
        location: `${h.city}, ${h.state}`,
        city: h.city,
        beds: h.beds,
        status: h.status,
        submittedDate: h.created_at
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(count),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to fetch hospitals'
    });
  }
}

/**
 * Get hospital by ID
 */
async function getHospitalById(request, reply) {
  try {
    const { id } = request.params;

    const [hospital] = await sql`
      SELECT * FROM hospital_details WHERE id = ${id}
    `;

    if (!hospital) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'Hospital not found'
      });
    }

    return reply.send(hospital);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to fetch hospital'
    });
  }
}

/**
 * Approve hospital
 */
async function approveHospital(request, reply) {
  try {
    const { id } = request.params;

    const [approvedHospital] = await sql`
      UPDATE hospital_details
      SET status = 'active', updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, name, status
    `;

    if (!approvedHospital) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'Hospital not found'
      });
    }

    return reply.send({
      message: 'Hospital approved successfully',
      hospital: approvedHospital
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to approve hospital'
    });
  }
}

/**
 * Reject hospital
 */
async function rejectHospital(request, reply) {
  try {
    const { id } = request.params;
    const { reason } = request.body;

    const [rejectedHospital] = await sql`
      UPDATE hospital_details
      SET status = 'rejected', updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, name, status
    `;

    if (!rejectedHospital) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'Hospital not found'
      });
    }

    // TODO: Send email notification with rejection reason

    return reply.send({
      message: 'Hospital rejected successfully',
      hospital: rejectedHospital,
      reason
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to reject hospital'
    });
  }
}

/**
 * Delete hospital
 */
async function deleteHospital(request, reply) {
  try {
    const { id } = request.params;

    const [deletedHospital] = await sql`
      DELETE FROM hospital_details
      WHERE id = ${id}
      RETURNING id
    `;

    if (!deletedHospital) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'Hospital not found'
      });
    }

    return reply.send({
      message: 'Hospital deleted successfully',
      id: deletedHospital.id
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to delete hospital'
    });
  }
}

/**
 * Get analytics data
 */
async function getAnalytics(request, reply) {
  try {
    // User growth over last 30 days
    const userGrowth = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM users
      WHERE created_at > NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Hospital statistics by type
    const hospitalsByType = await sql`
      SELECT 
        type,
        COUNT(*) as count
      FROM hospital_details
      WHERE status = 'active'
      GROUP BY type
    `;

    // User distribution by role
    const usersByRole = await sql`
      SELECT 
        user_type as role,
        COUNT(*) as count
      FROM users
      WHERE is_active = true
      GROUP BY user_type
    `;

    return reply.send({
      userGrowth: userGrowth.map(row => ({
        date: row.date,
        count: parseInt(row.count)
      })),
      hospitalsByType: hospitalsByType.map(row => ({
        type: row.type,
        count: parseInt(row.count)
      })),
      usersByRole: usersByRole.map(row => ({
        role: row.role,
        count: parseInt(row.count)
      }))
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to fetch analytics'
    });
  }
}

module.exports = {
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
};
