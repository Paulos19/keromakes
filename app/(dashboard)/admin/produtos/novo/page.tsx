import prisma from "@/lib/prisma";
import ProductForm from "./ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function NovoProdutoPage() {
    const categories = await prisma.category.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });

    return (
        <div className="max-w-6xl mx-auto pb-40">
            {/* Minimalist Breadcrumb */}
            <div className="mb-14">
                <Link href="/admin/produtos" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[4px] font-black text-[#86868B] hover:text-[#D98FB5] transition-colors mb-6 group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Catálogo de Produtos
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-[12vw] md:text-[5vw] leading-[0.85] font-black text-[#1E1941] tracking-tighter uppercase">
                            Criar <br /> Produto
                        </h1>
                        <p className="text-[10px] uppercase tracking-[5px] font-black text-[#86868B] opacity-60">
                            Preencha os detalhes para a nova coleção KeroMake.
                        </p>
                    </div>
                </div>
            </div>

            {/* Rendering the Interactive Client-Side Form */}
            <ProductForm categories={categories} />
        </div>
    );
}
