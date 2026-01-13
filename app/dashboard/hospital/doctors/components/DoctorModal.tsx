"use client";

import { Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";

interface Education {
    degree: string;
    institution: string;
    year: string;
}

interface DoctorFormData {
    // Basic Info
    name: string;
    specialty: string;
    subSpecialty: string;
    credentials: string;
    experience: string; // e.g., "31+ years"
    imageUrl: string;
    bio: string;

    // Metrics
    surgeriesCount: number;
    publicationsCount: number;

    // Languages & Availability
    languages: string[];
    consultationTimings: string;
    isAvailable: boolean;
    isFeatured: boolean;

    // Credentials (structured)
    education: Education[];
    expertise: string[];
    internationalTraining: string[];
    awards: string[];

    // Service Linking
    serviceSlug: string;
}

interface DoctorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: DoctorFormData) => Promise<void>;
    initialData?: Partial<DoctorFormData>;
    title?: string;
}

export default function DoctorModal({ isOpen, onClose, onSubmit, initialData, title = "Add New Doctor" }: DoctorModalProps) {
    const [formData, setFormData] = useState<DoctorFormData>({
        name: initialData?.name || "",
        specialty: initialData?.specialty || "",
        subSpecialty: initialData?.subSpecialty || "",
        credentials: initialData?.credentials || "",
        experience: initialData?.experience || "",
        imageUrl: initialData?.imageUrl || "",
        bio: initialData?.bio || "",
        surgeriesCount: initialData?.surgeriesCount || 0,
        publicationsCount: initialData?.publicationsCount || 0,
        languages: Array.isArray(initialData?.languages) ? initialData.languages : [],
        consultationTimings: initialData?.consultationTimings || "",
        isAvailable: initialData?.isAvailable ?? true,
        isFeatured: initialData?.isFeatured ?? false,
        education: Array.isArray(initialData?.education) ? initialData.education : [],
        expertise: Array.isArray(initialData?.expertise) ? initialData.expertise : [],
        internationalTraining: Array.isArray(initialData?.internationalTraining) ? initialData.internationalTraining : [],
        awards: Array.isArray(initialData?.awards) ? initialData.awards : [],
        serviceSlug: initialData?.serviceSlug || ""
    });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'basic' | 'credentials' | 'experience'>('basic');

    // Temp states for adding array items
    const [newLanguage, setNewLanguage] = useState("");
    const [newExpertise, setNewExpertise] = useState("");
    const [newCountry, setNewCountry] = useState("");
    const [newAward, setNewAward] = useState("");

    // Update form data when initialData changes (for edit mode)
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData?.name || "",
                specialty: initialData?.specialty || "",
                subSpecialty: initialData?.subSpecialty || "",
                credentials: initialData?.credentials || "",
                experience: initialData?.experience || "",
                imageUrl: initialData?.imageUrl || "",
                bio: initialData?.bio || "",
                surgeriesCount: initialData?.surgeriesCount || 0,
                publicationsCount: initialData?.publicationsCount || 0,
                languages: Array.isArray(initialData?.languages) ? initialData.languages : [],
                consultationTimings: initialData?.consultationTimings || "",
                isAvailable: initialData?.isAvailable ?? true,
                isFeatured: initialData?.isFeatured ?? false,
                education: Array.isArray(initialData?.education) ? initialData.education : [],
                expertise: Array.isArray(initialData?.expertise) ? initialData.expertise : [],
                internationalTraining: Array.isArray(initialData?.internationalTraining) ? initialData.internationalTraining : [],
                awards: Array.isArray(initialData?.awards) ? initialData.awards : [],
                serviceSlug: initialData?.serviceSlug || ""
            });
        } else {
            // Reset form for add mode
            setFormData({
                name: "",
                specialty: "",
                subSpecialty: "",
                credentials: "",
                experience: "",
                imageUrl: "",
                bio: "",
                surgeriesCount: 0,
                publicationsCount: 0,
                languages: [],
                consultationTimings: "",
                isAvailable: true,
                isFeatured: false,
                education: [],
                expertise: [],
                internationalTraining: [],
                awards: [],
                serviceSlug: ""
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error("Failed to save doctor:", error);
            alert("Failed to save doctor. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { degree: "", institution: "", year: "" }]
        });
    };

    const removeEducation = (index: number) => {
        setFormData({
            ...formData,
            education: formData.education.filter((_, i) => i !== index)
        });
    };

    const updateEducation = (index: number, field: keyof Education, value: string) => {
        const updated = [...formData.education];
        updated[index][field] = value;
        setFormData({ ...formData, education: updated });
    };

    const addArrayItem = (key: 'languages' | 'expertise' | 'internationalTraining' | 'awards', value: string) => {
        if (value.trim()) {
            setFormData({ ...formData, [key]: [...formData[key], value.trim()] });
        }
    };

    const removeArrayItem = (key: 'languages' | 'expertise' | 'internationalTraining' | 'awards', index: number) => {
        setFormData({ ...formData, [key]: formData[key].filter((_, i) => i !== index) });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 px-6">
                    {(['basic', 'credentials', 'experience'] as const).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab === 'basic' && 'Basic Info'}
                            {tab === 'credentials' && 'Credentials & Education'}
                            {tab === 'experience' && 'Experience & Achievements'}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* Basic Info Tab */}
                    {activeTab === 'basic' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="Dr. John Smith"
                                    />
                                </div>

                                {/* Specialty */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Specialty <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="Cardiology"
                                    />
                                </div>

                                {/* Sub-Specialty */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sub-Specialty
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subSpecialty}
                                        onChange={(e) => setFormData({ ...formData, subSpecialty: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="Interventional Cardiology"
                                    />
                                </div>

                                {/* Credentials */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Credentials
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.credentials}
                                        onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="MBBS, MD, FRCS"
                                    />
                                </div>

                                {/* Experience */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Experience
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.experience}
                                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="31+ years"
                                    />
                                </div>
                            </div>

                            {/* Profile Photo */}
                            <ImageUpload
                                value={formData.imageUrl}
                                onChange={(url: string) => setFormData({ ...formData, imageUrl: url })}
                                label="Profile Photo"
                            />

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Professional Bio
                                </label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                                    placeholder="Brief overview of expertise and experience..."
                                />
                            </div>

                            {/* Service Slug */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Service Slug (for URLs)
                                </label>
                                <input
                                    type="text"
                                    value={formData.serviceSlug}
                                    onChange={(e) => setFormData({ ...formData, serviceSlug: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="cardiology"
                                />
                                <p className="text-xs text-gray-500 mt-1">Used for routing to specialty pages</p>
                            </div>

                            {/* Consultation Timings */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Consultation Timings
                                </label>
                                <input
                                    type="text"
                                    value={formData.consultationTimings}
                                    onChange={(e) => setFormData({ ...formData, consultationTimings: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="Mon-Sat: 9AM-1PM, 4PM-7PM"
                                />
                            </div>

                            {/* Languages */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Languages Spoken
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={newLanguage}
                                        onChange={(e) => setNewLanguage(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addArrayItem('languages', newLanguage);
                                                setNewLanguage("");
                                            }
                                        }}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Add language (press Enter)"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            addArrayItem('languages', newLanguage);
                                            setNewLanguage("");
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.languages.map((lang, i) => (
                                        <span key={i} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm">
                                            {lang}
                                            <button type="button" onClick={() => removeArrayItem('languages', i)} className="hover:text-blue-900">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Status Toggles */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        id="isAvailable"
                                        checked={formData.isAvailable}
                                        onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Available for Consultations
                                    </label>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        id="isFeatured"
                                        checked={formData.isFeatured}
                                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Featured / Top Rated
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Credentials & Education Tab */}
                    {activeTab === 'credentials' && (
                        <div className="space-y-6">
                            {/* Education */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Education
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addEducation}
                                        className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Education
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {formData.education.map((edu, i) => (
                                        <div key={i} className="p-4 bg-gray-50 rounded-xl">
                                            <div className="grid grid-cols-3 gap-3 mb-3">
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={(e) => updateEducation(i, 'degree', e.target.value)}
                                                    placeholder="Degree (e.g., MBBS)"
                                                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    value={edu.institution}
                                                    onChange={(e) => updateEducation(i, 'institution', e.target.value)}
                                                    placeholder="Institution"
                                                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    value={edu.year}
                                                    onChange={(e) => updateEducation(i, 'year', e.target.value)}
                                                    placeholder="Year"
                                                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeEducation(i)}
                                                className="text-red-600 text-sm hover:text-red-700 flex items-center gap-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    {formData.education.length === 0 && (
                                        <p className="text-gray-500 text-sm text-center py-4">No education added yet</p>
                                    )}
                                </div>
                            </div>

                            {/* International Training */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    International Training (Countries)
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={newCountry}
                                        onChange={(e) => setNewCountry(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addArrayItem('internationalTraining', newCountry);
                                                setNewCountry("");
                                            }
                                        }}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Add country (press Enter)"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            addArrayItem('internationalTraining', newCountry);
                                            setNewCountry("");
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.internationalTraining.map((country, i) => (
                                        <span key={i} className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm">
                                            {country}
                                            <button type="button" onClick={() => removeArrayItem('internationalTraining', i)} className="hover:text-indigo-900">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Experience & Achievements Tab */}
                    {activeTab === 'experience' && (
                        <div className="space-y-6">
                            {/* Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Surgeries/Procedures Count
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.surgeriesCount}
                                        onChange={(e) => setFormData({ ...formData, surgeriesCount: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="5000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Publications Count
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.publicationsCount}
                                        onChange={(e) => setFormData({ ...formData, publicationsCount: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="45"
                                    />
                                </div>
                            </div>

                            {/* Areas of Expertise */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Areas of Expertise / Procedures
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={newExpertise}
                                        onChange={(e) => setNewExpertise(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addArrayItem('expertise', newExpertise);
                                                setNewExpertise("");
                                            }
                                        }}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Add procedure/expertise (press Enter)"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            addArrayItem('expertise', newExpertise);
                                            setNewExpertise("");
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.expertise.map((exp, i) => (
                                        <span key={i} className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm">
                                            {exp}
                                            <button type="button" onClick={() => removeArrayItem('expertise', i)} className="hover:text-green-900">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Awards */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Awards & Recognition
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={newAward}
                                        onChange={(e) => setNewAward(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addArrayItem('awards', newAward);
                                                setNewAward("");
                                            }
                                        }}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Add award (press Enter)"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            addArrayItem('awards', newAward);
                                            setNewAward("");
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.awards.map((award, i) => (
                                        <span key={i} className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg text-sm">
                                            {award}
                                            <button type="button" onClick={() => removeArrayItem('awards', i)} className="hover:text-yellow-900">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Save Doctor"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
