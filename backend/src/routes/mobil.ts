import express from 'express';
import prm from '../config/database'; 
import { Router, Request, Response } from 'express';
import { deleteMobil, MobilController, semuaMobil, editMobil } from '../controllers/MobilController';

import { uploadFile } from '../middleware/multerUpload';

const mobilRouter = express.Router();

mobilRouter.post('/mobil', uploadFile.single('gambar'), MobilController);
mobilRouter.get('/mobil',semuaMobil);
mobilRouter.delete('/mobil/:id', deleteMobil);
mobilRouter.put('/mobil/:id', uploadFile.single('gambar'), editMobil);

// Route untuk mendapatkan tahun dari tabel "mobil"
mobilRouter.get('/mobil/tahun', async (req: Request, res: Response) => {
    try {
        const result = await prm.mobil.findMany({
            distinct: ['tahun'],
            orderBy: {
                tahun: 'asc',
            },
        });
        const tahun = result.map((row) => row.tahun); // Ambil field tahun saja
        return res.status(200).json({
            statusCode: 200,
            msg: "Success",
            data: tahun,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            msg: "Error fetching years",
        });
    }
});



export default mobilRouter;