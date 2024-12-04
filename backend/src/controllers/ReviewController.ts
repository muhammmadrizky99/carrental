import { Request, Response } from "express";
import prisma from "../config/database";

// Create a new review
export const createReview = async (req: Request, res: Response) => {
    const { bookingId, rating, komentar } = req.body;

    try {
        // Validasi input
        if (!bookingId || !rating || rating < 1 || rating > 5 || !komentar) {
            return res.status(400).json({ message: "Data tidak valid." });
        }

        // Cek apakah bookingId valid
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking tidak ditemukan." });
        }

        // Menyimpan review ke database
        const review = await prisma.review.create({
            data: {
                bookingId,
                rating,
                komentar,
            },
        });

        return res.status(201).json({ message: "Review berhasil ditambahkan.", review });
    } catch (err) {
        console.error("Gagal menambahkan review:", err);
        return res.status(500).json({ message: "Gagal menambahkan review." });
    }
};

// Get all reviews for a booking
export const getReviewsByBooking = async (req: Request, res: Response) => {
    const { bookingId } = req.params;

    try {
        // Ambil review berdasarkan bookingId
        const reviews = await prisma.review.findMany({
            where: { bookingId: parseInt(bookingId) },
        });

        if (reviews.length === 0) {
            return res.status(404).json({ message: "Review tidak ditemukan." });
        }

        return res.status(200).json({ reviews });
    } catch (err) {
        console.error("Gagal mengambil data review:", err);
        return res.status(500).json({ message: "Gagal mengambil data review." });
    }
};
