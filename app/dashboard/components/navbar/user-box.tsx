"use client";
import React from "react";
import { useAuthContext } from "@/store/use-auth";
import { Tag } from "antd";

export const UserBox = () => {
  const { name, email } = useAuthContext();

  return (
    <div className="flex items-start justify-center flex-col">
      <Tag color="orange">{name}</Tag>
      <Tag color="orange">{email}</Tag>
    </div>
  );
};
