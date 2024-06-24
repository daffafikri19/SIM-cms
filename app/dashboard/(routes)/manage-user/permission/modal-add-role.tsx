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

export const ModalAddRole = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const { message } = App.useApp();

  const handleOk = async () => {
    if (!name || name.length < 3) {
      return null;
    }

    startTransition(async () => {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/user/role", {
        name: name
      }).then(async (res) => {
        if(res.status === 201) {
          setName("")
          setOpenModal(false)
          await refresher({ path: "/dashboard/manage-user" })
          await refresher({ path: "/dashboard/manage-user/permission" })
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
        Tambah Role
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
            label="Nama Role"
            name={"name"}
            rules={[
              { required: true, message: "Nama role tidak boleh kosong" },
            ]}
          >
            <Input
              className=""
              type="text"
              value={name}
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="masukan nama role"
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
