"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Pengembalian: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [kondisiMobil, setKondisiMobil] = useState<string>("aman");

  // Fetch data booking ketika komponen pertama kali di-render
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:2500/api/booking");
        setBookings(response.data.data);
      } catch (err) {
        console.error("Gagal mengambil data booking:", err);
        setError("Gagal mengambil data booking.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleKembalikanClick = (booking: any) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Kirim request pengembalian ke backend
  const handlePengembalian = async () => {
    if (!selectedBooking) return;
    
    try {
      // Kirim request pengembalian dengan kondisi mobil
      const response = await axios.post("http://localhost:2500/api/pengembalian", {
        bookingId: selectedBooking.id,
        kondisiMobil,
      });
      console.log("Pengembalian berhasil:", response.data);

      // Setelah berhasil, fetch ulang data booking
      const fetchResponse = await axios.get("http://localhost:2500/api/booking");
      setBookings(fetchResponse.data.data);

      // Update state dengan data terbaru
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id
            ? {
                ...booking,
                pengembalian: `Dikembalikan tanggal ${new Date().toLocaleDateString()}`,
                kondisiMobil: kondisiMobil, // Pastikan kondisi mobil diperbarui
                status: "selesai", // Update status di frontend
              }
            : booking
        )
      );

      // Menutup modal setelah pengembalian
      setShowModal(false);
      setSelectedBooking(null); // Clear selected booking
    } catch (err: any) {
      console.error("Gagal menyimpan pengembalian:", err);
      setError(`Gagal menyimpan pengembalian: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Data Pengembalian</h1>
      {bookings.length === 0 ? (
        <p>Tidak ada data booking.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Mobil</th>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Tanggal Booking</th>
              <th className="border px-4 py-2">Tanggal Mulai</th>
              <th className="border px-4 py-2">Tanggal Selesai</th>
              <th className="border px-4 py-2">Pengembalian</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border px-4 py-2">{booking.mobil.namaMobil}</td>
                <td className="border px-4 py-2">{booking.pengguna.nama}</td>
                <td className="border px-4 py-2">
                  {new Date(booking.tglBooking).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(booking.tglMulai).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(booking.tglSelesai).toLocaleDateString()}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    booking.pengembalian
                      ? "text-green-500 font-bold"
                      : "text-red-500 font-bold"
                  }`}
                >
                  {booking.pengembalian || "Belum dikembalikan"}
                </td>
                <td className="border px-4 py-2">
                  {!booking.pengembalian && (
                    <button
                      onClick={() => handleKembalikanClick(booking)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Kembalikan
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Form Pengembalian</h2>
            <div className="mb-4">
              <label className="block mb-2">Kondisi Mobil</label>
              <select
                value={kondisiMobil}
                onChange={(e) => setKondisiMobil(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="aman">Aman</option>
                <option value="rusak">Rusak</option>
                <option value="hilang">Hilang</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handlePengembalian}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Simpan Pengembalian
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pengembalian;
