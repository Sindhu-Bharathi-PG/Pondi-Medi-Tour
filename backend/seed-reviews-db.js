const postgres = require('postgres');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function seedReviewsSmart() {
  const sql = postgres(DATABASE_URL, { ssl: 'require' });

  try {
    console.log('🌱 Starting smart reviews seed...\n');

    // Step 1: Check which hospitals exist
    console.log('🏥 Checking existing hospitals...');
    const hospitals = await sql`
      SELECT id FROM hospital_details ORDER BY id
    `;
    
    const existingHospitalIds = hospitals.map(h => h.id);
    console.log(`✅ Found ${existingHospitalIds.length} hospitals: [${existingHospitalIds.join(', ')}]\n`);

    // Step 2: Create table
    console.log('📋 Creating reviews table...');
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        hospital_id INTEGER REFERENCES hospital_details(id) ON DELETE CASCADE,
        user_name TEXT NOT NULL,
        user_email TEXT,
        origin TEXT,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title TEXT,
        comment TEXT,
        treatment_type TEXT,
        treatment_date TIMESTAMP,
        is_verified BOOLEAN DEFAULT false,
        is_approved BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Table ready\n');

    // Step 3: Clear existing reviews
    const existing = await sql`SELECT COUNT(*) FROM reviews`;
    if (parseInt(existing[0].count) > 0) {
      console.log(`⚠️  Found ${existing[0].count} existing reviews. Clearing...`);
      await sql`TRUNCATE reviews RESTART IDENTITY CASCADE`;
    }

    // Step 4: Prepare ALL reviews (will filter later)
    const allReviews = [
      // Hospital 1
      { hospital_id: 1, user_name: 'John Smith', user_email: 'john.smith@email.com', origin: 'USA', rating: 5, title: 'Excellent Knee Replacement', comment: 'Outstanding care from Dr. Kumar and team. Recovery was smooth and painless. The facility is world-class.', treatment_type: 'Orthopedic Surgery', treatment_date: '2024-06-15', is_verified: true },
      { hospital_id: 1, user_name: 'Sarah Johnson', user_email: 'sarah.j@email.com', origin: 'UK', rating: 5, title: 'Life-Saving Cardiac Surgery', comment: 'Traveled from London for bypass surgery. Saved over $80,000 compared to UK private hospitals. Exceptional care!', treatment_type: 'Cardiology', treatment_date: '2024-08-22', is_verified: true },
      { hospital_id: 1, user_name: 'Mohammed Al-Rashid', user_email: 'mohammed.ar@email.com', origin: 'UAE', rating: 4, title: 'Professional Service', comment: 'Very good experience overall. Modern equipment and skilled doctors.', treatment_type: 'General Surgery', treatment_date: '2024-09-10', is_verified: true },
      { hospital_id: 1, user_name: 'Emily Chen', user_email: 'emily.chen@email.com', origin: 'Australia', rating: 5, title: 'IVF Success Story!', comment: 'After 3 failed attempts in Australia, found success here! The fertility team is incredible. Now 6 months pregnant!', treatment_type: 'IVF & Fertility', treatment_date: '2024-07-05', is_verified: true },
      { hospital_id: 1, user_name: 'David Brown', user_email: 'd.brown@email.com', origin: 'Canada', rating: 5, title: 'Amazing Spine Surgery', comment: 'Dr. Patel is a genius. Had spinal fusion and recovery exceeded expectations. Highly recommend!', treatment_type: 'Neurosurgery', treatment_date: '2024-10-18', is_verified: true },
      { hospital_id: 1, user_name: 'Lisa Anderson', user_email: 'lisa.a@email.com', origin: 'USA', rating: 4, title: 'Good Cancer Treatment', comment: 'Received chemotherapy here. Oncology team was compassionate and professional.', treatment_type: 'Oncology', treatment_date: '2024-05-12', is_verified: true },
      { hospital_id: 1, user_name: 'James Wilson', user_email: 'j.wilson@email.com', origin: 'UK', rating: 5, title: 'Hip Replacement Success', comment: 'Pain-free for first time in years! Surgery went perfectly.', treatment_type: 'Orthopedics', treatment_date: '2024-11-03', is_verified: true },

      // Hospital 2
      { hospital_id: 2, user_name: 'Priya Sharma', user_email: 'priya.s@email.com', origin: 'Singapore', rating: 5, title: 'Outstanding Emergency Care', comment: 'Had a medical emergency while visiting. The ER team was amazing.', treatment_type: 'Emergency Care', treatment_date: '2024-09-20', is_verified: true },
      { hospital_id: 2, user_name: 'Robert Taylor', user_email: 'r.taylor@email.com', origin: 'USA', rating: 4, title: 'Good Value Treatment', comment: 'Affordable and professional care. Wait times were longer than private hospitals but quality was good.', treatment_type: 'General Medicine', treatment_date: '2024-07-18', is_verified: true },
      { hospital_id: 2, user_name: 'Anna Mueller', user_email: 'anna.m@email.com', origin: 'Germany', rating: 5, title: 'Exceptional Eye Surgery', comment: 'LASIK surgery was perfect! Vision is 20/20 now. Dr. Reddy is highly skilled.', treatment_type: 'Ophthalmology', treatment_date: '2024-08-30', is_verified: true },
      { hospital_id: 2, user_name: 'Michael O\'Brien', user_email: 'michael.ob@email.com', origin: 'Ireland', rating: 4, title: 'Solid Healthcare', comment: 'Had appendectomy here. Professional staff, clean facilities.', treatment_type: 'General Surgery', treatment_date: '2024-10-05', is_verified: true },
      { hospital_id: 2, user_name: 'Yuki Tanaka', user_email: 'yuki.t@email.com', origin: 'Japan', rating: 5, title: 'World-Class Gastro Care', comment: 'The gastroenterology department diagnosed and treated me perfectly.', treatment_type: 'Gastroenterology', treatment_date: '2024-06-25', is_verified: false },

      // Hospital 3
      { hospital_id: 3, user_name: 'Carlos Rodriguez', user_email: 'carlos.r@email.com', origin: 'Spain', rating: 5, title: 'Dental Implants Excellence', comment: 'Got 6 dental implants. Results are perfect and cost was 1/4 of Spain prices!', treatment_type: 'Dental Surgery', treatment_date: '2024-08-15', is_verified: true },
      { hospital_id: 3, user_name: 'Sophie Laurent', user_email: 'sophie.l@email.com', origin: 'France', rating: 5, title: 'Perfect Smile Makeover', comment: 'Cosmetic dentistry was exceptional. My smile transformation is incredible.', treatment_type: 'Cosmetic Dentistry', treatment_date: '2024-09-28', is_verified: true },
      { hospital_id: 3, user_name: 'Tom Harrison', user_email: 't.harrison@email.com', origin: 'USA', rating: 4, title: 'Great Dental Care', comment: 'Root canal and crown work. Very professional and pain-free.', treatment_type: 'Dental', treatment_date: '2024-07-22', is_verified: true },

      // Hospital 4  
      { hospital_id: 4, user_name: 'Richard Thompson', user_email: 'richard.t@email.com', origin: 'USA', rating: 5, title: 'Life After Heart Attack', comment: 'Emergency angioplasty saved my life. Dr. Sharma and cardiac team are world-class!', treatment_type: 'Cardiology', treatment_date: '2024-06-08', is_verified: true },
      { hospital_id: 4, user_name: 'Patricia Wilson', user_email: 'pat.w@email.com', origin: 'Canada', rating: 5, title: 'Valve Replacement Success', comment: 'Had mitral valve replacement. Surgery was successful and recovery smooth.', treatment_type: 'Cardiac Surgery', treatment_date: '2024-08-19', is_verified: true },
      { hospital_id: 4, user_name: 'Ahmed Hassan', user_email: 'ahmed.h@email.com', origin: 'UAE', rating: 4, title: 'Good Heart Center', comment: 'Cardiac check-up and stent placement. Professional team and modern cath lab.', treatment_type: 'Cardiology', treatment_date: '2024-09-15', is_verified: true },

      // Hospital 5
      { hospital_id: 5, user_name: 'William Davis', user_email: 'will.d@email.com', origin: 'UK', rating: 5, title: 'Total Hip Replacement', comment: 'Back to playing golf after 3 months! Dr. Menon is highly skilled.', treatment_type: 'Orthopedics', treatment_date: '2024-05-20', is_verified: true },
      { hospital_id: 5, user_name: 'Elizabeth Brown', user_email: 'liz.b@email.com', origin: 'Australia', rating: 5, title: 'Shoulder Surgery Excellence', comment: 'Rotator cuff repair was perfect. Physical therapy team helped me recover fully.', treatment_type: 'Orthopedics', treatment_date: '2024-07-12', is_verified: true },
      { hospital_id: 5, user_name: 'Kevin O\'Connor', user_email: 'kevin.oc@email.com', origin: 'Ireland', rating: 4, title: 'ACL Reconstruction', comment: 'Had ACL surgery after sports injury. Recovery is going well.', treatment_type: 'Sports Medicine', treatment_date: '2024-09-05', is_verified: true },
    ];

    // Filter reviews to only include existing hospitals
    const validReviews = allReviews.filter(r => existingHospitalIds.includes(r.hospital_id));
    
    console.log(`📝 Inserting ${validReviews.length} reviews for existing hospitals...\n`);

    // Insert reviews
    let insertedCount = 0;
    for (const review of validReviews) {
      await sql`
        INSERT INTO reviews (
          hospital_id, user_name, user_email, origin, rating, title, comment, 
          treatment_type, treatment_date, is_verified, is_approved
        ) VALUES (
          ${review.hospital_id}, ${review.user_name}, ${review.user_email}, 
          ${review.origin}, ${review.rating}, ${review.title}, ${review.comment},
          ${review.treatment_type}, ${review.treatment_date}, ${review.is_verified}, true
        )
      `;
      insertedCount++;
      process.stdout.write('.');
    }
    
    console.log(`\n✅ Inserted ${insertedCount} reviews\n`);

    // Show statistics
    const stats = await sql`
      SELECT 
        hospital_id,
        COUNT(*) as total_reviews,
        ROUND(AVG(rating), 1) as avg_rating,
        SUM(CASE WHEN is_verified THEN 1 ELSE 0 END) as verified_count
      FROM reviews
      GROUP BY hospital_id
      ORDER BY hospital_id
    `;

    console.log('📊 Review Statistics:');
    console.log('─'.repeat(60));
    console.log('Hospital ID | Total | Avg Rating | Verified');
    console.log('─'.repeat(60));
    stats.forEach(s => {
       console.log(`Hospital ${s.hospital_id}  |   ${s.total_reviews}   |    ${s.avg_rating}     |    ${s.verified_count}`);
    });
    console.log('─'.repeat(60));
    
    console.log('\n✨ Seed completed successfully!');
    console.log('🔄 Restart your backend to see the changes.\n');

  } catch (error) {
    console.error('❌ Error seeding reviews:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

// Run the seed
seedReviewsSmart()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
