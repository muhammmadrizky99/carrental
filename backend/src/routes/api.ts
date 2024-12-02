// src/routes/auth.ts
import express from 'express';
import { LoginController } from '../controllers/AuthController';
import { RegisterController } from '../controllers/RegisterController';
import { deleteMobil, editMobil, idMobil, mobil, MobilController, semuaMobil, tipeMobil } from '../controllers/MobilController';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/BookingController';
import { uploadFile } from '../middleware/multerUpload';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/UserController';
import { deleteBooking, getApprovedBookingsForReturn, pengembalianMobil } from '../controllers/PengembalianController';
import authMiddleware from '../middleware/authMiddleware';


const router = express.Router();

// Menggunakan LoginController untuk route login
router.post('/login', LoginController);

router.post('/register', RegisterController);

router.post('/mobil',authMiddleware, uploadFile.single('gambar'), MobilController);
router.get('/mobil',authMiddleware, semuaMobil);
router.delete('/mobil/:id',authMiddleware, deleteMobil);
router.put('/mobil/:id',authMiddleware, uploadFile.single('gambar'), editMobil);

router.get("/booking",authMiddleware, getBookings);
router.post("/booking",authMiddleware, createBooking);
router.put("/booking/:id",authMiddleware, updateBookingStatus);


router.get('/mobil/tahun/:tahun',authMiddleware, mobil );
router.get('/mobil/tipe',authMiddleware, tipeMobil);
router.get('/mobil/:id',authMiddleware, idMobil);

// Routes untuk User
router.get("/users",authMiddleware, getUsers); 
router.post("/users",authMiddleware, createUser); 
router.get("/users/:id",authMiddleware, getUserById); 
router.put("/users/:id",authMiddleware, updateUser); 
router.delete("/users/:id",authMiddleware, deleteUser); 

router.post("/pengembalian", authMiddleware, pengembalianMobil);
router.get("/pengembalian",authMiddleware, getApprovedBookingsForReturn);
router.delete("/booking/:id",authMiddleware, deleteBooking);

export default router;
