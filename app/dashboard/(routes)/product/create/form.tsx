"use client";

import React, { useRef, useState } from "react";
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
  InputNumber,
  Image,
} from "antd";
import type { FormProps, InputRef } from "antd";
import { ProductProps } from "@/types";
import { UploadFile } from "@/app/dashboard/components/upload-file";

const { Dragger } = Upload;

export const FormCreateProduct = () => {
  const [formdata, setFormdata] = useState<ProductProps>({
    name: "",
    picture: null,
    price: 0,
    category: "",
    max_age: 0,
    created_at: "",
    updated_at: "",
  });
  const [error, setError] = useState<string | undefined>("");
  const roleInputRef = useRef<InputRef>(null);

  const handleSubmitForm: FormProps<ProductProps>["onFinish"] = async (
    values
  ) => {
    console.log("value:", values);
  };

  const handleFileSelected = (image: string) => {
    setFormdata((prev) => ({
      ...prev,
      picture: image,
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
        label="Nama Produk"
        name={"name"}
        rules={[{ required: true, message: "Nama produk wajib diisi" }]}
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
          maxLength={50}
          className="w-full lg:!w-1/2"
        />
      </Form.Item>

      <Form.Item label="Gambar Produk" name={"picture"}>
        {formdata.picture ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL + formdata.picture}`}
            alt="produk"
          />
        ) : (
          <UploadFile onFileSelected={handleFileSelected} />
        )}
      </Form.Item>

      <Form.Item label="Harga Produk" name={"price"}>
        <InputNumber
          type="number"
          name="price"
          value={formdata.price}
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              price: Number(e),
            }))
          }
          className="w-full lg:!w-1/2"
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
