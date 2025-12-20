const postgres = require('postgres');
const fs = require('fs').promises;
const path = require('path');

const sql = postgres(process.env.DATABASE_URL);

/**
 * CMS Controller
 * Handles page configuration management for the page builder
 */

/**
 * Get page configuration by type (medical/wellness)
 */
async function getPageConfig(request, reply) {
  try {
    const { pageType } = request.params;
    const { status = 'published' } = request.query;

    // Validate page type
    if (!['medical', 'wellness'].includes(pageType)) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Invalid page type. Must be "medical" or "wellness"'
      });
    }

    // Get configuration from database
    const [config] = await sql`
      SELECT id, page_type, config, status, version, modified_by, published_at, updated_at
      FROM page_configurations
      WHERE page_type = ${pageType} AND status = ${status}
      ORDER BY version DESC
      LIMIT 1
    `;

    if (!config) {
      // Fallback to default JSON file if not in database
      const defaultConfigPath = path.join(
        __dirname,
        '../../../..',
        'app',
        'config',
        'home',
        `${pageType}Config.json`
      );
      
      try {
        const defaultConfig = JSON.parse(await fs.readFile(defaultConfigPath, 'utf-8'));
        return reply.send({
          pageType,
          config: defaultConfig,
          status: 'default',
          version: 0,
          source: 'default'
        });
      } catch (fileError) {
        return reply.status(404).send({
          error: 'Not Found',
          message: 'Page configuration not found'
        });
      }
    }

    return reply.send({
      id: config.id,
      pageType: config.page_type,
      config: config.config,
      status: config.status,
      version: config.version,
      modifiedBy: config.modified_by,
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

    // Validate page type
    if (!['medical', 'wellness'].includes(pageType)) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Invalid page type. Must be "medical" or "wellness"'
      });
    }

    // Validate config structure
    if (!config || typeof config !== 'object') {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Invalid configuration format'
      });
    }

    // Get current version
    const [currentConfig] = await sql`
      SELECT version FROM page_configurations
      WHERE page_type = ${pageType}
      ORDER BY version DESC
      LIMIT 1
    `;

    const newVersion = currentConfig ? currentConfig.version + 1 : 1;

    // Save current version to history if exists
    if (currentConfig) {
      const [existing] = await sql`
        SELECT config, version FROM page_configurations
        WHERE page_type = ${pageType} AND status = 'draft'
      `;

      if (existing) {
        await sql`
          INSERT INTO page_configuration_history (page_type, config, version, modified_by, notes)
          VALUES (${pageType}, ${sql.json(existing.config)}, ${existing.version}, ${userId}, ${notes || null})
        `;
      }
    }

    // Update or insert draft configuration
    const [updatedConfig] = await sql`
      INSERT INTO page_configurations (page_type, config, status, version, modified_by)
      VALUES (${pageType}, ${sql.json(config)}, 'draft', ${newVersion}, ${userId})
      ON CONFLICT (page_type) 
      DO UPDATE SET
        config = ${sql.json(config)},
        status = 'draft',
        version = ${newVersion},
        modified_by = ${userId},
        updated_at = NOW()
      RETURNING id, page_type, config, status, version, updated_at
    `;

    return reply.send({
      message: 'Configuration saved as draft',
      id: updatedConfig.id,
      pageType: updatedConfig.page_type,
      version: updatedConfig.version,
      status: updatedConfig.status,
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

    // Validate page type
    if (!['medical', 'wellness'].includes(pageType)) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Invalid page type. Must be "medical" or "wellness"'
      });
    }

    // Get draft configuration
    const [draftConfig] = await sql`
      SELECT id, config, version
      FROM page_configurations
      WHERE page_type = ${pageType} AND status = 'draft'
      ORDER BY version DESC
      LIMIT 1
    `;

    if (!draftConfig) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'No draft configuration to publish'
      });
    }

    // Archive current published version to history
    const [currentPublished] = await sql`
      SELECT config, version
      FROM page_configurations
      WHERE page_type = ${pageType} AND status = 'published'
    `;

    if (currentPublished) {
      await sql`
        INSERT INTO page_configuration_history (page_type, config, version, modified_by, notes)
        VALUES (${pageType}, ${sql.json(currentPublished.config)}, ${currentPublished.version}, ${userId}, 'Published version archived')
      `;
    }

    // Publish the draft
    const [publishedConfig] = await sql`
      UPDATE page_configurations
      SET status = 'published', published_at = NOW(), modified_by = ${userId}
      WHERE page_type = ${pageType} AND status = 'draft'
      RETURNING id, page_type, config, status, version, published_at
    `;

    return reply.send({
      message: 'Configuration published successfully',
      id: publishedConfig.id,
      pageType: publishedConfig.page_type,
      version: publishedConfig.version,
      status: publishedConfig.status,
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
      SELECT id, version, modified_by, created_at, notes
      FROM page_configuration_history
      WHERE page_type = ${pageType}
      ORDER BY version DESC
      LIMIT ${limit}
    `;

    return reply.send({
      pageType,
      history: history.map(h => ({
        id: h.id,
        version: h.version,
        modifiedBy: h.modified_by,
        createdAt: h.created_at,
        notes: h.notes
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
      FROM page_configuration_history
      WHERE page_type = ${pageType} AND id = ${versionId}
    `;

    if (!historicalVersion) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'Version not found'
      });
    }

    // Get current max version
    const [currentConfig] = await sql`
      SELECT version FROM page_configurations
      WHERE page_type = ${pageType}
      ORDER BY version DESC
      LIMIT 1
    `;

    const newVersion = currentConfig ? currentConfig.version + 1 : 1;

    // Create new draft with the historical configuration
    const [revertedConfig] = await sql`
      INSERT INTO page_configurations (page_type, config, status, version, modified_by)
      VALUES (${pageType}, ${historicalVersion.config}, 'draft', ${newVersion}, ${userId})
      ON CONFLICT (page_type)
      DO UPDATE SET
        config = ${historicalVersion.config},
        status = 'draft',
        version = ${newVersion},
        modified_by = ${userId},
        updated_at = NOW()
      RETURNING id, page_type, version, status
    `;

    return reply.send({
      message: `Reverted to version ${historicalVersion.version}`,
      id: revertedConfig.id,
      pageType: revertedConfig.page_type,
      version: revertedConfig.version,
      status: revertedConfig.status
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

    // TODO: Implement actual file upload to cloud storage (Cloudinary, S3, etc.)
    // For now, return a placeholder URL
    const fileName = `${Date.now()}-${data.filename}`;
    const imageUrl = `/uploads/${fileName}`;

    // Save file locally (in production, upload to cloud storage)
    const uploadDir = path.join(__dirname, '../../../../public/uploads');
    const filePath = path.join(uploadDir, fileName);
    
    // Create uploads directory if it doesn't exist
    await fs.mkdir(uploadDir, { recursive: true });
    
    // Save file
    const buffer = await data.toBuffer();
    await fs.writeFile(filePath, buffer);

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
  getPageConfig,
  updatePageConfig,
  publishPageConfig,
  getVersionHistory,
  revertToVersion,
  uploadImage
};
