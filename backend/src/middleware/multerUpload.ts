import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let { type } = req.query;
        if (!type) {
            type = "/uploads"; 
        }
        const uploadDir = './public' + type;

        // Membuat direktori jika belum ada
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Math.round(Math.random() * 1e9);
        const fileName = uniqueSuffix + '-' + file.originalname;
        cb(null, fileName);
    }
});
export const uploadFile = multer({ storage });
