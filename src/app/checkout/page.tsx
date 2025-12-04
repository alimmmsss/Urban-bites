"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";
import { useCreateOrder } from "@/hooks/useApi";
import { Header } from "@/components/Header";

export default function CheckoutPage() {
    const { user, isSignedIn, isLoaded } = useUser();
    const { items, total, clearCart } = useCart();
    const { mutate: createOrder, isPending } = useCreateOrder();

    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        notes: "",
    });

    // Pre-fill name and email from Clerk user
    const customerName = customerInfo.name || user?.fullName || user?.firstName || "";
    const customerEmail = user?.primaryEmailAddress?.emailAddress || "";

    const handlePlaceOrder = () => {
        if (!isSignedIn || items.length === 0) return;

        createOrder(
            {
                customerName: customerName,
                customerEmail: customerEmail,
                customerPhone: customerInfo.phone || undefined,
                items: items.map((item) => ({
                    menuItemId: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
            {
                onSuccess: (data) => {
                    setOrderSuccess(true);
                    setOrderId(data.id);
                    clearCart();
                },
            }
        );
    };

    // Loading state
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

    // Order Success
    if (orderSuccess) {
        return (
            <>
                <Header />
                <div className="pt-32 pb-24 min-h-screen bg-stone-50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="font-serif text-3xl font-bold mb-4">Order Placed!</h1>
                            <p className="text-stone-600 mb-2">Thank you for your order, {customerName}!</p>
                            <p className="text-stone-500 mb-6">
                                Order ID: <span className="font-mono text-orange-600">{orderId?.slice(0, 8)}...</span>
                            </p>
                            <p className="text-stone-500 mb-8">
                                We'll start preparing your food right away. You can track your order status.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link
                                    href="/menu"
                                    className="px-6 py-3 bg-stone-100 text-stone-700 rounded-lg font-medium hover:bg-stone-200"
                                >
                                    Back to Menu
                                </Link>
                                <Link
                                    href="/orders"
                                    className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700"
                                >
                                    View My Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Not signed in
    if (!isSignedIn) {
        return (
            <>
                <Header />
                <div className="pt-32 pb-24 min-h-screen bg-stone-50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="font-serif text-3xl font-bold mb-4">Sign In to Checkout</h1>
                            <p className="text-stone-600 mb-8">
                                Please sign in to complete your order. Your cart will be saved.
                            </p>
                            <SignInButton mode="modal">
                                <button className="w-full py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                                    Sign In to Continue
                                </button>
                            </SignInButton>
                            <Link
                                href="/menu"
                                className="block mt-4 text-stone-500 hover:text-stone-700"
                            >
                                ← Back to Menu
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Empty cart
    if (items.length === 0) {
        return (
            <>
                <Header />
                <div className="pt-32 pb-24 min-h-screen bg-stone-50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 9m2-9h10m-10 0L5 4M7 22a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
                                </svg>
                            </div>
                            <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
                            <p className="text-stone-600 mb-8">
                                Add some delicious items from our menu to get started!
                            </p>
                            <Link
                                href="/menu"
                                className="inline-block px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700"
                            >
                                Browse Menu
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Checkout form
    return (
        <>
            <Header />
            <div className="pt-32 pb-24 min-h-screen bg-stone-50">
                <div className="container mx-auto px-6">
                    <h1 className="font-serif text-4xl font-bold text-center mb-12">Checkout</h1>

                    <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
                        {/* Order Summary */}
                        <div className="md:col-span-3 bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-3 bg-stone-50 rounded-lg">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.name}</h4>
                                            <p className="text-stone-500 text-sm">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-stone-600">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-stone-600">
                                    <span>Tax (10%)</span>
                                    <span>${(total * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                                    <span>Total</span>
                                    <span className="text-orange-600">${(total * 1.1).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Customer Details */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="font-serif text-2xl mb-6">Your Details</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={customerInfo.name || user?.fullName || ""}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                            placeholder={user?.fullName || "Your name"}
                                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={customerEmail}
                                            disabled
                                            className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-stone-50 text-stone-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">
                                            Phone (optional)
                                        </label>
                                        <input
                                            type="tel"
                                            value={customerInfo.phone}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">
                                            Special Instructions
                                        </label>
                                        <textarea
                                            value={customerInfo.notes}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                                            placeholder="Any allergies or special requests..."
                                            rows={3}
                                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={isPending}
                                className="w-full py-4 bg-orange-600 text-white rounded-xl font-semibold text-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isPending ? "Placing Order..." : `Place Order • $${(total * 1.1).toFixed(2)}`}
                            </button>

                            <p className="text-center text-stone-500 text-sm">
                                By placing your order, you agree to our terms of service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
