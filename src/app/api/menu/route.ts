import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/menu - Fetch all available menu items
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        const menuItems = await prisma.menuItem.findMany({
            where: {
                isAvailable: true,
                ...(category && { category }),
            },
            orderBy: {
                createdAt: "asc",
            },
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
