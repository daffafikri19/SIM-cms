import React from "react";
import {
  fetchProductForReport,
  fetchReportShiftToday,
  fetchReportShiftYesterday,
} from "@/app/api/mutations/products";
import { parseCookie } from "@/app/api/services/cookies";
import { TableReportShift1 } from "./table-shift1";
import { TableReportShift2 } from "./table-shift2";

const CreateReportStockPage = async () => {
  const { data: dataProducts } = await fetchProductForReport();
  const dataReportToday = await fetchReportShiftToday();
  const session = await parseCookie();
  if (!dataProducts) return [];

  if (session.hashedToken.shift === "Shift 1") {
    return (
      <TableReportShift1
        session={session.hashedToken}
        dataProduct={dataProducts}
      />
    );
  } else if (session.hashedToken.shift === "Shift 2") {
    return (
      <TableReportShift2
        session={session.hashedToken}
        dataProduct={dataProducts}
        reportShiftToday={dataReportToday}
      />
    );
  }
};

export default CreateReportStockPage;
