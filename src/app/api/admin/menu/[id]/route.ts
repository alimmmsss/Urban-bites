import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PATCH /api/admin/menu/[id] - Update menu item (including stock toggle)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const menuItem = await prisma.menuItem.update({
            where: { id },
            data: body,
        });

        return NextResponse.json({
            success: true,
            data: menuItem,
            message: "Menu item updated successfully",
        });
    } catch (error) {
        console.error("Failed to update menu item:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update menu item" },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/menu/[id] - Delete menu item
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.menuItem.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Menu item deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete menu item:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete menu item" },
            { status: 500 }
        );
    }
}

// GET /api/admin/menu/[id] - Get single menu item
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const menuItem = await prisma.menuItem.findUnique({
            where: { id },
        });

        if (!menuItem) {
            return NextResponse.json(
                { success: false, error: "Menu item not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: menuItem,
        });
    } catch (error) {
        console.error("Failed to fetch menu item:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch menu item" },
            { status: 500 }
        );
    }
}
