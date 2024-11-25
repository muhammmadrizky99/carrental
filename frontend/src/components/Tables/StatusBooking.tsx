"use client"
import React, { useEffect, useState } from "react";
import { Package } from "@/types/package";
import axios from "axios";

// const bookingData: Package[] = [
//   {
//     tglbooking: new Date(),
//     namaMobil: `Chevrolet`,
//     pengguna: `Rizky`,
//     tglmulai: new Date("2023-01-13"),
//     tglakhir: new Date("2024-01-1"),
//     status: "Setuju",
//   },
// ];

const TableThree = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<Package | null>(null);
  const [bookingData, setBookingData] = useState<Package[]>([]);

  useEffect(() => {
    // Ambil data dari localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookingData") || "[]");
    setBookingData(storedBookings);
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:2500/api/booking");
        setBookingData(response.data);
      } catch (error) {
        console.error("Gagal mengambil data booking:", error);
      }
    };
  
    fetchBookings();
  }, []);
  

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openModal = (booking: Package) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  const handleSetujui = () => {
    console.log(`Booking ${selectedBooking?.namaMobil} disetujui`);
    closeModal();
  };

  const handleTolak = () => {
    console.log(`Booking ${selectedBooking?.namaMobil} ditolak`);
    closeModal();
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray text-left dark:bg-meta-4">
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Tanggal booking
                </th>
                <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                  Mobil
                </th>
                <th className="min-w-[130px] py-4 font-medium text-black dark:text-white">
                  Pengguna
                </th>
                <th className="min-w-[130px] py-4 font-medium text-black dark:text-white">
                  No HP
                </th>
                <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">
                  Tanggal Mulai
                </th>
                <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">
                  Tanggal Akhir
                </th>
                <th className="min-w-[90px] px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  {/* Aksi */}
                </th>
              </tr>
            </thead>

            <tbody>
              {bookingData.map((packageItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-small text-sm text-black dark:text-white">
                      {formatDate(packageItem.tglbooking)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                    <h5 className="font-small text-sm text-black dark:text-white">
                      {packageItem.namaMobil}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                    <p className="font-small text-sm text-black dark:text-white">
                      {packageItem.pengguna}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                    <h5 className="font-small text-sm text-black dark:text-white">
                      {packageItem.noHandphone}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                    <h5 className="font-small text-sm text-black dark:text-white">
                      {formatDate(packageItem.tglmulai)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                    <h5 className="font-small text-sm text-black dark:text-white">
                      {formatDate(packageItem.tglakhir)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <button
                      className="px-2 bg-blue-500 text-white rounded"
                      onClick={() => openModal(packageItem)}
                    >
                      Konfirmasi?
                    </button>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Hapus
                      </button>
                      <button
                        className="px-2 py-1 bg-blue-400 text-white rounded"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Booking</h2>
            <p>Apakah Anda ingin menyetujui atau menolak booking ini?</p>
            <p className="mt-2">Mobil: {selectedBooking.namaMobil}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleSetujui}
              >
                Setujui
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleTolak}
              >
                Tolak
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded"
                onClick={closeModal}
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

export default TableThree;


