// src/controllers/MobilController.ts

import { NextFunction, Request, Response } from 'express';
import prisma from '../config/database';


export const MobilController = async (req: Request, res: Response) => {
    try {
        const {
            namaMobil,
            deskripsi,
            tipe,
            merek,
            model,
            stok,
            tahun,
            transmisi,
            kapasitasMesin,
            kapasitasKursi,
            jumlahTas,
            jumlahPintu,
            warna,
            fiturLainnya,
            ac,
            harga,
            minimum,
            maximum
        } = req.body;

        // Validasi data yang diperlukan
        if (!tipe || !merek || !model || !harga) {
            return res.status(400).json({ msg: "Required fields are missing" });
        }

        // Buat entri mobil baru di database
        const mobilBaru = await prisma.mobil.create({
            data: {
                gambar:`http://localhost:2500/uploads/${req.file?.filename}`,
                deskripsi,
                tipe,
                namaMobil,
                merek,
                model,
                stok: Number(stok),
                tahun: Number(tahun),
                transmisi,
                kapasitasMesin: Number(kapasitasMesin),
                kapasitasKursi: Number(kapasitasKursi),
                jumlahTas: Number(jumlahTas),
                jumlahPintu: Number(jumlahPintu),
                warna,
                fiturLainnya,
                ac: ac === "true" ? true : false,
                harga: Number(harga),
                minimum: Number(minimum),
                maximum: Number(maximum )
            }
        });

        return res.status(201).json({
            msg: "Mobil berhasil ditambahkan!",
            data: mobilBaru
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Server error",
            error
        });
    }
};

//mengambil data dari api
export const semuaMobil = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const mobil = await prisma.mobil.findMany();
        return res.status(200).json({"data": mobil})
    }catch(error){
        return res.status(500).json({"errors": "Internal server error: "+ error})
    }
};

//metode hapus
export const deleteMobil = async (req: any, res: any) => {
    try {
      const { id } = req.params;
      console.log(id);
      
  
      // Menghapus mobil berdasarkan ID
      const mobil = await prisma.mobil.delete({
        where: {
          id: Number(id), 
        },
      });
  
      if (!mobil) {
        return res.status(404).json({ message: 'Mobil tidak ditemukan' });
      }
  
      res.status(200).json({ message: 'Mobil berhasil dihapus' });
    } catch (error) {
      console.error('Error deleting mobil:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menghapus mobil', error });
    } finally {
      await prisma.$disconnect();
    }
  };