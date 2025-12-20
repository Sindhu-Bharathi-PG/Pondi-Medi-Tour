"use client";

import { ArrowLeft, Building2, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const HospitalLoginPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Diagnostic State
    const [backendStatus, setBackendStatus] = useState<string>('Checking connection...');

    useEffect(() => {
        // Simple health check to backend
        fetch('http://localhost:3001/health')
            .then(res => res.json())
            .then(data => setBackendStatus(`✅ Connected: ${data.status}`))
            .catch(err => setBackendStatus(`❌ Connection Failed: ${err.message}`));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            console.log("Attempting login with:", email);

            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            console.log("SignIn Result:", result);

            if (result?.error) {
                setError("Login failed. Please check your email and password.");
                setIsLoading(false);
                return;
            }

            if (result?.ok) {
                // Successful login
                router.push('/dashboard/hospital');
            } else {
                setError("Unexpected response from server.");
                setIsLoading(false);
            }

        } catch (error) {
            console.error('Login error:', error);
            setError("An unexpected system error occurred.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="bg-emerald-600 p-8 text-center">
                    <div className="mx-auto bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                        <Building2 className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Hospital Login</h1>
                    <p className="text-emerald-100 text-sm">Secure Portal Access</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                placeholder="name@hospital.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Authenticating...
                            </span>
                        ) : 'Sign In'}
                    </button>

                    <div className="flex items-center justify-between text-sm pt-2">
                        <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                            <ArrowLeft className="w-3 h-3" /> Back home
                        </Link>
                        <Link href="/forgot-password" className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Forgot password?
                        </Link>
                    </div>
                </form>

                {/* Connection Diagnostic */}
                <div className="bg-gray-50 p-3 text-xs text-center border-t border-gray-100 text-gray-400 font-mono">
                    Backend Status: <span className={backendStatus.includes('Connected') ? "text-green-600" : "text-red-500"}>{backendStatus}</span>
                </div>
            </div>
        </div>
    );
};

export default HospitalLoginPage;
