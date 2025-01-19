-- CreateTable
CREATE TABLE "bengkel" (
    "id" SERIAL NOT NULL,
    "kodeTransaksi" VARCHAR(255) NOT NULL,
    "namaPelanggan" VARCHAR(255) NOT NULL,
    "jenisPelanggan" VARCHAR(255) NOT NULL,
    "tarifService" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "diskon" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0.0,

    CONSTRAINT "bengkel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bengkel_namaPelanggan_key" ON "bengkel"("namaPelanggan");
