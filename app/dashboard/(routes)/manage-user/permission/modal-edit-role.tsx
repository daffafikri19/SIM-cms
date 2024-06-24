"use client";

import React, { useState, useTransition } from "react";
import {
  App,
  Button,
  Form,
  Input,
  Modal,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

export const ModalEditRole = ({ roleid } : { roleid: string }) => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const { message } = App.useApp();

  const handleOk = async () => {
    if (!name || name.length < 3) {
      return null;
    }

    startTransition(async () => {
      await axios.patch(process.env.NEXT_PUBLIC_API_URL + `/api/user/role/update/${roleid}`, {
        id: roleid,
        name: name
      }).then(async (res) => {
        if(res.status === 200) {
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
    <div>
      <Button
        icon={<EditOutlined />}
        type="dashed"
        onClick={() => setOpenModal(true)}
      />
      <Modal
        onCancel={() => setOpenModal(false)}
        onOk={handleOk}
        open={openModal}
        okText="Simpan"
        okButtonProps={{ "htmlType": 'submit' }}
        cancelText="batal"
        confirmLoading={pending}
      >
        <Form className="mt-10" layout="vertical" initialValues={[name]}>
          <Form.Item
            label="Nama Role"
            name={"name"}
            rules={[
              { required: true, message: "Nama role tidak boleh kosong" },
            ]}
          >
            <Input
              type="text"
              value={name}
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
