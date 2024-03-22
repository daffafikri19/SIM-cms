import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeftFromLineIcon, UserIcon } from "lucide-react";
import React from "react";

export const UserAvatar = () => {
  return (
    <div className="border-2 border-primary rounded-full cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/avatar-boy.png" alt="User" />
            <AvatarFallback>ADM</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer space-x-2">
            <UserIcon className="w-4 h-4" />
            <span>My Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer space-x-2">
            <ArrowLeftFromLineIcon className="w-4 h-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
