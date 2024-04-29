"use client";

import React, { useState } from "react";
import { Table } from "antd";
import type { GetProp, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Column } = Table;

interface ProductProps {
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
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

type ColumnsType<T> = TableProps<T>["columns"];
type TableRowSelection<T> = TableProps<T>["rowSelection"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

// const columns: ColumnsType<ProductProps> = [
//     {
//       title: "No",
//       dataIndex: "no",
//       key: "no",
//       align: "center"
//     },
//     {
//       title: "Nama",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Kode",
//       dataIndex: "product_code",
//       key: "product_code",
//     },
//     {
//       title: "Gambar",
//       dataIndex: "picture",
//       key: "picture",
//       align: "center",
//       render: (_, { picture }) => (
//         <div className="flex items-center justify-center">
//             <Image src={`${process.env.NEXT_PUBLIC_FILEMANAGER_API_URL+"/roti-tawar.png"}`} width={50} height={50} />
//         </div>
//       )
//     },
//     {
//       title: "Harga",
//       dataIndex: "price",
//       key: "price",
//     },
//     {
//       title: "Created At",
//       dataIndex: "created_at",
//       key: "created_at",
//     },
//     {
//       title: "Updated At",
//       dataIndex: "updated_at",
//       key: "updated_at",
//     },
//     // {
//     //   title: "Tags",
//     //   key: "tags",
//     //   dataIndex: "tags",
//     //   render: (_, { tags }) => (
//     //     <>
//     //       {tags.map((tag) => {
//     //         let color = tag.length > 5 ? "geekblue" : "green";
//     //         if (tag === "loser") {
//     //           color = "volcano";
//     //         }
//     //         return (
//     //           <Tag color={color} key={tag}>
//     //             {tag.toUpperCase()}
//     //           </Tag>
//     //         );
//     //       })}
//     //     </>
//     //   ),
//     // },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <div className="flex items-center justify-center">
//           <Tag
//             className="cursor-pointer"
//             color="blue"
//             icon={<EditOutlined />}
//           />
//           <Tag
//             className="cursor-pointer"
//             color="volcano"
//             icon={<DeleteOutlined />}
//           />
//         </div>
//       ),
//     },
// ];

interface DataType {
  key: React.Key;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "No",
    dataIndex: "id",
    align: "center",
    sorter: (a, b) => a.id - b.id,
    width: 50,
  },
  {
    title: "Title",
    dataIndex: "title",
    width: 100,
    // onFilter: (value, record) => record.title.indexOf(value as string) === 0,
    // sorter: (a, b) => a.title.length - b.title.length,
    // sortDirections: ['descend'],
  },
  {
    title: "Price",
    dataIndex: "price",
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "description",
    width: 300,
  },
  {
    title: "Categoty",
    dataIndex: "category",
    width: 100,
  },
  {
    title: "image",
    dataIndex: "image",
    width: 100,
  },
];

export const DataTable = ({ data }: { data: DataType[] }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="w-full h-full overflow-x-scroll">
      <Table
        bordered
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        pagination={false}
        rowKey={({ id }) => id}
      />
    </div>
  );
};
