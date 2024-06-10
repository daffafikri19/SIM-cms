"use client";

import React from "react";
import { Button, Popconfirm, Table, message } from "antd";
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
        await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/product/category/delete/${id}`, {
          id: id
        }).then(async (res) => {
          if(res.status === 200) {
            await refresher({ path: "/dashboard/product/category" })
            await refresher({ path: "/dashboard/product" })
            return message.success(res.data.message)
          } else {
            return message.error(res.data.message)
          }
        })
      }


      return (
        <div className="flex w-full items-center justify-center gap-1">
          <div>
          <EditModal id={id} />
          </div>
          <Popconfirm
            placement="topLeft"
            title="Hapus kategori"
            description={<b>Daftar produk yang memiliki kategori ini juga akan ikut terhapus!, anda yakin ?</b>}
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
