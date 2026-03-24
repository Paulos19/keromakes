"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed left-0 right-0 z-[100] px-4 md:px-12 pointer-events-none transition-all duration-700 
                    ${isScrolled ? "top-4" : "top-8"}`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

                    {/* Island 1: Brand Logo - Minimalist Glass */}
                    <Link
                        href="/"
                        className={`pointer-events-auto h-16 flex items-center rounded-2xl transition-all duration-700 px-6 border active:scale-95 group relative overflow-hidden
                            ${isScrolled
                                ? "bg-white/85 backdrop-blur-3xl border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                                : "bg-white/5 backdrop-blur-sm border-white/10 shadow-none hover:bg-white/10"
                            }`}
                    >
                        {/* Subtle Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                        <Image
                            src="/logos/foreground-1774363745959.png"
                            alt="KeroMake Logo"
                            width={160}
                            height={45}
                            className={`object-contain h-8 md:h-10 w-auto transition-all duration-700 ${!isScrolled ? "brightness-0 invert" : ""}`}
                            priority
                        />
                    </Link>

                    {/* Island 2: Links - Floating minimalist nav */}
                    <nav className={`hidden lg:flex flex-1 max-w-2xl pointer-events-auto h-16 items-center justify-between rounded-2xl transition-all duration-700 px-12 border relative
                        ${isScrolled
                            ? "bg-white/85 backdrop-blur-3xl border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                            : "bg-white/5 backdrop-blur-sm border-white/10 shadow-none text-white hover:bg-white/10"
                        }`}>

                        <Link href="/produtos" className="relative group py-1">
                            <span className="text-[10px] uppercase tracking-[3px] font-black opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">Rotinas</span>
                        </Link>

                        <Link href="/produtos#Skincare" className="relative group py-1">
                            <span className="text-[10px] uppercase tracking-[3px] font-black opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">Skincare</span>
                        </Link>

                        <Link href="/produtos#Maquiagem" className="relative group py-1">
                            <span className="text-[10px] uppercase tracking-[3px] font-black opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">Maquiagem</span>
                        </Link>

                        <Link href="/vendas" className="relative group py-2">
                            <span className={`text-[10px] uppercase tracking-[3px] font-black transition-all ${isScrolled ? "text-[#D98FB5]" : "text-[#D98FB5] brightness-125"}`}>Ofertas Luxo</span>
                            <span className="absolute -top-1 -right-2 w-1 h-1 bg-[#D98FB5] rounded-full animate-ping"></span>
                        </Link>
                    </nav>

                    {/* Island 3: Actions - Icons Focus */}
                    <div className={`pointer-events-auto h-16 flex items-center gap-6 rounded-2xl transition-all duration-700 px-6 border
                        ${isScrolled
                            ? "bg-white/85 backdrop-blur-3xl border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                            : "bg-white/5 backdrop-blur-sm border-white/10 shadow-none text-white hover:bg-white/10"
                        }`}>

                        <button className="hover:scale-110 active:scale-90 transition-transform cursor-pointer opacity-80 hover:opacity-100">
                            <Search strokeWidth={2.5} className="w-[18px] h-[18px]" />
                        </button>

                        <button className="relative hover:scale-110 active:scale-90 transition-transform cursor-pointer opacity-80 hover:opacity-100">
                            <ShoppingBag strokeWidth={2.5} className="w-[18px] h-[18px]" />
                            <span className="absolute -top-1 -right-1 bg-[#D98FB5] w-2.5 h-2.5 rounded-full border-2 border-white/20"></span>
                        </button>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden ml-2 hover:scale-110 active:scale-90 transition-transform cursor-pointer opacity-80"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-12 lg:hidden font-sans"
                    >
                        <Link href="/" onClick={() => setMobileOpen(false)} className="mb-4">
                            <Image src="/logos/foreground-1774363745959.png" alt="Logo" width={180} height={50} className="h-10 w-auto" />
                        </Link>
                        <div className="flex flex-col items-center gap-10">
                            {[
                                { name: "Rotinas", href: "#" },
                                { name: "Skincare", href: "#" },
                                { name: "Maquiagem", href: "#" },
                                { name: "Ofertas Luxo", href: "/vendas", special: true }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * idx }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`text-2xl uppercase tracking-[10px] font-black transition-all ${item.special ? "text-[#D98FB5]" : "text-[#1E1941]/40 hover:text-[#1E1941]"}`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
