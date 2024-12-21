"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const LaporanPembayaran: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<{ id: number; keterangan: string } | null>(null);
  
  // Filter States
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("tanggal"); // 'tanggal', 'bulan', 'tahun'

  const getPayments = async () => {
    try {
      const response = await api.get("/api/pembayaran");
      return response.data;
    } catch (error) {
      console.error("Gagal memuat laporan pembayaran:", error);
      throw new Error("Tidak dapat memuat data pembayaran.");
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPayments();
        setPayments(response.data);
        setFilteredPayments(response.data); // Set initial filter state to all payments
      } catch (error) {
        setError("Gagal memuat data pembayaran.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const saveKeterangan = async (id: number, keterangan: string) => {
    try {
      console.log("Mengirim ke endpoint:", `/api/pembayaran/${id}/keterangan`);
      console.log("Payload:", { keterangan });
      const response = await api.patch(`/api/pembayaran/${id}/keterangan`, { keterangan });
      console.log("Respons:", response.data);
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === id ? { ...payment, keterangan: response.data.data.keterangan } : payment
        )
      );
      setEditingData(null);
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      alert("Gagal menyimpan keterangan. Periksa koneksi atau konfigurasi API.");
    }
  };

  const filterPayments = () => {
    let filtered = [...payments];
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.tglPembayaran);
        if (filterType === "tanggal") {
          return paymentDate >= start && paymentDate <= end;
        } else if (filterType === "bulan") {
          return paymentDate.getFullYear() === start.getFullYear() && paymentDate.getMonth() === start.getMonth();
        } else if (filterType === "tahun") {
          return paymentDate.getFullYear() === start.getFullYear();
        }
        return true;
      });
    }

    setFilteredPayments(filtered);
  };

  const downloadPDF = async () => {
    const element = document.getElementById("laporan-pembayaran");
    if (!element) return;

    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((button) => {
      (button as HTMLElement).style.display = 'none';
    });

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Laporan Pembayaran", pageWidth / 2, 20, { align: "center" });

    const marginTop = 30;
    const pageHeight = (canvas.height * (pageWidth - 20)) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, marginTop, pageWidth - 20, pageHeight);

    pdf.save("laporan_pembayaran.pdf");

    editButtons.forEach((button) => {
      (button as HTMLElement).style.display = '';
    });
  };

  if (loading) return <p>Loading laporan pembayaran...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="rounded-sm border p-6 bg-white shadow-default">
      <h2 className="text-lg font-bold mb-4">Laporan Pembayaran</h2>

      {/* Filter Form */}
      <div className="mb-4">
        {/* <label className="mr-2">Filter berdasarkan:</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="mr-4 p-2 border rounded"
        >
          <option value="tanggal">Tanggal</option>
          <option value="bulan">Bulan</option>
          <option value="tahun">Tahun</option>
        </select> */}

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
        <button
          onClick={filterPayments}
          className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-900"
        >
          Filter
        </button>
      </div>

      <button
        onClick={downloadPDF}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
        Download PDF
      </button>

      <div id="laporan-pembayaran">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nama Mobil</th>
              <th className="border border-gray-300 px-4 py-2">Nama Pengguna</th>
              <th className="border border-gray-300 px-4 py-2">Harga Satu Rental</th>
              <th className="border border-gray-300 px-4 py-2">Tanggal</th>
              <th className="border border-gray-300 px-4 py-2">Metode</th>
              <th className="border border-gray-300 px-4 py-2">Nominal</th>
              <th className="border border-gray-300 px-4 py-2">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {payment.booking?.mobil?.namaMobil || "Data tidak tersedia"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.booking?.pengguna?.nama || "Data tidak tersedia"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Rp {payment.booking?.mobil?.harga.toLocaleString("id-ID") || "Data tidak tersedia"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(payment.tglPembayaran).toLocaleDateString("id-ID")}
                </td>
                <td className="border border-gray-300 px-4 py-2">{payment.metodePembayaran}</td>
                <td className="border border-gray-300 px-4 py-2">
                  Rp {payment.jumlahPembayaran.toLocaleString("id-ID")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingData && editingData.id === payment.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingData.keterangan}
                        className="border px-2 py-1 rounded"
                        onChange={(e) =>
                          setEditingData({ id: payment.id, keterangan: e.target.value })
                        }
                      />
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => saveKeterangan(payment.id, editingData.keterangan)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{payment.keterangan || "-"}</span>
                      <button
                        className="edit-button px-1 py bg-blue-400 text-white rounded hover:bg-blue-600"
                        onClick={() =>
                          setEditingData({ id: payment.id, keterangan: payment.keterangan || "" })
                        }
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanPembayaran;
