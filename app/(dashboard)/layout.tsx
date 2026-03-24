import Link from "next/link";
import { Inter } from "next/font/google";
import { LayoutDashboard, Users, Package, Tags, Settings, LogOut } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen flex bg-[#F8F9FA] text-[#1D1D1F] ${inter.className} antialiased`}>
            {/* Sidebar - Desktop */}
            <aside className="w-64 flex-shrink-0 bg-white border-r border-[#1D1D1F]/[0.05] hidden md:flex flex-col h-screen sticky top-0">

                {/* Brand */}
                <div className="h-16 flex items-center px-6 border-b border-[#1D1D1F]/[0.05]">
                    <Link href="/" className="font-bold text-lg tracking-tight hover:text-[#D98FB5] transition-colors">KeroMake.</Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 hover:bg-[#F2F2F7] text-[#1D1D1F] rounded-lg text-sm font-medium transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> Resumo
                    </Link>
                    <Link href="/admin/produtos" className="flex items-center gap-3 px-3 py-2 text-[#86868B] hover:bg-[#F2F2F7]/50 hover:text-[#1D1D1F] rounded-lg text-sm font-medium transition-colors">
                        <Package className="w-4 h-4" /> Produtos
                    </Link>
                    <Link href="/admin/categorias" className="flex items-center gap-3 px-3 py-2 text-[#86868B] hover:bg-[#F2F2F7]/50 hover:text-[#1D1D1F] rounded-lg text-sm font-medium transition-colors">
                        <Tags className="w-4 h-4" /> Categorias
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#86868B] hover:bg-[#F2F2F7]/50 hover:text-[#1D1D1F] rounded-lg text-sm font-medium transition-colors">
                        <Users className="w-4 h-4" /> Clientes
                    </Link>
                </nav>

                {/* Footer actions */}
                <div className="p-4 border-t border-[#1D1D1F]/[0.05] flex flex-col gap-2">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-[#86868B] hover:bg-[#F2F2F7]/50 hover:text-[#1D1D1F] rounded-lg text-sm font-medium transition-colors">
                        <Settings className="w-4 h-4" /> Configurações
                    </a>
                    <button className="flex items-center w-full gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                        <LogOut className="w-4 h-4" /> Sair
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
                {/* Mobile Header (Hidden on Desktop) */}
                <header className="h-16 md:hidden bg-white border-b border-[#1D1D1F]/[0.05] flex items-center justify-between px-4 sticky top-0 z-50">
                    <span className="font-bold text-lg tracking-tight">KeroMake.</span>
                    <button className="p-2 border border-[#1D1D1F]/10 rounded-md">Menu</button>
                </header>

                {/* Content Wrapper */}
                <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
