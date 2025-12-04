"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/menu", label: "Menu Manager", icon: "🍽️" },
    { href: "/admin/orders", label: "Kitchen View", icon: "👨‍🍳" },
    { href: "/admin/reservations", label: "Reservations", icon: "📅" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-stone-900 text-white">
            <div className="p-6">
                <Link href="/" className="font-serif text-2xl font-bold">
                    Urban<span className="text-orange-500">Bites</span>
                </Link>
                <p className="text-stone-400 text-sm mt-1">Admin Dashboard</p>
            </div>

            <nav className="mt-8">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-6 py-3 transition-colors ${pathname === item.href
                            ? "bg-orange-600 text-white"
                            : "text-stone-300 hover:bg-stone-800"
                            }`}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-stone-700">
                <div className="flex items-center gap-3">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-sm text-stone-300">Admin User</span>
                </div>
            </div>
        </aside>
    );
}
