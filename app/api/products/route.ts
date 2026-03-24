import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// GET: List all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: { colors: true, images: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("GET products error:", error);
        return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
    }
}

// POST: Create a new product (ADMIN only)
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== "ADMIN") {
            return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
        }

        const body = await req.json();

        const product = await prisma.product.create({
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

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("POST product error:", error);
        return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
    }
}
