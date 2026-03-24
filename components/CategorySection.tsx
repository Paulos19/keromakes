"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductGrid from "./ProductGrid";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    imageUrl?: string | null;
    products: Product[];
}

interface Product {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    oldPrice?: number | null;
    badge?: string | null;
    stock: number;
    images: { url: string; alt?: string | null; isPrimary: boolean }[];
}

interface CategorySectionProps {
    categories: Category[];
    title?: string;
    subtitle?: string;
    showTabs?: boolean;
}

export default function CategorySection({
    categories,
    title = "Nossos Produtos",
    subtitle = "Descubra nossa selecao premium de produtos",
    showTabs = true,
}: CategorySectionProps) {
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const allProducts = categories.flatMap((cat) => cat.products);
    const filteredProducts =
        activeCategory === "all"
            ? allProducts.slice(0, 8)
            : categories.find((cat) => cat.id === activeCategory)?.products || [];

    return (
        <section className="py-16 md:py-24 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-2">
                            {title}
                        </h2>
                        <p className="text-[#86868B] text-base">{subtitle}</p>
                    </div>

                    {showTabs && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveCategory("all")}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === "all"
                                        ? "bg-[#1D1D1F] text-white"
                                        : "bg-white text-[#1D1D1F] hover:bg-[#1D1D1F]/5 border border-[#E8E8ED]"
                                }`}
                            >
                                Todos
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        activeCategory === category.id
                                            ? "bg-[#1D1D1F] text-white"
                                            : "bg-white text-[#1D1D1F] hover:bg-[#1D1D1F]/5 border border-[#E8E8ED]"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Products Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductGrid
                            products={filteredProducts}
                            columns={4}
                            showBadge={true}
                            compact={false}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* View All Button */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/produtos"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#1D1D1F] text-[#1D1D1F] rounded-full font-semibold text-sm hover:bg-[#1D1D1F] hover:text-white transition-all group"
                    >
                        Ver todos os produtos
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

// Grid de banners promocionais (estilo 2 colunas)
export function PromoGrid() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Banner 1 */}
                <Link href="#" className="group relative h-80 md:h-96 rounded-3xl overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=90"
                        alt="Colecao Maquiagem"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Colecao Maquiagem
                        </h3>
                        <p className="text-white/80 mb-4">Descubra as novidades da temporada</p>
                        <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                            Explorar agora <ArrowRight className="w-5 h-5" />
                        </span>
                    </div>
                </Link>

                {/* Banner 2 */}
                <Link href="#" className="group relative h-80 md:h-96 rounded-3xl overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1570194065650-d99fb4a38b58?w=800&q=90"
                        alt="Skincare Premium"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Skincare Premium
                        </h3>
                        <p className="text-white/80 mb-4">Cuidados para uma pele radiante</p>
                        <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                            Ver produtos <ArrowRight className="w-5 h-5" />
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

// Seção informativa (estilo "Formulated with purpose")
export function InfoSection() {
    const features = [
        {
            icon: "🌿",
            title: "Ingredientes Naturais",
            description: "Formulas desenvolvidas com ingredientes de origem natural e sustentavel.",
        },
        {
            icon: "✨",
            title: "Resultados Comprovados",
            description: "Eficacia testada e aprovada por dermatologistas e especialistas.",
        },
        {
            icon: "🐰",
            title: "Cruelty-Free",
            description: "Nenhum produto é testado em animais. Beleza consciente.",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=90"
                                alt="Produtos KeroMake"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-[#D98FB5] text-white p-6 rounded-2xl shadow-xl">
                            <div className="text-3xl font-bold">98%</div>
                            <div className="text-sm opacity-90">Satisfacao</div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-6 leading-tight">
                            Formulados com proposito e precisao
                        </h2>
                        <p className="text-lg text-[#86868B] mb-10">
                            Cada produto é cuidadosamente desenvolvido para entregar resultados excepcionais,
                            combinando ciência e natureza em formulas inovadoras.
                        </p>

                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4 p-4 rounded-2xl hover:bg-[#F8F9FA] transition-colors"
                                >
                                    <div className="text-3xl">{feature.icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-[#1D1D1F] mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-[#86868B]">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Newsletter Section
export function NewsletterSection() {
    return (
        <section className="py-16 md:py-24 bg-[#1D1D1F]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Sparkles className="w-8 h-8 text-[#D98FB5] mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Receba novidades e ofertas exclusivas
                </h2>
                <p className="text-white/60 mb-8 max-w-lg mx-auto">
                    Cadastre-se para receber 10% de desconto na primeira compra e fique por dentro das novidades.
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D98FB5] transition-colors"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#D98FB5] text-white rounded-full font-semibold hover:bg-[#c47aa0] transition-colors whitespace-nowrap"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </section>
    );
}
