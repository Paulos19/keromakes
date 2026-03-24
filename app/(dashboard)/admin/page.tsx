import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Package, Tags, Users, TrendingUp, DollarSign } from "lucide-react";

export default async function DashboardPage() {
    // Busca estatísticas
    const [totalProducts, totalCategories, totalUsers, recentProducts] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
        prisma.user.count(),
        prisma.product.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { images: true },
        }),
    ]);

    const stats = [
        { label: "Produtos", value: totalProducts, icon: Package, color: "bg-blue-500" },
        { label: "Categorias", value: totalCategories, icon: Tags, color: "bg-green-500" },
        { label: "Usuários", value: totalUsers, icon: Users, color: "bg-purple-500" },
        { label: "Vendas", value: "R$ 0", icon: DollarSign, color: "bg-amber-500" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1D1D1F]">Dashboard</h1>
                    <p className="text-[#86868B]">Visão geral da sua loja</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/categorias"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#1D1D1F]/10 rounded-lg text-sm font-medium text-[#1D1D1F] hover:bg-[#F2F2F7] transition-colors"
                    >
                        <Tags className="w-4 h-4" />
                        Categorias
                    </Link>
                    <Link
                        href="/admin/produtos"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1D1D1F] text-white rounded-lg text-sm font-medium hover:bg-[#1D1D1F]/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Novo Produto
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white p-6 rounded-2xl border border-[#1D1D1F]/[0.05]"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold text-[#1D1D1F]">{stat.value}</div>
                        <div className="text-sm text-[#86868B]">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-2xl border border-[#1D1D1F]/[0.05] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#1D1D1F]/[0.05] flex items-center justify-between">
                    <h2 className="font-semibold text-[#1D1D1F]">Produtos Recentes</h2>
                    <Link
                        href="/admin/produtos"
                        className="text-sm text-[#D98FB5] hover:underline"
                    >
                        Ver todos
                    </Link>
                </div>
                <div className="divide-y divide-[#1D1D1F]/[0.05]">
                    {recentProducts.length === 0 ? (
                        <div className="px-6 py-12 text-center text-[#86868B]">
                            Nenhum produto cadastrado.
                            <Link
                                href="/admin/produtos"
                                className="block mt-2 text-[#D98FB5] hover:underline"
                            >
                                Cadastrar primeiro produto
                            </Link>
                        </div>
                    ) : (
                        recentProducts.map((product) => (
                            <div
                                key={product.id}
                                className="px-6 py-4 flex items-center gap-4 hover:bg-[#F8F9FA] transition-colors"
                            >
                                <div className="w-12 h-12 rounded-lg bg-[#F2F2F7] flex items-center justify-center text-sm text-[#86868B]">
                                    {product.images[0] ? (
                                        <img
                                            src={product.images[0].url}
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        "IMG"
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-[#1D1D1F]">{product.name}</div>
                                    <div className="text-sm text-[#86868B]">{product.category}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-[#1D1D1F]">
                                        {new Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(product.price)}
                                    </div>
                                    <div className="text-sm text-[#86868B]">
                                        Estoque: {product.stock}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
