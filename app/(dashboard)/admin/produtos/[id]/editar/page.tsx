import prisma from "@/lib/prisma";
import ProductEditForm from "./ProductEditForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function EditarProdutoPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const [product, categories] = await Promise.all([
        prisma.product.findUnique({
            where: { id },
            include: { images: true, colors: true }
        }),
        prisma.category.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
        })
    ]);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h1 className="text-2xl font-bold">Produto não encontrado</h1>
                <Link href="/admin/produtos" className="text-[#D98FB5] hover:underline">Voltar para lista</Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-40">
            {/* Header com breadcrumb */}
            <div className="mb-14">
                <Link href="/admin/produtos" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[4px] font-black text-[#86868B] hover:text-[#D98FB5] transition-colors mb-6 group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Gerenciar Produtos
                </Link>
                <div className="space-y-2">
                    <h1 className="text-[10vw] md:text-[5vw] leading-[0.85] font-black text-[#1D1D1F] tracking-tighter uppercase">Editar <br /> {product.name}</h1>
                    <p className="text-[10px] uppercase tracking-[5px] font-black text-[#86868B] opacity-60">ID: {product.id}</p>
                </div>
            </div>

            <ProductEditForm product={product} categories={categories} />
        </div>
    );
}
