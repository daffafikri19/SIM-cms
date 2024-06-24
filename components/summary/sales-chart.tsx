"use client";

import React, { useEffect, useState } from "react";
import { Chart } from "../chart";
import { App, Card, DatePicker } from "antd";
import { useDefaultDates } from "@/store/use-default-date";
import axios from "axios";

interface dataProps {
  report_date: string;
  shift_1_total: number;
  shift_2_total: number;
}

export const SalesChart = () => {
  const { startDate: currentDate, endDate: endOfThisMonth } =
    useDefaultDates();
  const [date, setDate] = useState(currentDate);
  const { message } = App.useApp();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URL + "/api/summary/sales-period",
          {
            params: {
              date: date,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setChartData(res.data.data)
          } else {
            message.warning("Internal server error, try to refresh this page");
            setChartData([])
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
  }, [date, message]);

  const formatRupiah = (number: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const chartOptions: Highcharts.Options = {
    title: {
      text: "Grafik Penjualan",
      align: "center",
    },
    subtitle: {
      text: `Periode ${currentDate ? currentDate : date} - ${endOfThisMonth ? endOfThisMonth : date}`,
    },
    xAxis: {
      categories: chartData.map((item : dataProps) => item.report_date.substring(8, 10)), // Ambil hanya tanggal (dd) dari report_date
    },
    yAxis: {
      title: {
        text: "Total Penjualan",
      },
    },
    tooltip: {
      formatter: function () {
        return `<b>${date.substring(0, 8)}${this.point.category}</b>: ${this.y ? formatRupiah(this.y) : "Rp. 0"}`;
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: true,
        },
      },
    },
    series: [
      {
        type: "line",
        name: "Shift 1",
        data: chartData.map((item : dataProps) => item.shift_1_total),
      },
      {
        type: "line",
        name: "Shift 2",
        data: chartData.map((item: dataProps) => item.shift_2_total),
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
    credits: {
      enabled: false
    }
  };
  return (
    <Card
      title="Filter :"
      extra={
        <DatePicker
        className="w-full"
        allowClear
        onChange={(value, dateString) => {
          setDate(dateString.toString())
        }}
      />
      }
      styles={{
        body: {
          paddingTop: 0,
        },
      }}
    >
      <Chart options={chartOptions} />
    </Card>
  );
};
