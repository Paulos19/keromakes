"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Tags,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    Menu,
    X,
    Sparkles,
    ShoppingBag,
    BarChart3,
    PieChart,
    MessageSquare,
    Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
    { name: "Resumo", icon: LayoutDashboard, href: "/admin", color: "#D98FB5" },
    { name: "Produtos", icon: Package, href: "/admin/produtos", color: "#A8E6CF" },
    { name: "Categorias", icon: Tags, href: "/admin/categorias", color: "#FFD3B6" },
    { name: "Clientes", icon: Users, href: "#", color: "#3D85C6" },
];

const secondaryItems = [
    { name: "Vendas", icon: BarChart3, href: "#" },
    { name: "Mensagens", icon: MessageSquare, href: "#" },
    { name: "Configurações", icon: Settings, href: "#" },
];

export default function AdminSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    const SidebarContent = ({ collapsed = false }) => (
        <div className="flex flex-col h-full bg-white md:bg-[#F8F9FA] relative">

            {/* Logo Section */}
            <div className={`h-24 flex items-center ${collapsed ? "justify-center" : "px-8"} mb-4`}>
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-[#1D1D1F] rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-[#D98FB5] transition-all group-hover:rotate-12 duration-500">
                        <Sparkles className="text-white w-5 h-5" />
                    </div>
                    {!collapsed && (
                        <span className="font-black text-xl tracking-tighter text-[#1D1D1F] uppercase italic">Kero<span className="text-[#D98FB5]">Make</span></span>
                    )}
                </Link>
            </div>

            {/* Navigation Groups */}
            <div className="flex-1 px-4 space-y-8 overflow-y-auto overflow-x-hidden scrollbar-hide py-4">

                {/* Main section */}
                <div className="space-y-1.5">
                    {!collapsed && (
                        <p className="px-4 text-[10px] font-black uppercase tracking-[4px] text-[#86868B] mb-4 opacity-50">Principais</p>
                    )}
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${isActive
                                        ? "bg-[#1D1D1F] text-white shadow-xl shadow-black/10 translate-x-1"
                                        : "text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                                {!collapsed && (
                                    <span className="text-[13px] font-bold uppercase tracking-widest">{item.name}</span>
                                )}
                                {isActive && !collapsed && (
                                    <motion.div layoutId="activeInd" className="absolute left-0 w-1 h-5 bg-[#D98FB5] rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Secondary section */}
                <div className="space-y-1.5">
                    {!collapsed && (
                        <p className="px-4 text-[10px] font-black uppercase tracking-[4px] text-[#86868B] mb-4 opacity-50">Ferramentas</p>
                    )}
                    {secondaryItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${isActive
                                        ? "bg-[#1D1D1F] text-white shadow-xl"
                                        : "text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5"
                                    }`}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                {!collapsed && (
                                    <span className="text-[13px] font-bold uppercase tracking-widest">{item.name}</span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 mt-auto">
                {!collapsed && (
                    <div className="bg-[#1D1D1F] rounded-[32px] p-6 mb-6 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#D98FB5] opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <Zap className="text-[#D98FB5] w-6 h-6 mb-3" />
                        <p className="text-white text-[10px] font-black uppercase tracking-widest leading-relaxed">Suporte <br /> Premium Ativo</p>
                    </div>
                )}

                <button className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-4 px-4"} py-4 rounded-2xl text-red-400 hover:bg-red-50 transition-colors group cursor-pointer`}>
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {!collapsed && <span className="text-[12px] font-black uppercase tracking-widest">Sair</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar Wrapper */}
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? 120 : 300 }}
                className="hidden md:flex flex-col h-screen sticky top-0 border-r border-black/[0.03] bg-[#F8F9FA] z-[100] transition-all"
            >
                <SidebarContent collapsed={isCollapsed} />

                {/* Collapse Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-4 top-10 w-8 h-8 bg-[#1D1D1F] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#D98FB5] transition-all z-[110]"
                >
                    <ChevronLeft className={`w-4 h-4 transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""}`} />
                </button>
            </motion.aside>

            {/* Mobile Bottom Navigation (iPhone style) / Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-20 px-6 flex items-center justify-between z-[100] bg-white/80 backdrop-blur-xl border-b border-black/[0.02]">
                <div className="w-10 h-10 bg-[#1D1D1F] rounded-xl flex items-center justify-center">
                    <Sparkles className="text-white w-5 h-5 shadow-sm" />
                </div>
                <h1 className="text-sm font-black uppercase tracking-[4px] text-[#1D1D1F]">Painel Admin</h1>
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="w-10 h-10 rounded-full bg-[#1D1D1F]/5 flex items-center justify-center shadow-sm"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </header>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] md:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[85%] bg-white z-[210] md:hidden shadow-2xl"
                        >
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] z-[220]"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <SidebarContent collapsed={false} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
