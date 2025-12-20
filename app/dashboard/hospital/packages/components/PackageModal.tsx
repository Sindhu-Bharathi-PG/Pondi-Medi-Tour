"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
// Import ImageUpload from doctors folder for reuse
import ImageUpload from "../../doctors/components/ImageUpload";

interface PackageInclusions {
    accommodation: string | null;
    transport: string | null;
    meals: string | null;
    extraServices: string[];
}

interface PackageFormData {
    name: string;
    category: string;
    price: number;
    discountedPrice: number;
    durationDays: number;
    durationNights: number;
    inclusions: PackageInclusions;
    shortDescription: string;
    fullDescription: string;
    imageUrl: string;
    isActive: boolean;
    isFeatured: boolean;
}

interface PackageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PackageFormData) => Promise<void>;
    initialData?: Partial<PackageFormData> | null;
    title?: string;
}

export default function PackageModal({ isOpen, onClose, onSubmit, initialData, title = "Add New Package" }: PackageModalProps) {
    const [formData, setFormData] = useState<PackageFormData>({
        name: "",
        category: "Select Category",
        price: 0,
        discountedPrice: 0,
        durationDays: 1,
        durationNights: 0,
        inclusions: {
            accommodation: "",
            transport: "",
            meals: "",
            extraServices: []
        },
        shortDescription: "",
        fullDescription: "",
        imageUrl: "",
        isActive: true,
        isFeatured: false
    });

    const [loading, setLoading] = useState(false);
    const [newService, setNewService] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                category: initialData.category || "Select Category",
                price: initialData.price || 0,
                discountedPrice: initialData.discountedPrice || 0,
                durationDays: initialData.durationDays || 1,
                durationNights: initialData.durationNights || 0,
                inclusions: {
                    accommodation: initialData.inclusions?.accommodation || "",
                    transport: initialData.inclusions?.transport || "",
                    meals: initialData.inclusions?.meals || "",
                    extraServices: initialData.inclusions?.extraServices || []
                },
                shortDescription: initialData.shortDescription || "",
                fullDescription: initialData.fullDescription || "",
                imageUrl: initialData.imageUrl || "",
                isActive: initialData.isActive ?? true,
                isFeatured: initialData.isFeatured ?? false
            });
        } else {
            resetForm();
        }
    }, [initialData]);

    const resetForm = () => {
        setFormData({
            name: "",
            category: "Wellness",
            price: 0,
            discountedPrice: 0,
            durationDays: 1,
            durationNights: 0,
            inclusions: {
                accommodation: "",
                transport: "",
                meals: "",
                extraServices: []
            },
            shortDescription: "",
            fullDescription: "",
            imageUrl: "",
            isActive: true,
            isFeatured: false
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save package");
        } finally {
            setLoading(false);
        }
    };

    const addService = () => {
        if (newService.trim()) {
            setFormData({
                ...formData,
                inclusions: {
                    ...formData.inclusions,
                    extraServices: [...formData.inclusions.extraServices, newService.trim()]
                }
            });
            setNewService("");
        }
    };

    const removeService = (index: number) => {
        setFormData({
            ...formData,
            inclusions: {
                ...formData.inclusions,
                extraServices: formData.inclusions.extraServices.filter((_, i) => i !== index)
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-white rounded-lg transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="e.g. Total Body Wellness Checkup"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                <option value="Wellness">Wellness</option>
                                <option value="Checkup">Checkup</option>
                                <option value="Surgery Bundle">Surgery Bundle</option>
                                <option value="Cosmetic">Cosmetic</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Package Cover Image</label>
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <ImageUpload
                                        value={formData.imageUrl}
                                        onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                        label="Upload Cover Image"
                                    />
                                </div>
                                {formData.imageUrl && (
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                        className="mt-8 p-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1 text-sm font-medium transition"
                                    >
                                        <X className="w-4 h-4" /> Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR ₹)</label>
                            <input
                                type="number"
                                required
                                value={formData.price || ""}
                                onChange={e => setFormData({ ...formData, price: e.target.value === "" ? 0 : Number(e.target.value) })}
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price</label>
                            <input
                                type="number"
                                value={formData.discountedPrice || ""}
                                onChange={e => setFormData({ ...formData, discountedPrice: e.target.value === "" ? 0 : Number(e.target.value) })}
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                            <input
                                type="number"
                                min="1"
                                value={formData.durationDays || ""}
                                onChange={e => setFormData({ ...formData, durationDays: e.target.value === "" ? 0 : Number(e.target.value) })}
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nights (Optional)</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.durationNights === 0 ? "" : formData.durationNights}
                                onChange={e => setFormData({ ...formData, durationNights: e.target.value === "" ? 0 : Number(e.target.value) })}
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Inclusions */}
                    <div className="space-y-4 border-t pt-4">
                        <h3 className="font-semibold text-gray-900">Inclusions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Accommodation</label>
                                <input
                                    type="text"
                                    value={formData.inclusions.accommodation || ""}
                                    onChange={e => setFormData({ ...formData, inclusions: { ...formData.inclusions, accommodation: e.target.value } })}
                                    className="w-full px-4 py-2 border rounded-xl outline-none"
                                    placeholder="e.g. 5-Star Hotel"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transport</label>
                                <input
                                    type="text"
                                    value={formData.inclusions.transport || ""}
                                    onChange={e => setFormData({ ...formData, inclusions: { ...formData.inclusions, transport: e.target.value } })}
                                    className="w-full px-4 py-2 border rounded-xl outline-none"
                                    placeholder="e.g. Airport Pickup"
                                />
                            </div>
                        </div>

                        {/* Extra Services Tag Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Extra Services</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    value={newService}
                                    onChange={e => setNewService(e.target.value)}
                                    className="flex-1 px-4 py-2 border rounded-xl outline-none"
                                    placeholder="Add service (e.g. City Tour)"
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addService())}
                                />
                                <button type="button" onClick={addService} className="bg-purple-600 text-white px-4 rounded-xl hover:bg-purple-700">Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.inclusions.extraServices.map((svc, i) => (
                                    <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                                        {svc}
                                        <button type="button" onClick={() => removeService(i)}><X className="w-3 h-3" /></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-6 pt-4 border-t">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                className="w-5 h-5 text-purple-600 rounded"
                            />
                            <span className="text-sm font-medium">Active</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isFeatured}
                                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                className="w-5 h-5 text-purple-600 rounded"
                            />
                            <span className="text-sm font-medium">Featured</span>
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium">Cancel</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Package"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
