"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faStar } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const BeriReview: React.FC = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [reviewData, setReviewData] = useState<{
        rating: number;
        komentar: string;
        bookingId: number | null;
    }>({
        rating: 0,
        komentar: "",
        bookingId: null,
    });

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await api.get("/api/booking");
                setBookings(response.data.data);
            } catch (err) {
                setError("Gagal mengambil data booking.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleReviewClick = (booking: any) => {
        setSelectedBooking(booking);
        setReviewData({ rating: 0, komentar: "", bookingId: booking.id });
        setShowReviewModal(true);
    };

    const handleReviewSubmit = async () => {
        try {
            // Validasi data review sebelum dikirim
            if (!reviewData.bookingId || !reviewData.rating || !reviewData.komentar) {
                alert("Semua field harus diisi.");
                return;
            }
    
            // Validasi rating (harus antara 1 hingga 5)
            if (reviewData.rating < 1 || reviewData.rating > 5) {
                alert("Rating harus antara 1 dan 5.");
                return;
            }
    
            console.log("Mengirim review data:", reviewData);
    
            const response = await api.post(`/api/review`, {
                bookingId: reviewData.bookingId,
                rating: reviewData.rating,
                komentar: reviewData.komentar,
            });
    
            console.log("Response berhasil:", response.data);
    
            // Refresh booking data setelah review disubmit
            const bookingResponse = await api.get("/api/booking");
            setBookings(bookingResponse.data.data);
            setShowReviewModal(false);
            setSelectedBooking(null);

            Swal.fire({
                icon: "success",
                title: "Yeayy",
                text: "Berhasil memberikan review!",
            });
    
            // alert("Review berhasil diberikan!");
        } catch (err: any) {
            console.error("Error submitting review:", err.response?.data || err.message);
            alert("Gagal memberikan review: " + (err.response?.data?.message || "Data tidak valid."));
        }
    };
    

    if (loading) return <p>Loading booking data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="rounded-sm border p-6 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="container mx-auto p-4">
                {bookings.length === 0 ? (
                    <p>Tidak ada data booking.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="px-4 py-2">Mobil</th>
                                    <th className="px-4 py-2">Tanggal Mulai</th>
                                    <th className="px-4 py-2">Tanggal Selesai</th>
                                    <th className="px-4 py-2">Status Pesanan</th>
                                    <th className="px-4 py-2">Beri Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="border-b">
                                        <td className="px-4 py-2">{booking.mobil.namaMobil}</td>
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
                                                onClick={() => handleReviewClick(booking)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faComment}
                                                    className="mr-2"
                                                    size="lg"
                                                />
                                                Beri Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showReviewModal && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold">Beri Review untuk {selectedBooking.mobil.namaMobil}</h2>
                        <div className="mt-4">
                            <label>Rating</label>
                            <div className="flex items-center mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <label key={star} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={star}
                                            checked={reviewData.rating === star}
                                            onChange={() =>
                                                setReviewData({ ...reviewData, rating: star })
                                            }
                                            className="hidden"
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            size="lg"
                                            className={`${
                                                reviewData.rating >= star ? "text-yellow-500" : "text-gray-300"
                                            }`}
                                        />
                                    </label>
                                ))}
                            </div>
                            <label>Komentar</label>
                            <textarea
                                className="w-full mt-2 mb-4 p-2 border"
                                placeholder="Tulis komentar"
                                value={reviewData.komentar}
                                onChange={(e) =>
                                    setReviewData({ ...reviewData, komentar: e.target.value })
                                }
                            ></textarea>
                        </div>
                        <div className="mt-6 flex justify-around">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleReviewSubmit}
                            >
                                Kirim Review
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                                onClick={() => setShowReviewModal(false)}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BeriReview;
