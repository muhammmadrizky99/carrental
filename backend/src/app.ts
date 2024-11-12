import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import prm from '../src/config/database'; // Koneksi database menggunakan Prisma
import router from '../src/routes/auth'; // Router auth
import mobilRouter from './routes/mobil'; //router mobil
import path from 'path';

const app = express();
const PORT = process.env.PORT || 2500;

app.use('/uploads', express.static(path.resolve(__dirname, '../public/uploads')));


// Middleware
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());

// Test route
app.get("/test", async (req: Request, res: Response) => {
    try {
        const users = await prm.users.findMany();
        if (!users || users.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                msg: "No data found"
            });
        }
        return res.status(200).json({
            statusCode: 200,
            msg: "Success",
            data: users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            msg: "Server error"
        });
    }
});

// Using auth router
app.use("/api", router);
app.use("/api", mobilRouter);


// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
