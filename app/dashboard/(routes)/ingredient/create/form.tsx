"use client";

import React, { useState, useTransition } from "react";
import {
  App,
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import type { FormProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IngredientCategoryProps, IngredientProps } from "@/types";
import { useRouter } from "next/navigation";
import { formatInputNumber, parserInputNumber } from "@/libs/formatter";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

type props = {
  categoryData: IngredientCategoryProps[];
};

export const FormCreateIngredient = ({ categoryData }: props) => {
  const router = useRouter();
  const { message } = App.useApp();

  const [formdata, setFormdata] = useState<IngredientProps>({
    name: "",
    category: {
      id: 0,
      name: "",
    },
    price: 0,
    unit: 0,
  });
  const [pending, startTransition] = useTransition();

  const handleSubmitForm: FormProps<IngredientProps>["onFinish"] = async (
    values
  ) => {
    if (!values.category) {
      return message.error("nama bahan baku harus diisi");
    }
    startTransition(async () => {
      await axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/api/ingredient/create", {
          name: values.name,
          category: values.category,
          price: Number(values.price),
          unit: Number(values.unit),
        })
        .then(async (res) => {
          if (res.status !== 201) {
            message.error(res.data.message);
          } else {
            message.success(res.data.message);
            await refresher({ path: "/dashboard/ingredient" });
            return router.push("/dashboard/ingredient");
          }
        });
    });
  };

  const handleCreateNewCategory = async () => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/ingredient/category/create", {
      name: formdata.category.name
    }).then(async (res) => {
      if(res.status !== 201) {
        return message.error(res.data.message)
      } else {
        await refresher({ path: "/dashboard/ingredient" })
        await refresher({ path: "/dashboard/ingredient/create" })
        return message.success(res.data.message)
      }
    })
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmitForm}
      name="register"
      autoComplete="off"
    >
      <Form.Item
        label="Nama Bahan Baku"
        name={"name"}
        rules={[{ required: true, message: "Nama bahan baku harus diisi" }]}
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

      <Form.Item
        label="Kategori Bahan Baku"
        name={"category"}
        rules={[{ required: true, message: "Kategori bahan baku harus diisi" }]}
      >
        <Select
          className="w-full lg:!w-1/2"
          placeholder="Pilih kategori bahan baku"
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

      <div className="w-1/2 grid grid-cols-2 gap-2">
        <Form.Item label="Harga Bahan Baku" name={"price"}>
          <InputNumber
            name="price"
            type="number"
            className="!w-full"
            prefix="Rp."
            min={0}
            value={formdata.price}
            formatter={formatInputNumber}
            parser={parserInputNumber}
            onChange={(value) =>
              setFormdata((prev) => ({
                ...prev,
                price: Number(value),
              }))
            }
          />
        </Form.Item>

        <Form.Item label="Unit" name={"unit"}>
          <InputNumber
            min={0}
            suffix="gram"
            className="!w-full"
            formatter={formatInputNumber}
            parser={parserInputNumber}
            name="unit"
            value={formdata.unit}
            onChange={(value) => {
              setFormdata((prev) => ({
                ...prev,
                unit: value,
              }));
            }}
          />
        </Form.Item>
      </div>

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
