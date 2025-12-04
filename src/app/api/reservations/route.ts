import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/reservations - Create a new reservation
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, date, time, partySize, notes } = body;

        // Validate required fields
        if (!name || !email || !date || !time || !partySize) {
            return NextResponse.json(
                { success: false, error: "Name, email, date, time, and party size are required" },
                { status: 400 }
            );
        }

        // Validate future date
        const reservationDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (reservationDate < today) {
            return NextResponse.json(
                { success: false, error: "Reservation date must be in the future" },
                { status: 400 }
            );
        }

        const reservation = await prisma.reservation.create({
            data: {
                name,
                email,
                phone,
                date: reservationDate,
                time,
                partySize: parseInt(partySize),
                notes,
                status: "CONFIRMED",
            },
        });

        return NextResponse.json({
            success: true,
            data: reservation,
            message: "Reservation confirmed!",
        });
    } catch (error) {
        console.error("Failed to create reservation:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create reservation" },
            { status: 500 }
        );
    }
}

// GET /api/reservations - Fetch reservations (for admin)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const upcoming = searchParams.get("upcoming") === "true";

        const reservations = await prisma.reservation.findMany({
            where: {
                status: "CONFIRMED",
                ...(upcoming && {
                    date: {
                        gte: new Date(),
                    },
                }),
            },
            orderBy: {
                date: "asc",
            },
        });

        return NextResponse.json({
            success: true,
            data: reservations,
        });
    } catch (error) {
        console.error("Failed to fetch reservations:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch reservations" },
            { status: 500 }
        );
    }
}
