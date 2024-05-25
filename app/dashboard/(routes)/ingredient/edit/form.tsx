"use client";

import React, { useState, useTransition } from "react";
import { Button, Form, Input, Select, message } from "antd";
import type { FormProps } from "antd";
import { IngredientCategoryProps, IngredientProps } from "@/types";
import { useRouter } from "next/navigation";
import { updateIngredient } from "@/app/api/mutations/ingredients";

type props = {
  ingredient_id: number;
  dataIngredient: IngredientProps;
  categoryIngredient: IngredientCategoryProps[];
};

export const FormEditIngredient = ({
  ingredient_id,
  dataIngredient,
  categoryIngredient,
}: props) => {
  const router = useRouter();
  const [formdata, setFormdata] = useState<IngredientProps>(dataIngredient);
  const [pending, startTransition] = useTransition();

  const handleSubmitForm: FormProps<IngredientProps>["onFinish"] = async (
    values
  ) => {
    startTransition(async () => {
      await updateIngredient({
        id: ingredient_id,
        name: values.name,
        category: values.category,
        price: Number(values.price),
      })
        .then((res) => {
          res?.status === 200
            ? message.success(res?.message)
            : message.error(res?.message);
          return router.push("/dashboard/ingredient");
        })
        .catch((error: any) => {
          if (error.response) {
            message.error(error.response.data.message);
            console.log(error.response.data.errorMessage);
          }
        });
    });
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmitForm}
      name="update-ingredient"
      autoComplete="off"
      initialValues={{
        name: formdata.name,
        category: formdata.category.name,
        price: formdata.price
      }}
    >
      <Form.Item
        label="Nama bahan baku"
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
        label="Kategori bahan baku"
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
          options={categoryIngredient.map((data) => ({
            label: data.name,
            value: data.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Harga Bahan Baku"
        name={"price"}
      >
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
