import React from "react";
import { Button } from "antd";
import { TableData } from "./table-data";
import { ServerProps } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { TableFilter } from "@/components/table-filter";
import { fetchUserData } from "@/app/api/mutations/users";
import { parseCookie } from "@/app/api/services/cookies";

const ManageUserPage = async (props: ServerProps) => {
  const pageNumbers = Number(props.searchParams?.page || 1);
  const pageSize = Number(props.searchParams?.limit || 10);
  const searchValue = props.searchParams?.search || null;
  const session = await parseCookie();
  const take = pageSize;
  const skip = (pageNumbers - 1) * take;

  const userdata = await fetchUserData({
    take,
    skip,
    search: searchValue ? searchValue : (null as any),
  });

  const { result, metadata } = userdata;
  if (!result) return [];

  return (
    <div className="w-full space-y-4">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-2">
        <div className="w-full flex-1">
          <TableFilter
            searchTitle="Cari berdasarkan nama pengguna"
            enableDatePicker={false}
          />
        </div>
        <div>
          <Link href={"/dashboard/manage-user/add-user"}>
            <Button type="primary" icon={<PlusOutlined />}>
              Tambah Pengguna
            </Button>
          </Link>
        </div>
      </div>
      <TableData session={session.hashedToken} data={result} />
    </div>
  );
};

export default ManageUserPage;
