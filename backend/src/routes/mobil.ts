import express from 'express';
import { MobilController, semuaMobil } from '../controllers/MobilController';
import { uploadFile } from '../middleware/multerUpload';

const mobilRouter = express.Router();

mobilRouter.post('/mobil', uploadFile.single('gambar'), MobilController);
mobilRouter.get('/mobil',semuaMobil);


export default mobilRouter;