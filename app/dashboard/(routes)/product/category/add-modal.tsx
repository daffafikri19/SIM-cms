"use client";

import React, { useState, useTransition } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

export const AddModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();

  const handleOk = async () => {
    if (!name || name.length < 3) {
      return null;
    }

    startTransition(async () => {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/product/category/create", {
        name: name
      }).then(async (res) => {
        if(res.status === 201) {
          setName("")
          setOpenModal(false)
          await refresher({ path: "/dashboard/product/create" })
          await refresher({ path: "/dashboard/product/category" })
          return message.success(res.data.message)
        } else {
          setName("")
          setOpenModal(false)
          return message.error(res.data.message)
        }
      });
    });
  };

  return (
    <div className="w-full">
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setOpenModal(true)}
        className="float-end"
      >
        Tambah
      </Button>
      <Modal
        onCancel={() => setOpenModal(false)}
        onOk={handleOk}
        open={openModal}
        okText="Simpan"
        okButtonProps={{ "htmlType": 'submit' }}
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
              minLength={2}
              maxLength={50}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
