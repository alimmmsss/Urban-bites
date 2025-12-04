"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ============================================
// MENU ACTIONS
// ============================================

export async function getMenuItems(category?: string) {
    const items = await prisma.menuItem.findMany({
        where: {
            isAvailable: true,
            ...(category && { category }),
        },
        orderBy: { createdAt: "asc" },
    });
    return items;
}

export async function toggleMenuItemStock(id: string, isAvailable: boolean) {
    const item = await prisma.menuItem.update({
        where: { id },
        data: { isAvailable },
    });
    revalidatePath("/menu");
    revalidatePath("/admin");
    return item;
}

// ============================================
// ORDER ACTIONS
// ============================================

interface OrderItem {
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
}

export async function createOrder(data: {
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    items: OrderItem[];
}) {
    const total = data.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const order = await prisma.order.create({
        data: {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            total,
            items: data.items,
            status: "PENDING",
        },
    });

    revalidatePath("/admin");
    return order;
}

export async function updateOrderStatus(
    id: string,
    status: "PENDING" | "PREPARING" | "READY" | "COMPLETED"
) {
    const order = await prisma.order.update({
        where: { id },
        data: { status },
    });
    revalidatePath("/admin");
    return order;
}

export async function getActiveOrders() {
    return prisma.order.findMany({
        where: {
            status: { in: ["PENDING", "PREPARING", "READY"] },
        },
        orderBy: { createdAt: "desc" },
    });
}

// ============================================
// RESERVATION ACTIONS
// ============================================

export async function createReservation(data: {
    name: string;
    email: string;
    phone?: string;
    date: Date;
    time: string;
    partySize: number;
    notes?: string;
}) {
    // Validate future date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(data.date) < today) {
        throw new Error("Reservation date must be in the future");
    }

    const reservation = await prisma.reservation.create({
        data: {
            ...data,
            status: "CONFIRMED",
        },
    });

    revalidatePath("/admin");
    return reservation;
}

export async function getUpcomingReservations() {
    return prisma.reservation.findMany({
        where: {
            status: "CONFIRMED",
            date: { gte: new Date() },
        },
        orderBy: { date: "asc" },
    });
}

export async function cancelReservation(id: string) {
    const reservation = await prisma.reservation.update({
        where: { id },
        data: { status: "CANCELLED" },
    });
    revalidatePath("/admin");
    return reservation;
}
