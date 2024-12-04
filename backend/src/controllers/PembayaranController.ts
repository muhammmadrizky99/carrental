import { Request, Response } from "express";
import prisma from "../config/database";

// Menambahkan pembayaran baru
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { bookingId, tglPembayaran, metodePembayaran, jumlahPembayaran, keterangan } = req.body;
    const buktiPembayaran = req.file?.path; // File bukti pembayaran

    // Validasi input
    if (!bookingId || !tglPembayaran || !metodePembayaran || !jumlahPembayaran || !buktiPembayaran) {
      return res.status(400).json({ message: "Semua field wajib diisi!" });
    }

    // Periksa apakah booking ada
    const booking = await prisma.booking.findUnique({
      where: { id: Number(bookingId) },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking tidak ditemukan!" });
    }

    // Buat pembayaran
    const payment = await prisma.pembayaran.create({
      data: {
        bookingId: Number(bookingId),
        tglPembayaran: new Date(tglPembayaran),
        metodePembayaran,
        jumlahPembayaran: parseFloat(jumlahPembayaran),
        keterangan: keterangan || "",
        buktiPembayaran,
      },
    });

    // Tidak ada perubahan status booking
    return res.status(201).json({
      message: "Pembayaran berhasil ditambahkan.",
      data: payment,
    });
  } catch (error) {
    console.error("Gagal membuat pembayaran:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

// Mendapatkan semua pembayaran
export const getPayments = async (_req: Request, res: Response) => {
  try {
    const payments = await prisma.pembayaran.findMany({
      include: {
        booking: {
          include: {
            mobil: true,
            pengguna: true,
          },
        },
      },
    });

    return res.status(200).json({ data: payments });
  } catch (error) {
    console.error("Gagal mengambil data pembayaran:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

// Mendapatkan pembayaran berdasarkan ID
export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const payment = await prisma.pembayaran.findUnique({
      where: { id: Number(id) },
      include: {
        booking: {
          include: {
            mobil: true,
            pengguna: true,
          },
        },
      },
    });

    if (!payment) {
      return res.status(404).json({ message: "Pembayaran tidak ditemukan." });
    }

    return res.status(200).json({ data: payment });
  } catch (error) {
    console.error("Gagal mengambil detail pembayaran:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

// Menghapus pembayaran
export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const payment = await prisma.pembayaran.findUnique({
      where: { id: Number(id) },
    });

    if (!payment) {
      return res.status(404).json({ message: "Pembayaran tidak ditemukan." });
    }

    await prisma.pembayaran.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Pembayaran berhasil dihapus." });
  } catch (error) {
    console.error("Gagal menghapus pembayaran:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};
