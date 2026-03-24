import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: List all categories with products
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            include: {
                products: {
                    where: { stock: { gt: 0 } },
                    include: { images: true, colors: true },
                    orderBy: { createdAt: "desc" },
                    take: 8,
                },
            },
            orderBy: { order: "asc" },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error("GET categories error:", error);
        return NextResponse.json({ error: "Erro ao buscar categorias" }, { status: 500 });
    }
}
