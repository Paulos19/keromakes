import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2, ArrowLeft } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

export default async function CategoriasPage() {
    const categories = await prisma.category.findMany({
        orderBy: { order: "asc" },
        include: {
            _count: { select: { products: true } },
        },
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="p-2 hover:bg-[#F2F2F7] rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[#1D1D1F]">Categorias</h1>
                        <p className="text-[#86868B]">
                            Gerencie as categorias da sua loja
                        </p>
                    </div>
                </div>
                <Link
                    href="/admin/categorias/nova"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1D1D1F] text-white rounded-lg text-sm font-medium hover:bg-[#1D1D1F]/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nova Categoria
                </Link>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.length === 0 ? (
                    <div className="col-span-full bg-white rounded-2xl border border-[#1D1D1F]/[0.05] p-12 text-center">
                        <div className="w-16 h-16 bg-[#F2F2F7] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-[#86868B]" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
                            Nenhuma categoria
                        </h3>
                        <p className="text-[#86868B] mb-6">
                            Crie sua primeira categoria para organizar os produtos
                        </p>
                        <Link
                            href="/admin/categorias/nova"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1D1D1F] text-white rounded-lg text-sm font-medium"
                        >
                            Criar Categoria
                        </Link>
                    </div>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-2xl border border-[#1D1D1F]/[0.05] p-6 group hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                    style={{
                                        backgroundColor: category.imageUrl
                                            ? undefined
                                            : "#F2F2F7",
                                    }}
                                >
                                    {category.imageUrl ? (
                                        <img
                                            src={category.imageUrl}
                                            alt={category.name}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    ) : (
                                        "🏷️"
                                    )}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={`/admin/categorias/${category.id}/editar`}
                                        className="p-2 hover:bg-[#F2F2F7] rounded-lg transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4 text-[#86868B]" />
                                    </Link>
                                    <DeleteButton
                                        id={category.id}
                                        endpoint="/api/categories"
                                        confirmMessage="Tem certeza que deseja excluir esta categoria?"
                                    />
                                </div>
                            </div>

                            <h3 className="font-semibold text-[#1D1D1F] mb-1">
                                {category.name}
                            </h3>
                            <p className="text-sm text-[#86868B] mb-4">
                                {category.description || "Sem descrição"}
                            </p>

                            <div className="flex items-center justify-between text-sm">
                                <span
                                    className={`px-2 py-1 rounded-full ${category.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {category.isActive ? "Ativa" : "Inativa"}
                                </span>
                                <span className="text-[#86868B]">
                                    {category._count.products} produtos
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
