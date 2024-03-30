import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  CompassOutlined,
  FileOutlined
} from "@ant-design/icons";
import { Menu, MenuProps, theme } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

const { SubMenu } = Menu;

export const SidebarMenu = () => {
  const pathname = usePathname();

  const items = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <CompassOutlined />,
      href: "/dashboard",
    },
    {
      label: "Menu",
      key: "menu",
      icon: <MailOutlined />,
      href: "/dashboard/navigation1",
      children: [
        { label: "Example", key: "example", href: "/dashboard/menu/example" },
      ],
    },
    {
      label: "Navigation Two",
      key: "sub3",
      icon: <AppstoreOutlined />,
      children: [
        { label: "Option 5", key: "5", href: "/option5" },
        { label: "Option 6", key: "6", href: "/option6" },
        {
          label: "Submenu",
          key: "sub4",
          children: [
            { label: "Option 7", key: "7", href: "/option7" },
            { label: "Option 8", key: "8", href: "/option8" },
          ],
        },
      ],
    },
    {
      label: "Penyimpanan",
      key: "penyimpanan",
      icon: <FileOutlined />,
      href: "/dashboard/storage",
    },
    {
      label: "Pengaturan",
      key: "pengaturan",
      icon: <SettingOutlined />,
      children: [
        { label: "Umum", key: "umum", href: "/dashboard/pengaturan/umum" },
        { label: "Tampilan", key: "tampilan", href: "/dashboard/pengaturan/tampilan" },
        { label: "Aplikasi", key: "aplikasi", href: "/dashboard/pengaturan/aplikasi" },
      ],
    },
  ];

  const renderMenuItems = (items: any) =>
    items.map((item : any) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </SubMenu>
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
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      {renderMenuItems(items)}
    </Menu>
  );
};
