import { Package } from "@/types/package";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const bookingData: Package[] = [
  {
    tglbooking: new Date(),
    namaMobil: `Chevrolet`,
    pengguna: `Rizky`,
    tglmulai: new Date('2023-01-13'),
    tglakhir: new Date('2024-01-1'),
    status: "Setuju",
  },

];

const TableDataBooking = () => {

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray  text-left dark:bg-meta-4">
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Tanggal booking
              </th>
              <th className="min-w-[100px] py-4 font-medium text-black dark:text-white ">
                Mobil
              </th>
              <th className="min-w-[130px] py-4 font-medium text-black dark:text-white">
                Pengguna
              </th>
              <th className="min-w-[150px]  py-4 font-medium text-black dark:text-white">
                Tanggal Mulai
              </th>
              <th className="min-w-[150px]  py-4 font-medium text-black dark:text-white">
                Tanggal Akhir
              </th>
              <th className="min-w-[90px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                {/* Aksi */}
              </th>
            </tr>
          </thead>

          <tbody>
            {bookingData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-small text-sm text-black dark:text-white">
                    {formatDate(packageItem.tglbooking)}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 dark:border-strokedark ">
                  <h5 className="font-small text-sm text-black dark:text-white">
                    {packageItem.namaMobil}
                  </h5>
                </td>
                <td className="border-b border-[#eee]  py-5 dark:border-strokedark">
                  <p className="font-small text-sm text-black dark:text-white">
                    {packageItem.pengguna}
                  </p>
                </td>
                <td className="border-b border-[#eee]  py-5 dark:border-strokedark ">
                  <h5 className="font-small text-sm text-black dark:text-white">
                    {formatDate(packageItem.tglmulai)}
                  </h5>
                </td>
                <td className="border-b border-[#eee]  py-5  dark:border-strokedark">
                  <h5 className="font-small text-sm text-black dark:text-white">
                    {formatDate(packageItem.tglakhir)}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <select
                    // value={packageItem.status}
                    // onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="rounded bg-opacity-10 text-sm font-medium p-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Setuju">Setuju</option>
                    <option value="Tidak Setuju">Tidak Setuju</option>
                  </select>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">

                    <button
                      // onClick={() => confirmDelete(product.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Hapus
                      {/* <FontAwesomeIcon icon={faTrash} /> */}
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDataBooking;
