"use client";

import React, { useState, useTransition } from "react";
import { App, Button, Form, Input, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

type props = {
  id: number;
};

export const EditModal = ({ id }: props) => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const { message } = App.useApp();

  const getCategoryId = async () => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/product/category/get/${id}`, {
      id: id
    }).then(async (res) => {
      if(res.status === 200) {
        setName(res.data.data.name)
      } else {
        return message.error(res.data.message)
      }
    });
  };

  const handleOk = async () => {
    if (!name || name.length <= 3) {
      return null;
    }

    startTransition(async () => {
      await axios.patch(process.env.NEXT_PUBLIC_API_URL + `/api/product/category/update/${id}`, {
        id: Number(id),
        name: name,
      }).then(async (res) => {
        if(res.status === 200) {
          await refresher({ path: "/dashboard/product/create" })
          await refresher({ path: "/dashboard/product/category" })
          setName("")
          setOpenModal(false);
          message.success(res.data.message)
        } else {
          setName("")
          setOpenModal(false);
          return message.error(res.data.message)
        }
      });
    });
  };

  return (
    <div className="w-full">
      <Button
        icon={<EditOutlined />}
        type="dashed"
        size="small"
        onClick={() => getCategoryId().then(() => setOpenModal(true))}
      >
        edit
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
