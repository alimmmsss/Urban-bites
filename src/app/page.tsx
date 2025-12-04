import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";

export default function HomePage() {
    return (
        <>
            <Header />
            <Cart />

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80"
                        alt="Delicious food"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                        Urban<span className="text-orange-500">Bites</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        Experience exceptional cuisine in the heart of the city
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                        <Link
                            href="/menu"
                            className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                        >
                            View Menu
                        </Link>
                        <Link
                            href="/reservations"
                            className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-stone-900 transition-colors"
                        >
                            Book a Table
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="font-serif text-4xl text-center mb-16">Why Choose Us</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: "🍳",
                                title: "Fresh Ingredients",
                                description: "We source only the finest local and seasonal ingredients for every dish."
                            },
                            {
                                icon: "👨‍🍳",
                                title: "Expert Chefs",
                                description: "Our culinary team brings decades of experience from world-renowned kitchens."
                            },
                            {
                                icon: "🌟",
                                title: "Premium Experience",
                                description: "From ambiance to service, every detail is crafted for your enjoyment."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="font-serif text-2xl mb-2">{feature.title}</h3>
                                <p className="text-stone-500">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-stone-900 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="font-serif text-4xl mb-6">Ready to Dine with Us?</h2>
                    <p className="text-stone-300 mb-8 max-w-xl mx-auto">
                        Reserve your table today and experience a memorable culinary journey.
                    </p>
                    <Link
                        href="/reservations"
                        className="inline-block px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                    >
                        Make a Reservation
                    </Link>
                </div>
            </section>

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
