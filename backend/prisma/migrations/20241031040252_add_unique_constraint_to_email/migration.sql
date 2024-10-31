/*
  Warnings:

  - A unique constraint covering the columns `[nama]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_nama_key" ON "users"("nama");
