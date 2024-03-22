"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar.store";
import React, { ReactNode, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface props {
  children: ReactNode;
}

const Container = ({ children }: props) => {
  const matches = useMediaQuery("(max-width: 1024px)");

  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn(
        "w-full py-2",
        collapsed ? "ml-[50px]" : "ml-[50px] lg:ml-36"
      )}>
      {children}
    </div>
  );
};

export default Container;
