"use client";

import React from "react";
import { UserDisplayProps, authProps } from "@/types";
import {
  App,
  Avatar,
  Button,
  Image,
  Popconfirm,
  Table,
  TableProps,
} from "antd";
import { format } from "date-fns";
import { DeleteOutlined } from "@ant-design/icons";
import { ModalEditUser } from "./modal-edit-user";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

type TabelUserProps = {
  data: UserDisplayProps[];
  session: authProps;
};

type ColumnsType<T> = TableProps<T>["columns"];

export const TableData = ({ data, session }: TabelUserProps) => {
  const { message } = App.useApp();

  const deleteUserAccount = async ({ id } : { id: string }) => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/user/delete/${id}`, {
        id
      });
      await refresher({ path: "/dashboard/manage-user" });
      message.success(res.data.message)
      return res.data
    } catch (error: any) {
      if (error.response) {
        message.error(error.response.data.message)
      }
    }
  }

  const Ownercolumns: ColumnsType<UserDisplayProps> = [
    {
      title: "No",
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
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            {value ? (
              <Avatar
                size="large"
                src={
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + value}
                    alt="Profile"
                  />
                }
              />
            ) : (
              <p>no image</p>
            )}
          </>
        );
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
      render: (value, record, index) => {
        if (!value) {
          return <p>no data</p>;
        }
        return <p>{value}</p>;
      },
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
    {
      title: "Aksi",
      align: "center",
      dataIndex: "id",
      render: (id, record, index) => {
        const deleteUser = async () => {
          await deleteUserAccount({ id: id })
            .then((res) => {
              if (res?.status === 200) {
                message.success(res?.message);
              } else {
                message.error(res?.message);
              }
            })
            .catch((error: any) => {
              if (error.response) {
                message.error(error.response.data.message);
                console.log(error.response.data.errorMessage);
              }
            });
        };
  
        return (
          <div className="flex items-center justify-center gap-1">
            <ModalEditUser userid={id}  />
            <Popconfirm
              placement="topLeft"
              title="Hapus Akun"
              description={<p>Apakah kamu yakin menghapus akun ini ? <br /> Tindakan tidak bisa diulang...</p>}
              onConfirm={deleteUser}
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
  
  const UserColumns: ColumnsType<UserDisplayProps> = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
      render: (value, record, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Profile",
      dataIndex: "profile_picture",
      width: 100,
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            {value ? (
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + value}
                alt="profile"
              />
            ) : (
              <p>no image</p>
            )}
          </>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
      render: (value, record, index) => {
        return <p>{value.name}</p>;
      },
    },
    {
      title: "Shift",
      dataIndex: "shift",
      align: "center",
      render: (value, record, index) => {
        if (!value) {
          return <p>no data</p>;
        }
        return <p>{value}</p>;
      },
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

  return (
    <div className="w-full h-full overflow-x-scroll">
      <Table
        bordered
        columns={session?.role !== "Owner" ? UserColumns : Ownercolumns}
        dataSource={data}
        pagination={false}
        rowKey={({ id }) => id}
      />
    </div>
  );
};
