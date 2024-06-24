import React from "react";
import { parseCookie } from "@/app/api/services/cookies";
import { TableReportShift1 } from "./table-shift1";
import { TableReportShift2 } from "./table-shift2";
import { refresher } from "@/app/api/services/refresher";
import axios from "axios";

const fetchProductForReport = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/product/all/report")
    await refresher({ path: "/dashboard/product" });
    await refresher({ path: '/dashboard/report/stock/create' });
    await refresher({ path: '/dashboard/report/stock' });
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
}

const fetchReportShiftToday = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/report/stock/today", {
      cache: 'no-cache'
    });
    const data = await res.json();
    return data.data
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
}

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
