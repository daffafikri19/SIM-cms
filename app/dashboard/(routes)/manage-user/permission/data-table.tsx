"use client";

import React, { useState, useTransition } from "react";
import { App, Button, Card, Popconfirm, Table, TableProps } from "antd";
import { UserProps, UserRole } from "@/types";
import { DeleteOutlined } from "@ant-design/icons";
import { ModalEditRole } from "./modal-edit-role";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";
import { ModalPermission } from "./modal-permission";

type ColumnsType<T> = TableProps<T>["columns"];

type props = {
  roledata: UserRole[];
};

export const DataTable = ({ roledata }: props) => {
  const [openModal, setOpenModal] = useState(false);
  const { message } = App.useApp();
  const [pending, startTransition] = useTransition();
  const columns: ColumnsType<UserRole> = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
      render: (value, record, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Nama Role",
      dataIndex: "name",
    },
    {
      title: "Daftar Pengguna",
      dataIndex: "user",
      render: (value: UserProps[], record, index) => {
        return (
          <div>
            {value.map((user, index) => {
              return <div key={user.id}>- {user.name}</div>;
            })}
          </div>
        );
      },
    },
    {
      title: "Akses",
      dataIndex: "id",
      align: "center",
      render: (value, record, index) => {
        return <ModalPermission roleid={value} />;
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
      align: "center",
      render: (id, record, index) => {
        const handleDeleteRole = () => {
          startTransition(async () => {
            try {
              const res = await axios.post(
                process.env.NEXT_PUBLIC_API_URL + `/api/user/role/delete/${id}`,
                {
                  id: id,
                }
              );
              if (res.status === 200) {
                await refresher({ path: "/dashboard/manage-user/permission" });
                await refresher({ path: "/dashboard/manage-user" });
                message.success(res.data.message);
              } else {
                message.error(res.data.message);
              }
            } catch (error) {
              if (axios.isAxiosError(error) && error.response) {
                message.error(error.response.data.message || "server error");
              } else {
                message.error("Error submitting the form");
              }
            }
          });
        };
        return (
          <div className="flex items-center justify-center gap-1">
            <ModalEditRole roleid={id} />
            <Popconfirm
              placement="topLeft"
              title="Hapus Role"
              description={
                <p>
                  Apakah kamu yakin menghapus role ini? <br /> Daftar akses
                  aplikasi juga akan ikut terhapus <br /> dan Tindakan ini tidak
                  bisa diulang...
                </p>
              }
              onConfirm={handleDeleteRole}
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
  return (
    <Card
      styles={{
        body: {
          paddingBottom: 0,
          paddingTop: 0,
          paddingLeft: 10,
          paddingRight: 10,
        },
      }}
    >
      <Table
        dataSource={roledata}
        columns={columns}
        rowKey={({ id }) => String(id)}
      />
    </Card>
  );
};
