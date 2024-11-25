import express from 'express';
import prm from '../config/database'; 
import { Router, Request, Response } from 'express';
import { deleteMobil, MobilController, semuaMobil, editMobil } from '../controllers/MobilController';

import { uploadFile } from '../middleware/multerUpload';
import database from '../config/database';

const mobilRouter = express.Router();

mobilRouter.post('/mobil', uploadFile.single('gambar'), MobilController);
mobilRouter.get('/mobil',semuaMobil);
mobilRouter.delete('/mobil/:id', deleteMobil);
mobilRouter.put('/mobil/:id', uploadFile.single('gambar'), editMobil);

// Route untuk filter mobil berdasarkan tahun
mobilRouter.get('/mobil/tahun/:tahun', async (req: Request, res: Response) => {
    try {
        // Ambil parameter tahun dari query
        const {tahun} = req.params;
console.log(tahun);

        // Validasi input tahun
        if (!tahun) {
            return res.status(400).json({
                statusCode: 400,
                msg: "Parameter 'tahun' diperlukan untuk melakukan filter.",
            });
        }

        // Query ke database untuk mendapatkan data mobil berdasarkan tahun
        const result = await prm.mobil.findMany({
            where: {
                tahun: Number(tahun), // Pastikan tahun dalam bentuk angka
            },
            orderBy: {
                namaMobil: 'asc', // Urutkan hasil berdasarkan nama mobil (opsional)
            },
        });

        // Periksa apakah ada data
        if (result.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                msg: `Tidak ada mobil ditemukan untuk tahun ${tahun}.`,
                data: [],
            });
        }

        return res.status(200).json({
            statusCode: 200,
            msg: "Success",
            data: result,
        });
    } catch (error) {
        console.error('Error filtering cars by year:', error);
        return res.status(500).json({
            statusCode: 500,
            msg: "Error filtering cars by year",
        });
    }
});


// Route untuk mendapatkan daftar tipe mobil
mobilRouter.get('/mobil/tipe', async (req: Request, res: Response) => {
    try {
        // Mengambil data 'tipe' yang unik dari tabel mobil
        const result = await prm.mobil.findMany({
            distinct: ['tipe'], // Hanya ambil tipe yang unik
            orderBy: {
                tipe: 'asc', // Urutkan tipe secara ascending
            },
        });

        // Ekstrak hanya kolom tipe
        const tipe = result.map((row) => row.tipe);

        return res.status(200).json({
            statusCode: 200,
            msg: "Success",
            data: tipe,
        });
    } catch (error) {
        console.error('Error fetching types:', error);
        return res.status(500).json({
            statusCode: 500,
            msg: "Error fetching types",
        });
    }
});

// Route untuk mendapatkan detail mobil berdasarkan ID
mobilRouter.get('/mobil/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      // Query database untuk mengambil detail mobil berdasarkan ID
      const mobil = await prm.mobil.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!mobil) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Mobil dengan ID ${id} tidak ditemukan.`,
        });
      }
  
      return res.status(200).json({
        statusCode: 200,
        msg: "Success",
        data: mobil,
      });
    } catch (error) {
      console.error('Error fetching car details:', error);
      return res.status(500).json({
        statusCode: 500,
        msg: "Error fetching car details",
      });
    }
  });
  





  
export default mobilRouter;