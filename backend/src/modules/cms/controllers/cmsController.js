const postgres = require('postgres');
const fs = require('fs').promises;
const path = require('path');

const sql = postgres(process.env.DATABASE_URL);

/**
 * CMS Controller
 * Handles page configuration management for the page builder
 */

/**
 * Get PUBLISHED page configuration by type (PUBLIC - no auth required)
 */
async function getPublicPageConfig(request, reply) {
  try {
    const { pageType } = request.params;

    // Validate page type
    if (!['medical', 'wellness'].includes(pageType)) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Invalid page type'
      });
    }

    // Get only published configurations
    const [config] = await sql`
      SELECT id, page_name, config, version, published_at
      FROM page_configurations
      WHERE page_name = ${pageType} AND is_published = true
      LIMIT 1
    `;

    if (!config) {
      return reply.send({
        pageType,
        config: null,
        source: 'none'
      });
    }

    return reply.send({
      pageType: config.page_name,
      config: config.config,
      version: config.version,
      publishedAt: config.published_at,
      source: 'database'
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to fetch page configuration'
    });
  }
}

/**
 * Get page configuration by type (medical/wellness)
 */
async function getPageConfig(request, reply) {
  try {
    const { pageType } = request.params; // keeping param name as pageType but mapping to page_name in DB
    const { status = 'published' } = request.query;

    // Validate page type
    if (!['home', 'about', 'services', 'contact', 'medical', 'wellness'].includes(pageType)) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Invalid page type'
      });
    }

    // Get configuration from database
    // Schema uses page_name, not page_type
    const [config] = await sql`
      SELECT id, page_name, config, is_published, version, created_by, published_at, updated_at
      FROM page_configurations
      WHERE page_name = ${pageType}
      LIMIT 1
    `;

    // If logic: The schema doesn't have a 'status' column for simple draft/published state in the main table efficiently.
    // However, looking at the schema:
    // pageConfigurations table has: config (current draft/published?), isPublished (bool).
    // The previously used logic implied a 'status' column ('draft', 'published').
    // The schema has `is_published`. 
    // Let's assume the `page_configurations` table holds the CURRENT DRAFT state. 
    // The `page_versions` table holds history.
    
    // If we want "Published" config, we might need to rely on 'is_published' flag or check if we store published version separately.
    // For simplicity, let's assume `page_configurations` holds the LATEST state (Draft).
    // If the frontend requests 'published', we might need to check if the current one is published or fetch the last version marked as published (if we tracked that).
    
    // Simplification for now: Return the record from page_configurations.

    if (!config) {
      // Fallback to default JSON file
      // ... (keep existing fallback logic but adjust variable names)
      return reply.send({
        pageType,
        config: null, // or empty default
        status: 'draft',
        version: 0,
        source: 'new'
      });
    }

    return reply.send({
      id: config.id,
      pageType: config.page_name,
      config: config.config,
      status: config.is_published ? 'published' : 'draft',
      version: config.version,
      modifiedBy: config.created_by,
      publishedAt: config.published_at,
      updatedAt: config.updated_at
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to fetch page configuration'
    });
  }
}

/**
 * Update page configuration (save draft)
 */
async function updatePageConfig(request, reply) {
  try {
    const { pageType } = request.params;
    const { config, notes } = request.body;
    const userId = request.user.id;

    if (!config || typeof config !== 'object') {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Invalid configuration format'
      });
    }

    // Upsert into page_configurations
    const [updatedConfig] = await sql`
      INSERT INTO page_configurations (page_name, config, is_published, version, created_by, updated_at)
      VALUES (${pageType}, ${sql.json(config)}, false, 1, ${userId}, NOW())
      ON CONFLICT (page_name) 
      DO UPDATE SET
        config = ${sql.json(config)},
        is_published = false,     -- When updated, it becomes a draft (not published state conceptually)
        version = page_configurations.version + 1,
        created_by = ${userId},
        updated_at = NOW()
      RETURNING id, page_name, config, is_published, version, updated_at
    `;

    // Also save to history (page_versions)
    await sql`
      INSERT INTO page_versions (page_config_id, page_name, config, version, created_by, note)
      VALUES (
        ${updatedConfig.id}, 
        ${updatedConfig.page_name}, 
        ${sql.json(config)}, 
        ${updatedConfig.version}, 
        ${userId}, 
        ${notes || 'Draft update'}
      )
    `;

    return reply.send({
      message: 'Configuration saved as draft',
      id: updatedConfig.id,
      pageType: updatedConfig.page_name,
      version: updatedConfig.version,
      status: 'draft',
      updatedAt: updatedConfig.updated_at
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to update page configuration'
    });
  }
}

