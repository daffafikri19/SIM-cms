import React from "react";
import { DataTable } from "./data-table";
import { parseCookie } from "@/app/api/services/cookies";
import { redirect } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";
import { CustomPagination } from "@/components/pagination";
import { TableFilter } from "@/components/table-filter";
import { Button } from "antd";
import Link from "next/link";
import { ServerProps } from "@/types";
import axios from "axios";

const fetchAllSalesReport = async ({
  take,
  skip,
  search,
  startDate,
  endDate,
}: {
  take: number;
  skip: number;
  search: string | null;
  startDate: string | null;
  endDate: string | null;
}) => {
  const result = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/report/sales/all",
    {
      params: {
        take,
        skip,
        search: search ? search : null,
        startDate: startDate ? startDate : null,
        endDate: endDate ? endDate : null,
      },
    }
  );

  return result.data.data;
};

const ReportSalesPage = async (props: ServerProps) => {
  const pageNumbers = Number(props.searchParams?.page || 1);
  const pageSize = Number(props.searchParams?.limit || 10);
  const searchValue = props.searchParams?.search || null;
  const startDateValue = props.searchParams?.startDate || null;
  const endDateValue = props.searchParams?.endDate || null;
  const take = pageSize;
  const skip = (pageNumbers - 1) * take;

  const dataReports = await fetchAllSalesReport({
    skip: skip,
    take: take,
    search: searchValue ? searchValue : (null as any),
    startDate: startDateValue ? startDateValue : (null as any),
    endDate: endDateValue ? endDateValue : (null as any),
  });
  const reports = dataReports.result;
  const metadata = dataReports.metadata;

  const session = await parseCookie();
  if (!session.hashedToken.userid) {
    redirect("/");
  }

  if (!reports) return [];

  return (
    <div className="w-full space-y-4">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-2">
        <div className="w-full flex-1">
          <TableFilter
            searchTitle="Cari berdasarkan id laporan"
            enableDatePicker
          />
        </div>
        <div>
          <Link href={"/dashboard/report/sales/create"}>
            <Button type="primary" icon={<PlusOutlined />}>
              Buat Laporan
            </Button>
          </Link>
        </div>
      </div>
      <DataTable data={reports} session={session.hashedToken} />
      <div className="w-full flex items-center justify-end mt-5">
        <CustomPagination page={pageNumbers} {...metadata} limit={pageSize} />
      </div>
    </div>
  );
};

export default ReportSalesPage;
