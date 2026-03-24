import HeroScroll from "../../components/HeroScroll";
import { ArrowRight, ChevronLeft, ChevronRight, Star, ShoppingBag, Eye } from "lucide-react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0; // Disable cache to get real data on every load

export default async function Home() {
    // 1. Fetch real data from Prisma
    const products = await prisma.product.findMany({
        include: { colors: true, images: true },
        orderBy: { createdAt: "desc" },
    });

    // Sub-sets of products for different sections
    const bestsellers = products.length >= 4 ? products.slice(0, 4) : products;
    const featured = products.length >= 7 ? products.slice(4, 7) :
        (products.length > 0 ? products.slice(0, 3) : []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    return (
        <main className="min-h-screen bg-white font-sans selection:bg-[#D98FB5]/20">
            {/* 1. Hero Scroll Dive (Kept as requested) */}
            <HeroScroll />

            {/* 2. DISCOVER Section (Post-Hero) */}
            <section className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16">
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[1] md:leading-[0.95] font-black text-[#1D1D1F] tracking-tighter uppercase mb-6">
                            DESCUBRA <br />
                            TUDO O QUE <br />
                            VOCÊ PRECISA
                        </h2>
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-[#86868B]">
                            <div className="w-8 md:w-12 h-px bg-[#86868B]/30"></div>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Em um só lugar</span>
                        </div>
                    </div>

                    <div className="relative flex flex-col items-center lg:items-end">
                        <div className="relative w-40 h-40 md:w-56 md:h-56">
                            {/* Decorative circle */}
                            <div className="absolute inset-0 rounded-full border border-[#D98FB5]/20 animate-pulse"></div>
                            <div className="absolute inset-2 rounded-full border border-[#D98FB5]/10 animate-ping [animation-duration:3s]"></div>

                            <div className="absolute inset-4 rounded-full overflow-hidden bg-[#D98FB5] p-1.5 shadow-2xl">
                                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/30 relative">
                                    <Image
                                        src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80"
                                        alt="Beleza"
                                        fill
                                        className="object-cover scale-110"
                                    />
                                </div>
                            </div>

                            {/* Floating Discount Tag */}
                            <div className="absolute -top-2 -right-2 bg-[#1D1D1F] text-white w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white rotate-12">
                                <span className="text-xl font-black">30%</span>
                                <span className="text-[8px] font-bold uppercase tracking-tighter italic">OFF SALE</span>
                            </div>
                        </div>
                        <div className="mt-8 text-center lg:text-right max-w-[200px]">
                            <p className="text-[10px] text-[#86868B] uppercase tracking-[4px] font-black mb-2">Novos Lançamentos</p>
                            <p className="text-xs text-[#1D1D1F] font-medium leading-relaxed italic opacity-80">As últimas tendências da estação selecionadas para você.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Featured Triple Grid - Real Data */}
            <section className="pb-32 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.length > 0 ? (
                        featured.map((product, idx) => (
                            <Link
                                href={`/produtos/${product.id}`}
                                key={product.id}
                                className={`group relative aspect-[3/4.2] ${idx % 3 === 0 ? 'bg-[#F5F5F7]' : idx % 3 === 1 ? 'bg-[#FFEBE9]' : 'bg-[#E8F1FF]'} rounded-[48px] overflow-hidden p-10 flex flex-col justify-end transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
                            >
                                <span className="absolute top-10 left-10 bg-[#1D1D1F] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[2px] z-10">
                                    {product.badge || "Destaque"}
                                </span>
                                <div className="absolute inset-0 flex items-center justify-center p-16">
                                    {product.images[0] ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={product.images.find(img => img.isPrimary)?.url || product.images[0].url}
                                                alt={product.name}
                                                fill
                                                className="object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                    ) : (
                                        <ShoppingBag className="w-12 h-12 text-[#1D1D1F]/10" />
                                    )}
                                </div>
                                <div className="relative z-10 flex items-center justify-between border-t border-[#1D1D1F]/5 pt-6 group-hover:border-[#1D1D1F]/10 transition-colors">
                                    <h3 className="text-sm font-black text-[#1D1D1F] uppercase tracking-[3px] truncate pr-4">{product.name}</h3>
                                    <div className="w-10 h-10 rounded-full border border-[#1D1D1F]/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:bg-[#1D1D1F] group-hover:border-[#1D1D1F] transition-all duration-500 flex-shrink-0">
                                        <ArrowRight className="w-4 h-4 text-[#1D1D1F] group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        // Placeholder cards if no products
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="aspect-[3/4.2] bg-[#F5F5F7] rounded-[48px] flex items-center justify-center opacity-50">
                                <span className="text-[10px] uppercase tracking-widest font-black">Em breve</span>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* 4. BESTSELLERS Section - Real Data */}
            <section className="bg-white py-16 md:py-32 border-t border-[#F2F2F7]">
                <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 md:mb-20 gap-6">
                        <h2 className="text-[48px] md:text-[80px] font-black text-[#1D1D1F] tracking-tighter uppercase leading-none text-center md:text-left">Bestsellers</h2>
                        <div className="flex gap-4">
                            <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#F2F2F7] flex items-center justify-center hover:bg-[#1D1D1F] group transition-all duration-300">
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#1D1D1F] group-hover:text-white transition-colors" />
                            </button>
                            <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#F2F2F7] flex items-center justify-center hover:bg-[#1D1D1F] group transition-all duration-300">
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#1D1D1F] group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bestsellers.length > 0 ? (
                            bestsellers.map((product, idx) => (
                                <Link href={`/produtos/${product.id}`} key={product.id} className="group cursor-pointer block">
                                    <div className="relative aspect-[4/5.5] bg-[#F5F5F7] rounded-[48px] overflow-hidden mb-8 transition-transform duration-500 group-hover:shadow-2xl flex items-center justify-center p-12">
                                        <span className="absolute top-10 left-10 text-[9px] font-black text-[#86868B]/60 uppercase tracking-[4px]">
                                            {product.badge || "Edição Limitada"}
                                        </span>
                                        <div className="relative w-full h-full">
                                            {product.images[0] ? (
                                                <Image
                                                    src={product.images.find(img => img.isPrimary)?.url || product.images[0].url}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain scale-90 group-hover:scale-105 transition-all duration-700 grayscale-[0.5] group-hover:grayscale-0"
                                                />
                                            ) : (
                                                <ShoppingBag className="w-12 h-12 text-[#1D1D1F]/5" />
                                            )}
                                        </div>
                                        {/* Color Swatches - Real Database Colors */}
                                        {product.colors.length > 0 && (
                                            <div className="absolute bottom-10 right-10 flex gap-2">
                                                {product.colors.slice(0, 3).map((color, cIdx) => (
                                                    <div
                                                        key={color.id}
                                                        className="w-4 h-4 rounded-full border-2 border-white shadow-lg shadow-black/5 scale-0 group-hover:scale-100 transition-transform duration-300"
                                                        style={{ backgroundColor: color.hexCode, transitionDelay: `${cIdx * 0.1}s` }}
                                                    ></div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-end px-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-black text-[#1D1D1F] uppercase tracking-[2px] truncate group-hover:text-[#D98FB5] transition-colors">{product.name}</h3>
                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-[#FFB800] text-[#FFB800]" : "text-[#E8E8ED]"}`} />
                                                    ))}
                                                </div>
                                                <span className="text-[10px] text-[#C1C1C7] font-black tracking-widest uppercase">4.9 Reviews</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-black text-[#1D1D1F] pl-4">{formatPrice(product.price)}</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="aspect-[4/5.5] bg-[#F5F5F7] rounded-[48px] flex items-center justify-center animate-pulse">
                                    <span className="text-[9px] font-black text-[#C1C1C7] uppercase tracking-[4px]">Indisponível</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* 5. Icons Section - Features */}
            <section className="bg-[#1D1D1F] py-20 md:py-32 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 relative z-10 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-8 relative group cursor-help">
                            <div className="absolute inset-0 rounded-full bg-[#D98FB5] opacity-0 group-hover:opacity-20 transition-opacity scale-0 group-hover:scale-150 duration-700"></div>
                            <ShoppingBag className="w-7 h-7 text-[#D98FB5]" />
                        </div>
                        <h4 className="text-white text-xs font-black uppercase tracking-[5px] mb-4">Envio Express</h4>
                        <p className="text-white/40 text-[10px] uppercase leading-relaxed tracking-[2px] max-w-[200px]">Entrega segura em todo Brasil com rastreio real-time.</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-8 relative group cursor-help">
                            <div className="absolute inset-0 rounded-full bg-[#D98FB5] opacity-0 group-hover:opacity-20 transition-opacity scale-0 group-hover:scale-150 duration-700"></div>
                            <Eye className="w-7 h-7 text-[#D98FB5]" />
                        </div>
                        <h4 className="text-white text-xs font-black uppercase tracking-[5px] mb-4">Fórmula Pura</h4>
                        <p className="text-white/40 text-[10px] uppercase leading-relaxed tracking-[2px] max-w-[200px]">Cruelty free e livre de parabenos. Beleza limpa.</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-8 relative group cursor-help">
                            <div className="absolute inset-0 rounded-full bg-[#D98FB5] opacity-0 group-hover:opacity-20 transition-opacity scale-0 group-hover:scale-150 duration-700"></div>
                            <Star className="w-7 h-7 text-[#D98FB5]" />
                        </div>
                        <h4 className="text-white text-xs font-black uppercase tracking-[5px] mb-4">Atendimento VIP</h4>
                        <p className="text-white/40 text-[10px] uppercase leading-relaxed tracking-[2px] max-w-[200px]">Suporte especializado via Chat ou WhatsApp 24/7.</p>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-white py-24 md:py-40">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-4 text-[#D98FB5] mb-6 md:mb-8">
                        <div className="h-px w-6 md:w-8 bg-[#D98FB5]"></div>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[4px] md:tracking-[6px]">Newsletter</span>
                        <div className="h-px w-6 md:w-8 bg-[#D98FB5]"></div>
                    </div>
                    <h2 className="text-[36px] md:text-[64px] font-black text-[#1D1D1F] uppercase tracking-tighter mb-6 md:mb-8 leading-none">Mantenha o Brilho</h2>
                    <p className="text-[#86868B] text-xs md:text-sm uppercase tracking-[1px] md:tracking-[2px] mb-12 md:mb-16 max-w-lg mx-auto leading-relaxed">Assine para receber convites exclusivos, lançamentos e 10% off na primeira compra.</p>

                    <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative">
                        <input
                            className="flex-1 bg-[#F5F5F7] border border-transparent px-8 py-5 rounded-[24px] text-xs font-bold uppercase tracking-wider outline-none focus:bg-white focus:border-[#D98FB5] transition-all"
                            placeholder="Seu melhor e-mail"
                        />
                        <button className="bg-[#1D1D1F] text-white px-12 py-5 rounded-[24px] text-xs font-black uppercase tracking-[4px] hover:bg-[#D98FB5] transition-all duration-500 shadow-xl">Assinar</button>
                    </form>
                </div>
            </section>

            {/* Footer Mini */}
            <footer className="bg-[#F5F5F7] py-20">
                <div className="max-w-[1440px] mx-auto px-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
                        <Link href="/" className="text-[14px] font-black text-[#1D1D1F] uppercase tracking-[8px] hover:text-[#D98FB5] transition-colors">KeroMake.</Link>
                        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                            <Link href="#" className="text-[10px] font-black text-[#1D1D1F] uppercase tracking-[3px] hover:text-[#D98FB5] transition-colors">Produtos</Link>
                            <Link href="#" className="text-[10px] font-black text-[#1D1D1F] uppercase tracking-[3px] hover:text-[#D98FB5] transition-colors">Rotinas</Link>
                            <Link href="#" className="text-[10px] font-black text-[#1D1D1F] uppercase tracking-[3px] hover:text-[#D98FB5] transition-colors">Contatos</Link>
                            <Link href="#" className="text-[10px] font-black text-[#1D1D1F] uppercase tracking-[3px] hover:text-[#D98FB5] transition-colors">FAQ</Link>
                        </nav>
                        <div className="flex gap-6">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#E8E8ED] hover:scale-110 transition-transform cursor-pointer">
                                <span className="text-[10px] font-black">IG</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#E8E8ED] hover:scale-110 transition-transform cursor-pointer">
                                <span className="text-[10px] font-black">TK</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
