-- CreateTable
CREATE TABLE "mobil" (
    "id" SERIAL NOT NULL,
    "gambar" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "merek" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "transmisi" TEXT NOT NULL,
    "kapasitasMesin" INTEGER NOT NULL,
    "kapasitasKursi" INTEGER NOT NULL,
    "jumlahTas" INTEGER NOT NULL,
    "jumlahPintu" INTEGER NOT NULL,
    "warna" TEXT NOT NULL,
    "fiturLainnya" TEXT NOT NULL,
    "ac" BOOLEAN NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "minimum" INTEGER NOT NULL,
    "maximum" INTEGER NOT NULL,

    CONSTRAINT "mobil_pkey" PRIMARY KEY ("id")
);
