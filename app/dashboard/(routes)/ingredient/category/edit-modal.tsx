"use client";

import React, { useState, useTransition } from "react";
import { App, Button, Form, Input, Modal } from "antd";
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
    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/category/get/${id}`,
        { id }
      )
      .then(async (res) => {
        if (res.status !== 200) {
          return message.error(res.data.message);
        } else {
          await refresher({ path: "/dashboard/ingredient/cateogory" });
          setName(res.data.data.name);
          return res.data.data;
        }
      });
  };

  const handleOk = async () => {
    if (!name || name.length <= 3) {
      return null;
    }

    startTransition(async () => {
      await axios
        .patch(
          process.env.NEXT_PUBLIC_API_URL +
            `/api/ingredient/category/update/${id}`,
          {
            id: id,
            name: name,
          }
        )
        .then(async (res) => {
          if (res.status !== 200) {
            return message.error(res.data.message);
          } else {
            await refresher({ path: "/dashboard/ingredient/category" });
            setName("");
            setOpenModal(false);
            return message.success(res.data.message);
          }
        });
    });
  };

  return (
    <>
      <Button
        type="dashed"
        onClick={() => getCategoryId().then(() => setOpenModal(true))}
        icon={<EditOutlined />}
        loading={pending}
        disabled={pending}
      >
        Edit
      </Button>

      <Modal
        onCancel={() => setOpenModal(false)}
        onOk={handleOk}
        open={openModal}
        confirmLoading={pending}
        footer={[
          <Button key="back" type="dashed" onClick={() => setOpenModal(false)}>
            Tutup
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={pending}
            disabled={pending}
            onClick={handleOk}
          >
            Simpan
          </Button>,
        ]}
      >
        <Form className="mt-10" layout="vertical" defaultValue={name}>
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
    </>
  );
};
