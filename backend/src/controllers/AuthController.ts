import { Request, Response } from 'express';
import prm from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const LoginController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        // Cari pengguna berdasarkan email
        const user = await prm.users.findUnique({ where: { email: email } });

        // Jika pengguna tidak ditemukan
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                msg: "Not registered"
            });
        }

        // Periksa apakah password yang dimasukkan valid (menggunakan bcrypt.compare)
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Jika password tidak valid
        if (!isPasswordValid) {
            return res.status(401).json({
                statusCode: 401,
                msg: "Invalid credential"
            });
        }

        const token = jwt.sign({user}, "sdhfkhskhfkj-wejtrhwejt-ertj", {expiresIn: "1d"})

        // Jika login berhasil
        return res.status(200).json({
            statusCode: 200,
            msg: "Login successful",
            data: user,  // Anda bisa menambahkan data lain seperti nama atau token jika diperlukan
            token: token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            msg: "Server error",
        });
    }
};
