"use client";

import React, { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { Button, Form, InputNumber, Table, Typography, message } from "antd";
import type { TableProps } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import {
  formatDateLaporan,
  formatInputNumber,
  formatRupiah,
  parserInputNumber,
} from "@/libs/formatter";
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
  const [grandTotal, setGrandTotal] = useState(0);
  const grandTotalRef = useRef(0);

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

        setInitialValue(initialValues);
        form.setFieldsValue(initialValues);
      }
    };

    getDataReportYesterday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  
  const updateGrandTotal = useCallback(
    (total_price : any) => {
      setGrandTotal(prev => {
        const newGrandTotal = prev - grandTotalRef.current + total_price;
        grandTotalRef.current = newGrandTotal;
        return newGrandTotal;
      });
    },
    [setGrandTotal]
  );

  const onFinish = async (values: any) => {
    startTransition(async () => {
      await createReportStockShift1({
        reporter: session.name,
        values: values,
        grand_total: 0,
        date: currentDate?.toISOString(),
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
            rules={[{ required: true, message: "Harap isi stok sore" }]}
            dependencies={[record.name, "stock_before", "order", "withdrawal"]}
          >
            <InputNumber
              min={0}
              onChange={() => {
                const stock_before = form.getFieldValue([
                  record.name,
                  "stock_before",
                ]);
                const order = form.getFieldValue([record.name, "order"]);
                const afternoon_stock = form.getFieldValue([
                  record.name,
                  "afternoon_stock",
                ]);
                const withdrawal = form.getFieldValue([
                  record.name,
                  "withdrawal",
                ]);
                const total_sold =
                  stock_before + order - (afternoon_stock + withdrawal);
                form.setFieldsValue({
                  [record.name]: {
                    total_sold: total_sold,
                    total_price: total_sold * Number(record.price),
                  },
                });
              }}
            />
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
            rules={[{ required: true, message: "Harap isi order" }]}
            dependencies={[
              record.name,
              "stock_before",
              "afternoon_stock",
              "withdrawal",
            ]}
          >
            <InputNumber
              min={0}
              onChange={() => {
                const stock_before = form.getFieldValue([
                  record.name,
                  "stock_before",
                ]);
                const order = form.getFieldValue([record.name, "order"]);
                const afternoon_stock = form.getFieldValue([
                  record.name,
                  "afternoon_stock",
                ]);
                const withdrawal = form.getFieldValue([
                  record.name,
                  "withdrawal",
                ]);
                const total_sold =
                  stock_before + order - (afternoon_stock + withdrawal);
                form.setFieldsValue({
                  [record.name]: {
                    total_sold: total_sold,
                    total_price: total_sold * Number(record.price),
                  },
                });
              }}
            />
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
            rules={[{ required: true, message: "Harap isi penarikan" }]}
            dependencies={[
              record.name,
              "stock_before",
              "order",
              "afternoon_stock",
            ]}
          >
            <InputNumber
              min={0}
              onChange={() => {
                const stock_before = form.getFieldValue([
                  record.name,
                  "stock_before",
                ]);
                const order = form.getFieldValue([record.name, "order"]);
                const afternoon_stock = form.getFieldValue([
                  record.name,
                  "afternoon_stock",
                ]);
                const withdrawal = form.getFieldValue([
                  record.name,
                  "withdrawal",
                ]);
                const total_sold =
                  stock_before + order - (afternoon_stock + withdrawal);
                form.setFieldsValue({
                  [record.name]: {
                    total_sold: total_sold,
                    total_price: total_sold * Number(record.price),
                  },
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
              const order = form.getFieldValue([record.name, "order"]);
              const afternoon_stock = form.getFieldValue([
                record.name,
                "afternoon_stock",
              ]);
              const withdrawal = form.getFieldValue([
                record.name,
                "withdrawal",
              ]);

              const total_sold =
                stock_before + order - (afternoon_stock + withdrawal);

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
              const total_price = total_sold * Number(record.price);
              if (!isNaN(total_price)) {
                updateGrandTotal(total_price);
              }
              return (
                <Form.Item
                  name={[record.name, "total_price"]}
                  initialValue={total_price}
                  rules={[{ required: true, message: "Harap isi total harga" }]}
                  className="!mb-0"
                  dependencies={[record.name, "total_sold"]}
                >
                  <InputNumber
                    min={0}
                    prefix="Rp."
                    value={total_price}
                    formatter={formatInputNumber}
                    parser={parserInputNumber}
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
            <Typography>Grand Total {session.shift} : {grandTotal}</Typography>
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
