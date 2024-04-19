"use client";

import React from "react";
import Link from "next/link";
import {
  AppstoreOutlined,
  SettingOutlined,
  CompassOutlined,
  FileOutlined,
  UserOutlined,
  ProductOutlined,
  FileTextOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname } from "next/navigation";

type MenuProps = {
  label: string;
  key: string;
  icon: React.JSX.Element;
  href?: string | undefined;
  children?: {
    label: string;
    key: string;
    href?: string;
  }[];
}[];

const items: MenuProps = [
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
    children: [
      { label: "Daftar Produk", key: "21", href: "/dashboard/product" },
      { label: "Tambah Produk", key: "22", href: "/dashboard/product/add" },
      {
        label: "Kategori Produk",
        key: "23",
        href: "/dashboard/product/category",
      },
    ],
  },
  {
    label: "Bahan Baku",
    key: "3",
    icon: <ProductOutlined />,
    children: [
      { label: "Daftar Bahan Baku", key: "31", href: "/dashboard/inventory" },
      {
        label: "Tambah Bahan Baku",
        key: "32",
        href: "/dashboard/inventory/add",
      },
    ],
  },
  {
    label: "Resep",
    key: "4",
    icon: <FileTextOutlined />,
    href: "/dashboard/recipe",
  },
  {
    label: "Laporan",
    key: "5",
    icon: <FileDoneOutlined />,
    children: [
      { label: "Bahan Baku", key: "51", href: "/dashboard/report/inventory" },
      { label: "Keuangan", key: "52", href: "/dashboard/report/finance" },
      { label: "Penjualan", key: "53", href: "/dashboard/report/sales" },
    ],
  },
  {
    label: "Kelola Pengguna",
    key: "6",
    icon: <UserOutlined />,
    children: [
      {
        label: "Daftar Karyawan",
        key: "daftar-karyawan",
        href: "/dashboard/manage-user",
      },
      {
        label: "Perizinan Akses",
        key: "perizinan-akses",
        href: "/dashboard/manage-user/permission",
      },
    ],
  },
  {
    label: "Penyimpanan File",
    key: "7",
    icon: <FileOutlined />,
    href: "/dashboard/file-storage",
  },
  {
    label: "Pengaturan",
    key: "8",
    icon: <SettingOutlined />,
    href: "/dashboard/settings",
  },
];

export const SidebarMenu = () => {
  const pathname = usePathname();

  const findKey = (items: MenuProps, currentPath: string) => {
    for (let item of items) {
      if (item.href === currentPath) {
        return { selectedKey: item.key, openKey: item.key };
      }
      if (item.children) {
        const foundChild = item.children.find(child => child.href === currentPath);
        if (foundChild) {
          return { selectedKey: foundChild.key, openKey: item.key }; // Kembalikan key dari submenu dan menu utama
        }
      }
    }
  };

  const keys = findKey(items, pathname);
  const selectedKey = keys?.selectedKey;
  const openKey = keys?.openKey;

  console.log(selectedKey);
  console.log(openKey);

  const renderMenuItems = (items: any) =>
    items.map((item: any) => {
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
      defaultSelectedKeys={[selectedKey!]}
      defaultOpenKeys={[openKey!]}
      mode="inline"
    >
      {renderMenuItems(items)}
    </Menu>
  );
};
