"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteButtonProps {
    id: string;
    endpoint: string; // e.g., "/api/products"
    confirmMessage?: string;
}

export default function DeleteButton({
    id,
    endpoint,
    confirmMessage = "Tem certeza que deseja excluir este item?",
}: DeleteButtonProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(confirmMessage)) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || "Erro ao excluir item");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Erro ao conectar com o servidor");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Excluir"
        >
            <Trash2 className={`w-4 h-4 text-red-500 ${isDeleting ? "animate-pulse" : ""}`} />
        </button>
    );
}
