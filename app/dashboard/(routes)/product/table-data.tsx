"use client";

import React from "react";
import { Button, Image, Popconfirm, Table, message } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDateTimeString, formatRupiah } from "@/libs/formatter";
import Link from "next/link";
import { deleteProduct } from "@/app/api/mutations/products";

type ColumnsType<T> = TableProps<T>["columns"];

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  picture: string | null;
  price: number;
  category: string;
  max_age: number;
  created_at: string;
  update_at: string;
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
    title: "Gambar",
    dataIndex: "picture",
    align: "center",
    render: (value, record, index) => {
      if (value) {
        return (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL + value}`}
            alt="Product Picture"
            width={50}
            height={50}
          />
        );
      } else {
        return <p className="text-slate-400 truncate">no image</p>;
      }
    },
  },
  {
    title: "Nama",
    dataIndex: "name",
    align: "center",
    onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Harga",
    dataIndex: "price",
    align: "center",
    render: (value) => {
      return <p>{formatRupiah(value)}</p>;
    },
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
    title: "Umur",
    dataIndex: "max_age",
    align: "center",
  },
  {
    title: "Di Buat",
    dataIndex: "created_at",
    align: "center",
    render: (value, record, index) => {
      return <p>{formatDateTimeString(value)}</p>;
    },
  },
  {
    title: "Di ubah",
    dataIndex: "updated_at",
    align: "center",
    render: (value, record, index) => {
      return <p>{formatDateTimeString(value)}</p>;
    },
  },
  {
    title: "Aksi",
    align: "center",
    dataIndex: "id",
    render: (id, record, index) => {
      const handleDeleteProduct = async () => {
        await deleteProduct({ id }).then((res) => {
          res?.status === 200
            ? message.success(res?.message)
            : message.error(res?.message);
        });
      };
      return (
        <div className="flex items-center justify-center gap-1">
          <Link href={`/dashboard/product/edit?id=${id}`}>
            <Button size="small" type="dashed" icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            placement="topLeft"
            title="Hapus produk"
            description="Apakah kamu yakin menghapus produk ini?"
            onConfirm={handleDeleteProduct}
            okText="Hapus"
            cancelText="Batal"
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
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
