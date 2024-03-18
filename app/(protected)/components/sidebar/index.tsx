"use client"
import React from "react";
import { Brand } from "./brand";
import { SidebarMenuItem } from "./sidebar-menu-item";
import { CompassIcon, List, PinIcon, User2Icon } from "lucide-react";

const SidebarMenuList = [
  {
    title: "Dasboard",
    icon: CompassIcon,
    path: "/dashboard",
  },

  {
    title: "Menu",
    icon: List,
    childrens: [
      {
        title: "menu 1",
        icon: PinIcon,
        path: "/",
      },
      {
        title: "menu 2",
        icon: PinIcon,
        path: "/",
      },
      {
        title: "Sub Menu",
        icon: List,
        childrens: [
          {
            title: "menu 3",
            icon: PinIcon,
          },
          {
            title: "menu 4",
            icon: PinIcon,
          },
          {
            title: "menu 5",
            icon: PinIcon,
            childrens: [
              {
                title: "Menu 6",
                path: "/",
              },
              {
                title: "Menu 7",
                path: "/",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    title: "Auth",
    icon: User2Icon,
    childrens: [
      {
        title: "Login",
        path: "/login",
      },
      {
        title: "Register",
        path: "/register",
      },
      {
        title: "Forgot Password",
        path: "/forgot-password",
      },
      {
        title: "Reset Password",
        path: "/reset-password",
      },
    ],
  },
];

export const Sidebar = () => {
  return (
    <aside className="w-48 min-h-screen border-r-2 flex-shrink-0">
      <div>
        <Brand />
      </div>
      <div>
        {SidebarMenuList.map((item) => (
          <SidebarMenuItem 
            key={item.title}
            title={item.title}
            path={item.path}
            icon={item.icon}
            childrens={item.childrens ? item.childrens : null}
          />
        ))}
      </div>
    </aside>
  );
};
