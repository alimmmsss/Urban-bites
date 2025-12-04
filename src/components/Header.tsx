"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { itemCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-4" : "bg-white/90 backdrop-blur-sm py-6"
                }`}
        >
            <nav className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-serif text-2xl font-bold text-stone-800">
                    Urban<span className="text-orange-600">Bites</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-stone-600 hover:text-orange-600 transition-colors">
                        Home
                    </Link>
                    <Link href="/menu" className="text-stone-600 hover:text-orange-600 transition-colors">
                        Menu
                    </Link>
                    <Link href="/about" className="text-stone-600 hover:text-orange-600 transition-colors">
                        About
                    </Link>
                    <Link href="/reservations" className="text-stone-600 hover:text-orange-600 transition-colors">
                        Reservations
                    </Link>

                    <SignedIn>
                        <Link href="/orders" className="text-stone-600 hover:text-orange-600 transition-colors">
                            My Orders
                        </Link>
                        <Link href="/admin" className="text-stone-600 hover:text-orange-600 transition-colors">
                            Admin
                        </Link>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="px-4 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>

                    {/* Cart indicator */}
                    {itemCount > 0 && (
                        <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                            {itemCount} items
                        </span>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
                    <div className="container mx-auto px-6 flex flex-col gap-4">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 hover:text-orange-600 py-2">Home</Link>
                        <Link href="/menu" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 hover:text-orange-600 py-2">Menu</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 hover:text-orange-600 py-2">About</Link>
                        <Link href="/reservations" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 hover:text-orange-600 py-2">Reservations</Link>
                        <SignedIn>
                            <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 hover:text-orange-600 py-2">My Orders</Link>
                            <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 hover:text-orange-600 py-2">Admin</Link>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-orange-600 font-medium py-2 text-left">Sign In</button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            )}
        </header>
    );
}
