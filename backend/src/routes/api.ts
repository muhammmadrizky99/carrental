// src/routes/auth.ts
import express from 'express';
import { LoginController } from '../controllers/AuthController';
import { RegisterController } from '../controllers/RegisterController';
import { deleteMobil, editMobil, idMobil, mobil, MobilController, semuaMobil, tipeMobil } from '../controllers/MobilController';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/BookingController';
import { uploadFile } from '../middleware/multerUpload';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/UserController';
import { deleteBooking, getApprovedBookingsForReturn, pengembalianMobil } from '../controllers/PengembalianController';


const router = express.Router();

// Menggunakan LoginController untuk route login
router.post('/login', LoginController);

router.post('/register', RegisterController);

router.post('/mobil', uploadFile.single('gambar'), MobilController);
router.get('/mobil', semuaMobil);
router.delete('/mobil/:id', deleteMobil);
router.put('/mobil/:id', uploadFile.single('gambar'), editMobil);

router.get("/booking", getBookings);
router.post("/booking", createBooking);
router.put("/booking/:id", updateBookingStatus);


router.get('/mobil/tahun/:tahun', mobil );
router.get('/mobil/tipe', tipeMobil);
router.get('/mobil/:id', idMobil);

// Routes untuk User
router.get("/users", getUsers); 
router.post("/users", createUser); 
router.get("/users/:id", getUserById); 
router.put("/users/:id", updateUser); 
router.delete("/users/:id", deleteUser); 

router.post("/pengembalian", pengembalianMobil);
router.get("/pengembalian", getApprovedBookingsForReturn);
router.delete("/booking/:id", deleteBooking);


export default router;
