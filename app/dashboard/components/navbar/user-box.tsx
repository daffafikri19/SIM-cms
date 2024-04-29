"use client";
import React from "react";
import { Tag } from "antd";

type props = {
  name: string | undefined,
  email: string | undefined
}
export const UserBox = ({  name, email } : props) => {

  return (
    <div className="flex items-start justify-center flex-col">
      <Tag color="orange">{name}</Tag>
      <Tag color="orange">{email}</Tag>
    </div>
  );
};
