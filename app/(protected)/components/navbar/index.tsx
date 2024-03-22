import React from "react";
import { ThemeButton } from "@/components/button-theme";
import Image from "next/image";
import { UserAvatar } from "./user-avatar";
import { Notification } from "./notification";

export const Navbar = () => {
  return (
    <div className="border h-14 fixed top-0 left-0 px-2 py-1 w-full flex items-center shadow-sm justify-between z-50 bg-background">
      <div className="min-w-32 h-full max-w-32 flex justify-center">
        <Image
          src={"/brand-logo.svg"}
          alt="Fun Bread Bakery"
          width={120}
          height={80}
        />
      </div>
      <div className="pl-3 flex items-center space-x-2">
        <Notification />
        <UserAvatar />
        <ThemeButton />
      </div>
    </div>
  );
};
