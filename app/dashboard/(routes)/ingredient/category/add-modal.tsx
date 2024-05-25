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
  const [openModal, setOpenModal] = useState(false);
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
          setOpenModal(false);
        });
    });
  };

  return (
    <div className="w-full">
      <Button
        className="float-end mb-5"
        type="primary"
        onClick={() => setOpenModal(true)}
        icon={<PlusOutlined />}
        loading={pending}
        disabled={pending}
      >
        Tambah Kategori
      </Button>

      <Modal
        onCancel={() => setOpenModal(false)}
        onOk={handleOk}
        open={openModal}
        okText="Simpan"
        okButtonProps={{ htmlType: "submit" }}
        cancelText="batal"
        confirmLoading={pending}
      >
        <Form className="mt-10" layout="vertical">
          <Form.Item
            label="Nama Kategori"
            name={"name"}
            rules={[
              { required: true, message: "Nama kategori tidak boleh kosong" },
            ]}
          >
            <Input
              className=""
              type="text"
              value={name}
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="masukan nama kategori"
              showCount
              maxLength={50}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
