/**
 * Migration script to copy hospital_profiles.description JSON 
 * to hospital_details.short_description and full_description
 * 
 * Matches hospitals by NAME since IDs differ between tables
 * Run with: node migrations/copy-descriptions.js
 */

const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL);

async function copyDescriptions() {
    console.log('🔄 Copying descriptions from hospital_profiles to hospital_details...\n');
    console.log('(Matching by hospital NAME)\n');
    
    try {
        // Get data from hospital_profiles table
        const profiles = await sql`
            SELECT id, name, description 
            FROM hospital_profiles
            WHERE description IS NOT NULL
        `;
        
        console.log(`Found ${profiles.length} hospital profile(s) with descriptions\n`);
        
        let updatedCount = 0;
        
        for (const profile of profiles) {
            const desc = typeof profile.description === 'string' 
                ? JSON.parse(profile.description) 
                : profile.description;
            
            // Handle various possible JSON field names
            const brief = desc.brief || desc.short || desc.shortDescription || '';
            const detailed = desc.detailed || desc.long || desc.full || desc.fullDescription || '';
            
            console.log(`📍 Profile: ${profile.name} (ID: ${profile.id})`);
            console.log(`   Brief: ${brief ? brief.substring(0, 50) + '...' : 'EMPTY'}`);
            console.log(`   Detailed: ${detailed ? detailed.substring(0, 50) + '...' : 'EMPTY'}`);
            
            // Update hospital_details matching by NAME (case-insensitive)
            if (brief || detailed) {
                const result = await sql`
                    UPDATE hospital_details 
                    SET 
                        short_description = COALESCE(${brief || null}, short_description),
                        full_description = COALESCE(${detailed || null}, full_description),
                        updated_at = NOW()
                    WHERE LOWER(name) = LOWER(${profile.name})
                    RETURNING id, name
                `;
                
                if (result.length > 0) {
                    console.log(`   ✅ Updated: ${result[0].name} (ID: ${result[0].id})\n`);
                    updatedCount++;
                } else {
                    console.log(`   ⚠️ No matching hospital_details found for: "${profile.name}"\n`);
                }
            }
        }

        console.log('─'.repeat(60));
        console.log(`\n✅ Migration completed! Updated ${updatedCount} hospital(s)`);
        
        // Show final status
        const finalCheck = await sql`
            SELECT id, name, 
                   CASE WHEN short_description IS NOT NULL AND short_description != '' THEN 'YES' ELSE 'NO' END as has_short,
                   CASE WHEN full_description IS NOT NULL AND full_description != '' THEN 'YES' ELSE 'NO' END as has_full
            FROM hospital_details
            ORDER BY id
        `;
        
        console.log('\n📊 Hospital Details Status:');
        finalCheck.forEach(h => {
            console.log(`   ${h.name}: Short=${h.has_short}, Full=${h.has_full}`);
        });

        await sql.end();
        
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        console.error(error);
        await sql.end();
        process.exit(1);
    }
}

copyDescriptions();

