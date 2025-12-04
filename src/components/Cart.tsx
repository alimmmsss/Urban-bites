"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function Cart() {
    const { items, total, itemCount, removeItem, updateQuantity } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Cart Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-all z-40 hover:scale-105"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 9m2-9h10m-10 0L5 4M7 22a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                        {itemCount}
                    </span>
                )}
            </button>

            {/* Cart Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="font-serif text-2xl">Your Cart</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-stone-100 rounded-full"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="text-center py-12 text-stone-500">
                                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 9m2-9h10m-10 0L5 4M7 22a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
                                    </svg>
                                    <p className="text-lg mb-2">Your cart is empty</p>
                                    <p className="text-sm">Add some delicious items from our menu!</p>
                                    <Link
                                        href="/menu"
                                        onClick={() => setIsOpen(false)}
                                        className="inline-block mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                    >
                                        Browse Menu
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-stone-50 rounded-lg">
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium">{item.name}</h4>
                                                <p className="text-orange-600 font-semibold">${item.price}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center font-bold"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center font-bold"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="ml-auto text-red-500 hover:text-red-600 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t p-6 space-y-4">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Subtotal</span>
                                    <span className="text-orange-600">${total.toFixed(2)}</span>
                                </div>
                                <p className="text-stone-500 text-sm">Taxes and fees calculated at checkout</p>
                                <Link
                                    href="/checkout"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full py-4 bg-orange-600 text-white rounded-lg font-semibold text-center hover:bg-orange-700 transition-colors"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
