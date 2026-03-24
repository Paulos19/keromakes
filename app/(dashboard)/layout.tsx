import { Inter } from "next/font/google";
import AdminSidebar from "@/components/AdminSidebar";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen flex bg-[#F8F9FA] text-[#1D1D1F] ${inter.className} antialiased selection:bg-[#D98FB5] selection:text-white`}>

            {/* New Premium Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden pt-20 md:pt-0">
                <div className="flex-1 p-6 md:p-12 lg:p-16 w-full mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
