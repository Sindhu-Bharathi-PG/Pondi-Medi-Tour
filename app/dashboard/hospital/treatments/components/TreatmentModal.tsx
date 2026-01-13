"use client";

import { AlertCircle, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface TreatmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    treatment?: any;
    onSave: (data: any) => Promise<void>;
}

export default function TreatmentModal({ isOpen, onClose, treatment, onSave }: TreatmentModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        subCategory: '',
        minPrice: '',
        maxPrice: '',
        hospitalStay: '',
        recoveryTime: '',
        successRate: '',
        shortDescription: '',
        fullDescription: '',
        technology: [] as string[],
        preRequisites: [] as string[],
        procedureSteps: [] as { title: string; description: string }[],
        isPopular: false,
        insuranceCovered: true
    });

    const [loading, setLoading] = useState(false);
    const [newTech, setNewTech] = useState('');
    const [newPreReq, setNewPreReq] = useState('');
    const [activeTab, setActiveTab] = useState<'basic' | 'medical' | 'pricing'>('basic');

    useEffect(() => {
        if (treatment) {
            setFormData({
                ...treatment,
                technology: treatment.technology || [],
                preRequisites: treatment.preRequisites || [],
                procedureSteps: treatment.procedureSteps || []
            });
        } else {
            // Reset form for new entry
            setFormData({
                name: '', category: '', subCategory: '',
                minPrice: '', maxPrice: '',
                hospitalStay: '', recoveryTime: '', successRate: '',
                shortDescription: '', fullDescription: '',
                technology: [], preRequisites: [], procedureSteps: [],
                isPopular: false, insuranceCovered: true
            });
        }
        setActiveTab('basic');
    }, [treatment, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Convert numeric values properly
            const dataToSave = {
                ...formData,
                minPrice: formData.minPrice ? parseInt(formData.minPrice.toString()) : null,
                maxPrice: formData.maxPrice ? parseInt(formData.maxPrice.toString()) : null,
                successRate: formData.successRate ? parseInt(formData.successRate.toString()) : null,
            };
            await onSave(dataToSave);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save treatment");
        } finally {
            setLoading(false);
        }
    };

    const addTechnology = () => {
        if (!newTech.trim()) return;
        setFormData(prev => ({ ...prev, technology: [...prev.technology, newTech] }));
        setNewTech('');
    };

    const addPreRequisite = () => {
        if (!newPreReq.trim()) return;
        setFormData(prev => ({ ...prev, preRequisites: [...prev.preRequisites, newPreReq] }));
        setNewPreReq('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-emerald-50">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {treatment ? 'Edit Treatment' : 'Add New Treatment'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 px-6">
                    {(['basic', 'medical', 'pricing'] as const).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab
                                ? 'border-teal-600 text-teal-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab === 'basic' && 'Basic Info'}
                            {tab === 'medical' && 'Medical Details'}
                            {tab === 'pricing' && 'Pricing & Status'}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* Basic Info Tab */}
                    {activeTab === 'basic' && (
                        <div className="space-y-6">
                            {/* Guidelines Banner */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Guidelines for Best Display
                                </h3>
                                <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
                                    <li><strong>Name:</strong> Short, clear treatment name (max 50 chars)</li>
                                    <li><strong>Short Description:</strong> 1-2 sentences for listing cards (max 150 chars)</li>
                                    <li>Use proper sentence case, avoid ALL CAPS</li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Treatment Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={50}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        placeholder="e.g. Total Knee Replacement"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{formData.name.length}/50 characters</p>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Orthopedics">Orthopedics</option>
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Dental">Dental</option>
                                        <option value="Cosmetic">Cosmetic Surgery</option>
                                        <option value="IVF & Fertility">IVF & Fertility</option>
                                        <option value="Neurology">Neurology</option>
                                        <option value="Oncology">Oncology</option>
                                        <option value="Ophthalmology">Ophthalmology</option>
                                        <option value="Gastroenterology">Gastroenterology</option>
                                        <option value="General Surgery">General Surgery</option>
                                    </select>
                                </div>

                                {/* Sub-Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sub-Category
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={30}
                                        value={formData.subCategory}
                                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        placeholder="e.g. Joint Replacement"
                                    />
                                </div>
                            </div>

                            {/* Short Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Short Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.shortDescription}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 150) {
                                            setFormData({ ...formData, shortDescription: e.target.value });
                                        }
                                    }}
                                    rows={2}
                                    maxLength={150}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none"
                                    placeholder="Brief overview shown on cards (1-2 sentences)..."
                                />
                                <p className={`text-xs mt-1 ${formData.shortDescription.length > 130 ? 'text-amber-600' : 'text-gray-500'}`}>
                                    {formData.shortDescription.length}/150 characters
                                </p>
                            </div>

                            {/* Full Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Description
                                </label>
                                <textarea
                                    value={formData.fullDescription}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 1000) {
                                            setFormData({ ...formData, fullDescription: e.target.value });
                                        }
                                    }}
                                    rows={5}
                                    maxLength={1000}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none"
                                    placeholder="Detailed description of the treatment procedure, benefits, post-care..."
                                />
                                <p className="text-xs text-gray-500 mt-1">{formData.fullDescription.length}/1000 characters</p>
                            </div>
                        </div>
                    )}

                    {/* Medical Details Tab */}
                    {activeTab === 'medical' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                {/* Success Rate */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Success Rate (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.successRate}
                                        onChange={(e) => setFormData({ ...formData, successRate: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        placeholder="98"
                                    />
                                </div>

                                {/* Hospital Stay */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Hospital Stay
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.hospitalStay}
                                        onChange={(e) => setFormData({ ...formData, hospitalStay: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        placeholder="e.g. 3-5 Days"
                                    />
                                </div>

                                {/* Recovery Time */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Recovery Time
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.recoveryTime}
                                        onChange={(e) => setFormData({ ...formData, recoveryTime: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        placeholder="e.g. 2 Weeks"
                                    />
                                </div>
                            </div>

                            {/* Technology Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Advanced Technology Used
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={newTech}
                                        onChange={(e) => setNewTech(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addTechnology();
                                            }
                                        }}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                        placeholder="Add technology (press Enter)"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTechnology}
                                        className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.technology.map((tech, i) => (
                                        <span key={i} className="flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-lg text-sm">
                                            {tech}
                                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, technology: prev.technology.filter((_, idx) => idx !== i) }))} className="hover:text-teal-900">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Pre-requisites */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pre-requisites (Tests/Clearances)
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={newPreReq}
                                        onChange={(e) => setNewPreReq(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addPreRequisite();
                                            }
                                        }}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                        placeholder="Add pre-requisite (press Enter)"
                                    />
                                    <button
                                        type="button"
                                        onClick={addPreRequisite}
                                        className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.preRequisites.map((prereq, i) => (
                                        <span key={i} className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-sm">
                                            {prereq}
                                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, preRequisites: prev.preRequisites.filter((_, idx) => idx !== i) }))} className="hover:text-amber-900">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pricing Tab */}
                    {activeTab === 'pricing' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Min Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Price (INR ₹)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.minPrice}
                                        onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        placeholder="50000"
                                    />
                                </div>

                                {/* Max Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Maximum Price (INR ₹)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.maxPrice}
                                        onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        placeholder="100000"
                                    />
                                </div>
                            </div>

                            {/* Status Toggles */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        id="insuranceCovered"
                                        checked={formData.insuranceCovered}
                                        onChange={(e) => setFormData({ ...formData, insuranceCovered: e.target.checked })}
                                        className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                                    />
                                    <label htmlFor="insuranceCovered" className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Covered by International Insurance
                                    </label>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        id="isPopular"
                                        checked={formData.isPopular}
                                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                                        className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                                    />
                                    <label htmlFor="isPopular" className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Mark as Popular Treatment
                                    </label>
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
                            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-medium shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Save Treatment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
