"use client";

import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";

const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PREPARING: "bg-blue-100 text-blue-800",
    READY: "bg-green-100 text-green-800",
    COMPLETED: "bg-stone-100 text-stone-800",
};

const statusIcons = {
    PENDING: "⏳",
    PREPARING: "👨‍🍳",
    READY: "✅",
    COMPLETED: "🎉",
};

export default function OrdersPage() {
    const { user, isSignedIn, isLoaded } = useUser();

    const { data: orders, isLoading } = useQuery({
        queryKey: ["my-orders", user?.primaryEmailAddress?.emailAddress],
        queryFn: async () => {
            const email = user?.primaryEmailAddress?.emailAddress;
            if (!email) return [];
            const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
            const data = await res.json();
            return data.data || [];
        },
        enabled: isSignedIn && !!user?.primaryEmailAddress,
        refetchInterval: 10000, // Refresh every 10 seconds to get status updates
    });

    if (!isLoaded) {
        return (
            <>
                <Header />
                <div className="pt-32 pb-24 min-h-screen bg-stone-50">
                    <div className="container mx-auto px-6 text-center">
                        <p>Loading...</p>
                    </div>
                </div>
            </>
        );
    }

    if (!isSignedIn) {
        return (
            <>
                <Header />
                <Cart />
                <div className="pt-32 pb-24 min-h-screen bg-stone-50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="font-serif text-3xl font-bold mb-4">Sign In to View Orders</h1>
                            <p className="text-stone-600 mb-8">
                                Sign in to see your order history and track current orders.
                            </p>
                            <SignInButton mode="modal">
                                <button className="w-full py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <Cart />
            <div className="pt-32 pb-24 min-h-screen bg-stone-50">
                <div className="container mx-auto px-6">
                    <h1 className="font-serif text-4xl font-bold text-center mb-4">My Orders</h1>
                    <p className="text-stone-500 text-center mb-12">Track your orders and view history</p>

                    {isLoading ? (
                        <div className="text-center py-12">Loading orders...</div>
                    ) : orders?.length === 0 ? (
                        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="text-6xl mb-4">🍽️</div>
                            <h2 className="font-serif text-2xl font-bold mb-4">No Orders Yet</h2>
                            <p className="text-stone-600 mb-8">
                                You haven't placed any orders yet. Start by browsing our menu!
                            </p>
                            <Link
                                href="/menu"
                                className="inline-block px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700"
                            >
                                Browse Menu
                            </Link>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto space-y-6">
                            {orders?.map((order: any) => (
                                <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    {/* Order Header */}
                                    <div className="p-6 border-b flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-stone-500">
                                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                            <p className="font-mono text-sm text-stone-400">
                                                ID: {order.id.slice(0, 8)}...
                                            </p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                                            {statusIcons[order.status as keyof typeof statusIcons]} {order.status}
                                        </span>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-6">
                                        <div className="space-y-3">
                                            {(order.items as any[]).map((item, index) => (
                                                <div key={index} className="flex justify-between">
                                                    <span>
                                                        <span className="font-medium">{item.quantity}x</span> {item.name}
                                                    </span>
                                                    <span className="text-stone-600">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span className="text-orange-600">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Status Message */}
                                    {order.status === "PENDING" && (
                                        <div className="px-6 pb-6">
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                                                ⏳ Your order has been received and is waiting to be prepared.
                                            </div>
                                        </div>
                                    )}
                                    {order.status === "PREPARING" && (
                                        <div className="px-6 pb-6">
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                                                👨‍🍳 Our chefs are preparing your delicious meal!
                                            </div>
                                        </div>
                                    )}
                                    {order.status === "READY" && (
                                        <div className="px-6 pb-6">
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                                                ✅ Your order is ready! Please pick it up at the counter.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
