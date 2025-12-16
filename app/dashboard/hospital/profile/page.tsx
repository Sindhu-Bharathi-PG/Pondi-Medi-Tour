"use client";

import { ArrowLeft, Award, Building2, CheckCircle2, Image as ImageIcon, Mail, MapPin, Phone, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HospitalProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [formData, setFormData] = useState({
        name: '',
        type: 'Private',
        establishmentYear: new Date().getFullYear(),
        beds: 0,
        accreditations: [],
        location: {
            address: '',
            city: 'Pondicherry',
            state: 'Puducherry',
            pincode: '',
            country: 'India'
        },
        contact: {
            phone: '',
            email: '',
            website: '',
            emergency: ''
        },
        description: {
            short: '',
            long: ''
        },
        departments: [],
        specialties: [],
        equipment: [],
        facilities: [],
        photos: []
    });

    useEffect(() => {
        fetchHospitalProfile();
    }, []);

    const fetchHospitalProfile = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hospitals/me/profile`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(data);
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hospitals/me/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Failed to save:', error);
            alert('Error saving profile');
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: Building2 },
        { id: 'location', label: 'Location', icon: MapPin },
        { id: 'description', label: 'Description', icon: Building2 },
        { id: 'services', label: 'Services', icon: Award },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-emerald-500" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/dashboard/hospital"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600 mb-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hospital Profile</h1>
                        <p className="text-gray-500 mt-1">Manage your public presence and facility details.</p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {saving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Tabs */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sticky top-8">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                                ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-500' : 'text-gray-400'}`} />
                                        {tab.label}
                                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content Form */}
                    <div className="flex-1">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[600px] relative overflow-hidden">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-white -mr-8 -mt-8 rounded-full blur-xl pointer-events-none" />

                            <form onSubmit={handleSubmit} className="relative z-10">
                                {/* Basic Info Tab */}
                                {activeTab === 'basic' && (
                                    <div className="space-y-8 animate-slideIn">
                                        <div className="pb-4 border-b border-gray-100">
                                            <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                                            <p className="text-sm text-gray-500 mt-1">Essential details about your facility.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <Label>Hospital Name</Label>
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="e.g. Apollo Hospital"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label>Facility Type</Label>
                                                <Select
                                                    value={formData.type}
                                                    onChange={(e: any) => setFormData({ ...formData, type: e.target.value })}
                                                >
                                                    <option value="Government">Government</option>
                                                    <option value="Private">Private</option>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label>Establishment Year</Label>
                                                <Input
                                                    type="number"
                                                    value={formData.establishmentYear}
                                                    onChange={(e: any) => setFormData({ ...formData, establishmentYear: parseInt(e.target.value) })}
                                                    min="1800"
                                                    max={new Date().getFullYear()}
                                                />
                                            </div>

                                            <div>
                                                <Label>Total Beds</Label>
                                                <Input
                                                    type="number"
                                                    value={formData.beds}
                                                    onChange={(e: any) => setFormData({ ...formData, beds: parseInt(e.target.value) })}
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Location Tab */}
                                {activeTab === 'location' && (
                                    <div className="space-y-8 animate-slideIn">
                                        <div className="pb-4 border-b border-gray-100">
                                            <h2 className="text-xl font-bold text-gray-900">Location & Contact</h2>
                                            <p className="text-sm text-gray-500 mt-1">How patients can find and reach you.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <Label>Street Address</Label>
                                                <TextArea
                                                    value={formData.location.address}
                                                    onChange={(e: any) => setFormData({ ...formData, location: { ...formData.location, address: e.target.value } })}
                                                    rows={3}
                                                    placeholder="Full street address..."
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div>
                                                    <Label>City</Label>
                                                    <Input
                                                        value={formData.location.city}
                                                        onChange={(e: any) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>State</Label>
                                                    <Input
                                                        value={formData.location.state}
                                                        onChange={(e: any) => setFormData({ ...formData, location: { ...formData.location, state: e.target.value } })}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Pincode</Label>
                                                    <Input
                                                        value={formData.location.pincode}
                                                        onChange={(e: any) => setFormData({ ...formData, location: { ...formData.location, pincode: e.target.value } })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                                                <div>
                                                    <Label icon={Phone}>Phone Number</Label>
                                                    <Input
                                                        type="tel"
                                                        value={formData.contact.phone}
                                                        onChange={(e: any) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                                                        placeholder="+91..."
                                                    />
                                                </div>
                                                <div>
                                                    <Label icon={Mail}>Email Address</Label>
                                                    <Input
                                                        type="email"
                                                        value={formData.contact.email}
                                                        onChange={(e: any) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                                                        placeholder="contact@hospital.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Description Tab */}
                                {activeTab === 'description' && (
                                    <div className="space-y-8 animate-slideIn">
                                        <div className="pb-4 border-b border-gray-100">
                                            <h2 className="text-xl font-bold text-gray-900">About the Hospital</h2>
                                            <p className="text-sm text-gray-500 mt-1">Tell patients your story and what makes you unique.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <Label>Short Description</Label>
                                                    <span className={`text-xs font-medium ${formData.description.short.length > 280 ? 'text-orange-500' : 'text-gray-400'}`}>
                                                        {formData.description.short.length}/300
                                                    </span>
                                                </div>
                                                <TextArea
                                                    value={formData.description.short}
                                                    onChange={(e: any) => setFormData({ ...formData, description: { ...formData.description, short: e.target.value } })}
                                                    rows={3}
                                                    maxLength={300}
                                                    placeholder="A brief overview displayed on search cards..."
                                                />
                                            </div>

                                            <div>
                                                <Label>Detailed Description</Label>
                                                <div className="relative">
                                                    <TextArea
                                                        value={formData.description.long}
                                                        onChange={(e: any) => setFormData({ ...formData, description: { ...formData.description, long: e.target.value } })}
                                                        rows={8}
                                                        placeholder="Full details about history, mission, and specialized care..."
                                                    />
                                                    <div className="absolute bottom-3 right-3 text-gray-300">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Services Tab */}
                                {activeTab === 'services' && (
                                    <div className="flex flex-col items-center justify-center py-16 text-center animate-slideIn">
                                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                            <Award className="w-8 h-8 text-blue-500" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Service Management System</h3>
                                        <p className="text-gray-500 max-w-md mb-6">
                                            We are upgrading the services and treatments manager. This module will be available in the next system update.
                                        </p>
                                        <button type="button" className="text-sm font-medium text-blue-600 hover:underline">
                                            Contact Support for Updates
                                        </button>
                                    </div>
                                )}

                                {/* Gallery Tab */}
                                {activeTab === 'gallery' && (
                                    <div className="flex flex-col items-center justify-center py-16 text-center animate-slideIn">
                                        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                                            <ImageIcon className="w-8 h-8 text-purple-500" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Media Gallery</h3>
                                        <p className="text-gray-500 max-w-md mb-6">
                                            High-resolution photo upload with drag-and-drop support is coming soon.
                                        </p>
                                        <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                                            Request Early Access
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideIn {
                    animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </div>
    );
}

// UI Components
function Label({ children, icon: Icon }: any) {
    return (
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-emerald-500" />}
            {children}
        </label>
    );
}

function Input(props: any) {
    return (
        <input
            {...props}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-800 placeholder:text-gray-400 font-medium"
        />
    );
}

function TextArea(props: any) {
    return (
        <textarea
            {...props}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-800 placeholder:text-gray-400 font-medium resize-y"
        />
    );
}

function Select({ children, ...props }: any) {
    return (
        <div className="relative">
            <select
                {...props}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-800 appearance-none font-medium cursor-pointer"
            >
                {children}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
        </div>
    );
}
