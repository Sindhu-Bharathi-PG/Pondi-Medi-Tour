"use client";

import { Bell, Key, Lock, Save, User } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('account');

    return (
        <div className="min-h-full bg-gray-50/50">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gray-200/50 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gray-200/50 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Settings</h1>
                <p className="text-gray-500 mb-8">Manage your account preferences and security.</p>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Nav */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <nav className="space-y-1">
                            {[
                                { id: 'account', label: 'Account Profile', icon: User },
                                { id: 'security', label: 'Security & Login', icon: Lock },
                                { id: 'notifications', label: 'Notifications', icon: Bell },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === item.id
                                            ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-100'
                                            : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                            {activeTab === 'account' && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-50">
                                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400">
                                            HP
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">Hospital Profile Image</h3>
                                            <button className="text-sm text-blue-600 font-medium hover:underline">Change Avatar</button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Display Name</label>
                                            <input
                                                type="text"
                                                defaultValue="Apollo Hospital"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                defaultValue="contact@apollo.com"
                                                disabled
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Phone Number</label>
                                            <input
                                                type="tel"
                                                defaultValue="+91 44 2829 0200"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Website</label>
                                            <input
                                                type="url"
                                                defaultValue="https://apollo.com"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-50 flex justify-end">
                                        <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 transition hover:-translate-y-0.5">
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="pb-6 border-b border-gray-50">
                                        <h3 className="font-bold text-gray-900 text-lg mb-1">Change Password</h3>
                                        <p className="text-sm text-gray-500">Update your password to keep your account secure.</p>
                                    </div>

                                    <div className="space-y-4 max-w-md">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Current Password</label>
                                            <div className="relative">
                                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="password"
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="password"
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Confirm New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="password"
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-50 flex justify-end">
                                        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition hover:-translate-y-0.5">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-8 animate-fadeIn">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg mb-4">Email Notifications</h3>
                                        <div className="space-y-4">
                                            {[
                                                { label: "New Appointment Request", desc: "Get notified when a patient requests a new appointment." },
                                                { label: "Inquiry Messages", desc: "Receive email when you get a new message from a patient." },
                                                { label: "Daily Summary", desc: "Receive a daily summary of your upcoming schedule." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center justify-between py-2">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.label}</p>
                                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                            ))}
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
