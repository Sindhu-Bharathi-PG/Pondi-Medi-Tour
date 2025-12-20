const postgres = require('postgres');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sampleDoctors = [
  {
    hospital_id: 1,
    name: 'Dr. V. Veerappan',
    specialty: 'Orthopedics',
    sub_specialty: 'Spine & Joint Replacement',
    credentials: 'MBBS, MS (Orthopaedics), FRCS (Glasgow)',
    experience: '31+ years',
    image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800',
    bio: 'Dr. V. Veerappan is a pioneer in minimally invasive spine surgery with over three decades of experience. He has performed over 5,000 successful surgeries and is known for his expertise in complex joint replacements and revision surgeries. Trained at prestigious institutions in India and the UK, he brings international best practices to patient care.',
    surgeries_count: 5000,
    publications_count: 45,
    rating: 4.9,
    reviews_count: 450,
    languages: ['English', 'Tamil', 'Hindi'],
    consultation_timings: 'Mon-Sat: 9:00 AM - 1:00 PM, 4:00 PM - 7:00 PM',
    is_available: true,
    is_featured: true,
    education: [
      { degree: 'MBBS', institution: 'Madras Medical College', year: '1990' },
      { degree: 'MS Orthopaedics', institution: 'CMC Vellore', year: '1994' },
      { degree: 'FRCS', institution: 'Royal College, Glasgow, UK', year: '1998' }
    ],
    expertise: ['Total Knee Replacement', 'Hip Replacement Surgery', 'Spine Surgery', 'Revision Joint Surgery', 'Sports Medicine', 'Arthroscopic Surgery'],
    international_training: ['UK', 'USA', 'Germany'],
    awards: ['Best Orthopedic Surgeon Award - 2019', 'Excellence in Spine Surgery - 2017', 'Distinguished Alumni Award - CMC Vellore'],
    service_slug: 'orthopedics'
  },
  {
    hospital_id: 1,
    name: 'Dr. V. M. Thomas',
    specialty: 'IVF & Fertility',
    sub_specialty: 'Reproductive Medicine',
    credentials: 'PhD, FSAB (Reproductive Biotechnology)',
    experience: '25+ years',
    image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800',
    bio: 'Dr. V. M. Thomas is a renowned embryologist with thousands of successful IVF cycles worldwide. His groundbreaking research in reproductive biotechnology has helped countless couples achieve their dream of parenthood. He is a sought-after speaker at international fertility conferences.',
    surgeries_count: 10000,
    publications_count: 78,
    rating: 4.9,
    reviews_count: 680,
    languages: ['English', 'Malayalam', 'Tamil'],
    consultation_timings: 'Mon-Fri: 10:00 AM - 2:00 PM, 5:00 PM - 8:00 PM',
    is_available: true,
    is_featured: true,
    education: [
      { degree: 'PhD', institution: 'IISc Bangalore', year: '1995' },
      { degree: 'FSAB', institution: 'European Society of Human Reproduction', year: '2000' }
    ],
    expertise: ['In Vitro Fertilization (IVF)', 'Intracytoplasmic Sperm Injection (ICSI)', 'Embryo Cryopreservation', 'Preimplantation Genetic Testing', 'Fertility Preservation', 'Donor Programs'],
    international_training: ['Belgium', 'Spain', 'Australia'],
    awards: ['Pioneer in IVF Technology Award - 2020', 'Best Embryologist - National Fertility Summit', 'Lifetime Achievement - Reproductive Medicine'],
    service_slug: 'ivf'
  },
  {
    hospital_id: 1,
    name: 'Dr. Ramya R',
    specialty: 'IVF & Fertility',
    sub_specialty: 'Infertility Consultant',
    credentials: 'MBBS, DGO, FRM',
    experience: '11+ years',
    image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800',
    bio: 'Dr. Ramya R is a passionate fertility specialist dedicated to making parenthood dreams come true. With specialized training from Singapore, she brings a compassionate approach combined with cutting-edge fertility treatments. Her patient-centric care has earned her excellent reviews.',
    surgeries_count: 2500,
    publications_count: 12,
    rating: 4.8,
    reviews_count: 320,
    languages: ['English', 'Tamil', 'Hindi'],
    consultation_timings: 'Mon-Sat: 9:00 AM - 5:00 PM',
    is_available: true,
    is_featured: true,
    education: [
      { degree: 'MBBS', institution: 'Stanley Medical College', year: '2010' },
      { degree: 'DGO', institution: 'Govt General Hospital', year: '2013' },
      { degree: 'FRM', institution: 'National University Singapore', year: '2016' }
    ],
    expertise: ['IVF & IUI Treatments', 'Ovulation Induction', 'Laparoscopic Fertility Surgery', 'PCOS Management', 'Recurrent Pregnancy Loss', 'Male Infertility Treatment'],
    international_training: ['Singapore', 'Japan'],
    awards: ['Young Fertility Specialist Award - 2021', 'Patient Choice Award - 2022'],
    service_slug: 'ivf'
  },
  {
    hospital_id: 1,
    name: 'Dr. Suresh Kumar',
    specialty: 'Cardiology',
    sub_specialty: 'Interventional Cardiology',
    credentials: 'DM Cardiology, FACC (USA)',
    experience: '18+ years',
    image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800',
    bio: 'Dr. Suresh Kumar is a Cleveland Clinic trained interventional cardiologist specializing in complex angioplasty and structural heart disease. His expertise in treating complex cardiac conditions has saved thousands of lives across South India.',
    surgeries_count: 4000,
    publications_count: 56,
    rating: 4.9,
    reviews_count: 520,
    languages: ['English', 'Tamil', 'Telugu'],
    consultation_timings: 'Mon-Fri: 8:00 AM - 4:00 PM',
    is_available: true,
    is_featured: false,
    education: [
      { degree: 'MBBS', institution: 'JIPMER Pondicherry', year: '2002' },
      { degree: 'DM Cardiology', institution: 'AIIMS New Delhi', year: '2008' },
      { degree: 'Fellowship', institution: 'Cleveland Clinic, USA', year: '2011' }
    ],
    expertise: ['Complex Angioplasty', 'TAVI/TAVR Procedures', 'Structural Heart Interventions', 'Pacemaker Implantation', 'Heart Failure Management', 'Preventive Cardiology'],
    international_training: ['USA', 'Germany', 'France'],
    awards: ['Excellence in Interventional Cardiology - 2022', 'Best Cardiologist - Tamil Nadu State Award'],
    service_slug: 'cardiology'
  },
  {
    hospital_id: 1,
    name: 'Dr. Priya Sharma',
    specialty: 'Gastroenterology',
    sub_specialty: 'Bariatric Surgery',
    credentials: 'MS, MCh, FAIS',
    experience: '15+ years',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    bio: 'Dr. Priya Sharma is a leading bariatric surgeon with expertise in laparoscopic and robotic procedures. She has transformed the lives of thousands through weight loss surgery and metabolic disease treatment.',
    surgeries_count: 3200,
    publications_count: 34,
    rating: 4.8,
    reviews_count: 380,
    languages: ['English', 'Hindi', 'Tamil'],
    consultation_timings: 'Mon-Sat: 10:00 AM - 6:00 PM',
    is_available: true,
    is_featured: false,
    education: [
      { degree: 'MBBS', institution: 'Maulana Azad Medical College', year: '2005' },
      { degree: 'MS', institution: 'PGI Chandigarh', year: '2009' },
      { degree: 'MCh', institution: 'GEM Hospital', year: '2012' }
    ],
    expertise: ['Bariatric Surgery', 'Laparoscopic Surgery', 'Robotic Surgery', 'Metabolic Surgery for Diabetes', 'Revision Bariatric Surgery', 'Hernia Repair'],
    international_training: ['USA', 'South Korea'],
    awards: ['Best Bariatric Surgeon - North India 2021', 'Innovation in Surgical Techniques Award'],
    service_slug: 'gastroenterology'
  },
  {
    hospital_id: 1,
    name: 'Dr. Aravind Mohan',
    specialty: 'Ophthalmology',
    sub_specialty: 'Cataract & Retina',
    credentials: 'MS, DNB, FICO',
    experience: '20+ years',
    image_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800',
    bio: 'Dr. Aravind Mohan is a world-renowned retina specialist with expertise from Moorfields Eye Hospital, UK. With over 15,000 surgeries, he is one of the most experienced eye surgeons in South India.',
    surgeries_count: 15000,
    publications_count: 89,
    rating: 4.9,
    reviews_count: 890,
    languages: ['English', 'Tamil', 'Malayalam'],
    consultation_timings: 'Mon-Sat: 8:00 AM - 2:00 PM',
    is_available: true,
    is_featured: false,
    education: [
      { degree: 'MBBS', institution: 'Madras Medical College', year: '2000' },
      { degree: 'MS Ophthalmology', institution: 'Aravind Eye Hospital', year: '2004' },
      { degree: 'Fellowship', institution: 'Moorfields Eye Hospital, UK', year: '2007' }
    ],
    expertise: ['Cataract Surgery', 'Retinal Detachment Repair', 'Diabetic Retinopathy Treatment', 'Macular Degeneration', 'Vitrectomy', 'LASIK & Refractive Surgery'],
    international_training: ['UK', 'USA', 'Singapore'],
    awards: ['Excellence in Retinal Surgery - 2020', 'Lifetime Achievement in Ophthalmology', 'Best Eye Surgeon - Healthcare Excellence Awards'],
    service_slug: 'ophthalmology'
  }
];

