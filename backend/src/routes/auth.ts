// src/routes/auth.ts
import express from 'express';
import { LoginController } from '../controllers/AuthController';
import { RegisterController } from '../controllers/RegisterController';
import { MobilController } from '../controllers/MobilController';


const router = express.Router();

// Menggunakan LoginController untuk route login
router.post('/login', LoginController);

router.post('/register', RegisterController);



export default router;
