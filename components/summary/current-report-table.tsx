"use client";

import React from "react";
import { Card, Table, TableProps } from "antd";
import { formatDateTimeString, formatRupiah } from "@/libs/formatter";

type ColumnsType<T> = TableProps<T>["columns"];

type commenProps = {
  id: string;
  reporter: string;
  report_date: string;
}

type stockProps = {
  id: string;
  grand_total: number;
  report_date: string
}


export const CurrentReportStockTable = ({ data } : { data: stockProps[] }) => {

  const columns: ColumnsType<stockProps> = [
    {
      title: "No",
      dataIndex: "id",
      render: (value, record, index) => {
        return <p>{index + 1}</p>
      }
    },
    {
      title: "Revenue",
      dataIndex: "grand_total",
      render: (value, record, index) => {
        return <p>{value ? formatRupiah(value) : "Rp. 0"}</p>
      }
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
        dataSource={data}
        columns={columns}
        rowKey={({ id }) => String(id)}
      />
    </Card>
  );
};

export const CurrentReportSalesTable = ({ data } : { data: commenProps[] }) => {

  const columns: ColumnsType<commenProps> = [
    {
      title: "No",
      dataIndex: "id",
      render: (value, record, index) => {
        return <p>{index + 1}</p>
      }
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
      title="Laporan Sales"
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
        dataSource={data}
        columns={columns}
        rowKey={({ id }) => String(id)}
      />
    </Card>
  );
};

export const CurrentReportIngredientsTable = ({ data } : { data: commenProps[] }) => {

  const columns: ColumnsType<commenProps> = [
    {
      title: "No",
      dataIndex: "id",
      render: (value, record, index) => {
        return <p>{index + 1}</p>
      }
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
      title="Laporan Bahan Baku"
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
        dataSource={data}
        columns={columns}
        rowKey={({ id }) => String(id)}
      />
    </Card>
  );
};


