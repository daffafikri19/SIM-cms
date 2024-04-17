"use client"

import { SessionProvider } from "next-auth/react";
import React from "react";

type props = {
  children: React.ReactNode;
};
const AuthSessionProvider = ({ children }: props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionProvider;
