"use client";

import React, { useState, useTransition } from "react";
import { RecipeProps, authProps } from "@/types";
import { App, Button, Descriptions, Modal, Popconfirm, Table, TableProps } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import { refresher } from "@/app/api/services/refresher";

type props = {
  data: RecipeProps[];
  session: authProps;
};

type ColumnsType<T> = TableProps<T>["columns"];

export const DataTable = ({ data }: props) => {
  const [openModal, setOpenModal] = useState(false);
  const [detail, setDetail] = useState<RecipeProps>();
  const [pending, startTransition] = useTransition();
  const { message } = App.useApp();

  const columns: ColumnsType<RecipeProps> = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Nama Resep",
      dataIndex: "name",
    },
    {
      title: "Catatan Tambahan",
      dataIndex: "notes",
      render: (value, record, index) => {
        return <p>{value ? value : "-"}</p>
      }
    },
    {
      title: "Detail",
      dataIndex: "id",
      align: "center",
      render: (value, record, index) => {
        const handleOpenModal = async () => {
          startTransition(async () => {
            try {
              const res = await axios.post(
                process.env.NEXT_PUBLIC_API_URL +
                  `/api/recipe/get/${value}`,
                {
                  id: value,
                }
              );
              if (res.status === 200) {
                setOpenModal(true);
                setDetail(res.data.data);
                console.log(res.data.data)
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
          <>
            <Button
              type="dashed"
              icon={<EyeOutlined />}
              onClick={() => handleOpenModal()}
            />
            <Modal
              open={openModal}
              onCancel={() => setOpenModal(false)}
              closable={false}
              width={1000}
              footer={[
                <Button
                  key="back"
                  type="dashed"
                  onClick={() => setOpenModal(false)}
                >
                  Tutup
                </Button>,
              ]}
            >
              <Descriptions title="Rincian Bahan">
                {detail?.recipes_ingredient.map((item, index) => (
                  <Descriptions.Item key={item.id}>{item.ingredients.name}: {item.dose} gram</Descriptions.Item>
                ))}
              </Descriptions>
            </Modal>
          </>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
      align: "center",
      render: (value, record, index) => {

        const handleDeleteRecipe = async () => {
          startTransition(async () => {
            try {
              const res = await axios.post(
                process.env.NEXT_PUBLIC_API_URL +
                  `/api/recipe/delete/${value}`,
                {
                  id: value,
                }
              );
              if (res.status === 200) {
                await refresher({ path: "/dashboard/product" })
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
            <Link href={`/dashboard/recipe/edit?id=${value}`}>
              <Button size="small" type="dashed" icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              placement="topLeft"
              title="Hapus Resep"
              description="Apakah kamu yakin menghapus resep ini?"
              onConfirm={handleDeleteRecipe}
              okText="Hapus"
              cancelText="Batal"
            >
              <Button size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        )
      }
    }
  ];

  return (
    <div className="w-full h-full overflow-x-scroll">
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={({ id }) => String(id)}
      />
    </div>
  );
};
