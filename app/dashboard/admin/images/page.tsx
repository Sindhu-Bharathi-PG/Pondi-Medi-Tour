"use client";

import { Check, ExternalLink, ImageIcon, Loader2, RefreshCw, RotateCcw, Save, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Default image categories with their URLs
const defaultImages = {
    // Hero Images
    heroWellness: {
        label: "Wellness Hero",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920",
        category: "hero",
    },
    heroYoga: {
        label: "Yoga Hero",
        url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920",
        category: "hero",
    },
    heroSpa: {
        label: "Spa Hero",
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920",
        category: "hero",
    },
    heroAuroville: {
        label: "Auroville Hero",
        url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920",
        category: "hero",
    },

    // Attraction Images
    frenchQuarter: {
        label: "French Quarter",
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
        category: "attractions",
    },
    matrimandir: {
        label: "Matrimandir",
        url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800",
        category: "attractions",
    },
    paradiseBeach: {
        label: "Paradise Beach",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        category: "attractions",
    },
    promenadeBeach: {
        label: "Promenade Beach",
        url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
        category: "attractions",
    },

    // Spa & Wellness
    spaRelax: {
        label: "Spa Relaxation",
        url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
        category: "wellness",
    },
    hotStone: {
        label: "Hot Stone Therapy",
        url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800",
        category: "wellness",
    },
    massage: {
        label: "Massage",
        url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800",
        category: "wellness",
    },
    meditation: {
        label: "Meditation",
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
        category: "yoga",
    },
    sunriseYoga: {
        label: "Sunrise Yoga",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        category: "yoga",
    },

    // Nature
    garden: {
        label: "Garden",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        category: "nature",
    },
    sunset: {
        label: "Sunset",
        url: "https://images.unsplash.com/photo-1476673160081-cf065f0d2a86?w=800",
        category: "nature",
    },
};

type ImageKey = keyof typeof defaultImages;

export default function ImagesPage() {
    const [images, setImages] = useState(defaultImages);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingKey, setEditingKey] = useState<ImageKey | null>(null);
    const [tempUrl, setTempUrl] = useState("");
    const [filter, setFilter] = useState<string>("all");
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const categories = ["all", "hero", "attractions", "wellness", "yoga", "nature"];

    // Fetch images from API on mount
    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/images');
            const data = await response.json();
            if (data.success && data.data) {
                setImages({ ...defaultImages, ...data.data });
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setMessage({ type: 'error', text: 'Failed to load images from server' });
        } finally {
            setLoading(false);
        }
    };

    const filteredImages = Object.entries(images).filter(
        ([, value]) => filter === "all" || value.category === filter
    );

    const handleEdit = (key: ImageKey) => {
        setEditingKey(key);
        setTempUrl(images[key].url);
    };

    const handleSave = (key: ImageKey) => {
        if (tempUrl.trim()) {
            setImages({
                ...images,
                [key]: { ...images[key], url: tempUrl.trim() },
            });
        }
        setEditingKey(null);
        setTempUrl("");
    };

    const handleReset = (key: ImageKey) => {
        setImages({
            ...images,
            [key]: { ...images[key], url: defaultImages[key].url },
        });
    };

    const [uploadingKey, setUploadingKey] = useState<ImageKey | null>(null);

    const handleUpload = async (key: ImageKey, file: File) => {
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            setMessage({ type: 'error', text: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'File too large. Maximum size is 5MB' });
            return;
        }

        setUploadingKey(key);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('imageKey', key);

            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setImages({
                    ...images,
                    [key]: { ...images[key], url: data.data.url },
                });
                setMessage({ type: 'success', text: `Image uploaded successfully!` });
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage({ type: 'error', text: 'Failed to upload image. Please try again.' });
        } finally {
            setUploadingKey(null);
        }
    };

    const handleSaveAll = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const response = await fetch('/api/admin/images', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(images),
            });
            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Images saved successfully!' });
            } else {
                throw new Error(data.error || 'Failed to save');
            }
        } catch (error) {
            console.error('Error saving images:', error);
            setMessage({ type: 'error', text: 'Failed to save images. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleResetAll = async () => {
        if (!confirm('Are you sure you want to reset all images to defaults?')) return;

        setSaving(true);
        try {
            const response = await fetch('/api/admin/images', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reset' }),
            });
            const data = await response.json();

            if (data.success) {
                setImages(defaultImages);
                setMessage({ type: 'success', text: 'All images reset to defaults!' });
            }
        } catch (error) {
            console.error('Error resetting images:', error);
            setMessage({ type: 'error', text: 'Failed to reset images' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-violet-600 animate-spin mx-auto" />
                    <p className="text-slate-600 mt-4">Loading images...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Message Banner */}
            {message && (
                <div className={`p-4 rounded-xl flex items-center justify-between ${message.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                    <span>{message.text}</span>
                    <button onClick={() => setMessage(null)} className="p-1 hover:bg-black/10 rounded">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/25">
                            <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                        Image Management
                    </h1>
                    <p className="text-slate-600 mt-1">Manage images displayed across the website</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleResetAll}
                        disabled={saving}
                        className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset All
                    </button>
                    <button
                        onClick={handleSaveAll}
                        disabled={saving}
                        className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? "Saving..." : "Save All Changes"}
                    </button>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${filter === cat
                            ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Image Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map(([key, value]) => (
                    <div
                        key={key}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        {/* Image Preview */}
                        <div
                            className="relative h-48 bg-slate-100 cursor-pointer group"
                            onClick={() => setPreviewImage(value.url)}
                        >
                            <Image
                                src={value.url}
                                alt={value.label}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full capitalize">
                                {value.category}
                            </span>
                        </div>

                        {/* Image Info */}
                        <div className="p-4 space-y-4">
                            <div>
                                <h3 className="font-semibold text-slate-900">{value.label}</h3>
                                <p className="text-xs text-slate-500 truncate mt-1">{value.url}</p>
                            </div>

                            {/* Edit Mode */}
                            {editingKey === key ? (
                                <div className="space-y-3">
                                    <input
                                        type="url"
                                        value={tempUrl}
                                        onChange={(e) => setTempUrl(e.target.value)}
                                        placeholder="Enter image URL..."
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleSave(key as ImageKey)}
                                            className="flex-1 px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-1"
                                        >
                                            <Check className="w-4 h-4" />
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingKey(null)}
                                            className="px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(key as ImageKey)}
                                            className="flex-1 px-3 py-2 bg-violet-50 text-violet-700 rounded-lg text-sm font-medium hover:bg-violet-100 transition"
                                        >
                                            Change URL
                                        </button>
                                        <button
                                            onClick={() => handleReset(key as ImageKey)}
                                            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                                            title="Reset to default"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <label className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition cursor-pointer">
                                        {uploadingKey === key ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4" />
                                                Upload from Device
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/gif"
                                            className="hidden"
                                            disabled={uploadingKey === key}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    handleUpload(key as ImageKey, file);
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview Modal */}
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setPreviewImage(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] w-full">
                        <Image
                            src={previewImage}
                            alt="Preview"
                            width={1920}
                            height={1080}
                            className="object-contain w-full h-full rounded-2xl"
                        />
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="font-semibold text-amber-800 mb-2">💡 How to Use</h3>
                <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Click on an image to preview it in full size</li>
                    <li>• Use &quot;Change URL&quot; to update an image URL (Unsplash URLs recommended)</li>
                    <li>• Click the refresh icon to reset an image to its default</li>
                    <li>• Filter images by category using the buttons above</li>
                    <li>• Click &quot;Save All Changes&quot; to persist your changes</li>
                </ul>
            </div>
        </div>
    );
}
