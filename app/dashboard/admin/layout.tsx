import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.userType !== 'admin' && session.user.userType !== 'superadmin')) {
        redirect("/login/admin");
    }

    return <AdminShell>{children}</AdminShell>;
}
