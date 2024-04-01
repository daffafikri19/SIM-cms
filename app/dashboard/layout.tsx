import React from "react";
import DashboardLayoutWrapper from "./wrapper";
import { cookies } from 'next/headers'

type props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: props) => {
  const token = cookies().get("refreshToken")?.value
  return <DashboardLayoutWrapper cookie={token}>{children}</DashboardLayoutWrapper>;
};

export default DashboardLayout;
