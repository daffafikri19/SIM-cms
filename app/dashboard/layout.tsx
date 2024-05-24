import React from "react";
import DashboardLayoutWrapper from "./wrapper";
import ProgressBarProvider from "../../components/progress-provider";
import { parseCookie } from "../api/services/cookies";
import { redirect } from "next/navigation";

type props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: props) => {

  const session = await parseCookie();
  if(!session.hashedToken.userid) {
    redirect("/")
  }
  
  return (
    <ProgressBarProvider>
      <DashboardLayoutWrapper session={session.hashedToken}>{children}</DashboardLayoutWrapper>
    </ProgressBarProvider>
  );
};

export default DashboardLayout;
