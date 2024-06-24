"use client";

import React, { useState, useTransition } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  InputNumber,
  Image,
  App,
} from "antd";
import type { FormProps } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { ProductProps } from "@/types";
import { FileManager } from "@/components/open-filemanager";
import { useRouter } from "next/navigation";
import { refresher } from "@/app/api/services/refresher";
import axios from "axios";
import { formatInputNumber, parserInputNumber } from "@/libs/formatter";

type props = {
  categoryData: {
    id: number;
    name: string;
  }[];
};

export const FormCreateProduct = ({ categoryData }: props) => {
  const router = useRouter();
  const { message } = App.useApp();

  const [formdata, setFormdata] = useState<ProductProps>({
    name: "",
    picture: null,
    price: 0,
    category: {
      id: 0,
      name: "",
    },
    max_age: 0,
    created_at: "",
    updated_at: "",
  });
  const [pending, startTransition] = useTransition();

  const handleSubmitForm: FormProps<ProductProps>["onFinish"] = async (
    values
  ) => {
    startTransition(async () => {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/product/create", {
        name: values.name,
        picture: formdata.picture,
        price: values.price,
        category: values.category,
        max_age: values.max_age
      }).then(async (res) => {
        if(res.status === 201) {
          message.success(res.data.message)
          await refresher({ path: "/dashboard/product" })
          router.push("/dashboard/product");
        } else {
          return message.error(res.data.message)
        }
      })
    })
  }
  const handleFileSelected = (image: string) => {
    setFormdata((prev) => ({
      ...prev,
      picture: image,
    }));
  };

  const handleRemoveImage = () => {
    setFormdata((prev) => ({
      ...prev,
      picture: null,
    }));
  };

  const handleCreateNewCategory = async () => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/product/category/create", {
      name: formdata.category.name
    }).then(async (res) => {
      if(res.status === 201) {
        await refresher({ path: "/dashboard/product/create" })
        await refresher({ path: "/dashboard/product/category" })
        message.success(res.data.message)
      } else {
        return message.error(res.data.message)
      }
    });
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
        rules={[{ required: true, message: "Nama produk harus diisi" }]}
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
          <div className="relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL + formdata.picture}`}
              width={100}
              height={100}
              alt="produk"
            />
            <CloseOutlined
              className="cursor-pointer absolute"
              onClick={handleRemoveImage}
            />
          </div>
        ) : (
          <>
            <FileManager onFileSelected={handleFileSelected} />
          </>
        )}
      </Form.Item>

      <Form.Item
        label="Harga Produk"
        name={"price"}
        rules={[{ required: true, message: "Harga produk harus diisi" }]}
      >
        <InputNumber
          prefix="Rp."
          name="price"
          formatter={formatInputNumber}
          parser={parserInputNumber}
          value={formdata.price}
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              price: Number(e),
            }))
          }
          className="!w-full lg:!w-1/2"
        />
      </Form.Item>

      <Form.Item
        label="Kategori Produk"
        name={"category"}
        rules={[{ required: true, message: "Kategori produk harus diisi" }]}
      >
        <Select
          className="w-full lg:!w-1/2"
          placeholder="Pilih kategori produk"
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              category: e,
            }))
          }
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider className="py-2">atau</Divider>
              <div className="flex items-center w-full justify-between space-x-2">
                <Input
                  className="!flex-1"
                  value={formdata.category.name}
                  onChange={(e) =>
                    setFormdata((prev) => ({
                      ...prev,
                      category: { id: 0, name: e.target.value },
                    }))
                  }
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={handleCreateNewCategory}
                >
                  Tambah Kategori Baru
                </Button>
              </div>
            </>
          )}
          options={categoryData.map((data) => ({
            label: data.name,
            value: data.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Maksimal Umur"
        name={"max_age"}
        rules={[
          { required: true, message: "Maksimal umur produk harus diisi" },
        ]}
      >
        <InputNumber
          name="max_age"
          suffix="Hari"
          value={formdata.max_age}
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              max_age: Number(e),
            }))
          }
          className="!w-full lg:!w-1/2"
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
            disabled={pending}
            onClick={() => router.push("/dashboard/product")}
          >
            Batal
          </Button>
          <Button
            className="!w-full"
            size="large"
            type="primary"
            htmlType="submit"
            disabled={pending}
            loading={pending}
          >
            Simpan
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
