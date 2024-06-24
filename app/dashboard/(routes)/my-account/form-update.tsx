"use client";

import React, { useState, useTransition } from "react";
import { App, Button, Form, FormProps, Image, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UploadFile } from "@/components/upload-file";
import { UserProps } from "@/types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";
import { deleteCookie } from "@/app/api/services/delete-cookie";

type props = {
  userdata: UserProps;
};

export const FormUpdateUserData = ({ userdata }: props) => {
  const [profile, setProfile] = useState<string | null>(userdata.profile_picture);
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useLocalStorage("funBreadToken", null);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const router = useRouter();

  const handleFileSelected = (image: string) => {
    setProfile(image);
  };

  const handleRemoveImage = () => {
    setProfile(null);
  };

  const handleSubmitForm: FormProps["onFinish"] = (values) => {
    startTransition(async () => {
      try {
        const result = await axios.patch(process.env.NEXT_PUBLIC_API_URL + `/api/user/data/update/${userdata.id}`, {
            name: values.name,
            email: values.email,
            profile_picture: profile !== null ? profile : userdata.profile_picture,
            password: values.password,
            confPassword: values.confPassword
        });

        setValue(null);
        await deleteCookie();
        message.success(result.data.message)
        message.success("Harap login kembali")
      } catch (error: any) {
        if (error.response) {
            message.error(error.response.data.message)
        }
      }
    });
  };

  return (
    <Form
      layout="vertical"
      initialValues={userdata}
      className="!w-1/2"
      autoComplete="off"
      autoSave="off"
      autoFocus={false}
      onFinish={handleSubmitForm}
    >
      <Form.Item
        label="Nama Lengkap"
        name="name"
        rules={[{ required: true, message: "Nama lengkap tidak boleh kosong" }]}
      >
        <Input showCount minLength={3} maxLength={100} />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input readOnly disabled showCount minLength={3} maxLength={100} />
      </Form.Item>
      <Form.Item label="Foto Profile" help={<p className="text-xs truncate">Abaikan bila tidak ingin merubah foto profile yang sudah ada</p>} name="profile_picture" className="w-full lg:!w-1/2">
        {profile ? (
          <div className="relative">
            <Image
              src={`${
                process.env.NEXT_PUBLIC_API_URL + profile
              }`}
              alt="produk"
              width={100}
              height={100}
            />
            <EditOutlined
              className="cursor-pointer absolute"
              onClick={handleRemoveImage}
            />
          </div>
        ) : (
          <UploadFile onFileSelected={handleFileSelected} />
        )}
      </Form.Item>
      <Form.Item
        label="Password Baru"
        name="password"
        rules={[
          { required: true, message: "Password baru tidak boleh kosong" },
        ]}
        help="Masukan password lama jika tidak ingin diubah"
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Konfirmasi Password"
        name="confPassword"
        rules={[
          { required: true, message: "Konfirmasi password tidak boleh kosong" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <div className="flex items-center justify-end gap-2">
          <Button
            htmlType="button"
            type="dashed"
            onClick={() => router.back()}
            disabled={pending}
          >
            Batal
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={pending}
            disabled={pending}
          >
            Simpan
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
