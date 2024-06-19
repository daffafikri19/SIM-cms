"use client";

import React, { useEffect, useState } from "react";
import { Chart } from "../chart";
import Highcharts from "highcharts";
import { App, Card, DatePicker, Select } from "antd";
import axios from "axios";
import { useDefaultDates } from "@/store/use-default-date";

export const Top5ProductChart = () => {
  const { startDate: currentStartOfDate, endDate: currentEndOfDate } =
    useDefaultDates();
  const [startDate, setStartDate] = useState(currentStartOfDate);
  const [endDate, setEndDate] = useState(currentEndOfDate);
  const [dataCharts, setDataCharts] = useState([]);
  const [items, setItems] = useState(5);
  const { message } = App.useApp();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URL + "/api/summary/top-selling-product",
          {
            params: {
              startDate: startDate,
              endDate: endDate,
              topCount: items,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setDataCharts(res.data.data);
          } else {
            setDataCharts([]);
            message.warning("Internal server error, try to refresh this page");
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
  }, [startDate, endDate, items, message]);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: `Top ${items} Produk Terlaris`,
    },
    subtitle: {
      text: `Periode ${startDate ? startDate : currentStartOfDate} - ${
        endDate ? endDate : currentEndOfDate
      }`,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "bar",
        name: "",
        showInLegend: false,
        data: dataCharts,
        dataLabels: {
          enabled: false,
        },
      },
    ],
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.point.name}</b>: ${this.y} items`;
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        formatter: function () {
          return Highcharts.numberFormat(Number(this.value), 0);
        },
      },
    },
    xAxis: {
      categories: dataCharts.map((data: any) => data.name),
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
  };

  return (
    <Card
      title="Filter :"
      extra={
        <div className="flex items-center gap-1">
          <Select
            placeholder="items"
            showSearch
            options={[
              { title: "3", value: 3 },
              { title: "5", value: 5 },
              { title: "10", value: 10 },
            ]}
            defaultValue={items}
            onChange={(value) => {
              setItems(Number(value));
            }}
          />
          <DatePicker.RangePicker
            className="w-full"
            allowClear
            onChange={(value, dateString) => {
              setStartDate(dateString[0]);
              setEndDate(dateString[1]);
            }}
          />
        </div>
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
