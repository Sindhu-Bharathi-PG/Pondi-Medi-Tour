import { Footer, Header } from '@/app/components/common';
import { fetchPackages } from '@/app/lib/fetchHelpers';
import { Calendar, Car, Heart, Hotel, Phone, Shield, Users, Utensils } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PackagesClient } from './PackagesClient';

// Enable ISR with 1-hour revalidation
export const revalidate = 3600;

// Metadata for SEO
export const metadata = {
      title: 'Medical Tourism Packages | All-Inclusive Care | Pondi Medi Tour',
      description: 'Explore our all-inclusive medical tourism packages. Surgery, accommodation, transfers, and post-care—transparent pricing with no hidden fees.',
};

// Transform DB package to match UI interface
function transformDbPackage(dbPkg: any) {
      const inclusions = dbPkg.inclusions || {};
      return {
            id: String(dbPkg.id),
            hospitalId: dbPkg.hospitalId || undefined,
            hospitalName: dbPkg.hospitalName || undefined,
            name: dbPkg.name?.replace('[TEST] ', '') || 'Package',
            tagline: dbPkg.shortDescription?.replace('[TEST DATA] ', '') || 'Complete medical package',
            basePrice: dbPkg.discountedPrice || dbPkg.price || 5000,
            duration: `${dbPkg.durationDays || 7}-${(dbPkg.durationDays || 7) + 3} days`,
            image: dbPkg.imageUrl || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
            color: ['from-blue-600 to-cyan-500', 'from-emerald-600 to-teal-500', 'from-amber-600 to-orange-500'][dbPkg.id % 3],
            features: [
                  inclusions.accommodation || 'Hospital accommodation',
                  inclusions.transport || 'Airport transfers',
                  inclusions.meals || 'Meals included',
                  ...(inclusions.extraServices || []).slice(0, 4)
            ].filter(Boolean),
            includes: {
                  flights: inclusions.extraServices?.includes('Flights') || false,
                  visa: true,
                  insurance: inclusions.extraServices?.includes('Insurance') || false
            },
            popular: dbPkg.isFeatured || false
      };
}

// Server Component - fetch data on server
export default async function PackagesPage() {
      let packages = [];

      try {
            const data = await fetchPackages();
            const packageList = Array.isArray(data) ? data : [];

            if (packageList.length > 0) {
                  packages = packageList.map(transformDbPackage);
            }
      } catch (error) {
            console.error('Failed to fetch packages:', error);
            // Client component will show empty state
      }

      return (
            <div className="min-h-screen bg-[var(--medical-cream)]">
                  <Header />

                  {/* Hero - Static content rendered on server */}
                  <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden hero-premium">
                        <div className="absolute inset-0 opacity-20">
                              <Image
                                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600"
                                    alt="Wellness"
                                    fill
                                    priority
                                    sizes="100vw"
                                    className="object-cover"
                              />
                        </div>
                        <div className="relative container-premium">
                              <nav className="breadcrumb text-white/70 mb-8">
                                    <Link href="/">Home</Link>
                                    <span className="mx-2">/</span>
                                    <span className="text-white">Care Packages</span>
                              </nav>

                              <div className="max-w-4xl">
                                    <div className="gov-seal mb-6">
                                          <span>All-Inclusive Transparent Pricing</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                                          Complete Care
                                          <span className="block text-[#bf9b30]">Packages</span>
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
                                          Simplify your medical journey with all-inclusive bundles. Surgery, hospital stay, accommodation, and transfers—no hidden fees, no surprises.
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* What's Included Overview - Static */}
                  <section className="py-12 bg-white shadow-lg relative z-10 -mt-8">
                        <div className="container mx-auto px-4">
                              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                                    {[
                                          { icon: Heart, label: 'Medical Care' },
                                          { icon: Hotel, label: 'Accommodation' },
                                          { icon: Car, label: 'Transfers' },
                                          { icon: Utensils, label: 'Meals' },
                                          { icon: Shield, label: 'Insurance' },
                                          { icon: Users, label: 'Coordination' }
                                    ].map((item, i) => (
                                          <div key={i} className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                                      <item.icon className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <span className="font-medium text-gray-700">{item.label}</span>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Client Component for interactive content */}
                  <PackagesClient initialPackages={packages} />

                  {/* Process Section - Static */}
                  <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <div className="container mx-auto px-4">
                              <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                                    <p className="text-emerald-100">Simple 5-step process from inquiry to recovery</p>
                              </div>
                              <div className="flex flex-wrap justify-center gap-8">
                                    {['Free Consultation', 'Custom Quote', 'Book & Plan', 'Treatment', 'Recover & Return'].map((step, i) => (
                                          <div key={i} className="text-center">
                                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">{i + 1}</div>
                                                <div className="font-medium">{step}</div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA Section - Static */}
                  <section className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4 text-center">
                              <h2 className="text-4xl font-bold text-gray-800 mb-6">Need a Custom Package?</h2>
                              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                    Our medical travel experts can create a tailored package based on your specific treatment and preferences.
                              </p>
                              <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/booking" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
                                          <Calendar className="w-5 h-5" /> Request Custom Quote
                                    </Link>
                                    <button className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all inline-flex items-center gap-2">
                                          <Phone className="w-5 h-5" /> Call Us Now
                                    </button>
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}
