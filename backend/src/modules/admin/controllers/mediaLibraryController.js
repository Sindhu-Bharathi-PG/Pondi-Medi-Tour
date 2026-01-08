const { sql } = require('../../../config/database');
const path = require('path');

/**
 * Get all media files with pagination and filters
 */
async function getAllMedia(request, reply) {
  try {
    const { fileType, limit = 50, offset = 0, search } = request.query;

    let query;
    
    if (search) {
      query = sql`
        SELECT id, filename, original_name, file_url, file_type, file_size, width, height, tags, created_at
        FROM media_library
        WHERE (original_name ILIKE ${'%' + search + '%'} OR filename ILIKE ${'%' + search + '%'})
        ORDER BY created_at DESC
        LIMIT ${parseInt(limit)}
        OFFSET ${parseInt(offset)}
      `;
    } else if (fileType) {
      query = sql`
        SELECT id, filename, original_name, file_url, file_type, file_size, width, height, tags, created_at
        FROM media_library
        WHERE file_type LIKE ${fileType + '%'}
        ORDER BY created_at DESC
        LIMIT ${parseInt(limit)}
        OFFSET ${parseInt(offset)}
      `;
    } else {
      query = sql`
        SELECT id, filename, original_name, file_url, file_type, file_size, width, height, tags, created_at
        FROM media_library
        ORDER BY created_at DESC
        LIMIT ${parseInt(limit)}
        OFFSET ${parseInt(offset)}
      `;
    }

    const media = await query;

    const [{ count }] = await sql`SELECT COUNT(*) as count FROM media_library`;

    return reply.send({
      success: true,
      media,
      total: parseInt(count),
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return reply.status(500).send({ success: false, error: 'Failed to fetch media' });
  }
}

/**
 * Upload a new media file
 */
async function uploadMedia(request, reply) {
  try {
    const data = await request.file();
    
    if (!data) {
      return reply.status(400).send({ success: false, error: 'No file uploaded' });
    }

    const uploaderId = request.user?.id || null;
    const originalName = data.filename;
    const mimeType = data.mimetype;
    const fileSize = data.file.bytesRead || 0;
    
    // Generate unique filename
    const ext = path.extname(originalName);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
    
    // For now, store placeholder URL - in production, upload to cloud storage
    const fileUrl = `/uploads/${filename}`;

    // Get dimensions if it's an image (placeholder for now)
    let width = null;
    let height = null;

    const [media] = await sql`
      INSERT INTO media_library (filename, original_name, file_url, file_type, file_size, width, height, uploaded_by)
      VALUES (${filename}, ${originalName}, ${fileUrl}, ${mimeType}, ${fileSize}, ${width}, ${height}, ${uploaderId})
      RETURNING id, filename, original_name, file_url, file_type, file_size, created_at
    `;

    return reply.status(201).send({
      success: true,
      media,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading media:', error);
    return reply.status(500).send({ success: false, error: 'Failed to upload file' });
  }
}

/**
 * Delete a media file
 */
async function deleteMedia(request, reply) {
  try {
    const { id } = request.params;

    const [media] = await sql`
      SELECT * FROM media_library WHERE id = ${id}
    `;

    if (!media) {
      return reply.status(404).send({ success: false, error: 'Media not found' });
    }

    // Delete from database
    await sql`DELETE FROM media_library WHERE id = ${id}`;

    // TODO: Also delete from cloud storage in production

    return reply.send({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    return reply.status(500).send({ success: false, error: 'Failed to delete media' });
  }
}

/**
 * Update media metadata (tags, etc.)
 */
async function updateMedia(request, reply) {
  try {
    const { id } = request.params;
    const { tags, originalName } = request.body;

    await sql`
      UPDATE media_library
      SET 
        tags = ${tags ? tags : sql`tags`},
        original_name = ${originalName ? originalName : sql`original_name`}
      WHERE id = ${id}
    `;

    return reply.send({ success: true, message: 'Media updated successfully' });
  } catch (error) {
    console.error('Error updating media:', error);
    return reply.status(500).send({ success: false, error: 'Failed to update media' });
  }
}

/**
 * Get media stats
 */
async function getMediaStats(request, reply) {
  try {
    const [stats] = await sql`
      SELECT 
        COUNT(*) as total_files,
        COALESCE(SUM(file_size), 0) as total_size,
        COUNT(*) FILTER (WHERE file_type LIKE 'image/%') as images,
        COUNT(*) FILTER (WHERE file_type LIKE 'video/%') as videos,
        COUNT(*) FILTER (WHERE file_type LIKE 'application/pdf') as documents
      FROM media_library
    `;

    return reply.send({ success: true, stats });
  } catch (error) {
    console.error('Error fetching media stats:', error);
    return reply.status(500).send({ success: false, error: 'Failed to fetch stats' });
  }
}

module.exports = {
  getAllMedia,
  uploadMedia,
  deleteMedia,
  updateMedia,
  getMediaStats
};
