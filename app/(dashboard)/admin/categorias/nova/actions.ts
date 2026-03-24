"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;
    let slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const isActive = formData.get("isActive") === "true";

    // Gera slug automaticamente se não fornecido
    if (!slug) {
        slug = name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
    }

    await prisma.category.create({
        data: {
            name,
            slug,
            description,
            imageUrl,
            isActive,
        },
    });

    revalidatePath("/admin/categorias");
    revalidatePath("/");
    redirect("/admin/categorias");
}
