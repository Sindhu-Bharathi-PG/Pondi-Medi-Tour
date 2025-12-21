"use client";

import { API_BASE, apiCall, useApi } from "@/app/hooks/useApi";
import {
    AlertCircle,
    ArrowLeft,
    Award,
    Building2,
    Check,
    FileText,
    Globe,
    Image as ImageIcon,
    MapPin,
    Plus,
    Save,
    Stethoscope,
    X
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingStates";
import ImageUpload from "../doctors/components/ImageUpload";

export default function HospitalProfilePage() {
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // New item input states (replaces prompts)
    const [newItemInputs, setNewItemInputs] = useState({
        specializedUnit: '',
        technology: '',
        amenity: '',
        language: '',
        service: '',
        center: '',
        showUnitInput: false,
        showTechInput: false,
        showAmenityInput: false,
        showLanguageInput: false,
        showServiceInput: false,
        showCenterInput: false
    });

    // Accreditation modal state
    const [accModal, setAccModal] = useState({
        show: false,
        name: '',
        issuingBody: '',
        year: ''
    });

    // Gallery modal state
    const [galleryModal, setGalleryModal] = useState({
        show: false,
        url: '',
        caption: ''
    });

    // Fetch profile
    const { data: profile, loading, refetch } = useApi<any>({
        url: `${API_BASE}/api/hospitals/me/profile`
    });

    const [formData, setFormData] = useState({
        name: '',
        type: 'Private',
        establishmentYear: new Date().getFullYear(),
        shortDescription: '',
        fullDescription: '',
        infrastructure: {
            totalBeds: 0,
            icuBeds: 0,
            operatingTheaters: 0,
            specializedUnits: [] as string[],
            technologies: [] as string[],
            amenities: [] as string[]
        },
        internationalServices: {
            languages: [] as string[],
            services: [] as string[],
            coordinatorAvailable: false,
            teleconsultation: false
        },
        accreditations: [] as Array<{ name: string; issuingBody: string; year: string }>,
        specializedCenters: [] as string[],
        location: {
            address: '', city: 'Pondicherry', state: 'Puducherry',
            pincode: '', country: 'India'
        },
        logoUrl: '',
        coverUrl: '',
        gallery: [] as Array<{ url: string; caption: string }>,
        website: '',
        phone: '',
        email: '',
        emergencyPhone: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                type: profile.type || 'Private',
                establishmentYear: profile.establishmentYear || new Date().getFullYear(),
                shortDescription: profile.shortDescription || '',
                fullDescription: profile.fullDescription || '',
                infrastructure: {
                    totalBeds: profile.infrastructure?.totalBeds || 0,
                    icuBeds: profile.infrastructure?.icuBeds || 0,
                    operatingTheaters: profile.infrastructure?.operatingTheaters || 0,
                    specializedUnits: profile.infrastructure?.specializedUnits || [],
                    technologies: profile.infrastructure?.technologies || [],
                    amenities: profile.infrastructure?.amenities || []
                },
                internationalServices: {
                    languages: profile.internationalServices?.languages || [],
                    services: profile.internationalServices?.services || [],
                    coordinatorAvailable: profile.internationalServices?.coordinatorAvailable || false,
                    teleconsultation: profile.internationalServices?.teleconsultation || false
                },
                accreditations: profile.accreditations || [],
                specializedCenters: profile.specializedCenters || [],
                location: profile.location || {
                    address: '', city: 'Pondicherry', state: 'Puducherry',
                    pincode: '', country: 'India'
                },
                logoUrl: profile.logoUrl || '',
                coverUrl: profile.coverUrl || '',
                gallery: profile.gallery || [],
                website: profile.website || '',
                phone: profile.phone || '',
                email: profile.email || '',
                emergencyPhone: profile.emergencyPhone || ''
            });
        }
    }, [profile]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);
        setSaveMessage(null);

        try {
            console.log('Saving profile data:', formData);
            const result = await apiCall('/api/hospitals/me/profile', 'PUT', formData);
            console.log('Save successful:', result);
            setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
            await refetch();
            setTimeout(() => setSaveMessage(null), 3000);
        } catch (error: any) {
            console.error('Save failed:', error);
            const errorMessage = error.message || error.error || 'Failed to update profile';
            setSaveMessage({ type: 'error', text: errorMessage });
            setTimeout(() => setSaveMessage(null), 5000);
        } finally {
            setSaving(false);
        }
    };

    // Add item handlers with inline inputs
    const addItem = (field: string, subfield?: string) => {
        // Map array field names to input state keys
        const stateKeyMap: Record<string, string> = {
            'specializedUnits': 'specializedUnit',
            'technologies': 'technology',
            'amenities': 'amenity',
            'languages': 'language',
            'services': 'service',
            'specializedCenters': 'center'
        };

        const stateKey = subfield ? stateKeyMap[subfield] || subfield : stateKeyMap[field] || field;
        const inputValue = (newItemInputs as any)[stateKey];

        if (!inputValue || !inputValue.trim()) return;

        if (subfield) {
            setFormData(prev => ({
                ...prev,
                [field]: {
                    ...(prev as any)[field],
                    [subfield]: [...(prev as any)[field][subfield], inputValue.trim()]
                }
            }));
            setNewItemInputs(prev => ({ ...prev, [stateKey]: '', [`show${stateKey.charAt(0).toUpperCase() + stateKey.slice(1)}Input`]: false }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: [...(prev as any)[field], inputValue.trim()]
            }));
            setNewItemInputs(prev => ({ ...prev, [stateKey]: '', [`show${stateKey.charAt(0).toUpperCase() + stateKey.slice(1)}Input`]: false }));
        }
    };

    const removeItem = (field: string, index: number, subfield?: string) => {
        if (subfield) {
            setFormData(prev => ({
                ...prev,
                [field]: {
                    ...(prev as any)[field],
                    [subfield]: (prev as any)[field][subfield].filter((_: any, i: number) => i !== index)
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: (prev as any)[field].filter((_: any, i: number) => i !== index)
            }));
        }
    };

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: Building2, color: 'blue' },
        { id: 'infrastructure', label: 'Infrastructure', icon: Building2, color: 'purple' },
        { id: 'specialties', label: 'Specialties', icon: Stethoscope, color: 'indigo' },
        { id: 'international', label: 'International', icon: Globe, color: 'teal' },
        { id: 'accreditations', label: 'Accreditations', icon: Award, color: 'amber' },
        { id: 'location', label: 'Location', icon: MapPin, color: 'rose' },
        { id: 'description', label: 'Description', icon: FileText, color: 'gray' },
        { id: 'media', label: 'Media', icon: ImageIcon, color: 'emerald' }
    ];

    if (loading) {
        return <LoadingSpinner message="Loading your profile..." size="lg" />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                {/* Header */}
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                    <div>
                        <Link href="/dashboard/hospital" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Hospital Profile</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your facility information</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        {saveMessage && (
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${saveMessage.type === 'success'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                {saveMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                {saveMessage.text}
                            </div>
                        )}
                        <button
                            onClick={handleSubmit}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 disabled:opacity-60 transition-all shadow-sm hover:shadow-md"
                        >
                            {saving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
                    {/* Sidebar - Horizontal scroll on mobile, fixed on desktop */}
                    <div className="w-full lg:w-56 lg:flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 lg:sticky lg:top-6 overflow-x-auto lg:overflow-visible">
                            <div className="flex lg:flex-col gap-1 min-w-max lg:min-w-0">
                                {tabs.map(tab => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-2 lg:gap-2.5 px-3 lg:px-3 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap lg:w-full ${isActive
                                                ? 'bg-blue-50 text-blue-700 shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                            <span className="truncate">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* BASIC */}
                            {activeTab === 'basic' && (
                                <div className="space-y-5 animate-fadeIn">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-1">Basic Information</h2>
                                        <p className="text-sm text-gray-500">Essential details about your facility</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="col-span-full sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hospital Name *</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                                            <select
                                                value={formData.type}
                                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            >
                                                <option value="Private">Private</option>
                                                <option value="Government">Government</option>
                                                <option value="Academic">Academic</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Est. Year</label>
                                            <input
                                                type="number"
                                                value={formData.establishmentYear}
                                                onChange={e => setFormData({ ...formData, establishmentYear: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                min="1800"
                                                max={new Date().getFullYear()}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* INFRASTRUCTURE */}
                            {activeTab === 'infrastructure' && (
                                <div className="space-y-5 animate-fadeIn">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-1">Infrastructure</h2>
                                        <p className="text-sm text-gray-500">Facility capacity and equipment</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Beds</label>
                                            <input
                                                type="number"
                                                value={formData.infrastructure.totalBeds}
                                                onChange={e => setFormData({
                                                    ...formData,
                                                    infrastructure: { ...formData.infrastructure, totalBeds: parseInt(e.target.value) || 0 }
                                                })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">ICU Beds</label>
                                            <input
                                                type="number"
                                                value={formData.infrastructure.icuBeds}
                                                onChange={e => setFormData({
                                                    ...formData,
                                                    infrastructure: { ...formData.infrastructure, icuBeds: parseInt(e.target.value) || 0 }
                                                })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Operating Theaters</label>
                                            <input
                                                type="number"
                                                value={formData.infrastructure.operatingTheaters}
                                                onChange={e => setFormData({
                                                    ...formData,
                                                    infrastructure: { ...formData.infrastructure, operatingTheaters: parseInt(e.target.value) || 0 }
                                                })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Specialized Units */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Specialized Units</label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {formData.infrastructure.specializedUnits.map((unit, i) => (
                                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm">
                                                    {unit}
                                                    <button type="button" onClick={() => removeItem('infrastructure', i, 'specializedUnits')} className="hover:bg-blue-100 rounded p-0.5">
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        {newItemInputs.showUnitInput ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newItemInputs.specializedUnit}
                                                    onChange={e => setNewItemInputs({ ...newItemInputs, specializedUnit: e.target.value })}
                                                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem('infrastructure', 'specializedUnits'))}
                                                    placeholder="e.g., Cardiac Care Unit"
                                                    className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                                                    autoFocus
                                                />
                                                <button type="button" onClick={() => addItem('infrastructure', 'specializedUnits')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Add</button>
                                                <button type="button" onClick={() => setNewItemInputs({ ...newItemInputs, showUnitInput: false, specializedUnit: '' })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setNewItemInputs({ ...newItemInputs, showUnitInput: true })}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" /> Add Unit
                                            </button>
                                        )}
                                    </div>

                                    {/* Technologies */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Technologies & Equipment</label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {formData.infrastructure.technologies.map((tech, i) => (
                                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm">
                                                    {tech}
                                                    <button type="button" onClick={() => removeItem('infrastructure', i, 'technologies')} className="hover:bg-purple-100 rounded p-0.5">
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        {newItemInputs.showTechInput ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newItemInputs.technology}
                                                    onChange={e => setNewItemInputs({ ...newItemInputs, technology: e.target.value })}
                                                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem('infrastructure', 'technologies'))}
                                                    placeholder="e.g., MRI 3T Scanner"
                                                    className="flex-1 px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
                                                    autoFocus
                                                />
                                                <button type="button" onClick={() => addItem('infrastructure', 'technologies')} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Add</button>
                                                <button type="button" onClick={() => setNewItemInputs({ ...newItemInputs, showTechInput: false, technology: '' })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setNewItemInputs({ ...newItemInputs, showTechInput: true })}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" /> Add Technology
                                            </button>
                                        )}
                                    </div>

                                    {/* Amenities */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {formData.infrastructure.amenities.map((amenity, i) => (
                                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm">
                                                    {amenity}
                                                    <button type="button" onClick={() => removeItem('infrastructure', i, 'amenities')} className="hover:bg-green-100 rounded p-0.5">
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        {newItemInputs.showAmenityInput ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newItemInputs.amenity}
                                                    onChange={e => setNewItemInputs({ ...newItemInputs, amenity: e.target.value })}
                                                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem('infrastructure', 'amenities'))}
                                                    placeholder="e.g., WiFi, Cafeteria, Parking"
                                                    className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-sm"
                                                    autoFocus
                                                />
                                                <button type="button" onClick={() => addItem('infrastructure', 'amenities')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Add</button>
                                                <button type="button" onClick={() => setNewItemInputs({ ...newItemInputs, showAmenityInput: false, amenity: '' })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setNewItemInputs({ ...newItemInputs, showAmenityInput: true })}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" /> Add Amenity
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Continue with other tabs... */}
                            {activeTab === 'specialties' && (
                                <div className="space-y-5 animate-fadeIn">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-1">Specialized Centers</h2>
                                        <p className="text-sm text-gray-500">Centers of excellence at your facility</p>
                                    </div>

                                    <div>
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            {formData.specializedCenters.map((center, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                                                    <span className="text-sm font-medium text-gray-900">{center}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem('specializedCenters', i)}
                                                        className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        {newItemInputs.showCenterInput ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newItemInputs.center}
                                                    onChange={e => setNewItemInputs({ ...newItemInputs, center: e.target.value })}
                                                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem('specializedCenters'))}
                                                    placeholder="e.g., Cardiac Care Center"
                                                    className="flex-1 px-3 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                                                    autoFocus
                                                />
                                                <button type="button" onClick={() => addItem('specializedCenters')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">Add</button>
                                                <button type="button" onClick={() => setNewItemInputs({ ...newItemInputs, showCenterInput: false, center: '' })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setNewItemInputs({ ...newItemInputs, showCenterInput: true })}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                                            >
                                                <Plus className="w-4 h-4" /> Add Center
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Add remaining tabs in similar calm style... */}
                            {/* For brevity, I'll add the essential ones */}

                            {activeTab === 'location' && (
                                <div className="space-y-5 animate-fadeIn">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-1">Location & Contact</h2>
                                        <p className="text-sm text-gray-500">Address and contact information</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                                            <textarea
                                                value={formData.location.address}
                                                onChange={e => setFormData({ ...formData, location: { ...formData.location, address: e.target.value } })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                                                rows={2}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                                            <input
                                                type="text"
                                                value={formData.location.city}
                                                onChange={e => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                                            <input
                                                type="text"
                                                value={formData.location.state}
                                                onChange={e => setFormData({ ...formData, location: { ...formData.location, state: e.target.value } })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Pincode</label>
                                            <input
                                                type="text"
                                                value={formData.location.pincode}
                                                onChange={e => setFormData({ ...formData, location: { ...formData.location, pincode: e.target.value } })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                                            <input
                                                type="text"
                                                value={formData.location.country}
                                                onChange={e => setFormData({ ...formData, location: { ...formData.location, country: e.target.value } })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="col-span-2 mt-4">
                                            <h3 className="font-medium text-gray-900 mb-3">Contact Details</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Emergency</label>
                                                    <input
                                                        type="tel"
                                                        value={formData.emergencyPhone}
                                                        onChange={e => setFormData({ ...formData, emergencyPhone: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
                                                    <input
                                                        type="url"
                                                        value={formData.website}
                                                        onChange={e => setFormData({ ...formData, website: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'description' && (
                                <div className="space-y-5 animate-fadeIn">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-1">Description</h2>
                                        <p className="text-sm text-gray-500">Tell patients about your hospital</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description</label>
                                        <textarea
                                            value={formData.shortDescription}
                                            onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                                            rows={2}
                                            placeholder="Brief overview (shown in listings)"
                                            maxLength={200}
                                        />
                                        <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/200 characters</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Description</label>
                                        <textarea
                                            value={formData.fullDescription}
                                            onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                                            rows={8}
                                            placeholder="Detailed information about services, expertise, achievements..."
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'international' && (
                                <div className="space-y-5 animate-fadeIn">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-1">International Services</h2>
                                        <p className="text-sm text-gray-500">Services for international patients</p>
                                    </div>

                                    {/* Languages Spoken */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
                                        <div className="space-y-2">
                                            {formData.internationalServices.languages.map((lang, index) => (
                                                <div key={index} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                                                    <Globe className="w-4 h-4 text-blue-600" />
                                                    <span className="flex-1 text-sm text-gray-700">{lang}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem('internationalServices', index, 'languages')}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            {newItemInputs.showLanguageInput ? (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={newItemInputs.language || ''}
                                                        onChange={e => setNewItemInputs(prev => ({ ...prev, language: e.target.value }))}
                                                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem('internationalServices', 'languages'))}
                                                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                        placeholder="e.g., English, Tamil, Hindi"
                                                        autoFocus
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => addItem('internationalServices', 'languages')}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setNewItemInputs(prev => ({ ...prev, showLanguageInput: false, language: '' }))}
                                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setNewItemInputs(prev => ({ ...prev, showLanguageInput: true }))}
                                                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Add Language
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* International Services */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">International Patient Services</label>
                                        <div className="space-y-2">
                                            {formData.internationalServices.services.map((service, index) => (
                                                <div key={index} className="flex items-center gap-2 bg-teal-50 px-3 py-2 rounded-lg">
                                                    <Check className="w-4 h-4 text-teal-600" />
                                                    <span className="flex-1 text-sm text-gray-700">{service}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem('internationalServices', index, 'services')}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            {newItemInputs.showServiceInput ? (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={newItemInputs.service || ''}
                                                        onChange={e => setNewItemInputs(prev => ({ ...prev, service: e.target.value }))}
                                                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem('internationalServices', 'services'))}
                                                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                        placeholder="e.g., Airport Pickup, Visa Assistance"
                                                        autoFocus
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => addItem('internationalServices', 'services')}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setNewItemInputs(prev => ({ ...prev, showServiceInput: false, service: '' }))}
                                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setNewItemInputs(prev => ({ ...prev, showServiceInput: true }))}
                                                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Add Service
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Toggles */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <input
                                                type="checkbox"
                                                id="coordinator"
                                                checked={formData.internationalServices.coordinatorAvailable}
                                                onChange={e => setFormData({
                                                    ...formData,
                                                    internationalServices: {
                                                        ...formData.internationalServices,
                                                        coordinatorAvailable: e.target.checked
                                                    }
                                                })}
                                                className="w-5 h-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                                            />
                                            <label htmlFor="coordinator" className="text-sm font-medium text-gray-700 cursor-pointer">
                                                International Coordinator Available
                                            </label>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <input
                                                type="checkbox"
                                                id="teleconsultation"
                                                checked={formData.internationalServices.teleconsultation}
                                                onChange={e => setFormData({
                                                    ...formData,
                                                    internationalServices: {
                                                        ...formData.internationalServices,
                                                        teleconsultation: e.target.checked
                                                    }
                                                })}
                                                className="w-5 h-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                                            />
                                            <label htmlFor="teleconsultation" className="text-sm font-medium text-gray-700 cursor-pointer">
                                                Teleconsultation Available
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'accreditations' && (
                                <div className="space-y-5 animate-fadeIn">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-1">Accreditations & Awards</h2>
                                        <p className="text-sm text-gray-500">Certifications and recognitions</p>
                                    </div>

                                    <div className="space-y-3">
                                        {formData.accreditations.map((accr, index) => (
                                            <div key={index} className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                                                <div className="flex items-start justify-between mb-2">
                                                    <Award className="w-5 h-5 text-amber-600 mt-0.5" />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData({
                                                                ...formData,
                                                                accreditations: formData.accreditations.filter((_, i) => i !== index)
                                                            });
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <h3 className="font-semibold text-gray-900">{accr.name}</h3>
                                                <p className="text-sm text-gray-600">{accr.issuingBody}</p>
                                                <p className="text-xs text-gray-500 mt-1">Year: {accr.year}</p>
                                            </div>
                                        ))}

                                        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
                                            <h3 className="font-medium text-gray-700 mb-3">Add New Accreditation</h3>
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    placeholder="Accreditation Name (e.g., JCI Accreditation)"
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                    id="newAccrName"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Issuing Body (e.g., Joint Commission International)"
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                    id="newAccrBody"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Year (e.g., 2020)"
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                    id="newAccrYear"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const name = (document.getElementById('newAccrName') as HTMLInputElement)?.value;
                                                        const body = (document.getElementById('newAccrBody') as HTMLInputElement)?.value;
                                                        const year = (document.getElementById('newAccrYear') as HTMLInputElement)?.value;
                                                        if (name && body && year) {
                                                            setFormData({
                                                                ...formData,
                                                                accreditations: [...formData.accreditations, { name, issuingBody: body, year }]
                                                            });
                                                            (document.getElementById('newAccrName') as HTMLInputElement).value = '';
                                                            (document.getElementById('newAccrBody') as HTMLInputElement).value = '';
                                                            (document.getElementById('newAccrYear') as HTMLInputElement).value = '';
                                                        }
                                                    }}
                                                    className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center justify-center gap-2"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Add Accreditation
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'media' && (
                                <div className="space-y-5 animate-fadeIn">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-1">Media & Gallery</h2>
                                        <p className="text-sm text-gray-500">Hospital photos and videos</p>
                                    </div>

                                    {/* Logo Upload */}
                                    <ImageUpload
                                        value={formData.logoUrl}
                                        onChange={(url: string) => setFormData({ ...formData, logoUrl: url })}
                                        label="Hospital Logo"
                                    />

                                    {/* Cover Image Upload */}
                                    <ImageUpload
                                        value={formData.coverUrl}
                                        onChange={(url: string) => setFormData({ ...formData, coverUrl: url })}
                                        label="Cover Image"
                                    />

                                    {/* Gallery */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Photo Gallery</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                                            {formData.gallery.map((photo, index) => (
                                                <div key={index} className="relative group">
                                                    <img src={photo.url} alt={photo.caption} className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({
                                                            ...formData,
                                                            gallery: formData.gallery.filter((_, i) => i !== index)
                                                        })}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                    <p className="text-xs text-gray-600 mt-1 truncate">{photo.caption}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
                                            <h3 className="font-medium text-gray-700 mb-3">Add Photo to Gallery</h3>

                                            {/* Image Upload for Gallery */}
                                            <ImageUpload
                                                value=""
                                                onChange={(url: string) => {
                                                    // Store the URL temporarily for adding to gallery
                                                    (window as any)._tempGalleryUrl = url;
                                                }}
                                                label="Upload Image"
                                            />

                                            <div className="mt-3 space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder="Caption for this photo"
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                    id="newPhotoCaption"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const url = (window as any)._tempGalleryUrl;
                                                        const caption = (document.getElementById('newPhotoCaption') as HTMLInputElement)?.value;
                                                        if (url && caption) {
                                                            setFormData({
                                                                ...formData,
                                                                gallery: [...formData.gallery, { url, caption }]
                                                            });
                                                            (document.getElementById('newPhotoCaption') as HTMLInputElement).value = '';
                                                            (window as any)._tempGalleryUrl = '';
                                                        } else if (!url) {
                                                            alert('Please upload an image first');
                                                        } else {
                                                            alert('Please enter a caption');
                                                        }
                                                    }}
                                                    className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Add to Gallery
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}
