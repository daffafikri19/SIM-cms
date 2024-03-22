import React, { ReactNode } from "react";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { DashboardBreadcrumb } from "../components/breadcrumb";
import Container from "../components/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";

type props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: props) => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex pt-12 w-full h-full">
        <Sidebar />
        <div className="w-full overflow-x-hidden">
          <Container>
            <DashboardBreadcrumb />
            <div className="p-2">{children}</div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
