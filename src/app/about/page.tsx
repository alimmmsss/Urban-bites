import Image from "next/image";
import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";

export const metadata = {
    title: "About Us | Urban Bites",
    description: "Learn about Urban Bites - our story, our chefs, and our passion for exceptional cuisine.",
};

export default function AboutPage() {
    const chefs = [
        {
            name: "Marco Rossi",
            role: "Executive Chef",
            image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
            bio: "With 20 years of experience in Michelin-starred restaurants across Europe."
        },
        {
            name: "Sophie Chen",
            role: "Pastry Chef",
            image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=800&q=80",
            bio: "Award-winning pastry chef known for innovative dessert creations."
        },
        {
            name: "James Wilson",
            role: "Sous Chef",
            image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=800&q=80",
            bio: "Specializing in modern interpretations of classic comfort food."
        }
    ];

    return (
        <>
            <Header />
            <Cart />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"
                        alt="Restaurant interior"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Our Story</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        A passion for exceptional cuisine and memorable experiences
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="font-serif text-4xl mb-6">A Culinary Journey</h2>
                            <div className="space-y-4 text-stone-600">
                                <p>
                                    Founded in 2018, Urban Bites was born from a simple yet powerful idea: to create a dining experience that celebrates the artistry of food while honoring the traditions that inspire it.
                                </p>
                                <p>
                                    Our kitchen is led by passionate chefs who believe that every dish tells a story. We source the finest local and seasonal ingredients, partnering with trusted farmers and suppliers who share our commitment to quality.
                                </p>
                                <p>
                                    From the warm ambiance of our dining room to the carefully crafted plates that leave our kitchen, every detail is designed to create moments worth savoring.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-2xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                                alt="Restaurant ambiance"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6">
                    <h2 className="font-serif text-4xl text-center mb-16">Our Values</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: "🌱", title: "Sustainability", desc: "Committed to eco-friendly practices" },
                            { icon: "🤝", title: "Community", desc: "Supporting local producers" },
                            { icon: "✨", title: "Excellence", desc: "Never compromising on quality" },
                            { icon: "❤️", title: "Passion", desc: "Love in every dish we create" },
                        ].map((value, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-xl">
                                <div className="text-4xl mb-3">{value.icon}</div>
                                <h3 className="font-serif text-xl mb-2">{value.title}</h3>
                                <p className="text-stone-500 text-sm">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet Our Chefs */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="font-serif text-4xl text-center mb-16">Meet Our Chefs</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {chefs.map((chef, index) => (
                            <div key={index} className="text-center">
                                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                                    <Image
                                        src={chef.image}
                                        alt={chef.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-serif text-2xl mb-1">{chef.name}</h3>
                                <p className="text-orange-600 font-medium mb-3">{chef.role}</p>
                                <p className="text-stone-500">{chef.bio}</p>
                            </div>
                        ))}
                    </div>
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
