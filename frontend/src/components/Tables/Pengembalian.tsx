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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Untuk menandakan jika pengembalian sedang diproses

  // Fetch data booking ketika komponen pertama kali di-render
  useEffect(() => {
    let isMounted = true; // Untuk menghindari memory leaks

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:2500/api/booking");

        // Filter booking hanya dengan status 'approved' atau 'sudah dikembalikan'
        if (isMounted) {
          const filteredBookings = response.data.data.filter((booking: any) => 
            booking.status === "approved" || booking.pengembalian
          );
          setBookings(filteredBookings);
        }
      } catch (err) {
        console.error("Gagal mengambil data booking:", err);
        if (isMounted) setError("Gagal mengambil data booking.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBookings();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  const handleKembalikanClick = (booking: any) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Kirim request pengembalian ke backend
  const handlePengembalian = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true); // Menandakan bahwa pengembalian sedang diproses

    try {
      // Kirim request pengembalian dengan kondisi mobil
      await axios.post("http://localhost:2500/api/pengembalian", {
        bookingId: selectedBooking.id,
        kondisiMobil,
      });

      // Fetch ulang data bookings
      const response = await axios.get("http://localhost:2500/api/booking");
      const filteredBookings = response.data.data.filter((booking: any) => 
        booking.status === "approved" || booking.pengembalian
      );
      setBookings(filteredBookings);

      setShowModal(false); // Tutup modal
      setSelectedBooking(null); // Clear selected booking
    } catch (err: any) {
      console.error("Gagal menyimpan pengembalian:", err);
      setError(`Gagal menyimpan pengembalian: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSubmitting(false); // Selesai memproses pengembalian
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="rounded-sm border p-6 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Data Pengembalian</h1>
        {bookings.length === 0 ? (
          <p>Tidak ada booking yang disetujui untuk pengembalian.</p>
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
                  <td className="border px-4 py-2">
                    <span
                      className={`inline-block px-2 rounded-md font-bold ${
                        !booking.pengembalian
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {!booking.pengembalian
                        ? "belum dikembalikan"
                        : `sudah dikembalikan ${new Date(booking.tglSelesai).toLocaleDateString()}`}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    {booking.status === "approved" && !booking.pengembalian && (
                      <button
                        onClick={() => handleKembalikanClick(booking)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-sm"
                      >
                        Kembalikan
                      </button>
                    )}
                    {booking.status !== "approved" && !booking.pengembalian && (
                      <span className="text-gray-500">Tidak dapat dikembalikan</span>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Memproses..." : "Simpan Pengembalian"}
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
    </div>
  );
};

export default Pengembalian;
