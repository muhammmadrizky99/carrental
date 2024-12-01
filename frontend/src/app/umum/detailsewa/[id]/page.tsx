"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Swal from "sweetalert2";

const DetailSewa: React.FC = () => {
  const { id } = useParams(); // Ambil ID dari URL

  const [mobil, setMobil] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState<any>({
    namaPemesan: "",
    tglMulai: "",
    tglSelesai: "",
    noHp: "",
  });

  // Default tanggal
  const currentDate = new Date().toISOString().split("T")[0];

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

  // Fungsi untuk memeriksa validitas tanggal
  const isValidDateRange = () => {
    const { tglMulai, tglSelesai } = bookingDetails;
    return tglMulai && tglSelesai && tglSelesai >= tglMulai;
  };

  const handleBookingSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validasi tanggal
    if (!isValidDateRange()) {
      alert("Tanggal selesai harus lebih besar dari tanggal mulai.");
      return;
    }

    const newBooking = {
      tglMulai: bookingDetails.tglMulai,
      tglSelesai: bookingDetails.tglSelesai,
      noHp: bookingDetails.noHp.toString(), // Konversi ke string
      penggunaId: 1, // Simulasi pengguna ID
      mobilId: parseInt(mobil.id, 10), // Pastikan ini angka
    };

    console.log("Payload dikirim:", newBooking);

    try {
      const response = await axios.post("http://localhost:2500/api/booking", newBooking);
      Swal.fire({
        title: "Booking berhasil!",
        text: "Terima kasih telah melakukan pemesanan.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Update stok mobil
      setMobil((prevMobil: any) => ({
        ...prevMobil,
        stok: prevMobil.stok - 1,
      }));

      // Reset form setelah berhasil booking
      setBookingDetails({
        namaPemesan: "",
        tglMulai: "",
        tglSelesai: "",
        noHp: "",
      });

      console.log(response.data);
    } catch (error) {
      console.error("Gagal mengirim booking:", error);
      alert("Gagal mengirim booking. Coba periksa stok mobil.");
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
        <p className="font-bold bg-orange-700 text-white inline-block px-2  rounded-md  mb-2 mt-5">
          Stok: {mobil.stok}
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Form Booking</h2>
          <form onSubmit={handleBookingSubmit}>
            <label className="block mb-2">
              Nama Pemesan:
              <input
                type="text"
                className="border p-2 w-full rounded-md"
                value={bookingDetails.namaPemesan}
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
                value={currentDate}
                readOnly
              />
            </label>
            <label className="block mb-2">
              Tanggal Mulai Sewa:
              <input
                type="date"
                className="border p-2 w-full rounded-md"
                value={bookingDetails.tglMulai}
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
                value={bookingDetails.tglSelesai}
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
                value={bookingDetails.noHp}
                required
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, noHp: e.target.value })
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
