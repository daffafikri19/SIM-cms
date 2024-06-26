"use client";

import React, { useEffect, useState } from "react";
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
import { App, Menu } from "antd";
import { usePathname } from "next/navigation";
import { AccessProps, MenuProps } from "@/types";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";
import { UseAuth } from "@/store/use-auth";


export const SidebarMenu = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const { role } = UseAuth();
  const [accessData, setAccessData] = useState<AccessProps[]>([]);

  useEffect(() => {
    const getAccessData = async () => {
      try {
        await axios.post(
          process.env.NEXT_PUBLIC_API_URL + `/api/user/role/name`,
          {
            rolename: role,
          }
        ).then(async (res) => {
          const savedAccess = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + `/api/access/get/${res.data.data.id}`,
            {
              roleid: res.data.data.id,
            }
          );
          setAccessData(savedAccess.data.data)
        })
      } catch (error: any) {
        if (error.response) {
          message.error(error.response.data.message);
        }
      }
    }

    getAccessData();
  }, [message, role])

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
        { label: "Keuangan", key: "52", href: "/dashboard/report/sales" },
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
      label: "Pengaturan Akun",
      key: "8",
      icon: <SettingOutlined />,
      href: "/dashboard/my-account",
    },
  ];

  const filteredItems = items.filter(item => {
    if (!item.children) {
      // Jika tidak memiliki children, cocokkan langsung key dengan data akses
      return accessData.some(access => access.key === item.key && access.value);
    } else {
      // Jika memiliki children, cocokkan setidaknya satu child dengan data akses
      const filteredChildren = item.children.filter(child =>
        accessData.some(access => access.key === child.key && access.value)
      );
      return filteredChildren.length > 0;
    }
  });

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
      {item.children && item.children.map((child: any) => (
        accessData.some(access => access.key === child.key && access.value) && (
          <Menu.Item key={child.key}>
            <Link href={child.href}>{child.label}</Link>
          </Menu.Item>
        )
      ))}
    </Menu.SubMenu>
  );

  return (
    <Menu
    defaultSelectedKeys={[selectedKey!]}
    defaultOpenKeys={[openKey!]}
    mode="inline"
  >
    {filteredItems.map(item => (item.children ? renderSubMenu(item) : (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link href={item.href || ""}>{item.label}</Link>
      </Menu.Item>
    )))}
  </Menu>
  );
};
