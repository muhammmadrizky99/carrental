'use client';

import Image from "next/image";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faInfoCircle, faTrash, faXmark, faPencil } from "@fortawesome/free-solid-svg-icons";
import 'tailwindcss/tailwind.css';
import { headers } from "next/headers";
import DetailMobil from "./DetailMobil";
import { api } from "@/lib/api";

const Bengkel = () => {
    const [form, setForm] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [EditMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [ac, setAc] = useState({ ac: true });

    const [filterNamaMobil, setFilterNamaMobil] = useState("");
    const [filterTipeMobil, setFilterTipeMobil] = useState("");

    const fetchData = async () => {
        try {
            const response = await api.get('/api/bengkel');
            setData(response.data.data);
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    };

    const [newProduct, setNewProduct] = useState<Product>({
        id: undefined,
        kodeTransaksi: "",
        namaPelanggan: "",
        jenisPelanggan: "",
        tarifService: 0,
        diskon: 0,
        total: 0,
    });

    const [imageURL, setImageURL] = useState<string | null>(null);

    //Fungsi untuk menangani perubahan pada input form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: name === "tarifService" || name === "diskon" ? parseInt(value) : value,
        });
    };

    //manggil detail
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    //tambah produk
    const handleAddProduct = async () => {
        try {
            const response = await api.post("/api/bengkel", {
                kodeTransaksi: newProduct.kodeTransaksi,
                namaPelanggan: newProduct.namaPelanggan,
                jenisPelanggan: newProduct.jenisPelanggan,
                tarifService: newProduct.tarifService,
                diskon: newProduct.diskon,
                total: newProduct.total,
            });
            fetchData(); //refresh data
            setModalOpen(false);
            toast.success("Data berhasil ditambahkan");
            resetForm();
        } catch (error) {
            console.log("Error adding product", error);
            toast.error("Gagal menambahkan produk");
        }
    };

    //edit produk
    const handleEditProduct = (index: number) => {
        setEditMode(true);
        setEditIndex(index);
        setModalOpen(true);
        setNewProduct(data[index]);
    };

    const handleSaveEdit = async () => {
        if (editIndex !== null) {
            try {
                const response = await api.put(`/api/bengkel/${data[editIndex].id}`, newProduct);
                fetchData();
                setModalOpen(false);
                setEditMode(false);
                setEditIndex(null);
                resetForm();
                toast.success("Data berhasil diperbarui");
            } catch (error) {
                console.error("Error updating product:", error);
                toast.error("Gagal memperbarui data produk");
            }
        }
    };

    //hapus produk
    const handleDelete = async (id: number, closeToast: () => void) => {
        try {
            const response = await api.delete(`/api/bengkel/${id}`);
            toast.success("Item berhasil dihapus");
            closeToast();
            fetchData();
        } catch (error) {
            console.error('Error deleting bengkel:', error);
            toast.error("Gagal menghapus item");
        }
    };

    const confirmDelete = (id: number) => {
        toast(
            ({ closeToast }: { closeToast: () => void }) => (
                <div>
                    <p className="mb-5">Anda yakin ingin menghapus item ini?</p>
                    <button onClick={() => handleDelete(id, closeToast)} className="px-4 py-1 bg-red-600 text-white rounded-xl hover:bg-red-700 transition duration-150 mr-2">Ya</button>
                    <button onClick={closeToast} className="px-4 py-1 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition duration-150">Tidak</button>
                </div>
            ),
            { autoClose: false }
        );
    };

    //reset form
    const resetForm = () => {
        setNewProduct({
            id: undefined,
            kodeTransaksi: "",
            namaPelanggan: "",
            jenisPelanggan: "",
            tarifService: 0,
            diskon: 0,
            total: 0,
        });
        setEditIndex(null);
    };

    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="rounded-sm border p-6 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => { setEditMode(false); resetForm(); setModalOpen(true); }} className="px-4 py-2 bg-primary text-white rounded w-45">
                        + Tambah Bengkel
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-6 px-4 py-4.5 bg-gray sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center text-black">
                    <p className="font-medium">Kode Transaksi</p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex text-black">
                    <p className="font-medium">Nama Pelanggan</p>
                </div>
                <div className="col-span-1 flex items-center text-black">
                    <p className="font-medium">Jenis Pelanggan</p>
                </div>
                <div className="col-span-1 flex items-center text-black">
                    <p className="font-medium">Tarif Service</p>
                </div>
                <div className="col-span-1 flex items-center text-black">
                    <p className="font-medium">Diskon</p>
                </div>
                <div className="col-span-1 flex items-center text-black">
                    <p className="font-medium">Total</p>
                </div>
                <div className="col-span-1 flex items-center text-black">
                    <p className="font-medium">Aksi</p>
                </div>
            </div>

            {data.map((product: { kodeTransaksi: string, namaPelanggan: string, jenisPelanggan: string, tarifService: number, diskon: number, total: number, id: number }, key: Key | null | undefined) => (
                <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={key}>
                    <div className="col-span-2 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <p className="text-sm text-black dark:text-white">
                                {product.kodeTransaksi}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">
                            {product.namaPelanggan}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            {product.jenisPelanggan}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            {product.tarifService}
                        </p>
                    </div>

                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            {product.diskon}
                        </p>
                    </div>

                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            {product.total}
                        </p>
                    </div>

                    <div className="col-span-1 flex items-center">
                        <button
                            onClick={() => handleEditProduct(key as number)}
                            className="flex justify-center items-center px-2 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md mr-2"
                        >
                            <FontAwesomeIcon icon={faPencil} />
                        </button>

                        <button
                            onClick={() => confirmDelete(product.id)}
                            className="flex justify-center items-center px-2 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ))}

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50">
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="bg-white p-8 rounded-lg w-96">
                            <h2 className="text-lg font-semibold">{EditMode ? 'Edit Bengkel' : 'Tambah Bengkel'}</h2>

                            <div className="mb-4">
                                <label className="block text-gray-700">Kode Transaksi</label>
                                <input
                                    type="text"
                                    name="kodeTransaksi"
                                    value={newProduct.kodeTransaksi}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nama Pelanggan</label>
                                <input
                                    type="text"
                                    name="namaPelanggan"
                                    value={newProduct.namaPelanggan}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Jenis Pelanggan</label>
                                <input
                                    type="text"
                                    name="jenisPelanggan"
                                    value={newProduct.jenisPelanggan}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Tarif Service</label>
                                <input
                                    type="number"
                                    name="tarifService"
                                    value={newProduct.tarifService}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Diskon</label>
                                <input
                                    type="number"
                                    name="diskon"
                                    value={newProduct.diskon}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Total</label>
                                <input
                                    type="number"
                                    name="total"
                                    value={newProduct.total}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={EditMode ? handleSaveEdit : handleAddProduct}
                                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    {EditMode ? 'Simpan Perubahan' : 'Tambah Bengkel'}
                                </button>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast notifications */}
            <ToastContainer />
        </div>
    );
};

export default Bengkel;
