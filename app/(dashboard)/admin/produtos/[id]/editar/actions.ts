"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const price = parseFloat(formData.get("price") as string);
    const oldPriceStr = formData.get("oldPrice") as string;
    const oldPrice = oldPriceStr ? parseFloat(oldPriceStr) : null;
    const stock = parseInt(formData.get("stock") as string);
    const imageUrl = formData.get("imageUrl") as string;
    const location = formData.get("location") as string;
    const colorsData = formData.get("colors") as string;
    const colors = colorsData ? JSON.parse(colorsData) : [];

    // Get the category name for the legacy 'category' field
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });

    await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            oldPrice,
            stock,
            location,
            categoryId,
            category: category?.name || "Geral",
            images: imageUrl ? {
                upsert: {
                    where: { id: "primary-image-" + id },
                    update: { url: imageUrl },
                    create: { url: imageUrl, isPrimary: true, id: "primary-image-" + id }
                }
            } : undefined,
            colors: {
                deleteMany: {}, // Clean existing colors
                create: colors.map((c: any) => ({
                    name: c.name,
                    hexCode: c.hexCode,
                    imageUrl: c.imageUrl
                }))
            }
        },
    });

    revalidatePath("/admin/produtos");
    revalidatePath("/produtos");
    redirect("/admin/produtos");
}
