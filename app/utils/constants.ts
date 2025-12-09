// Hospital and treatment data for the Pondicherry Medical Tourism Portal

export const HOSPITALS = [
      "JIPMER (Jawaharlal Institute of Postgraduate Medical Education & Research)",
      "Pondicherry Institute of Medical Sciences (PIMS)",
      "Mahatma Gandhi Medical College & Research Institute (MGMCRI)",
      "GEM Hospital",
      "Aravind Eye Hospital",
      "The POSH - Pondy Ortho Speciality Hospital",
      "East Coast Hospital",
      "Dr. Dentsmile Dental Clinic",
      "Indira IVF Centre",
      "Quiet Healing Centre",
      "Aarupadai Veedu Medical College & Hospital",
      "Be Well Hospital Pondicherry",
      "Sri Manakula Vinayagar Medical College & Hospital (SMVMCH)",
      "New Medical Centre (NMC Hospital)",
      "Rajiv Gandhi Women and Children Hospital",
      "Hope Neuro Multispeciality Hospital",
      "Kumaran Hospital",
      "Saram Multispeciality Hospital",
      "Pondy Cancer Hospital and Research Centre",
      "Cluny Hospital"
] as const;

export const TREATMENTS = [
      "Orthopedics & Bone Fracture Treatment",
      "Eye Surgery & Cataract Removal",
      "IVF & Fertility Treatments",
      "Dental Care & Cosmetic Dentistry",
      "Cardiac Surgery & Heart Diseases",
      "Gastroenterology (Digestive System Disorders)",
      "Cancer Treatment & Oncology",
      "Knee Replacement",
      "Hip Replacement",
      "Cataract Surgery",
      "Neurology & Stroke Rehabilitation",
      "Nephrology (Kidney Disorders & Dialysis)",
      "Urology & Prostate Care",
      "Pulmonology (Lung & Chest Diseases)",
      "Dermatology & Cosmetic Skin Treatments",
      "Pediatrics & Neonatal Care",
      "Obstetrics & Gynecology (Women's Health)",
      "Endocrinology (Diabetes & Thyroid Disorders)",
      "Psychiatry & Mental Health",
      "ENT (Ear, Nose & Throat Disorders)",
      "Plastic & Reconstructive Surgery",
      "Emergency & Trauma Care",
      "Physiotherapy & Rehabilitation",
      "Dental Implants & Oral Surgery",
      "Laparoscopic & Robotic Surgery",
      "Spine Surgery & Joint Replacement",
      "Liver & Gastro-Liver Transplant",
      "General Medicine & Family Practice"
] as const;

export const LANGUAGES = [
      { code: 'en', label: 'English' },
      { code: 'fr', label: 'Français' },
      { code: 'hi', label: 'हिन्दी' },
      { code: 'ar', label: 'العربية' }
] as const;

export const CONTACT_INFO = {
      phone: '+91-XXX-XXXX',
      email: 'care@pondymedical.com',
      location: 'Pondicherry, India'
} as const;

export const PARTNERS = [
      'GEM Hospital',
      'Aravind Eye',
      'POSH Hospital',
      'Quiet Healing Centre',
      'Dr. Dentsmile'
] as const;

export const NAV_LINKS = [
      { href: '/', label: 'Home' },
      { href: '/services', label: 'Treatments' },
      { href: '/hospital', label: 'Hospitals' },
      { href: '/doctor', label: 'Doctors' },
      { href: '/destination', label: 'Why Pondicherry' },
      { href: '/packages', label: 'Packages' },
      { href: '/about', label: 'About' }
] as const;

export const HERO_SLIDES = [
      {
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600',
            title: 'World-Class Medical Excellence',
            subtitle: 'Advanced procedures with internationally trained specialists'
      },
      {
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600',
            title: 'Serene Coastal Recovery',
            subtitle: 'Heal in the tranquil beauty of French-Indian heritage'
      }
] as const;

export const TESTIMONIALS = [
      {
            name: 'John D.',
            location: 'USA',
            procedure: 'Knee Replacement',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
            quote: 'The hospital was better than at home. My surgeon was FRCS-trained, and I recovered in paradise. I saved over $40,000.',
            isVideo: true
      },
      {
            name: 'Priya S.',
            location: 'Delhi',
            procedure: 'IVF Treatment',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
            quote: 'The team handled everything. The doctors were amazing, and the peaceful environment was a blessing during a stressful time.'
      },
      {
            name: 'Ahmed R.',
            location: 'Dubai',
            procedure: 'Cardiac Surgery',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
            quote: 'World-class care at a fraction of the cost. The combination of medical expertise and wellness recovery exceeded all expectations.'
      }
] as const;

export const FEATURED_DOCTORS = [
      {
            name: 'Dr. V. Veerappan',
            credentials: 'MBBS, MS (Orthopaedics), FRCS (Glasgow)',
            specialty: 'Spine & Joint Replacement (Orthopaedics)',
            experience: '31+ years',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300'
      },
      {
            name: 'Dr. V. M. Thomas',
            credentials: 'PhD, FSAB (Reproductive Biotechnology)',
            specialty: 'IVF & Fertility Specialist',
            experience: 'Pioneer in South India & 10,000+ couples treated',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300'
      },
      {
            name: 'Dr. Ramya R',
            credentials: 'MBBS, DGO, FRM (Fellow in Reproductive Medicine)',
            specialty: 'Infertility Consultant – IVF, IUI, Donor programs',
            experience: '11+ years',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300'
      }
] as const;

export const HYBRID_PACKAGES = [
      {
            title: 'The Ortho-Rejuvenation Journey',
            image1: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600',
            image2: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
            description: "Includes Total Knee Replacement, 14-day recovery at Auroville's Quiet Healing Centre, aquatic physiotherapy, and all transfers.",
            price: 'From $8,500'
      },
      {
            title: 'The Dental-Heritage Journey',
            image1: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600',
            image2: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600',
            description: 'Includes Full Mouth Implants, 7-day recuperation in a French heritage boutique hotel, and guided local tours.',
            price: 'From $6,200'
      }
] as const;

export const JOURNEY_STEPS = [
      {
            step: '01',
            title: 'Free Virtual Consultation',
            description: 'Submit your records, get a free quote, and have a video call with your doctor.',
            icon: '🩺'
      },
      {
            step: '02',
            title: 'We Plan Everything',
            description: 'We handle your visa invitation letter, book your accommodation, and schedule all appointments.',
            icon: '📋'
      },
      {
            step: '03',
            title: 'Arrive & Heal',
            description: 'A personal coordinator meets you at the airport, manages all hospital admissions, and is your 24/7 advocate.',
            icon: '🏥'
      },
      {
            step: '04',
            title: 'Recover & Return',
            description: 'Enjoy a seamless transfer to your wellness retreat for recovery, followed by your comfortable journey home.',
            icon: '🌴'
      }
] as const;
