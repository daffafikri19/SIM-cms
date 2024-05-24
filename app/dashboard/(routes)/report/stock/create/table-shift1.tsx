"use client";

import React, { useState, useTransition } from "react";
import { Button, Form, InputNumber, Modal, Table, Typography, message } from "antd";
import type { TableProps } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import { formatDateLaporan, formatRupiah } from "@/libs/formatter";
import { useMediaQuery } from "usehooks-ts";
import { authProps } from "@/types";
import { JwtPayload } from "jwt-decode";
import { createReportStockShift1 } from "@/app/api/mutations/report";
import { useRouter } from "next/navigation";

type ColumnsType<T> = TableProps<T>["columns"];

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  price: string;
  category: string;
  stock_before: number;
  afternoon_stock: number;
  order: number;
  withdrawal: number;
  total_price: number;
}

export const TableReportShift1 = ({
  dataProduct,
  session,
  reportYesterday,
}: {
  dataProduct: DataType[];
  session: authProps & JwtPayload;
  reportYesterday: any;
}) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const [form] = Form.useForm();
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [messageApi, contextHolder] = message.useMessage();


  const onFinish = async (values: any) => {
    startTransition(async () => {
      await createReportStockShift1({
        reporter: session.name,
        values: values,
        grand_total: 100,
      }).then((res) => {
        if (res?.status === 201) {
          messageApi.success(res.message);
          router.push("/dashboard/report/stock");
        } else {
          messageApi.error(res?.message);
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
      render: (value, record, index) => {
        return (
          <Form.Item
            name={[record.name, "stock_before"]}
            initialValue={record.stock_before}
            rules={[{ required: true, message: "Harap isi stok sebelumnya" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        );
      },
    },
    {
      title: "Stok Sore",
      dataIndex: "afternoon_stock",
      align: "center",
      render: (value, record, index) => {
        return (
          <Form.Item
            name={[record.name, "afternoon_stock"]}
            initialValue={record.afternoon_stock}
            rules={[{ required: true, message: "Harap isi stok sore" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        );
      },
    },
    {
      title: "Order",
      dataIndex: "order",
      align: "center",
      render: (value, record, index) => {
        return (
          <Form.Item
            name={[record.name, "order"]}
            initialValue={record.order}
            rules={[{ required: true, message: "Harap isi order" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        );
      },
    },
    {
      title: "Penarikan E.D",
      dataIndex: "withdrawal",
      align: "center",
      render: (value, record, index) => {
        return (
          <Form.Item
            name={[record.name, "withdrawal"]}
            initialValue={record.withdrawal}
            rules={[{ required: true, message: "Harap isi penarikan" }]}
          >
            <InputNumber min={0} />
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
          <Form.Item
            name={[record.name, "total_price"]}
            initialValue={record.total_price}
            rules={[{ required: true, message: "Harap isi total harga" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        );
      },
    },
  ];

  const onMobile = useMediaQuery("(max-width: 800px)");

  return (
    <div className="w-full h-full overflow-x-scroll relative">
      {contextHolder}
      <Form form={form} onFinish={onFinish}>
        <div className="overflow-scroll relative">
          <Table
            bordered
            columns={columns}
            dataSource={dataProduct}
            title={() => {
              return (
                <p>
                  Laporan Stock {session.shift} <br /> hari :{" "}
                  {formatDateLaporan(new Date(Date.now()))}
                </p>
              );
            }}
            pagination={false}
            rowKey={({ id }) => id}
            className="overflow-scroll"
          />

          <div className="w-full flex items-center justify-between mt-2 mb-2">
            <Typography>Grand Total Shift 1 :</Typography>
          </div>

          <div className="w-full flex items-center justify-between">
            {onMobile ? (
              <p>
                scroll untuk melihat form <SwapRightOutlined />
              </p>
            ) : (
              <p></p>
            )}
            <Button
              htmlType="submit"
              type="primary"
              className="float-end"
              loading={pending}
              disabled={pending}
            >
              Kirim
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};
