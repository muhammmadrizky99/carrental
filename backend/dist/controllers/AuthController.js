"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const database_1 = __importDefault(require("../config/database")); // Pastikan impor prisma Anda benar
const LoginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await database_1.default.users.findUnique({
        where: { email: email }
    });
    if (!user) {
        return res.status(404).json({ statusCode: 404, msg: "User not found" });
    }
    if (password !== user.password) {
        return res.status(400).json({ statusCode: 400, msg: "Incorrect password" });
    }
    return res.status(200).json({ statusCode: 200, msg: "Login Successfully" });
};
exports.LoginController = LoginController;
