"use client";

import React, { useState, useTransition } from "react";
import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createCategoryIngredient } from "@/app/api/mutations/ingredients";

export const AddModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();

  const handleOk = async () => {
    if (!name || name.length <= 3) {
      return null;
    }

    startTransition(async () => {
      await createCategoryIngredient({
        name: name,
      })
        .then((res) => {
          res?.status === 201
            ? message.success(res?.message)
            : message.error(res?.message);
        })
        .then(() => {
          setName("");
          setOpen(false);
        });
    });
  };

  return (
    <div className="w-full">
      <Popconfirm
        title="Nama Kategori"
        description={
          <Input
            className="!w-full !min-w-[500px]"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="masukan nama kategori"
            showCount
            maxLength={50}
          />
        }
        open={open}
        placement="bottomRight"
        okText="Simpan"
        cancelText="Batal"
        overlayInnerStyle={{ width: "100%" }}
        onConfirm={handleOk}
        onCancel={() => setOpen(false)}
        disabled={pending}
      >
        <Button
          className="float-end mb-5"
          type="primary"
          onClick={() => setOpen(true)}
          icon={<PlusOutlined />}
          loading={pending}
          disabled={pending}
        >
          Tambah Kategori
        </Button>
      </Popconfirm>
    </div>
  );
};
