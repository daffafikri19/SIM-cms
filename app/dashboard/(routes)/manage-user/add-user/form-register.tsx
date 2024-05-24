"use client";

import React, { useRef, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Image,
  message,
} from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import type { FormProps, InputRef } from "antd";
import { RegisterProps, UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { UploadFile } from "@/components/upload-file";
import { registerUser } from "@/app/api/mutations/users";

type props = {
  roleData: UserRole[];
};

export const FormRegister = ({ roleData }: props) => {
  const router = useRouter();
  const [formdata, setFormdata] = useState<RegisterProps>({
    name: "",
    email: "",
    profile_picture: null,
    role: "",
    password: "",
    confirmPassword: "",
    shift: null,
  });
  const roleInputRef = useRef<InputRef>(null);

  const handleSubmitForm: FormProps<RegisterProps>["onFinish"] = async (
    values
  ) => {
    await registerUser({
      name: values.name,
      email: values.email,
      profile_picture: formdata.profile_picture || null,
      password: values.password,
      confirmPassword: values.confirmPassword,
      role: values.role,
      shift: values.shift || null,
    }).then((res) => {
      if(res?.status === 201) {
        message.success(res?.message)
        return router.push("/dashboard/manage-user");
      } else {
        message.error(res?.message); 
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
  };

  const handleFileSelected = (image: string) => {
    setFormdata((prev) => ({
      ...prev,
      profile_picture: image,
    }));
  };

  const handleRemoveImage = () => {
    setFormdata((prev) => ({
      ...prev,
      profile_picture: null,
    }));
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
        name={"name"}
        rules={[{ required: true, message: "Nama lengkap wajib diisi" }]}
      >
        <Input
          type="text"
          name="name"
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
        {formdata.profile_picture ? (
          <div className="relative">
            <Image
              src={`${
                process.env.NEXT_PUBLIC_API_URL + formdata.profile_picture
              }`}
              alt="produk"
              width={100}
              height={100}
            />
            <CloseOutlined
              className="cursor-pointer absolute"
              onClick={handleRemoveImage}
            />
          </div>
        ) : (
          <UploadFile onFileSelected={handleFileSelected} />
        )}
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

      {formdata.role.includes("Owner") ? null : (
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
      )}
      <Form.Item className="w-full lg:w-1/2">
        <div className="flex items-center w-full space-x-4">
          <Button
            className="!w-full"
            size="large"
            danger
            type="dashed"
            htmlType="button"
            onClick={() => router.push("/dashboard/manage-user")}
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
