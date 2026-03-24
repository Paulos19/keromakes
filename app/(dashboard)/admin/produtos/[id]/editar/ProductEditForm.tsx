"use client";

import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Palette, ShoppingBag, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { updateProduct } from "./actions";

interface ColorOption {
    name: string;
    hexCode: string;
    imageUrl: string | null;
}

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    oldPrice: number | null;
    stock: number;
    location: string | null;
    categoryId: string | null;
    colors: ColorOption[];
    images: { url: string; isPrimary: boolean }[];
}

interface Category {
    id: string;
    name: string;
}

export default function ProductEditForm({
    product,
    categories
}: {
    product: Product;
    categories: Category[]
}) {
    const [colors, setColors] = useState<ColorOption[]>(product.colors || []);
    const [newColor, setNewColor] = useState<ColorOption>({ name: "", hexCode: "#D98FB5", imageUrl: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addColor = () => {
        if (!newColor.name || !newColor.hexCode) return;
        setColors([...colors, newColor]);
        setNewColor({ name: "", hexCode: "#D98FB5", imageUrl: "" });
    };

    const removeColor = (index: number) => {
        setColors(colors.filter((_, i) => i !== index));
    };

    const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || "";

    return (
        <form
            action={async (formData) => {
                setIsSubmitting(true);
                formData.append("colors", JSON.stringify(colors));
                await updateProduct(product.id, formData);
                setIsSubmitting(false);
            }}
            className="space-y-12"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content (Left Column) */}
                <div className="lg:col-span-2 space-y-10">

                    {/* section 1: Basic Info */}
                    <div className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-[#D98FB5] rounded-full"></div>
                            <h2 className="text-xl font-black text-[#1E1941] uppercase tracking-tighter">Conteúdo</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <label className="block text-[10px] uppercase tracking-[4px] font-black text-[#86868B] mb-3 px-1">Nome do Produto</label>
                                <input
                                    name="name"
                                    defaultValue={product.name}
                                    required
                                    type="text"
                                    className="w-full px-6 py-5 rounded-3xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#D98FB5]/20 outline-none transition-all text-[#1E1941] font-medium"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-[10px] uppercase tracking-[4px] font-black text-[#86868B] mb-3 px-1">Descrição</label>
                                <textarea
                                    name="description"
                                    defaultValue={product.description || ""}
                                    rows={5}
                                    className="w-full px-6 py-5 rounded-3xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#D98FB5]/20 outline-none transition-all text-[#1E1941] font-medium resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* section 2: Pricing & Stock */}
                    <div className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-[#A8E6CF] rounded-full"></div>
                            <h2 className="text-xl font-black text-[#1E1941] uppercase tracking-tighter">Valores & Estoque</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-[#F5F5F7] p-6 rounded-3xl space-y-2">
                                <label className="block text-[8px] uppercase tracking-[3px] font-black text-[#86868B]">Preço Venda</label>
                                <div className="flex items-center gap-1">
                                    <span className="text-[#1E1941] font-bold text-xs">R$</span>
                                    <input name="price" defaultValue={product.price} required step="0.01" type="number" className="bg-transparent outline-none w-full font-black text-lg text-[#1E1941]" />
                                </div>
                            </div>
                            <div className="bg-[#F5F5F7] p-6 rounded-3xl space-y-2">
                                <label className="block text-[8px] uppercase tracking-[3px] font-black text-[#86868B]">Preço Antigo</label>
                                <div className="flex items-center gap-1">
                                    <span className="text-[#86868B] font-bold text-xs">R$</span>
                                    <input name="oldPrice" defaultValue={product.oldPrice || ""} step="0.01" type="number" className="bg-transparent outline-none w-full font-black text-lg text-[#86868B]" />
                                </div>
                            </div>
                            <div className="bg-[#F5F5F7] p-6 rounded-3xl space-y-2">
                                <label className="block text-[8px] uppercase tracking-[3px] font-black text-[#86868B]">Unidades</label>
                                <input name="stock" defaultValue={product.stock} required type="number" className="bg-transparent outline-none w-full font-black text-lg text-[#1E1941]" />
                            </div>
                            <div className="bg-[#F5F5F7] p-6 rounded-3xl space-y-2">
                                <label className="block text-[8px] uppercase tracking-[3px] font-black text-[#86868B]">Localização</label>
                                <input name="location" defaultValue={product.location || ""} type="text" className="bg-transparent outline-none w-full font-black text-lg text-[#1E1941]" />
                            </div>
                        </div>
                    </div>

                    {/* section 3: Colors & Variant Images */}
                    <div className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-[#D98FB5] rounded-full"></div>
                                <h2 className="text-xl font-black text-[#1E1941] uppercase tracking-tighter">Variantes & Cores</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <AnimatePresence>
                                {colors.map((c, i) => (
                                    <motion.div
                                        key={c.name + i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex items-center gap-4 bg-[#F5F5F7] p-4 rounded-3xl border border-transparent hover:border-[#D98FB5]/20 group transition-all"
                                    >
                                        <div className="w-14 h-14 rounded-2xl shadow-inner flex-shrink-0 relative overflow-hidden bg-white">
                                            {c.imageUrl ? (
                                                <img src={c.imageUrl} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-20"><Palette size={20} /></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black text-[#1E1941] uppercase truncate">{c.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-3 h-3 rounded-full border border-black/5" style={{ backgroundColor: c.hexCode }}></div>
                                                <p className="text-[8px] font-bold text-[#86868B] uppercase tracking-widest">{c.hexCode}</p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => removeColor(i)} className="w-8 h-8 rounded-full bg-white text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"><Trash2 size={14} /></button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <div className="bg-[#1E1941]/[0.02] border-2 border-dashed border-[#1E1941]/5 p-6 rounded-[32px] space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Nome" value={newColor.name} onChange={(e) => setNewColor({ ...newColor, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 text-[10px] font-bold outline-none" />
                                    <div className="flex gap-2">
                                        <input type="color" value={newColor.hexCode} onChange={(e) => setNewColor({ ...newColor, hexCode: e.target.value })} className="w-10 h-10 rounded-xl border-none p-0 overflow-hidden cursor-pointer" />
                                        <input type="text" value={newColor.hexCode} onChange={(e) => setNewColor({ ...newColor, hexCode: e.target.value })} className="w-full px-3 py-3 rounded-xl bg-white border border-black/5 text-[10px] font-bold uppercase outline-none" />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <input type="url" placeholder="URL da Imagem" value={newColor.imageUrl || ""} onChange={(e) => setNewColor({ ...newColor, imageUrl: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 text-[10px] font-bold outline-none" />
                                    <button type="button" onClick={addColor} className="w-10 h-10 rounded-xl bg-[#1E1941] text-white flex items-center justify-center hover:bg-[#D98FB5] transition-colors"><Plus size={18} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-10">
                    <div className="bg-[#1E1941] p-10 rounded-[48px] text-white shadow-2xl space-y-8">
                        <div className="space-y-2">
                            <label className="text-[8px] uppercase tracking-[4px] font-black text-white/40 block px-1">Organização</label>
                            <select name="categoryId" defaultValue={product.categoryId || ""} required className="w-full px-6 py-5 rounded-3xl bg-white/10 border border-white/10 text-xs font-black uppercase tracking-[3px] outline-none focus:bg-white/20 transition-all">
                                <option value="" disabled className="text-black">Selecione Categoria</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id} className="text-black">{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-6 bg-[#D98FB5] hover:bg-[#D98FB5]/90 text-white rounded-3xl font-black uppercase tracking-[4px] text-xs shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            <RotateCcw size={18} className={isSubmitting ? "animate-spin" : ""} />
                            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>

                    <div className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-sm space-y-6">
                        <h2 className="text-[10px] font-black text-[#1E1941] uppercase tracking-[3px]">Capa do Produto</h2>
                        <div className="aspect-[4/5] bg-[#F5F5F7] rounded-3xl overflow-hidden relative group">
                            {primaryImage && <img src={primaryImage} className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700" />}
                        </div>
                        <input name="imageUrl" defaultValue={primaryImage} type="url" placeholder="URL da Imagem Principal" className="w-full px-5 py-4 rounded-2xl bg-[#F5F5F7] border-transparent text-[10px] font-bold outline-none" />
                    </div>
                </div>
            </div>
        </form>
    );
}