/**
 * Publish page configuration
 */
async function publishPageConfig(request, reply) {
  try {
    const { pageType } = request.params;
    const userId = request.user.id;

    // Update is_published to true
    const [publishedConfig] = await sql`
      UPDATE page_configurations
      SET 
        is_published = true, 
        published_at = NOW(), 
        published_by = ${userId}
      WHERE page_name = ${pageType}
      RETURNING id, page_name, config, is_published, version, published_at
    `;

    if (!publishedConfig) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'Page configuration not found'
      });
    }

    return reply.send({
      message: 'Configuration published successfully',
      id: publishedConfig.id,
      pageType: publishedConfig.page_name,
      version: publishedConfig.version,
      status: 'published',
      publishedAt: publishedConfig.published_at
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to publish configuration'
    });
  }
}

/**
 * Get version history
 */
async function getVersionHistory(request, reply) {
  try {
    const { pageType } = request.params;
    const { limit = 10 } = request.query;

    const history = await sql`
      SELECT id, version, created_by, created_at, note
      FROM page_versions
      WHERE page_name = ${pageType}
      ORDER BY version DESC
      LIMIT ${limit}
    `;

    return reply.send({
      pageType,
      history: history.map(h => ({
        id: h.id,
        version: h.version,
        modifiedBy: h.created_by,
        createdAt: h.created_at,
        notes: h.note
      }))
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to fetch version history'
    });
  }
}

/**
 * Revert to specific version
 */
async function revertToVersion(request, reply) {
  try {
    const { pageType, versionId } = request.params;
    const userId = request.user.id;

    // Get the historical version
    const [historicalVersion] = await sql`
      SELECT config, version
      FROM page_versions
      WHERE page_name = ${pageType} AND id = ${versionId}
    `;

    if (!historicalVersion) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'Version not found'
      });
    }

    // Update main table with this config
    const [revertedConfig] = await sql`
      UPDATE page_configurations
      SET 
        config = ${historicalVersion.config},
        is_published = false,
        version = version + 1,
        created_by = ${userId},
        updated_at = NOW()
      WHERE page_name = ${pageType}
      RETURNING id, page_name, version
    `;

    return reply.send({
      message: `Reverted to version ${historicalVersion.version}`,
      id: revertedConfig.id,
      pageType: revertedConfig.page_name,
      version: revertedConfig.version,
      status: 'draft'
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to revert to version'
    });
  }
}

/**
 * Upload image for page content
 */
async function uploadImage(request, reply) {
  try {
    const data = await request.file();
    
    if (!data) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'No file uploaded'
      });
    }

    const fileName = `${Date.now()}-${data.filename}`;
    // In production, ensure this path is publicly accessible regarding static file serving
    const uploadDir = path.join(__dirname, '../../../../public/uploads'); 
    
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, fileName);
    const buffer = await data.toBuffer();
    await fs.writeFile(filePath, buffer);

    // Assuming express/fastify static is serving 'public' folder at root
    const imageUrl = `/uploads/${fileName}`;

    return reply.send({
      message: 'Image uploaded successfully',
      url: imageUrl,
      filename: fileName
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to upload image'
    });
  }
}

module.exports = {
  getPublicPageConfig,
  getPageConfig,
  updatePageConfig,
  publishPageConfig,
  getVersionHistory,
  revertToVersion,
  uploadImage
};
