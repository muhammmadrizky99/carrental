"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";

const LaporanPembayaran: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pembayaran dari API
  const getPayments = async () => {
    try {
      const response = await api.get("/api/pembayaran");
      console.log("Response data:",response.data);
      return response.data;
    } catch (error) {
      console.error("Gagal memuat laporan pembayaran:", error);
      throw new Error("Tidak dapat memuat data pembayaran.");
    }
  };

  // Fetch data saat komponen pertama kali di-render
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPayments();
        console.log("Payments data:", response);
        setPayments(response.data); // Ambil `data` jika responsenya berbentuk objek
      } catch (error) {
        console.error("Gagal memuat laporan pembayaran:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPayments();
  }, []);
  

  if (loading) return <p>Loading laporan pembayaran...</p>;

  if (error) {
    return (
      <div className="rounded-sm border p-6 bg-red-100 text-red-800 shadow-default">
        <h2 className="text-lg font-bold mb-4">Terjadi Kesalahan</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-sm border p-6 bg-white shadow-default">
      <h2 className="text-lg font-bold mb-4">Laporan Pembayaran</h2>
      {payments.length === 0 ? (
        <p className="text-gray-600">Belum ada data pembayaran.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border">Nama Mobil</th>
              <th className="px-4 py-2 border">Nama Pengguna</th>
              <th className="px-4 py-2 border">Tanggal Pembayaran</th>
              <th className="px-4 py-2 border">Metode Pembayaran</th>
              <th className="px-4 py-2 border">Jumlah</th>
              <th className="px-4 py-2 border">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  {payment.booking?.mobil?.namaMobil || "Data tidak tersedia"}
                </td>
                <td className="px-4 py-2 border">
                  {payment.booking?.pengguna?.nama || "Data tidak tersedia"}
                </td>
                <td className="px-4 py-2 border">
                  {payment.tglPembayaran
                    ? new Date(payment.tglPembayaran).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "Tanggal tidak tersedia"}
                </td>
                <td className="px-4 py-2 border">
                  {payment.metodePembayaran || "-"}
                </td>
                <td className="px-4 py-2 border">
                  Rp{" "}
                  {typeof payment.jumlahPembayaran === "number"
                    ? payment.jumlahPembayaran.toLocaleString("id-ID")
                    : "0"}
                </td>
                <td className="px-4 py-2 border">
                  {payment.keterangan || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LaporanPembayaran;
