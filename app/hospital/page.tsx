import { fetchHospitals } from '@/app/lib/fetchHelpers';
import { normalizeAccreditations, normalizeDescription, normalizeName, normalizeSpecialties } from '@/app/utils/normalize';
import { Award, Building2, ChevronRight, Globe, Stethoscope } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer, Header } from '../components/common';
import { HospitalListClient } from './HospitalListClient';

// Page is cached and revalidated every 5 minutes
export const revalidate = 300;

// Metadata for SEO
export const metadata = {
      title: 'Partner Hospitals | Pondi Medi Tour',
      description: 'Explore our network of world-class NABH-accredited hospitals in Pondicherry. Expert medical care for international patients.',
};

// Filter options with string icon names (resolved in client component)
const FILTER_OPTIONS = [
      { id: 'all', label: 'All Hospitals', icon: 'Building2' },
      { id: 'Private', label: 'Private', icon: 'Award' },
      { id: 'Government', label: 'Government', icon: 'Award' },
      { id: 'Specialty', label: 'Specialty Centers', icon: 'Stethoscope' },
      { id: 'Educational', label: 'Teaching Hospitals', icon: 'Globe' },
];

// Transform backend data to frontend format
function transformDbHospital(dbHospital: any) {
      return {
            id: dbHospital.id,
            name: normalizeName(dbHospital.name),
            fullName: normalizeName(dbHospital.name),
            slug: dbHospital.slug || `hospital-${dbHospital.id}`,
            image: (() => {
                  // Safely get gallery first image or coverUrl
                  let imageUrl = '';
                  if (Array.isArray(dbHospital.gallery) && dbHospital.gallery.length > 0) {
                        const firstImage = dbHospital.gallery[0];
                        if (firstImage && typeof firstImage === 'string') {
                              imageUrl = firstImage.trim();
                        }
                  }
                  // Fallback to coverUrl if gallery didn't provide valid image
                  if (!imageUrl && dbHospital.coverUrl && typeof dbHospital.coverUrl === 'string') {
                        imageUrl = dbHospital.coverUrl.trim();
                  }
                  // Final fallback to placeholder
                  return imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800';
            })(),
            heroImage: (typeof dbHospital.coverUrl === 'string' && dbHospital.coverUrl.trim()) || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600',
            gallery: Array.isArray(dbHospital.gallery) ? dbHospital.gallery.filter((img: any) => img && typeof img === 'string' && img.trim() !== '') : [],
            rating: dbHospital.rating || 4.5,
            reviewCount: dbHospital.reviewCount || 0,
            specialties: normalizeSpecialties(dbHospital.specializedCenters),
            serviceSlugs: [],
            accreditation: normalizeAccreditations(dbHospital.accreditations || []),
            location: (() => {
                  const city = dbHospital.location?.city || 'Pondicherry';
                  const state = dbHospital.location?.state || 'India';
                  // Avoid redundancy: Pondicherry is in Puducherry union territory
                  const cityLower = city.toLowerCase();
                  const stateLower = state.toLowerCase();
                  if (cityLower === stateLower ||
                        (cityLower === 'pondicherry' && stateLower === 'puducherry') ||
                        (cityLower === 'puducherry' && stateLower === 'pondicherry')) {
                        return `${city}, India`;
                  }
                  return `${city}, ${state}`;
            })(),
            established: dbHospital.establishmentYear || 2000,
            beds: dbHospital.infrastructure?.beds || dbHospital.infrastructure?.totalBeds || 100,
            type: dbHospital.type || 'Private',
            featured: dbHospital.status === 'active',
            tagline: normalizeDescription(dbHospital.shortDescription, 60),
            description: normalizeDescription(dbHospital.shortDescription, 150),
            about: dbHospital.fullDescription || '',
            highlights: [],
            equipment: [],
            facilities: dbHospital.infrastructure?.facilities || [],
            internationalPatients: dbHospital.internationalServices?.patientsServed || '500+',
            successRate: '95%+',
            contact: {
                  phone: dbHospital.phone || '',
                  emergency: dbHospital.emergencyPhone || '',
                  email: dbHospital.email || '',
                  website: dbHospital.website || '',
            }
      };
}

// Server Component - fetches data on the server
export default async function HospitalPage() {
      // Fetch hospitals on the server with caching
      let hospitals: any[] = [];

      try {
            const data = await fetchHospitals({ status: 'active' });
            const hospitalList = Array.isArray(data) ? data : (data.hospitals || []);
            hospitals = hospitalList
                  .filter((h: any) => h.status === 'active' || h.status === 'approved')
                  .map(transformDbHospital);
      } catch (error) {
            console.error('Failed to fetch hospitals:', error);
            // Will show empty state in client component
      }

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* Premium Hero Section - Static, rendered on server */}
                  <section className="relative pt-24 pb-20 overflow-hidden hero-premium">
                        <div className="absolute inset-0">
                              <Image
                                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80"
                                    alt="World-class healthcare"
                                    fill
                                    priority
                                    sizes="100vw"
                                    className="object-cover opacity-20"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-[var(--medical-navy)]/95 via-[var(--medical-dark-teal)]/90 to-[var(--medical-teal)]/85" />
                        </div>

                        <div className="relative container-premium">
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <ChevronRight className="w-4 h-4 mx-2" />
                                    <span className="text-white">Partner Hospitals</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <div className="gov-seal mb-6">
                                          <span>50+ NABH Accredited Facilities</span>
                                    </div>

                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                                          World-Class
                                          <span className="block text-[var(--medical-gold)]">
                                                Partner Hospitals
                                          </span>
                                    </h1>

                                    <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mb-8">
                                          Every partner hospital is rigorously vetted for NABH/JCI accreditation,
                                          cutting-edge technology, and international patient safety standards.
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* Stats Bar - Static */}
                  <section className="bg-white py-8 shadow-lg relative z-10 border-b border-gray-100">
                        <div className="container-premium">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {[
                                          { value: '50+', label: 'Partner Hospitals', icon: Building2 },
                                          { value: '500+', label: 'Specialist Doctors', icon: Stethoscope },
                                          { value: '15,000+', label: 'International Patients/Year', icon: Globe },
                                          { value: '98.5%', label: 'Success Rate', icon: Award },
                                    ].map((stat, index) => (
                                          <div key={index} className="text-center">
                                                <stat.icon className="w-8 h-8 mx-auto mb-2 text-[var(--medical-teal)]" />
                                                <div className="text-3xl font-bold text-[var(--medical-navy)]">{stat.value}</div>
                                                <div className="text-[var(--medical-slate)] text-sm">{stat.label}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Client Component for interactive filtering and display */}
                  <HospitalListClient
                        initialHospitals={hospitals}
                        filterOptions={FILTER_OPTIONS}
                  />

                  <Footer />
            </div>
      );
}
