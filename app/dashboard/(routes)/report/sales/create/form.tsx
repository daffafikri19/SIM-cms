"use client";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import {
  Button,
  Card,
  Form,
  FormProps,
  Input,
  InputNumber,
  Space,
  Typography,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ReportSalesProps, authProps } from "@/types";
import { FormItem } from "./form-item";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  formatInputNumber,
  parserInputNumber,
  transformDataToArray,
} from "@/libs/formatter";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { refresher } from "@/app/api/services/refresher";

type props = {
  session: authProps;
};

type nonCashSerializer = {
  QR: number;
  EDC: number;
  Grab: number;
  Pesanan: number;
  [additional: string]: number;
  income: number;
};

type expencesSerializer = {
  eat: number;
  [additional: string]: number;
  income: number;
};

export const FormCreate = ({ session }: props) => {
  const [pending, startTransition] = useTransition();
  const [form] = Form.useForm();
  const [nonCashValues, setNonCashValues] = useState<nonCashSerializer>({
    QR: 0,
    EDC: 0,
    Grab: 0,
    Pesanan: 0,
    income: 0,
  });

  const [additionalNonCash, setAdditionalNonCash] = useState<{
    [key: string]: number;
  }>({});

  const [additionalExpences, setAdditionalExpences] = useState<{
    [key: string]: number;
  }>({});

  const [expencesValue, setExpencesValue] = useState<expencesSerializer>({
    eat: 0,
    income: 0,
  });

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

  const handleAdditionalExpencesChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setAdditionalExpences((prev) => ({
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

  const handleAdditionalExpencesKeyValueChange = (
    index: number,
    key: string,
    value: number
  ) => {
    setAdditionalExpences((prev) => {
      const newFields = { ...prev };
      delete newFields[Object.keys(newFields)[index]];
      return { ...newFields, [key]: value };
    });
  };

  const submitForm: FormProps["onFinish"] = async (values) => {
    const non_cash = {
      ...nonCashValues,
      ...additionalNonCash,
    };

    const expences = {
      ...expencesValue,
      ...additionalExpences,
    };
    // Convert non_cash object to array of objects
    const nonCashArray = Object.entries(non_cash).map(
      ([description, amount]) => ({
        description,
        amount,
      })
    );

    // Convert expences object to array of objects
    const expencesArray = Object.entries(expences).map(
      ([description, amount]) => ({
        description,
        amount,
      })
    );

    const finalData = {
      non_cash: nonCashArray,
      expences: expencesArray,
    };

    console.log("Final Data:", finalData);

    startTransition(async () => {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/report/sales/create", {
        reporter: session.name,
        non_cash: finalData.non_cash,
        expences: finalData.expences,
        total_income: 10000,
        total_cash: 20000,
        total_non_cash: 30000,
        total_expences: 20000,
      }).then(async (res) => {
        if(res.status !== 200) {
          message.error(res.data.message)
          await refresher({ path: '/dashboard/report/sales' })
        } else {
          message.success(res.data.message)
          await refresher({ path: '/dashboard/report/sales' })
        }
      }).catch((error : any) => {
        console.log("ERROR REPORT SALES", error)
        message.error(`${error.response.data.message}`)
      })
    })
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
                  onChange={(value) =>
                    setNonCashValues((prev) => ({ ...prev, QR: value }))
                  }
                />
                <FormItem
                  name="edc"
                  label="EDC BCA"
                  type="number"
                  prefix="Rp."
                  onChange={(value) =>
                    setNonCashValues((prev) => ({ ...prev, EDC: value }))
                  }
                />
                <FormItem
                  name="grab"
                  label="GRAB"
                  type="number"
                  prefix="Rp."
                  onChange={(value) =>
                    setNonCashValues((prev) => ({ ...prev, Grab: value }))
                  }
                />
                <FormItem
                  name="pesanan"
                  label="Pesanan"
                  type="number"
                  prefix="Rp."
                  onChange={(value) =>
                    setNonCashValues((prev) => ({ ...prev, Pesanan: value }))
                  }
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
                  className="!w-1/2 float-end mt-5 !mb-0"
                  label="Pendapatan"
                  name={"income_non_cash"}
                  shouldUpdate
                >
                  <InputNumber
                    className="!w-full"
                    prefix="Rp."
                    formatter={formatInputNumber}
                    parser={parserInputNumber}
                    value={nonCashValues.income}
                    onChange={(value) =>
                      setNonCashValues((prevState) => ({
                        ...prevState,
                        income: value,
                      }))
                    }
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
                  name="eat"
                  prefix="Rp."
                  type="number"
                  onChange={(value) =>
                    setExpencesValue((prev) => ({ ...prev, eat: value }))
                  }
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
                                handleAdditionalExpencesKeyValueChange(
                                  index,
                                  event.target.value,
                                  additionalExpences[
                                    Object.keys(additionalExpences)[index]
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
                                handleAdditionalExpencesChange(
                                  index,
                                  Object.keys(additionalExpences)[index],
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
                  className="!w-1/2 float-end mt-5 !mb-0"
                  label="Pengeluaran"
                  name={"income-cash"}
                >
                  <InputNumber
                    className="!w-full"
                    prefix="Rp."
                    formatter={formatInputNumber}
                    parser={parserInputNumber}
                    onChange={(value) =>
                      setExpencesValue((prev) => ({ ...prev, income: value }))
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </Card>
        </div>

        <Form.Item>
          <div className="flex items-center justify-end gap-3 mt-5">
            <Button type="dashed" disabled={pending} loading={pending} htmlType="button" danger>
              Batal
            </Button>
            <Button type="primary" disabled={pending} loading={pending} htmlType="submit">
              Simpan
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
