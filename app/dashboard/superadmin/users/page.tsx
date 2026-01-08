"use client";

import { API_BASE } from "@/app/hooks/useApi";
import { Check, Search, Shield, User, UserCog, X } from "lucide-react";
import { useEffect, useState } from "react";

interface UserData {
    id: string;
    email: string;
    name: string;
    userType: string;
    isActive: boolean;
    createdAt: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const res = await fetch(`${API_BASE}/api/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users || []);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.name?.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.userType === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getRoleBadge = (role: string) => {
        const styles: Record<string, string> = {
            superadmin: 'bg-purple-100 text-purple-700 border-purple-200',
            admin: 'bg-indigo-100 text-indigo-700 border-indigo-200',
            hospital: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            doctor: 'bg-blue-100 text-blue-700 border-blue-200',
            patient: 'bg-slate-100 text-slate-700 border-slate-200',
        };
        return styles[role] || styles.patient;
    };

    const getRoleIcon = (role: string) => {
        if (role === 'superadmin') return <Shield className="w-3 h-3" />;
        if (role === 'admin') return <UserCog className="w-3 h-3" />;
        return <User className="w-3 h-3" />;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage all platform users</p>
                </div>
                <div className="text-sm text-slate-500">
                    {filteredUsers.length} users
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                </div>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                    <option value="all">All Roles</option>
                    <option value="superadmin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="hospital">Hospital</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
                        <p className="text-slate-500 mt-4">Loading users...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-12 text-center">
                        <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No users found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                                    {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{user.name || 'No name'}</p>
                                                    <p className="text-sm text-slate-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.userType)}`}>
                                                {getRoleIcon(user.userType)}
                                                {user.userType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.isActive ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                                    <Check className="w-3 h-3" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                    <X className="w-3 h-3" />
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
