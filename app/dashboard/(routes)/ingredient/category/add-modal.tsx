"use client";

import React, { useState, useTransition } from "react";
import {
  App,
  Button,
  Form,
  Input,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

export const AddModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const { message } = App.useApp();

  const handleOk = async () => {
    if (!name || name.length <= 3) {
      return null;
    }

    startTransition(async () => {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/ingredient/category/create", {
        name: name
      }).then(async (res) => {
        if(res.status !== 201) {
          return message.error(res.data.message)
        } else {
          await refresher({ path: "/dashboard/ingredient/category" })
          message.success(res.data.message)
          setName("")
          setOpenModal(false)
        }
      })
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
        <Form className="mt-10" layout="vertical" initialValues={{ name: name }}>
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
