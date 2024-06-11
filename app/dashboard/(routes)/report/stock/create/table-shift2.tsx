"use client";

import React, { useState, useTransition } from "react";
import { Button, Form, InputNumber, Table, Typography, message } from "antd";
import type { TableProps } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import {
  formatDateTimeString,
  formatDigitRupiah,
  formatRupiah,
} from "@/libs/formatter";
import { useMediaQuery } from "usehooks-ts";
import {
  DetailReportValueShift2Props,
  ReportStockProps,
  authProps,
} from "@/types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

type ColumnsType<T> = TableProps<T>["columns"];

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  price: number;
  category: string;
  stock_before: number;
  night_stock: number;
  total_sold: number;
  total_price: number;
}

export const TableReportShift2 = ({
  dataProduct,
  session,
  reportShiftToday,
}: {
  dataProduct: DataType[];
  session: authProps;
  reportShiftToday: ReportStockProps;
}) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const [form] = Form.useForm();
  const onMobile = useMediaQuery("(max-width: 1024px)");
  const [messageApi, contextHolder] = message.useMessage();
  const [grandTotal, setGrandTotal] = useState<number | any>(0);

  const dataShift1 = reportShiftToday.report_shift_1?.values as any;

  const initialValues: any = {};
  dataProduct.forEach((product) => {
    const shift1Data = dataShift1[product.name];
    if (shift1Data) {
      initialValues[product.name] = {
        stock_before: shift1Data.afternoon_stock,
      };
    }
  });

  const onFinish = async (values: any) => {
    startTransition(async () => {
      await axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/api/report/stock/shift2", {
          reporter: session.name,
          values: values,
          report_id: reportShiftToday.id,
          grand_total: Number(grandTotal)
        })
        .then(async (res) => {
          if (res.status === 201) {
            await refresher({ path: "/dashboard/report/stock" });
            messageApi.success(res.data.message);
            return router.push("/dashboard/report/stock");
          } else {
            return messageApi.error(res.data.message)
          }
        });
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
      render: (value, record, index) => {
        return <p className="truncate">{index + 1}</p>;
      },
    },
    {
      title: "Nama Produk",
      dataIndex: "name",
      align: "center",
      className: "truncate",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      align: "center",
      className: "truncate",
      render: (value, record, index) => {
        return <p>{value.name}</p>;
      },
    },
    {
      title: "Harga",
      dataIndex: "price",
      align: "center",
      className: "truncate",
      render: (value, record, index) => {
        return <p>{formatRupiah(value)}</p>;
      },
    },
    {
      title: "Stok Sebelumnya",
      dataIndex: "stock_before",
      align: "center",
      render: (value: DetailReportValueShift2Props, record, index) => {
        return (
          <Form.Item
            name={[record.name, "stock_before"]}
            className="!mb-0"
            rules={[{ required: true, message: "Harap isi stok sebelumnya" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        );
      },
    },
    {
      title: "Stok Malam",
      dataIndex: "night_stock",
      align: "center",
      render: (value, record, index) => {
        return (
          <Form.Item
            name={[record.name, "night_stock"]}
            initialValue={value}
            className="!mb-0"
            rules={[{ required: true, message: "Harap isi stok malam" }]}
            dependencies={[record.name, "stock_before"]}
          >
            <InputNumber
              min={0}
              onChange={() => {
                const stock_before = form.getFieldValue([
                  record.name,
                  "stock_before",
                ]);
                const night_stock = form.getFieldValue([
                  record.name,
                  "night_stock",
                ]);
                const total_sold = stock_before - night_stock;
                form.setFieldsValue({
                  [record.name]: {
                    total_sold: total_sold,
                    total_price: total_sold * record.price,
                  },
                });

                const allValues = form.getFieldsValue();

                let grand_total = 0;

                Object.keys(allValues).forEach((key) => {
                  const item = allValues[key];
                  if (item.total_price) {
                    grand_total += item.total_price;
                    setGrandTotal(grand_total);
                  }
                });
              }}
            />
          </Form.Item>
        );
      },
    },
    {
      title: "Total Terjual",
      dataIndex: "total_sold",
      align: "center",
      render: (value, record, index) => {
        return (
          <Form.Item shouldUpdate className="!mb-0">
            {() => {
              const stock_before = form.getFieldValue([
                record.name,
                "stock_before",
              ]);
              const night_stock = form.getFieldValue([
                record.name,
                "night_stock",
              ]);
              const total_sold = stock_before - night_stock;
              return (
                <Form.Item
                  name={[record.name, "total_sold"]}
                  initialValue={total_sold}
                  className="!mb-0"
                  rules={[
                    { required: true, message: "Harap isi total terjual" },
                  ]}
                >
                  <InputNumber min={0} value={total_sold} readOnly />
                </Form.Item>
              );
            }}
          </Form.Item>
        );
      },
    },
    {
      title: "Total Harga",
      dataIndex: "total_price",
      align: "center",
      render: (value, record, index) => {
        return (
          <Form.Item shouldUpdate className="!mb-0">
            {() => {
              const total_sold = form.getFieldValue([
                record.name,
                "total_sold",
              ]);
              const total_price = total_sold * record.price;
              return (
                <Form.Item
                  name={[record.name, "total_price"]}
                  initialValue={total_price}
                  className="!mb-0"
                  rules={[{ required: true, message: "Harap isi total harga" }]}
                >
                  <InputNumber
                    min={0}
                    prefix="Rp."
                    formatter={(value) => formatDigitRupiah(Number(value))}
                    parser={(value) => Number(value!.replace(/\./g, ""))}
                    value={total_price}
                    className="!w-fit"
                    readOnly
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        );
      },
    },
  ];

  return (
    <div className="w-full h-full overflow-x-scroll relative">
      {contextHolder}
      <Form form={form} onFinish={onFinish} initialValues={initialValues}>
        <div className="overflow-scroll relative">
          <Table
            bordered
            columns={columns}
            dataSource={dataProduct}
            title={() => {
              return (
                <p>
                  Pembuat : <b>{session.name}</b> <br />
                  Laporan Stok : <b>{session.shift}</b> <br />
                  Hari :{" "}
                  <b>
                    {formatDateTimeString(new Date(Date.now()).toISOString())}
                  </b>{" "}
                  <br />
                </p>
              );
            }}
            pagination={false}
            rowKey={({ id }) => id}
            className="overflow-scroll"
          />

          <div className="w-full flex items-center justify-between mt-2 mb-2">
            <Typography>
              Grand Total {session.shift} :{" "}
              {grandTotal ? formatRupiah(grandTotal) : "Rp. 0"}
            </Typography>
          </div>

          <div className="w-full flex justify-center flex-col lg:flex-row lg:items-center lg:justify-between">
            {onMobile ? (
              <p>
                scroll untuk melihat form <SwapRightOutlined />
              </p>
            ) : (
              <p></p>
            )}
            <div className="w-full items-center justify-center lg:justify-end flex gap-2 mt-5 lg:mt-0">
              <Button
                htmlType="button"
                type="dashed"
                danger
                loading={pending}
                disabled={pending}
                onClick={() => router.push("/dashboard/report/stock")}
                className="!w-full lg:!w-fit"
              >
                Batal
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                loading={pending}
                disabled={pending}
                className="!w-full lg:!w-fit"
              >
                Kirim
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
