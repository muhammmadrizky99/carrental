/*
  Warnings:

  - You are about to drop the column `mobilId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `tglBooking` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_mobilId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_userId_fkey";

-- AlterTable
ALTER TABLE "review" DROP COLUMN "mobilId",
DROP COLUMN "tglBooking",
DROP COLUMN "userId";
