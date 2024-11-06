/*
  Warnings:

  - Added the required column `namaMobil` to the `mobil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mobil" ADD COLUMN     "namaMobil" TEXT NOT NULL;
