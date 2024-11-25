"use client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    nama: "Danic Yery",
    rating: 5,
    komentar: "I really enjoyed driving this car. It's smooth and comfortable.",
    balasan: null, // Tempat untuk menyimpan balasan admin
  },
  {
    id: 1,
    nama: "Azmi A nya apa?",
    rating: 5,
    komentar: "Yo sabana lamakkk naiak otonyoo daa!!!",
    balasan: null, // Tempat untuk menyimpan balasan admin
  },
];

const ReviewCard = () => {
  const [reviewList, setReviewList] = useState(reviews);
  const [reply, setReply] = useState(""); // Menyimpan teks balasan saat ini
  const [activeReviewId, setActiveReviewId] = useState(null); // Menyimpan ID review yang sedang dibalas

  // Fungsi untuk mengirim balasan
  const handleReplySubmit = (reviewId) => {
    const updatedReviews = reviewList.map((review) =>
      review.id === reviewId ? { ...review, balasan: reply } : review
    );
    setReviewList(updatedReviews);
    setReply(""); // Kosongkan input balasan setelah dikirim
    setActiveReviewId(null); // Tutup form balasan setelah dikirim
  };

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
                  {review.nama}
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
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{review.komentar}</p>

            {/* Tampilkan balasan jika ada */}
            {review.balasan && (
              <div className="mt-3 bg-gray-100 p-2 rounded">
                <strong>Admin:</strong>
                <p className="text-gray-700 dark:text-gray-300">{review.balasan}</p>
              </div>
            )}

            {/* Form untuk membalas komentar */}
            {activeReviewId === review.id ? (
              <div className="mt-3">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none resize-none"
                  rows="3" // Mengatur tinggi awal
                  placeholder="Tulis balasan..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <button
                  onClick={() => handleReplySubmit(review.id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Kirim
                </button>
                <button
                  onClick={() => setActiveReviewId(null)}
                  className="mt-2 ml-2 px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Batal
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveReviewId(review.id)}
                className="mt-4 px-4 bg-blue-200 text-black rounded"
              >
                Balas
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
