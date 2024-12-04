/*
  Warnings:

  - Added the required column `mobilId` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review" ADD COLUMN     "mobilId" INTEGER NOT NULL,
ADD COLUMN     "tglBooking" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
