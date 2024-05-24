import React from "react";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";

export const BreadCrumb = () => {
  const pathname = usePathname();
  const routeParts = pathname.split("/").filter((part) => part !== "");

  const pathItems = routeParts.map((part, index) => {
    const href = `/${routeParts.slice(0, index + 1).join("/")}`;
    let title = (part.charAt(0).toUpperCase() + part.slice(1)) as any;
    let isDisabled = false;
    switch (part) {
      case "settings":
      case "menu":
        break;
      default:
        break;
    }

    return {
      href,
      title: (
        <>
          <span>{title}</span>
        </>
      ),
      isDisabled,
    };
  });

  return (
    <Breadcrumb separator=">">
      {pathItems.map((item, i) => (
        <Breadcrumb.Item key={i} href={item.href}>
          {item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
