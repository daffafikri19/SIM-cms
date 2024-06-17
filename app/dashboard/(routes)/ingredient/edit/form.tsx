"use client";

import React, { useState, useTransition } from "react";
import { App, Button, Form, Input, InputNumber, Select } from "antd";
import type { FormProps } from "antd";
import { IngredientCategoryProps, IngredientProps } from "@/types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";
import { formatInputNumber, parserInputNumber } from "@/libs/formatter";

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
  const { message } = App.useApp();

  const handleSubmitForm: FormProps<IngredientProps>["onFinish"] = async (
    values
  ) => {
    startTransition(async () => {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/update/${ingredient_id}`, {
        id: ingredient_id,
        name: values.name,
        category: values.category,
        price: values.price,
        unit: values.unit
      }).then(async (res) => {
        if(res.status !== 200) {
          return message.error(res.data.message)
        } else {
          await refresher({ path: "/dashboard/ingredient/edit" })
          await refresher({ path: "/dashboard/ingredient" })
          message.success(res.data.message)
          return router.push("/dashboard/ingredient");
        }
      })
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

      <div className="w-1/2 grid grid-cols-2 gap-2">
        <Form.Item label="Harga Bahan Baku" name={"price"}>
          <InputNumber
            name="price"
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
            onClick={() => router.push("/dashboard/ingredient")}
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
