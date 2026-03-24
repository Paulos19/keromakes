import { createCategory } from "./actions";

export default function NovaCategoriaPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1D1D1F]">Nova Categoria</h1>
                <p className="text-[#86868B]">Crie uma nova categoria para organizar seus produtos</p>
            </div>

            <form action={createCategory} className="space-y-6 bg-white p-8 rounded-2xl border border-[#1D1D1F]/[0.05]">
                <div>
                    <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                        Nome da Categoria *
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Ex: Maquiagem, Skincare..."
                        className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                        Slug (URL)
                    </label>
                    <input
                        type="text"
                        name="slug"
                        placeholder="Ex: maquiagem, skincare..."
                        className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors"
                    />
                    <p className="text-xs text-[#86868B] mt-1">
                        Deixe em branco para gerar automaticamente
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                        Descrição
                    </label>
                    <textarea
                        name="description"
                        rows={3}
                        placeholder="Descreva brevemente esta categoria..."
                        className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors resize-none"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                        URL da Imagem
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        placeholder="https://..."
                        className="w-full px-4 py-3 rounded-lg border border-[#1D1D1F]/10 focus:outline-none focus:border-[#D98FB5] transition-colors"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="isActive"
                        value="true"
                        defaultChecked
                        className="w-5 h-5 rounded border-[#1D1D1F]/20 text-[#D98FB5] focus:ring-[#D98FB5]"
                    />
                    <label className="text-sm text-[#1D1D1F]">Categoria ativa</label>
                </div>

                <div className="flex gap-4 pt-4">
                    <a
                        href="/admin/categorias"
                        className="flex-1 px-4 py-3 text-center border border-[#1D1D1F]/10 rounded-lg font-medium hover:bg-[#F2F2F7] transition-colors"
                    >
                        Cancelar
                    </a>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-[#1D1D1F] text-white rounded-lg font-medium hover:bg-[#1D1D1F]/90 transition-colors"
                    >
                        Criar Categoria
                    </button>
                </div>
            </form>
        </div>
    );
}
