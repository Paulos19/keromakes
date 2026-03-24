"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const price = parseFloat(formData.get("price") as string);
    const oldPrice = formData.get("oldPrice")
        ? parseFloat(formData.get("oldPrice") as string)
        : null;
    const stock = parseInt(formData.get("stock") as string);
    const imageUrl = formData.get("imageUrl") as string;

    // Busca o nome da categoria
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });

    await prisma.product.create({
        data: {
            name,
            description,
            price,
            oldPrice,
            stock,
            category: category?.name || "Geral",
            categoryId,
            images: imageUrl
                ? {
                      create: {
                          url: imageUrl,
                          isPrimary: true,
                      },
                  }
                : undefined,
        },
    });

    revalidatePath("/admin/produtos");
    revalidatePath("/");
    redirect("/admin/produtos");
}
