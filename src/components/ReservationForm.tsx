"use client";

import { useState } from "react";
import { useCreateReservation } from "@/hooks/useApi";

export function ReservationForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        partySize: "2",
        notes: "",
    });
    const [success, setSuccess] = useState(false);

    const { mutate: createReservation, isPending, error } = useCreateReservation();

    // Get tomorrow's date as minimum
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createReservation(
            {
                name: formData.name,
                email: formData.email,
                phone: formData.phone || undefined,
                date: formData.date,
                time: formData.time,
                partySize: parseInt(formData.partySize),
                notes: formData.notes || undefined,
            },
            {
                onSuccess: () => {
                    setSuccess(true);
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        date: "",
                        time: "",
                        partySize: "2",
                        notes: "",
                    });
                    setTimeout(() => setSuccess(false), 5000);
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    ✓ Reservation confirmed! We'll see you soon.
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error.message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                        Email *
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                        Phone
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="+1 (555) 000-0000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                        Party Size *
                    </label>
                    <select
                        required
                        value={formData.partySize}
                        onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>
                                {n} {n === 1 ? "Guest" : "Guests"}
                            </option>
                        ))}
                        <option value="11">10+ Guests</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                        Date *
                    </label>
                    <input
                        type="date"
                        required
                        min={minDate}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                        Time *
                    </label>
                    <select
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                        <option value="">Select a time</option>
                        {["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                    Special Requests
                </label>
                <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Allergies, dietary restrictions, special occasions..."
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-orange-600 text-white rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? "Booking..." : "Reserve Table"}
            </button>
        </form>
    );
}
