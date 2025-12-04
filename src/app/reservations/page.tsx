import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";
import { ReservationForm } from "@/components/ReservationForm";

export const metadata = {
    title: "Reservations | Urban Bites",
    description: "Book your table at Urban Bites for an unforgettable dining experience.",
};

export default function ReservationsPage() {
    return (
        <>
            <Header />
            <Cart />

            <main className="pt-32 pb-24 bg-stone-50">
                <div className="container mx-auto px-6">
                    {/* Page Header */}
                    <div className="text-center mb-16">
                        <h1 className="font-serif text-5xl mb-4">Book a Table</h1>
                        <p className="text-stone-500 max-w-xl mx-auto">
                            Reserve your spot for an unforgettable dining experience. We look forward to hosting you.
                        </p>
                    </div>

                    {/* Reservation Form */}
                    <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                        <ReservationForm />
                    </div>

                    {/* Info Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
                        <div className="text-center p-6">
                            <div className="text-3xl mb-2">📍</div>
                            <h3 className="font-semibold mb-1">Location</h3>
                            <p className="text-stone-500 text-sm">123 Culinary Street<br />New York, NY 10001</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-3xl mb-2">🕐</div>
                            <h3 className="font-semibold mb-1">Hours</h3>
                            <p className="text-stone-500 text-sm">Mon-Thu: 5PM - 10PM<br />Fri-Sun: 5PM - 11PM</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-3xl mb-2">📞</div>
                            <h3 className="font-semibold mb-1">Contact</h3>
                            <p className="text-stone-500 text-sm">+1 (555) 123-4567<br />hello@urbanbites.com</p>
                        </div>
                    </div>
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
