"use client";

import React, { useState } from "react";
import { UserDisplayProps } from "@/types";
import { Image, Table, TableProps } from "antd";
import { format } from "date-fns";

type TabelUserProps = {
  data: UserDisplayProps[];
};

type ColumnsType<T> = TableProps<T>["columns"];
type TableRowSelection<T> = TableProps<T>["rowSelection"];

const columns: ColumnsType<UserDisplayProps> = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: 30,
    render: (value, record, index) => {
      return <p>{index + 1}</p>;
    },
  },
  {
    title: "Profile",
    dataIndex: "profile_picture",
    width: 100,
    render: (value, record, index) => {
      return <>{value ? <Image src={value} alt="profile" /> : <p>no image</p>}</>;
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 100,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 100,
  },
  {
    title: "Role",
    dataIndex: "role",
    width: 100,
    render: (value, record, index) => {
      return <p>{value.name}</p>;
    },
  },
  {
    title: "Shift",
    dataIndex: "shift",
    width: 100,
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    width: 200,
    render: (value, record, index) => {
      return <p>{format(value, "dd-MM-yyyy hh:mm:ss")}</p>;
    },
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    width: 200,
    render: (value, record, index) => {
      return <p>{format(value, "dd-MM-yyyy hh:mm:ss")}</p>;
    },
  },
];

export const TableData = ({ data }: TabelUserProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<UserDisplayProps> = {
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
