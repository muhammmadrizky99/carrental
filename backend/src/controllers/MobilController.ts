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
                gambar:`http://localhost:2500/${req.file?.filename}`,
                deskripsi,
                tipe,
                namaMobil,
                merek,
                model,
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
}