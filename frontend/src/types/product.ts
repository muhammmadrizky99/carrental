 
  export type Product = {
    
    filter: (arg0: (_: any, i: any) => boolean) => boolean;
    gambar: File | null;
    namaMobil: string;
    deskripsi: string;
    tipe: string;
    merek: string;
    model: string;
    stok: number;
    tahun: number;
    transmisi: string;
    kapasitasMesin: number;
    kapasitasKursi:number;
    jumlahTas: number;
    jumlahPintu: number;
    warna: string;
    fiturLainnya: string;
    ac: boolean;
    harga: number;
    minimum: number;
    maximum: number;
  };
