"use client";

import {
    ArrowLeft,
    Eye,
    FileText,
    Image,
    Layout,
    Save,
    Settings,
    Star,
    Type,
    Upload
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Component types available in the page builder
const COMPONENT_TYPES = [
    { id: 'hero', name: 'Hero Section', icon: Layout, color: 'from-indigo-500 to-purple-600', description: 'Full-width header with title and CTA' },
    { id: 'features', name: 'Features Grid', icon: Star, color: 'from-emerald-500 to-teal-600', description: '3-column feature cards' },
    { id: 'text', name: 'Text Block', icon: Type, color: 'from-amber-500 to-orange-600', description: 'Rich text content' },
    { id: 'image', name: 'Image', icon: Image, color: 'from-rose-500 to-pink-600', description: 'Single or gallery' },
    { id: 'stats', name: 'Statistics', icon: FileText, color: 'from-cyan-500 to-blue-600', description: 'Counter numbers' },
];

export default function PageBuilderPage() {
    const [selectedPage, setSelectedPage] = useState('home');
    const [components, setComponents] = useState([
        {
            id: 'hero-1',
            type: 'hero',
            props: {
                title: 'Welcome to Pondimeditour',
                subtitle: 'Your Medical Tourism Partner',
                ctaText: 'Explore Hospitals',
                ctaLink: '/hospitals'
            }
        }
    ]);
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    const addComponent = (type: string) => {
        const newComponent = {
            id: `${type}-${Date.now()}`,
            type,
            props: getDefaultProps(type)
        };
        setComponents([...components, newComponent]);
        setIsDirty(true);
    };

    const getDefaultProps = (type: string) => {
        switch (type) {
            case 'hero':
                return { title: 'Hero Title', subtitle: 'Subtitle', ctaText: 'Button', ctaLink: '#' };
            case 'features':
                return { title: 'Features', items: [{ title: 'Feature 1', description: 'Description' }] };
            case 'text':
                return { content: 'Your text here...' };
            case 'image':
                return { url: '', alt: 'Image' };
            case 'stats':
                return { items: [{ value: '100+', label: 'Stat' }] };
            default:
                return {};
        }
    };

    const saveChanges = async () => {
        console.log('Saving...', components);
        alert('Changes saved successfully!');
        setIsDirty(false);
    };

    const publishPage = async () => {
        console.log('Publishing...', components);
        alert('Page published successfully!');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/superadmin" className="p-2 hover:bg-slate-100 rounded-lg transition">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Page Builder</h1>
                            <p className="text-sm text-slate-500">Editing: {selectedPage}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {isDirty && (
                            <span className="text-sm text-amber-600 font-medium">Unsaved changes</span>
                        )}
                        <select
                            value={selectedPage}
                            onChange={(e) => setSelectedPage(e.target.value)}
                            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium"
                        >
                            <option value="home">Home Page</option>
                            <option value="about">About Page</option>
                            <option value="services">Services Page</option>
                            <option value="contact">Contact Page</option>
                        </select>
                        <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Preview
                        </button>
                        <button
                            onClick={saveChanges}
                            className="px-4 py-2 bg-violet-100 text-violet-700 hover:bg-violet-200 rounded-lg transition flex items-center gap-2 font-medium"
                        >
                            <Save className="w-4 h-4" />
                            Save Draft
                        </button>
                        <button
                            onClick={publishPage}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-2 font-medium"
                        >
                            <Upload className="w-4 h-4" />
                            Publish
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex h-[calc(100vh-73px)]">
                {/* Component Palette */}
                <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Components</h2>
                    <div className="space-y-3">
                        {COMPONENT_TYPES.map((comp) => (
                            <button
                                key={comp.id}
                                onClick={() => addComponent(comp.id)}
                                className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left group"
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${comp.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                        <comp.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                                            {comp.name}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">{comp.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 overflow-y-auto bg-slate-100 p-8">
                    <div className="max-w-5xl mx-auto">
                        {components.length === 0 ? (
                            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
                                <Layout className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Start Building</h3>
                                <p className="text-slate-500">Drag components from the left panel to build your page</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {components.map((comp, index) => (
                                    <div
                                        key={comp.id}
                                        onClick={() => setSelectedComponent(comp.id)}
                                        className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all ${selectedComponent === comp.id
                                                ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                                                : 'border-slate-200 hover:border-indigo-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold uppercase">
                                                    {comp.type}
                                                </span>
                                                <span className="text-sm text-slate-500">#{index + 1}</span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setComponents(components.filter(c => c.id !== comp.id));
                                                    setIsDirty(true);
                                                }}
                                                className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition"
                                            >
                                                ×
                                            </button>
                                        </div>

                                        {/* Component Preview */}
                                        {comp.type === 'hero' && (
                                            <div className="text-center py-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                                                <h1 className="text-4xl font-bold text-slate-900 mb-2">{comp.props.title}</h1>
                                                <p className="text-xl text-slate-600 mb-6">{comp.props.subtitle}</p>
                                                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium">
                                                    {comp.props.ctaText}
                                                </button>
                                            </div>
                                        )}

                                        {comp.type === 'features' && (
                                            <div>
                                                <h2 className="text-2xl font-bold text-slate-900 mb-4">{comp.props.title}</h2>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {comp.props.items?.map((item: any, i: number) => (
                                                        <div key={i} className="p-4 bg-slate-50 rounded-lg">
                                                            <p className="font-semibold text-slate-900">{item.title}</p>
                                                            <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {comp.type === 'stats' && (
                                            <div className="grid grid-cols-4 gap-4">
                                                {comp.props.items?.map((stat: any, i: number) => (
                                                    <div key={i} className="text-center p-4 bg-slate-50 rounded-lg">
                                                        <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
                                                        <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {comp.type === 'text' && (
                                            <div className="prose max-w-none">
                                                <p className="text-slate-600">{comp.props.content}</p>
                                            </div>
                                        )}

                                        {comp.type === 'image' && (
                                            <div className="bg-slate-100 rounded-lg h-64 flex items-center justify-center">
                                                <Image className="w-16 h-16 text-slate-300" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Properties Panel */}
                <div className="w-80 bg-white border-l border-slate-200 overflow-y-auto p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Settings className="w-5 h-5 text-slate-600" />
                        <h2 className="text-lg font-bold text-slate-900">Properties</h2>
                    </div>

                    {selectedComponent ? (
                        <div className="space-y-4">
                            {components.find(c => c.id === selectedComponent) && (() => {
                                const comp = components.find(c => c.id === selectedComponent)!;
                                return (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Component Type</label>
                                            <p className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-lg capitalize">{comp.type}</p>
                                        </div>

                                        {comp.type === 'hero' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                                    <input
                                                        type="text"
                                                        value={comp.props.title}
                                                        onChange={(e) => {
                                                            const updated = components.map(c =>
                                                                c.id === comp.id ? { ...c, props: { ...c.props, title: e.target.value } } : c
                                                            );
                                                            setComponents(updated);
                                                            setIsDirty(true);
                                                        }}
                                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
                                                    <input
                                                        type="text"
                                                        value={comp.props.subtitle}
                                                        onChange={(e) => {
                                                            const updated = components.map(c =>
                                                                c.id === comp.id ? { ...c, props: { ...c.props, subtitle: e.target.value } } : c
                                                            );
                                                            setComponents(updated);
                                                            setIsDirty(true);
                                                        }}
                                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Button Text</label>
                                                    <input
                                                        type="text"
                                                        value={comp.props.ctaText}
                                                        onChange={(e) => {
                                                            const updated = components.map(c =>
                                                                c.id === comp.id ? { ...c, props: { ...c.props, ctaText: e.target.value } } : c
                                                            );
                                                            setComponents(updated);
                                                            setIsDirty(true);
                                                        }}
                                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Settings className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-sm text-slate-500">Select a component to edit its properties</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
