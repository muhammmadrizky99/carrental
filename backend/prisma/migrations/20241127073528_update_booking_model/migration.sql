/*
  Warnings:

  - A unique constraint covering the columns `[bookingId]` on the table `pengembalian` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pengembalian_bookingId_key" ON "pengembalian"("bookingId");
