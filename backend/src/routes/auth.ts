// src/routes/auth.ts
import express from 'express';
import { LoginController } from '../controllers/AuthController';

const router = express.Router();

// Menggunakan LoginController untuk route login
router.post('/login', LoginController);

export default router;
