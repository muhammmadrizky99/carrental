"use client";
import { api } from "@/lib/api";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

// Definisikan tipe untuk Review
interface Review {
  id: number;
  pengguna: {
    nama: string;
  };
  rating: number;
  komentar: string;
  mobil: {
    namaMobil: string;
  };
  tglBooking: string;
}

const ReviewCard = () => {
  const [reviewList, setReviewList] = useState<Review[]>([]); // Menggunakan tipe Review[]

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get("/api/reviews"); // Endpoint yang sesuai dengan controller Anda
        const data: Review[] = await response.data;
        setReviewList(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-xxl mx-auto">
        {reviewList.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 dark:bg-boxdark dark:border-strokedark"
          >
            <div className="flex items-center mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                <span className="text-xl text-gray-600">👤</span>
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-black dark:text-white">
                  {review.pengguna.nama}
                </h4>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Mobil: {review.mobil.namaMobil}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Tanggal Booking: {new Date(review.tglBooking).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{review.komentar}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
