import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HospitalShell from "./HospitalShell";

export default async function HospitalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.userType !== 'hospital') {
        redirect("/login/hospital");
    }

    return (
        <ThemeProvider>
            <HospitalShell>
                {children}
            </HospitalShell>
        </ThemeProvider>
    );
}
