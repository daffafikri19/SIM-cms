import { Button, Image, Typography } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";

export const UserTabContent = () => {
  return (
    <div className="w-full h-full">
      <div className="w-fit mx-auto relative flex items-center gap-2">
        <Typography>Foto Profile</Typography>
        <Button className="absolute top-0 right-0" type="text" icon={<EditOutlined />} />
      </div>
      <div className="w-fit mx-auto flex items-center justify-center border-2 border-red rounded-full overflow-hidden">
        <Image
          src="/fun-bread-logo.svg"
          alt="Profile"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};
