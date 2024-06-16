"use client";

import React from "react";
import Link from "next/link";
import { App, Button, Popconfirm, Table } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatRupiah } from "@/libs/formatter";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

type ColumnsType<T> = TableProps<T>["columns"];

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  category: string;
}

export const DataTable = ({ data }: { data: DataType[] }) => {
  const { message } = App.useApp();

  const columns: ColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
      render: (value, record, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Nama",
      dataIndex: "name",
      align: "center",
      sortDirections: ["descend"],
    },
    {
      title: "Kategori",
      dataIndex: "category",
      align: "center",
      render: (value, record, index) => {
        return <p>{value.name}</p>;
      },
    },
    {
      title: "Harga",
      dataIndex: "price",
      align: "center",
      render: (value, record, index) => {
        return <p>{formatRupiah(value)}</p>;
      },
    },
    {
      title: "Unit",
      dataIndex: "unit",
      align: "center",
      render: (value, record, index) => {
        return <p>{value} gram</p>
      }
    },
    {
      title: "Aksi",
      align: "center",
      dataIndex: "id",
      render: (id, record, index) => {
        const handeDeleteIngredient = async () => {
          await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/delete/${id}`, { id })
          .then(async (res) => {
            if(res.status !== 200) {
              return message.error(res.data.message)
            } else {
              await refresher({ path: "/dashboard/ingredient" })
              return message.success(res.data.message)
            }
          })
        };
        return (
          <div className="flex items-center justify-center gap-1">
            <Link href={`/dashboard/ingredient/edit?id=${id}`}>
              <Button size="small" type="dashed" icon={<EditOutlined />} title="Edit" />
            </Link>
            <Popconfirm
              placement="topLeft"
              title="Hapus bahan baku"
              description="Apakah kamu yakin menghapus bahan baku ini?"
              onConfirm={handeDeleteIngredient}
              okText="Hapus"
              cancelText="Batal"
            >
              <Button size="small" danger icon={<DeleteOutlined />} title="Hapus" />
            </Popconfirm>
          </div>
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
        rowKey={({ id }) => id}
      />
    </div>
  );
};
