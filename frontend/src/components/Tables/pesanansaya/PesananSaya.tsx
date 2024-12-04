"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";

const PesananSaya: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const [paymentData, setPaymentData] = useState<{
    tglPembayaran: string;
    metodePembayaran: string;
    jumlah: string;
    keterangan: string;
    buktiPembayaran: File | null;
  }>({
    tglPembayaran: "",
    metodePembayaran: "transfer bank",
    jumlah: "",
    keterangan: "",
    buktiPembayaran: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/booking");
        if (isMounted) setBookings(response.data.data);
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

  const handlePaymentClick = (booking: any) => {
    setSelectedBooking(booking);
    setPaymentData({
      tglPembayaran: "",
      metodePembayaran: "transfer bank",
      jumlah: "",
      keterangan: "",
      buktiPembayaran: null,
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("bookingId", selectedBooking.id.toString());
      formData.append("tglPembayaran", paymentData.tglPembayaran);
      formData.append("metodePembayaran", paymentData.metodePembayaran);
      formData.append("jumlahPembayaran", paymentData.jumlah);
      formData.append("keterangan", paymentData.keterangan);
      if (paymentData.buktiPembayaran) {
        formData.append("buktiPembayaran", paymentData.buktiPembayaran);
      }
      await api.post(`/api/pembayaran`, formData);

      // Refresh data bookings tanpa merubah data booking
      const response = await api.get("/api/booking");
      setBookings(response.data.data);

      // Set the selected booking's payment status to "Pembayaran Selesai"
      setShowPaymentModal(false);
      setSelectedBooking(null);

      alert("Pembayaran berhasil!");
    } catch (err) {
      console.error("Gagal memproses pembayaran:", err);
      alert("Gagal memproses pembayaran.");
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
                  <th className="px-4 py-2">Harga</th>
                  <th className="px-4 py-2">Pembayaran</th>
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
                      <span className="px-3 bg-gray-300 text-gray-700 rounded-md">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      Rp {booking.mobil.harga.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {booking.statusPembayaran === "Pembayaran Berhasil" ? (
                        <span className="px-3 bg-green-500 text-white rounded-md">
                          Pembayaran Selesai
                        </span>
                      ) : (
                        <button
                          className={`px-3 text-white rounded-md ${
                            booking.statusPembayaran === "Pembayaran Berhasil"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                          onClick={() => handlePaymentClick(booking)}
                          disabled={booking.statusPembayaran === "Pembayaran Berhasil"}
                        >
                          {booking.statusPembayaran === "Pembayaran Berhasil"
                            ? "Pembayaran Selesai"
                            : "Pembayaran"}
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

      {/* Modal Pembayaran */}
      {showPaymentModal && selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold">Form Pembayaran</h2>
            <div className="mt-4">
              <label>Tanggal Pembayaran</label>
              <input
                type="date"
                className="w-full mt-2 mb-4 p-2 border"
                value={paymentData.tglPembayaran}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, tglPembayaran: e.target.value })
                }
              />
              <label>Metode Pembayaran</label>
              <select
                className="w-full mt-2 mb-4 p-2 border"
                value={paymentData.metodePembayaran}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    metodePembayaran: e.target.value,
                  })
                }
              >
                <option value="transfer bank">Transfer Bank</option>
                <option value="cash">Cash</option>
              </select>
              <label>Jumlah</label>
              <input
                type="number"
                className="w-full mt-2 mb-4 p-2 border"
                value={paymentData.jumlah}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, jumlah: e.target.value })
                }
              />
              <label>Keterangan</label>
              <textarea
                className="w-full mt-2 mb-4 p-2 border"
                value={paymentData.keterangan}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, keterangan: e.target.value })
                }
              ></textarea>
              <label>Upload Bukti Pembayaran</label>
              <input
                type="file"
                className="w-full mt-2 mb-4 p-2 border"
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    buktiPembayaran: e.target.files ? e.target.files[0] : null,
                  })
                }
              />
            </div>
            <div className="mt-6 flex justify-around">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handlePaymentSubmit}
              >
                Bayar
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setShowPaymentModal(false)}
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

export default PesananSaya;
  