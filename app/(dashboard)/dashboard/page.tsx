"use client";

import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, X, ImageIcon, Palette, MapPin, Phone, FileText, Package, Edit2 } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

interface ProductColor {
    id?: string;
    name: string;
    hexCode: string;
}

interface ProductImage {
    id?: string;
    url: string;
    alt: string;
    isPrimary: boolean;
}

interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    oldPrice: number | null;
    category: string;
    badge: string;
    location: string;
    sellerPhone: string;
    pdfUrl: string;
    stock: number;
    deliveryDays: string;
    colors: ProductColor[];
    images: ProductImage[];
}

const emptyProduct: Product = {
    name: "", description: "", price: 0, oldPrice: null, category: "",
    badge: "", location: "", sellerPhone: "", pdfUrl: "", stock: 0,
    deliveryDays: "", colors: [], images: [],
};

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [editing, setEditing] = useState<Product | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // New color input state
    const [newColorName, setNewColorName] = useState("");
    const [newColorHex, setNewColorHex] = useState("#D98FB5");

    // New image input state
    const [newImageUrl, setNewImageUrl] = useState("");
    const [newImageAlt, setNewImageAlt] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
        if (status === "authenticated") {
            fetchProducts();
        }
    }, [status]);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (e) {
            console.error("Failed to fetch products:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);

        try {
            const method = editing.id ? "PUT" : "POST";
            const url = editing.id ? `/api/products/${editing.id}` : "/api/products";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editing),
            });

            if (res.ok) {
                await fetchProducts();
                setEditing(null);
                setIsCreating(false);
            }
        } catch (e) {
            console.error("Failed to save product:", e);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return;

        try {
            await fetch(`/api/products/${id}`, { method: "DELETE" });
            await fetchProducts();
        } catch (e) {
            console.error("Failed to delete product:", e);
        }
    };

    const addColor = () => {
        if (!editing || !newColorName || !newColorHex) return;
        setEditing({
            ...editing,
            colors: [...editing.colors, { name: newColorName, hexCode: newColorHex }],
        });
        setNewColorName("");
        setNewColorHex("#D98FB5");
    };

    const removeColor = (idx: number) => {
        if (!editing) return;
        setEditing({
            ...editing,
            colors: editing.colors.filter((_, i) => i !== idx),
        });
    };

    const addImage = () => {
        if (!editing || !newImageUrl) return;
        setEditing({
            ...editing,
            images: [...editing.images, { url: newImageUrl, alt: newImageAlt, isPrimary: editing.images.length === 0 }],
        });
        setNewImageUrl("");
        setNewImageAlt("");
    };

    const removeImage = (idx: number) => {
        if (!editing) return;
        setEditing({
            ...editing,
            images: editing.images.filter((_, i) => i !== idx),
        });
    };

    if (status === "loading" || loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-[#D98FB5] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className={`${inter.className} max-w-full`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#1E1941]">Gerenciar Produtos</h1>
                    <p className="text-sm text-[#86868B] mt-1">{products.length} produtos cadastrados</p>
                </div>
                <button
                    onClick={() => { setEditing({ ...emptyProduct }); setIsCreating(true); }}
                    className="flex items-center gap-2 bg-[#1E1941] text-white px-5 py-3 rounded-2xl text-sm font-bold hover:bg-[#2a2360] transition-colors cursor-pointer shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Novo Produto
                </button>
            </div>

            {/* Product List */}
            {!editing && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-3xl p-5 border border-[#1E1941]/[0.03] shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-shadow flex flex-col gap-3"
                        >
                            {/* Product Image Preview */}
                            {product.images?.[0] && (
                                <div className="w-full h-40 rounded-2xl overflow-hidden bg-[#F8F9FA]">
                                    <img src={product.images[0].url} alt={product.images[0].alt || product.name} className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-bold text-[#1E1941]">{product.name}</h3>
                                    <p className="text-[12px] text-[#86868B] mt-0.5">{product.category}</p>
                                </div>
                                <span className="text-lg font-bold text-[#1E1941]">R$ {product.price?.toFixed(2)}</span>
                            </div>

                            {/* Colors preview */}
                            {product.colors?.length > 0 && (
                                <div className="flex gap-1.5">
                                    {product.colors.map((c, i) => (
                                        <div key={i} className="w-5 h-5 rounded-md border border-white shadow-sm" style={{ backgroundColor: c.hexCode }} title={c.name}></div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[#1E1941]/5">
                                <button
                                    onClick={() => setEditing(product)}
                                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#F2F2F7] text-[#1E1941] py-2.5 rounded-xl text-xs font-bold hover:bg-[#E5E5EA] transition-colors cursor-pointer"
                                >
                                    <Edit2 className="w-3.5 h-3.5" /> Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id!)}
                                    className="flex items-center justify-center gap-1.5 bg-red-50 text-red-500 py-2.5 px-4 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {products.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                            <Package className="w-12 h-12 text-[#E5E5EA] mb-4" />
                            <h3 className="text-lg font-bold text-[#1E1941]">Nenhum produto</h3>
                            <p className="text-sm text-[#86868B] mt-1">Clique em "Novo Produto" para começar.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Edit / Create Form */}
            {editing && (
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#1E1941]/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-[#1E1941]">
                            {isCreating ? "Novo Produto" : `Editando: ${editing.name}`}
                        </h2>
                        <button onClick={() => { setEditing(null); setIsCreating(false); }} className="text-[#86868B] hover:text-[#1E1941] cursor-pointer"><X className="w-5 h-5" /></button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider">Nome do Produto</label>
                            <input
                                type="text" value={editing.name}
                                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40"
                                placeholder="Ex: Base Líquida Natural"
                            />
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider">Categoria</label>
                            <input
                                type="text" value={editing.category}
                                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40"
                                placeholder="Ex: Rosto, Olhos, Skincare"
                            />
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider">Preço (R$)</label>
                            <input
                                type="number" step="0.01" value={editing.price}
                                onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40"
                            />
                        </div>

                        {/* Old Price */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider">Preço Antigo (R$)</label>
                            <input
                                type="number" step="0.01" value={editing.oldPrice || ""}
                                onChange={(e) => setEditing({ ...editing, oldPrice: parseFloat(e.target.value) || null })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40"
                                placeholder="Opcional"
                            />
                        </div>

                        {/* Stock */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider">Estoque</label>
                            <input
                                type="number" value={editing.stock}
                                onChange={(e) => setEditing({ ...editing, stock: parseInt(e.target.value) || 0 })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40"
                            />
                        </div>

                        {/* Badge */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider">Badge</label>
                            <input
                                type="text" value={editing.badge}
                                onChange={(e) => setEditing({ ...editing, badge: e.target.value })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40"
                                placeholder="Ex: Novo, Mais Vendido"
                            />
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3 h-3" /> Local de Venda / Retirada</label>
                            <input
                                type="text" value={editing.location}
                                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40"
                                placeholder="Ex: São Paulo, SP"
                            />
                        </div>

                        {/* Seller Phone */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1"><Phone className="w-3 h-3" /> Número da Vendedora</label>
                            <input
                                type="text" value={editing.sellerPhone}
                                onChange={(e) => setEditing({ ...editing, sellerPhone: e.target.value })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40"
                                placeholder="Ex: (11) 99999-9999"
                            />
                        </div>

                        {/* Delivery Days */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider">Prazo de Entrega</label>
                            <input
                                type="text" value={editing.deliveryDays}
                                onChange={(e) => setEditing({ ...editing, deliveryDays: e.target.value })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40"
                                placeholder="Ex: 1 - 3 Dias"
                            />
                        </div>

                        {/* PDF URL */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1"><FileText className="w-3 h-3" /> Link do PDF</label>
                            <input
                                type="text" value={editing.pdfUrl}
                                onChange={(e) => setEditing({ ...editing, pdfUrl: e.target.value })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40"
                                placeholder="URL do catálogo (opcional)"
                            />
                        </div>

                        {/* Description (full width) */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider">Descrição</label>
                            <textarea
                                value={editing.description} rows={3}
                                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-3 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40 resize-none"
                                placeholder="Descrição do produto..."
                            />
                        </div>
                    </div>

                    {/* COLORS SECTION */}
                    <div className="mt-8 border-t border-[#1E1941]/5 pt-6">
                        <h3 className="text-sm font-bold text-[#1E1941] flex items-center gap-2 mb-4">
                            <Palette className="w-4 h-4" /> Cores Disponíveis ({editing.colors.length})
                        </h3>

                        {/* Existing Colors */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            {editing.colors.map((color, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-[#F8F9FA] rounded-xl px-3 py-2 border border-[#1E1941]/5">
                                    <div className="w-6 h-6 rounded-lg shadow-sm border border-white" style={{ backgroundColor: color.hexCode }}></div>
                                    <span className="text-xs font-semibold text-[#1E1941]">{color.name}</span>
                                    <button onClick={() => removeColor(idx)} className="text-red-400 hover:text-red-600 cursor-pointer ml-1"><X className="w-3 h-3" /></button>
                                </div>
                            ))}
                        </div>

                        {/* Add New Color */}
                        <div className="flex flex-wrap items-center gap-3">
                            <input
                                type="text" placeholder="Nome da cor"
                                value={newColorName} onChange={(e) => setNewColorName(e.target.value)}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-2.5 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40 w-40"
                            />
                            <input
                                type="color" value={newColorHex}
                                onChange={(e) => setNewColorHex(e.target.value)}
                                className="w-10 h-10 rounded-xl border border-[#1E1941]/5 cursor-pointer"
                            />
                            <button onClick={addColor} className="flex items-center gap-1 bg-[#A8E6CF] text-[#1E1941] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#89D9BE] transition-colors cursor-pointer">
                                <Plus className="w-3 h-3" /> Adicionar Cor
                            </button>
                        </div>
                    </div>

                    {/* IMAGES SECTION */}
                    <div className="mt-8 border-t border-[#1E1941]/5 pt-6">
                        <h3 className="text-sm font-bold text-[#1E1941] flex items-center gap-2 mb-4">
                            <ImageIcon className="w-4 h-4" /> Imagens do Produto ({editing.images.length})
                        </h3>

                        {/* Existing Images */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            {editing.images.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-[#F8F9FA] border border-[#1E1941]/5 group">
                                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                                    {img.isPrimary && (
                                        <div className="absolute top-2 left-2 bg-[#FFC107] text-[#1E1941] text-[9px] font-bold px-2 py-0.5 rounded-full">Capa</div>
                                    )}
                                    <button onClick={() => removeImage(idx)} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add New Image */}
                        <div className="flex flex-wrap items-center gap-3">
                            <input
                                type="text" placeholder="URL da imagem"
                                value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-2.5 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40 flex-1 min-w-[200px]"
                            />
                            <input
                                type="text" placeholder="Alt text (opcional)"
                                value={newImageAlt} onChange={(e) => setNewImageAlt(e.target.value)}
                                className="bg-[#F8F9FA] border border-[#1E1941]/5 rounded-xl py-2.5 px-4 text-sm text-[#1E1941] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40 w-40"
                            />
                            <button onClick={addImage} className="flex items-center gap-1 bg-[#A8E6CF] text-[#1E1941] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#89D9BE] transition-colors cursor-pointer">
                                <Plus className="w-3 h-3" /> Adicionar Imagem
                            </button>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            onClick={() => { setEditing(null); setIsCreating(false); }}
                            className="px-6 py-3 rounded-xl text-sm font-semibold text-[#86868B] hover:text-[#1E1941] transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-[#1E1941] text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-[#2a2360] transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" /> {saving ? "Salvando..." : "Salvar Produto"}
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}
