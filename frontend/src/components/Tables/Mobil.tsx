'use client';

import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import 'tailwindcss/tailwind.css';
import { headers } from "next/headers";


const TableTwo = () => {

  const [form, setForm] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [EditMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [ac, setAc] = useState({ ac: true });


  const handleAc = (e: any) => {
    const value = e.target.value
    setAc({
      ...ac,
      ac: value === "true"
    })
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:2500/api/mobil');
      setData(response.data.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const [newProduct, setNewProduct] = useState<Product>({
    filter: () => true,
    gambar: null,
    namaMobil: "",
    deskripsi: "",
    tipe: "",
    merek: "",
    model: "",
    stok: 0,
    tahun: new Date().getFullYear(),
    transmisi: "",
    kapasitasMesin: 0,
    kapasitasKursi: 0,
    jumlahTas: 0,
    jumlahPintu: 0,
    warna: "",
    fiturLainnya: "",
    ac: false,
    harga: 0,
    minimum: 0,
    maximum: 0
  });

  const [imageURL, setImageURL] = useState<string | null>(null);
  //Fungsi untuk menangani perubahan pada input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setNewProduct({
      ...newProduct,
      [name]: name === "harga" || name === "tahun" ? parseInt(value) : value,
    });
  };

  //Fungsi untuk menangani perubahan pada file gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewProduct({
      ...newProduct,
      gambar: file,
    });

    //Mengonversi file ke url jika file ada
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImageURL(objectURL);
    } else {
      setImageURL(null);
    }
  };



  //tambah produk
  const handleAddProduct = async () => {
    try {
      console.log("Sending product data: ", newProduct);
      const response = await axios.post("http://localhost:2500/api/mobil", {
        headers: { "Content-Type": "multipart/form-data" },
        gambar: newProduct.gambar,
        namaMobil: newProduct.namaMobil,
        deskripsi: newProduct.deskripsi,
        tipe: newProduct.tipe,
        merek: newProduct.merek,
        model: newProduct.model,
        stok: newProduct.stok,
        tahun: newProduct.tahun,
        transmisi: newProduct.transmisi,
        kapasitasMesin: newProduct.kapasitasMesin,
        kapasitasKursi: newProduct.kapasitasKursi,
        jumlahTas: newProduct.jumlahTas,
        jumlahPintu: newProduct.jumlahPintu,
        warna: newProduct.warna,
        fiturLainnya: newProduct.fiturLainnya,
        ac: ac.ac,
        harga: newProduct.harga,
        minimum: newProduct.minimum,
        maximum: newProduct.maximum
      }, { "headers": { "Content-Type": "multipart/form-data" } });
      console.log("Response after adding product:", response);
      fetchData(); //refresh data
      setModalOpen(false);
      toast.success("Data berhasil ditambahkan");
      // Reset form setelah sukses
      resetForm();
    } catch (error) {
      console.log("Error adding product", error);
      toast.error("Gagal menambahkan produk");

    }
    resetForm();
  };


  //edit produk
  const handleEditProduct = (index: number ) => {
    setEditMode(true);
    setEditIndex(index);
    setModalOpen(true);
    setNewProduct(data[index]);
  };

  const handleSaveEdit = async () => {
    if (editIndex !== null) {
      try {
        console.log("Saving edited product at index:", editIndex); 
        const response = await axios.put(`http://localhost:2500/api/mobil/${data[editIndex].id}`, newProduct);
        console.log("Produk berhasil diperbarui", response.data);

        fetchData();
        setModalOpen(false);
        setEditMode(false);
        setEditIndex(null);
        resetForm();
        toast.success("Data berhasil diperbarui");
      } catch(error) {
        console.error("Error updating product:", error);
        toast.error("Gagal memperbarui data produk");
      }
    }
  };  

  //hapus
  const handleDelete = async (id: number, closeToast:() => void ) => {
    try {
      const response = await axios.delete(`http://localhost:2500/api/mobil/${id}`);
      toast.success("Item berhasil dihapus"); // Menampilkan pesan dari server
      closeToast();
      fetchData();
      
    } catch (error) {
      console.error('Error deleting mobil:', error);
      toast.error("Gagal menghapus item");
    }
  };

  const confirmDelete = (id: number) => {
    toast(
      ({ closeToast }:{ closeToast: () => void }) => (
        <div>
          <p className="mb-5">Anda yakin ingin menghapus item ini?</p>
          
          <button onClick={() => handleDelete(id, closeToast)}
            className="px-4 py-1 bg-red-600 text-white rounded-xl hover:bg-red-700 transition duration-150 mr-2"
            >Ya</button>
          <button onClick={closeToast}
           className="px-4 py-1 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition duration-150"
          >Tidak</button>
        </div>
      ),
      { autoClose: false } // Toast tidak akan tertutup otomatis
    );
  };

  //reset form
  const resetForm = () => {
    setNewProduct({
      filter: () => true,
      gambar: null,
      namaMobil: "",
      deskripsi: "",
      tipe: "",
      merek: "",
      model: "",
      stok: 0,
      tahun: new Date().getFullYear(),
      transmisi: "",
      kapasitasMesin: 0,
      kapasitasKursi: 0,
      jumlahTas: 0,
      jumlahPintu: 0,
      warna: "",
      fiturLainnya: "",
      ac: false,
      harga: 0,
      minimum: 0,
      maximum: 0
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
        <h4 className="text-xl font-semibold text-black dark:text-white">
          DATA MOBIL
        </h4>
        <div className="flex justify-end">
          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-1 bg-primary text-white rounded"
          >
            + Tambah Mobil
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 px-4 py-4.5 bg-gray sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center text-black ">
          <p className="font-medium">Mobil</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex text-black ">
          <p className="font-medium">Tipe</p>
        </div>
        <div className="col-span-1 flex items-center text-black ">
          <p className="font-medium">Model</p>
        </div>
        <div className="col-span-1 flex items-center text-black ">
          <p className="font-medium">Tahun</p>
        </div>
        <div className="col-span-1 flex items-center text-black ">
          <p className="font-medium">Harga</p>
        </div>
        <div className="col-span-1 flex items-center text-black ">
          <p className="font-medium">Stok</p>
        </div>
        <div className="col-span-1 flex items-center text-black ">
          <p className="font-medium">Aksi</p>
        </div>
      </div>

      {data.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                {product.gambar ? (
                  <img
                    src={product.gambar}
                    width={60}
                    height={50}
                    alt="Product"

                  />
                ) : (
                  <p>Gambar tidak tersedia</p>
                )}

              </div>
              <p className="text-sm text-black dark:text-white">
                {product.namaMobil}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.tipe}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.model}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.tahun}
            </p>
          </div>

          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.harga}
            </p>
          </div>

          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.stok}
            </p>
          </div>


          <div className="col-span-1 flex items-center space-x-2">
            {/* Tombol Edit */}
            <button
              onClick={() => handleEditProduct(key)}
              className="px-2 py-1 bg-gray-400 text-white rounded"
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>

            {/* Tombol Delete */}
            <button 
              onClick={() => confirmDelete(product.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            {/* <button
              onClick={() => handleDetailProduct(key)}
              className="px-2 py-1 bg-blue-400 text-white rounded"
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </button> */}
          </div>
        </div>
      ))}

      {/* ketika buka modal */}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl mx-4 md:mx-auto max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Tambah Mobil</h2>

            <div className="mb-4">
              <label className="block text-gray-700">Upload Gambar</label>
              <input
                type="file"
                name="gambar"
                accept="image/*" // Membatasi file yang bisa diupload hanya gambar
                onChange={handleImageChange}
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            {newProduct.gambar && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold">Preview Gambar:</h3>
                <img
                  src={typeof newProduct.gambar === 'string' ? newProduct.gambar : URL.createObjectURL(newProduct.gambar)}
                  alt="Preview"
                  className="mt-2 rounded"
                  width={100}  // Menampilkan gambar dengan ukuran yang sesuai
                />
              </div>
            )}
            <div className="grid grid-cols-1  gap-4">
              <div>
                <label className="block text-gray-700">Nama Mobil</label>
                <input
                  type="text"
                  name="namaMobil"
                  value={newProduct.namaMobil}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Deskripsi</label>
                <input
                  type="text"
                  name="deskripsi"
                  value={newProduct.deskripsi}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tipe</label>
                <input
                  type="text"
                  name="tipe"
                  value={newProduct.tipe}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Merek</label>
                <input
                  type="text"
                  name="merek"
                  value={newProduct.merek}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Model</label>
                <input
                  type="text"
                  name="model"
                  value={newProduct.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Stok</label>
                <input
                  type="number"
                  name="stok"
                  value={newProduct.stok}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700">Tahun</label>
                <input
                  type="number"
                  name="tahun"
                  value={newProduct.tahun}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div >
                <label className="block text-gray-700">Transmisi</label>
                <input
                  type="text"
                  name="transmisi"
                  value={newProduct.transmisi}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div >
                <label className="block text-gray-700">Kapasitas Mesin</label>
                <input
                  type="number"
                  name="kapasitasMesin"
                  value={newProduct.kapasitasMesin}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div >
                <label className="block text-gray-700">Kapasitas Kursi</label>
                <input
                  type="number"
                  name="kapasitasKursi"
                  value={newProduct.kapasitasKursi}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div >
                <label className="block text-gray-700">Jumlah Tas</label>
                <input
                  type="number"
                  name="jumlahTas"
                  value={newProduct.jumlahTas}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div >
                <label className="block text-gray-700">Jumlah Pintu</label>
                <input
                  type="number"
                  name="jumlahPintu"
                  value={newProduct.jumlahPintu}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div >
                <label className="block text-gray-700">Warna</label>
                <input
                  type="text"
                  name="warna"
                  value={newProduct.warna}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div >
                <label className="block text-gray-700">Fitur Lainnya</label>
                <input
                  type="text"
                  name="fiturLainnya"
                  value={newProduct.fiturLainnya}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* fitur lainnya */}

              <div >
                <label className="block text-gray-700">AC</label>
                <div className="flex items-center mt-2 space-x-4">
                  <label >
                    <input
                      type="radio"
                      name="ac"
                      value="true"
                      checked={ac.ac === true}
                      onChange={handleAc}
                      className="mr-1"
                    />
                    Tersedia
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="ac"
                      value="false"
                      checked={ac.ac === false}
                      onChange={handleAc}
                      className="mr-1"
                    />
                    Tidak Tersedia
                  </label>
                </div>
              </div>

              <div >
                <label className="block text-gray-700">Harga</label>
                <input
                  type="number"
                  name="harga"
                  value={newProduct.harga}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Minimum</label>
                <input
                  type="number"
                  name="minimum"
                  value={newProduct.minimum}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div >
                <label className="block text-gray-700">Maximum</label>
                <input
                  type="number"
                  name="maximum"
                  value={newProduct.maximum}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Batal
                </button>
                <button
                  onClick={EditMode ? handleSaveEdit : handleAddProduct}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                >
                  {EditMode ? "Simpan" : "Tambah"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default TableTwo;
