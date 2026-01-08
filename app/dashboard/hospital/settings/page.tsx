"use client";

import { API_BASE, apiCall, useApi } from "@/app/hooks/useApi";
import { ArrowLeft, Bell, Camera, CheckCircle2, Key, Lock, Save, Shield, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingStates";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('account');
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Form states
    const [accountForm, setAccountForm] = useState({
        name: '',
        phone: '',
        website: '',
        email: ''
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [notifications, setNotifications] = useState({
        newAppointment: true,
        inquiryMessages: true,
        dailySummary: false,
        marketingEmails: false
    });
    const [notificationsSaved, setNotificationsSaved] = useState(false);

    // Fetch hospital profile
    const { data: profile, loading, error, refetch } = useApi<any>({
        url: `${API_BASE}/api/hospitals/me/profile`,
        initialData: null
    });

    // Load profile data into form
    useEffect(() => {
        if (profile) {
            setAccountForm({
                name: profile.name || '',
                phone: profile.phone || '',
                website: profile.website || '',
                email: profile.email || ''
            });
        }
    }, [profile]);

    // Load notification preferences from localStorage (or could be backend)
    useEffect(() => {
        const saved = localStorage.getItem('hospital_notification_prefs');
        if (saved) {
            try {
                setNotifications(JSON.parse(saved));
            } catch { }
        }
    }, []);

    // Save notification preferences
    const handleSaveNotifications = () => {
        localStorage.setItem('hospital_notification_prefs', JSON.stringify(notifications));
        setNotificationsSaved(true);
        setSaveSuccess(true);
        setTimeout(() => {
            setNotificationsSaved(false);
            setSaveSuccess(false);
        }, 3000);
    };

    const handleSaveAccount = async () => {
        setSaving(true);
        try {
            await apiCall('/api/hospitals/me/profile', 'PUT', accountForm);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
            await refetch();
        } catch (err: any) {
            alert(err.message || 'Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        if (passwordForm.newPassword.length < 6) {
            alert('Password must be at least 6 characters!');
            return;
        }
        setSaving(true);
        try {
            await apiCall('/api/auth/change-password', 'POST', {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });
            setSaveSuccess(true);
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err: any) {
            alert(err.message || 'Failed to change password');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading settings..." />;
    }

    // Don't block on error - show page anyway with the tabs

    return (
        <div className="min-h-full bg-gray-50/50">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute -top-1/4 -left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-emerald-400/10 to-teal-400/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-gradient-to-tl from-teal-400/10 to-cyan-400/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard/hospital"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600 mb-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your account preferences and security.</p>
                </div>

                {/* Success Toast */}
                {saveSuccess && (
                    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Changes saved successfully!</span>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Nav */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 space-y-1">
                            {[
                                { id: 'account', label: 'Account Profile', icon: User, color: 'blue' },
                                { id: 'security', label: 'Security & Login', icon: Shield, color: 'purple' },
                                { id: 'notifications', label: 'Notifications', icon: Bell, color: 'amber' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === item.id
                                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            {activeTab === 'account' && (
                                <div className="animate-in fade-in duration-300">
                                    {/* Header */}
                                    <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                                        <h2 className="text-xl font-bold text-gray-900">Account Profile</h2>
                                        <p className="text-sm text-gray-500 mt-1">Update your hospital's public information</p>
                                    </div>

                                    <div className="p-6 md:p-8 space-y-6">
                                        {/* Avatar */}
                                        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                                                    {accountForm.name.charAt(0) || 'H'}
                                                </div>
                                                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                                                    <Camera className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">{accountForm.name || 'Hospital Name'}</h3>
                                                <p className="text-sm text-gray-500">{accountForm.email}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Display Name</label>
                                                <input
                                                    type="text"
                                                    value={accountForm.name}
                                                    onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                                    placeholder="Hospital Name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={accountForm.email}
                                                    disabled
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                                />
                                                <p className="text-xs text-gray-400">Email cannot be changed</p>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    value={accountForm.phone}
                                                    onChange={(e) => setAccountForm({ ...accountForm, phone: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                                    placeholder="+91 XXXXX XXXXX"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Website</label>
                                                <input
                                                    type="url"
                                                    value={accountForm.website}
                                                    onChange={(e) => setAccountForm({ ...accountForm, website: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                                    placeholder="https://example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                                            <button
                                                onClick={handleSaveAccount}
                                                disabled={saving}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Save className="w-4 h-4" />
                                                {saving ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="animate-in fade-in duration-300">
                                    {/* Header */}
                                    <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                                        <h2 className="text-xl font-bold text-gray-900">Security & Login</h2>
                                        <p className="text-sm text-gray-500 mt-1">Manage your password and security settings</p>
                                    </div>

                                    <div className="p-6 md:p-8 space-y-6">
                                        <div className="space-y-4 max-w-md">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Current Password</label>
                                                <div className="relative">
                                                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="password"
                                                        value={passwordForm.currentPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                                                        placeholder="Enter current password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">New Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="password"
                                                        value={passwordForm.newPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                                                        placeholder="Enter new password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Confirm New Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="password"
                                                        value={passwordForm.confirmPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                                                        placeholder="Confirm new password"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                                            <button
                                                onClick={handleChangePassword}
                                                disabled={saving || !passwordForm.currentPassword || !passwordForm.newPassword}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Shield className="w-4 h-4" />
                                                {saving ? 'Updating...' : 'Update Password'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="animate-in fade-in duration-300">
                                    {/* Header */}
                                    <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
                                        <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
                                        <p className="text-sm text-gray-500 mt-1">Choose how you want to be notified</p>
                                    </div>

                                    <div className="p-6 md:p-8 space-y-8">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                                                <Bell className="w-5 h-5 text-amber-500" />
                                                Email Notifications
                                            </h3>
                                            <div className="space-y-4">
                                                {[
                                                    { key: 'newAppointment', label: "New Appointment Request", desc: "Get notified when a patient requests a new appointment." },
                                                    { key: 'inquiryMessages', label: "Inquiry Messages", desc: "Receive email when you get a new message from a patient." },
                                                    { key: 'dailySummary', label: "Daily Summary", desc: "Receive a daily summary of your upcoming schedule." },
                                                    { key: 'marketingEmails', label: "Marketing & Updates", desc: "Receive platform updates and promotional content." }
                                                ].map((item) => (
                                                    <div key={item.key} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{item.label}</p>
                                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={notifications[item.key as keyof typeof notifications]}
                                                                onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Save Button */}
                                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                                            <button
                                                onClick={handleSaveNotifications}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save Preferences
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
