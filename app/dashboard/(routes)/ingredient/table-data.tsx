"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Popconfirm, Table, message } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteIngredient } from "@/app/api/mutations/ingredients";

type ColumnsType<T> = TableProps<T>["columns"];
type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  category: string;
}

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
    title: "Aksi",
    align: "center",
    dataIndex: "id",
    render: (id, record, index) => {
      const handeDeleteIngredient = async () => {
        await deleteIngredient({ id }).then((res) => {
          res?.status === 200
            ? message.success(res?.message)
            : message.error(res?.message);
        });
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

export const DataTable = ({ data }: { data: DataType[] }) => {

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
