"use client";

import { CategoryImageConfig, categoryImages, fallbackCategoryImage } from '@/app/data/categoryImages';
import { Activity, Baby, Bone, Brain, Camera, Check, Eye, Heart, Loader2, Scissors, Sparkles, Stethoscope, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'pondi_category_images';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
    'Bone': Bone,
    'Baby': Baby,
    'Eye': Eye,
    'Heart': Heart,
    'Activity': Activity,
    'Brain': Brain,
    'Scissors': Scissors,
    'Stethoscope': Stethoscope,
    'Sparkles': Sparkles
};

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Record<string, CategoryImageConfig>>(categoryImages);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [saving, setSaving] = useState(false);
    const [savedCategory, setSavedCategory] = useState<string | null>(null);
    const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
    const [uploading, setUploading] = useState(false);

    // Load saved images from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const savedImages = JSON.parse(saved) as Record<string, string>;
                setCategories(prev => {
                    const updated = { ...prev };
                    Object.entries(savedImages).forEach(([key, imageUrl]) => {
                        if (updated[key]) {
                            updated[key] = { ...updated[key], image: imageUrl };
                        }
                    });
                    return updated;
                });
            }
        } catch (error) {
            console.error('Failed to load saved category images:', error);
        }
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, categoryName: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be less than 5MB');
            return;
        }

        setUploading(true);
        try {
            // Convert to base64 data URL
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target?.result as string;
                setNewImageUrl(dataUrl);
                setUploading(false);
            };
            reader.onerror = () => {
                alert('Failed to read file');
                setUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to process image');
            setUploading(false);
        }
    };

    const handleEditCategory = (categoryName: string) => {
        setEditingCategory(categoryName);
        setNewImageUrl(categories[categoryName]?.image || '');
        setUploadMode('url');
    };

    const handleSaveImage = async (categoryName: string) => {
        if (!newImageUrl.trim()) return;

        setSaving(true);
        try {
            // Update local state
            const updatedCategories = {
                ...categories,
                [categoryName]: {
                    ...categories[categoryName],
                    image: newImageUrl
                }
            };
            setCategories(updatedCategories);

            // Save to localStorage
            const savedImages: Record<string, string> = {};
            Object.entries(updatedCategories).forEach(([key, cat]) => {
                if (cat.image !== categoryImages[key]?.image) {
                    savedImages[key] = cat.image;
                }
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedImages));

            // Show success feedback
            setSavedCategory(categoryName);
            setTimeout(() => setSavedCategory(null), 2000);

            setEditingCategory(null);
            setNewImageUrl('');
        } catch (error) {
            console.error('Failed to save image:', error);
            alert('Failed to save image');
        } finally {
            setSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingCategory(null);
        setNewImageUrl('');
        setUploadMode('url');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Treatment Categories</h1>
                    <p className="text-sm text-gray-500">Manage images for treatment categories. These images are displayed on treatment cards.</p>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <Camera className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-blue-800">How Category Images Work</p>
                        <p className="text-sm text-blue-700 mt-1">
                            Each category has one image that displays for all treatments in that category.
                            For best results, use high-quality images with a 16:9 aspect ratio (800x450px recommended).
                        </p>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(categories).map(([key, category]) => {
                    const IconComponent = iconMap[category.icon] || Stethoscope;
                    const isEditing = editingCategory === key;
                    const isSaved = savedCategory === key;

                    return (
                        <div
                            key={key}
                            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 ${isEditing ? 'ring-2 ring-purple-500 border-purple-300' : 'border-gray-100 hover:shadow-md'
                                }`}
                        >
                            {/* Image Preview */}
                            <div className="relative aspect-video bg-gray-100">
                                <Image
                                    src={isEditing && newImageUrl ? newImageUrl : category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = fallbackCategoryImage;
                                    }}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20`} />

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-medium shadow-lg`}>
                                        <IconComponent className="w-4 h-4" />
                                        {category.name}
                                    </div>
                                </div>

                                {/* Saved Indicator */}
                                {isSaved && (
                                    <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500 text-white text-sm font-medium animate-pulse">
                                        <Check className="w-4 h-4" />
                                        Saved
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="p-4">
                                {isEditing ? (
                                    <div className="space-y-3">
                                        {/* Tab Toggle */}
                                        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                                            <button
                                                type="button"
                                                onClick={() => setUploadMode('url')}
                                                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition ${uploadMode === 'url' ? 'bg-white shadow text-purple-600' : 'text-gray-600'}`}
                                            >
                                                Enter URL
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setUploadMode('file')}
                                                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition ${uploadMode === 'file' ? 'bg-white shadow text-purple-600' : 'text-gray-600'}`}
                                            >
                                                Upload File
                                            </button>
                                        </div>

                                        {uploadMode === 'url' ? (
                                            <>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Image URL
                                                </label>
                                                <input
                                                    type="url"
                                                    value={newImageUrl}
                                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Upload from Device
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileUpload(e, key)}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                    <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-purple-400 transition cursor-pointer">
                                                        <Upload className="w-5 h-5 text-gray-400" />
                                                        <span className="text-sm text-gray-600">
                                                            {uploading ? 'Processing...' : 'Click or drag image here'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleSaveImage(key)}
                                                disabled={saving || !newImageUrl.trim()}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition disabled:opacity-50"
                                            >
                                                {saving ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Check className="w-4 h-4" />
                                                )}
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                                {category.image.substring(0, 40)}...
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleEditCategory(key)}
                                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition"
                                        >
                                            <Upload className="w-4 h-4" />
                                            Change
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Help Text */}
            <div className="text-center py-8 text-gray-500 text-sm">
                <p>Images are applied immediately. Refresh the public Services page to see changes.</p>
            </div>
        </div>
    );
}
