"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  App,
  Button,
  Card,
  Form,
  FormProps,
  Input,
  InputNumber,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { authProps } from "@/types";
import { FormItem } from "./form-item";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { formatInputNumber, parserInputNumber } from "@/libs/formatter";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";
import { useRouter } from "next/navigation";

type props = {
  session: authProps;
};

export const FormCreate = ({ session }: props) => {
  const [pending, startTransition] = useTransition();
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const router = useRouter();
  const [additionalNonCash, setAdditionalNonCash] = useState<{
    [key: string]: number;
  }>({});

  const [additionalExpenses, setAdditionalExpenses] = useState<{
    [key: string]: number;
  }>({});

  const qrValue = Form.useWatch("qr", form) || 0;
  const edcValue = Form.useWatch("edc", form) || 0;
  const grabValue = Form.useWatch("grab", form) || 0;
  const pesananValue = Form.useWatch("pesanan", form) || 0;

  const eatValue = Form.useWatch("Makan", form) || 0;

  useEffect(() => {
    const totalNonCash =
      qrValue +
      edcValue +
      grabValue +
      pesananValue +
      Object.values(additionalNonCash).reduce((acc, val) => acc + val, 0);
    form.setFieldsValue({ income_non_cash: totalNonCash });
  }, [qrValue, edcValue, grabValue, pesananValue, additionalNonCash, form]);

  useEffect(() => {
    const totalExpenses =
      eatValue +
      Object.values(additionalExpenses).reduce((acc, val) => acc + val, 0);
    form.setFieldsValue({ expense_cash: totalExpenses, total_expense: totalExpenses });
  }, [eatValue, additionalExpenses, form]);

  const handleAdditionalNonCashChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setAdditionalNonCash((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAdditionalExpensesChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setAdditionalExpenses((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAdditionalNonCashKeyValueChange = (
    index: number,
    key: string,
    value: number
  ) => {
    setAdditionalNonCash((prev) => {
      const newFields = { ...prev };
      delete newFields[Object.keys(newFields)[index]];
      return { ...newFields, [key]: value };
    });
  };

  const handleAdditionalExpensesKeyValueChange = (
    index: number,
    key: string,
    value: number
  ) => {
    setAdditionalExpenses((prev) => {
      const newFields = { ...prev };
      delete newFields[Object.keys(newFields)[index]];
      return { ...newFields, [key]: value };
    });
  };

  const submitForm: FormProps["onFinish"] = async (values) => {
    const non_cash = {
      QR: values.qr || 0,
      EDC: values.edc || 0,
      Grab: values.grab || 0,
      Pesanan: values.pesanan || 0,
      ...additionalNonCash,
    };

    const expenses = {
      Makan: values.Makan || 0,
      ...additionalExpenses,
    };

    const nonCashArray = Object.entries(non_cash).map(
      ([description, amount]) => ({
        description,
        amount,
      })
    );

    const expensesArray = Object.entries(expenses).map(
      ([description, amount]) => ({
        description,
        amount,
      })
    );

    const finalData = {
      non_cash: nonCashArray,
      expenses: expensesArray,
    };

    const payload = {
      reporter: session.name,
      non_cash: finalData.non_cash,
      expenses: finalData.expenses,
      total_income: Number(values.income_non_cash) + Number(values.income_cash),
      total_cash: values.income_cash,
      total_non_cash: values.income_non_cash,
      total_expenses: values.expense_cash,
    };
    
    startTransition(async () => {
      await axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/api/report/sales/create", payload)
        .then(async (res) => {
          if (res.status !== 201) {
            message.error(res.data.message);
          } else {
            message.success(res.data.message);
            await refresher({ path: "/dashboard/report/sales" });
            return router.push("/dashboard/report/sales")
          }
        })
        .catch((error: any) => {
          message.error(`${error.response.data.message}`);
        });
    });
  };

  return (
    <div>
      <Form form={form} onFinish={submitForm}>
        <div className="pb-2">
          <Typography>Dibuat Oleh : {session.name}</Typography>
          <Typography>Shift : {session.shift}</Typography>
          <Typography>
            Tanggal :{" "}
            {format(new Date(Date.now()), "EEEE, dd-MM-yyyy - HH:mm:ss", {
              locale: id,
            })}
          </Typography>
        </div>
        <div className="w-full grid grid-cols-1 space-y-3 lg:space-y-0 lg:grid-cols-2 lg:gap-3">
          <Card title="Pendapatan Non-tunai" className="shadow-md">
            <div className="flex w-full h-full items-center flex-col justify-between">
              <div className="w-full">
                <FormItem
                  name="qr"
                  label="QR"
                  type="number"
                  prefix="Rp."
                  className="!mb-0"
                />
                <FormItem
                  name="edc"
                  label="EDC BCA"
                  type="number"
                  prefix="Rp."
                  className="!mb-0"
                />
                <FormItem
                  name="grab"
                  label="GRAB"
                  type="number"
                  prefix="Rp."
                  className="!mb-0"
                />
                <FormItem
                  name="pesanan"
                  label="Pesanan"
                  type="number"
                  prefix="Rp."
                  className="!mb-0"
                />

                <Form.List name="non_cash_additional">
                  {(fields, { add, remove }) => (
                    <div className="w-full">
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div
                          key={key}
                          className="!w-full !flex !items-center gap-2 flex-1 mb-5"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "key"]}
                            rules={[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                            className="!mb-0"
                          >
                            <Input
                              type="text"
                              onChange={(event) =>
                                handleAdditionalNonCashKeyValueChange(
                                  index,
                                  event.target.value,
                                  additionalNonCash[
                                    Object.keys(additionalNonCash)[index]
                                  ] || 0
                                )
                              }
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "value"]}
                            rules={[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                            className="!mb-0 !w-full"
                          >
                            <InputNumber
                              className="!w-full"
                              prefix="Rp."
                              formatter={formatInputNumber}
                              parser={parserInputNumber}
                              onChange={(value) =>
                                handleAdditionalNonCashChange(
                                  index,
                                  Object.keys(additionalNonCash)[index],
                                  value
                                )
                              }
                            />
                          </Form.Item>
                          <div>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </div>
                        </div>
                      ))}
                      <Form.Item className="!mt-2">
                        <Button
                          type="dashed"
                          htmlType="button"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Tambah Tipe Lain
                        </Button>
                      </Form.Item>
                    </div>
                  )}
                </Form.List>
              </div>

              <div className="w-full">
                <Form.Item
                  className="!w-fit float-end mt-5 !mb-0"
                  label="Total"
                  name={"income_non_cash"}
                  shouldUpdate
                >
                  <InputNumber
                    className="!w-full"
                    prefix="Rp."
                    formatter={formatInputNumber}
                    parser={parserInputNumber}
                  />
                </Form.Item>
              </div>
            </div>
          </Card>

          <Card title="Pengeluaran Tunai" className="shadow-md">
            <div className="flex w-full !h-full items-center flex-col justify-between flex-1">
              <div className="!w-full !h-full">
                <FormItem
                  label="makan"
                  name="Makan"
                  prefix="Rp."
                  type="number"
                  className="!mb-0"
                />

                <Form.List name="cash-additional">
                  {(fields, { add, remove }) => (
                    <div className="w-full">
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div
                          key={key}
                          className="!w-full !flex !items-center gap-2 flex-1 mb-5"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "key"]}
                            rules={[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                            className="!mb-0"
                          >
                            <Input
                              type="text"
                              onChange={(event) =>
                                handleAdditionalExpensesKeyValueChange(
                                  index,
                                  event.target.value,
                                  additionalExpenses[
                                    Object.keys(additionalExpenses)[index]
                                  ] || 0
                                )
                              }
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "value"]}
                            rules={[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                            className="!mb-0 !w-full"
                          >
                            <InputNumber
                              className="!w-full"
                              prefix="Rp."
                              formatter={formatInputNumber}
                              parser={parserInputNumber}
                              onChange={(value) =>
                                handleAdditionalExpensesChange(
                                  index,
                                  Object.keys(additionalExpenses)[index],
                                  value
                                )
                              }
                            />
                          </Form.Item>
                          <div>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </div>
                        </div>
                      ))}
                      <Form.Item className="!mt-2">
                        <Button
                          type="dashed"
                          htmlType="button"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Tambah Tipe Lain
                        </Button>
                      </Form.Item>
                    </div>
                  )}
                </Form.List>
              </div>
              <div className="w-full">
                <Form.Item
                  className="!w-fit float-end mt-5 !mb-0"
                  label="Total"
                  name={"expense_cash"}
                  shouldUpdate
                >
                  <InputNumber
                    className="!w-full"
                    prefix="Rp."
                    formatter={formatInputNumber}
                    parser={parserInputNumber}
                    onChange={(value) => {
                      const total_expense = form.getFieldValue("expense_cash");

                      form.setFieldValue("total_expense", total_expense)
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          </Card>

          <Card className="shadow-md float-right">
            <div className="w-full flex flex-col gap-2">
              
            <Form.Item
              className="!w-full !mb-0"
              label="Total Pendapatan"
              name={"total_income"}
              shouldUpdate
              rules={[{ required: true, message: "harap isi pendapatan tunai" }]}
            >
              <InputNumber
                className="!w-full"
                prefix="Rp."
                formatter={formatInputNumber}
                parser={parserInputNumber}
                onChange={(value) => {
                  const total_income = form.getFieldValue("total_income");
                  const income_non_cash = form.getFieldValue("income_non_cash");

                  form.setFieldValue("income_cash", total_income - income_non_cash)
                }}
                min={0}
              />
            </Form.Item>

            <Form.Item
              className="!w-full !mb-0"
              label="Pendapatan Tunai"
              name={"income_cash"}
              shouldUpdate
            >
              <InputNumber
                className="!w-full"
                prefix="Rp."
                formatter={formatInputNumber}
                parser={parserInputNumber}
                min={0}
              />
            </Form.Item>

            <Form.Item
              className="!w-full !mb-0"
              label="Total Pengeluaran"
              name={"total_expense"}
              dependencies={["expense_cash"]}
            >
              <InputNumber
                className="!w-full"
                prefix="Rp."
                formatter={formatInputNumber}
                parser={parserInputNumber}
                min={0}
              />
            </Form.Item>
            </div>
          </Card>
        </div>

        <Form.Item>
          <div className="flex items-center justify-end gap-3 mt-5">
            <Button
              type="dashed"
              disabled={pending}
              loading={pending}
              htmlType="button"
              danger
              onClick={() => router.push("/dashboard/report/sales")}
            >
              Batal
            </Button>
            <Button
              type="primary"
              disabled={pending}
              loading={pending}
              htmlType="submit"
            >
              Simpan
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
