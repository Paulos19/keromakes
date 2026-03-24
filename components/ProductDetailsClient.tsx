"use client";

import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, MessageCircle, MapPin, Palette, MoreHorizontal, Star, ThumbsUp, ShoppingBag } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

interface ProductDetailsClientProps {
    product: any;
    relatedProducts: any[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.id || null);

    const { scrollYProgress } = useScroll();
    const yImage = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    if (!mounted) return null;

    const currentColorObject = product.colors?.find((c: any) => c.id === selectedColor);
    const colorImage = currentColorObject?.imageUrl;
    const defaultImage = product.images?.find((img: any) => img.isPrimary)?.url || product.images?.[0]?.url || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=90";

    // Prioriza a imagem da cor, depois a imagem principal do produto
    const currentImage = colorImage || defaultImage;

    return (
        <div ref={containerRef} className={`bg-[#F8F9FA] text-[#1D1D1F] ${inter.className} pt-32 md:pt-48 pb-12 md:pb-24 px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-start overflow-x-hidden antialiased relative`}>

            {/* Decorative center background block */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[60%] h-[600px] bg-white opacity-40 rounded-[4rem] blur-[3xl] pointer-events-none z-0"></div>

            {/* --- HERO SECTION : 3 COLUMNS --- */}
            <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-10 xl:gap-14 items-start justify-center mt-0">

                {/* LEFT COLUMN - Settings & Info */}
                <div className="flex flex-col gap-6 w-full lg:w-[320px] flex-shrink-0 pt-4">

                    <div className="mb-2 text-center lg:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[32px] md:text-[40px] leading-tight font-black text-[#1D1D1F] tracking-tighter uppercase"
                        >
                            {product.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xs md:text-[14px] text-[#86868B] mt-2 font-bold uppercase tracking-widest leading-relaxed"
                        >
                            {product.description || "Descrição Premium KeroMake."}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col gap-4 mt-2"
                    >
                        {/* Cores Card */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-[#1D1D1F]/[0.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[13px] font-semibold text-[#1E1941] uppercase tracking-wider">Cores Disponíveis</span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.colors.map((color: any) => (
                                        <div
                                            key={color.id}
                                            onClick={() => setSelectedColor(color.id)}
                                            className={`w-[34px] h-[34px] rounded-[10px] cursor-pointer transition-all hover:scale-110 flex items-center justify-center border border-black/5 shadow-sm ${selectedColor === color.id ? 'ring-[3px] ring-offset-2 ring-[#D98FB5] scale-105' : ''}`}
                                            style={{ backgroundColor: color.hexCode }}
                                            title={color.name}
                                        >
                                            {selectedColor === color.id && (
                                                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Preço Card */}
                        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-[#1D1D1F]/[0.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[13px] font-semibold text-[#1E1941] uppercase tracking-wider">Investimento</span>
                            </div>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-3xl font-bold text-[#1D1D1F]">{formatPrice(product.price)}</span>
                                {product.oldPrice && (
                                    <span className="text-[12px] font-semibold text-[#86868B] mb-1.5 line-through decoration-[#86868B]/50">{formatPrice(product.oldPrice)}</span>
                                )}
                            </div>
                        </div>

                        {/* Localidade Card */}
                        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-[#1D1D1F]/[0.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow overflow-hidden relative">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[13px] font-semibold text-[#1E1941] uppercase tracking-wider">Localização & Frete</span>
                            </div>
                            <div className="flex items-center justify-between bg-[#F8F9FA] rounded-2xl p-1 pb-1">
                                <div className="bg-white shadow-sm px-4 py-3 rounded-xl flex items-center gap-3 w-full border border-black/[0.03]">
                                    <MapPin className="w-5 h-5 text-[#D98FB5]" />
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-[#1D1D1F]">{product.location || "Brasil"}</span>
                                        <span className="text-[10px] text-green-500 font-bold mt-0.5 uppercase tracking-wider">Frete Disponível</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-2 flex flex-col gap-4"
                    >
                        <button className="w-full bg-[#1D1D1F] hover:bg-[#D98FB5] text-white rounded-2xl py-4 font-bold text-[13px] tracking-[0.2em] transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer uppercase">
                            ENTRAR EM CONTATO <MessageCircle className="w-4 h-4 ml-2" />
                        </button>

                        {product.pdfUrl && (
                            <a href={product.pdfUrl} target="_blank" className="w-full flex items-center justify-center gap-2 text-[#1D1D1F] hover:text-[#D98FB5] font-semibold text-[13px] group py-2 transition-colors cursor-pointer uppercase tracking-widest">
                                <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                                BAIXAR CATÁLOGO (PDF)
                            </a>
                        )}
                    </motion.div>

                </div>

                {/* CENTER COLUMN - Main Image */}
                <div className="flex-1 w-full max-w-[500px] flex flex-col items-center justify-center relative pointer-events-none mt-10 lg:mt-0">

                    <motion.div
                        style={{ y: yImage }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full aspect-square md:aspect-[4/5.5] z-0 drop-shadow-2xl rounded-[32px] md:rounded-[3rem] overflow-hidden bg-[#EAE8E3]/50"
                    >
                        <Image
                            src={currentImage}
                            alt={product.name}
                            fill
                            className="object-contain scale-100 md:scale-110 p-6 md:p-12 drop-shadow-2xl transition-all duration-700"
                            priority
                            key={currentImage}
                        />
                    </motion.div>

                    {/* Floating Preview Button */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col items-center">
                        <div className="bg-white text-[#1D1D1F] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-t-lg shadow-sm -mb-2 border border-b-0 border-[#1D1D1F]/[0.05]">
                            Provador Virtual
                        </div>
                        <div className="bg-[#1D1D1F] backdrop-blur-md rounded-2xl flex items-center overflow-hidden shadow-2xl cursor-pointer hover:bg-[#D98FB5] transition-colors">
                            <button className="flex items-center justify-center w-12 h-12 hover:bg-white/10 transition-colors">
                                <Palette className="w-5 h-5 text-white" />
                            </button>
                            <div className="w-[1px] h-6 bg-white/20"></div>
                            <button className="px-5 h-12 text-white font-bold text-[11px] uppercase tracking-widest">
                                VER EM 360°
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - Related Products */}
                <div className="flex flex-col gap-6 w-full lg:w-[320px] flex-shrink-0 pt-4 z-10">

                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4 border-b border-[#1D1D1F]/5 pb-4">
                            <h2 className="text-[20px] text-[#1D1D1F] font-bold tracking-tighter uppercase">Relacionados</h2>
                            <button className="text-[#86868B] hover:text-[#1D1D1F] transition-colors cursor-pointer">
                                <MoreHorizontal className="w-6 h-6" />
                            </button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-2 gap-3"
                        >
                            {relatedProducts.length > 0 ? (
                                relatedProducts.map((item: any, idx) => (
                                    <a href={`/produtos/${item.id}`} key={item.id} className="relative aspect-[4/5] rounded-[24px] overflow-hidden group cursor-pointer shadow-sm border border-[#1D1D1F]/[0.02] bg-white">
                                        <Image
                                            src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80"}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <span className="absolute bottom-3 left-3 text-white text-[9px] font-black uppercase drop-shadow-md tracking-wider opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                            {item.name}
                                        </span>
                                    </a>
                                ))
                            ) : (
                                [...Array(4)].map((_, idx) => (
                                    <div key={idx} className="relative aspect-[4/5] rounded-[24px] bg-[#F5F5F7] animate-pulse"></div>
                                ))
                            )}
                        </motion.div>
                    </div>

                    <div className="flex flex-col gap-3 mt-6 p-6 bg-white rounded-3xl border border-[#1D1D1F]/[0.02] shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] text-[#86868B] font-bold uppercase tracking-wider">Estoque:</span>
                            <div className="bg-[#1D1D1F] text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">{product.stock} UN</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] text-[#86868B] font-bold uppercase tracking-wider">Entrega:</span>
                            <div className="bg-[#F2F2F7] text-[#1D1D1F] px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">{product.deliveryDays || "3-5 DIAS"}</div>
                        </div>
                    </div>

                </div>

            </div>

            {/* --- REVIEWS SECTION --- */}
            <div className="w-full max-w-[1000px] mt-20 md:mt-32 mx-auto relative z-10 border-t border-[#1D1D1F]/5 pt-12 md:pt-16">

                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-black text-[#1D1D1F] uppercase tracking-tighter leading-none">Avaliações</h2>
                        <p className="text-[#86868B] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-3">Feedback Real de Clientes Reais</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { name: "Amanda Silva", date: "Há 2 dias", rating: 5, text: "O acabamento natural é perfeito, não pesa e o tom bateu certinho com a minha pele.", likes: 12 },
                        { name: "Carolina Mendes", date: "Há 1 semana", rating: 5, text: "Comprei junto com o sérum e o corretivo e valeu a pena! A sensação hidratante dura o dia inteiro.", likes: 8 },
                    ].map((review, idx) => (
                        <div key={idx} className="bg-white rounded-[32px] p-8 shadow-sm border border-[#1D1D1F]/[0.02] flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] font-black text-sm">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[#1D1D1F] uppercase text-xs tracking-wider">{review.name}</span>
                                        <span className="text-[10px] text-[#86868B] font-medium uppercase tracking-widest">{review.date}</span>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-[14px] text-[#1D1D1F] italic leading-relaxed opacity-70">"{review.text}"</p>
                            <div className="flex items-center gap-4 border-t border-[#F2F2F7] pt-6">
                                <button className="flex items-center gap-1.5 text-[10px] font-black text-[#86868B] hover:text-[#D98FB5] transition-colors cursor-pointer uppercase tracking-widest">
                                    <ThumbsUp className="w-3.5 h-3.5" /> Útil ({review.likes})
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
