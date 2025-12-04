import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";
import { MenuGrid } from "@/components/MenuGrid";

export const metadata = {
    title: "Menu | Urban Bites",
    description: "Explore our carefully crafted menu featuring starters, mains, and desserts.",
};

export default function MenuPage() {
    return (
        <>
            <Header />
            <Cart />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    {/* Page Header */}
                    <div className="text-center mb-16">
                        <h1 className="font-serif text-5xl mb-4">Our Menu</h1>
                        <p className="text-stone-500 max-w-xl mx-auto">
                            Discover our carefully curated selection of dishes, crafted with passion using the finest ingredients.
                        </p>
                    </div>

                    {/* Dynamic Menu Grid */}
                    <MenuGrid />
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 bg-stone-950 text-stone-400">
                <div className="container mx-auto px-6 text-center">
                    <p className="font-serif text-xl text-white mb-4">Urban<span className="text-orange-500">Bites</span></p>
                    <p className="text-sm">© 2024 Urban Bites. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}
