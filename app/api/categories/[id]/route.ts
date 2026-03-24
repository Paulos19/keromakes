import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// GET: Get single category by ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error("GET category error:", error);
        return NextResponse.json({ error: "Erro ao buscar categoria" }, { status: 500 });
    }
}

// PUT: Update category (ADMIN only)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== "ADMIN") {
            return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
        }

        const { id } = await params;
        const body = await req.json();

        const category = await prisma.category.update({
            where: { id },
            data: {
                name: body.name,
                description: body.description || null,
                imageUrl: body.imageUrl || null,
                order: body.order || 0,
                isActive: body.isActive ?? true,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error("PUT category error:", error);
        return NextResponse.json({ error: "Erro ao atualizar categoria" }, { status: 500 });
    }
}

// DELETE: Delete category (ADMIN only)
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== "ADMIN") {
            return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
        }

        const { id } = await params;

        // Check if there are products in this category
        const productsCount = await prisma.product.count({
            where: { categoryRel: { id: id } }
        });

        if (productsCount > 0) {
            return NextResponse.json({
                error: "Não é possível excluir uma categoria que possui produtos vinculados."
            }, { status: 400 });
        }

        await prisma.category.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE category error:", error);
        return NextResponse.json({ error: "Erro ao excluir categoria" }, { status: 500 });
    }
}