async function seedDoctors() {
  const sql = postgres(DATABASE_URL, { ssl: 'require' });
  
  try {
    console.log('🌱 Starting doctor seeding process...\n');
    
    // Clear existing doctors
    console.log('1️⃣ Clearing existing doctors...');
    await sql`DELETE FROM doctors`;
    console.log('✅ Existing doctors cleared\n');
    
    // Insert each doctor
    console.log('2️⃣ Inserting sample doctors...');
    let count = 0;
    
    for (const doctor of sampleDoctors) {
      await sql`
        INSERT INTO doctors (
          hospital_id, name, specialty, sub_specialty, credentials, experience, 
          image_url, bio, surgeries_count, publications_count, rating, reviews_count,
          languages, consultation_timings, is_available, is_featured,
          education, expertise, international_training, awards, service_slug
        ) VALUES (
          ${doctor.hospital_id},
          ${doctor.name},
          ${doctor.specialty},
          ${doctor.sub_specialty},
          ${doctor.credentials},
          ${doctor.experience},
          ${doctor.image_url},
          ${doctor.bio},
          ${doctor.surgeries_count},
          ${doctor.publications_count},
          ${doctor.rating},
          ${doctor.reviews_count},
          ${doctor.languages},
          ${doctor.consultation_timings},
          ${doctor.is_available},
          ${doctor.is_featured},
          ${JSON.stringify(doctor.education)}::jsonb,
          ${doctor.expertise},
          ${doctor.international_training},
          ${doctor.awards},
          ${doctor.service_slug}
        )
      `;
      count++;
      console.log(`   ✓ Inserted: ${doctor.name} (${doctor.specialty})`);
    }
    
    console.log(`\n✅ Successfully inserted ${count} doctors\n`);
    
    // Verify insertion
    console.log('3️⃣ Verifying data...');
    const result = await sql`
      SELECT 
        id, name, specialty, sub_specialty, 
        array_length(languages, 1) as language_count,
        array_length(expertise, 1) as expertise_count,
        is_featured, is_available
      FROM doctors 
      ORDER BY id
    `;
    
    console.log('\n📊 Inserted Doctors Summary:');
    console.log('━'.repeat(80));
    result.forEach(doc => {
      console.log(`${doc.id}. ${doc.name}`);
      console.log(`   Specialty: ${doc.specialty} - ${doc.sub_specialty}`);
      console.log(`   Languages: ${doc.language_count} | Expertise: ${doc.expertise_count}`);
      console.log(`   Featured: ${doc.is_featured ? '⭐ Yes' : 'No'} | Available: ${doc.is_available ? '🟢 Yes' : '🔴 No'}`);
      console.log('');
    });
    console.log('━'.repeat(80));
    
    console.log('\n🎉 SUCCESS! Doctor seeding completed!');
    console.log('\n💡 You can now:');
    console.log('   - View doctors at: http://localhost:3000/doctor');
    console.log('   - View individual profiles at: http://localhost:3000/doctor/1');
    console.log('   - Manage in dashboard at: http://localhost:3000/dashboard/hospital/doctors');
    
  } catch (error) {
    console.error('❌ Error seeding doctors:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

// Run if called directly
if (require.main === module) {
  seedDoctors()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { seedDoctors, sampleDoctors };
