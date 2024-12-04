-- CreateTable
CREATE TABLE "pembayaran" (
    "id" SERIAL NOT NULL,
    "tglPembayaran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jumlahPembayaran" DOUBLE PRECISION NOT NULL,
    "metodePembayaran" VARCHAR(100) NOT NULL,
    "keterangan" TEXT,
    "buktiPembayaran" VARCHAR(255),
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pembayaran_bookingId_key" ON "pembayaran"("bookingId");

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
