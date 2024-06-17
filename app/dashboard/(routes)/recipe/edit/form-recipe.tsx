"use client";

import React, { useEffect, useTransition } from "react";
import {
  App,
  Button,
  Card,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { formatInputNumber, parserInputNumber } from "@/libs/formatter";
import { IngredientProps, RecipeProps } from "@/types";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";
import { useRouter } from "next/navigation";

type props = {
  dataRecipe: RecipeProps;
  ingredientsData: IngredientProps[];
};

export const FormEditRecipe = ({ dataRecipe, ingredientsData }: props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { message } = App.useApp();

  useEffect(() => {
    form.setFieldsValue({
      resep: [{
        nama: dataRecipe.name,
        notes: dataRecipe.notes,
        bahan: dataRecipe.recipes_ingredient.map((item: any) => ({
          ingredients: item.ingredients.name,
          dose: item.dose
        }))
      }]
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRecipe]);

  const handleSubmit: FormProps["onFinish"] = (values) => {
    startTransition(async () => {
      try {
        const res = await axios.patch(process.env.NEXT_PUBLIC_API_URL + `/api/recipe/edit/${dataRecipe.id}`, values.resep[0]);
        if (res.status === 200) {
          await refresher({ path: "/dashboard/recipe" });
          form.resetFields();
          message.success(res.data.message)
          return router.push("/dashboard/recipe")
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        console.log("ERROR RECIPE", error)
        if (axios.isAxiosError(error) && error.response) {
          message.error(error.response.data.message || "internal server error");
        } else {
          message.error("Error submitting the form");
        }
      }
    });
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Form.List name="resep">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                key={field.key}
              >
                <Form.Item
                  label="Nama Resep"
                  name={[field.name, "nama"]}
                  rules={[
                    {
                      required: true,
                      message: `${field.name} tidak boleh kosong`,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Note / Catatan Tambahan"
                  name={[field.name, "notes"]}
                >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item
                  label="Bahan"
                  className="!w-full"
                  rules={[
                    {
                      required: true,
                      message: "Bahan baku tidak boleh kosong",
                    },
                  ]}
                >
                  <Form.List name={[field.name, "bahan"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <div key={subField.key} className="relative">
                            <div className="flex items-center justify-between gap-2">
                              <Form.Item
                                name={[subField.name, "ingredients"]}
                                className="!w-full !mb-0"
                                rules={[
                                  {
                                    required: true,
                                    message: `${subField.name} tidak boleh kosong`,
                                  },
                                ]}
                              >
                                <Select
                                  showSearch
                                  placeholder="pilih / cari bahan baku"
                                  options={ingredientsData.map(
                                    (ingredient) => ({
                                      label: ingredient.name,
                                      value: ingredient.name,
                                    })
                                  )}
                                />
                              </Form.Item>

                              <Form.Item
                                name={[subField.name, "dose"]}
                                className="!w-full !mb-0"
                                rules={[
                                  {
                                    required: true,
                                    message: `${subField.name} tidak boleh kosong`,
                                  },
                                ]}
                              >
                                <InputNumber
                                  min={0}
                                  formatter={formatInputNumber}
                                  parser={parserInputNumber}
                                  suffix="gram"
                                  placeholder="takaran"
                                  className="!w-full"
                                />
                              </Form.Item>

                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                        >
                          {subFields.length < 1
                            ? "Masukan Bahan"
                            : "Tambah Bahan Lain"}
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}
          </div>
        )}
      </Form.List>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) =>
          prevValues.resep !== curValues.resep
        }
      >
        {() => (
          <div className="flex items-center justify-end gap-3 mt-5">
            <Button
              type="dashed"
              disabled={pending}
              loading={pending}
              htmlType="button"
              danger
              onClick={() => router.push("/dashboard/recipe")}
            >
              Batal
            </Button>
            <Button
              type="primary"
              disabled={
                pending ||
                !form.getFieldValue("resep") ||
                form.getFieldValue("resep").length === 0
              }
              loading={pending}
              htmlType="submit"
            >
              Simpan
            </Button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};
