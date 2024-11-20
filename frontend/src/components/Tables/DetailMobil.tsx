import { Product } from "@/types/product";
import React from "react";

interface DetailModalProps {
    isOpen: boolean;
    product: Product | null;
    onClose: () => void;
}

const DetailMobil: React.FC<DetailModalProps> = ({ isOpen, product, onClose }) => {
    if (!isOpen || !product) return null;

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 overflow-y-auto">
            <div className="bg-white p-15 rounded-xl  shadow-lg w-full max-w-4xl  md:mx-auto max-h-[65vh] overflow-y-auto">
                <h2 className="text-xl  font-semibold mb-20 text-center">Detail Mobil</h2>
                <div className="grid grid-cols-2 md-grid-cols-2 gap-4 ">
                    <div>
                        <div>
                            <strong>Nama Mobil :</strong> {product.namaMobil}
                        </div>
                        <div>
                            <strong>Deskripsi :</strong> {product.deskripsi}
                        </div>
                        <div>
                            <strong>Tipe :</strong> {product.tipe}
                        </div>
                        <div>
                            <strong>Merek :</strong> {product.merek}
                        </div>
                        <div>
                            <strong>Model :</strong> {product.model}
                        </div>
                        <div>
                            <strong>Stok :</strong> {product.stok}
                        </div>
                        <div>
                            <strong>Tahun :</strong> {product.tahun}
                        </div>
                        <div>
                            <strong>Harga :</strong> {product.harga}
                        </div>
                        <div>
                            <strong>Transmisi :</strong> {product.transmisi}
                        </div>
                    </div>
                    {/* kolom 2 */}
                    <div>
                        <div>
                            <strong>Kapasitas Mesin :</strong> {product.kapasitasMesin} cc
                        </div>
                        <div>
                            <strong>Kapasitas Kursi :</strong> {product.kapasitasKursi}
                        </div>
                        <div>
                            <strong>Jumlah Tas :</strong> {product.jumlahTas}
                        </div>
                        <div>
                            <strong>Jumlah Pintu :</strong> {product.jumlahPintu}
                        </div>
                        <div>
                            <strong>Warna :</strong> {product.warna}
                        </div>
                        <div>
                            <strong>AC :</strong> {product.ac ? "Ya" : "Tidak"}
                        </div>
                        <div>
                            <strong>Fitur Lainnya :</strong> {product.fiturLainnya}
                        </div>
                        <div>
                            <strong>Minimum :</strong> {product.minimum}
                        </div>
                        <div>
                            <strong>Maximum :</strong> {product.maximum}
                        </div>
                    </div>
                    <div className="mt-4 pl-180 ">
                        <button
                            className="px-4 py-1 text-white rounded bg-blue-700"
                            onClick={onClose}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailMobil;
