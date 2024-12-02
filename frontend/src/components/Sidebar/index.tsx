"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDashboard, faUser } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface menuItems{
  icon: IconProp;
  label: string;
  route: string;
  access: "pengguna" | "admin";
  children?: children[];
}

interface children{
 
  label: string;
  route: string;
}

interface menuProps{
 
name: string;
menuItems: menuItems[];
}

const menuGroups:menuProps[] = [
  {
    name: "MENU",
    menuItems: [
      {
        access:"admin",
        icon: faDashboard,
        label: "Dashboard",
        route: "/",
        // children: [{ label: "eCommerce", route: "/" }],
      },
      {
        access:"admin",
        icon: faUser,
        label: "Mobil",
        route: "/mobil",
      },
      {
        access:"admin",
        icon: faUser,
        label: "Status Booking",
        route: "/statusbooking",
      },
      {
        access:"admin",
        icon:faUser,
        label: "User",
        route: "/user",
      },
      // {
      //   icon: (
      //     <svg
      //       className="fill-current"
      //       width="18"
      //       height="18"
      //       viewBox="0 0 18 18"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         d="M1.43425 7.5093H2.278C2.44675 7.5093 2.55925 7.3968 2.58737 7.31243L2.98112 6.32805H5.90612L6.27175 7.31243C6.328 7.48118 6.46862 7.5093 6.58112 7.5093H7.453C7.76237 7.48118 7.87487 7.25618 7.76237 7.03118L5.428 1.4343C5.37175 1.26555 5.3155 1.23743 5.14675 1.23743H3.88112C3.76862 1.23743 3.59987 1.29368 3.57175 1.4343L1.153 7.08743C1.0405 7.2843 1.20925 7.5093 1.43425 7.5093ZM4.47175 2.98118L5.3155 5.17493H3.59987L4.47175 2.98118Z"
      //         fill=""
      //       />
      //       <path
      //         d="M10.1249 2.5031H16.8749C17.2124 2.5031 17.5218 2.22185 17.5218 1.85623C17.5218 1.4906 17.2405 1.20935 16.8749 1.20935H10.1249C9.7874 1.20935 9.47803 1.4906 9.47803 1.85623C9.47803 2.22185 9.75928 2.5031 10.1249 2.5031Z"
      //         fill=""
      //       />
      //       <path
      //         d="M16.8749 6.21558H10.1249C9.7874 6.21558 9.47803 6.49683 9.47803 6.86245C9.47803 7.22808 9.75928 7.50933 10.1249 7.50933H16.8749C17.2124 7.50933 17.5218 7.22808 17.5218 6.86245C17.5218 6.49683 17.2124 6.21558 16.8749 6.21558Z"
      //         fill=""
      //       />
      //       <path
      //         d="M16.875 11.1656H1.77187C1.43438 11.1656 1.125 11.4469 1.125 11.8125C1.125 12.1781 1.40625 12.4594 1.77187 12.4594H16.875C17.2125 12.4594 17.5219 12.1781 17.5219 11.8125C17.5219 11.4469 17.2125 11.1656 16.875 11.1656Z"
      //         fill=""
      //       />
      //       <path
      //         d="M16.875 16.1156H1.77187C1.43438 16.1156 1.125 16.3969 1.125 16.7625C1.125 17.1281 1.40625 17.4094 1.77187 17.4094H16.875C17.2125 17.4094 17.5219 17.1281 17.5219 16.7625C17.5219 16.3969 17.2125 16.1156 16.875 16.1156Z"
      //         fill="white"
      //       />
      //     </svg>
      //   ),
      //   label: "Forms",
      //   route: "#",
      //   children: [
      //     { label: "Form Elements", route: "/forms/form-elements" },
      //     { label: "Form Layout", route: "/forms/form-layout" },
      //   ],
      // },
      
      {
        access:"admin",
        icon:faUser,
        label: "Pengembalian",
        route: "/databooking",
      },
      {
        access:"admin",
        icon: faUser,
        label: "Review User",
        route: "/lihatreview",
      },
      {
        access:"admin",
        icon: faUser,
        label: "Laporan",
        route: "#",
        children: [
          { label: "Laporan pembayaran", route: "/ui/alerts" },
          { label: "Laporan booking", route: "/ui/buttons" },
          { label: "Laporan pengembalian", route: "/ui/buttons" },
          { label: "Laporan stok", route: "/ui/buttons" },
        ],
      },

      {
        access:"pengguna",
        icon: faUser,
        label: "Cari mobil",
        route: "/umum/carimobil",
      },
      
      {
        access:"pengguna",
        icon: faUser,
        label: "Pesanan saya",
        route: "/umum/pesanansaya",
      },
      {
        access:"pengguna",
        icon:faUser,
        label: "Review",
        route: "/umum/rental",
      },
    ],
  },
  
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const role = localStorage.getItem("role")
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          {/* <Link href="/">
            <Image
              width={176}
              height={32}
              src={"/images/logo/logo.svg"}
              alt="Logo"
              priority
            />
          </Link> */}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.filter((menu)=>menu.access === role).map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
