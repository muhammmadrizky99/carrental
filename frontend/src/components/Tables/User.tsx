'use client';

import { SetStateAction, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import 'tailwindcss/tailwind.css';
import { api } from "@/lib/api";

const TableUser = () => {
const token = localStorage.getItem("token");
console.log(token);

  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({
    nama: "",
    email: "",
    password: "",
    role: "pengguna",
    status: "aktif"
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Fetch data from API
  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  // Add new user
  const handleAddUser = async () => {
    try {
      console.log("Data yang dikirim:", newUser); // Log the user data
      const response = await api.post("/api/users", newUser);
      toast.success("User berhasil ditambahkan");
      fetchUsers();  // Refresh data
      setModalOpen(false);  // Close modal
      resetForm();  // Reset form
    } catch (error: unknown) {
      // Type assertion: casting the error to AxiosError
      if (axios.isAxiosError(error)) {
        console.error("Error adding user:", error.response?.data || error.message);
      } else {
        console.error("Unknown error:", error);
      }
      toast.error("Gagal menambahkan user");
    }
  };
  

  // Edit user
  const handleEditUser = (index: number) => {
    setEditMode(true);
    setEditIndex(index);
    setModalOpen(true);
    setNewUser(users[index]);
  };

  const handleSaveEdit = async () => {
    if (editIndex !== null) {
      try {
        const response = await api.put(`/api/users/${users[editIndex].id}`, newUser);
        toast.success("User berhasil diperbarui");
        fetchUsers();  // Refresh data
        setModalOpen(false);  // Close modal
        setEditMode(false);  // Reset edit mode
        setEditIndex(null);  // Reset edit index
        resetForm();  // Reset form
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Gagal memperbarui user");
      }
    }
  };

  // Delete user
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/users/${id}`);
      toast.success("User berhasil dihapus");
      fetchUsers();  // Refresh data
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Gagal menghapus user");
    }
  };

  const resetForm = () => {
    setNewUser({
      nama: "",
      email: "",
      password:"",
      role: "pengguna",
      status: "aktif"
    });
    setEditIndex(null);
  };

  return (
    <div className="rounded-sm border p-6 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6">
        <div className="flex justify-end">
          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-1 bg-primary text-white rounded"
          >
            + Tambah User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-x-4 px-4 py-4.5 bg-gray-100 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center text-black px-2">
          <p className="font-medium">Nama</p>
        </div>
        <div className="col-span-2 flex items-center text-black px-2 -ml-5">
          <p className="font-medium">Email</p>
        </div>
        {/* <div className="col-span-2 flex items-center text-black -ml-10">
          <p className="font-medium">Status</p>
        </div> */}
        <div className="col-span-1 flex items-center text-black -ml-11">
          <p className="font-medium">Role</p>
        </div>
        <div className="col-span-1 flex items-center text-black px-2">
          <p className="font-medium">Aksi</p>
        </div>
      </div>

      {users.map((user, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center ml-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {user.nama}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex -ml-2">
            <p className="text-sm text-black dark:text-white">
              {user.email}
            </p>
          </div>
          {/* <div className="col-span-2 flex items-center -ml-8">
            <p className="text-sm text-black dark:text-white">
              {user.status}
            </p>
          </div> */}
          <div className="col-span-1 flex items-center -ml-8">
            <p className="text-sm text-black dark:text-white">
              {user.role}
            </p>
          </div>
          <div className="col-span-1 flex items-center space-x-2 ml-4">
            <button
              onClick={() => handleEditUser(key)}
              className="px-2 py-1 bg-gray-400 text-white rounded"
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>

            <button
              onClick={() => handleDelete(user.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>

            <button
              onClick={() => {}}
              className="px-2 py-1 bg-blue-400 text-white rounded"
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>
          </div>
        </div>
      ))}

      {/* Modal for Add/Edit User */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl mx-4 md:mx-auto max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">{editMode ? 'Edit User' : 'Tambah User'}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={newUser.nama}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="text"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <input
                  type="text"
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={editMode ? handleSaveEdit : handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {editMode ? 'Simpan Perubahan' : 'Tambah User'}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 ml-4 bg-gray-300 text-black rounded"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default TableUser;
