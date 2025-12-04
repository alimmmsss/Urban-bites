import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/QueryProvider";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "Urban Bites | Fine Dining Experience",
    description: "Experience exceptional cuisine in the heart of the city. Reserve your table today.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
                    <QueryProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </QueryProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
