"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from "react";

// ============================================
// TYPES
// ============================================
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    total: number;
}

type CartAction =
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: string }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "CLEAR_CART" }
    | { type: "LOAD_CART"; payload: CartState };

// ============================================
// REDUCER
// ============================================
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                const updatedItems = state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return {
                    items: updatedItems,
                    total: calculateTotal(updatedItems),
                };
            }

            const newItems = [...state.items, { ...action.payload, quantity: 1 }];
            return {
                items: newItems,
                total: calculateTotal(newItems),
            };
        }

        case "REMOVE_ITEM": {
            const newItems = state.items.filter((item) => item.id !== action.payload);
            return {
                items: newItems,
                total: calculateTotal(newItems),
            };
        }

        case "UPDATE_QUANTITY": {
            if (action.payload.quantity <= 0) {
                const newItems = state.items.filter(
                    (item) => item.id !== action.payload.id
                );
                return {
                    items: newItems,
                    total: calculateTotal(newItems),
                };
            }

            const updatedItems = state.items.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return {
                items: updatedItems,
                total: calculateTotal(updatedItems),
            };
        }

        case "CLEAR_CART":
            return { items: [], total: 0 };

        case "LOAD_CART":
            return action.payload;

        default:
            return state;
    }
}

function calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// ============================================
// CONTEXT
// ============================================
interface CartContextType {
    items: CartItem[];
    total: number;
    itemCount: number;
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ============================================
// PROVIDER WITH PERSISTENCE
// ============================================
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("urban-bites-cart");
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                dispatch({ type: "LOAD_CART", payload: parsed });
            } catch (e) {
                console.error("Failed to load cart from localStorage");
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem("urban-bites-cart", JSON.stringify(state));
    }, [state]);

    const addItem = (item: Omit<CartItem, "quantity">) => {
        dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
    };

    const removeItem = (id: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                total: state.total,
                itemCount,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// ============================================
// HOOK
// ============================================
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
