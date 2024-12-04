import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/Mobil";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LaporanPembayaran from "@/components/Tables/LaporanPembayaran";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="LAPORAN PEMBAYARAN" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <LaporanPembayaran />
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
