import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClassicDashboard from "./components/ClassicDashboard";

export default async function HospitalDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.userType !== 'hospital') {
        redirect("/login/hospital");
    }

    return <ClassicDashboard />;
}
