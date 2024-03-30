import { ThemeSwicther } from "@/components/global/theme-switcher";
import React from "react";
import { UserAvatar } from "./user-avatar";

export const DashboardNavbar = () => {
  return (
    <nav className="w-full flex items-center justify-between">
      <div></div>
      <div className="flex items-center space-x-4">
        <UserAvatar />
        <ThemeSwicther />
      </div>
    </nav>
  );
};
