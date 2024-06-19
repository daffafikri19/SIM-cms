import React from "react";
import { TotalSalesChart } from "@/components/summary/total-sales-chart";
import { Top5ProductChart } from "@/components/summary/top-products-chart";
import { SalesChart } from "@/components/summary/sales-chart";
import { CurrentReportTable } from "@/components/summary/current-report-table";
import { IngredientForecastChart } from "@/components/summary/ingredient-forecast-chart";

const DashboardPage = () => {
  return (
    <div className="w-full h-full">
      <div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <TotalSalesChart />
          <Top5ProductChart />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-2 lg:grid-cols-2">
          <SalesChart />
          <IngredientForecastChart />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-2 mt-5">
        <CurrentReportTable />
        <CurrentReportTable />
        <CurrentReportTable />
      </div>
    </div>
  );
};

export default DashboardPage;
