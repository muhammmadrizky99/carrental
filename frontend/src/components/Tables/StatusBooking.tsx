"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const StatusBooking: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false); // Untuk modal
  const [selectedBooking, setSelectedBooking] = useState<any>(null); // Booking yang dipilih

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

  const handlePendingClick = (booking: any) => {
    setSelectedBooking(booking);
    setShowModal(true); // Tampilkan modal ketika tombol di status pending diklik
  };

  const handleApprove = async () => {
    if (selectedBooking) {
      try {
        await axios.put(`http://localhost:2500/api/booking/${selectedBooking.id}`, {
          status: "approved",
        });

        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === selectedBooking.id
              ? { ...booking, status: "approved" }
              : booking
          )
        );
        setShowModal(false); // Tutup modal
      } catch (err) {
        console.error("Gagal menyetujui booking:", err);
        setError("Gagal menyetujui booking.");
      }
    }
  };

  const handleReject = async () => {
    if (selectedBooking) {
      try {
        await axios.put(`http://localhost:2500/api/booking/${selectedBooking.id}`, {
          status: "rejected",
        });

        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === selectedBooking.id
              ? { ...booking, status: "rejected" }
              : booking
          )
        );
        setShowModal(false); // Tutup modal
      } catch (err) {
        console.error("Gagal menolak booking:", err);
        setError("Gagal menolak booking.");
      }
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
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Tanggal Booking</th>
                  <th className="px-4 py-2">Tanggal Mulai</th>
                  <th className="px-4 py-2">Tanggal Selesai</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Harga</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <img
                          src={booking.mobil.gambar}
                          alt={booking.mobil.namaMobil}
                          className="w-16 h-16 object-cover mr-2"
                        />
                        {booking.mobil.namaMobil}
                      </div>
                    </td>
                    <td className="px-4 py-2">{booking.pengguna.nama}</td>
                    <td className="px-4 py-2">
                      {new Date(booking.tglBooking).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(booking.tglMulai).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(booking.tglSelesai).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {booking.status === "pending" ? (
                        <button
                          className="px-4  bg-yellow-500 text-white rounded"
                          onClick={() => handlePendingClick(booking)}
                        >
                          Pending
                        </button>
                      ) : (
                        <span
                          className={`font-bold ${
                            booking.status === "approved"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {booking.status === "approved"
                            ? "Approved"
                            : "Rejected"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      Rp {booking.mobil.harga.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold">Tindak Lanjut Booking</h2>
            <p className="mt-4">Apakah Anda ingin menyetujui atau menolak booking ini?</p>
            <div className="mt-6 flex justify-around">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleReject}
              >
                Reject
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setShowModal(false)} 
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

export default StatusBooking;
