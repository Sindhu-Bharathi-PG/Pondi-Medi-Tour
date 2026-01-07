/**
 * Migration Script: hospital_profiles → Normalized Tables
 * 
 * Splits data from the old hospital_profiles table into:
 * - hospital_details
 * - doctors
 * - treatments
 * - packages
 * 
 * Run: node migrate-hospital-profiles.js
 */

require('dotenv').config();
const postgres = require('postgres');

const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = postgres(DATABASE_URL);

async function migrateHospitalProfiles() {
    console.log('🔄 Starting hospital_profiles migration...\n');

    try {
        // 1. Check if hospital_profiles table exists
        const tableCheck = await sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'hospital_profiles'
            );
        `;
        
        if (!tableCheck[0].exists) {
            console.log('❌ hospital_profiles table does not exist!');
            process.exit(1);
        }

        // 2. Fetch all hospital profiles
        const profiles = await sql`SELECT * FROM hospital_profiles`;
        console.log(`📋 Found ${profiles.length} hospital profiles to migrate\n`);

        if (profiles.length === 0) {
            console.log('⚠️ No data to migrate');
            process.exit(0);
        }

        let migratedHospitals = 0;
        let migratedDoctors = 0;
        let migratedTreatments = 0;
        let migratedPackages = 0;

        for (const profile of profiles) {
            console.log(`\n🏥 Processing: ${profile.name}`);

            // 3. Create user if not exists (for hospital login)
            let userId = null;
            const email = profile.contact?.email || `hospital-${profile.id}@pondimeditour.com`;
            
            const existingUser = await sql`
                SELECT id FROM users WHERE email = ${email}
            `;

            if (existingUser.length > 0) {
                userId = existingUser[0].id;
                console.log(`   ✓ User already exists: ${email}`);
            } else {
                const newUser = await sql`
                    INSERT INTO users (email, password, name, user_type, is_active)
                    VALUES (
                        ${email},
                        '$2b$10$8K5jZQxvSCpGxIZKuHq4xeWvlN7rM9KZmS5VVfILSFyJpXHhLXlXK',
                        ${profile.name},
                        'hospital',
                        true
                    )
                    RETURNING id
                `;
                userId = newUser[0].id;
                console.log(`   ✓ Created user: ${email}`);
            }

            // 4. Insert into hospital_details
            const slug = profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            
            // Check if hospital already exists
            const existingHospital = await sql`
                SELECT id FROM hospital_details WHERE slug = ${slug}
            `;

            let hospitalId;
            if (existingHospital.length > 0) {
                hospitalId = existingHospital[0].id;
                console.log(`   ✓ Hospital already exists with ID: ${hospitalId}`);
            } else {
                const hospital = await sql`
                    INSERT INTO hospital_details (
                        user_id,
                        name,
                        slug,
                        type,
                        establishment_year,
                        short_description,
                        full_description,
                        infrastructure,
                        international_services,
                        accreditations,
                        specialized_centers,
                        location,
                        logo_url,
                        cover_url,
                        gallery,
                        website,
                        phone,
                        email,
                        emergency_phone,
                        status
                    ) VALUES (
                        ${userId},
                        ${profile.name},
                        ${slug},
                        ${profile.type || 'Private'},
                        ${profile.establishment_year},
                        ${profile.description?.short || ''},
                        ${profile.description?.long || ''},
                        ${JSON.stringify({
                            totalBeds: profile.beds || 0,
                            icuBeds: 0,
                            operatingTheaters: 0,
                            specializedUnits: profile.departments || [],
                            technologies: profile.equipment || [],
                            amenities: profile.facilities || []
                        })},
                        ${JSON.stringify({
                            languages: ['English', 'Tamil', 'Hindi'],
                            services: [],
                            coordinatorAvailable: true,
                            teleconsultation: true
                        })},
                        ${JSON.stringify(profile.accreditations || [])},
                        ${sql.array(profile.specialties || [])},
                        ${JSON.stringify(profile.location || {})},
                        ${profile.photos?.[0] || ''},
                        ${profile.photos?.[1] || ''},
                        ${JSON.stringify((profile.photos || []).map((url, i) => ({ url, caption: `Photo ${i + 1}` })))},
                        ${profile.contact?.website || ''},
                        ${profile.contact?.phone || ''},
                        ${profile.contact?.email || ''},
                        ${profile.contact?.emergency || ''},
                        'approved'
                    )
                    RETURNING id
                `;
                hospitalId = hospital[0].id;
                migratedHospitals++;
                console.log(`   ✓ Created hospital_details with ID: ${hospitalId}`);
            }

            // Update user with hospital_id
            await sql`
                UPDATE users SET hospital_id = ${hospitalId} WHERE id = ${userId}
            `;

            // 5. Migrate doctors
            const doctors = profile.doctors || [];
            for (const doc of doctors) {
                // Check if doctor already exists
                const existingDoc = await sql`
                    SELECT id FROM doctors WHERE hospital_id = ${hospitalId} AND name = ${doc.name || 'Unknown Doctor'}
                `;
                
                if (existingDoc.length === 0) {
                    await sql`
                        INSERT INTO doctors (
                            hospital_id,
                            name,
                            specialty,
                            sub_specialty,
                            credentials,
                            experience,
                            image_url,
                            bio,
                            surgeries_count,
                            rating,
                            reviews_count,
                            languages,
                            is_available,
                            is_featured,
                            education,
                            expertise,
                            awards
                        ) VALUES (
                            ${hospitalId},
                            ${doc.name || 'Unknown Doctor'},
                            ${doc.specialty || doc.specialization || 'General'},
                            ${doc.sub_specialty || null},
                            ${doc.credentials || doc.qualification || ''},
                            ${doc.experience || ''},
                            ${doc.image_url || doc.photo || ''},
                            ${doc.bio || doc.description || ''},
                            ${doc.surgeries || 0},
                            ${doc.rating || 4.5},
                            ${doc.reviews || 0},
                            ${sql.array(doc.languages || ['English', 'Tamil'])},
                            true,
                            ${doc.is_featured || false},
                            ${JSON.stringify(doc.education || [])},
                            ${sql.array(doc.expertise || [])},
                            ${sql.array(doc.awards || [])}
                        )
                    `;
                    migratedDoctors++;
                }
            }
            console.log(`   ✓ Migrated ${doctors.length} doctors`);

            // 6. Migrate treatments
            const treatments = profile.treatments || [];
            for (const treat of treatments) {
                const treatSlug = (treat.name || 'treatment').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                
                const existingTreat = await sql`
                    SELECT id FROM treatments WHERE hospital_id = ${hospitalId} AND name = ${treat.name || 'Treatment'}
                `;
                
                if (existingTreat.length === 0) {
                    await sql`
                        INSERT INTO treatments (
                            hospital_id,
                            name,
                            slug,
                            category,
                            short_description,
                            full_description,
                            technology,
                            success_rate,
                            hospital_stay,
                            recovery_time,
                            min_price,
                            max_price,
                            thumbnail_url,
                            is_popular
                        ) VALUES (
                            ${hospitalId},
                            ${treat.name || 'Treatment'},
                            ${treatSlug + '-' + hospitalId},
                            ${treat.category || treat.department || 'General'},
                            ${treat.short_description || treat.description || ''},
                            ${treat.full_description || treat.details || ''},
                            ${sql.array(treat.technology || [])},
                            ${treat.success_rate || 90},
                            ${treat.hospital_stay || '2-3 days'},
                            ${treat.recovery_time || '1-2 weeks'},
                            ${treat.min_price || treat.price || 0},
                            ${treat.max_price || treat.price || 0},
                            ${treat.image_url || ''},
                            ${treat.is_popular || false}
                        )
                    `;
                    migratedTreatments++;
                }
            }
            console.log(`   ✓ Migrated ${treatments.length} treatments`);

            // 7. Migrate packages
            const packages = profile.packages || [];
            for (const pkg of packages) {
                const pkgSlug = (pkg.name || 'package').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                
                const existingPkg = await sql`
                    SELECT id FROM packages WHERE hospital_id = ${hospitalId} AND name = ${pkg.name || 'Package'}
                `;
                
                if (existingPkg.length === 0) {
                    await sql`
                        INSERT INTO packages (
                            hospital_id,
                            name,
                            slug,
                            category,
                            price,
                            discounted_price,
                            currency,
                            duration_days,
                            duration_nights,
                            inclusions,
                            short_description,
                            full_description,
                            image_url,
                            is_active,
                            is_featured
                        ) VALUES (
                            ${hospitalId},
                            ${pkg.name || 'Health Package'},
                            ${pkgSlug + '-' + hospitalId},
                            ${pkg.category || 'General Health'},
                            ${pkg.price || 0},
                            ${pkg.discounted_price || null},
                            'INR',
                            ${parseInt(String(pkg.duration_days || pkg.duration || 1).replace(/\D/g, '')) || 1},
                            ${pkg.duration_nights || null},
                            ${JSON.stringify(pkg.inclusions || {})},
                            ${pkg.short_description || pkg.description || ''},
                            ${pkg.full_description || ''},
                            ${pkg.image_url || ''},
                            true,
                            ${pkg.is_featured || false}
                        )
                    `;
                    migratedPackages++;
                }
            }
            console.log(`   ✓ Migrated ${packages.length} packages`);
        }

        console.log('\n' + '='.repeat(50));
        console.log('✅ Migration Complete!');
        console.log('='.repeat(50));
        console.log(`   🏥 Hospitals migrated: ${migratedHospitals}`);
        console.log(`   👨‍⚕️ Doctors migrated: ${migratedDoctors}`);
        console.log(`   💊 Treatments migrated: ${migratedTreatments}`);
        console.log(`   📦 Packages migrated: ${migratedPackages}`);
        console.log('='.repeat(50));

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await sql.end();
    }
}

// Run migration
migrateHospitalProfiles();
