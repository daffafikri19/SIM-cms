"use client";

import React, { useState, useTransition } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  message,
  InputNumber,
  Image,
} from "antd";
import type { FormProps } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { ProductProps } from "@/types";
import { FileManager } from "@/components/open-filemanager";
import {
  createCategoryProduct,
  createProduct,
} from "@/app/api/mutations/products";
import { useRouter } from "next/navigation";

type props = {
  categoryData: {
    id: number;
    name: string;
  }[];
};

export const FormCreateProduct = ({ categoryData }: props) => {
  const router = useRouter();
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
      await createProduct({
        name: values.name,
        price: values.price,
        picture: formdata.picture,
        max_age: values.max_age,
        category: values.category,
      })
        .then((res) => {
          res?.status === 201
            ? message.success(res?.message)
            : message.error(res?.message);
          return router.push("/dashboard/product");
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  };

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
    await createCategoryProduct({ name: formdata.category.name }).then(
      (res) => {
        return res?.status === 201
          ? message.success(res?.message)
          : message.error(res?.message);
      }
    );
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
          prefix="Rp"
          placeholder="angka bulat tanpa titik"
          type="number"
          name="price"
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
          type="number"
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
            onClick={() => router.back()}
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
