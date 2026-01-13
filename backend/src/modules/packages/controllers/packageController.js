const { eq, desc, sql } = require('drizzle-orm');
const db = require('../../../config/database');
const { packages, hospitalDetails, treatments } = require('../../../database/schema');

// Helper: Calculate popularity score
const calculatePopularityScore = (viewCount, inquiryCount, isFeatured) => {
    return (viewCount * 1) + (inquiryCount * 5) + (isFeatured ? 50 : 0);
};

const getAllPackages = async (req, reply) => {
    try {
        const { limit, hospitalId, category, featured, active } = req.query;
        
        // Simplified query that works even with schema differences
        let results;
        try {
            results = await db.select({
                id: packages.id,
                name: packages.name,
                slug: packages.slug,
                category: packages.category,
                price: packages.price,
                discountedPrice: packages.discountedPrice,
                currency: packages.currency,
                durationDays: packages.durationDays,
                durationNights: packages.durationNights,
                inclusions: packages.inclusions,
                shortDescription: packages.shortDescription,
                imageUrl: packages.imageUrl,
                isActive: packages.isActive,
                isFeatured: packages.isFeatured,
                hospitalId: packages.hospitalId,
                treatmentId: packages.treatmentId,
                hospitalName: hospitalDetails.name,
                createdAt: packages.createdAt,
                viewCount: packages.viewCount,
                inquiryCount: packages.inquiryCount,
            })
            .from(packages)
            .leftJoin(hospitalDetails, eq(packages.hospitalId, hospitalDetails.id));
        } catch (joinErr) {
            // If join fails, try without join
            req.log.warn('Join failed, trying simple query:', joinErr.message);
            results = await db.select().from(packages);
        }
        
        // Filter by active (default true)
        if (active !== 'false') {
            results = results.filter(p => p.isActive !== false);
        }
        
        // Filter by hospitalId
        if (hospitalId) {
            results = results.filter(p => p.hospitalId === parseInt(hospitalId));
        }
        
        // Filter by category
        if (category) {
            results = results.filter(p => p.category?.toLowerCase() === category.toLowerCase());
        }
        
        // Filter by featured
        if (featured === 'true') {
            results = results.filter(p => p.isFeatured);
        }
        
        // Apply limit
        if (limit) {
            results = results.slice(0, parseInt(limit));
        }
        
        reply.send(results);
    } catch (err) {
        req.log.error('getAllPackages error:', err);
        reply.code(500).send({ error: 'Internal Server Error', details: err.message });
    }
};

const getPackageBySlug = async (req, reply) => {
    const { slug } = req.params;
    try {
        const isNumeric = /^\d+$/.test(slug);
        let pkg;
        
        const selectFields = {
            id: packages.id,
            name: packages.name,
            slug: packages.slug,
            category: packages.category,
            price: packages.price,
            discountedPrice: packages.discountedPrice,
            currency: packages.currency,
            durationDays: packages.durationDays,
            durationNights: packages.durationNights,
            inclusions: packages.inclusions,
            shortDescription: packages.shortDescription,
            fullDescription: packages.fullDescription,
            imageUrl: packages.imageUrl,
            isActive: packages.isActive,
            isFeatured: packages.isFeatured,
            hospitalId: packages.hospitalId,
            treatmentId: packages.treatmentId,
            viewCount: packages.viewCount,
            inquiryCount: packages.inquiryCount,
            popularityScore: packages.popularityScore,
            hospitalName: hospitalDetails.name,
            hospitalSlug: hospitalDetails.slug,
            treatmentName: treatments.name
        };
        
        if (isNumeric) {
            [pkg] = await db.select(selectFields)
            .from(packages)
            .leftJoin(hospitalDetails, eq(packages.hospitalId, hospitalDetails.id))
            .leftJoin(treatments, eq(packages.treatmentId, treatments.id))
            .where(eq(packages.id, parseInt(slug)));
        } else {
            [pkg] = await db.select(selectFields)
            .from(packages)
            .leftJoin(hospitalDetails, eq(packages.hospitalId, hospitalDetails.id))
            .leftJoin(treatments, eq(packages.treatmentId, treatments.id))
            .where(eq(packages.slug, slug));
        }
        
        if (!pkg) {
            return reply.code(404).send({ error: 'Package not found' });
        }
        
        // Increment view count and recalculate popularity score
        const newViewCount = (pkg.viewCount || 0) + 1;
        const newPopularityScore = calculatePopularityScore(newViewCount, pkg.inquiryCount || 0, pkg.isFeatured);
        
        await db.update(packages)
            .set({ 
                viewCount: newViewCount, 
                popularityScore: newPopularityScore,
                updatedAt: new Date()
            })
            .where(eq(packages.id, pkg.id));
        
        // Return updated values
        pkg.viewCount = newViewCount;
        pkg.popularityScore = newPopularityScore;
        
        reply.send(pkg);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

// Increment inquiry count (to be called when an inquiry is made for a package)
const incrementInquiryCount = async (packageId) => {
    try {
        const [pkg] = await db.select({
            inquiryCount: packages.inquiryCount,
            viewCount: packages.viewCount,
            isFeatured: packages.isFeatured
        })
        .from(packages)
        .where(eq(packages.id, packageId));
        
        if (pkg) {
            const newInquiryCount = (pkg.inquiryCount || 0) + 1;
            const newPopularityScore = calculatePopularityScore(pkg.viewCount || 0, newInquiryCount, pkg.isFeatured);
            
            await db.update(packages)
                .set({ 
                    inquiryCount: newInquiryCount, 
                    popularityScore: newPopularityScore,
                    updatedAt: new Date()
                })
                .where(eq(packages.id, packageId));
        }
    } catch (err) {
        console.error('Error incrementing inquiry count:', err);
    }
};

// Admin/Superadmin: Update popularity score manually
const updatePopularityScore = async (req, reply) => {
    const { id } = req.params;
    const { popularityScore } = req.body;
    
    try {
        if (typeof popularityScore !== 'number' || popularityScore < 0) {
            return reply.code(400).send({ error: 'Invalid popularity score' });
        }
        
        await db.update(packages)
            .set({ 
                popularityScore: popularityScore,
                updatedAt: new Date()
            })
            .where(eq(packages.id, parseInt(id)));
        
        reply.send({ success: true, message: 'Popularity score updated' });
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const deletePackage = async (req, reply) => {
    const { id } = req.params;
    try {
        const [deleted] = await db.delete(packages)
            .where(eq(packages.id, parseInt(id)))
            .returning();
            
        if (!deleted) {
            return reply.code(404).send({ error: 'Package not found' });
        }
        
        reply.send({ success: true, message: 'Package deleted successfully' });
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllPackages,
    getPackageBySlug,
    incrementInquiryCount,
    updatePopularityScore,
    calculatePopularityScore,
    deletePackage
};

