"use client";

import { useUpcomingReservations } from "@/hooks/useApi";

export default function ReservationsAdminPage() {
    const { data: reservations, isLoading } = useUpcomingReservations();

    const handleCancel = async (id: string) => {
        if (!confirm("Are you sure you want to cancel this reservation?")) return;

        await fetch(`/api/reservations/${id}`, {
            method: "DELETE",
        });
        window.location.reload();
    };

    if (isLoading) {
        return <div className="text-center py-12">Loading reservations...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold mb-8">Reservations</h1>

            {reservations?.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl">
                    <p className="text-6xl mb-4">📅</p>
                    <p className="text-xl text-stone-500">No upcoming reservations</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-stone-50 border-b">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold">Guest</th>
                                <th className="text-left px-6 py-4 font-semibold">Date & Time</th>
                                <th className="text-left px-6 py-4 font-semibold">Party Size</th>
                                <th className="text-left px-6 py-4 font-semibold">Contact</th>
                                <th className="text-left px-6 py-4 font-semibold">Notes</th>
                                <th className="text-left px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations?.map((reservation) => (
                                <tr key={reservation.id} className="border-b hover:bg-stone-50">
                                    <td className="px-6 py-4 font-medium">{reservation.name}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium">
                                                {new Date(reservation.date).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                            <p className="text-stone-500 text-sm">{reservation.time}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                            {reservation.partySize} {reservation.partySize === 1 ? "guest" : "guests"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm">{reservation.email}</p>
                                        {reservation.phone && (
                                            <p className="text-stone-500 text-sm">{reservation.phone}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-stone-500 max-w-xs truncate">
                                            {reservation.notes || "-"}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleCancel(reservation.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
