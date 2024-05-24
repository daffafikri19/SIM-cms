"use client";

import React, { useState } from "react";
import { Button, Modal, Space, Table, TableProps, Tag, Typography } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  DetailReportValueShift1Props,
  ReportStockProps,
  ShiftStockProps,
} from "@/types";
import {
  formatDateLaporan,
  formatRupiah,
  transformDataToArray,
} from "@/libs/formatter";

type props = {
  data: ReportStockProps[];
};

type ColumnsType<T> = TableProps<T>["columns"];

export const TableData = ({ data }: props) => {
  const [openModal, setOpenModal] = useState(false);
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
        setReportDate(value)
        return <p>{formatDateLaporan(value)}</p>;
      },
    },
    {
      title: "Total Besar",
      dataIndex: "grand_total",
      width: 100,
      render: (value, record, index) => {
        return <p>{formatRupiah(value)}</p>;
      },
    },
    {
      title: "Laporan Shift 1",
      dataIndex: "report_shift_1",
      width: 100,
      align: "center",
      render: (value: ShiftStockProps, record, index) => {
        const data = transformDataToArray(value.values);
        const ReportValueColumn: ColumnsType<DetailReportValueShift1Props> = [
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
          },
          {
            title: "Penarikan",
            dataIndex: "withdrawal",
          },
          {
            title: "Total Harga",
            dataIndex: "total_price",
            render: (value, record, index) => {
              return <p>{formatRupiah(value)}</p>;
            },
          },
        ];
        return (
          <>
            <Button
              type="dashed"
              icon={<EyeOutlined />}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Detail
            </Button>
            <Modal
              open={openModal}
              onCancel={() => setOpenModal(false)}
              onOk={() => setOpenModal(false)}
              okText="Download"
              closable={false}
              width={1000}
              footer={[
                <Button
                  key="back"
                  type="dashed"
                  onClick={() => setOpenModal(false)}
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
                      <Typography>Pembuat : {value.reporter?.name}</Typography>
                      <Typography>Shift : {value.reporter?.shift}</Typography>
                      <Typography>Dibuat : {reportDate ? formatDateLaporan(reportDate as Date) : null}</Typography>
                    </Space>
                  )
                }}
                columns={ReportValueColumn}
                dataSource={data}
                pagination={false}
                rowKey={({ id }) => id}
                className="overflow-scroll"
              />
            </Modal>
          </>
        );
      },
    },
    {
      title: "Laporan Shift 2",
      dataIndex: "report_shift_2",
      width: 100,
      render: (value: ShiftStockProps, record, index) => {
        if (value?.reporter) {
          return <p>{value?.reporter?.name}</p>;
        } else {
          return (
            <div className="flex items-center justify-center">
              <Tag color="red">Belum laporan</Tag>
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
