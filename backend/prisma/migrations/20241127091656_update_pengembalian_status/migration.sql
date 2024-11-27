/*
  Warnings:

  - You are about to drop the column `status` on the `pengembalian` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pengembalian" DROP COLUMN "status",
ADD COLUMN     "statusPengembalian" TEXT NOT NULL DEFAULT 'Kembalikan';
