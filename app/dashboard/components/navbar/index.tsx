import React from "react";
import { UserAvatar } from "./user-avatar";
import { UserBox } from "./user-box";
import { useSession } from "next-auth/react";

export const DashboardNavbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex items-center justify-between">
      <div></div>
      <div className="flex items-center space-x-2">
        <UserAvatar />
        <UserBox name={session?.user.name} email={session?.user.email} />
      </div>
    </nav>
  );
  
};
