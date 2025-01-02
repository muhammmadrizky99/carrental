"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const LihatReview: React.FC = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
    const [mobilList, setMobilList] = useState<any[]>([]);
    const [selectedMobil, setSelectedMobil] = useState<string>(""); // Mobil filter
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await api.get("/api/booking");
                const data = response.data.data;

                setBookings(data);
                setFilteredBookings(data); // Initialize filtered bookings
                // Extract unique mobil names
                const uniqueMobil = Array.from(new Set(data.map((b: any) => b.mobil.namaMobil)));
                setMobilList(uniqueMobil);
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Gagal mengambil data booking.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleViewReviews = async (bookingId: number) => {
        try {
            const response = await api.get(`/api/review/${bookingId}`);
            const reviews = response.data.reviews;

            if (reviews.length === 0) {
                Swal.fire({
                    icon: "info",
                    title: "Tidak Ada Review",
                    text: "Tidak ada review untuk booking ini.",
                });
            } else {
                const reviewContent = reviews
                    .map(
                        (review: any) => ` 
                        <div style="
                            border: 1px solid #e5e5e5;
                            border-radius: 8px;
                            padding: 10px;
                            margin-bottom: 10px;
                            background-color: #f9f9f9;
                        ">
                            <p><strong>Rating:</strong> ${review.rating} ⭐</p>
                            <p><strong>Komentar:</strong> ${review.komentar}</p>
                        </div>
                    `
                    )
                    .join("");

                Swal.fire({
                    icon: "info",
                    title: "Review",
                    html: `
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${reviewContent}
                    </div>
                `,
                    confirmButtonText: "Tutup",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Belum ada review.",
            });
        }
    };

    const handleFilter = (mobilName: string) => {
        setSelectedMobil(mobilName);
        if (mobilName === "") {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((b) => b.mobil.namaMobil === mobilName);
            setFilteredBookings(filtered);
        }
    };

    const handleDeleteBooking = async (bookingId: number) => {
        try {
            // Show confirmation alert before deleting
            const result = await Swal.fire({
                title: "Yakin ingin menghapus?",
                text: "Data ini akan dihapus secara permanen.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Hapus",
                cancelButtonText: "Batal",
            });

            if (result.isConfirmed) {
                // Make API call to delete the booking
                await api.delete(`/api/booking/${bookingId}`);
                // Refresh bookings after deletion
                setBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking.id !== bookingId)
                );
                setFilteredBookings((prevFilteredBookings) =>
                    prevFilteredBookings.filter((booking) => booking.id !== bookingId)
                );
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Booking berhasil dihapus.",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal menghapus booking. Silahkan hapus data lainnya terkait booking ini terlebih dahulu.",
            });
        }
    };

    if (loading) {
        Swal.fire({
            title: "Loading",
            text: "Mengambil data booking...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        return null; // Prevent rendering during loading
    }
    Swal.close(); // Close loading SweetAlert when done

    return (
        <div className="rounded-sm border p-6 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <label htmlFor="mobilFilter" className="block mb-2 font-medium">
                        Filter berdasarkan Mobil:
                    </label>
                    <select
                        id="mobilFilter"
                        className="border rounded-md px-4 py-2"
                        value={selectedMobil}
                        onChange={(e) => handleFilter(e.target.value)}
                    >
                        <option value="">Semua Mobil</option>
                        {mobilList.map((mobil, index) => (
                            <option key={index} value={mobil}>
                                {mobil}
                            </option>
                        ))}
                    </select>
                </div>

                {filteredBookings.length === 0 ? (
                    <p>Tidak ada data booking untuk filter yang dipilih.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="px-4 py-2">Mobil</th>
                                    <th className="px-4 py-2">Nama Pengguna</th>
                                    <th className="px-4 py-2">Tanggal Mulai</th>
                                    <th className="px-4 py-2">Tanggal Selesai</th>
                                    <th className="px-4 py-2">Status Pesanan</th>
                                    <th className="px-4 py-2">Lihat Review</th>
                                    <th className="px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="border-b">
                                        <td className="px-4 py-2">{booking.mobil.namaMobil}</td>
                                        <td className="px-4 py-2">{booking.pengguna?.nama || "User not found"}</td>
                                        <td className="px-4 py-2">
                                            {new Date(booking.tglMulai).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            {new Date(booking.tglSelesai).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="px-3 bg-blue-400 text-white rounded-md">
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="px-3 py-1 text-white rounded-md bg-gray-400 flex items-center justify-center"
                                                onClick={() => handleViewReviews(booking.id)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faComment}
                                                    className="mr-2"
                                                    size="lg"
                                                />
                                                Lihat Review
                                            </button>
                                        </td>
                                        <td className="px-4 py-2">
                                            {booking.status === "selesai" && (
                                                <button
                                                    className="px-3 py-1 text-white rounded-md bg-red-500"
                                                    onClick={() => handleDeleteBooking(booking.id)}
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LihatReview;
