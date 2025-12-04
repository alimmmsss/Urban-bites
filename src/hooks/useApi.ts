import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { MenuItem, Order, Reservation } from "@/types";

// ============================================
// MENU HOOKS
// ============================================
export function useMenuItems(category?: string) {
    return useQuery({
        queryKey: ["menu", category],
        queryFn: async () => {
            const url = category
                ? `/api/menu?category=${encodeURIComponent(category)}`
                : "/api/menu";
            const res = await fetch(url);
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data as MenuItem[];
        },
    });
}

// ============================================
// ORDER HOOKS
// ============================================
export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (orderData: {
            customerName: string;
            customerEmail?: string;
            customerPhone?: string;
            items: Array<{
                menuItemId: string;
                name: string;
                quantity: number;
                price: number;
            }>;
        }) => {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data as Order;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
}

export function useActiveOrders() {
    return useQuery({
        queryKey: ["orders", "active"],
        queryFn: async () => {
            const res = await fetch("/api/orders?active=true");
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data as Order[];
        },
        refetchInterval: 10000, // Refetch every 10 seconds for kitchen view
    });
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const res = await fetch(`/api/orders/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
}

// ============================================
// RESERVATION HOOKS
// ============================================
export function useCreateReservation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reservationData: {
            name: string;
            email: string;
            phone?: string;
            date: string;
            time: string;
            partySize: number;
            notes?: string;
        }) => {
            const res = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservationData),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data as Reservation;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reservations"] });
        },
    });
}

export function useUpcomingReservations() {
    return useQuery({
        queryKey: ["reservations", "upcoming"],
        queryFn: async () => {
            const res = await fetch("/api/reservations?upcoming=true");
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data as Reservation[];
        },
    });
}

// ============================================
// ADMIN MENU HOOKS
// ============================================
export function useAdminMenuItems() {
    return useQuery({
        queryKey: ["admin", "menu"],
        queryFn: async () => {
            const res = await fetch("/api/admin/menu");
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data as MenuItem[];
        },
    });
}

export function useToggleStock() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, isAvailable }: { id: string; isAvailable: boolean }) => {
            const res = await fetch(`/api/admin/menu/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isAvailable }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "menu"] });
            queryClient.invalidateQueries({ queryKey: ["menu"] });
        },
    });
}
