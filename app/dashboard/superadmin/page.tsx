import { Crown, Database, LogOut, Settings, Shield, Users } from "lucide-react";
import Link from "next/link";

export default async function SuperAdminDashboard() {
    // Temporarily disabled auth check for testing with mock data
    // const session = await auth();
    // if (!session || session.user.userType !== 'superadmin') {
    //     redirect("/login/admin");
    // }

    const mockSession = { user: { name: "Super Admin", email: "superadmin@test.com", userType: "superadmin" } };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                                <Crown className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Super Admin Portal</h1>
                                <p className="text-sm text-gray-600">Welcome, {mockSession.user.name || mockSession.user.email}</p>
                            </div>
                        </div>
                        <Link
                            href="/api/auth/signout"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
                        <div className="flex items-center gap-3 mb-2">
                            <Database className="w-5 h-5 text-purple-600" />
                            <h3 className="text-sm font-medium text-gray-600">Database</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">98%</p>
                        <p className="text-xs text-gray-500 mt-1">Health status</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            <h3 className="text-sm font-medium text-gray-600">All Users</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">5,432</p>
                        <p className="text-xs text-gray-500 mt-1">Total registered</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-5 h-5 text-purple-600" />
                            <h3 className="text-sm font-medium text-gray-600">Security</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-600">Secure</p>
                        <p className="text-xs text-gray-500 mt-1">No threats detected</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
                        <div className="flex items-center gap-3 mb-2">
                            <Settings className="w-5 h-5 text-purple-600" />
                            <h3 className="text-sm font-medium text-gray-600">System</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">99.9%</p>
                        <p className="text-xs text-gray-500 mt-1">Uptime</p>
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="bg-white rounded-xl shadow-sm p-8 border">
                    <div className="flex items-center gap-3 mb-4">
                        <Crown className="w-6 h-6 text-purple-600" />
                        <h2 className="text-xl font-bold text-gray-900">System Administration</h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Full system access and control. Manage users, permissions, database, and platform configuration.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            href="/dashboard/superadmin/users"
                            className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition group"
                        >
                            <Users className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition" />
                            <h3 className="font-semibold text-gray-900 mb-1">User Permissions</h3>
                            <p className="text-sm text-gray-600">Manage user roles and access levels</p>
                        </Link>

                        <Link
                            href="/dashboard/superadmin/database"
                            className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition group"
                        >
                            <Database className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition" />
                            <h3 className="font-semibold text-gray-900 mb-1">Database Access</h3>
                            <p className="text-sm text-gray-600">View and manage database records</p>
                        </Link>

                        <Link
                            href="/dashboard/superadmin/settings"
                            className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition group"
                        >
                            <Settings className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition" />
                            <h3 className="font-semibold text-gray-900 mb-1">System Settings</h3>
                            <p className="text-sm text-gray-600">Configure platform-wide settings</p>
                        </Link>

                        <Link
                            href="/dashboard/superadmin/security"
                            className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition group"
                        >
                            <Shield className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition" />
                            <h3 className="font-semibold text-gray-900 mb-1">Security Control</h3>
                            <p className="text-sm text-gray-600">Monitor and manage security settings</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
