"use client";

import React from "react";
import { UserAvatar } from "./user-avatar";
import { UserBox } from "./user-box";
import { Tag } from "antd";

export const DashboardNavbar = () => {
  return (
    <nav className="w-full flex items-center justify-between">
      <div></div>
      <div className="flex items-center space-x-2 cursor-pointer pr-3">
        <UserAvatar />
        <UserBox />
      </div>
    </nav>
  );
};
