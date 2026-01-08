"use client";

import { Globe, Moon, Palette, Save, Shield, Sun } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [settings, setSettings] = useState({
        siteName: 'Pondy HealthPort',
        siteTagline: 'Your Medical Tourism Partner',
        maintenanceMode: false,
        registrationEnabled: true,
        autoApproveHospitals: false,
        defaultTheme: 'light',
        primaryColor: '#6366f1'
    });

    const handleSave = () => {
        setSaving(true);
        // Simulate save
        setTimeout(() => {
            localStorage.setItem('platform_settings', JSON.stringify(settings));
            setSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Configure global platform options</p>
            </div>

            {saved && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Settings saved successfully!
                </div>
            )}

            {/* General Settings */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-indigo-600" />
                        <h2 className="font-bold text-slate-900">General</h2>
                    </div>
                </div>
                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Site Name</label>
                        <input
                            type="text"
                            value={settings.siteName}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
                        <input
                            type="text"
                            value={settings.siteTagline}
                            onChange={(e) => setSettings({ ...settings, siteTagline: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Appearance */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-2">
                        <Palette className="w-5 h-5 text-pink-600" />
                        <h2 className="font-bold text-slate-900">Appearance</h2>
                    </div>
                </div>
                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Default Theme</label>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSettings({ ...settings, defaultTheme: 'light' })}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition ${settings.defaultTheme === 'light' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                <Sun className="w-4 h-4" />
                                Light
                            </button>
                            <button
                                onClick={() => setSettings({ ...settings, defaultTheme: 'dark' })}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition ${settings.defaultTheme === 'dark' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                <Moon className="w-4 h-4" />
                                Dark
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Primary Color</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={settings.primaryColor}
                                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                                className="w-12 h-12 rounded-lg border border-slate-200 cursor-pointer"
                            />
                            <span className="text-sm text-slate-500 font-mono">{settings.primaryColor}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Toggles */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        <h2 className="font-bold text-slate-900">Features</h2>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    {[
                        { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Show maintenance page to visitors' },
                        { key: 'registrationEnabled', label: 'User Registration', desc: 'Allow new users to register' },
                        { key: 'autoApproveHospitals', label: 'Auto-Approve Hospitals', desc: 'Automatically approve new hospitals' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium text-slate-900">{item.label}</p>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={settings[item.key as keyof typeof settings] as boolean}
                                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}
