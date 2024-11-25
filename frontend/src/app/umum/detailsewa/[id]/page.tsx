"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Gunakan useParams
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const DetailSewa: React.FC = () => {
  const { id } = useParams(); // Ambil ID dari URL

  const [mobil, setMobil] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState<any>({}); // State untuk form

  // Menentukan tanggal booking otomatis
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchDetailMobil = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:2500/api/mobil/${id}`);
        setMobil(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data mobil:", error);
        setError("Gagal mengambil data mobil.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetailMobil();
    }
  }, [id]);

  if (loading) return <p>Loading detail mobil...</p>;
  if (error) return <p>{error}</p>;

  // Handler untuk submit booking
  const handleBookingSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newBooking = {
      mobil_id: mobil.id,
      pengguna: bookingDetails.namaPemesan,
      tgl_booking: new Date().toISOString().split("T")[0], // Tanggal hari ini
      tgl_mulai: bookingDetails.tglMulai,
      tgl_selesai: bookingDetails.tglSelesai,
      no_hp: bookingDetails.noHp,
      status: "Pending",
    };

    try {
      const response = await axios.post("http://localhost:2500/api/booking", newBooking);
      alert("Booking berhasil dikirim!");
      console.log(response.data);
    } catch (error) {
      console.error("Gagal mengirim booking:", error);
      alert("Gagal mengirim booking.");
    }

  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Detail Sewa - ${mobil.namaMobil}`} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{mobil.namaMobil}</h1>
        <img
          src={mobil.gambar}
          alt={mobil.namaMobil}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p>Tipe: {mobil.tipe}</p>
        <p>Harga: Rp {mobil.harga}/day</p>
        <p>Transmisi: {mobil.transmisi}</p>
        <p>Tahun: {mobil.tahun}</p>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Form Booking</h2>
          <form onSubmit={handleBookingSubmit}>
            <label className="block mb-2">
              Nama Pemesan:
              <input
                type="text"
                className="border p-2 w-full rounded-md"
                required
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, namaPemesan: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              Tanggal Booking:
              <input
                type="date"
                className="border p-2 w-full rounded-md"
                value={currentDate} // Menggunakan tanggal saat ini secara otomatis
                readOnly // Menjaga agar tanggal booking tidak dapat diubah
              />
            </label>
            <label className="block mb-2">
              Tanggal Mulai Sewa:
              <input
                type="date"
                className="border p-2 w-full rounded-md"
                required
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, tglMulai: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              Tanggal Selesai Sewa:
              <input
                type="date"
                className="border p-2 w-full rounded-md"
                required
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, tglSelesai: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              Nomor Handphone:
              <input
                type="number"
                className="border p-2 w-full rounded-md"
                required
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, noHandphone: e.target.value })
                }
              />
            </label>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
            >
              Booking!
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DetailSewa;
