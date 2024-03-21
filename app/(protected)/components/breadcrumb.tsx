"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const DashboardBreadcrumb = () => {
  const pathname = usePathname();
  const routeParts = pathname.split("/").filter((part) => part !== "");
  console.log(pathname);
  console.log(routeParts);

  return (
    <div className="h-10 w-full border-b flex items-center pl-4">
      <Breadcrumb>
        <BreadcrumbList>
          {routeParts.map((path, index) => {
            return (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink
                    href={`/${path}`}
                    className={cn(
                      "",
                      index === routeParts.length - 1
                        ? "pointer-events-none"
                        : ""
                    )}
                  >
                    {path.toString()}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index === routeParts.length - 1 ? null : (
                  <BreadcrumbSeparator />
                )}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
