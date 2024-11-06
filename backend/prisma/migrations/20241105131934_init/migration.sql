/*
  Warnings:

  - You are about to alter the column `gambar` on the `mobil` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "mobil" ADD COLUMN     "namamobil" TEXT NOT NULL DEFAULT 'Nama Mobil',
ALTER COLUMN "gambar" SET DATA TYPE VARCHAR(255);
