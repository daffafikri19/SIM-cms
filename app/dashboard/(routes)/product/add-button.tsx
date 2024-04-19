"use client"

import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons"

export const AddButton = () => {
  return <Button type="primary" icon={<PlusOutlined />}>Tambah Produk</Button>;
};
