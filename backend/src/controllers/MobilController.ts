// src/controllers/MobilController.ts

import { NextFunction, Request, Response } from 'express';
import prisma from '../config/database';
import prm from '../config/database';


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

 
//update
export const editMobil = async (req: Request, res: Response) => {
  const { id } = req.params; // Mengambil ID dari parameter URL
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
    maximum,
  } = req.body;

  try {
    // Menemukan mobil berdasarkan ID
    const mobil = await prisma.mobil.findUnique({
      where: { id: Number(id) },
    });

    if (!mobil) {
      return res.status(404).json({ msg: 'Mobil tidak ditemukan' });
    }

    // Update data mobil
    const mobilUpdated = await prisma.mobil.update({
      where: { id: Number(id) },
      data: {
        gambar: req.file ? `http://localhost:2500/uploads/${req.file.filename}` : mobil.gambar,
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
        maximum: Number(maximum),
      },
    });

    return res.status(200).json({
      msg: "Mobil berhasil diperbarui!",
      data: mobilUpdated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

export const mobil = async (req: Request, res: Response) => {
  try {
      // Ambil parameter tahun dari query
      const { tahun } = req.params;
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
};

export const tipeMobil = async (req: Request, res: Response) => {
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
};

export const idMobil = async (req: Request, res: Response) => {
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
}
