import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/menu - Fetch ALL menu items (including unavailable)
export async function GET() {
    try {
        const menuItems = await prisma.menuItem.findMany({
            orderBy: [
                { category: "asc" },
                { createdAt: "asc" },
            ],
        });

        return NextResponse.json({
            success: true,
            data: menuItems,
        });
    } catch (error) {
        console.error("Failed to fetch menu:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch menu items" },
            { status: 500 }
        );
    }
}

// POST /api/admin/menu - Add new menu item
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, price, category, image, isAvailable = true } = body;

        // Validate required fields
        if (!name || !description || !price || !category || !image) {
            return NextResponse.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        const menuItem = await prisma.menuItem.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                category,
                image,
                isAvailable,
            },
        });

        return NextResponse.json({
            success: true,
            data: menuItem,
            message: "Menu item added successfully",
        });
    } catch (error) {
        console.error("Failed to create menu item:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create menu item" },
            { status: 500 }
        );
    }
}
