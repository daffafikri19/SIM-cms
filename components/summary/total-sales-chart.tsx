"use client";

import React, { useEffect, useState } from "react";
import { Chart } from "../chart";
import Highcharts from "highcharts";
import { App, Card, DatePicker, Tag, Typography } from "antd";
import axios from "axios";
import { useDefaultDates } from "@/store/use-default-date";

interface SalesData {
  all: number;
  shift_1: number;
  shift_2: number;
}

export const TotalSalesChart = () => {
  const { startDate: currentStartOfDate, endDate: currentEndOfDate } =
    useDefaultDates();
  const [startDate, setStartDate] = useState(currentStartOfDate);
  const [endDate, setEndDate] = useState(currentEndOfDate);
  const [chartData, setChartData] = useState<{ name: string; y: number }[]>([]);
  const [total, setTotal] = useState(0);
  const { message } = App.useApp();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URL + "/api/summary/total-sales-shift",
          {
            params: {
              startDate: startDate,
              endDate: endDate,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            const data: SalesData = res.data.data;
            const formattedData = [
              { name: "Shift 1", y: data.shift_1 },
              { name: "Shift 2", y: data.shift_2 },
            ];
            setChartData(formattedData);
            setTotal(data.all);
          } else {
            setChartData([]);
          }
        })
        .catch((error) => {
          if (axios.isAxiosError(error) && error.response) {
            message.error(error.response.data.message || "server error");
          } else {
            message.error("Server error displaying chart");
          }
        });
    };

    fetchData();
  }, [message, startDate, endDate]);

  const formatRupiah = (number: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
      height: 350,
    },
    title: {
      text: "Total Penjualan Shift",
    },
    subtitle: {
      text: `Periode ${startDate ? startDate : currentStartOfDate} - ${endDate ? endDate : currentEndOfDate}`
    },
    series: [
      {
        type: "pie",
        data: chartData,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return `<b>${this.point.name}</b>`;
          },
        },
      },
    ],
    tooltip: {
      pointFormatter: function () {
        return `<span style="color:${
          this.color
        }">\u25CF</span> <b>${formatRupiah(Number(this.y))}</b><br/>`;
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: true,
    },
  };

  return (
    <Card
      extra={
        <DatePicker.RangePicker
          className="w-full"
          title="Filter :"
          allowClear
          onChange={(value, dateString) => {
            setStartDate(dateString[0]);
            setEndDate(dateString[1]);
          }}
        />
      }
      styles={{
        body: {
          paddingTop: 0,
          position: "relative",
        },
      }}
    >
      <Chart options={chartOptions} />
      <div className="flex items-center gap-2 mt-2">
        <Typography>Total Revenue :</Typography>{" "}
        <Typography className="font-bold">{total ? formatRupiah(total) : "Rp. 0"}</Typography>
      </div>
    </Card>
  );
};
