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
import { MenuProps } from "@/types";


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
      {
        label: "Kategori Produk",
        key: "22",
        href: "/dashboard/product/category",
      },
    ],
  },
  {
    label: "Bahan Baku",
    key: "3",
    icon: <ProductOutlined />,
    children: [
      { label: "Daftar Bahan Baku", key: "31", href: "/dashboard/ingredient" },
      {
        label: "Kategori Bahan Baku",
        key: "32",
        href: "/dashboard/ingredient/category",
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
      { label: "Bahan Baku", key: "51", href: "/dashboard/report/ingredient" },
      { label: "Keuangan", key: "52", href: "/dashboard/report/finance" },
      { label: "Stok", key: "53", href: "/dashboard/report/stock" },
    ],
  },
  {
    label: "Kelola Pengguna",
    key: "6",
    icon: <UserOutlined />,
    children: [
      {
        label: "Daftar Karyawan",
        key: "61",
        href: "/dashboard/manage-user",
      },
      {
        label: "Perizinan Akses",
        key: "62",
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
          return { selectedKey: foundChild.key, openKey: item.key };
        }
      }
    }
  };

  const keys = findKey(items, pathname);
  const selectedKey = keys?.selectedKey;
  const openKey = keys?.openKey;

  const renderSubMenu = (item: any) => (
    <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
      {item.children && item.children.map((child : any) => (
        <Menu.Item key={child.key}>
          <Link href={child.href}>{child.label}</Link>
        </Menu.Item>
      ))}
    </Menu.SubMenu>
  );

  return (
    <Menu
      defaultSelectedKeys={[selectedKey!]}
      defaultOpenKeys={[openKey!]}
      mode="inline"
    >
      {items.map(item => (item.children ? renderSubMenu(item) : (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link href={item.href || ""}>{item.label}</Link>
        </Menu.Item>
      )))}
    </Menu>
  );
};
