"use client";

import React, { useState, useTransition } from "react";
import { App, Button, Form, FormProps, Input, Modal, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UserProps, UserRole } from "@/types";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

type editUserProps = {
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
  shift: string;
  password: string;
  confPassword: string;
};

export const ModalEditUser = ({ userid }: { userid: string }) => {
  const [openModal, setOpenModal] = useState(false);
  const [pending1, startTransition1] = useTransition();
  const [pending2, startTransition2] = useTransition();
  const [userData, setUserData] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    profile_picture: null,
    role: {
      id: 0,
      name: "",
    },
    shift: "",
    created_at: "",
    updated_at: "",
  });
  const [roleData, setRoleData] = useState<UserRole[]>([]);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const handleOpenModal = async () => {
    startTransition1(async () => {
      try {
        const user = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + `/api/user/get/${userid}`,
          {
            id: userid,
          }
        );
        const roles = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/user/role/all"
        );

        setOpenModal(true);
        setUserData(user.data.data);
        setRoleData(roles.data.data);
      } catch (error: any) {
        if (error.response) {
          message.error(error.response.data.message);
        }
      }
    });
  };

  const handleSubmitForm: FormProps<editUserProps>["onFinish"] = async (
    values
  ) => {
    startTransition2(async () => {
      try {
        const res = await axios.patch(
          process.env.NEXT_PUBLIC_API_URL + `/api/user/update/${userData.id}`,
          {
            id: userData.id,
            name: values.name,
            email: values.email,
            role: values.role,
            shift: values.shift,
          }
        );

        if (res.status === 200) {
          await refresher({ path: "/dashboard/manage-user/edit-user" });
          await refresher({ path: "/dashboard/manage-user" });
          message.success(res.data.message);
          setOpenModal(false);
        } else {
          message.error(res.data.message);
          setOpenModal(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          message.error(error.response.data.message || "server error");
        } else {
          message.error("Error submitting the form");
        }
      }
    });
  };

  return (
    <>
      <Button
        type="dashed"
        icon={<EditOutlined />}
        onClick={handleOpenModal}
        loading={pending1}
        disabled={pending1}
        size="small"
      />
      <Modal
        onCancel={() => setOpenModal(false)}
        open={openModal}
        footer={<></>}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitForm}
          autoComplete="off"
          initialValues={{
            name: userData.name,
            email: userData.email,
            role: userData.role.name,
            shift: userData.shift,
          }}
        >
          <Form.Item
            label="Nama"
            name="name"
            rules={[{ required: true, message: "Nama harus diisi" }]}
          >
            <Input showCount minLength={3} maxLength={100} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email harus diisi" }]}
          >
            <Input disabled readOnly showCount minLength={3} maxLength={100} />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Email harus diisi" }]}
          >
            <Select
              placeholder="Pilih role / jabatan"
              options={roleData
                .filter((role) => role.name !== "Owner")
                .map((role) => ({
                  label: role.name,
                  value: role.name,
                }))}
            />
          </Form.Item>

          <Form.Item
            label="Shift"
            name="shift"
            rules={[{ required: true, message: "Nama harus diisi" }]}
          >
            <Select
              options={[
                {
                  name: "Shift 1",
                  value: "Shift 1",
                },
                {
                  name: "Shift 2",
                  value: "Shift 2",
                },
              ]}
            />
          </Form.Item>

          <Form.Item className="!mb-0">
            <div className="flex items-center gap-2 justify-end ">
              <Button
                htmlType="button"
                type="dashed"
                onClick={() => setOpenModal(false)}
              >
                Batal
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                loading={pending2}
                disabled={pending2}
              >
                Simpan
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
