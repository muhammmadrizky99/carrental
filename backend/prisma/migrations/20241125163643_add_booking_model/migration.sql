-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "tglBooking" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tglMulai" TIMESTAMP(3) NOT NULL,
    "tglSelesai" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "penggunaId" INTEGER NOT NULL,
    "mobilId" INTEGER NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_penggunaId_fkey" FOREIGN KEY ("penggunaId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
