import React from "react";
import Image from "next/image";
import { Monomaniac_One } from "next/font/google";
import { Typography } from "antd";
import Link from "next/link";

const font = Monomaniac_One({
  subsets: ["latin"],
  weight: ["400"],
});


type props = {
    isCollapsed: boolean;
  };

export const BrandLogo = ({ isCollapsed }: props) => {

    const { Title } = Typography;
  return (
    <Link href={"/dashboard"} className="flex items-center space-x-2 p-2 justify-center text-center">
      <Image
        src="/fun-bread-logo.svg"
        width={35}
        height={35}
        alt="Fun Breads"
        priority
      />
      {isCollapsed ? null : (
        <Title level={5} className="!mb-0 truncate">
            Fun Bread
        </Title>
      )}
    </Link>
  );
};
