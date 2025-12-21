"use client";

import { Bell, Globe, Lock, Save, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function SettingsPage() {
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [settings, setSettings] = useState({
        // Profile
        adminName: 'Super Admin',
        adminEmail: 'admin@pondimeditour.com',

        // Notifications
        emailNotifications: true,
        inquiryAlerts: true,
        hospitalApprovalAlerts: true,
        weeklyReports: false,

        // Security
        twoFactorAuth: false,
        sessionTimeout: 30,

        // System
        maintenanceMode: false,
        autoApproveHospitals: false,
    });

    // Fetch settings from backend on mount
    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/settings');
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data) {
                    setSettings(prev => ({ ...prev, ...data.data }));
                }
            } else {
                throw new Error('Failed to fetch settings');
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
            setError('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError(null);

            const response = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (response.ok) {
                alert('Settings saved successfully!');
            } else {
                throw new Error('Failed to save settings');
            }
        } catch (err) {
            console.error('Error saving settings:', err);
            setError('Failed to save settings');
            alert('Failed to save settings. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/25">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    Admin Settings
                </h1>
                <p className="text-slate-600 mt-1">Manage your account and system preferences</p>
            </div>

            {/* Profile Settings */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-violet-600" />
                        <h2 className="text-lg font-bold text-slate-900">Profile Information</h2>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Admin Name</label>
                        <input
                            type="text"
                            value={settings.adminName}
                            onChange={(e) => setSettings({ ...settings, adminName: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={settings.adminEmail}
                            onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-violet-600" />
                        <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email alerts for important events' },
                        { key: 'inquiryAlerts', label: 'Inquiry Alerts', desc: 'Get notified when new inquiries arrive' },
                        { key: 'hospitalApprovalAlerts', label: 'Hospital Approval Alerts', desc: 'Alerts for pending hospital approvals' },
                        { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive weekly analytics reports' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0">
                            <div className="flex-1">
                                <p className="font-medium text-slate-900">{item.label}</p>
                                <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-violet-600' : 'bg-slate-200'
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-violet-600" />
                        <h2 className="text-lg font-bold text-slate-900">Security</h2>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between py-3 border-b border-slate-100">
                        <div className="flex-1">
                            <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                            <p className="text-sm text-slate-500 mt-0.5">Add an extra layer of security to your account</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, twoFactorAuth: !settings.twoFactorAuth })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.twoFactorAuth ? 'bg-violet-600' : 'bg-slate-200'
                                }`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Session Timeout (minutes)</label>
                        <select
                            value={settings.sessionTimeout}
                            onChange={(e) => setSettings({ ...settings, sessionTimeout: Number(e.target.value) })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                        >
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* System Settings */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-violet-600" />
                        <h2 className="text-lg font-bold text-slate-900">System</h2>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    {[
                        { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Enable to show maintenance page to visitors' },
                        { key: 'autoApproveHospitals', label: 'Auto-Approve Hospitals', desc: 'Automatically approve new hospital registrations' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0">
                            <div className="flex-1">
                                <p className="font-medium text-slate-900">{item.label}</p>
                                <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-violet-600' : 'bg-slate-200'
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
                <button className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition">
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
