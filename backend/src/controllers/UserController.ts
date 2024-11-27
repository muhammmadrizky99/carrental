import { Request, Response } from "express";
import prisma from "../config/database";
import bcrypt from "bcrypt";

// GET: Fetch all users
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await prisma.users.findMany();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// POST: Create a new user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nama, email, password, role } = req.body;

    // Validasi input
    if (!nama || typeof nama !== "string") {
      return res.status(400).json({ success: false, message: "Nama tidak valid." });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, message: "Email tidak valid." });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ success: false, message: "Password minimal 6 karakter." });
    }

    // Periksa apakah email sudah ada
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email sudah terdaftar." });
    }

    // Enkripsi password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await prisma.users.create({
      data: {
        nama,
        email,
        password: hashedPassword, // Gunakan password yang sudah dienkripsi
        role: role || "pengguna",
      },
    });

    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// GET: Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({ where: { id: parseInt(id, 10) } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User tidak ditemukan." });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// PUT: Update user
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { nama, email, password, role, status } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { id: parseInt(id, 10) } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User tidak ditemukan." });
    }

    // Enkripsi password jika ada perubahan
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id, 10) },
      data: { nama, email, password: hashedPassword, role, status },
    });

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// DELETE: Delete user
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({ where: { id: parseInt(id, 10) } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User tidak ditemukan." });
    }

    await prisma.users.delete({ where: { id: parseInt(id, 10) } });

    return res.status(200).json({ success: true, message: "User berhasil dihapus." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};
