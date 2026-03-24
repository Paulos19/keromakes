"use client";

import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Palette, ShoppingBag, Sparkles, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createProduct } from "./actions";

interface ColorOption {
    name: string;
    hexCode: string;
    imageUrl: string;
}

interface Category {
    id: string;
    name: string;
}

export default function ProductForm({ categories }: { categories: Category[] }) {
    const [colors, setColors] = useState<ColorOption[]>([]);
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

    return (
        <form
            action={async (formData) => {
                setIsSubmitting(true);
                formData.append("colors", JSON.stringify(colors));
                await createProduct(formData);
                setIsSubmitting(false);
            }}
            className="space-y-12"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content (Left Column) */}
                <div className="lg:col-span-2 space-y-10">

                    {/* section 1: Basic Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-[#D98FB5] rounded-full"></div>
                            <h2 className="text-xl font-black text-[#1E1941] uppercase tracking-tighter">Essencial</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <label className="block text-[10px] uppercase tracking-[4px] font-black text-[#86868B] mb-3 px-1 transition-colors group-focus-within:text-[#D98FB5]">Nome do Produto</label>
                                <input
                                    name="name"
                                    required
                                    type="text"
                                    placeholder="Ex: Palette de Sombras Bloom"
                                    className="w-full px-6 py-5 rounded-3xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#D98FB5]/20 focus:ring-4 focus:ring-[#D98FB5]/5 outline-none transition-all text-[#1E1941] font-medium"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-[10px] uppercase tracking-[4px] font-black text-[#86868B] mb-3 px-1">Descrição Premium</label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    placeholder="Conte a história deste produto..."
                                    className="w-full px-6 py-5 rounded-3xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#D98FB5]/20 focus:ring-4 focus:ring-[#D98FB5]/5 outline-none transition-all text-[#1E1941] font-medium resize-none"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* section 2: Pricing & Stock */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-[#A8E6CF] rounded-full"></div>
                            <h2 className="text-xl font-black text-[#1E1941] uppercase tracking-tighter">Valores & Estoque</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-[#F5F5F7] p-6 rounded-3xl space-y-2">
                                <label className="block text-[8px] uppercase tracking-[3px] font-black text-[#86868B]">Preço Venda</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#1E1941] font-bold">R$</span>
                                    <input name="price" required step="0.01" type="number" className="bg-transparent outline-none w-full font-black text-xl text-[#1E1941]" />
                                </div>
                            </div>
                            <div className="bg-[#F5F5F7] p-6 rounded-3xl space-y-2">
                                <label className="block text-[8px] uppercase tracking-[3px] font-black text-[#86868B]">Preço Antigo</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#86868B] font-bold">R$</span>
                                    <input name="oldPrice" step="0.01" type="number" className="bg-transparent outline-none w-full font-black text-xl text-[#86868B]" />
                                </div>
                            </div>
                            <div className="bg-[#F5F5F7] p-6 rounded-3xl space-y-2">
                                <label className="block text-[8px] uppercase tracking-[3px] font-black text-[#86868B]">Unidades</label>
                                <input name="stock" required type="number" defaultValue={0} className="bg-transparent outline-none w-full font-black text-xl text-[#1E1941]" />
                            </div>
                            <div className="bg-[#F5F5F7] p-6 rounded-3xl space-y-2">
                                <label className="block text-[8px] uppercase tracking-[3px] font-black text-[#86868B]">Localidade</label>
                                <input name="location" type="text" placeholder="Brasil" className="bg-transparent outline-none w-full font-black text-xl text-[#1E1941]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* section 3: Colors & Variant Images */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-[#D98FB5] rounded-full"></div>
                                <h2 className="text-xl font-black text-[#1E1941] uppercase tracking-tighter">Variantes & Cores</h2>
                            </div>
                            <span className="text-[10px] font-black text-[#D98FB5] bg-[#D98FB5]/5 px-4 py-2 rounded-full uppercase tracking-widest">{colors.length} Cores</span>
                        </div>

                        {/* Color Items List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <AnimatePresence>
                                {colors.map((c, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex items-center gap-4 bg-[#F5F5F7] p-4 rounded-3xl border border-transparent hover:border-[#D98FB5]/20 group transition-all"
                                    >
                                        <div className="w-14 h-14 rounded-2xl shadow-inner flex-shrink-0 relative overflow-hidden bg-white">
                                            {c.imageUrl ? (
                                                <img src={c.imageUrl} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-20">
                                                    <Palette size={20} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 ring-4 ring-inset ring-white/40 rounded-2xl"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black text-[#1E1941] uppercase tracking-tighter truncate">{c.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-3 h-3 rounded-full border border-black/5" style={{ backgroundColor: c.hexCode }}></div>
                                                <p className="text-[8px] font-bold text-[#86868B] uppercase tracking-widest truncate max-w-[80px]">{c.hexCode}</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeColor(i)}
                                            className="w-10 h-10 rounded-full bg-white text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Add Color Form */}
                            <div className="bg-[#1E1941]/[0.02] border-2 border-dashed border-[#1E1941]/5 p-6 rounded-[32px] space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label className="text-[7px] font-black uppercase tracking-[3px] text-[#86868B] mb-2 block px-1">Nome da Cor</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Nude Rose"
                                            value={newColor.name}
                                            onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 text-[10px] font-bold outline-none focus:border-[#D98FB5]/20"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-[7px] font-black uppercase tracking-[3px] text-[#86868B] mb-2 block px-1">Seletor Hex</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={newColor.hexCode}
                                                onChange={(e) => setNewColor({ ...newColor, hexCode: e.target.value })}
                                                className="w-10 h-10 rounded-xl border-none p-0 overflow-hidden cursor-pointer flex-shrink-0"
                                            />
                                            <input
                                                type="text"
                                                value={newColor.hexCode}
                                                onChange={(e) => setNewColor({ ...newColor, hexCode: e.target.value })}
                                                className="w-full px-3 py-3 rounded-xl bg-white border border-black/5 text-[10px] font-bold uppercase outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[7px] font-black uppercase tracking-[3px] text-[#86868B] mb-2 block px-1">Imagem Vincular (URL)</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <ImageIcon size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" />
                                            <input
                                                type="url"
                                                placeholder="https://..."
                                                value={newColor.imageUrl}
                                                onChange={(e) => setNewColor({ ...newColor, imageUrl: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-black/5 text-[10px] font-bold outline-none focus:border-[#D98FB5]/20"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addColor}
                                            className="w-10 h-10 rounded-xl bg-[#1E1941] text-white flex items-center justify-center hover:bg-[#D98FB5] transition-colors"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar (Right Column) */}
                <div className="space-y-10">

                    {/* section: Status & Submit */}
                    <div className="bg-[#1E1941] p-10 rounded-[48px] text-white shadow-2xl space-y-8 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D98FB5] opacity-20 blur-[80px]"></div>

                        <div className="space-y-2">
                            <label className="text-[8px] uppercase tracking-[4px] font-black text-white/40 block px-1">Organização</label>
                            <select name="categoryId" required className="w-full px-6 py-5 rounded-3xl bg-white/10 border border-white/10 text-xs font-black uppercase tracking-[3px] outline-none focus:bg-white/20 transition-all">
                                <option value="" disabled className="text-black">Selecione Categoria</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id} className="text-black">{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-6 bg-[#D98FB5] hover:bg-[#D98FB5]/90 text-white rounded-3xl font-black uppercase tracking-[6px] text-[10px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                <ShoppingBag size={18} />
                                {isSubmitting ? "Cadastrando..." : "Publicar Produto"}
                            </button>
                            <Link
                                href="/admin/produtos"
                                className="block w-full text-center py-4 text-[8px] uppercase tracking-[4px] font-black text-white/40 hover:text-white transition-colors"
                            >
                                Descartar Rascunho
                            </Link>
                        </div>
                    </div>

                    {/* section: Global Media */}
                    <div className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#1D1D1F] rounded-full"></div>
                            <h2 className="text-xs font-black text-[#1E1941] uppercase tracking-[3px]">Capa Global</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="aspect-[4/5] bg-[#F5F5F7] rounded-[32px] flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#1E1941]/5">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#86868B] mb-4 shadow-sm">
                                    <ImageIcon size={24} />
                                </div>
                                <p className="text-[10px] font-black text-[#1E1941] uppercase tracking-[2px]">Mídia Principal</p>
                                <p className="text-[8px] text-[#86868B] mt-2 text-center uppercase tracking-widest leading-relaxed">Esta imagem será usada na vitrine da loja.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[7px] font-black uppercase tracking-[3px] text-[#86868B] block px-1">Link Externo</label>
                                <input name="imageUrl" type="url" placeholder="https://..." className="w-full px-5 py-4 rounded-2xl bg-[#F5F5F7] border-transparent text-[10px] font-bold outline-none focus:bg-white focus:border-[#D98FB5]/20 transition-all font-mono" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
}
