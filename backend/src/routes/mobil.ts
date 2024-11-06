import express from 'express';
import { MobilController } from '../controllers/MobilController';

const mobilRouter = express.Router();

mobilRouter.post('/mobil', MobilController);

export default mobilRouter;
