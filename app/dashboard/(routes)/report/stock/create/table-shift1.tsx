"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button, Form, InputNumber, Table, Typography, message } from "antd";
import type { TableProps } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import { formatDateLaporan, formatRupiah } from "@/libs/formatter";
import { useMediaQuery } from "usehooks-ts";
import { ReportStockProps, authProps } from "@/types";
import { JwtPayload } from "jwt-decode";
import { createReportStockShift1 } from "@/app/api/mutations/report";
import { useRouter } from "next/navigation";
import { useCurrentDate } from "@/store/use-date";
import { fetchReportShiftYesterday } from "@/app/api/mutations/products";

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
  total_sold: number;
  total_price: number;
}

export const TableReportShift1 = ({
  dataProduct,
  session,
}: {
  dataProduct: DataType[];
  session: authProps & JwtPayload;
}) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { currentDate } = useCurrentDate();
  const [initialValue, setInitialValue] = useState<any>();

  useEffect(() => {
    const getDataReportYesterday = async () => {
      const res = await fetchReportShiftYesterday({
        date: currentDate?.toISOString() || "",
      });
      let initialValues: any = {};

      const dataShift2Yesterday = (res?.report_shift_2?.values as any) || null;
      if (dataShift2Yesterday) {
        Object.keys(dataShift2Yesterday).forEach((key) => {
          initialValues[key] = {
            stock_before: dataShift2Yesterday[key].night_stock,
          };
        });

        setInitialValue(initialValues)
      }
    };

    getDataReportYesterday();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  console.log(initialValue)

  console.log(currentDate);

  const onFinish = async (values: any) => {
    startTransition(async () => {
      await createReportStockShift1({
        reporter: session.name,
        values: values,
        grand_total: 0,
        date: currentDate?.toString() || "",
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
      title: "Jumlah Terjual",
      dataIndex: "total_sold",
      align: "center",
      render: (value, record, index) => {
        return (
          <Form.Item
            name={[record.name, "total_sold"]}
            initialValue={record.total_sold}
            rules={[{ required: true, message: "Harap isi total terjual" }]}
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

  const onMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="w-full h-full overflow-x-scroll relative">
      {contextHolder}
      <Form form={form} onFinish={onFinish} initialValues={initialValue}>
        <div className="overflow-scroll relative">
          <Table
            bordered
            columns={columns}
            dataSource={dataProduct}
            title={() => {
              return (
                <p>
                  Laporan Stock <b>{session.shift}</b> <br />
                  Tanggal : <b>{formatDateLaporan(currentDate!)}</b>
                </p>
              );
            }}
            pagination={false}
            rowKey={({ id }) => id}
            className="overflow-scroll"
          />

          <div className="w-full flex items-center justify-between mt-2 mb-2">
            <Typography>Grand Total {session.shift} :</Typography>
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
                loading={pending}
                danger
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
