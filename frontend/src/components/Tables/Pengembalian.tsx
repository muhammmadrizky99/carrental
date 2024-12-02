"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import router from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "@/lib/api";

const Pengembalian: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [kondisiMobil, setKondisiMobil] = useState<string>("aman");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [showDetailModal, setShowDetailModal] = useState<boolean>(false); // Modal Detail

  // Fetch data booking ketika komponen pertama kali di-render
  useEffect(() => {
    let isMounted = true;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/booking");

        if (isMounted) {
          const filteredBookings = response.data.data.filter(
            (booking: any) => booking.status === "approved" || booking.pengembalian
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
      isMounted = false;
    };
  }, []);

  const handleKembalikanClick = (booking: any) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handlePengembalian = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      await api.post("/api/pengembalian", {
        bookingId: selectedBooking.id,
        kondisiMobil,
      });

      const response = await api.get("/api/booking");
      const filteredBookings = response.data.data.filter(
        (booking: any) => booking.status === "approved" || booking.pengembalian
      );
      setBookings(filteredBookings);

      setShowModal(false);
      setSelectedBooking(null);
    } catch (err: any) {
      console.error("Gagal menyimpan pengembalian:", err);
      setError(`Gagal menyimpan pengembalian: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDetailClick = (booking: any) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const handleReturnCar = async (booking: any) => {
    try {
      // Kirim permintaan DELETE ke backend
      await api.delete(`/api/booking/${booking.id}`);

      // Perbarui daftar booking setelah penghapusan
      setBookings((prevBookings) => prevBookings.filter((b) => b.id !== booking.id));

      // Tampilkan toast setelah berhasil menghapus
      toast.success('Booking berhasil dihapus!', {
        position: "top-right",
        autoClose: 3000, // Toast akan otomatis menghilang setelah 3 detik
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (err: any) {
      console.error("Gagal menghapus booking:", err);
      setError(`Gagal menghapus booking: ${err.response?.data?.message || err.message}`);

      // Tampilkan toast jika terjadi error
      toast.error('Gagal menghapus booking!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

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
                      className={`inline-block px-2 rounded-md ${!booking.pengembalian
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                        }`}
                    >
                      {!booking.pengembalian
                        ? "belum dikembalikan"
                        : `sudah dikembalikan (${new Date(booking.pengembalian.tanggalPengembalian).toLocaleDateString()})`}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2">
                    {booking.status === "approved" && !booking.pengembalian && (
                      <button
                        onClick={() => handleKembalikanClick(booking)}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md mb-1"
                      >
                        Kembalikan
                      </button>
                    )}
                    <button
                      onClick={() => handleDetailClick(booking)}
                      className="bg-blue-400 text-white px-4 py-1 rounded-md mb-1 mr-2"
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                    <button
                      onClick={() => handleReturnCar(booking)}
                      className="bg-red-500 text-white px-4 py-1  rounded-md mb-1"
                    >
                   
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    </div>
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

        {showDetailModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Detail </h2>
              <p><strong>ID:</strong> {selectedBooking.id}</p>
              <p><strong>Nama Pengguna:</strong> {selectedBooking.pengguna.nama}</p>
              <p><strong>Mobil:</strong> {selectedBooking.mobil.namaMobil}</p>
              <p><strong>Tanggal Booking:</strong> {new Date(selectedBooking.tglBooking).toLocaleDateString()}</p>
              <p><strong>Tanggal Mulai:</strong> {new Date(selectedBooking.tglMulai).toLocaleDateString()}</p>
              <p><strong>Tanggal Selesai:</strong> {new Date(selectedBooking.tglSelesai).toLocaleDateString()}</p>
              {/* <p><strong>Kondisi:</strong> {selectedBooking.pengembalian.kondisiMobil}</p> */}
              {/* <p><strong>Status Pengembalian:</strong> {selectedBooking.pengembalian.statusPengembalian}</p> */}
              {selectedBooking.pengembalian ? (
                <>
                <p><strong>Kondisi:</strong> {selectedBooking.pengembalian.kondisiMobil}</p>
                <p><strong>Status Pengembalian:</strong> {selectedBooking.pengembalian.statusPengembalian}</p>
                </>
              ) : (
                <p><strong>Status Pengembalian:</strong> Belum dikembalikan</p>
              )}
              <button
                onClick={() => setShowDetailModal(false)}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pengembalian;
