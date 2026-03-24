import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2, ArrowLeft, Search } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

export default async function ProdutosPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams?.q || "";

    const products = await prisma.product.findMany({
        where: query
            ? {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { category: { contains: query, mode: "insensitive" } },
                ],
            }
            : undefined,
        orderBy: { createdAt: "desc" },
        include: { images: true, categoryRel: true },
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
                        <h1 className="text-2xl font-bold text-[#1D1D1F]">Produtos</h1>
                        <p className="text-[#86868B]">Gerencie os produtos da sua loja</p>
                    </div>
                </div>
                <Link
                    href="/admin/produtos/novo"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1D1D1F] text-white rounded-lg text-sm font-medium hover:bg-[#1D1D1F]/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Novo Produto
                </Link>
            </div>

            {/* Search */}
            <div className="flex gap-4">
                <form className="flex-1 relative" action="/admin/produtos">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                    <input
                        type="text"
                        name="q"
                        defaultValue={query}
                        placeholder="Buscar produtos..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1D1D1F]/10 rounded-lg text-sm focus:outline-none focus:border-[#D98FB5]"
                    />
                </form>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#1D1D1F]/[0.05] overflow-hidden">
                {products.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-[#F2F2F7] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-[#86868B]" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
                            Nenhum produto
                        </h3>
                        <p className="text-[#86868B] mb-6">
                            Cadastre seu primeiro produto
                        </p>
                        <Link
                            href="/admin/produtos/novo"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1D1D1F] text-white rounded-lg text-sm font-medium"
                        >
                            Cadastrar Produto
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#F8F9FA]">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#1D1D1F]">
                                        Produto
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#1D1D1F]">
                                        Categoria
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#1D1D1F]">
                                        Preço
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#1D1D1F]">
                                        Estoque
                                    </th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-[#1D1D1F]">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1D1D1F]/[0.05]">
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-[#F8F9FA] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-[#F2F2F7] flex items-center justify-center overflow-hidden">
                                                    {product.images[0] ? (
                                                        <img
                                                            src={product.images[0].url}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-xs text-[#86868B]">
                                                            IMG
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-[#1D1D1F]">
                                                        {product.name}
                                                    </div>
                                                    {product.badge && (
                                                        <span className="text-xs text-[#D98FB5]">
                                                            {product.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#86868B]">
                                            {product.categoryRel?.name || product.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-[#1D1D1F]">
                                                {new Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }).format(product.price)}
                                            </div>
                                            {product.oldPrice && (
                                                <div className="text-xs text-[#86868B] line-through">
                                                    {new Intl.NumberFormat("pt-BR", {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    }).format(product.oldPrice)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${product.stock > 10
                                                    ? "bg-green-100 text-green-700"
                                                    : product.stock > 0
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {product.stock} unidades
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/produtos/${product.id}/editar`}
                                                    className="p-2 hover:bg-[#F2F2F7] rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4 text-[#86868B]" />
                                                </Link>
                                                <DeleteButton
                                                    id={product.id}
                                                    endpoint="/api/products"
                                                    confirmMessage="Tem certeza que deseja excluir este produto?"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
