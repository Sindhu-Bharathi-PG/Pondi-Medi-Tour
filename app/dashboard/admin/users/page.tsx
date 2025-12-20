"use client";

import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import { ToastContainer, useToast } from "@/app/components/admin/Toast";
import {
    Search,
    Trash2,
    User
} from "lucide-react";
import { useEffect, useState } from "react";

interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive";
    lastLogin: string;
    joinedDate: string;
}

export default function UsersManagementPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const toast = useToast();

    useEffect(() => {
        fetchUsers();
    }, [search, roleFilter, statusFilter]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (roleFilter !== "all") params.append("role", roleFilter);
            if (statusFilter !== "all") params.append("status", statusFilter);

            const response = await fetch(`/api/admin/users?${params}`);
            if (!response.ok) throw new Error("Failed to fetch users");

            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusToggle = async (userId: string) => {
        try {
            const response = await fetch(`/api/admin/users/${userId}/status`, {
                method: "PATCH"
            });
            if (!response.ok) throw new Error("Failed to update status");

            const data = await response.json();
            setUsers(users.map(u =>
                u.id === userId ? { ...u, status: data.isActive ? "active" : "inactive" } : u
            ));
            toast.success(`User ${data.isActive ? "activated" : "deactivated"} successfully`);
        } catch (error) {
            toast.error("Failed to update user status");
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            const response = await fetch(`/api/admin/users/${userId}/role`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole })
            });

            if (!response.ok) throw new Error("Failed to update role");

            const data = await response.json();
            setUsers(users.map(u =>
                u.id === userId ? { ...u, role: data.user.user_type } : u
            ));
            toast.success("User role updated successfully");
        } catch (error) {
            toast.error("Failed to update user role");
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        try {
            const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Failed to delete user");

            setUsers(users.filter(u => u.id !== selectedUser.id));
            toast.success("User deleted successfully");
            setIsDeleteOpen(false);
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Users Management</h1>
                    <p className="text-slate-600">Manage all registered users and their permissions</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Add New User
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                    />
                </div>
                <div className="flex gap-4">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-slate-600 font-medium"
                    >
                        <option value="all">All Roles</option>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="hospital">Hospital</option>
                        <option value="admin">Admin</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-slate-600 font-medium"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading users...</div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No users found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-violet-700 font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{user.name}</div>
                                                    <div className="text-sm text-slate-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className={`px-2 py-1 rounded-lg text-xs font-medium border-0 cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                        user.role === 'hospital' ? 'bg-blue-100 text-blue-700' :
                                                            user.role === 'doctor' ? 'bg-emerald-100 text-emerald-700' :
                                                                'bg-slate-100 text-slate-700'
                                                    }`}
                                            >
                                                <option value="patient">Patient</option>
                                                <option value="doctor">Doctor</option>
                                                <option value="hospital">Hospital</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleStatusToggle(user.id)}
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${user.status === 'active'
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                        : 'bg-slate-50 text-slate-600 border-slate-200'
                                                    }`}
                                            >
                                                {user.status === 'active' ? (
                                                    <>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Active
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                                        Inactive
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(user.joinedDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsDeleteOpen(true);
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                title="Delete User"
                message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
                variant="danger"
                confirmText="Delete User"
            />
        </div>
    );
}
