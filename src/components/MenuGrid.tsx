"use client";

import Image from "next/image";
import { useMenuItems } from "@/hooks/useApi";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface MenuGridProps {
    initialCategory?: string;
}

export function MenuGrid({ initialCategory }: MenuGridProps) {
    const [category, setCategory] = useState<string | undefined>(initialCategory);
    const { data: menuItems, isLoading, error } = useMenuItems(category);
    const { addItem } = useCart();

    const categories = ["Starters", "Mains", "Desserts"];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 h-64 rounded-xl mb-4" />
                        <div className="bg-gray-200 h-6 w-3/4 rounded mb-2" />
                        <div className="bg-gray-200 h-4 w-full rounded" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Failed to load menu items. Please try again.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Category Filter */}
            <div className="flex justify-center gap-4 mb-12">
                <button
                    onClick={() => setCategory(undefined)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${!category
                            ? "bg-orange-600 text-white"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${category === cat
                                ? "bg-orange-600 text-white"
                                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems?.map((item, index) => (
                    <div
                        key={item.id}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-serif text-xl font-semibold text-stone-800">
                                    {item.name}
                                </h3>
                                <span className="text-orange-600 font-bold text-lg">
                                    ${item.price}
                                </span>
                            </div>
                            <p className="text-stone-500 text-sm mb-4 line-clamp-2">
                                {item.description}
                            </p>
                            <button
                                onClick={() =>
                                    addItem({
                                        id: item.id,
                                        name: item.name,
                                        price: item.price,
                                        image: item.image,
                                    })
                                }
                                className="w-full py-3 bg-stone-900 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {menuItems?.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-stone-500">No items found in this category.</p>
                </div>
            )}
        </div>
    );
}
