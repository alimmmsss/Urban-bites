import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/orders - Create a new order
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, customerEmail, customerPhone, items } = body;

        // Validate required fields
        if (!customerName || !items || items.length === 0) {
            return NextResponse.json(
                { success: false, error: "Customer name and items are required" },
                { status: 400 }
            );
        }

        // Calculate total from items
        const total = items.reduce(
            (sum: number, item: { price: number; quantity: number }) =>
                sum + item.price * item.quantity,
            0
        );

        const order = await prisma.order.create({
            data: {
                customerName,
                customerEmail,
                customerPhone,
                total,
                items,
                status: "PENDING",
            },
        });

        return NextResponse.json({
            success: true,
            data: order,
            message: "Order placed successfully!",
        });
    } catch (error) {
        console.error("Failed to create order:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create order" },
            { status: 500 }
        );
    }
}

// GET /api/orders - Fetch orders (for admin kitchen view or customer)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        const activeOnly = searchParams.get("active") === "true";
        const email = searchParams.get("email");

        const orders = await prisma.order.findMany({
            where: {
                ...(status && { status: status as any }),
                ...(email && { customerEmail: email }),
                ...(activeOnly && {
                    status: {
                        in: ["PENDING", "PREPARING", "READY"],
                    },
                }),
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
