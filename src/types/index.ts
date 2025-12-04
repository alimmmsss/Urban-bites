// ============================================
// MENU ITEM TYPES
// ============================================
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type MenuItemInput = Omit<MenuItem, "id" | "createdAt" | "updatedAt">;

// ============================================
// ORDER TYPES
// ============================================
export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "COMPLETED";

export interface OrderItem {
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    total: number;
    status: OrderStatus;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateOrderInput {
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    items: OrderItem[];
}

// ============================================
// RESERVATION TYPES
// ============================================
export type ReservationStatus = "CONFIRMED" | "CANCELLED";

export interface Reservation {
    id: string;
    name: string;
    email: string;
    phone?: string;
    date: Date;
    time: string;
    partySize: number;
    notes?: string;
    status: ReservationStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateReservationInput {
    name: string;
    email: string;
    phone?: string;
    date: Date;
    time: string;
    partySize: number;
    notes?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
