"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Mobil {
  id: number;
  namaMobil: string;
  tipe: string;
  harga: number;
  transmisi: string;
  tahun: number;
  gambar: string;
  stok: number;
}

const CariMobil: React.FC = () => {
  const [filters, setFilters] = useState<{
    namaMobil: string;
    tipe: string;
    model: string;
    tahun: number | null;
    harga: [number, number | null];
    transmisi: string;
  }>({
    namaMobil: '',
    tipe: '',
    model: '',
    tahun: null,
    harga: [0, null],
    transmisi: '',
  });

  const [cars, setCars] = useState<Mobil[]>([]); // State untuk menyimpan data mobil
  const [loading, setLoading] = useState<boolean>(true); // State untuk loading indicator
  const [error, setError] = useState<string>(''); // State untuk menyimpan pesan error
  const [tipeOptions, setTipeOptions] = useState<string[]>([]);
  const [tahunOptions, setTahunOptions] = useState<number[]>([]);


  const fetchAllCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:2500/api/mobil");
      console.log(response.data);

      // if (!response.ok) throw new Error("Gagal mengambil data mobil");
      // const result = await response.json();
      const data: any = response.data.data;
      setCars(data);

      console.log(cars ?? 'ddd');
      // console.log(cars.map((car)=>car.tahun));
      setTahunOptions(Array.from(new Set(data.map((car: any) => car.tahun))))
    } catch (error: any) {
      console.error("Error fetching cars:", error);
      setError("Gagal mengambil data mobil.");
    } finally {
      console.log("final");

      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("test");

    fetchAllCars();
  }, [])

  useEffect(() => {
    const fetchTipeOptions = async () => {
      try {
        const response = await fetch('http://localhost:2500/api/mobil/tipe');
        if (!response.ok) {
          throw new Error('Failed to fetch types');
        }
        const result = await response.json();
        setTipeOptions(result.data || []); // Simpan daftar tipe di state
        console.log("tipeOptions");


      } catch (error) {
        console.error('Gagal mengambil data tipe:', error);
      }
    };
    fetchTipeOptions();
    console.log("tes");

  }, []);




  // Fetch data mobil berdasarkan filter tahun
  const fetchMobilByTahun = async (tahun: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:2500/api/mobil/tahun/${tahun}`);
      if (!response.ok) throw new Error("Gagal mengambil data mobil");
      const result = await response.json();
      setCars(result.data || []);
    } catch (error: any) {
      console.error("Error fetching cars:", error);
      setError("Gagal mengambil data mobil.");
    } finally {
      setLoading(false);
    }
  };




  // Fetch semua data mobil
  useEffect(() => {


    fetchAllCars();

    // if (!filters.tahun) {
    //   fetchAllCars(); // Ambil semua data jika tahun tidak dipilih
    // } else {
    //   fetchMobilByTahun(String(filters.tahun)); // Ambil data berdasarkan tahun
    // }
  }, [filters.tahun]);


  // Fungsi untuk menangani perubahan filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === 'tahun' ? (value ? Number(value) : null) : value, // Convert value to number for tahun
    }));
  };


  // Filter mobil berdasarkan filter yang diterapkan
  const filteredCars = cars.filter((car) => {
    const withinPriceRange =
      car.harga >= filters.harga[0] &&
      (filters.harga[1] === null || car.harga <= filters.harga[1]!);

    const matchesTransmisi = filters.transmisi ? car.transmisi === filters.transmisi : true;
    const matchesNamaMobil = car.namaMobil.toLowerCase().includes(filters.namaMobil.toLowerCase());
    const matchesTipe = filters.tipe ? car.tipe === filters.tipe : true;
    const matchesTahun = filters.tahun ? car.tahun === filters.tahun : true; // Only match if tahun is selected

    return (
      withinPriceRange &&
      matchesTransmisi &&
      matchesNamaMobil &&
      matchesTipe &&
      matchesTahun
    );
  });



  return (
    <div className="container mx-auto p-4">
      {/* Main layout with Filter and Car List side by side */}
      <div className="flex gap-4 flex-wrap mb-4">

        {/* Filter Section in Card */}
        <div className="bg-white p-6 border rounded-md w-full sm:w-full shadow-md">
          <h3 className="text-xl font-bold mb-4">Filter Mobil</h3>

          {/* Filter Fields (Horizontal Layout) */}
          <div className="flex gap-4 flex-wrap mb-4">
            <div className='mb-4 w-full sm:w-40'>
              <label className="block text-sm font-medium text-gray-700">Nama mobil</label>
              <input
                type="text"
                name="namaMobil"
                placeholder="Chevrolet"
                className="w-full border border-gray-300 rounded-md p-2"
                value={filters.namaMobil}
                onChange={handleFilterChange}
              />
            </div>

            <div className="mb-4 w-full sm:w-40">
              <label className="block text-sm font-medium text-gray-700">Tipe</label>
              <select
                name="tipe"
                className="w-full border border-gray-300 rounded-md p-2"
                value={filters.tipe}
                onChange={handleFilterChange}
              >
                <option value="">Semua Tipe</option>
                {tipeOptions.map((tipe) => (
                  <option key={tipe} value={tipe}>
                    {tipe}
                  </option>
                ))}
              </select>
            </div>


            <div className="mb-4 w-full sm:w-40">
              <label className="block text-sm font-medium text-gray-700">Tahun</label>
              <select
                name="tahun"
                className="w-full border border-gray-300 rounded-md p-2"
                value={filters.tahun || ''}  // Handle null as an empty string for the select value
                onChange={handleFilterChange}
              >
                <option value="">Semua Tahun</option>
                {tahunOptions.map((tahun) => (
                  <option key={tahun} value={tahun}>
                    {tahun}
                  </option>
                ))}
              </select>

            </div>



            {/* Price Range Filter */}
            <div className="mb-4 w-full sm:w-60">
              <label className="block text-sm font-medium text-gray-700">Kisaran Harga</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="hargaMin"
                  placeholder="Min"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={filters.harga[0] || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      harga: [Number(e.target.value), filters.harga[1]],
                    })
                  }
                />
                <input
                  type="number"
                  name="hargaMax"
                  placeholder="Max"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={filters.harga[1] === null ? "" : filters.harga[1]}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      harga: [
                        filters.harga[0],
                        e.target.value === "" ? null : Number(e.target.value),
                      ],
                    })
                  }
                />
              </div>

            </div>

            {/* Transmission Filter */}
            <div className="mb-4 w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">Transmisi</label>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-md ${filters.transmisi === 'Manual' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      transmisi: prev.transmisi === 'Manual' ? '' : 'Manual', // Toggle antara 'Manual' dan ''
                    }))
                  }
                >
                  Manual
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${filters.transmisi === 'Automatic' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      transmisi: prev.transmisi === 'Automatic' ? '' : 'Automatic', // Toggle antara 'Automatic' dan ''
                    }))
                  }
                >
                  Automatic
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Car List Section */}
      <div className="grid grid-cols-3 gap-4">
        {loading ? (
          <p>Loading mobil ...</p>
        ) : error ? (
          <p>{error}</p> // Menampilkan pesan error jika gagal fetch data
        ) : filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car.id} className="bg-white border border-gray-300 rounded-md p-4">
              <img
                src={car.gambar || 'placeholder.jpg'}
                alt={car.namaMobil || 'Gambar mobil'}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-bold mb-2">{car.namaMobil}</h4>
              <p className="text-sm text-gray-600 mb-2">Tipe : {car.tipe}</p>
              <p className="text-sm text-gray-800 font-bold mb-2">Rp {car.harga}/day</p>
              <p className="text-sm text-gray-600 mb-4">{car.tahun} - {car.transmisi}</p>
              {/* <button 
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => window.location.href = `/detailsewa/${car.id}`}>
                Sewa Sekarang
              </button> */}
              <div className="flex items-center justify-between mt-2">
                <Link href={`/umum/detailsewa/${car.id}`}>
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                    Sewa Sekarang
                  </button>
                </Link>
                <p className="font-bold bg-gray-400 text-white inline-block px-2 rounded-md  mb-2 mt-3 ">
                  Stok : {car.stok}
                </p>

              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada mobil yang ditemukan</p>
        )}
      </div>
    </div>
  );
};

export default CariMobil;
