import { useState, useEffect } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import LogoutButton from "../Logout";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";  // Ensure toast is imported
import { api } from "@/lib/api";

interface DecodedToken {
  user: {
    id: number;
    email: string;
    role: string;
    nama: string;
    status: string;
  };
  iat: number;
  exp: number;
}

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [users, setUser] = useState<DecodedToken["user"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    nama: "",
    password: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded.user);

        setNewUser({
          nama: decoded.user.nama,
          password: "",
        });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    setLoading(false);
  }, []);


  const handleSaveEdit = async () => {
    if (users) {
      try {
        const response = await api.put(`/api/users/${users.id}`, {
          nama: newUser.nama,
          password: newUser.password,
        });


        if (response.status === 200) {
          const updatedUser = response.data;

          setUser(updatedUser);
          toast.success("Profil berhasil diperbarui! Silahkan login ulang untuk lihat perubahan.");
          setProfileModalOpen(false);
          setEditMode(false);
          setNewUser({ nama: updatedUser.nama, password: "" });
        } else {
          toast.error("Failed to update user profile.");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update user profile.");
      }
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!users) {
    return <div>Error: User data not found</div>;
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {users.nama}
          </span>
          <span className="block text-xs">{users.role}</span>
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill="" />
        </svg>
      </Link>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <button
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                    fill="" />
                  <path
                    d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                    fill="" />
                </svg>
                My Profile
              </button>
            </li>
          </ul>
          <LogoutButton />
        </div>
      )}

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-99999">

          <div className="bg-blue-400 p-6 rounded-md shadow-lg w-full max-w-lg mx-4 md:mx-auto max-h-[65vh] overflow-y-auto z-99999 mt-50">
            <h2 className="text-xl font-semibold mb-4 text-white">Edit Profile</h2>
            <input
              type="text"
              name="nama"
              value={newUser.nama}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="New password"
              value={newUser.password}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSaveEdit}
                className="bg-primary text-white py-1 px-4 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setProfileModalOpen(false)}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </ClickOutside>
  );
};

export default DropdownUser;
