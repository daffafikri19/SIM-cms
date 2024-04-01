"use client";

import React, { useState } from "react";
import { Button, Image, Space, Table, Tag } from "antd";
import type { GetProp, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type ProductProps = {
  no: number;
  name: string;
  product_code: string;
  picture: string;
  price: number;
  category: {
    label: string;
  } | null;
  detail: {
    production_date: string;
    expiry_date: string;
    age: number;
  } | null;
  created_at: string;
  updated_at: string;
};

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}
  


type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

const columns: ColumnsType<ProductProps> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      align: "center"
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kode",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Gambar",
      dataIndex: "picture",
      key: "picture",
      align: "center",
      render: (_, { picture }) => (
        <div className="flex items-center justify-center">
            <Image src={`${process.env.NEXT_PUBLIC_FILEMANAGER_API_URL+"/roti-tawar.png"}`} width={50} height={50} />
        </div>
      )
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center justify-center">
          <Tag
            className="cursor-pointer"
            color="blue"
            icon={<EditOutlined />}
          />
          <Tag
            className="cursor-pointer"
            color="volcano"
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
];

  
export const DataTable = () => {
 



//   const mockData: ProductProps[] = [
//     {
//       no: 1,
//       name: "Roti Tawar",
//       product_code: "123",
//       picture: `${
//         process.env.NEXT_PUBLIC_FILEMANAGER_API_URL + "/roti-tawar.png"
//       }`,
//       category: null,
//       detail: null,
//       price: 10000,
//       created_at: new Date(Date.now()).toLocaleDateString(),
//       updated_at: new Date(Date.now()).toLocaleDateString(),
//     },
//   ];

  const [data, setData] = useState<ProductProps[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  return (
    <div className="w-full h-full overflow-x-scroll">
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
};
