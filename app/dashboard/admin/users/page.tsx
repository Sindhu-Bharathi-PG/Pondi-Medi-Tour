"use client";

import { Calendar, Filter, Mail, MoreVertical, Phone, Search, Shield, UserCheck, UserX } from "lucide-react";
import { useState } from "react";

export default function UsersManagementPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState("all");

    // Mock data
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "patient", status: "active", joinedDate: "2024-01-15", phone: "+91 98765 43210" },
        { id: 2, name: "Sarah Smith", email: "sarah@hospital.com", role: "hospital", status: "active", joinedDate: "2024-02-20", phone: "+91 98765 43211" },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "patient", status: "inactive", joinedDate: "2024-03-10", phone: "+91 98765 43212" },
        { id: 4, name: "Admin User", email: "admin@platform.com", role: "admin", status: "active", joinedDate: "2023-12-01", phone: "+91 98765 43213" }
    ];

    const getRoleBadge = (role: string) => {
        const styles = {
            patient: "bg-blue-100 text-blue-700 border-blue-200",
            hospital: "bg-purple-100 text-purple-700 border-purple-200",
            admin: "bg-rose-100 text-rose-700 border-rose-200",
            superadmin: "bg-amber-100 text-amber-700 border-amber-200"
        };
        return styles[role as keyof typeof styles] || styles.patient;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Users Management</h1>
                    <p className="text-slate-600">Manage all platform users and their permissions</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all">
                    Add New User
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none"
                        />
                    </div>

                    {/* Role Filter */}
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition cursor-pointer"
                    >
                        <option value="all">All Roles</option>
                        <option value="patient">Patients</option>
                        <option value="hospital">Hospitals</option>
                        <option value="admin">Admins</option>
                    </select>

                    <button className="px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        More Filters
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Contact</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Joined</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-500/20">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{user.name}</p>
                                                <p className="text-sm text-slate-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getRoleBadge(user.role)}`}>
                                            <Shield className="w-3 h-3" />
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-600 flex items-center gap-1.5">
                                            <Phone className="w-3.5 h-3.5" />
                                            {user.phone}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${user.status === 'active'
                                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-600 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {user.joinedDate}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
                                                <UserCheck className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition">
                                                <UserX className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <p className="text-sm text-slate-600">Showing 1-4 of 4 users</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white transition">
                            Previous
                        </button>
                        <button className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition">
                            1
                        </button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white transition">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
