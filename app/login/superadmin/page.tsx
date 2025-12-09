"use client";

import { ArrowLeft, Database, Eye, EyeOff, Key, Lock, Mail, Shield, UserCog } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const SuperAdminLoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'credentials' | '2fa'>('credentials');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (step === 'credentials') {
            setTimeout(() => {
                setIsLoading(false);
                setStep('2fa');
            }, 1500);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-violet-900 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative w-full max-w-md">
                {/* Back Button */}
                <Link
                    href="/"
                    className="absolute -top-12 left-0 flex items-center gap-2 text-white/70 hover:text-white transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                </Link>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserCog className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Super Admin</h1>
                        <p className="text-purple-100 text-sm mt-1">Full system control & configuration</p>
                    </div>

                    {/* Features */}
                    <div className="bg-purple-50 px-6 py-4 border-b">
                        <p className="text-xs text-purple-700 font-medium mb-2">Super Admin access:</p>
                        <div className="flex flex-wrap gap-3">
                            <span className="flex items-center gap-1 text-xs text-purple-600 bg-white px-2 py-1 rounded-full">
                                <Database className="w-3 h-3" /> System Config
                            </span>
                            <span className="flex items-center gap-1 text-xs text-purple-600 bg-white px-2 py-1 rounded-full">
                                <Shield className="w-3 h-3" /> User Management
                            </span>
                            <span className="flex items-center gap-1 text-xs text-purple-600 bg-white px-2 py-1 rounded-full">
                                <Key className="w-3 h-3" /> Access Control
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {step === 'credentials' ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Super Admin Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="superadmin@pondimeditour.com"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Master Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter master password"
                                            className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <div className="text-center mb-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Shield className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800">Two-Factor Authentication</h3>
                                    <p className="text-sm text-gray-500">Enter the 6-digit code from your authenticator</p>
                                </div>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={twoFactorCode}
                                        onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="000000"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-center text-2xl tracking-[0.5em] font-mono"
                                        maxLength={6}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    {step === 'credentials' ? 'Verifying...' : 'Authenticating...'}
                                </span>
                            ) : (
                                step === 'credentials' ? 'Continue to 2FA' : 'Access Super Admin'
                            )}
                        </button>

                        {step === '2fa' && (
                            <button
                                type="button"
                                onClick={() => setStep('credentials')}
                                className="w-full text-purple-600 hover:text-purple-700 text-sm font-medium"
                            >
                                ← Back to credentials
                            </button>
                        )}
                    </form>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
                        <span className="flex items-center justify-center gap-2">
                            <Shield className="w-4 h-4" />
                            Secured with 2FA authentication
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminLoginPage;
