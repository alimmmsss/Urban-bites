import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PATCH /api/orders/[id] - Update order status
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        // Validate status
        const validStatuses = ["PENDING", "PREPARING", "READY", "COMPLETED"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, error: "Invalid status" },
                { status: 400 }
            );
        }

        const order = await prisma.order.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json({
            success: true,
            data: order,
            message: `Order status updated to ${status}`,
        });
    } catch (error) {
        console.error("Failed to update order:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update order" },
            { status: 500 }
        );
    }
}

// GET /api/orders/[id] - Get single order
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const order = await prisma.order.findUnique({
            where: { id },
        });

        if (!order) {
            return NextResponse.json(
                { success: false, error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error("Failed to fetch order:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch order" },
            { status: 500 }
        );
    }
}
