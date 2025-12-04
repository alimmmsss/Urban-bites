import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

const ADMIN_EMAIL = "fariarahman416@gmail.com";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();

    // Check if user is logged in and has the admin email
    const userEmails = user?.emailAddresses?.map(e => e.emailAddress) || [];
    const isAdmin = userEmails.includes(ADMIN_EMAIL);

    // Security check: redirect if not logged in or not the admin email
    if (!user || !isAdmin) {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-stone-100">
            <AdminSidebar />
            {/* Main Content */}
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
