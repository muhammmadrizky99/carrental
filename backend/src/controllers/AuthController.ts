// src/controllers/AuthController.ts
import { Request, Response } from 'express';
import prm from '../config/database';

export const LoginController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        // Logika autentikasi di sini (misal, verifikasi dengan database)

        const user = await prm.users.findUnique({ where: { email: email } })
        if (!user) return res.status(400).json({
            statusCode: 400,
            msg: "Not registered"
        })

        if (user.password !== password) {
            return res.status(401).json({
                statusCode: 401,
                msg: "Invalid credential"
            })
        }

        return res.status(200).json({
            statusCode: 200,
            msg: "Login successful",
            data: { email }, // Ganti ini dengan data pengguna yang sesuai
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            msg: "Server error",
        });
    }
};
