"use client";

import React, { useState } from "react";
import { Button, Modal, Space, Table, TableProps, Tag, Typography } from "antd";
import {
  EyeOutlined,
  DownloadOutlined,
  PlusOutlined,
  LockOutlined,
} from "@ant-design/icons";
import {
  DetailReportValueShift1Props,
  DetailReportValueShift2Props,
  ReportStockProps,
  authProps,
} from "@/types";
import {
  formatDateLaporan,
  formatDateTimeString,
  formatRupiah,
  transformDataToArray,
} from "@/libs/formatter";
import Link from "next/link";

type props = {
  data: ReportStockProps[];
  session: authProps;
};

type ColumnsType<T> = TableProps<T>["columns"];

export const TableData = ({ data, session }: props) => {
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [reportDate, setReportDate] = useState<string | Date>("");
  const columns: ColumnsType<ReportStockProps> = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      width: 30,
      render: (value, record, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Tgl Laporan",
      dataIndex: "report_date",
      width: 100,
      render: (value, record, index) => {
        setReportDate(value);
        return <p>{formatDateTimeString(value)}</p>;
      },
    },
    {
      title: "Total Besar",
      dataIndex: "grand_total",
      width: 100,
      render: (value, record, index) => {
        return <p>{value}</p>;
      },
    },
    {
      title: "Laporan Shift 1",
      dataIndex: "report_shift_1",
      width: 100,
      align: "center",
      render: (value : ReportStockProps["report_shift_1"], record, index) => {
        if (value?.values) {
          const dataReportShift1 = transformDataToArray(value.values);
          const ReportValueColumn1: ColumnsType<DetailReportValueShift1Props> = [
            {
              title: "Nama Produk",
              dataIndex: "product_name",
            },
            {
              title: "Stok Sebelumnya",
              dataIndex: "stock_before",
            },
            {
              title: "Stok Sore",
              dataIndex: "afternoon_stock",
            },
            {
              title: "Jumlah Order",
              dataIndex: "order",
              align: "center",
            },
            {
              title: "Penarikan",
              dataIndex: "withdrawal",
              align: "center",
            },
            {
              title: "Total Terjual",
              dataIndex: "total_sold",
              align: "center",
            },
            {
              title: "Total Harga",
              dataIndex: "total_price",
              align: "center",
              render: (value, record, index) => {
                return <p>{value ? formatRupiah(value) : null}</p>;
              },
            },
          ];
          return (
            <>
              <Button
                type="dashed"
                icon={<EyeOutlined />}
                onClick={() => {
                  setOpenModal1(true);
                }}
              >
                Detail
              </Button>
              <Modal
                open={openModal1}
                onCancel={() => setOpenModal1(false)}
                onOk={() => setOpenModal1(false)}
                okText="Download"
                closable={false}
                width={1000}
                footer={[
                  <Button
                    key="back"
                    type="dashed"
                    onClick={() => setOpenModal1(false)}
                  >
                    Tutup
                  </Button>,
                  <Button
                    key="download"
                    type="primary"
                    onClick={() => {}}
                    icon={<DownloadOutlined />}
                  >
                    Export
                  </Button>,
                ]}
              >
                <Table
                  bordered
                  title={() => {
                    return (
                      <Space direction="vertical">
                        <Typography>
                          Pembuat : {value.reporter?.name}
                        </Typography>
                        <Typography>Shift : {value.reporter?.shift}</Typography>
                        <Typography>
                          Dibuat :{" "}
                          {reportDate
                            ? formatDateLaporan(reportDate as Date)
                            : null}
                        </Typography>
                      </Space>
                    );
                  }}
                  scroll={{ x: 0, y: 300 }}
                  columns={ReportValueColumn1}
                  dataSource={dataReportShift1}
                  pagination={false}
                  rowKey={({ id }) => id}
                />
              </Modal>
            </>
          );
        }
      },
    },
    {
      title: "Laporan Shift 2",
      dataIndex: "report_shift_2",
      width: 100,
      align: "center",
      render: (value : ReportStockProps["report_shift_2"], record, index) => {
        if (value?.values) {
          const dataReportShift2 = transformDataToArray(value.values);
          const ReportValueColumn2: ColumnsType<DetailReportValueShift2Props> = [
            {
              title: "Nama Produk",
              dataIndex: "product_name",
              align: "center",
            },
            {
              title: "Stok Sebelumnya",
              dataIndex: "stock_before",
              align: "center",
            },
            {
              title: "Stok Malam",
              dataIndex: "night_stock",
              align: "center",
            },
            {
              title: "Total Terjual",
              dataIndex: "total_sold",
              align: "center",
            },
            {
              title: "Total Harga",
              dataIndex: "total_price",
              align: "center",
              render: (value, record, index) => {
                return <p>{value ? formatRupiah(value) : null}</p>;
              },
            },
          ];

          return (
            <>
              <Button
                type="dashed"
                icon={<EyeOutlined />}
                onClick={() => {
                  setOpenModal2(true);
                }}
              >
                Detail
              </Button>
              <Modal
                open={openModal2}
                onCancel={() => setOpenModal2(false)}
                onOk={() => setOpenModal2(false)}
                okText="Download"
                closable={false}
                width={1000}
                footer={[
                  <Button
                    key="back"
                    type="dashed"
                    onClick={() => setOpenModal2(false)}
                  >
                    Tutup
                  </Button>,
                  <Button
                    key="download"
                    type="primary"
                    onClick={() => {}}
                    icon={<DownloadOutlined />}
                  >
                    Export
                  </Button>,
                ]}
              >
                <Table
                  bordered
                  title={() => {

                    console.log(value)
                    return (
                      <Space direction="vertical">
                        <Typography>
                          Pembuat : {value.reporter?.name}
                        </Typography>
                        <Typography>Shift : {value.reporter?.shift}</Typography>
                        <Typography>
                          Dibuat :{" "}
                          {reportDate
                            ? formatDateLaporan(reportDate as Date)
                            : null}
                        </Typography>
                      </Space>
                    );
                  }}
                  scroll={{ x: 0, y: 300 }}
                  columns={ReportValueColumn2}
                  dataSource={dataReportShift2}
                  pagination={false}
                  rowKey={({ id }) => id}
                />
              </Modal>
            </>
          );
        } else {
          return (
            <div className="flex items-center justify-center">
              {session.shift === "Shift 2" ? (
                <Link href={"/dashboard/report/stock/create"}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Buat Laporan
                  </Button>
                </Link>
              ) : (
                <Button icon={<LockOutlined />} disabled>
                  Buat Laporan
                </Button>
              )}
            </div>
          );
        }
      },
    },
  ];

  return (
    <div className="w-full h-full overflow-x-scroll">
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={({ id }) => id}
      />
    </div>
  );
};
