"use client";

import React, { useState, useTransition } from "react";
import {
  DetailReportIngredientProps,
  ReportIngredientProps,
  authProps,
} from "@/types";
import { App, Button, Descriptions, Modal, Table, TableProps } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  formatDateTimeString,
  formatDigitRupiah,
  formatInputNumber,
  formatRupiah,
} from "@/libs/formatter";

type Props = {
  data: ReportIngredientProps[];
  session: authProps;
};

type ColumnsType<T> = TableProps<T>["columns"];

export const DataTable = ({ data, session }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [pending, startTransition] = useTransition();
  const [detail, setDetail] = useState<ReportIngredientProps>();
  const { message } = App.useApp();
  const columns: ColumnsType<ReportIngredientProps> = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
      render: (value, record, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Tanggal",
      dataIndex: "report_date",
      align: "center",
      render: (value, record, index) => {
        return <p>{formatDateTimeString(value)}</p>;
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
                  `/api/report/ingredient/get/${value}`,
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

        const detailColumns: ColumnsType<DetailReportIngredientProps> = [
          {
            title: "No",
            dataIndex: "id",
            align: "center",
            render: (value, record, index) => {
              return <p>{index + 1}</p>;
            },
          },
          {
            title: "Bahan Baku",
            dataIndex: "ingredient",
            align: "center",
            render: (value, record, index) => {
              return <p>{value.name}</p>;
            },
          },
          {
            title: "Kuantiti",
            dataIndex: "quantity",
            align: "center",
            render: (value, record, index) => {
              return <p>{formatDigitRupiah(value)}</p>;
            },
          },
          {
            title: "Gramasi",
            dataIndex: "pieces",
            align: "center",
            render: (value, record, index) => {
              return <p>{value} gram</p>;
            },
          },
        ];

        return (
          <>
            <Button
              type="dashed"
              icon={<EyeOutlined />}
              loading={pending}
              onClick={() => handleOpenModal()}
            />
            <Modal
              open={openModal}
              onCancel={() => setOpenModal(false)}
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
              <Table
                title={() => {
                    return <p>Rincian</p>
                }}
                bordered
                columns={detailColumns}
                dataSource={detail?.detail}
                pagination={false}
                rowKey={({ id }) => String(id)}
              />
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
