import React from "react";
import DashboardLayoutWrapper from "./wrapper";
import { cookies } from 'next/headers'

type props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: props) => {
  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
};

export default DashboardLayout;
