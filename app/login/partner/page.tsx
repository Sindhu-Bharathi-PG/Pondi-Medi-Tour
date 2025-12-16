"use client";

import { ArrowLeft, Building2, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PartnerLoginPage = () => {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<'hospital' | 'admin' | null>(null);

    const roles = [
        {
            id: 'hospital' as const,
            title: 'Hospital Partner',
            description: 'Manage your hospital profile, services, and patient inquiries',
            icon: Building2,
            color: 'from-emerald-600 to-teal-600',
            link: '/login/hospital',
            features: ['Profile Management', 'Service Listings', 'Patient Inquiries', 'Booking Management']
        },
        {
            id: 'admin' as const,
            title: 'Platform Admin',
            description: 'Oversee platform operations, content, and analytics',
            icon: ShieldCheck,
            color: 'from-blue-600 to-indigo-600',
            link: '/login/admin',
            features: ['View Analytics', 'Content Management', 'Review Submissions', 'User Support']
        }
    ];

    const handleRoleSelect = (link: string) => {
        router.push(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative w-full max-w-6xl">
                {/* Back Button */}
                <Link
                    href="/"
                    className="absolute -top-12 left-0 flex items-center gap-2 text-white/70 hover:text-white transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full mb-6">
                        <Users className="w-6 h-6 text-emerald-400" />
                        <span className="text-white font-semibold">Partner Portal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Welcome Back, Partner
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Select your role to access your dedicated dashboard and tools
                    </p>
                </div>

                {/* Role Selection Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                            <button
                                key={role.id}
                                onClick={() => handleRoleSelect(role.link)}
                                onMouseEnter={() => setSelectedRole(role.id)}
                                onMouseLeave={() => setSelectedRole(null)}
                                className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-white/10 hover:border-white/20 ${selectedRole === role.id ? 'ring-2 ring-white/30' : ''
                                    }`}
                            >
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                                {/* Icon */}
                                <div className={`relative w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <div className="relative">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                                        {role.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                        {role.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                            Key Features
                                        </p>
                                        <ul className="space-y-2">
                                            {role.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${role.color}`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <span className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${role.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                                            Access Portal
                                            <ArrowLeft className="w-4 h-4 rotate-180 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Help Section */}
                <div className="mt-12 text-center">
                    <div className="inline-block bg-white/5 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/10">
                        <p className="text-gray-400 text-sm">
                            Need help? Contact support at{' '}
                            <a href="mailto:support@pondimeditour.com" className="text-emerald-400 hover:text-emerald-300 font-medium">
                                support@pondimeditour.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerLoginPage;
