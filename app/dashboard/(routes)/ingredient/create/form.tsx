"use client";

import React, { useState, useTransition } from "react";
import { Button, Divider, Form, Input, InputNumber, Select, message } from "antd";
import type { FormProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IngredientCategoryProps, IngredientProps } from "@/types";

import { useRouter } from "next/navigation";
import {
  createCategoryIngredient,
  createIngredient,
} from "@/app/api/mutations/ingredients";

type props = {
  categoryData: IngredientCategoryProps[];
};

export const FormCreateIngredient = ({ categoryData }: props) => {
  const router = useRouter();
  const [formdata, setFormdata] = useState<IngredientProps>({
    name: "",
    category: {
      id: 0,
      name: "",
    },
    price: 0
  });
  const [pending, startTransition] = useTransition();

  const handleSubmitForm: FormProps<IngredientProps>["onFinish"] = async (
    values
  ) => {
    startTransition(async () => {
      await createIngredient({
        name: values.name,
        category: values.category,
        price: Number(values.price),
      })
        .then((res) => {
          res?.status === 201
            ? message.success(res?.message)
            : message.error(res?.message);
          return router.push("/dashboard/ingredient");
        })
        .catch((error) => {
          if (error.response) {
            message.error(error.response.data.message);
            console.log(error.response.data.errorMessage);
          }
        });
    });
  };

  const handleCreateNewCategory = async () => {
    await createCategoryIngredient({ name: formdata.category.name }).then(
      (res) => {
        setFormdata((prev) => ({
          ...prev,
          category: {
            id: 0,
            name: "",
          },
        }));
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

      <Form.Item
        label="Harga Bahan Baku"
        name={"price"}
        className="w-full lg:!w-1/2"
      >
        <div className="flex items-center">
        <Input
          name="price"
          type="number"
          prefix="Rp."
          value={formdata.price || 0}
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              price: Number(e.target.value),
            }))
          }
          className="flex-1"
        />
        <Input name="satuan" type="number" placeholder="satuan" suffix="gram" className="!w-fit" />
        </div>
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
