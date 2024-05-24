import { UseAuth } from "@/store/use-auth";
import { Avatar, Image } from "antd";
import React from "react";

export const UserAvatar = () => {

  const { profile_picture } = UseAuth();
  return (
    <Avatar
      size={"large"}
      className="cursor-pointer"
      shape="circle"
      src={
        profile_picture ? (
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + profile_picture}
            alt="Profile"
          />
        ) : (
          "/avatar-boy.png"
        )
      }
    />
  );
};
