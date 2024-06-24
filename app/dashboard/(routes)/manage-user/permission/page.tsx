import React from "react";
import { DataTable } from "./data-table";
import { parseCookie } from "@/app/api/services/cookies";
import { redirect } from "next/navigation";
import { ServerProps } from "@/types";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";
import { TableFilter } from "@/components/table-filter";
import { CustomPagination } from "@/components/pagination";
import { ModalAddRole } from "./modal-add-role";

const fetchDataRole = async ({
  take,
  skip,
  search,
}: {
  take: number;
  skip: number;
  search: string | null;
  startDate: string | null;
  endDate: string | null;
}) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/role/data",
      {
        params: {
          take,
          skip,
          search: search ? search : null
        },
      }
    );
    await refresher({ path: "/dashboard/manage-user/permission" })
    await refresher({ path: "/dashboard/manage-user" })
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500
      }
    }
  }
};

const PermissionUserPage = async (props : ServerProps) => {
  const pageNumbers = Number(props.searchParams?.page || 1);
  const pageSize = Number(props.searchParams?.limit || 10);
  const searchValue = props.searchParams?.search || null;
  const startDateValue = props.searchParams?.startDate || null;
  const endDateValue = props.searchParams?.endDate || null;
  const take = pageSize;
  const skip = (pageNumbers - 1) * take;
  const result = await fetchDataRole({
    skip: skip,
    take: take,
    search: searchValue ? searchValue : (null as any),
    startDate: startDateValue ? startDateValue : (null as any),
    endDate: endDateValue ? endDateValue : (null as any),
  });
  const roleData = result.result;
  const metadata = result.metadata;

  const session = await parseCookie();
  
  if(!session.hashedToken.userid) {
    redirect("/dashboard")
  }
  return (  
    <div className="w-full space-y-4">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-2">
        <div className="w-full flex-1">
          <TableFilter
            searchTitle="Cari berdasarkan nama role"
            enableDatePicker={false}
            enableInput
          />
        </div>
        <div className="flex items-center">
          <ModalAddRole />
        </div>
      </div>
      <DataTable roledata={roleData} />
      <div className="w-full flex items-center justify-end mt-5">
        <CustomPagination page={pageNumbers} {...metadata} limit={pageSize} />
      </div>
    </div>
  );
};

export default PermissionUserPage;
