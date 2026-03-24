import prisma from "@/lib/prisma";
import { createProduct } from "./actions";

export default async function NovoProdutoPage() {
    const categories = await prisma.category.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1D1D1F]">Novo Produto</h1>
                <p className="text-[#86868B]">Cadastre um novo produto na sua loja</p>
            </div>

            <form action={createProduct} className="space-y-8">
                {/* Informações Básicas */}
                <div className="bg-white p-8 rounded-2xl border border-[#1D1D1F]/[0.05] space-y-6">
                    <h2 className="text-lg font-semibold text-[#1D1D1F]">
                        Informações Básicas
                    </h2>

                    <div>
                        <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                            Nome do Produto *
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Ex: Base Líquida Natural"
                            className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                            Descrição
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Descreva o produto..."
                            className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                            Categoria *
                        </label>
                        <select
                            name="categoryId"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors"
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Preços e Estoque */}
                <div className="bg-white p-8 rounded-2xl border border-[#1D1D1F]/[0.05] space-y-6">
                    <h2 className="text-lg font-semibold text-[#1D1D1F]">
                        Preços e Estoque
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                                Preço *
                            </label>
                            <input
                                type="number"
                                name="price"
                                step="0.01"
                                min="0"
                                required
                                placeholder="0,00"
                                className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                                Preço Antigo
                            </label>
                            <input
                                type="number"
                                name="oldPrice"
                                step="0.01"
                                min="0"
                                placeholder="0,00"
                                className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                                Estoque *
                            </label>
                            <input
                                type="number"
                                name="stock"
                                min="0"
                                defaultValue={0}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Imagens */}
                <div className="bg-white p-8 rounded-2xl border border-[#1D1D1F]/[0.05] space-y-6">
                    <h2 className="text-lg font-semibold text-[#1D1D1F]">Imagens</h2>

                    <div>
                        <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                            URL da Imagem Principal
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            placeholder="https://..."
                            className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors"
                        />
                    </div>
                </div>

                {/* Botões */}
                <div className="flex gap-4">
                    <a
                        href="/admin/produtos"
                        className="flex-1 px-4 py-3 text-center border border-[#1D1D1F]/10 rounded-lg font-medium hover:bg-[#F2F2F7] transition-colors"
                    >
                        Cancelar
                    </a>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-[#1D1D1F] text-white rounded-lg font-medium hover:bg-[#1D1D1F]/90 transition-colors"
                    >
                        Criar Produto
                    </button>
                </div>
            </form>
        </div>
    );
}
