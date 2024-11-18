"use client"
import React, { useEffect, useState } from 'react';

interface Mobil {
  id: number;
  namaMobil: string;
  tipe: string;
  harga: number;
  transmisi: string;
  tahun: number;
  gambar: string; // Gambar sebaiknya berupa URL string, bukan File
}

const CariMobil: React.FC = () => {
  const [filters, setFilters] = useState({
    namaMobil: '',
    tipe: '',
    model: '',
    tahun: [2000, 2023],
    harga: [0, 5000],
    transmisi: '',
  });

  const [cars, setCars] = useState<Mobil[]>([]); // State untuk menyimpan data mobil
  const [loading, setLoading] = useState<boolean>(true); // State untuk loading indicator
  const [error, setError] = useState<string>(''); // State untuk menyimpan pesan error

  // Fetch data dari API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:2500/api/mobil');
        const result = await response.json();
  
        console.log('Response Data:', result); // Menampilkan data yang diterima dari API
  
        // Mengakses array data di dalam properti "data"
        if (Array.isArray(result.data)) {
          setCars(result.data); // Mengisi state 'cars' dengan data dari API
        } else {
          throw new Error('Invalid data format: Expected an array');
        }
      } catch (error: any) {
        console.error('Error fetching cars:', error);
        setError('Gagal mengambil data mobil.');
        setCars([]); // Mengatur state 'cars' menjadi array kosong jika gagal
      }
      setLoading(false);
    };
  
    fetchCars();
  }, []);
  

  // Fungsi untuk menangani perubahan filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter mobil berdasarkan filter yang diterapkan
  const filteredCars = cars.filter((car) => {
    const withinPriceRange = car.harga >= filters.harga[0] && car.harga <= filters.harga[1];
    const withinYearRange = car.tahun >= filters.tahun[0] && car.tahun <= filters.tahun[1];
    const matchesTransmisi = filters.transmisi ? car.transmisi === filters.transmisi : true;
    const matchesNamaMobil = car.namaMobil.toLowerCase().includes(filters.namaMobil.toLowerCase());
    const matchesTipe = filters.tipe ? car.tipe === filters.tipe : true;

    return (
      withinPriceRange &&
      withinYearRange &&
      matchesTransmisi &&
      matchesNamaMobil &&
      matchesTipe
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
                {/* Tipe mobil bisa diisi berdasarkan data API */}
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                {/* Tambahkan tipe lainnya sesuai dengan data */}
              </select>
            </div>

            <div className="mb-4 w-full sm:w-40">
              <label className="block text-sm font-medium text-gray-700">Tahun</label>
              <select
                name="tahun"
                className="w-full border border-gray-300 rounded-md p-2"
                value={filters.tahun[0] === 0 ? '' : String(filters.tahun[0])}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    tahun: [Number(e.target.value), filters.tahun[1]],
                  })
                }
              >
                <option value="">Semua Tahun</option>
                {/* Isi tahun berdasarkan data atau range yang Anda tentukan */}
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                {/* Lanjutkan dengan tahun lainnya */}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4 w-full sm:w-60">
              <label className="block text-sm font-medium text-gray-700">Kisaran Harga</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="harga"
                  placeholder="Min"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={filters.harga[0] || ""}
                  onChange={(e) => setFilters({ ...filters, harga: [+e.target.value, filters.harga[1]] })}
                />
                <input
                  type="number"
                  name="priceMax"
                  placeholder="Max"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={filters.harga[1] || ""}
                  onChange={(e) => setFilters({ ...filters, harga: [filters.harga[0], +e.target.value] })}
                />
              </div>
            </div>

            {/* Transmission Filter */}
            <div className="mb-4 w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">Transmisi</label>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-md ${filters.transmisi === 'Manual' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setFilters({ ...filters, transmisi: 'Manual' })}
                >
                  Manual
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${filters.transmisi === 'Automatic' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setFilters({ ...filters, transmisi: 'Automatic' })}
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
              <p className="text-sm text-gray-600 mb-2">{car.tipe}</p>
              <p className="text-sm text-gray-800 font-bold mb-2">Rp {car.harga}/day</p>
              <p className="text-sm text-gray-600 mb-4">{car.tahun} - {car.transmisi}</p>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">Sewa Sekarang</button>
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
