// src/controllers/AuthController.ts
import { Request, Response } from 'express';
import prisma from '../config/database';
import bcrypt from 'bcrypt';

// Fungsi untuk registrasi pengguna
export const RegisterController = async (req: Request, res: Response) => {
    const { nama, email, password } = req.body;

    try {
        // Periksa apakah email sudah terdaftar
        const existingUser = await prisma.users.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return res.status(400).json({ statusCode: 400, msg: "Email already registered" });
        }

        // Hash password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                nama: nama,
                email: email,
                password: hashedPassword,
                role:"pengguna",
                status:"aktiv"
            }
        });

        return res.status(201).json({
            statusCode: 201,
            msg: "User registered successfully",
            data: {
                email: newUser.email, 
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, msg: "Server error" });
    }
};
