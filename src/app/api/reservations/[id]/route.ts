import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PATCH /api/reservations/[id] - Update reservation status
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        // Validate status
        const validStatuses = ["CONFIRMED", "CANCELLED"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, error: "Invalid status" },
                { status: 400 }
            );
        }

        const reservation = await prisma.reservation.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json({
            success: true,
            data: reservation,
            message: `Reservation ${status.toLowerCase()}`,
        });
    } catch (error) {
        console.error("Failed to update reservation:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update reservation" },
            { status: 500 }
        );
    }
}

// DELETE /api/reservations/[id] - Cancel reservation
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.reservation.update({
            where: { id },
            data: { status: "CANCELLED" },
        });

        return NextResponse.json({
            success: true,
            message: "Reservation cancelled",
        });
    } catch (error) {
        console.error("Failed to cancel reservation:", error);
        return NextResponse.json(
            { success: false, error: "Failed to cancel reservation" },
            { status: 500 }
        );
    }
}
