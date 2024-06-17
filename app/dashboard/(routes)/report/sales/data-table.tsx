"use client";

import React, { useState, useTransition } from "react";
import {
  App,
  Button,
  Descriptions,
  Modal,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import {
  ExpensesProps,
  NonCashProps,
  ReportSalesProps,
  authProps,
} from "@/types";
import { formatDateTimeString, formatRupiah } from "@/libs/formatter";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";

type props = {
  data: ReportSalesProps[];
  session: authProps;
};

type ColumnsType<T> = TableProps<T>["columns"];

export const DataTable = ({ data, session }: props) => {
  const [openModal, setOpenModal] = useState(false);
  const [pending, startTransition] = useTransition();
  const { message } = App.useApp();
  const [detail, setDetail] = useState<ReportSalesProps | undefined>();

  const columns: ColumnsType<ReportSalesProps> = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      width: 20,
      render: (value, record, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Tgl Laporan",
      dataIndex: "report_date",
      align: "center",
      render: (value, record, index) => {
        return <p>{formatDateTimeString(value)}</p>;
      },
    },
    {
      title: "Total Pendapatan",
      dataIndex: "total_income",
      align: "center",
      render: (value, record, index) => {
        return <p>{formatRupiah(value)}</p>;
      },
    },
    {
      title: "Pemasukan Tunai",
      dataIndex: "total_cash",
      align: "center",
      render: (value, record, index) => {
        return <p>{formatRupiah(value)}</p>;
      },
    },
    {
      title: "Pemasukan Non Tunai",
      dataIndex: "total_non_cash",
      align: "center",
      render: (value, record, index) => {
        return <p>{formatRupiah(value)}</p>;
      },
    },
    {
      title: "Total Pengeluaran",
      dataIndex: "total_expenses",
      align: "center",
      render: (value, record, index) => {
        return <p>{formatRupiah(value)}</p>;
      },
    },
    {
      title: "Dibuat Oleh",
      dataIndex: "reporter",
      align: "center",
    },
    {
      title: "Detail",
      dataIndex: "id",
      align: "center",
      render: (value, record, index) => {
        const handleOpenModal = async () => {
          startTransition(async () => {
            try {
              const res = await axios.post(
                process.env.NEXT_PUBLIC_API_URL +
                  `/api/report/sales/get/${value}`,
                {
                  id: value,
                }
              );
              if (res.status === 200) {
                setOpenModal(true);
                setDetail(res.data.data);
              } else {
                message.error(res.data.message);
              }
            } catch (error) {
              if (axios.isAxiosError(error) && error.response) {
                message.error(error.response.data.message || "server error");
              } else {
                message.error("Error submitting the form");
              }
            }
          });
        };

        return (
          <>
            <Button
              type="dashed"
              icon={<EyeOutlined />}
              onClick={() => {
                handleOpenModal();
              }}
              loading={pending}
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
              ]}
            >
              <Descriptions title="Rincian Total" className="!p-2 border rounded-lg">
                <Descriptions.Item label="Total Cash">{detail?.total_cash ? formatRupiah(detail.total_cash) : "Rp. 0"}</Descriptions.Item>
                <Descriptions.Item label="Total Non Cash">{detail?.total_non_cash ? formatRupiah(detail.total_non_cash) : "Rp. 0"}</Descriptions.Item>
                <Descriptions.Item label="Total Pengeluaran">{detail?.total_expenses ? formatRupiah(detail.total_expenses) : "Rp. 0"}</Descriptions.Item>
                <Descriptions.Item label="Total Pendapatan">{detail?.total_income ? formatRupiah(detail.total_income) : "Rp. 0"}</Descriptions.Item>
              </Descriptions>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 mt-3">
              <Descriptions title="Rincian Non Cash" className="!p-2 border rounded-lg">
                  {detail?.non_cash.map((data) => (
                    <Descriptions.Item label={data.description} key={data.id}>
                      {formatRupiah(data.amount)}
                    </Descriptions.Item>
                  ))}
              </Descriptions>
              <Descriptions title="Rincian Pengeluaran" className="!p-2 border rounded-lg">
                {detail?.expenses?.map((data) => (
                  <Descriptions.Item label={data.description} key={data.id}>
                    {formatRupiah(data.amount)}
                  </Descriptions.Item>
                ))}
              </Descriptions>
              </div>
              <Descriptions title="Rincian MetaData" className="!p-2 border rounded-lg !mt-3">
                <Descriptions.Item label="ID Laporan">{detail?.id}</Descriptions.Item>
                <Descriptions.Item label="Dibuat pada">{detail?.report_date ? formatDateTimeString(detail.report_date) : "-"}</Descriptions.Item>
                <Descriptions.Item label="Dibuat Oleh">{detail?.reporter}</Descriptions.Item>
              </Descriptions>
            </Modal>
          </>
        );
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
        rowKey={({ id }) => String(id)}
      />
    </div>
  );
};
