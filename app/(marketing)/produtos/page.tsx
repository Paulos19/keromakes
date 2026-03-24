import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles, Plus } from "lucide-react";

export const revalidate = 0; // Disable cache for real-time data

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: { images: true, colors: true },
        orderBy: { createdAt: "desc" },
    });

    // Grouping by category
    const categories: Record<string, typeof products> = products.reduce((acc: any, product) => {
        const cat = product.category || "Geral";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(product);
        return acc;
    }, {});

    const categoryNames = Object.keys(categories);

    return (
        <main className="min-h-screen bg-[#F2F2F7] selection:bg-[#D98FB5]/20 pb-40">
            {/* 1. Header Hero - Minimalist Luxury */}
            <div className="pt-40 md:pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-xl rounded-full border border-black/[0.03] shadow-sm mb-10 transition-transform hover:scale-105">
                    <Sparkles size={14} className="text-[#D98FB5]" />
                    <span className="text-[10px] uppercase tracking-[4px] font-black text-[#1E1941]">Curadoria KeroMake</span>
                </div>

                <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-black text-[#1E1941] tracking-tighter uppercase mb-10">
                    O Futuro <br />
                    Da Beleza
                </h1>

                <p className="max-w-xl mx-auto text-[#86868B] text-[10px] md:text-xs uppercase tracking-[5px] font-bold leading-relaxed opacity-80">
                    Sincronize sua rotina com produtos que celebram seu brilho único. <br className="hidden md:block" />
                    Sinta o luxo em cada aplicação.
                </p>
            </div>

            {/* 2. Categorized Product List */}
            <div className="px-4 md:px-12 max-w-[1440px] mx-auto flex flex-col gap-48">
                {categoryNames.map((cat, idx) => (
                    <section key={cat} id={cat} className="scroll-mt-32 space-y-16">
                        {/* Section Header */}
                        <div className="flex items-center justify-between group">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-black text-[#D98FB5] uppercase tracking-[8px]">Session {idx + 1}</span>
                                <h2 className="text-4xl md:text-6xl font-black text-[#1E1941] tracking-tighter uppercase group-hover:translate-x-4 transition-transform duration-700">{cat}</h2>
                            </div>
                            <div className="hidden md:flex gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1E1941]/10"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1E1941]/10"></div>
                                <div className="w-12 h-1.5 rounded-full bg-[#D98FB5] animate-pulse"></div>
                            </div>
                        </div>

                        {/* Deconstructed Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[440px]">
                            {categories[cat].map((product, pIdx) => {
                                // Deconstructed Layout Logic: Some cards are long, some square, some colored
                                const isBlack = pIdx % 5 === 0;
                                const isLarge = pIdx % 4 === 0;
                                const isPeach = pIdx % 3 === 0 && !isLarge;

                                return (
                                    <Link
                                        href={`/produtos/${product.id}`}
                                        key={product.id}
                                        className={`group relative overflow-hidden rounded-[48px] p-10 flex flex-col justify-between transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:-translate-y-4
                                            ${isLarge ? "md:col-span-2 bg-white" :
                                                isBlack ? "bg-[#1E1941] text-white" :
                                                    isPeach ? "bg-[#FFEBE9]" : "bg-white"}
                                        `}
                                    >
                                        {/* Top Decoration */}
                                        <div className="flex justify-between items-start z-10">
                                            <div className="flex flex-col gap-2">
                                                <div className={`text-[10px] font-black uppercase tracking-[4px] px-3 py-1 rounded-full w-fit ${isBlack ? "bg-white/10" : "bg-black/5"}`}>
                                                    {product.badge || "Studio"}
                                                </div>
                                                <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight leading-none ${isLarge ? "max-w-[240px]" : "max-w-[140px]"}`}>
                                                    {product.name}
                                                </h3>
                                            </div>
                                            <div className={`w-12 h-12 rounded-full border border-current opacity-20 flex items-center justify-center transition-all group-hover:opacity-100 group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-white shadow-2xl`}>
                                                <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-700" />
                                            </div>
                                        </div>

                                        {/* Central Image - Magnified in Large Cards */}
                                        <div className="absolute inset-x-8 inset-y-24 flex items-center justify-center pointer-events-none">
                                            {product.images?.[0] ? (
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={product.images.find(i => i.isPrimary)?.url || product.images[0].url}
                                                        alt={product.name}
                                                        fill
                                                        className={`object-contain transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] 
                                                            ${isLarge ? "scale-90" : "scale-100"}`}
                                                    />
                                                </div>
                                            ) : (
                                                <ShoppingBag size={80} className="opacity-5" />
                                            )}
                                        </div>

                                        {/* Decorative Minimal Info (Like the reference Spending image) */}
                                        {isLarge && (
                                            <div className="absolute top-[45%] right-10 flex flex-col items-end gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[8px] font-black uppercase tracking-[3px]">Stock Status</span>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className={`h-4 w-1 rounded-full ${i < 3 ? 'bg-[#D98FB5]' : 'bg-[#1E1941]/20'}`}></div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Bottom Actions */}
                                        <div className="flex justify-between items-end z-10 mt-auto">
                                            <div className="flex flex-col gap-2">
                                                <span className={`text-base font-black tabular-nums tracking-tighter ${isBlack ? "text-white" : "text-[#1E1941]"}`}>
                                                    {new Intl.NumberFormat("pt-BR", {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    }).format(product.price)}
                                                </span>
                                                {/* Color Dots */}
                                                <div className="flex gap-2">
                                                    {product.colors?.slice(0, 3).map((c) => (
                                                        <div
                                                            key={c.id}
                                                            className="w-3 h-3 rounded-full ring-2 ring-white/40 shadow-sm"
                                                            style={{ backgroundColor: c.hexCode }}
                                                        ></div>
                                                    ))}
                                                    {product.colors.length > 3 && <Plus size={10} className="opacity-40" />}
                                                </div>
                                            </div>

                                            <div className={`px-6 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[4px] transition-all flex items-center gap-2
                                                ${isBlack ? "bg-white text-[#1E1941]" : "bg-[#1E1941] text-white hover:bg-[#D98FB5]"}`}>
                                                <span>Carrinho</span>
                                                <ShoppingBag size={12} />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>

            {/* Newsletter Minimalist Footer Section */}
            <div className="mt-40 px-6 max-w-lg mx-auto text-center space-y-8">
                <div className="h-px w-20 bg-[#D98FB5] mx-auto opacity-40"></div>
                <h3 className="text-xl font-black text-[#1E1941] uppercase tracking-[10px]">Beleza Sem Limites</h3>
                <p className="text-[#86868B] text-[10px] font-bold uppercase tracking-[4px] leading-relaxed">
                    Siga nas redes e fique <br /> por dentro de todas as novidades.
                </p>
                <div className="flex justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-sm">
                        <span className="text-[10px] font-black">IG</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-sm">
                        <span className="text-[10px] font-black">TK</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
