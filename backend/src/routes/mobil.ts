import express from 'express';
import { deleteMobil, MobilController, semuaMobil, editMobil } from '../controllers/MobilController';

import { uploadFile } from '../middleware/multerUpload';

const mobilRouter = express.Router();

mobilRouter.post('/mobil', uploadFile.single('gambar'), MobilController);
mobilRouter.get('/mobil',semuaMobil);
mobilRouter.delete('/mobil/:id', deleteMobil);
mobilRouter.put('/mobil/:id', uploadFile.single('gambar'), editMobil);



export default mobilRouter;