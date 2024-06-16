"use client";

import React from "react";
import { App, Button, Popconfirm, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { EditModal } from "./edit-modal";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

type ColumnsType<T> = TableProps<T>["columns"];

interface DataType {
  key: React.Key;
  id: number;
  name: string;
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
      title: "Aksi",
      align: "center",
      dataIndex: "id",
      render: (id, record, index) => {
        const handleDeleteCategory = async () => {
          await axios
            .post(
              process.env.NEXT_PUBLIC_API_URL +
                `/api/ingredient/category/delete/${id}`,
              { id }
            )
            .then(async (res) => {
              if (res.status !== 200) {
                return message.error(res.data.message);
              } else {
                await refresher({ path: "/dashboard/ingredient/category" });
                await refresher({ path: "/dashboard/ingredient" });
                return message.success(res.data.message);
              }
            });
        };

        return (
          <div className="flex w-full items-center justify-center gap-1">
            <EditModal id={id} />
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
