import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// GET: Get single product by ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: { colors: true, images: true },
        });

        if (!product) {
            return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("GET product error:", error);
        return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
    }
}

// PUT: Update product (ADMIN only)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== "ADMIN") {
            return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
        }

        const { id } = await params;
        const body = await req.json();

        // Delete existing colors and images to recreate them
        await prisma.productColor.deleteMany({ where: { productId: id } });
        await prisma.productImage.deleteMany({ where: { productId: id } });

        const product = await prisma.product.update({
            where: { id },
            data: {
                name: body.name,
                description: body.description || null,
                price: body.price,
                oldPrice: body.oldPrice || null,
                category: body.category,
                badge: body.badge || null,
                location: body.location || null,
                sellerPhone: body.sellerPhone || null,
                pdfUrl: body.pdfUrl || null,
                stock: body.stock || 0,
                deliveryDays: body.deliveryDays || null,
                colors: {
                    create: (body.colors || []).map((c: any) => ({
                        name: c.name,
                        hexCode: c.hexCode,
                    })),
                },
                images: {
                    create: (body.images || []).map((img: any) => ({
                        url: img.url,
                        alt: img.alt || null,
                        isPrimary: img.isPrimary || false,
                    })),
                },
            },
            include: { colors: true, images: true },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("PUT product error:", error);
        return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
    }
}

// DELETE: Delete product (ADMIN only)
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== "ADMIN") {
            return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
        }

        const { id } = await params;

        await prisma.product.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE product error:", error);
        return NextResponse.json({ error: "Erro ao excluir produto" }, { status: 500 });
    }
}
