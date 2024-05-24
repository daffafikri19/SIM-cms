import React from "react";
import { fetchProductForReport, fetchReportShiftYesterday } from "@/app/api/mutations/products";
import { parseCookie } from "@/app/api/services/cookies";
import { TableReportShift1 } from "./table-shift1";
import { TableReportShift2 } from "./table-shift2";

const CreateReportStockPage = async () => {
  const currentShift = 'shift 1';

  const { data: dataProducts } = await fetchProductForReport();
  const dataReportYesterday = await fetchReportShiftYesterday();
  const session = await parseCookie();
  if (!dataProducts) return [];
  
  if (currentShift === "shift 1") {
    return (
      <TableReportShift1 session={session.hashedToken} dataProduct={dataProducts} reportYesterday={dataReportYesterday} />
    );
  } else if (currentShift === "shift 2") {
    return <TableReportShift2 session={session.hashedToken} dataProduct={dataProducts} reportYesterday={dataReportYesterday} />;
  }
};

export default CreateReportStockPage;
