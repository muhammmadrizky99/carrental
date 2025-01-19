import { NextFunction, Request, Response } from 'express';
import prisma from '../config/database';


export const BengkelController = async (req: Request, res: Response) => {
  try {
    const { kodeTransaksi, namaPelanggan, jenisPelanggan, tarifService, diskon, total } = req.body;

 
    if (!kodeTransaksi || !namaPelanggan || !jenisPelanggan || !tarifService || !diskon || !total ) {
      return res.status(400).json({ msg: "Required fields are missing" });
    }


    const bengkelBaru = await prisma.bengkel.create({
      data: {
        kodeTransaksi,
        namaPelanggan,
        jenisPelanggan,
        tarifService: Number(tarifService),
        diskon: diskon ? Number(diskon) : 0, // Default diskon 0 jika tidak ada
        total: total ? Number(total) : 0, // Default total 0 jika tidak ada
      },
    });

    return res.status(201).json({
      msg: "Bengkel berhasil ditambahkan!",
      data: bengkelBaru,
    });
  } catch (error) {
    console.error('Error adding bengkel:', error);
    return res.status(500).json({ msg: "Server error", error });
  }
};

// Mengambil semua data bengkel
export const semuaBengkel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bengkel = await prisma.bengkel.findMany();
    return res.status(200).json({ data: bengkel });
  } catch (error) {
    console.error('Error fetching bengkel:', error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

// Menghapus data bengkel
export const deleteBengkel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const bengkel = await prisma.bengkel.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ msg: "Bengkel berhasil dihapus", data: bengkel });
  } catch (error) {
    console.error('Error deleting bengkel:', error);
    return res.status(500).json({ msg: "Server error", error });
  }
};

// Mengupdate data bengkel
export const editBengkel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { kodeTransaksi, namaPelanggan, jenisPelanggan, tarifService, diskon, total } = req.body;

    // Validasi ID
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    // Validasi input
    if (!kodeTransaksi || !namaPelanggan || !jenisPelanggan || !tarifService) {
      return res.status(400).json({ msg: "Required fields are missing" });
    }

    // Update data
    const bengkelUpdated = await prisma.bengkel.update({
      where: { id: Number(id) },
      data: {
        kodeTransaksi,
        namaPelanggan,
        jenisPelanggan,
        tarifService: Number(tarifService),
        diskon: diskon ? Number(diskon) : 0,
        total: total ? Number(total) : 0,
      },
    });

    return res.status(200).json({
      msg: "Bengkel berhasil diperbarui!",
      data: bengkelUpdated,
    });
  } catch (error) {
    console.error('Error updating bengkel:', error);
    return res.status(500).json({ msg: "Server error", error });
  }
};
