"use client";

import React, { useState } from "react";
import { Button, Popconfirm, Table, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import Link from "next/link";
import { deleteCategoryIngredient } from "@/app/api/mutations/ingredients";

type ColumnsType<T> = TableProps<T>["columns"];
type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  id: number;
  name: string;
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
    title: "Aksi",
    align: "center",
    dataIndex: "id",
    render: (id, record, index) => {
      const handleDeleteCategory = async () => {
        await deleteCategoryIngredient({ id }).then((res) => {
          res.status === 200
            ? message.success(res.message)
            : message.error(res.message);
        });
      };
      return (
        <div className="flex w-full items-center justify-center gap-1">
          <Link href={`/dashboard/ingredient/edit?id=${id}`}>
            <Button size="small" type="dashed" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Popconfirm
            placement="topLeft"
            title="Hapus kategori"
            description="Apakah kamu yakin menghapus kategori ini ?"
            onConfirm={handleDeleteCategory}
            okText="Hapus"
            cancelText="Batal"
          >
            <Button size="small" danger icon={<DeleteOutlined />}>
              Hapus
            </Button>
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
