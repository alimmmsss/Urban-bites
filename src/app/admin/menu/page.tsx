"use client";

import Image from "next/image";
import { useState } from "react";
import { useAdminMenuItems, useToggleStock } from "@/hooks/useApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Type for menu item
interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isAvailable: boolean;
}

export default function MenuManagerPage() {
    const queryClient = useQueryClient();
    const { data: menuItems, isLoading } = useAdminMenuItems();
    const { mutate: toggleStock, isPending } = useToggleStock();
    const [showAddForm, setShowAddForm] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        price: "",
        category: "Starters",
        image: "",
    });

    // Edit state
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [editForm, setEditForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async (data: { id: string; updates: Partial<MenuItem> }) => {
            const res = await fetch(`/api/admin/menu/${data.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data.updates),
            });
            if (!res.ok) throw new Error("Failed to update");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "menu"] });
            queryClient.invalidateQueries({ queryKey: ["menu"] });
            setEditingItem(null);
        },
    });

    // Open edit modal with item data
    const handleEditClick = (item: MenuItem) => {
        setEditingItem(item);
        setEditForm({
            name: item.name,
            description: item.description,
            price: item.price.toString(),
            category: item.category,
            image: item.image,
        });
    };

    // Save edited item
    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;

        updateMutation.mutate({
            id: editingItem.id,
            updates: {
                name: editForm.name,
                description: editForm.description,
                price: parseFloat(editForm.price),
                category: editForm.category,
                image: editForm.image,
            },
        });
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/admin/menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
        });
        if (res.ok) {
            setNewItem({ name: "", description: "", price: "", category: "Starters", image: "" });
            setShowAddForm(false);
            queryClient.invalidateQueries({ queryKey: ["admin", "menu"] });
        }
    };

    if (isLoading) {
        return <div className="text-center py-12">Loading menu items...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold">Menu Manager</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700"
                >
                    {showAddForm ? "Cancel" : "+ Add Item"}
                </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <form onSubmit={handleAddItem} className="bg-white p-6 rounded-xl shadow-sm mb-8">
                    <h2 className="text-xl font-semibold mb-4">Add New Menu Item</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <select
                            value={newItem.category}
                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        >
                            <option>Starters</option>
                            <option>Mains</option>
                            <option>Desserts</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Price"
                            required
                            step="0.01"
                            value={newItem.price}
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="url"
                            placeholder="Image URL"
                            required
                            value={newItem.image}
                            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <textarea
                            placeholder="Description"
                            required
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            className="col-span-2 px-4 py-2 border rounded-lg"
                            rows={2}
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
                    >
                        Add Item
                    </button>
                </form>
            )}

            {/* Menu Items Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-stone-50 border-b">
                        <tr>
                            <th className="text-left px-6 py-4 font-semibold">Item</th>
                            <th className="text-left px-6 py-4 font-semibold">Category</th>
                            <th className="text-left px-6 py-4 font-semibold">Price</th>
                            <th className="text-left px-6 py-4 font-semibold">Stock Status</th>
                            <th className="text-left px-6 py-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems?.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-stone-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-stone-500 text-sm line-clamp-1">{item.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-stone-100 rounded-full text-sm">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium">${item.price}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => toggleStock({ id: item.id, isAvailable: !item.isAvailable })}
                                        disabled={isPending}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${item.isAvailable
                                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                                            : "bg-red-100 text-red-700 hover:bg-red-200"
                                            }`}
                                    >
                                        {item.isAvailable ? "✓ In Stock" : "✗ Out of Stock"}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleEditClick(item)}
                                        className="text-orange-600 hover:text-orange-700 font-medium"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setEditingItem(null)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif font-bold">Edit Menu Item</h2>
                            <button
                                onClick={() => setEditingItem(null)}
                                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Preview Image */}
                        {editForm.image && (
                            <div className="relative w-full h-40 rounded-lg overflow-hidden mb-6">
                                <Image
                                    src={editForm.image}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <form onSubmit={handleSaveEdit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        step="0.01"
                                        min="0"
                                        value={editForm.price}
                                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={editForm.category}
                                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    >
                                        <option>Starters</option>
                                        <option>Mains</option>
                                        <option>Desserts</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={editForm.image}
                                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingItem(null)}
                                    className="flex-1 px-4 py-3 border border-stone-300 text-stone-700 rounded-lg font-medium hover:bg-stone-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updateMutation.isPending}
                                    className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
                                >
                                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                                </button>
                            </div>

                            {updateMutation.isError && (
                                <p className="text-red-500 text-sm text-center">
                                    Failed to update. Please try again.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
