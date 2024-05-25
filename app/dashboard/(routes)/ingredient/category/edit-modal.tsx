"use client";

import React, { useState, useTransition } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { editCategoryIngredient, fetchCategoryIngredientId } from "@/app/api/mutations/ingredients";

type props = {
  id: number
}
export const EditModal = ({ id } : props) => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();

  const getCategoryId = async () => {
    await fetchCategoryIngredientId(id)
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

  const handleOk = async () => {
    if (!name || name.length <= 3) {
      return null;
    }

    startTransition(async () => {
      await editCategoryIngredient({
        id: id,
        name: name,
      })
        .then((res) => {
          res?.status === 200
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
        okText="Simpan"
        okButtonProps={{ htmlType: "submit" }}
        cancelText="batal"
        confirmLoading={pending}
      >
        <Form 
        className="mt-10" 
        layout="vertical"
        defaultValue={name}
        >
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
