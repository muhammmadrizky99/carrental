import { Request, Response } from "express";
import prisma from "../config/database";

// GET: Fetch all bookings
export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { 
        mobil: true,  // Pastikan 'mobil' sesuai dengan nama relasi dalam model Prisma Anda
        pengguna: true,  // Perbaiki dari 'users' menjadi 'pengguna' jika model Anda menggunakan 'pengguna'
        pengembalian: true
      },
    });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// POST: Create a new booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { tglMulai, tglSelesai, noHp, penggunaId, mobilId } = req.body;

    // Validasi input
    if (!tglMulai || isNaN(Date.parse(tglMulai))) {
      return res.status(400).json({ success: false, message: "Tanggal mulai tidak valid." });
    }
    if (!tglSelesai || isNaN(Date.parse(tglSelesai))) {
      return res.status(400).json({ success: false, message: "Tanggal selesai tidak valid." });
    }
    if (new Date(tglMulai) >= new Date(tglSelesai)) {
      return res.status(400).json({ success: false, message: "Tanggal selesai harus lebih besar dari tanggal mulai." });
    }
    if (!noHp || isNaN(parseInt(noHp, 10))) {
      return res.status(400).json({ success: false, message: "Nomor HP harus berupa angka." });
    }
    if (!penggunaId || isNaN(parseInt(penggunaId, 10))) {
      return res.status(400).json({ success: false, message: "ID pengguna tidak valid." });
    }
    if (!mobilId || isNaN(parseInt(mobilId, 10))) {
      return res.status(400).json({ success: false, message: "ID mobil tidak valid." });
    }

    // Periksa pengguna dan mobil
    const pengguna = await prisma.users.findUnique({ where: { id: parseInt(penggunaId, 10) } });
    const mobil = await prisma.mobil.findUnique({ where: { id: parseInt(mobilId, 10) } });
    if (!pengguna) {
      return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
    }
    if (!mobil) {
      return res.status(404).json({ success: false, message: "Mobil tidak ditemukan." });
    }

    // Buat booking baru
    const newBooking = await prisma.booking.create({
      data: {
        tglMulai: new Date(tglMulai),
        tglSelesai: new Date(tglSelesai),
        noHp: noHp.toString(),
        penggunaId: parseInt(penggunaId, 10),
        mobilId: parseInt(mobilId, 10),
      },
    });

    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    console.error("Detail error:", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message || "Terjadi kesalahan saat membuat booking.",
    });
  }
};

// PUT: Update status booking berdasarkan ID
export const updateBookingStatus = async (req: Request, res: Response): Promise<Response<any>> => {
  const { id } = req.params;  // Mengambil ID booking dari parameter URL
  const { status } = req.body;  // Mengambil status dari body permintaan

  try {
    // Validasi status
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: "Status tidak valid. Pilih 'pending', 'approved', atau 'rejected'." });
    }

    // Cari booking berdasarkan ID
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking tidak ditemukan." });
    }

    // Update status booking
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id, 10) },
      data: { status: status },
    });

    return res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res.status(500).json({ success: false, message: (error as Error).message || "Terjadi kesalahan saat mengupdate status booking." });
  }
};
