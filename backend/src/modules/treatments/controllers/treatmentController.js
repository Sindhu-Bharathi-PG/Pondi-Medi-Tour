const { eq } = require('drizzle-orm');
const db = require('../../../config/database');
const { treatments, hospitalDetails } = require('../../../database/schema');

/**
 * Algorithm to pick the BEST hospital for each treatment type
 * Criteria (in order of priority):
 * 1. Higher success rate
 * 2. Lower price (better value)
 * 3. isPopular flag
 * 4. More recent (higher ID = newer)
 */
const pickBestTreatment = (treatmentGroup) => {
    return treatmentGroup.sort((a, b) => {
        // 1. Higher success rate wins
        const successA = a.successRate || 0;
        const successB = b.successRate || 0;
        if (successB !== successA) return successB - successA;
        
        // 2. Lower price wins (better value)
        const priceA = a.minPrice || Infinity;
        const priceB = b.minPrice || Infinity;
        if (priceA !== priceB) return priceA - priceB;
        
        // 3. isPopular wins
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        
        // 4. Newer entry wins (higher ID)
        return b.id - a.id;
    })[0];
};

/**
 * Deduplicate treatments by name - show only best hospital per treatment
 */
const deduplicateTreatments = (allTreatments) => {
    // Group by normalized treatment name (remove [TEST] prefix, lowercase)
    const grouped = {};
    
    for (const treatment of allTreatments) {
        // Normalize name for grouping
        const normalizedName = treatment.name
            .replace(/\[TEST\]\s*/gi, '')
            .toLowerCase()
            .trim();
        
        if (!grouped[normalizedName]) {
            grouped[normalizedName] = [];
        }
        grouped[normalizedName].push(treatment);
    }
    
    // Pick the best from each group
    const bestTreatments = [];
    for (const name in grouped) {
        const best = pickBestTreatment(grouped[name]);
        bestTreatments.push(best);
    }
    
    return bestTreatments;
};

const getAllTreatments = async (req, reply) => {
    try {
        const { limit, hospitalId, category, popular, dedupe } = req.query;
        
        let results = await db.select({
            id: treatments.id,
            name: treatments.name,
            slug: treatments.slug,
            category: treatments.category,
            subCategory: treatments.subCategory,
            shortDescription: treatments.shortDescription,
            minPrice: treatments.minPrice,
            maxPrice: treatments.maxPrice,
            hospitalStay: treatments.hospitalStay,
            recoveryTime: treatments.recoveryTime,
            successRate: treatments.successRate,
            thumbnailUrl: treatments.thumbnailUrl,
            isPopular: treatments.isPopular,
            hospitalId: treatments.hospitalId,
            hospitalName: hospitalDetails.name
        })
        .from(treatments)
        .leftJoin(hospitalDetails, eq(treatments.hospitalId, hospitalDetails.id));
        
        // Filter by hospitalId
        if (hospitalId) {
            results = results.filter(t => t.hospitalId === parseInt(hospitalId));
        }
        
        // Filter by category
        if (category) {
            results = results.filter(t => t.category?.toLowerCase() === category.toLowerCase());
        }
        
        // Filter by popular
        if (popular === 'true') {
            results = results.filter(t => t.isPopular);
        }
        
        // DEDUPLICATE: Show only best hospital per treatment (default ON)
        if (dedupe !== 'false') {
            results = deduplicateTreatments(results);
        }
        
        // Sort by: isPopular first, then by success rate, then by name
        results.sort((a, b) => {
            if (a.isPopular && !b.isPopular) return -1;
            if (!a.isPopular && b.isPopular) return 1;
            const successDiff = (b.successRate || 0) - (a.successRate || 0);
            if (successDiff !== 0) return successDiff;
            return (a.name || '').localeCompare(b.name || '');
        });
        
        // Apply limit
        if (limit) {
            results = results.slice(0, parseInt(limit));
        }
        
        reply.send(results);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const getTreatmentBySlug = async (req, reply) => {
    const { slug } = req.params;
    try {
        let treatment;
        const isNumeric = /^\d+$/.test(slug);
        
        if (isNumeric) {
            [treatment] = await db.select({
                id: treatments.id,
                name: treatments.name,
                slug: treatments.slug,
                category: treatments.category,
                subCategory: treatments.subCategory,
                shortDescription: treatments.shortDescription,
                fullDescription: treatments.fullDescription,
                procedureSteps: treatments.procedureSteps,
                technology: treatments.technology,
                successRate: treatments.successRate,
                hospitalStay: treatments.hospitalStay,
                recoveryTime: treatments.recoveryTime,
                preRequisites: treatments.preRequisites,
                minPrice: treatments.minPrice,
                maxPrice: treatments.maxPrice,
                insuranceCovered: treatments.insuranceCovered,
                thumbnailUrl: treatments.thumbnailUrl,
                isPopular: treatments.isPopular,
                hospitalId: treatments.hospitalId,
                hospitalName: hospitalDetails.name,
                hospitalSlug: hospitalDetails.slug
            })
            .from(treatments)
            .leftJoin(hospitalDetails, eq(treatments.hospitalId, hospitalDetails.id))
            .where(eq(treatments.id, parseInt(slug)));
        } else {
            [treatment] = await db.select({
                id: treatments.id,
                name: treatments.name,
                slug: treatments.slug,
                category: treatments.category,
                subCategory: treatments.subCategory,
                shortDescription: treatments.shortDescription,
                fullDescription: treatments.fullDescription,
                procedureSteps: treatments.procedureSteps,
                technology: treatments.technology,
                successRate: treatments.successRate,
                hospitalStay: treatments.hospitalStay,
                recoveryTime: treatments.recoveryTime,
                preRequisites: treatments.preRequisites,
                minPrice: treatments.minPrice,
                maxPrice: treatments.maxPrice,
                insuranceCovered: treatments.insuranceCovered,
                thumbnailUrl: treatments.thumbnailUrl,
                isPopular: treatments.isPopular,
                hospitalId: treatments.hospitalId,
                hospitalName: hospitalDetails.name,
                hospitalSlug: hospitalDetails.slug
            })
            .from(treatments)
            .leftJoin(hospitalDetails, eq(treatments.hospitalId, hospitalDetails.id))
            .where(eq(treatments.slug, slug));
        }
        
        if (!treatment) {
            return reply.code(404).send({ error: 'Treatment not found' });
        }
        reply.send(treatment);
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllTreatments,
    getTreatmentBySlug
};
