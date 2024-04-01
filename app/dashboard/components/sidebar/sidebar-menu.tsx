"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppstoreOutlined,
  SettingOutlined,
  CompassOutlined,
  FileOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Menu } from "antd";


const items = [
  {
    label: "Beranda",
    key: "1",
    icon: <CompassOutlined />,
    href: "/dashboard",
  },
  {
    label: "Produk",
    key: "2",
    icon: <AppstoreOutlined />,
    href: "/dashboard/products"
  },
  // {
  //   label: "Navigation Two",
  //   key: "sub3",
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     { label: "Option 5", key: "5", href: "/option5" },
  //     { label: "Option 6", key: "6", href: "/option6" },
  //     {
  //       label: "Submenu",
  //       key: "sub4",
  //       children: [
  //         { label: "Option 7", key: "7", href: "/option7" },
  //         { label: "Option 8", key: "8", href: "/option8" },
  //       ],
  //     },
  //   ],
  // },
  {
    label: "Penyimpanan",
    key: "3",
    icon: <FileOutlined />,
    href: "/dashboard/storage",
  },
  {
    label: "Pengaturan",
    key: "4",
    icon: <SettingOutlined />,
    children: [
      { label: "Umum", key: "umum", href: "/dashboard/settings/general" },
      { label: "Tampilan", key: "tampilan", href: "/dashboard/settings/appearance" },
      { label: "Aplikasi", key: "aplikasi", href: "/dashboard/settings/application" },
    ],
  },
  {
    label: "Kelola Pengguna",
    key: "z-5",
    icon: <UserOutlined />,
    children: [
      { label: "Daftar Karyawan", key: "daftar-karyawan", href: "/dashboard/manage-users/list-worker" },
      { label: "Perizinan Akses", key: "perizinan-akses", href: "/dashboard/pengaturan/" },
    ],
  },
];

export const SidebarMenu = () => {
  const pathname = usePathname();

  const renderMenuItems = (items: any) =>
    items.map((item : any) => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link href={item.href}>{item.label}</Link>
        </Menu.Item>
      );
    });

  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["1"]}
      mode="inline"
    >
      {renderMenuItems(items)}
    </Menu>
  );
};
