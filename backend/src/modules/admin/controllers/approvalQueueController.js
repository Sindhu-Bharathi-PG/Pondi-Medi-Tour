const { sql } = require('../../../config/database');
const { logActivity } = require('./activityLogController');
const { sendNotification } = require('../../notifications/controllers/notificationController');

/**
 * Get pending approvals with filters
 */
async function getPendingApprovals(request, reply) {
  try {
    const { itemType, priority, status = 'pending', limit = 50, offset = 0 } = request.query;

    let query = sql`
      SELECT 
        aq.id,
        aq.item_type,
        aq.item_id,
        aq.status,
        aq.rejection_reason,
        aq.priority,
        aq.created_at,
        aq.reviewed_at,
        u1.name as submitted_by_name,
        u1.email as submitted_by_email,
        u2.name as reviewed_by_name
      FROM approval_queue aq
      LEFT JOIN users u1 ON aq.submitted_by = u1.id
      LEFT JOIN users u2 ON aq.reviewed_by = u2.id
      WHERE aq.status = ${status}
      ORDER BY 
        CASE aq.priority 
          WHEN 'urgent' THEN 1 
          WHEN 'high' THEN 2 
          WHEN 'normal' THEN 3 
          WHEN 'low' THEN 4 
        END,
        aq.created_at ASC
      LIMIT ${parseInt(limit)}
      OFFSET ${parseInt(offset)}
    `;

    const approvals = await query;

    const [{ count }] = await sql`
      SELECT COUNT(*) as count FROM approval_queue WHERE status = ${status}
    `;

    return reply.send({
      success: true,
      approvals,
      total: parseInt(count)
    });
  } catch (error) {
    console.error('Error fetching approvals:', error);
    return reply.status(500).send({ success: false, error: 'Failed to fetch approvals' });
  }
}

/**
 * Approve an item
 */
async function approveItem(request, reply) {
  try {
    const { id } = request.params;
    const reviewerId = request.user.id;

    // Get the approval item
    const [item] = await sql`
      SELECT * FROM approval_queue WHERE id = ${id}
    `;

    if (!item) {
      return reply.status(404).send({ success: false, error: 'Approval item not found' });
    }

    // Update approval queue
    await sql`
      UPDATE approval_queue
      SET status = 'approved', reviewed_by = ${reviewerId}, reviewed_at = NOW()
      WHERE id = ${id}
    `;

    // Apply side effects based on item type
    if (item.item_type === 'hospital') {
      await sql`
        UPDATE hospital_details SET status = 'approved' WHERE id = ${parseInt(item.item_id)}
      `;
      
      // Get hospital user to notify
      const [hospital] = await sql`
        SELECT user_id, name FROM hospital_details WHERE id = ${parseInt(item.item_id)}
      `;
      
      if (hospital?.user_id) {
        await sendNotification(
          hospital.user_id,
          'Hospital Approved! 🎉',
          `Your hospital "${hospital.name}" has been approved and is now live on the platform.`,
          'success',
          '/dashboard/hospital'
        );
      }
    }

    // Log activity
    await logActivity(
      reviewerId,
      'approval_approved',
      item.item_type,
      item.item_id,
      `Approved ${item.item_type} #${item.item_id}`
    );

    return reply.send({ success: true, message: 'Item approved successfully' });
  } catch (error) {
    console.error('Error approving item:', error);
    return reply.status(500).send({ success: false, error: 'Failed to approve item' });
  }
}

/**
 * Reject an item
 */
async function rejectItem(request, reply) {
  try {
    const { id } = request.params;
    const { reason } = request.body;
    const reviewerId = request.user.id;

    const [item] = await sql`
      SELECT * FROM approval_queue WHERE id = ${id}
    `;

    if (!item) {
      return reply.status(404).send({ success: false, error: 'Approval item not found' });
    }

    await sql`
      UPDATE approval_queue
      SET status = 'rejected', rejection_reason = ${reason}, reviewed_by = ${reviewerId}, reviewed_at = NOW()
      WHERE id = ${id}
    `;

    // Apply side effects
    if (item.item_type === 'hospital') {
      await sql`
        UPDATE hospital_details SET status = 'rejected' WHERE id = ${parseInt(item.item_id)}
      `;

      const [hospital] = await sql`
        SELECT user_id, name FROM hospital_details WHERE id = ${parseInt(item.item_id)}
      `;
      
      if (hospital?.user_id) {
        await sendNotification(
          hospital.user_id,
          'Hospital Application Update',
          `Your hospital "${hospital.name}" application was not approved. Reason: ${reason}`,
          'warning',
          '/dashboard/hospital'
        );
      }
    }

    await logActivity(
      reviewerId,
      'approval_rejected',
      item.item_type,
      item.item_id,
      `Rejected ${item.item_type} #${item.item_id}: ${reason}`
    );

    return reply.send({ success: true, message: 'Item rejected' });
  } catch (error) {
    console.error('Error rejecting item:', error);
    return reply.status(500).send({ success: false, error: 'Failed to reject item' });
  }
}

/**
 * Submit item for approval (helper for other modules)
 */
async function submitForApproval(itemType, itemId, submittedById, priority = 'normal') {
  try {
    await sql`
      INSERT INTO approval_queue (item_type, item_id, submitted_by, priority)
      VALUES (${itemType}, ${itemId.toString()}, ${submittedById}, ${priority})
      ON CONFLICT (item_type, item_id) 
      DO UPDATE SET status = 'pending', priority = ${priority}, created_at = NOW()
    `;
    return true;
  } catch (error) {
    console.error('Error submitting for approval:', error);
    return false;
  }
}

/**
 * Get approval stats
 */
async function getApprovalStats(request, reply) {
  try {
    const [stats] = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'approved') as approved,
        COUNT(*) FILTER (WHERE status = 'rejected') as rejected,
        COUNT(*) FILTER (WHERE status = 'pending' AND priority = 'urgent') as urgent
      FROM approval_queue
    `;

    return reply.send({ success: true, stats });
  } catch (error) {
    console.error('Error fetching approval stats:', error);
    return reply.status(500).send({ success: false, error: 'Failed to fetch stats' });
  }
}

module.exports = {
  getPendingApprovals,
  approveItem,
  rejectItem,
  submitForApproval,
  getApprovalStats
};
