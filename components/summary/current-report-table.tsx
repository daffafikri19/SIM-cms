"use client";

import React from "react";
import { Card, Table, TableProps } from "antd";
import { ReportSalesProps } from "@/types";
import { formatDateTimeString } from "@/libs/formatter";

type ColumnsType<T> = TableProps<T>["columns"];

type tableProps = {
  id: number;
  title: string;
  reporter: string;
  report_date: string;
};

export const CurrentReportTable = () => {
  const dummyData = [
    {
      id: 1,
      title: "Title 1",
      reporter: "Daffa",
      report_date: new Date(Date.now()).toISOString(),
    },
    {
      id: 2,
      title: "Title 2",
      reporter: "Daffa",
      report_date: new Date(Date.now()).toISOString(),
    },
    {
      id: 3,
      title: "Title 3",
      reporter: "Daffa",
      report_date: new Date(Date.now()).toISOString(),
    },
    {
      id: 4,
      title: "Title 4",
      reporter: "Daffa",
      report_date: new Date(Date.now()).toISOString(),
    },
    {
      id: 5,
      title: "Title 5",
      reporter: "Daffa",
      report_date: new Date(Date.now()).toISOString(),
    },
  ];

  const columns: ColumnsType<tableProps> = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
    },
    {
      title: "Report Date",
      dataIndex: "report_date",
      render: (value, record, index) => {
        return <p>{formatDateTimeString(value)}</p>;
      },
    },
  ];

  return (
    <Card
      title="Laporan Stok"
      styles={{
        body: {
          paddingBottom: 0,
          paddingTop: 0,
          paddingLeft: 10,
          paddingRight: 10,
        },
      }}
    >
      <Table
        dataSource={dummyData}
        columns={columns}
        rowKey={({ id }) => String(id)}
      />
    </Card>
  );
};
