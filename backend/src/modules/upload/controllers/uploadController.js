const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (request, reply) => {
    try {
        const data = await request.file();
        
        if (!data) {
            return reply.code(400).send({ error: 'No file uploaded' });
        }

        // Convert buffer to stream for Cloudinary
        const buffer = await data.toBuffer();
        
        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'hospital-profiles',
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            const bufferStream = Readable.from(buffer);
            bufferStream.pipe(uploadStream);
        });

        return reply.send({
            success: true,
            url: result.secure_url,
            public_id: result.public_id
        });

    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
            error: 'Failed to upload image',
            message: error.message
        });
    }
};

module.exports = {
    uploadImage
};
