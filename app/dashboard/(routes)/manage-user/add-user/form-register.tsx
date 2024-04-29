"use client";

import React, { useRef, useState } from "react";
import { user_role } from "@prisma/client";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  message,
  Upload,
  Typography,
  Alert,
} from "antd";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import type { FormProps, InputRef } from "antd";
import { RegisterProps } from "@/types";
import { redirect, useRouter } from "next/navigation";

type props = {
  roleData: user_role[];
};

const { Dragger } = Upload;

export const FormRegister = ({ roleData }: props) => {
  const router = useRouter();
  const [formdata, setFormdata] = useState<RegisterProps>({
    name: "",
    email: "",
    profile_picture: null,
    role: "",
    password: "",
    confirmPassword: "",
    shift: "",
  });
  const [error, setError] = useState<string | undefined>("");
  const roleInputRef = useRef<InputRef>(null);

  const handleSubmitForm: FormProps<RegisterProps>["onFinish"] = async (
    values
  ) => {
    console.log("Success:", values);
    // await Register({
    //     name: formdata.name,
    //     email: formdata.email,
    //     profile_picture: formdata.profile_picture,
    //     password: formdata.password,
    //     confirmPassword: formdata.confirmPassword,
    //     role: formdata.role,
    //     shift: formdata.shift
    // }).then((result : any) => {
    //     if(result.status === 200) {
    //         message.success(result.message)
    //     } else {
    //         message.error(result.message)
    //     }
    // })
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmitForm}
      name="register"
      autoComplete="off"
    >
      <Form.Item
        label="Nama Lengkap"
        name={"nama"}
        rules={[{ required: true, message: "Nama lengkap wajib diisi" }]}
      >
        <Input
          type="text"
          name="nama"
          showCount
          value={formdata.name}
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          placeholder="Nikola Tesla"
          maxLength={100}
          className="w-full lg:!w-1/2"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name={"email"}
        rules={[{ required: true, message: "Email wajib diisi" }]}
      >
        <Input
          type="email"
          showCount
          name="email"
          value={formdata.email}
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          placeholder="example@domain.com"
          maxLength={50}
          className="w-full lg:!w-1/2"
        />
      </Form.Item>

      <Form.Item label="Foto Profile" className="w-full lg:!w-1/2">
        <Dragger
          name="profile_picture"
          maxCount={1}
          style={{
            maxWidth: 150,
          }}
          multiple={false}
          action={"upload"}
          onChange={(info) => {
            const { status } = info.file;
            if (status !== "uploading") {
              console.log(info.fileList);
            }
            if (status === "done") {
              message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <Typography>
            Klik atau tarik file foto ke dalam area upload
          </Typography>
        </Dragger>
      </Form.Item>

      <Form.Item
        label="Role / Jabatan"
        name={"role"}
        rules={[{ required: true, message: "Role harus diisi" }]}
      >
        <Select
          className="w-full lg:!w-1/2"
          placeholder="Pilih role / jabatan"
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              role: e,
            }))
          }
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }}>atau</Divider>
              <Space style={{ padding: "0 8px 4px" }}>
                <Input
                  placeholder="tambah role baru"
                  ref={roleInputRef}
                  value={formdata.role}
                  onChange={(e) =>
                    setFormdata((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={() => {}}>
                  Tambah Role
                </Button>
              </Space>
            </>
          )}
          options={roleData.map((role) => ({
            label: role.name,
            value: role.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name={"password"}
        rules={[{ required: true, message: "Password harus diisi" }]}
      >
        <Input.Password
          type="password"
          name="password"
          value={formdata.password}
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          className="w-full lg:!w-1/2"
        />
      </Form.Item>

      <Form.Item
        label="Konfirmasi Password"
        name={"confirmPassword"}
        rules={[{ required: true, message: "Konfirmasi Password harus diisi" }]}
      >
        <Input.Password
          type="password"
          name="confirmPassword"
          value={formdata.confirmPassword}
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          className="w-full lg:!w-1/2"
        />
      </Form.Item>

      <Form.Item
        label="Shift Kerja"
        name={"shift"}
        rules={[{ required: true, message: "Shift harus diisi" }]}
      >
        <Select
          className="w-full lg:!w-1/2"
          placeholder="Pilih shift kerja"
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              shift: e,
            }))
          }
          options={[
            {
              label: "Shift 1",
              value: "Shift 1",
            },
            {
              label: "Shift 2",
              value: "Shift 2",
            },
          ]}
        />
      </Form.Item>

      <Form.Item className="w-full lg:w-1/2">
        <div className="flex items-center w-full space-x-4">
          <Button
            className="!w-full"
            size="large"
            danger
            type="dashed"
            htmlType="button"
          >
            Batal
          </Button>
          <Button
            className="!w-full"
            size="large"
            type="primary"
            htmlType="submit"
          >
            Simpan
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
