// src/controllers/MobilController.ts

import { Request, Response } from 'express';
import prisma from '../config/database';

export const MobilController = async (req: Request, res: Response) => {
    try {
        const {
            gambar,
            namaMobil,
            deskripsi,
            tipe,
            merek,
            model,
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
                gambar,
                deskripsi,
                tipe,
                namaMobil,
                merek,
                model,
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
