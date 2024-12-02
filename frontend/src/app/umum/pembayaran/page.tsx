"use client";
import axios from "axios";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Swal from "sweetalert2";

const Pembayaran: React.FC = () => {
  const [pembayaranDetails, setPembayaranDetails] = useState<any>({
    tglPembayaran: new Date().toISOString().split("T")[0], // Default ke hari ini
    metodePembayaran: "",
    jumlahPembayaran: "",
    buktiPembayaran: null,
    keterangan: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPembayaranDetails({
        ...pembayaranDetails,
        buktiPembayaran: e.target.files[0],
      });
    }
  };

  const handlePembayaranSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validasi input
    if (!pembayaranDetails.metodePembayaran || !pembayaranDetails.jumlahPembayaran) {
      alert("Harap lengkapi semua field.");
      return;
    }

    const formData = new FormData();
    formData.append("tglPembayaran", pembayaranDetails.tglPembayaran);
    formData.append("metodePembayaran", pembayaranDetails.metodePembayaran);
    formData.append("jumlahPembayaran", pembayaranDetails.jumlahPembayaran);
    formData.append("keterangan", pembayaranDetails.keterangan);
    if (pembayaranDetails.buktiPembayaran) {
      formData.append("buktiPembayaran", pembayaranDetails.buktiPembayaran);
    }

    try {
      const response = await axios.post("http://localhost:2500/api/pembayaran", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Pembayaran berhasil!",
        text: "Data pembayaran telah disimpan.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form setelah berhasil
      setPembayaranDetails({
        tglPembayaran: new Date().toISOString().split("T")[0],
        metodePembayaran: "",
        jumlahPembayaran: "",
        buktiPembayaran: null,
        keterangan: "",
      });

      console.log(response.data);
    } catch (error) {
      console.error("Gagal mengirim pembayaran:", error);
      alert("Gagal mengirim pembayaran. Silakan coba lagi.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pembayaran" />
      <div className="bg-white p-6 border rounded-md w-full sm:w-full shadow-md">
      <div className="container mx-auto p-4">
        {/* <h1 className="text-2xl font-bold mb-4">Form Pembayaran</h1> */}
        <form onSubmit={handlePembayaranSubmit}>
          <label className="block mb-2">
            Tanggal Pembayaran:
            <input
              type="date"
              className="border p-2 w-full rounded-md"
              value={pembayaranDetails.tglPembayaran}
              required
              onChange={(e) =>
                setPembayaranDetails({
                  ...pembayaranDetails,
                  tglPembayaran: e.target.value,
                })
              }
            />
          </label>
          <label className="block mb-2">
            Metode Pembayaran:
            <select
              className="border p-2 w-full rounded-md"
              value={pembayaranDetails.metodePembayaran}
              required
              onChange={(e) =>
                setPembayaranDetails({
                  ...pembayaranDetails,
                  metodePembayaran: e.target.value,
                })
              }
            >
              <option value="">Pilih Metode Pembayaran</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="Tunai">Tunai</option>
            </select>
          </label>
          <label className="block mb-2">
            Jumlah Pembayaran (Rp):
            <input
              type="number"
              className="border p-2 w-full rounded-md"
              value={pembayaranDetails.jumlahPembayaran}
              required
              onChange={(e) =>
                setPembayaranDetails({
                  ...pembayaranDetails,
                  jumlahPembayaran: e.target.value,
                })
              }
            />
          </label>
          <label className="block mb-2">
            Keterangan:
            <textarea
              className="border p-2 w-full rounded-md"
              value={pembayaranDetails.keterangan}
              placeholder="Tambahkan keterangan (opsional)"
              onChange={(e) =>
                setPembayaranDetails({
                  ...pembayaranDetails,
                  keterangan: e.target.value,
                })
              }
            />
          </label>
          <label className="block mb-2">
            Upload Bukti Pembayaran:
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full rounded-md"
              onChange={handleFileChange}
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
          >
            Kirim Pembayaran
          </button>
        </form>
      </div>
      </div>
    </DefaultLayout>
  );
};

export default Pembayaran;
