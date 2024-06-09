"use client";

import React, { useState, useTransition } from "react";
import { Button, Modal, Space, Table, TableProps, Typography } from "antd";
import {
  ExpencesProps,
  NonCashProps,
  ReportSalesProps,
  UserProps,
  authProps,
} from "@/types";
import { formatDateLaporan, formatDateTimeString, formatRupiah, transformDataToArray } from "@/libs/formatter";
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
  const [expences, setExpences] = useState<ExpencesProps[]>([]);
  const [nonCash, setNonCash] = useState<NonCashProps[]>([])
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
          return (
            <p>{formatDateTimeString(value)}</p>
          )
        }
    },
    {
      title: "Total Pendapatan",
      dataIndex: "total_income",
      align: "center",
      render: (value, record, index) => {
        return (
            <p>{formatRupiah(value)}</p>
        )
      }
    },
    {
      title: "Pemasukan Tunai",
      dataIndex: "total_cash",
      align: "center",
      render: (value, record, index) => {
        return (
            <p>{formatRupiah(value)}</p>
        )
      }
    },
    {
        title: "Pemasukan Non Tunai",
        dataIndex: "total_non_cash",
        align: "center",
        render: (value, record, index) => {
            return (
                <p>{formatRupiah(value)}</p>
            )
        }
    },
    {
        title: "Total Pengeluaran",
        dataIndex: "total_expences",
        align: "center",
        render: (value, record, index) => {
            return  (
                <p>{formatRupiah(value)}</p>
            )
        }
    },
    {
      title: "Dibuat Oleh",
      dataIndex: "reporter",
      align: "center",
      render: (value : UserProps, record, index) => {
        return (
            <p>{value.name}</p>
        )
      }
    },
    {
      title: "Detail",
      dataIndex: 'id',
      align: "center",
      render: (value, record, index) => {
        const handleOpenModal = async () => {
          startTransition(async () => {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/report/sales/get/${value}`, {
              id: value
            });
            setOpenModal(true);
            console.log(res.data.data)
            setExpences(res.data.data.expences)
            setNonCash(res.data.data.non_cash)
          })
        }

        return (
          <>
          <Button type="dashed" icon={<EyeOutlined />} onClick={() => handleOpenModal()} />
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
              </Modal>
          </>
        )
      } 
    }
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
