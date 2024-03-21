import React from "react";
import { SidebarMenu } from "./sidebar-menu-item";
import { Brand } from "./brand";
import { CompassIcon } from "lucide-react";

const MenuList = [
  {
    label: "",
    href: "",
    path: "",
    icon:  CompassIcon,
    children: [
      {
        label: "",
        href: "",
        path: "",
      },
    ],
  },
];

export const Sidebar = () => {
  return (
    <aside className="w-48 border-r">
      <div>
        <Brand />
      </div>

      <SidebarMenu />
    </aside>
  );
};
