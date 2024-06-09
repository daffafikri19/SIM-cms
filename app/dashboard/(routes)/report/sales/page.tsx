import React from "react";
import { DataTable } from "./data-table";
import { parseCookie } from "@/app/api/services/cookies";
import { redirect } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";
import { CustomPagination } from "@/components/pagination";
import { TableFilter } from "@/components/table-filter";
import { Button } from "antd";
import Link from "next/link";

const fetchAllSalesReport = async () => {
  const result = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/report/sales/all",
    {
      cache: "no-cache",
    }
  );
  const data = await result.json();
  return data.data;
};

const ReportSalesPage = async () => {
  const session = await parseCookie();
  if (!session.hashedToken.userid) {
    redirect("/");
  }

  const dataReports = await fetchAllSalesReport();
  if (!dataReports) return [];

  console.log(dataReports)

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
      <DataTable data={dataReports} session={session.hashedToken} />
      <div className="w-full flex items-center justify-end mt-5">
        {/* <CustomPagination page={pageNumbers} {...metadata} limit={pageSize} /> */}
      </div>
    </div>
  );
};

export default ReportSalesPage;
