/*
  Warnings:

  - You are about to alter the column `gambar` on the `mobil` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `deskripsi` on the `mobil` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `tipe` on the `mobil` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `merek` on the `mobil` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `model` on the `mobil` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `transmisi` on the `mobil` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `warna` on the `mobil` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `fiturLainnya` on the `mobil` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "mobil" ALTER COLUMN "gambar" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "deskripsi" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "tipe" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "merek" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "model" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "transmisi" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "warna" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "fiturLainnya" SET DATA TYPE VARCHAR(255);
