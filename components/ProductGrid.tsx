"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    oldPrice?: number | null;
    badge?: string | null;
    stock: number;
    images: { url: string; alt?: string; isPrimary: boolean }[];
}

interface ProductGridProps {
    products: Product[];
    columns?: 2 | 3 | 4 | 5;
    showBadge?: boolean;
    compact?: boolean;
}

export default function ProductGrid({
    products,
    columns = 4,
    showBadge = true,
    compact = false,
}: ProductGridProps) {
    const gridCols = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
            {products.map((product, index) => {
                const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
                const hasDiscount = product.oldPrice && product.oldPrice > product.price;
                const discountPercent = hasDiscount
                    ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
                    : 0;

                return (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="group relative bg-white rounded-2xl overflow-hidden border border-[#E8E8ED] hover:border-[#D98FB5]/30 transition-all duration-300 hover:shadow-lg"
                    >
                        {/* Image Container */}
                        <Link href={`/produtos/${product.id}`}>
                            <div className={`relative overflow-hidden bg-[#F5F5F7] ${compact ? "aspect-[4/3]" : "aspect-square"}`}>
                                {primaryImage ? (
                                    <Image
                                        src={primaryImage.url}
                                        alt={primaryImage.alt || product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#86868B]">
                                        <ShoppingBag className="w-8 h-8" />
                                    </div>
                                )}

                                {/* Badges */}
                                {showBadge && (
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        {product.badge && (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1D1D1F] text-white">
                                                {product.badge}
                                            </span>
                                        )}
                                        {hasDiscount && discountPercent > 0 && (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D98FB5] text-white">
                                                -{discountPercent}%
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Wishlist Button */}
                                <button
                                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#D98FB5] hover:text-white shadow-md"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Wishlist logic
                                    }}
                                >
                                    <Heart className="w-4 h-4" />
                                </button>

                                {/* Quick Add Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <button
                                        className="w-full bg-[#1D1D1F] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#D98FB5] transition-colors flex items-center justify-center gap-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Add to cart logic
                                        }}
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </Link>

                        {/* Product Info */}
                        <div className={`p-4 ${compact ? "p-3" : "p-4"}`}>
                            <Link href={`/produtos/${product.id}`}>
                                <h3 className={`font-semibold text-[#1D1D1F] mb-1 group-hover:text-[#D98FB5] transition-colors ${compact ? "text-sm" : "text-base"}`}>
                                    {product.name}
                                </h3>
                            </Link>

                            {/* Rating */}
                            {!compact && (
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-3 h-3 fill-[#FFB800] text-[#FFB800]"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[11px] text-[#86868B]">(4.9)</span>
                                </div>
                            )}

                            {/* Price */}
                            <div className="flex items-baseline gap-2">
                                <span className={`font-bold text-[#1D1D1F] ${compact ? "text-sm" : "text-lg"}`}>
                                    {formatPrice(product.price)}
                                </span>
                                {hasDiscount && product.oldPrice && (
                                    <span className="text-xs text-[#86868B] line-through">
                                        {formatPrice(product.oldPrice)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
