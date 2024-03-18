"use client";

import React, { useState } from "react";
import { ChevronDownIcon, LucideIcon, Settings2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

type props = {
  title: string;
  path?: string | undefined;
  icon: LucideIcon;
  childrens: any;
};

export const SidebarMenuItem = ({ title, icon : Icon, childrens, path }: props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full">
      <div
        className="p-2 flex justify-between items-center relative hover:bg-primary-foreground rounded-md cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <li className="flex items-center w-full select-none">
          <Icon className="w-4 h-4 mr-2" />
          {title}
        </li>
        {childrens ? (
          <ChevronDownIcon
          className={cn(
            "w-4 h-4 absolute right-2 transition-all duration-150",
            isOpen ? "" : "rotate-180"
          )}
        />
        ): null }
        
      </div>
      {childrens &&
        childrens.map((item: any) => (
          <div className="transition-all duration-150 select-none">
            {isOpen && (
              <div className="p-2 ml-6 flex items-center justify-between relative hover:bg-primary-foreground rounded-md cursor-pointer">
                <li className="flex items-center select-none">{item.title}</li>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};  
