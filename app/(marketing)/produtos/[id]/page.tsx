import prisma from "@/lib/prisma";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import { notFound } from "next/navigation";

export const revalidate = 0; // Ensure fresh data

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductIdPage({ params }: PageProps) {
    const { id } = await params;

    // 1. Fetch main product
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            colors: true,
            images: true,
        },
    });

    if (!product) {
        notFound();
    }

    // 2. Fetch related products from the same category
    const relatedProducts = await prisma.product.findMany({
        where: {
            category: product.category,
            id: { not: id }, // Exclude the current product
        },
        include: {
            images: true,
        },
        take: 4,
    });

    return (
        <main className="min-h-screen">
            <ProductDetailsClient
                product={product}
                relatedProducts={relatedProducts}
            />
        </main>
    );
}
