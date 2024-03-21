import React, { ReactNode } from "react";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardBreadcrumb } from "../components/breadcrumb";

type props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: props) => {
  return (
    <div className="w-full h-full">
      <div className="flex h-full">
        <div className="h-full">
          <Sidebar />
        </div>
        <div className="w-full">
          <Navbar />
          <div>
            <DashboardBreadcrumb />
          </div>
          <div className="p-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
