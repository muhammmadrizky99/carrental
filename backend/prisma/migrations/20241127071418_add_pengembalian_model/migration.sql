-- CreateTable
CREATE TABLE "pengembalian" (
    "id" SERIAL NOT NULL,
    "tanggalPengembalian" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kondisiMobil" TEXT NOT NULL,
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "pengembalian_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pengembalian" ADD CONSTRAINT "pengembalian_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
