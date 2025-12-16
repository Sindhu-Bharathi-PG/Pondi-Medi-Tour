import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EnhancedDashboard from "./components/EnhancedDashboard";

export default async function HospitalDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.userType !== 'hospital') {
        redirect("/login/hospital");
    }

    return <EnhancedDashboard userName={session.user.name || session.user.email} />;
}
