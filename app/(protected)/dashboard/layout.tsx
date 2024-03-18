import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import React, { ReactNode } from "react";

type props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: props) => {
  return (
    <div className="w-full h-full">
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div>
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
