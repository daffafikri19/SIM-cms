import React from "react";
import DashboardLayoutWrapper from "./wrapper";
import NProgressBarProvider from "./components/nprogress-provider";

type props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: props) => {
  return (
    <NProgressBarProvider>
      <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
    </NProgressBarProvider>
  );
};

export default DashboardLayout;
