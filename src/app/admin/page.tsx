import Link from "next/link";
import prisma from "@/lib/prisma";

async function getStats() {
    const [menuCount, orderCount, reservationCount, pendingOrders] = await Promise.all([
        prisma.menuItem.count(),
        prisma.order.count(),
        prisma.reservation.count({ where: { status: "CONFIRMED" } }),
        prisma.order.count({ where: { status: "PENDING" } }),
    ]);
    return { menuCount, orderCount, reservationCount, pendingOrders };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-3xl mb-2">🍽️</div>
                    <p className="text-stone-500 text-sm">Menu Items</p>
                    <p className="text-3xl font-bold">{stats.menuCount}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-3xl mb-2">📦</div>
                    <p className="text-stone-500 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold">{stats.orderCount}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-3xl mb-2">⏳</div>
                    <p className="text-stone-500 text-sm">Pending Orders</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-3xl mb-2">📅</div>
                    <p className="text-stone-500 text-sm">Reservations</p>
                    <p className="text-3xl font-bold">{stats.reservationCount}</p>
                </div>
            </div>

            {/* Quick Links */}
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                    href="/admin/menu"
                    className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                    <span className="text-2xl">➕</span>
                    <div>
                        <p className="font-semibold">Add Menu Item</p>
                        <p className="text-stone-500 text-sm">Add new dishes to the menu</p>
                    </div>
                </Link>
                <Link
                    href="/admin/orders"
                    className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                    <span className="text-2xl">👨‍🍳</span>
                    <div>
                        <p className="font-semibold">Kitchen View</p>
                        <p className="text-stone-500 text-sm">Manage incoming orders</p>
                    </div>
                </Link>
                <Link
                    href="/admin/reservations"
                    className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                    <span className="text-2xl">📋</span>
                    <div>
                        <p className="font-semibold">View Reservations</p>
                        <p className="text-stone-500 text-sm">See upcoming bookings</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
