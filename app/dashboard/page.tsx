import React from "react";
import { TotalSalesChart } from "@/components/summary/total-sales-chart";
import { Top5ProductChart } from "@/components/summary/top-products-chart";
import { SalesChart } from "@/components/summary/sales-chart";
import { CurrentReportIngredientsTable, CurrentReportSalesTable, CurrentReportStockTable } from "@/components/summary/current-report-table";
import { revalidatePath } from "next/cache";
import { refresher } from "../api/services/refresher";
import axios from "axios";

const fetchCurrentReportData = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/summary/current-report-data");
    await refresher({ path: "/dashboard"})
    return res.data.data
  } catch (error : any) {
    if(error.response) {
      error.console(error.response.data.message)
    }
  }
}

const DashboardPage = async () => {

  const { report_stock, report_sales, report_ingredients } = await fetchCurrentReportData();

  return (
    <div className="w-full h-full">
      <div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <TotalSalesChart />
          <Top5ProductChart />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-2 lg:grid-cols-1">
          <SalesChart />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 mt-5">
        <CurrentReportStockTable data={report_stock} />
        <CurrentReportSalesTable data={report_sales} />
        <CurrentReportIngredientsTable data={report_ingredients} />
      </div>
    </div>
  );
};

export default DashboardPage;
