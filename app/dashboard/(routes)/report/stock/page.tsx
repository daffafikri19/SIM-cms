import React from "react";
import { TableData } from "./table-data";
import { ReportStockProps, ServerProps } from "@/types";
import { fetchReportStock } from "@/app/api/mutations/report";
import { TableFilter } from "@/components/table-filter";
import { CustomPagination } from "@/components/pagination";
import { parseCookie } from "@/app/api/services/cookies";
import { redirect } from "next/navigation";
import { ModalDate } from "./create/modal-date";
import { format } from "date-fns";

const ReportStockPage = async (props: ServerProps) => {
  const pageNumbers = Number(props.searchParams?.page || 1);
  const pageSize = Number(props.searchParams?.limit || 10);
  const searchValue = props.searchParams?.search || null;
  const startDateValue = props.searchParams?.startDate || null;
  const endDateValue = props.searchParams?.endDate || null;
  const take = pageSize;
  const skip = (pageNumbers - 1) * take;
  const dataReport = await fetchReportStock({
    skip: skip,
    take: take,
    search: searchValue ? searchValue : (null as any),
    startDate: startDateValue ? startDateValue : (null as any),
    endDate: endDateValue ? endDateValue : (null as any),
  });
  const reports = dataReport.result;
  const metadata = dataReport.metadata;
  const session = await parseCookie();
  if (!session.hashedToken.userid) {
    redirect("/");
  }

  const today = format(new Date(Date.now()), "yyyy-MM-dd");

  const todayReportShift1 = reports.some((data: any) => data.report_date.includes(today));

  return (
    <div className="w-full space-y-4">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-2">
        <div className="w-full flex-1">
          <TableFilter
            searchTitle="Cari berdasarkan id laporan"
            enableDatePicker
          />
        </div>

        {session.hashedToken.shift === "Shift 1" && !todayReportShift1 && (
            <ModalDate
              session={{
                name: session.hashedToken.name,
                shift: session.hashedToken.shift,
              }}
            />
          )}
      </div>
      <TableData data={reports} session={session.hashedToken} />
      <div className="w-full flex items-center justify-end mt-5">
        <CustomPagination page={pageNumbers} {...metadata} limit={pageSize} />
      </div>
    </div>
  );
};

export default ReportStockPage;
