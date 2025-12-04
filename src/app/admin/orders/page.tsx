"use client";

import { useActiveOrders, useUpdateOrderStatus } from "@/hooks/useApi";

const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PREPARING: "bg-blue-100 text-blue-800",
    READY: "bg-green-100 text-green-800",
    COMPLETED: "bg-stone-100 text-stone-800",
};

const nextStatus = {
    PENDING: "PREPARING",
    PREPARING: "READY",
    READY: "COMPLETED",
} as const;

export default function KitchenViewPage() {
    const { data: orders, isLoading } = useActiveOrders();
    const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

    if (isLoading) {
        return <div className="text-center py-12">Loading orders...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold">Kitchen View</h1>
                <p className="text-stone-500">Auto-refreshes every 10 seconds</p>
            </div>

            {orders?.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl">
                    <p className="text-6xl mb-4">👨‍🍳</p>
                    <p className="text-xl text-stone-500">No active orders</p>
                    <p className="text-stone-400">New orders will appear here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders?.map((order) => (
                        <div
                            key={order.id}
                            className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${order.status === "PENDING"
                                    ? "border-yellow-500"
                                    : order.status === "PREPARING"
                                        ? "border-blue-500"
                                        : "border-green-500"
                                }`}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-semibold text-lg">{order.customerName}</p>
                                    <p className="text-stone-500 text-sm">
                                        {new Date(order.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                                    {order.status}
                                </span>
                            </div>

                            {/* Items */}
                            <div className="space-y-2 mb-4 border-t border-b py-4">
                                {(order.items as any[]).map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span>
                                            <span className="font-medium">{item.quantity}x</span> {item.name}
                                        </span>
                                        <span className="text-stone-500">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between font-semibold mb-4">
                                <span>Total</span>
                                <span className="text-orange-600">${order.total.toFixed(2)}</span>
                            </div>

                            {/* Action Button */}
                            {order.status !== "COMPLETED" && (
                                <button
                                    onClick={() =>
                                        updateStatus({
                                            id: order.id,
                                            status: nextStatus[order.status as keyof typeof nextStatus],
                                        })
                                    }
                                    disabled={isPending}
                                    className={`w-full py-3 rounded-lg font-medium transition-colors ${order.status === "PENDING"
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : order.status === "PREPARING"
                                                ? "bg-green-600 text-white hover:bg-green-700"
                                                : "bg-stone-600 text-white hover:bg-stone-700"
                                        }`}
                                >
                                    {order.status === "PENDING" && "Start Preparing"}
                                    {order.status === "PREPARING" && "Mark Ready"}
                                    {order.status === "READY" && "Complete Order"}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
