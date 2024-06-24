"use client";

import React, { useState, useTransition } from "react";
import { Button, Form, Input, Select, message, InputNumber, Image, App } from "antd";
import type { FormProps } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ProductProps } from "@/types";
import { FileManager } from "@/components/open-filemanager";
import { useRouter } from "next/navigation";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";
import { formatInputNumber, parserInputNumber } from "@/libs/formatter";

type props = {
  product_id: string;
  dataProduct: ProductProps;
  categoryProduct: {
    id: number;
    name: string;
  }[];
};

export const FormEditProduct = ({
  product_id,
  dataProduct,
  categoryProduct,
}: props) => {
  const router = useRouter();
  const [formdata, setFormdata] = useState<ProductProps>(dataProduct);
  const [pending, startTransition] = useTransition();
  const { message } = App.useApp();

  const handleSubmitForm: FormProps<ProductProps>["onFinish"] = async (
    values
  ) => {
    startTransition(async () => {
      await axios.patch(process.env.NEXT_PUBLIC_API_URL + `/api/product/update/${product_id}`, {
        id: product_id,
        name: values.name,
        price: values.price,
        picture: formdata.picture,
        max_age: values.max_age,
        category: values.category
      }).then(async (res) => {
        if(res.status === 200) {
          await refresher({ path: "/dashboard/product" })
          await refresher({ path: "/dashboard/product/edit" })
          message.success(res.data.message)
          return router.push("/dashboard/product")
        } else {
          return message.error(res.data.message)
        }
      })
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

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmitForm}
      name="update-product"
      autoComplete="off"
      initialValues={{
        name: formdata.name,
        picture: formdata.picture,
        price: formdata.price,
        max_age: formdata.max_age,
        category: formdata.category.name,
      }}
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
          prefix="Rp"
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
          options={categoryProduct.map((data) => ({
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
