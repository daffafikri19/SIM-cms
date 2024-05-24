"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Button,
  Input,
  Popconfirm,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  editCategoryProduct,
  fetchCategoryProductId,
} from "@/app/api/mutations/products";

type props = {
  id: number;
};

export const EditModal = ({ id }: props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const getCategoryId = async () => {
      await fetchCategoryProductId(id)
        .then((res) => {
          const data = res.data;
          setName(data.name);
        })
        .catch((err) => {
          if (err.message) {
            message.error(err.message);
          }
        });
    };

    getCategoryId();
  }, [id]);

  const handleOk = async () => {
    if (!name || name.length <= 3) {
      return null;
    }

    startTransition(async () => {
      await editCategoryProduct({
        id: Number(id),
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
            defaultValue={name}
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
        <Button icon={<EditOutlined />} type="dashed" size="small">
          edit
        </Button>
      </Popconfirm>
    </div>
  );
};
