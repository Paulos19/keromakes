"use client";

import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";
import { motion } from "framer-motion";
import { Activity, Plus, TrendingUp, Star, ChevronRight, Droplets, Sun, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function VendasBentoPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={`min-h-screen bg-[#F2F2F7] text-[#1D1D1F] ${inter.className} py-12 px-4 sm:px-8 lg:px-12 flex items-center justify-center font-sans overflow-hidden antialiased`}>
            {/* Decorative Blob Background Behind Everything */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D98FB5] opacity-[0.15] blur-[120px] rounded-full mix-blend-multiply"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#A8E6CF] opacity-[0.15] blur-[120px] rounded-full mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start justify-center">

                {/* LEFT COLUMN - 45% */}
                <div className="flex flex-col gap-6 w-full lg:w-[45%]">

                    {/* Card 1: Breakdown (Training Breakdown equivalent) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full"
                    >
                        <div className="mb-8">
                            <h2 className="text-sm font-bold tracking-widest text-[#1D1D1F] uppercase mb-1">Skincare Breakdown</h2>
                            <p className="text-sm text-[#86868B] font-medium">Últimos 7 dias</p>
                        </div>

                        {/* Simulated Bar Chart */}
                        <div className="relative h-44 mb-10 w-full flex items-end justify-between gap-2 sm:gap-4 mt-6">
                            {/* Reference Dotted Line */}
                            <div className="absolute bottom-[20%] left-0 w-full border-b-[2px] border-dashed border-[#E5E5EA] z-0">
                                <div className="absolute -left-1 -bottom-[5px] w-2 h-2 rounded-full bg-[#D98FB5] ring-4 ring-white shadow-sm"></div>
                            </div>

                            {[
                                { height: '40%', color: 'bg-[#E5E5EA]', label: '' },
                                { height: '65%', color: 'bg-gradient-to-t from-[#E9ABC9] to-[#F1C6DC]', shadow: 'shadow-[0_8px_16px_rgba(217,143,181,0.4)]', label: '' },
                                { height: '80%', color: 'bg-gradient-to-t from-[#A8E6CF] to-[#C9F2E3]', shadow: 'shadow-[0_8px_16px_rgba(168,230,207,0.4)]', label: 'Sérum Glow' },
                                { height: '65%', color: 'bg-gradient-to-t from-[#E9ABC9] to-[#F1C6DC]', shadow: 'shadow-[0_8px_16px_rgba(217,143,181,0.4)]', label: '' },
                                { height: '55%', color: 'bg-[#E5E5EA]', label: '' },
                            ].map((bar, i) => (
                                <div key={i} className="flex flex-col items-center flex-1 h-full justify-end relative z-10 group cursor-pointer">
                                    {bar.label && (
                                        <div className="absolute -top-10 bg-[#1D1D1F] text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap opacity-100 transition-opacity">
                                            {bar.label}
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#1D1D1F]"></div>
                                        </div>
                                    )}
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: bar.height }}
                                        transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                                        className={`w-full rounded-[1.2rem] transition-transform duration-300 group-hover:scale-[1.03] ${bar.color} ${bar.shadow || ''}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Stats row */}
                        <div className="flex justify-between items-start border-t border-[#F2F2F7] pt-6 relative">
                            <div className="flex flex-col">
                                <span className="text-[11px] text-[#86868B] font-medium mb-1">Hidratação total</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-[#1D1D1F]">48H</span>
                                    <span className="text-xs font-semibold text-[#86868B]">contínuas</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] text-[#86868B] font-medium mb-1">Passos da Rotina</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-[#1D1D1F]">3/5</span>
                                    <span className="text-xs font-semibold text-[#86868B]">completos</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] text-[#86868B] font-medium mb-1">Glow Ideal</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-[#1D1D1F]">92%</span>
                                    <span className="text-xs font-semibold text-[#86868B]">alcançado</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Left: Two small cards stacked */}
                    <div className="flex flex-col gap-4 w-full sm:w-[85%] self-start">
                        {/* Card 2: Top Avaliações (Pace Setters) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User" />
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User" />
                                    </div>
                                    <div>
                                        <h3 className="text-[13px] font-bold text-[#1D1D1F]">Top Avaliações</h3>
                                        <p className="text-[11px] text-[#86868B] font-medium">8.4k reviews</p>
                                    </div>
                                </div>
                                <div className="bg-[#F2F2F7] text-[#1D1D1F] text-[10px] font-bold px-3 py-1.5 rounded-full">Top 1</div>
                            </div>
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[13px] font-bold flex items-center gap-1 text-[#1D1D1F]"><Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" /> 4.98 Média</span>
                                <span className="text-[13px] font-bold text-[#1D1D1F]">Sérum Glow</span>
                            </div>
                        </motion.div>

                        {/* Card 3: Mais Desejados (City Pacers) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User" />
                                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User" />
                                    </div>
                                    <div>
                                        <h3 className="text-[13px] font-bold text-[#1D1D1F]">Mais Desejados</h3>
                                        <p className="text-[11px] text-[#86868B] font-medium">12k favoritos</p>
                                    </div>
                                </div>
                                <div className="bg-[#F2F2F7] text-[#1D1D1F] text-[10px] font-bold px-3 py-1.5 rounded-full">Top 2</div>
                            </div>
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[13px] font-bold flex items-center gap-1 text-[#1D1D1F]"><TrendingUp className="w-3.5 h-3.5 text-[#A8E6CF]" /> Em alta</span>
                                <span className="text-[13px] font-bold text-[#1D1D1F]">Base Natural</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT COLUMN - 55% */}
                <div className="flex flex-col gap-6 w-full lg:w-[55%]">

                    {/* Card 4: Main Lifestyle Image (The Runner) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-full bg-[#E5E5EA] rounded-[2.5rem] relative overflow-hidden shadow-[0_12px_40px_rgb(0,0,0,0.08)] group h-[420px]"
                    >
                        {/* Background Image */}
                        <Image
                            src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=1200&q=90"
                            alt="Model applying skincare"
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            priority
                        />
                        {/* Soft Overlay for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                        {/* Floating Top Nav / Stats Pille */}
                        <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-3 pointer-events-none">
                            <div className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
                                <Activity className="w-4 h-4 text-[#D98FB5]" />
                                <span className="text-sm font-bold text-[#1D1D1F]">+24%</span>
                                <span className="text-[11px] font-medium text-[#86868B]">Firmeza</span>
                            </div>
                            <div className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
                                <Sparkles className="w-4 h-4 text-[#A8E6CF]" />
                                <span className="text-sm font-bold text-[#1D1D1F]">Glow</span>
                                <span className="text-[11px] font-medium text-[#86868B]">Natural</span>
                            </div>
                        </div>

                        {/* Bottom details (optional, to mimic action button) */}
                        <div className="absolute bottom-6 right-6">
                            <button className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer">
                                <ChevronRight className="w-6 h-6 text-[#1D1D1F]" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Card 5: Streak & Competition (Routine Builder Goal) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full bg-white rounded-[2.5rem] p-8 pb-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-sm font-bold tracking-widest text-[#1D1D1F] uppercase mb-1">Rotina Perfeita</h2>
                                <p className="text-sm text-[#86868B] font-medium">Meta do Kit Completo</p>
                            </div>
                            <button className="flex items-center gap-1.5 bg-[#F2F2F7] hover:bg-[#E5E5EA] transition-colors pl-3 pr-4 py-2 rounded-full text-xs font-bold text-[#1D1D1F]">
                                Completar Kit <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Custom SVG Track (Like Apple Fitness Rings but pill shaped) */}
                        <div className="w-full relative h-24 sm:h-28 flex items-center justify-center mt-4">
                            <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none" className="overflow-visible">
                                {/* Background Track Outer */}
                                <rect x="10" y="10" width="380" height="80" rx="40" fill="none" stroke="#F2F2F7" strokeWidth="20" />
                                {/* Background Track Inner */}
                                <rect x="35" y="35" width="330" height="30" rx="15" fill="none" stroke="#F2F2F7" strokeWidth="16" />

                                {/* Active Track Outer (Green - Steps completed) */}
                                <motion.rect
                                    x="10" y="10" width="380" height="80" rx="40" fill="none"
                                    stroke="url(#greenGradient)" strokeWidth="20" strokeLinecap="round"
                                    strokeDasharray="1000"
                                    initial={{ strokeDashoffset: 1000 }}
                                    animate={{ strokeDashoffset: 350 }}
                                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                                    className="drop-shadow-[0_0_8px_rgba(168,230,207,0.6)]"
                                />

                                {/* Active Track Inner (Pink - Hydration target) */}
                                <motion.rect
                                    x="35" y="35" width="330" height="30" rx="15" fill="none"
                                    stroke="url(#pinkGradient)" strokeWidth="16" strokeLinecap="round"
                                    strokeDasharray="800"
                                    initial={{ strokeDashoffset: 800 }}
                                    animate={{ strokeDashoffset: 400 }}
                                    transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
                                    className="drop-shadow-[0_0_8px_rgba(217,143,181,0.6)]"
                                />

                                {/* Gradients */}
                                <defs>
                                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#A8E6CF" />
                                        <stop offset="100%" stopColor="#89D9BE" />
                                    </linearGradient>
                                    <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#F1C6DC" />
                                        <stop offset="100%" stopColor="#D98FB5" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Central text overlay */}
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Desconto</span>
                                <span className="text-xl font-bold text-[#1D1D1F] leading-none mt-1">15% OFF</span>
                            </div>
                        </div>

                    </motion.div>

                </div>
            </div>
        </div>
    );
}
