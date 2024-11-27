import { Request, Response } from "express";
import prisma from "../config/database";

// GET: Ambil semua booking yang statusnya 'approved' untuk pengembalian
export const getApprovedBookingsForReturn = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        status: "approved",  // Filter untuk hanya mengambil booking yang statusnya 'approved'
      },
      include: {
        mobil: true,  // Termasuk data mobil yang dibooking
        pengguna: true,  // Termasuk data pengguna yang memesan
      },
    });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// POST: Handle Pengembalian Mobil
export const pengembalianMobil = async (req: Request, res: Response) => {
    try {
      const { bookingId, kondisiMobil } = req.body;

      // Validasi input
      if (!bookingId || !kondisiMobil) {
        return res.status(400).json({
          success: false,
          message: "ID booking dan kondisi mobil harus diisi.",
        });
      }

      // Periksa apakah booking ada
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          mobil: true, // Menyertakan data mobil
        },
      });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Data booking tidak ditemukan.",
        });
      }

      // Periksa apakah pengembalian sudah ada untuk booking ini
      const pengembalian = await prisma.pengembalian.findUnique({
        where: { bookingId: bookingId },
      });

      if (pengembalian) {
        return res.status(400).json({
          success: false,
          message: "Mobil ini sudah dikembalikan sebelumnya.",
        });
      }

      // Membuat pengembalian baru
      const sekarang = new Date();
      const newPengembalian = await prisma.pengembalian.create({
        data: {
          kondisiMobil,              // kondisi mobil yang diterima
          statusPengembalian: "Dikembalikan", // Status pengembalian
          bookingId: bookingId,      // Relasi dengan booking
          tanggalPengembalian: sekarang, // Tanggal pengembalian
        },
      });

      // Update status booking menjadi 'selesai' jika pengembalian diterima
      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: "selesai", // Atau status lain yang relevan untuk pengembalian
        },
      });

      return res.status(200).json({
        success: true,
        message: "Pengembalian berhasil disimpan.",
        data: {
          bookingId,
          kondisiMobil,
          tanggalPengembalian: newPengembalian.tanggalPengembalian,
        },
      });
    } catch (err) {
      console.error("Error saat menghandle pengembalian:", err);
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan saat menyimpan pengembalian.",
      });
    }
};
